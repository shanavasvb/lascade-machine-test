"use client";

interface SortBarProps {
  totalResults: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function SortBar({ totalResults, sortBy, onSortChange }: SortBarProps) {
  return (
    <div className="bg-white rounded-[20px] shadow-[var(--shadow-card)] p-4 flex items-center justify-between mb-6">
      <p className="text-[15px] text-[var(--color-text-muted)]">
        <span className="font-semibold text-[var(--color-text-main)]">{totalResults}</span> cars found
      </p>

      <div className="flex items-center gap-3">
        <span className="text-[14px] text-[var(--color-text-muted)]">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-[14px] font-medium text-[var(--color-text-main)] cursor-pointer hover:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 transition-colors"
        >
          <option value="">Recommended</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Rating</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>
    </div>
  );
}