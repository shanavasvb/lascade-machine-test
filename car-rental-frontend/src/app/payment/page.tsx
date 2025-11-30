"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CreditCard, Calendar, Lock, Check, ArrowLeft, User, Mail, Phone, MapPin } from "lucide-react";

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [processing, setProcessing] = useState(false);
  
  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
  });

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  // Get booking data from URL params
  const bookingData = {
    carName: searchParams. get('car_name') || 'Chevrolet Spark',
    carType: searchParams.get('car_type') || 'Economy',
    agency: searchParams. get('agency') || 'Hertz',
    pickupLocation: searchParams.get('pickup') || 'Las Vegas Airport',
    dropoffLocation: searchParams.get('dropoff') || 'Las Vegas Airport',
    pickupDate: searchParams.get('pickup_date') || '2025-01-15',
    dropoffDate: searchParams.get('dropoff_date') || '2025-01-20',
    days: parseInt(searchParams.get('days') || '5'),
    pricePerDay: parseInt(searchParams.get('price') || '0'),
    totalPrice: parseInt(searchParams. get('total') || '31185'),
    carImage: searchParams.get('image') || 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
  };

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    setTimeout(() => {
      const bookingId = 'BK-' + Math.random().toString(36).substr(2, 9). toUpperCase();
      router.push(`/payment/success? booking_id=${bookingId}&car_name=${bookingData. carName}&total=${bookingData.totalPrice}&pickup_date=${bookingData.pickupDate}&dropoff_date=${bookingData.dropoffDate}`);
    }, 2500);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, ''). replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts. push(match.substring(i, i + 4));
    }
    return parts.length ?  parts.join(' ') : value;
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-page)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => step === 'payment' ?  setStep('details') : router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-main)]">
            {step === 'details' ? 'Your Details' : 'Payment'}
          </h1>
          <p className="text-[var(--color-text-muted)] mt-2">
            {step === 'details' 
              ? 'Please provide your information to continue' 
              : 'Complete your booking with secure payment'}
          </p>
        </div>

        <div className="mb-8 flex items-center justify-center gap-4">
          <div className={`flex items-center gap-2 ${step === 'details' ? 'text-[var(--color-primary)]' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step === 'details' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <span className="hidden sm:inline font-medium">Details</span>
          </div>
          <div className="w-12 h-1 bg-gray-200"></div>
          <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-[var(--color-primary)]' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step === 'payment' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <span className="hidden sm:inline font-medium">Payment</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 'details' ? (
              <form onSubmit={handleCustomerSubmit} className="bg-white rounded-[20px] shadow-[var(--shadow-card)] p-6 md:p-8">
                <h2 className="text-xl font-bold text-[var(--color-text-main)] mb-6">Contact Information</h2>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-main)] mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerDetails. firstName}
                      onChange={(e) => setCustomerDetails({... customerDetails, firstName: e.target.value})}
                      className="w-full px-4 py-3 border border-[var(--color-border-input)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all"
                      placeholder="first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-main)] mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerDetails. lastName}
                      onChange={(e) => setCustomerDetails({... customerDetails, lastName: e.target.value})}
                      className="w-full px-4 py-3 border border-[var(--color-border-input)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all"
                      placeholder="last name"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[var(--color-text-main)] mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerDetails.email}
                    onChange={(e) => setCustomerDetails({...customerDetails, email: e.target. value})}
                    className="w-full px-4 py-3 border border-[var(--color-border-input)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all"
                    placeholder="name@example.com"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[var(--color-text-main)] mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-[var(--color-border-input)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all"
                    placeholder="Phone Number"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[var(--color-text-main)] mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerDetails.address}
                    onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                    className="w-full px-4 py-3 border border-[var(--color-border-input)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-main)] mb-2">City *</label>
                    <input
                      type="text"
                      required
                      value={customerDetails.city}
                      onChange={(e) => setCustomerDetails({...customerDetails, city: e.target.value})}
                      className="w-full px-4 py-3 border border-[var(--color-border-input)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all"
                      placeholder="Las Vegas"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-main)] mb-2">Country *</label>
                    <input
                      type="text"
                      required
                      value={customerDetails.country}
                      onChange={(e) => setCustomerDetails({...customerDetails, country: e.target.value})}
                      className="w-full px-4 py-3 border border-[var(--color-border-input)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all"
                      placeholder="United States"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg text-lg"
                >
                  Continue to Payment
                </button>
              </form>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="bg-white rounded-[20px] shadow-[var(--shadow-card)] p-6 md:p-8">
                <h2 className="text-xl font-bold text-[var(--color-text-main)] mb-6">Payment Details</h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[var(--color-text-main)] mb-2">
                    <CreditCard className="w-4 h-4 inline mr-1" />
                    Card Number *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={19}
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({...cardDetails, cardNumber: formatCardNumber(e.target.value)})}
                    className="w-full px-4 py-3 border border-[var(--color-border-input)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all text-lg"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[var(--color-text-main)] mb-2">Cardholder Name *</label>
                  <input
                    type="text"
                    required
                    value={cardDetails.cardName}
                    onChange={(e) => setCardDetails({...cardDetails, cardName: e.target.value. toUpperCase()})}
                    className="w-full px-4 py-3 border border-[var(--color-border-input)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all"
                    placeholder="your Name"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-main)] mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Month *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={2}
                      value={cardDetails.expiryMonth}
                      onChange={(e) => setCardDetails({...cardDetails, expiryMonth: e. target.value. replace(/\D/g, '')})}
                      className="w-full px-4 py-3 border border-[var(--color-border-input)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all"
                      placeholder="MM"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-main)] mb-2">Year *</label>
                    <input
                      type="text"
                      required
                      maxLength={2}
                      value={cardDetails.expiryYear}
                      onChange={(e) => setCardDetails({...cardDetails, expiryYear: e.target.value.replace(/\D/g, '')})}
                      className="w-full px-4 py-3 border border-[var(--color-border-input)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all"
                      placeholder="YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-main)] mb-2">
                      <Lock className="w-4 h-4 inline mr-1" />
                      CVV *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={4}
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value.replace(/\D/g, '')})}
                      className="w-full px-4 py-3 border border-[var(--color-border-input)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] transition-all"
                      placeholder="123"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-blue-900">Secure Payment</p>
                      <p className="text-xs text-blue-700 mt-1">Your payment information is encrypted and secure</p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg text-lg"
                >
                  {processing ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing... 
                    </span>
                  ) : (
                    `Pay Rs ${bookingData.totalPrice.toLocaleString()}`
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-[20px] shadow-[var(--shadow-card)] p-6 sticky top-24">
              <h3 className="text-lg font-bold text-[var(--color-text-main)] mb-4">Booking Summary</h3>
              
              <img 
                src={bookingData.carImage} 
                alt={bookingData.carName}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              
              <h4 className="font-bold text-[var(--color-text-main)] mb-1">{bookingData.carName}</h4>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">{bookingData.carType} - {bookingData.agency}</p>
              
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Pickup:</span>
                  <span className="font-medium text-[var(--color-text-main)]">{bookingData.pickupDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Dropoff:</span>
                  <span className="font-medium text-[var(--color-text-main)]">{bookingData. dropoffDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Location:</span>
                  <span className="font-medium text-[var(--color-text-main)] text-right">{bookingData.pickupLocation}</span>
                </div>
              </div>
              
              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Rs {bookingData.pricePerDay.toLocaleString()} x {bookingData.days} days</span>
                  <span className="font-medium">Rs {(bookingData.pricePerDay * bookingData.days).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Taxes & Fees</span>
                  <span className="font-medium">Rs 0</span>
                </div>
              </div>
              
              <div className="border-t mt-4 pt-4 flex justify-between items-center">
                <span className="font-bold text-[var(--color-text-main)]">Total</span>
                <span className="text-2xl font-bold text-[var(--color-primary)]">Rs {bookingData.totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--color-bg-page)] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-primary)] border-t-transparent mb-4"></div>
          <p className="text-[var(--color-text-muted)]">Loading payment page...</p>
        </div>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}