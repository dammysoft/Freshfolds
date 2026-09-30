import React from "react";

interface FreshFoldLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  inverted?: boolean;
}

export const FreshFoldLogo: React.FC<FreshFoldLogoProps> = ({
  className = "",
  size = "md",
  showTagline = false,
  inverted = true,
}) => {
  const isSm = size === "sm";
  const isLg = size === "lg";
  const isXl = size === "xl";

  return (
    <div className={`flex flex-col select-none ${className}`}>
      <div className="flex items-center gap-2.5">
        {/* Modern Geometric Laundry & Fold Icon */}
        <div
          className={`relative rounded-xl flex items-center justify-center font-black transition-all ${
            isSm
              ? "w-8 h-8 text-xs"
              : isLg
              ? "w-12 h-12 text-base"
              : isXl
              ? "w-16 h-16 text-xl"
              : "w-10 h-10 text-sm"
          } bg-gradient-to-br from-blue-700 via-teal-600 to-emerald-500 text-white shadow-md shadow-teal-500/20`}
        >
          {/* Stylized Fold Lines SVG */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={isSm ? "w-4 h-4" : isLg ? "w-6 h-6" : isXl ? "w-8 h-8" : "w-5 h-5"}
          >
            <path d="M4 6h16M4 12h16M4 18h11" />
            <circle cx="19" cy="18" r="2" fill="currentColor" stroke="none" />
          </svg>
          <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-teal-400 text-[8px] text-slate-950 font-black">
            ✦
          </span>
        </div>

        {/* The Exact FreshFold Feasibility Report Typography */}
        <div className="flex flex-col leading-tight">
          <div className="flex items-baseline gap-1">
            <span
              className={`font-black tracking-tight uppercase ${
                isSm
                  ? "text-base"
                  : isLg
                  ? "text-2xl"
                  : isXl
                  ? "text-3xl sm:text-4xl"
                  : "text-lg sm:text-xl"
              } ${
                inverted ? "text-white" : "text-slate-900"
              }`}
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              FRESH<span className="text-teal-400">FOLD</span>
            </span>
          </div>

          <span
            className={`font-bold uppercase tracking-[0.16em] ${
              isSm
                ? "text-[8px]"
                : isLg
                ? "text-[11px]"
                : isXl
                ? "text-xs"
                : "text-[9px]"
            } text-teal-400`}
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            }}
          >
            LAUNDRY & DRY CLEANING SERVICES
          </span>
        </div>
      </div>

      {showTagline && (
        <div className="mt-1.5 flex flex-col">
          <span className="text-xs italic text-teal-300 font-medium">
            "You handle life. We handle the laundry."
          </span>
          <span className="text-[10px] text-slate-400 tracking-wide mt-0.5">
            Every fold tells you we care. · Firstgate, LASUSTECH, Ikorodu
          </span>
        </div>
      )}
    </div>
  );
};
