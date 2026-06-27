import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { getCharacters } from "../api/characters";
import { useDebounce } from "./useDebounce";

export function useCharacters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("name") ?? "");
  const [page, setPage] = useState(Number(searchParams.get("page") ?? 1));
  const [results, setResults] = useState([]);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const params = { page: String(page) };
    if (debouncedQuery) params.name = debouncedQuery;
    setSearchParams(params, { replace: true });
  }, [debouncedQuery, page]);

  useEffect(() => {
    fetchCharacters(debouncedQuery, page);
  }, [debouncedQuery, page]);

  async function fetchCharacters(name, currentPage) {
    setLoading(true);
    setError(null);
    try {
      const data = await getCharacters({ name, page: currentPage });
      setResults(data.results);
      setInfo(data.info);
    } catch (err) {
      setError("No se pudieron cargar los personajes.");
      setResults([]);
      setInfo(null);
    } finally {
      setLoading(false);
    }
  }

  const search = useCallback((value) => {
    setQuery(value);
    setPage(1);
  }, []);

  const goToPage = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  return { results, info, loading, error, query, page, search, goToPage };
}
