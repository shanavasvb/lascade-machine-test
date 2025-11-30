"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Users, Briefcase, Settings, Zap, Star, CheckCircle, ChevronDown } from "lucide-react";
import type { CarResult } from "@/types/search";

interface CarCardProps {
  car: CarResult;
}

export default function CarCard({ car }: CarCardProps) {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);
  const isElectric = car.car.fuel?.toLowerCase().includes("electric");

  const handleBookNow = () => {
    // Calculate days (mock calculation - you should get this from search params)
    const days = 5;
    const totalPrice = car.price * days;

    // Build payment URL with booking details
    const params = new URLSearchParams({
      car_name: car.car.name,
      car_type: car.car.type,
      agency: car.agency.name,
      pickup: car.pickup_location,
      dropoff: car.pickup_location,
      pickup_date: new Date().toISOString().split('T')[0],
      dropoff_date: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      days: days.toString(),
      price: car.price.toString(),
      total: totalPrice.toString(),
      image: car.car.image,
    });

    router.push(`/payment?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-[20px] shadow-[var(--shadow-card)] hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Car Image */}
      <div className="relative h-48 bg-gray-100">
        <Image
          src={car.car.image}
          alt={car.car.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {car.unlimited_mileage && (
          <div className="absolute top-3 right-3 bg-blue-500 text-white text-[11px] font-bold px-3 py-1 rounded-md shadow-md">
            UNLIMITED MILEAGE
          </div>
        )}
        {isElectric && (
          <div className="absolute top-3 left-3 bg-green-500 text-white text-[11px] font-bold px-3 py-1 rounded-md shadow-md flex items-center gap-1">
            <Zap className="w-3 h-3" />
            ELECTRIC
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Car Name & Type */}
        <h3 className="text-[18px] font-bold text-[var(--color-text-main)] mb-2">
          {car.car.name}
        </h3>
        
        {/* Car Details Grid */}
        <div className="grid grid-cols-3 gap-2 mb-3 text-[12px]">
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <Users className="w-4 h-4 text-gray-500 mb-1" />
            <span className="text-gray-700 font-medium">{car.car.passengers}</span>
            <span className="text-[10px] text-gray-400">Seats</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <Briefcase className="w-4 h-4 text-gray-500 mb-1" />
            <span className="text-gray-700 font-medium">{car.car.bags}</span>
            <span className="text-[10px] text-gray-400">Bags</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <Settings className="w-4 h-4 text-gray-500 mb-1" />
            <span className="text-gray-700 font-medium">
              {car.car.transmission === "Automatic" ? "Auto" : "Manual"}
            </span>
            <span className="text-[10px] text-gray-400">Trans</span>
          </div>
        </div>

        {/* Agency & Rating */}
        <div className="flex items-center justify-between mb-3 pb-3 border-b">
          <div className="flex items-center gap-2">
            <div className="relative w-5 h-5">
              <Image src={car.agency.logo} alt={car.agency.name} fill className="object-contain" />
            </div>
            <span className="text-[13px] text-[var(--color-text-muted)]">{car.agency.name}</span>
          </div>
          <span className="text-[13px] text-yellow-500 font-semibold flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-500" />
            {car.agency.rating}
          </span>
        </div>

        {/* Show More Details */}
        {showMore && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg space-y-2 text-[13px]">
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium">{car.car.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Category:</span>
              <span className="font-medium">{car.car.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fuel:</span>
              <span className="font-medium">{car.car.fuel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fuel Policy:</span>
              <span className="font-medium">{car.fuel_policy}</span>
            </div>
         
            {car.free_cancellation && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="font-semibold">Free Cancellation</span>
              </div>
            )}
          </div>
        )}

        {/* Show More Button */}
        <button
          onClick={() => setShowMore(!showMore)}
          className="w-full text-[13px] text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-semibold mb-3 flex items-center justify-center gap-1 transition-colors"
        >
          {showMore ? "Show Less" : "Show More"}
          <ChevronDown
            className={`w-3 h-3 transition-transform ${showMore ? "rotate-180" : ""}`}
          />
        </button>

        {/* Price & Button */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[24px] font-bold text-[var(--color-primary)]">
              ₹{car.price.toLocaleString()}
            </p>
            <p className="text-[12px] text-[var(--color-text-muted)]">per day</p>
          </div>
          <button 
            onClick={handleBookNow}
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold text-[14px] px-6 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}   