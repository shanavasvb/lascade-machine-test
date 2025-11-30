"use client";

import { useRef, useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onChange: (start: Date, end: Date) => void;
  showCalendar: boolean;
  onToggleCalendar: () => void;
}

export default function DateRangePicker({
  startDate,
  endDate,
  onChange,
  showCalendar,
  onToggleCalendar,
}: DateRangePickerProps) {
  const pickupCalRef = useRef<HTMLDivElement>(null);
  const returnCalRef = useRef<HTMLDivElement>(null);
  const [showPickupCal, setShowPickupCal] = useState(false);
  const [showReturnCal, setShowReturnCal] = useState(false);

  // Close calendars when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickupCalRef.current &&
        !pickupCalRef.current.contains(event.target as Node)
      ) {
        setShowPickupCal(false);
      }
      if (
        returnCalRef.current &&
        !returnCalRef.current.contains(event.target as Node)
      ) {
        setShowReturnCal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRangeChange = (item: any) => {
    const start = item.selection.startDate;
    const end = item.selection.endDate;
    onChange(start, end);
  };

  return (
    <>
      <style>{`
        /* Disable past dates */
        .rdrDay.rdrDayPassive {
          pointer-events: none;
          opacity: 0.3;
        }
        
        .rdrDay.rdrDayDisabled {
          pointer-events: none;
          opacity: 0.3;
        }
        
        /* Default day styling */
        .rdrDay .rdrDayNumber span {
          color: #1a1a1a;
          font-weight: 400;
        }
        
        /* Start and End date circles */
        .rdrDay .rdrStartEdge,
        .rdrDay .rdrEndEdge {
          background: #0A8A61 !important;
          border-radius: 50% !important;
        }
        
        .rdrDay .rdrStartEdge ~ .rdrDayNumber span,
        .rdrDay .rdrEndEdge ~ .rdrDayNumber span {
          color: #ffffff !important;
          font-weight: 600 !important;
        }
        
        /* Range in between - pill shape */
        .rdrDay .rdrInRange {
          background: #0A8A61 !important;
          border-radius: 0 !important;
        }
        
        .rdrDay .rdrInRange ~ .rdrDayNumber span {
          color: #ffffff !important;
          font-weight: 500 !important;
        }
        
        /* First day of range - rounded left */
        .rdrDay .rdrStartEdge {
          border-radius: 50% 0 0 50% !important;
        }
        
        /* Last day of range - rounded right */
        .rdrDay .rdrEndEdge {
          border-radius: 0 50% 50% 0 !important;
        }
        
        /* Single day selection (start and end same day) */
        .rdrDay .rdrStartEdge.rdrEndEdge {
          border-radius: 50% !important;
        }
        
        /* Today indicator */
        .rdrDay.rdrDayToday:not(.rdrDayPassive) .rdrDayNumber span:after {
          background: transparent !important;
          border: 2px solid #0A8A61;
        }
        
        /* Hover preview */
        .rdrDay .rdrDayStartPreview,
        .rdrDay .rdrDayInPreview,
        .rdrDay .rdrDayEndPreview {
          background: rgba(10, 138, 97, 0.2) !important;
          border: 0 !important;
        }
        
        /* Remove borders from range */
        .rdrDay .rdrStartEdge,
        .rdrDay .rdrEndEdge,
        .rdrDay .rdrInRange {
          border: 0 !important;
        }
        
        /* Calendar wrapper styling */
        .rdrCalendarWrapper {
          padding: 10px;
          background: white;
        }
        
        .rdrMonth {
          padding: 0;
        }
        
        /* Month navigation */
        .rdrMonthAndYearWrapper {
          padding-bottom: 10px;
        }
        
        .rdrMonthPicker select,
        .rdrYearPicker select {
          padding: 5px 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 14px;
        }
      `}</style>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Pickup Date */}
        <div className="relative" ref={pickupCalRef}>
          <button
            type="button"
            onClick={() => {
              setShowPickupCal(!showPickupCal);
              setShowReturnCal(false);
            }}
            className="w-full pl-12 pr-4 py-3.5 border border-[var(--color-border-input)] rounded-[var(--radius-input)]
              text-left text-[15px] text-[var(--color-text-main)]
              hover:border-[var(--color-primary)]/50
              focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20
              transition-all"
          >
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
            {format(startDate, "MMM dd, yyyy")}
          </button>

          {showPickupCal && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl border border-[var(--color-border-input)] shadow-xl overflow-hidden z-50">
              <DateRange
                ranges={[
                  {
                    startDate: startDate,
                    endDate: endDate,
                    key: "selection",
                  },
                ]}
                onChange={handleRangeChange}
                months={1}
                direction="horizontal"
                rangeColors={["#0A8A61"]}
                minDate={new Date()}
                showDateDisplay={false}
              />
            </div>
          )}
        </div>

        {/* Return Date */}
        <div className="relative" ref={returnCalRef}>
          <button
            type="button"
            onClick={() => {
              setShowReturnCal(!showReturnCal);
              setShowPickupCal(false);
            }}
            className="w-full pl-12 pr-4 py-3.5 border border-[var(--color-border-input)] rounded-[var(--radius-input)]
              text-left text-[15px] text-[var(--color-text-main)]
              hover:border-[var(--color-primary)]/50
              focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20
              transition-all"
          >
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
            {format(endDate, "MMM dd, yyyy")}
          </button>

          {showReturnCal && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl border border-[var(--color-border-input)] shadow-xl overflow-hidden z-50">
              <DateRange
                ranges={[
                  {
                    startDate: startDate,
                    endDate: endDate,
                    key: "selection",
                  },
                ]}
                onChange={handleRangeChange}
                months={1}
                direction="horizontal"
                rangeColors={["#0A8A61"]}
                minDate={new Date()}
                showDateDisplay={false}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}