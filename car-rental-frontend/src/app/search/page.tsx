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
  const [showFilters, setShowFilters] = useState(false); // Mobile filter toggle
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
        console.error("Failed to fetch filters:", error);
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
    setShowFilters(false); // Close filters on mobile after applying
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
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 sm:py-12">
          <div className="animate-pulse">
            <div className="h-6 sm:h-8 bg-gray-200 rounded w-48 sm:w-64 mb-6 sm:mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 sm:gap-8">
              <div className="hidden lg:block h-[600px] bg-white rounded-[20px]" />
              <div className="space-y-4 sm:space-y-6">
                <div className="h-12 sm:h-16 bg-white rounded-[20px]" />
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-[350px] sm:h-[400px] bg-white rounded-[20px]" />
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
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white/90 z-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full px-4 sm:px-8">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-[var(--color-text-main)] mb-6">
              We are searching for your perfect car at the best price
            </h2>
            
            <div className="relative w-full h-6 sm:h-8 bg-gray-200 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)] animate-progress-bar"></div>
            </div>

            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 text-center">
              <div className="sm:border-r border-gray-300 pb-6 sm:pb-0">
                <p className="text-sm text-gray-600 mb-2">Quick and secure payment process</p>
                <p className="text-xs text-gray-500">secure payment process</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-[var(--color-text-main)] mb-1">100%</p>
                <p className="text-xs sm:text-sm bg-yellow-400 text-black font-semibold inline-block px-3 sm:px-4 py-1">
                  Secure Transaction
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-[32px] lg:text-[40px] font-bold text-[var(--color-text-main)] mb-2">
            Available Cars
          </h1>
          <div className="flex flex-col gap-1">
            {searchParams.get("pickup_location") && (
              <p className="text-sm sm:text-[15px] text-[var(--color-text-muted)]">
                Pickup: {searchParams.get("pickup_location")}
                {searchParams.get("pickup_date") && ` on ${searchParams.get("pickup_date")}`}
              </p>
            )}
            {searchParams.get("dropoff_location") && (
              <p className="text-sm sm:text-[15px] text-[var(--color-text-muted)]">
                Dropoff: {searchParams.get("dropoff_location")}
                {searchParams.get("dropoff_date") && ` on ${searchParams.get("dropoff_date")}`}
              </p>
            )}
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(true)}
            className="w-full bg-white rounded-xl px-4 py-3 flex items-center justify-between shadow-sm border border-gray-200 hover:bg-gray-50 active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <span className="font-semibold text-gray-900">Filters</span>
            </div>
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 sm:gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Mobile Sidebar Overlay */}
          {showFilters && (
            <>
              {/* Backdrop */}
              <div 
                className="lg:hidden fixed inset-0 bg-black/50 z-40"
                onClick={() => setShowFilters(false)}
              />
              
              {/* Sidebar */}
              <div className="lg:hidden fixed inset-y-0 left-0 w-full max-w-sm bg-white z-50 overflow-y-auto">
                {/* Mobile Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Filter Content */}
                <div className="p-4">
                  <FilterSidebar
                    filters={filters}
                    activeFilters={activeFilters}
                    onFilterChange={handleFilterChange}
                  />
                </div>

                {/* Mobile Apply Button */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold py-3 rounded-xl transition-all active:scale-[0.98]"
                  >
                    Show Results ({cars?. count || 0})
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Main Content */}
          <div>
            <SortBar
              totalResults={cars?.count || 0}
              sortBy={activeFilters.sort_by || ""}
              onSortChange={handleSortChange}
            />

            {cars && cars. results.length > 0 ?  (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
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
              <div className="bg-white rounded-[20px] shadow-[var(--shadow-card)] p-6 sm:p-12 text-center">
                <div className="text-5xl sm:text-6xl mb-4">🚗</div>
                <h3 className="text-xl sm:text-[24px] font-bold text-[var(--color-text-main)] mb-2">
                  No cars found in this location
                </h3>
                <p className="text-sm sm:text-base text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">
                  We couldnot find any cars in {searchParams. get("pickup_location") || "this location"}. Try a different location or adjust your filters.
                </p>
                <button
                  onClick={() => window.location. href = '/'}
                  className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold px-6 sm:px-8 py-2. 5 sm:py-3 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95 text-sm sm:text-base"
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
      <div className="bg-[var(--color-bg-page)] min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-[var(--color-primary)] border-t-transparent mb-4"></div>
          <p className="text-sm sm:text-base text-[var(--color-text-muted)]">Loading search results...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
