"use client";

import { useRef, useEffect } from "react";
import { format } from "date-fns";

interface CalendarInputProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  placeholder?: string;
  showCalendar?: boolean;
  onToggleCalendar?: () => void;
}

export default function CalendarInput({
  label,
  value,
  onChange,
  placeholder = "Select date",
  showCalendar = false,
  onToggleCalendar,
}: CalendarInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        // Calendar closing is handled by parent
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={onToggleCalendar}
        className="w-full pl-12 pr-4 py-3.5 border border-[var(--color-border-input)] rounded-[var(--radius-input)]
          text-left text-[15px] text-[var(--color-text-main)]
          hover:border-[var(--color-primary)]/50
          focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20
          transition-all relative"
      >
        {/* Calendar Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            width="20"
            height="20"
            stroke="var(--color-primary)"
            strokeWidth="2"
            fill="none"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>

        {/* Date Text */}
        <span className={value ?  "text-[var(--color-text-main)]" : "text-[var(--color-text-muted)]"}>
          {value ? format(value, "MMM dd, yyyy") : placeholder}
        </span>
      </button>

      {/* Label (optional - can be rendered outside) */}
      {label && (
        <span className="absolute -top-2 left-3 px-1 bg-[var(--color-bg-card)] text-xs text-[var(--color-text-muted)]">
          {label}
        </span>
      )}
    </div>
  );
}