"use client";

import { useState } from "react";

export function HuelBanner() {
  const [isHovered, setIsHovered] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a] text-white overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ad label */}
      <div className="absolute top-1 left-2 text-[9px] text-gray-500 uppercase tracking-wider font-medium">
        Ad
      </div>

      {/* Close button */}
      <button
        onClick={() => setIsDismissed(true)}
        className="absolute top-2 right-3 text-gray-400 hover:text-white transition-colors z-10 text-lg leading-none"
        aria-label="Close ad"
      >
        ×
      </button>

      <div className="flex items-center justify-center gap-6 px-4 py-3 max-w-7xl mx-auto">
        {/* Huel Logo */}
        <div className="flex-shrink-0">
          <svg
            viewBox="0 0 100 32"
            className="h-6 w-auto"
            fill="currentColor"
          >
            <text
              x="0"
              y="26"
              fontFamily="Arial Black, sans-serif"
              fontSize="28"
              fontWeight="900"
              letterSpacing="-1"
            >
              huel
            </text>
          </svg>
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-700 hidden sm:block" />

        {/* Main copy */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <div>
            <p className="text-sm sm:text-base font-semibold">
              <span className="text-[#f5f0e6]">Complete Nutrition.</span>
              <span className="text-gray-400 ml-1">One Meal.</span>
            </p>
            <p className="text-xs text-gray-500 hidden sm:block">
              27 essential vitamins & minerals • 40g protein • Ready in seconds
            </p>
          </div>
        </div>

        {/* Offer badge */}
        <div className="hidden lg:flex items-center gap-2 bg-[#e85a30] px-3 py-1.5 rounded-full flex-shrink-0">
          <span className="text-xs font-bold uppercase tracking-wide">New Year Sale</span>
          <span className="text-sm font-black">25% OFF</span>
        </div>

        {/* CTA Button */}
        <a
          href="https://huel.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`
            flex-shrink-0 px-5 py-2 rounded-full font-bold text-sm uppercase tracking-wide
            transition-all duration-200 ease-out
            ${isHovered
              ? "bg-white text-black scale-105"
              : "bg-[#f5f0e6] text-black"
            }
          `}
        >
          Shop Now
        </a>

        {/* Trust badges */}
        <div className="hidden xl:flex items-center gap-3 text-gray-500 text-xs flex-shrink-0">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>4.5/5</span>
          </div>
          <div className="text-gray-600">|</div>
          <span>100M+ meals sold</span>
        </div>
      </div>

    </div>
  );
}
