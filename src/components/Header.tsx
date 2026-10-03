import React from "react";
import { Sparkles, Phone, Clock, ShieldCheck, MapPin, Tag, MessageSquare, LayoutGrid, LayoutDashboard, ShoppingCart, Send, Wrench, Video, BrainCircuit } from "lucide-react";
import { FreshcareLogo, FreshFoldLogo } from "./FreshFoldLogo";

interface HeaderProps {
  activeTab: "overview" | "funnel" | "whatsapp_agent" | "agent_rag" | "content_pipeline" | "data_pipeline" | "call" | "booking" | "pricing" | "sop" | "dashboard";
  setActiveTab: (tab: "overview" | "funnel" | "whatsapp_agent" | "agent_rag" | "content_pipeline" | "data_pipeline" | "call" | "booking" | "pricing" | "sop" | "dashboard") => void;
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
          title="Freshcare Laundry and Drycleaning Services"
        >
          <FreshcareLogo size="md" />
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "overview"
                ? "bg-teal-500 text-white shadow-md shadow-teal-500/25 font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Website
          </button>

          <button
            onClick={() => setActiveTab("funnel")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "funnel"
                ? "bg-teal-500 text-white shadow-md shadow-teal-500/25 font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5 text-teal-400" />
            <span>Order Flow</span>
            <span className="text-[10px] bg-teal-400/20 text-teal-300 px-1 py-0.2 rounded border border-teal-400/30">
              8-Step
            </span>
          </button>

          <button
            onClick={() => setActiveTab("whatsapp_agent")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "whatsapp_agent"
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25 font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp Agent</span>
            <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-1 py-0.2 rounded border border-emerald-400/30">
              Flow
            </span>
          </button>

          <button
            onClick={() => setActiveTab("agent_rag")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "agent_rag"
                ? "bg-teal-500 text-white shadow-md shadow-teal-500/25 font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tools & RAG</span>
            <span className="text-[10px] bg-teal-400/20 text-teal-300 px-1 py-0.2 rounded border border-teal-400/30">
              7 Tools
            </span>
          </button>

          <button
            onClick={() => setActiveTab("content_pipeline")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "content_pipeline"
                ? "bg-teal-500 text-white shadow-md shadow-teal-500/25 font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Video className="w-3.5 h-3.5 text-pink-400" />
            <span>Content Studio</span>
            <span className="text-[10px] bg-pink-400/20 text-pink-300 px-1 py-0.2 rounded border border-pink-400/30">
              Publish
            </span>
          </button>

          <button
            onClick={() => setActiveTab("data_pipeline")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "data_pipeline"
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25 font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5 text-emerald-300" />
            <span>Data & AI</span>
            <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-1 py-0.2 rounded border border-emerald-400/30">
              Insights
            </span>
          </button>

          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "dashboard"
                ? "bg-teal-500 text-white shadow-md shadow-teal-500/25 font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-teal-300" />
            <span>CRM & Ops</span>
          </button>

          <button
            onClick={() => setActiveTab("call")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "call"
                ? "bg-teal-500 text-white shadow-md shadow-teal-500/25 font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            Concierge
            {isCallActive && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("pricing")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "pricing"
                ? "bg-teal-500 text-white shadow-md shadow-teal-500/25 font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Pricing Menu (₦)
          </button>

          <button
            onClick={() => setActiveTab("booking")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "booking"
                ? "bg-teal-500 text-white shadow-md shadow-teal-500/25 font-bold"
                : "text-slate-300 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <span>Live Dispatch</span>
            {discountClaimed && (
              <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1 py-0.2 rounded-full border border-amber-400/30">
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
            SOP
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
      <div className="flex lg:hidden items-center justify-around border-t border-slate-800/60 bg-slate-900/60 px-2 py-1.5 overflow-x-auto">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap px-2 ${
            activeTab === "overview" ? "bg-teal-500/20 text-teal-300 border border-teal-500/30" : "text-slate-400"
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" /> Overview
        </button>
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap px-2 ${
            activeTab === "dashboard" ? "bg-teal-500/20 text-teal-300 border border-teal-500/30" : "text-slate-400"
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" /> Ops
        </button>
        <button
          onClick={() => setActiveTab("call")}
          className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap px-2 ${
            activeTab === "call" ? "bg-teal-500/20 text-teal-300 border border-teal-500/30" : "text-slate-400"
          }`}
        >
          <Phone className="w-3.5 h-3.5" /> Voice
        </button>
        <button
          onClick={() => setActiveTab("content_pipeline")}
          className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap px-2 ${
            activeTab === "content_pipeline" ? "bg-teal-500/20 text-pink-300 border border-teal-500/30" : "text-slate-400"
          }`}
        >
          <Video className="w-3.5 h-3.5" /> Content
        </button>
        <button
          onClick={() => setActiveTab("data_pipeline")}
          className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap px-2 ${
            activeTab === "data_pipeline" ? "bg-teal-500/20 text-emerald-300 border border-teal-500/30" : "text-slate-400"
          }`}
        >
          <BrainCircuit className="w-3.5 h-3.5" /> Data AI
        </button>
        <button
          onClick={() => setActiveTab("agent_rag")}
          className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap px-2 ${
            activeTab === "agent_rag" ? "bg-teal-500/20 text-teal-300 border border-teal-500/30" : "text-slate-400"
          }`}
        >
          <Wrench className="w-3.5 h-3.5" /> Tools & RAG
        </button>
        <button
          onClick={() => setActiveTab("pricing")}
          className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap px-2 ${
            activeTab === "pricing" ? "bg-teal-500/20 text-teal-300 border border-teal-500/30" : "text-slate-400"
          }`}
        >
          Menu (₦)
        </button>
        <button
          onClick={() => setActiveTab("booking")}
          className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap px-2 ${
            activeTab === "booking" ? "bg-teal-500/20 text-teal-300 border border-teal-500/30" : "text-slate-400"
          }`}
        >
          Track
        </button>
      </div>
    </header>
  );
};


