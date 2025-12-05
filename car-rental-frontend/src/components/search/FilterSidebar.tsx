"use client";

import { useState } from "react";
import type { Filters, SearchFilters } from "@/types/search";
import Image from "next/image";

interface FilterSidebarProps {
  filters: Filters;
  activeFilters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
}

export default function FilterSidebar({
  filters,
  activeFilters,
  onFilterChange,
}: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState({
    min: activeFilters.min_price || 0,
    max: activeFilters.max_price || 100000,
  });

  // Multiple car types
  const [selectedCarTypes, setSelectedCarTypes] = useState<string[]>(
    activeFilters.car_type ? [activeFilters.car_type] : []
  );

  // Multiple categories
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    activeFilters.category ? [activeFilters.category] : []
  );

  // Multiple fuel types
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>(
    activeFilters.fuel ? [activeFilters.fuel] : []
  );

  // Multiple agencies
  const [selectedAgencies, setSelectedAgencies] = useState<string[]>(
    activeFilters.agency ? [activeFilters.agency] : []
  );

  const handleCarTypeToggle = (type: string) => {
    const updated = selectedCarTypes.includes(type)
      ? selectedCarTypes.filter((t) => t !== type)
      : [...selectedCarTypes, type];
    
    setSelectedCarTypes(updated);
    onFilterChange({
      ...activeFilters,
      car_type: updated.length > 0 ? updated.join(",") : undefined,
      page: 1,
    });
  };

  const handleCategoryToggle = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(updated);
    onFilterChange({
      ...activeFilters,
      category: updated.length > 0 ? updated.join(",") : undefined,
      page: 1,
    });
  };

  const handleFuelToggle = (fuel: string) => {
    const updated = selectedFuelTypes.includes(fuel)
      ? selectedFuelTypes.filter((f) => f !== fuel)
      : [...selectedFuelTypes, fuel];
    
    setSelectedFuelTypes(updated);
    onFilterChange({
      ...activeFilters,
      fuel: updated.length > 0 ? updated.join(",") : undefined,
      page: 1,
    });
  };

  const handleAgencyToggle = (agencyName: string) => {
    const updated = selectedAgencies.includes(agencyName)
      ? selectedAgencies.filter((a) => a !== agencyName)
      : [...selectedAgencies, agencyName];
    
    setSelectedAgencies(updated);
    onFilterChange({
      ...activeFilters,
      agency: updated.length > 0 ? updated.join(",") : undefined,
      page: 1,
    });
  };

  const handlePriceChange = () => {
    onFilterChange({
      ...activeFilters,
      min_price: priceRange.min,
      max_price: priceRange.max,
      page: 1,
    });
  };

  const handleToggleChange = (key: "unlimited_mileage") => {
    onFilterChange({
      ...activeFilters,
      [key]: !activeFilters[key],
      page: 1,
    });
  };

  // ✅ FIX: Preserve pickup and dropoff locations when clearing filters
  const clearAllFilters = () => {
    setPriceRange({
      min: filters.price_range.min,
      max: filters.price_range.max,
    });
    setSelectedCarTypes([]);
    setSelectedCategories([]);
    setSelectedFuelTypes([]);
    setSelectedAgencies([]);
    
    // ✅ Keep location data intact
    onFilterChange({ 
      page: 1, 
      limit: 12,
      pickup_location: activeFilters.pickup_location,
      dropoff_location: activeFilters.dropoff_location,
    });
  };

  return (
    <div className="bg-white rounded-[20px] shadow-[var(--shadow-card)] p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[20px] font-bold text-[var(--color-text-main)]">Filters</h2>
        <button
          onClick={clearAllFilters}
          className="text-[14px] text-[var(--color-primary)] hover:underline font-semibold"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-6">
        {/* Car Type */}
        <FilterSection title="Car Type">
          <div className="space-y-2">
            {filters.car_types.map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedCarTypes.includes(type)}
                  onChange={() => handleCarTypeToggle(type)}
                  className="w-4 h-4 rounded border-2 border-gray-300 accent-[var(--color-primary)] cursor-pointer"
                />
                <span className="text-[14px] text-[var(--color-text-main)] group-hover:text-[var(--color-primary)] transition-colors">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Category */}
        {filters.categories && filters.categories.length > 0 && (
          <FilterSection title="Category">
            <div className="space-y-2">
              {filters.categories.map((category) => (
                <label key={category} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="w-4 h-4 rounded border-2 border-gray-300 accent-[var(--color-primary)] cursor-pointer"
                  />
                  <span className="text-[14px] text-[var(--color-text-main)] group-hover:text-[var(--color-primary)] transition-colors">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>
        )}

        {/* Fuel Type */}
        <FilterSection title="Fuel Type">
          <div className="space-y-2">
            {filters.fuel_types.map((fuel) => (
              <label key={fuel} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedFuelTypes.includes(fuel)}
                  onChange={() => handleFuelToggle(fuel)}
                  className="w-4 h-4 rounded border-2 border-gray-300 accent-[var(--color-primary)] cursor-pointer"
                />
                <span className="text-[14px] text-[var(--color-text-main)] group-hover:text-[var(--color-primary)] transition-colors">
                  {fuel}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Agencies */}
        <FilterSection title="Rental Agencies">
          <div className="space-y-2">
            {filters.agencies.map((agency, index) => (
              <label 
                key={`${agency.name}-${agency.code || index}`} 
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedAgencies.includes(agency.name)}
                  onChange={() => handleAgencyToggle(agency.name)}
                  className="w-4 h-4 rounded border-2 border-gray-300 accent-[var(--color-primary)] cursor-pointer"
                />
                <div className="flex items-center gap-2 flex-1">
                  <div className="relative w-6 h-6">
                    <Image
                      src={agency.logo}
                      alt={agency.name}
                      fill
                      className="object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <span className="text-[14px] text-[var(--color-text-main)] group-hover:text-[var(--color-primary)] transition-colors">
                    {agency.name}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
                placeholder="Min"
              />
              <span className="text-gray-400">—</span>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
                placeholder="Max"
              />
            </div>
            <button
              onClick={handlePriceChange}
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold text-[14px] py-2 rounded-lg transition-colors"
            >
              Apply
            </button>
          </div>
        </FilterSection>

        {/* Special Filters */}
        <FilterSection title="Special Offers">
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-[14px] font-semibold text-[var(--color-text-main)] group-hover:text-[var(--color-primary)] transition-colors">
                UNLIMITED MILEAGE
              </span>
              <input
                type="checkbox"
                checked={activeFilters.unlimited_mileage || false}
                onChange={() => handleToggleChange("unlimited_mileage")}
                className="w-10 h-5 appearance-none bg-gray-300 rounded-full relative cursor-pointer transition-colors checked:bg-[var(--color-primary)] before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 before:transition-transform checked:before:translate-x-5"
              />
            </label>
          </div>
        </FilterSection>
      </div>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-gray-100 pb-6 last:border-0">
      <h3 className="text-[16px] font-bold text-[var(--color-text-main)] mb-4">{title}</h3>
      {children}
    </div>
  );
}