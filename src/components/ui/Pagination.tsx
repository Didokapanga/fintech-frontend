type Props = {
  page: number;
  onChange: (page: number) => void;
};

export default function Pagination({ page, onChange }: Props) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        ← Précédent
      </button>

      <span className="px-3 py-1 text-sm">
        Page {page}
      </span>

      <button
        onClick={() => onChange(page + 1)}
        className="px-3 py-1 border rounded"
      >
        Suivant →
      </button>
    </div>
  );
}