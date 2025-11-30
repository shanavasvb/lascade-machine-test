"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { fetchCars, fetchFilters } from "@/lib/search-api";
import type { ApiResponse, Filters, SearchFilters } from "@/types/search";
import FilterSidebar from "@/components/search/FilterSidebar";
import SortBar from "@/components/search/SortBar";
import CarCard from "@/components/search/CarCard";
import Pagination from "@/components/search/Pagination";

function SearchContent() {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<ApiResponse | null>(null);
  const [filters, setFilters] = useState<Filters | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<SearchFilters>({
    page: 1,
    limit: 12,
  });

  // Get location from URL params on mount
  useEffect(() => {
    const pickupLocation = searchParams.get("pickup_location");
    const dropoffLocation = searchParams.get("dropoff_location");
    
    setActiveFilters(prev => ({
      ...prev,
      pickup_location: pickupLocation || undefined,
      dropoff_location: dropoffLocation || undefined,
    }));
  }, [searchParams]);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const data = await fetchFilters();
        setFilters(data);
      } catch (error) {
        console. error("Failed to fetch filters:", error);
      }
    };
    loadFilters();
  }, []);

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      try {
        const data = await fetchCars(activeFilters);
        setCars(data);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      } finally {
        setLoading(false);
      }
    };

    if (filters) {
      loadCars();
    }
  }, [activeFilters, filters]);

  const handleFilterChange = (newFilters: SearchFilters) => {
    setActiveFilters({ ...newFilters, limit: 12 });
  };

  const handleSortChange = (sortBy: string) => {
    setActiveFilters({ ...activeFilters, sort_by: sortBy as any, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setActiveFilters({ ...activeFilters, page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (! filters) {
    return (
      <div className="bg-[var(--color-bg-page)] min-h-screen">
        <div className="max-w-[1440px] mx-auto px-6 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
              <div className="h-[600px] bg-white rounded-[20px]" />
              <div className="space-y-6">
                <div className="h-16 bg-white rounded-[20px]" />
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-[400px] bg-white rounded-[20px]" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-bg-page)] min-h-screen">
      {loading && (
        <div className="fixed inset-0 bg-white/90 z-50 flex items-center justify-center">
          <div className="max-w-2xl w-full px-8">
            <h2 className="text-2xl font-bold text-center text-[var(--color-text-main)] mb-6">
              We are searching for your perfect car at the best price
            </h2>
            
            <div className="relative w-full h-8 bg-gray-200 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)] animate-progress-bar"></div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-8 text-center">
              <div className="border-r border-gray-300">
                <p className="text-sm text-gray-600 mb-2">Quick and secure payment process</p>
                <p className="text-xs text-gray-500">secure payment process</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-[var(--color-text-main)] mb-1">100%</p>
                <p className="text-sm bg-yellow-400 text-black font-semibold inline-block px-4 py-1">
                  Secure Transaction
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-[32px] lg:text-[40px] font-bold text-[var(--color-text-main)] mb-2">
            Available Cars
          </h1>
          <div className="flex flex-col gap-1">
            {searchParams.get("pickup_location") && (
              <p className="text-[15px] text-[var(--color-text-muted)]">
                Pickup: {searchParams.get("pickup_location")}
                {searchParams.get("pickup_date") && ` on ${searchParams.get("pickup_date")}`}
              </p>
            )}
            {searchParams.get("dropoff_location") && (
              <p className="text-[15px] text-[var(--color-text-muted)]">
                Dropoff: {searchParams.get("dropoff_location")}
                {searchParams.get("dropoff_date") && ` on ${searchParams.get("dropoff_date")}`}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <FilterSidebar
            filters={filters}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
          />

          <div>
            <SortBar
              totalResults={cars?.count || 0}
              sortBy={activeFilters.sort_by || ""}
              onSortChange={handleSortChange}
            />

            {cars && cars.results.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {cars.results.map((car, index) => (
                    <CarCard key={`${car.car.id}-${car.agency.name}-${car.price}-${index}`} car={car} />
                  ))}
                </div>

                {cars.total_pages > 1 && (
                  <Pagination
                    currentPage={cars.page}
                    totalPages={cars.total_pages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            ) : (
              <div className="bg-white rounded-[20px] shadow-[var(--shadow-card)] p-12 text-center">
                <h3 className="text-[24px] font-bold text-[var(--color-text-main)] mb-2">
                  No cars found in this location
                </h3>
                <p className="text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">
                  We couldn't find any cars in {searchParams.get("pickup_location") || "this location"}. Try a different location or adjust your filters.
                </p>
                <button
                  onClick={() => window.location.href = '/'}
                  className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                  Search Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="bg-[var(--color-bg-page)] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-primary)] border-t-transparent mb-4"></div>
          <p className="text-[var(--color-text-muted)]">Loading search results...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}