import { STATUS_TEXT_COLOR } from "../constants/status";

export function CharacterDetail({ character }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-gray-800 shadow-xl">
      <img
        src={character.image}
        alt={character.name}
        className="w-full object-cover"
      />
      <div className="p-5 space-y-2 text-sm text-gray-300">
        <h2 className="text-xl font-bold text-white">{character.name}</h2>
        <p>
          <span className="text-gray-500">Estado: </span>
          <span className={STATUS_TEXT_COLOR[character.status] ?? "text-gray-300"}>
            {character.status}
          </span>
        </p>
        <p><span className="text-gray-500">Especie: </span>{character.species}</p>
        <p><span className="text-gray-500">Género: </span>{character.gender}</p>
        <p><span className="text-gray-500">Origen: </span>{character.origin}</p>
        <p><span className="text-gray-500">Ubicación: </span>{character.location}</p>
        <p><span className="text-gray-500">Episodios: </span>{character.episodeCount}</p>
      </div>
    </div>
  );
}
