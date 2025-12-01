import Image from 'next/image';
import SearchBar from '../search/SearchBar';

export default function Hero() {
  return (
    <section className="relative bg-bg-page pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Text and Search Card */}
          <div className="space-y-8 lg:space-y-10">
            {/* Heading */}
            <div className="space-y-3">
              <h1 className="text-[48px] lg:text-[56px] font-bold leading-[56px] lg:leading-[64px] text-text-main">
                Quick car hire,
                <br />
                No delays
              </h1>
            </div>

            {/* Search Bar Component */}
            <SearchBar />
          </div>

          {/* Right side - Phone Mockup with Background */}
          <div className="relative hidden lg:flex items-center justify-center min-h-[600px]">
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src="/images/background.png"
                alt="Phone mockup with map"
                width={600}
                height={700}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
