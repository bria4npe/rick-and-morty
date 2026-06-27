export function Pagination({ page, info, onPage }) {
  if (!info || info.pages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 text-white">
      <button
        onClick={() => onPage(page - 1)}
        disabled={!info.prev}
        className="rounded px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        ← Anterior
      </button>
      <span className="text-gray-400">
        {page} / {info.pages}
      </span>
      <button
        onClick={() => onPage(page + 1)}
        disabled={!info.next}
        className="rounded px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Siguiente →
      </button>
    </div>
  );
}
