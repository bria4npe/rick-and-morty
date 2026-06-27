import { useCharacters } from "../hooks/useCharacters";
import { SearchBar } from "../components/SearchBar";
import { CharacterGrid } from "../components/CharacterGrid";
import { Pagination } from "../components/Pagination";

export function CharacterListPage() {
  const { results, info, loading, error, query, page, search, goToPage } =
    useCharacters();

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <SearchBar value={query} onChange={search} />
      </div>

      {loading && <p className="text-center text-gray-400">Cargando...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}
      {!loading && !error && <CharacterGrid characters={results} />}

      <Pagination page={page} info={info} onPage={goToPage} />
    </div>
  );
}
