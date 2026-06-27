import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { getCharacterById } from "../api/characters";
import { CharacterDetail } from "../components/CharacterDetail";

export function CharacterDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from ?? "/";

  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCharacterById(id)
      .then(setCharacter)
      .catch(() => setError("Personaje no encontrado."))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="mx-auto max-w-sm space-y-4">
      <button
        onClick={() => navigate(`/${from}`)}
        className="text-sm text-green-400 hover:underline"
      >
        ← Volver al listado
      </button>

      {loading && <p className="text-gray-400">Cargando...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {character && <CharacterDetail character={character} />}
    </div>
  );
}
