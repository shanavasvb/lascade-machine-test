"use client";

import { useState, useEffect } from "react";
import { addDays, format } from "date-fns";
import { useRouter } from "next/navigation";
import LocationInput from "./LocationInput";
import DateRangePicker from "./date-range-picker";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function SearchBar() {
  const router = useRouter();
  const [pickup, setPickup] = useState("");
  const [pickupSearch, setPickupSearch] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [dropoffSearch, setDropoffSearch] = useState("");
  const [showDropoff, setShowDropoff] = useState(false);
  const [priceAlert, setPriceAlert] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    const now = new Date();
    setStartDate(now);
    setEndDate(addDays(now, 5));
    setMounted(true);
  }, []);

  const handleDateChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handlePickupChange = (displayValue: string, searchValue: string) => {
    setPickup(displayValue);
    setPickupSearch(searchValue);
  };

  const handleDropoffChange = (displayValue: string, searchValue: string) => {
    setDropoff(displayValue);
    setDropoffSearch(searchValue);
  };
const handleSearch = () => {
  if (!pickup) {
    alert("Please enter a pickup location");
    return;
  }

  // ✅ ADD THESE DEBUG LOGS
  console.log("DEBUG - pickup display:", pickup);
  console.log("DEBUG - pickupSearch value:", pickupSearch);
  console.log("DEBUG - Sending to API:", pickupSearch || pickup);

  const params = new URLSearchParams();
  params.append("pickup_location", pickupSearch || pickup);

    
    if (showDropoff && dropoff) {
      params. append("dropoff_location", dropoffSearch || dropoff);
    }
    
    if (startDate) {
      params.append("pickup_date", format(startDate, "yyyy-MM-dd"));
    }
    
    if (endDate) {
      params. append("dropoff_date", format(endDate, "yyyy-MM-dd"));
    }
    
    if (priceAlert) {
      params.append("alert", "true");
    }

    router.push(`/search? ${params.toString()}`);
  };

  if (!mounted || !startDate || !endDate) {
    return (
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
        <div className="space-y-5 animate-pulse">
          <div className="h-[56px] bg-gray-100 rounded-xl" />
          <div className="h-[20px] bg-gray-100 rounded w-48" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-[56px] bg-gray-100 rounded-xl" />
            <div className="h-[56px] bg-gray-100 rounded-xl" />
          </div>
          <div className="h-[20px] bg-gray-100 rounded w-56" />
          <div className="h-[56px] bg-gray-100 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
      <div className="space-y-5">
        <div className="relative">
          <LocationInput
            value={pickup}
            onChange={handlePickupChange}
            placeholder="Enter pick up location"
          />
          
          {! showDropoff && (
            <div className="absolute left-[30px] top-[62px] w-[2px] h-[18px] bg-[var(--color-primary)]/30" />
          )}
        </div>

        <button
          onClick={() => setShowDropoff(!showDropoff)}
          className="flex items-center gap-2 text-[15px] text-[var(--color-primary)] font-semibold hover:text-[var(--color-primary-hover)] transition-colors pl-[22px]"
        >
          <div className="w-5 h-5 rounded-full border-2 border-[var(--color-primary)] flex items-center justify-center">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {showDropoff ? (
                <line x1="3" y1="6" x2="9" y2="6" />
              ) : (
                <>
                  <line x1="6" y1="3" x2="6" y2="9" />
                  <line x1="3" y1="6" x2="9" y2="6" />
                </>
              )}
            </svg>
          </div>
          {showDropoff ?  "Remove Different Drop Off" : "Add Different Drop Off"}
        </button>

        {showDropoff && (
          <div className="relative">
            <LocationInput
              value={dropoff}
              onChange={handleDropoffChange}
              placeholder="Enter drop off location"
            />
          </div>
        )}

        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
        />

        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={priceAlert}
              onChange={(e) => setPriceAlert(e.target.checked)}
              className="w-5 h-5 rounded border-2 border-gray-300 checked:border-[var(--color-primary)] checked:bg-[var(--color-primary)] cursor-pointer appearance-none transition-all"
            />
            {priceAlert && (
              <svg
                className="absolute inset-0 w-5 h-5 text-white pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="text-[15px] text-[var(--color-primary)] font-semibold group-hover:text-[var(--color-primary-hover)] transition-colors">
            Alert me when price drops
          </span>
        </label>

        <button
          onClick={handleSearch}
          className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] 
            text-white font-bold text-[16px] py-4 rounded-xl
            transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          Search
        </button>
      </div>
    </div>
  );
}