"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Check, Home, FileText } from "lucide-react";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const bookingId = searchParams.get('booking_id') || 'BK-UNKNOWN';
  const carName = searchParams.get('car_name') || 'Car';
  const total = searchParams.get('total') || '0';
  const pickupDate = searchParams.get('pickup_date') || '';
  const dropoffDate = searchParams.get('dropoff_date') || '';

  return (
    <div className="min-h-screen bg-[var(--color-bg-page)] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-[32px] shadow-2xl p-8 md:p-12 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-main)] mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-lg text-[var(--color-text-muted)] mb-8">
          Your booking has been confirmed. Check your email for the confirmation details.
        </p>

        <div className="bg-[var(--color-bg-page)] rounded-2xl p-6 mb-8 text-left">
          <h3 className="font-bold text-[var(--color-text-main)] mb-4 text-lg">Booking Summary</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">Booking ID:</span>
              <span className="font-semibold text-[var(--color-text-main)]">{bookingId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">Car:</span>
              <span className="font-semibold text-[var(--color-text-main)]">{carName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">Pickup:</span>
              <span className="font-semibold text-[var(--color-text-main)]">{pickupDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">Dropoff:</span>
              <span className="font-semibold text-[var(--color-text-main)]">{dropoffDate}</span>
            </div>
            <div className="flex justify-between pt-3 border-t">
              <span className="text-[var(--color-text-main)] font-bold">Total Paid:</span>
              <span className="font-bold text-green-600 text-xl">Rs {parseInt(total).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/')}
            className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-[var(--color-text-main)] font-semibold px-8 py-3 rounded-xl transition-all"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
          <button
            onClick={() => alert('Confirmation sent to your email!')}
            className="flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-md"
          >
            <FileText className="w-5 h-5" />
            View Confirmation
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--color-bg-page)] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-primary)] border-t-transparent mb-4"></div>
          <p className="text-[var(--color-text-muted)]">Loading... </p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}