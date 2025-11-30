import Link from 'next/link';
import Image from 'next/image';
import { CSSProperties } from 'react';

export default function Navbar() {
  const linkStyle: CSSProperties = {
    textDecoration: 'none',
    WebkitTextDecorationLine: 'none',
    textDecorationLine: 'none',
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5"
            style={linkStyle}
          >
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center p-2">
              <Image
                src="/icons/car-location.svg"
                alt="Car icon"
                width={20}
                height={20}
                className="w-full h-full"
              />
            </div>
            <div 
              className="flex flex-col leading-tight"
              style={linkStyle}
            >
              <span 
                className="text-[15px] font-semibold text-[var(--color-text-main)] block"
                style={linkStyle}
              >
                Airport
              </span>
              <span 
                className="text-[15px] font-semibold text-[var(--color-text-main)] block"
                style={linkStyle}
              >
                Rental Cars
              </span>
            </div>
          </Link>

          {/* Right side - Language selector */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border-input hover:border-primary transition-colors">
              <Image
                src="/icons/globe.svg"
                alt="Language"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span className="text-sm font-semibold text-text-main">EN</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}