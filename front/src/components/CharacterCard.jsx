import { Link, useLocation } from "react-router-dom";

import { STATUS_DOT_COLOR } from "../constants/status";

export function CharacterCard({ character }) {
  const location = useLocation();
  const dot = STATUS_DOT_COLOR[character.status] ?? "bg-gray-400";

  return (
    <Link
      to={`/characters/${character.id}`}
      state={{ from: location.search }}
      className="flex flex-col overflow-hidden rounded-xl bg-gray-800 text-left shadow hover:scale-105 hover:shadow-green-500/30 transition-transform duration-200"
    >
      <img
        src={character.image}
        alt={character.name}
        className="w-full object-cover"
      />
      <div className="p-3">
        <p className="font-semibold text-white truncate">{character.name}</p>
        <div className="mt-1 flex items-center gap-2 text-sm text-gray-400">
          <span className={`inline-block h-2 w-2 rounded-full ${dot}`} />
          {character.status}
        </div>
      </div>
    </Link>
  );
}
