"use client";

import { useState, useRef, useEffect } from "react";
import { Plane } from "lucide-react";
import { LOCATIONS, type Location } from "@/data/location";

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function LocationInput({
  value,
  onChange,
  placeholder = "Enter location",
}: LocationInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filtered, setFiltered] = useState<Location[]>(LOCATIONS);
  const ref = useRef<HTMLDivElement>(null);

  // Filter locations based on input value
  useEffect(() => {
    if (value.trim().length === 0) {
      setFiltered(LOCATIONS);
    } else {
      setFiltered(
        LOCATIONS.filter((loc) =>
          loc.name.toLowerCase().includes(value.toLowerCase()) ||
          loc.full_address.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (location: Location) => {
    onChange(location.name);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        {/* Airplane Icon */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
          <Plane 
            className="w-5 h-5 text-[var(--color-primary)]" 
            strokeWidth={2}
          />
        </div>

        {/* Input - Adjusted to match Figma spacing */}
        <input
          value={value}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-14 pr-5 py-4 rounded-xl
            text-[15px] text-[var(--color-text-main)] font-medium
            border transition-all
            ${
              isOpen
                ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/10"
                : "border-gray-200 hover:border-[var(--color-primary)]/50"
            }
            placeholder:text-gray-400 placeholder:font-normal
            focus:outline-none
            bg-white
          `}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 left-0 right-0 bg-white rounded-xl border border-gray-200 shadow-xl max-h-[280px] overflow-y-auto">
          {filtered.length > 0 ? (
            <div className="py-1">
              {filtered.map((loc, idx) => (
                <button
                  key={`${loc.name}-${idx}`}
                  onClick={() => handleSelect(loc)}
                  className="w-full px-5 py-3.5 flex items-start gap-3 text-left
                    hover:bg-[var(--color-primary)]/5 hover:text-[var(--color-primary)] transition-colors
                    border-b border-gray-100 last:border-0"
                >
                  <Plane 
                    className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" 
                    strokeWidth={2}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-[var(--color-text-main)]">
                      {loc.name}
                    </p>
                    <p className="text-[12px] text-[var(--color-text-muted)] truncate mt-0.5">
                      {loc.full_address}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <Plane className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-[var(--color-text-muted)]">
                No locations found
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}