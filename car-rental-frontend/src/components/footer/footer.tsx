"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("USD");

  const handleJoin = () => {
    console.log("Email subscription:", email);
    alert("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <footer className="bg-[#D4F5E9]">
      {/* Newsletter Section */}
      <div className="border-b border-[var(--color-primary)]/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10 lg:py-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h3 className="text-[22px] lg:text-[26px] font-bold text-[var(--color-text-main)] mb-2">
                Be the first one to know when the price drops
              </h3>
              <p className="text-[14px] lg:text-[15px] text-[var(--color-text-muted)]">
                Unsubscribe any time
              </p>
            </div>

            {/* Email Input */}
            <div className="flex gap-3 w-full lg:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your mail"
                className="flex-1 lg:w-[340px] px-6 py-3.5 bg-white/60 backdrop-blur-sm border border-[var(--color-primary)]/20 rounded-xl text-[15px] text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)]/40 transition-all"
              />
              <button
                onClick={handleJoin}
                className="bg-white hover:bg-white/90 text-[var(--color-primary)] font-semibold text-[15px] lg:text-[16px] px-10 py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start lg:items-center">
          {/* Left - Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[var(--color-primary)] rounded-xl flex items-center justify-center shadow-md">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5C5.84 5 5.28 5.42 5.08 6.01L3 12V20C3 20.55 3.45 21 4 21H5C5.55 21 6 20.55 6 20V19H18V20C18 20.55 18.45 21 19 21H20C20.55 21 21 20.55 21 20V12L18.92 6.01ZM6.5 16C5.67 16 5 15.33 5 14.5S5.67 13 6.5 13 8 13.67 8 14.5 7.33 16 6.5 16ZM17.5 16C16.67 16 16 15.33 16 14.5S16.67 13 17.5 13 19 13.67 19 14.5 18.33 16 17.5 16ZM5 11L6.5 6.5H17.5L19 11H5Z" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="text-[19px] lg:text-[21px] font-normal text-[var(--color-text-main)]">
                Airport
              </div>
              <div className="text-[19px] lg:text-[21px] font-extrabold text-[var(--color-text-main)]">
                Rental Cars
              </div>
            </div>
          </div>

          {/* Middle - Navigation Links */}
          <nav className="flex  justify-start lg:justify-start  gap-x-6 lg:gap-x-8 gap-y-2 text-[14px] lg:text-[15px]">
            <Link
              href="/privacy"
              className="no-underline hover:no-underline font-semibold text-text-main hover:text-primary"
            >
              Privacy policy
            </Link>

            <Link
              href="/terms"
              className="no-underline hover:no-underline font-semibold text-text-main hover:text-primary"
            >
              Terms & conditions
            </Link>
            <Link
              href="/cookies"
              className="no-underline hover:no-underline font-semibold text-text-main hover:text-primary"
            >
              Cookies policy
            </Link>
            <Link
              href="/about"
              className="no-underline hover:no-underline font-semibold text-text-main hover:text-primary"
            >
              About us
            </Link>
            <Link
              href="/contact"
              className="no-underline hover:no-underline font-semibold text-text-main hover:text-primary"
            >
              Contact
            </Link>
          </nav>

          {/* Right - Empty space for alignment */}
          <div className="hidden lg:block" />
        </div>

        {/* Bottom Row - Currency & Copyright */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mt-10 pt-8 border-t border-[var(--color-primary)]/10">
          {/* Currency Selector */}
          <div className="relative">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="appearance-none bg-white/60 backdrop-blur-sm border border-[var(--color-primary)]/20 rounded-lg px-4 py-2.5 pr-10 text-[14px] font-medium text-[var(--color-text-main)] cursor-pointer hover:bg-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Copyright & Social Icons */}
          <div className="flex items-center gap-8 w-full lg:w-auto justify-between lg:justify-end">
            <p className="text-[13px] lg:text-[14px] text-[var(--color-text-main)]">
              © Copyright 2025 - Airport rental car
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-main)] hover:text-[var(--color-primary)] transition-colors"
                aria-label="Facebook"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                </svg>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-main)] hover:text-[var(--color-primary)] transition-colors"
                aria-label="Twitter"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.46 6c-.85.38-1.78.64-2.75.76 1-.6 1.76-1.55 2.12-2.68-.93.55-1.96.96-3.06 1.18-.88-.95-2.13-1.54-3.52-1.54-2.67 0-4.83 2.17-4.83 4.84 0 .38.04.75.13 1.1-4.02-.2-7.58-2.13-9.97-5.06-.42.72-.66 1.55-.66 2.44 0 1.68.85 3.16 2.15 4.03-.79-.03-1.54-.24-2.19-.61v.06c0 2.34 1.67 4.3 3.88 4.74-.4.11-.83.17-1.27.17-.31 0-.62-.03-.92-.08.62 1.94 2.42 3.35 4.55 3.39-1.67 1.31-3.77 2.09-6.05 2.09-.39 0-.78-.02-1.17-.07 2.18 1.4 4.77 2.21 7.56 2.21 9.05 0 14-7.5 14-14 0-.21 0-.42-.02-.63.96-.7 1.8-1.56 2.46-2.55z" />
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-main)] hover:text-[var(--color-primary)] transition-colors"
                aria-label="Instagram"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2m-.2 2C5.6 4 4 5.6 4 7.6v8.8c0 2 1.6 3.6 3.6 3.6h8.8c2 0 3.6-1.6 3.6-3.6V7.6c0-2-1.6-3.6-3.6-3.6H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25c0 .69-.56 1.25-1.25 1.25s-1.25-.56-1.25-1.25c0-.69.56-1.25 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}