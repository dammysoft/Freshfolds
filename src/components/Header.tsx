import React from "react";
import { Sparkles, Phone, Clock, ShieldCheck, MapPin, Tag, MessageSquare, LayoutGrid } from "lucide-react";
import { FreshFoldLogo } from "./FreshFoldLogo";

interface HeaderProps {
  activeTab: "overview" | "call" | "booking" | "pricing" | "sop";
  setActiveTab: (tab: "overview" | "call" | "booking" | "pricing" | "sop") => void;
  isCallActive: boolean;
  onCallAlexClick: () => void;
  discountClaimed: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isCallActive,
  onCallAlexClick,
  discountClaimed,
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      {/* Top Announcement Bar for Ikorodu, Lagos & Free Delivery */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 border-b border-emerald-500/20 px-4 py-2 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-emerald-200">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <Tag className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-amber-300">IKORODU FIRST ORDER SPECIAL:</span>
            <span>₦1,500 OFF your first order of clothes (for orders exceeding 15 pieces)! • FREE Delivery within 1km LASUSTECH</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 text-xs hidden md:flex">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-sky-400" /> Mon–Sat 7AM–8PM | Sun 9AM–4PM
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Strict Zero-Mix Batch Rule
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-teal-400" /> WhatsApp Tag Photo-Doc
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand identity featuring the Feasibility Report Logo */}
        <div 
          onClick={() => setActiveTab("overview")}
          className="cursor-pointer group flex items-center gap-3"
          title="FreshFold Laundry & Dry Cleaning Services"
        >
          <FreshFoldLogo size="md" />
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "overview"
                ? "bg-teal-500 text-white shadow-md shadow-teal-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Website Overview
          </button>

          <button
            onClick={() => setActiveTab("call")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "call"
                ? "bg-teal-500 text-white shadow-md shadow-teal-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            Voice Concierge
            {isCallActive && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("pricing")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "pricing"
                ? "bg-teal-500 text-white shadow-md shadow-teal-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Fixed Pricing Menu (₦)
          </button>

          <button
            onClick={() => setActiveTab("booking")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "booking"
                ? "bg-teal-500 text-white shadow-md shadow-teal-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <span>Live Dispatch & Tracking</span>
            {discountClaimed && (
              <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded-full border border-amber-400/30">
                -₦1,500
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("sop")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "sop"
                ? "bg-teal-500 text-white shadow-md shadow-teal-500/25"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            SOP & Quality Standards
          </button>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          {!isCallActive ? (
            <button
              onClick={onCallAlexClick}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-xs font-semibold shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 group cursor-pointer active:scale-95"
            >
              <div className="w-5 h-5 rounded-lg bg-emerald-700/50 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Phone className="w-3 h-3 text-white" />
              </div>
              <span>Speak with Alex</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-300">Live with Alex</span>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="flex lg:hidden items-center justify-around border-t border-slate-800/60 bg-slate-900/60 px-2 py-1.5">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "overview" ? "bg-teal-500/20 text-teal-300 border border-teal-500/30" : "text-slate-400"
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" /> Overview
        </button>
        <button
          onClick={() => setActiveTab("call")}
          className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "call" ? "bg-teal-500/20 text-teal-300 border border-teal-500/30" : "text-slate-400"
          }`}
        >
          <Phone className="w-3.5 h-3.5" /> Concierge
        </button>
        <button
          onClick={() => setActiveTab("pricing")}
          className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "pricing" ? "bg-teal-500/20 text-teal-300 border border-teal-500/30" : "text-slate-400"
          }`}
        >
          Menu (₦)
        </button>
        <button
          onClick={() => setActiveTab("booking")}
          className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "booking" ? "bg-teal-500/20 text-teal-300 border border-teal-500/30" : "text-slate-400"
          }`}
        >
          Tracking
        </button>
        <button
          onClick={() => setActiveTab("sop")}
          className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "sop" ? "bg-teal-500/20 text-teal-300 border border-teal-500/30" : "text-slate-400"
          }`}
        >
          SOP
        </button>
      </div>
    </header>
  );
};

