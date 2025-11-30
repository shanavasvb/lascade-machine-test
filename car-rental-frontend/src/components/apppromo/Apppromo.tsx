"use client";

import Image from "next/image";

export default function AppPromo() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="relative bg-gradient-to-br from-[#EAF8F4] to-[#DDF4ED] rounded-[32px] overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Phone mockups */}
            <div className="relative flex items-center justify-center lg:justify-start py-12 lg:py-16 lg:pl-12">
              <div className="relative w-full max-w-[550px] h-[300px] lg:h-[400px]">
                <Image
                  src="/images/phone-mockups.png"
                  alt="App Screenshots"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right side */}
            <div className="space-y-6 lg:space-y-8 px-6 lg:px-12 pb-12 lg:pb-16 text-center lg:text-left">
              <h2 className="text-[36px] lg:text-[52px] font-bold text-[var(--color-text-main)] leading-[1.1]">
                Get the app now
              </h2>

              <p className="text-[16px] lg:text-[18px] text-[var(--color-text-muted)] leading-relaxed max-w-[520px] mx-auto lg:mx-0">
                Find and book amazing rental deals anytime, anywhere, with the Rent80 app. Try it today!
              </p>

              <button
                onClick={() => window.location.href = '#'}
                className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]
                text-white font-semibold text-[17px] lg:text-[18px] px-12 py-4 rounded-xl 
                transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                Install now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
