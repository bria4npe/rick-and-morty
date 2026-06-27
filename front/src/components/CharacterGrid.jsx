import { CharacterCard } from "./CharacterCard";

export function CharacterGrid({ characters }) {
  if (characters.length === 0) {
    return (
      <p className="text-center text-gray-400">No se encontraron personajes.</p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {characters.map((c) => (
        <CharacterCard key={c.id} character={c} />
      ))}
    </div>
  );
}
