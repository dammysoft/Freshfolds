import React from "react";
import {
  Phone,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Calendar,
  Layers,
  Heart,
  Users,
  Award,
  Zap,
  Tag,
  Gift,
  FileCheck,
  ArrowRight,
  Send,
  Building2,
  BadgeCheck,
  Check,
  LayoutDashboard
} from "lucide-react";
import { FreshcareLogo } from "./FreshFoldLogo";
import { BusinessFlowArchitecture } from "./BusinessFlowArchitecture";

interface WebsiteOverviewProps {
  onStartCall: () => void;
  onOpenPricing: () => void;
  onOpenTracker: () => void;
  onOpenSop: () => void;
  onOpenDashboard?: () => void;
  onOpenOrderFunnel?: () => void;
  onOpenWhatsAppFlow?: () => void;
  onOpenAgentRAG?: () => void;
}

export const WebsiteOverview: React.FC<WebsiteOverviewProps> = ({
  onStartCall,
  onOpenPricing,
  onOpenTracker,
  onOpenSop,
  onOpenDashboard,
  onOpenOrderFunnel,
  onOpenWhatsAppFlow,
  onOpenAgentRAG,
}) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/40 border border-slate-800 p-6 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          {/* Logo representation matching Feasibility Report */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 inline-block backdrop-blur-sm">
            <FreshcareLogo size="lg" showTagline={true} />
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-teal-400 font-mono">
              <span className="flex items-center gap-1.5 font-bold">
                <MapPin className="w-3.5 h-3.5" /> Firstgate, LASUSTECH (formerly Laspotech), Ikorodu, Lagos
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">CAC Registered Startup</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Premium Laundry & Dry Cleaning Built for Real Ikorodu Life.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Combining world-class laundry convenience with strict zero-mix batch washing, bespoke Nigerian native starching, and doorstep pickup across Ikorodu.
            </p>
          </div>

          {/* Key Value Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-teal-400 font-bold block mb-0.5">FREE Delivery</span>
              <span className="text-slate-400 text-[11px]">Within 1km of LASUSTECH Firstgate</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-amber-300 font-bold block mb-0.5">₦1,500 Off</span>
              <span className="text-slate-400 text-[11px]">First order of clothes &gt;15 pcs</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-0.5">Strict Zero-Mix</span>
              <span className="text-slate-400 text-[11px]">Never mix clothes from 2 customers</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-sky-400 font-bold block mb-0.5">24–48h Turnaround</span>
              <span className="text-slate-400 text-[11px]">24h express & 6h rush available</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={onStartCall}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold text-xs shadow-xl shadow-teal-500/25 flex items-center gap-2.5 transition-all cursor-pointer active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Talk to Alex (Voice Concierge)</span>
            </button>

            <button
              onClick={onOpenPricing}
              className="px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>View Fixed Pricing Menu (₦)</span>
            </button>

            <button
              onClick={onOpenTracker}
              className="px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Truck className="w-4 h-4 text-teal-400" />
              <span>Track Active Tag #</span>
            </button>
          </div>
        </div>
      </section>

      {/* StoryBrand 3-Step Simple Plan (Section 17 of Feasibility Report) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">
              StoryBrand 3-Step Plan
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              How Freshcare Works for You
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            No stressful wash days, no faded fabrics, and no misplaced garments. Just 3 simple steps to a fresh wardrobe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6 space-y-3 relative group hover:border-teal-500/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h3 className="text-base font-bold text-white">Message Us or Call Alex</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Place your order via WhatsApp, call our AI Voice Concierge Alex, or drop by our Firstgate shop facing LASUSTECH. Select your preferred starch level and pickup time.
            </p>
            <div className="text-[11px] text-teal-400 font-mono">
              WhatsApp Desk & AI Voice Available Daily
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6 space-y-3 relative group hover:border-teal-500/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h3 className="text-base font-bold text-white">We Collect & Tag</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our rider arrives at your doorstep in Ikorodu. Items are counted in front of you, tagged with waterproof sequential tags (FC-series), and photo-documented on WhatsApp.
            </p>
            <div className="text-[11px] text-teal-400 font-mono">
              Zero-Loss Guarantee & Proof of Intake
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6 space-y-3 relative group hover:border-teal-500/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h3 className="text-base font-bold text-white">Receive Fresh & Folded</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Washed with 9 professional chemicals, vacuum suction pressed, neatly folded, and delivered in a branded waterproof Freshcare protective garment bag within 24–48 hours.
            </p>
            <div className="text-[11px] text-teal-400 font-mono">
              Pay on Delivery after Inspection
            </div>
          </div>
        </div>
      </section>

      {/* Freshcare End-to-End Business Flow Architecture */}
      <section className="space-y-6 pt-4 border-t border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              <span>Enterprise Business Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Freshcare Omnichannel Architecture & Operational Pipeline
            </h2>
          </div>
          {onOpenDashboard && (
            <button
              onClick={onOpenDashboard}
              className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-teal-500/20 self-start sm:self-auto"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Launch Live Operations Dashboard</span>
            </button>
          )}
        </div>

        <BusinessFlowArchitecture
          onNavigateToDashboard={onOpenDashboard}
          onNavigateToCall={onStartCall}
          onNavigateToPricing={onOpenPricing}
          onNavigateToTracker={onOpenTracker}
          onNavigateToOrderFunnel={onOpenOrderFunnel}
          onNavigateToWhatsAppFlow={onOpenWhatsAppFlow}
          onNavigateToAgentRAG={onOpenAgentRAG}
        />
      </section>

      {/* Target Customer Segments & Bundles (Section 7.2 & 9.6 of Feasibility Report) */}
      <section className="bg-slate-900/40 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">
              Localized Solutions for Ikorodu
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Plans Crafted for Students, Staff & Families
            </h2>
          </div>
          <button
            onClick={onOpenPricing}
            className="text-xs text-teal-400 hover:text-teal-300 font-medium flex items-center gap-1 cursor-pointer"
          >
            <span>View all individual rates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Student Bundle */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-teal-400 font-bold">LASUSTECH Students</span>
                <span className="text-slate-400">Weekly Plan</span>
              </div>
              <h3 className="text-xl font-bold text-white">Student Bundle</h3>
              <div className="text-2xl font-mono font-bold text-emerald-400 mt-2">
                ₦3,500 <span className="text-xs text-slate-400 font-normal">/ week</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                8 pieces — wash + press + fold + free doorstep delivery within 1km of Firstgate. Monthly: ₦12,000 (32 pieces).
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400" /> Free pickup at campus hostels
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400" /> T-shirts, jeans, shirts & trousers
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400" /> Anti-bleed color separation
                </li>
              </ul>
            </div>
            <button
              onClick={onStartCall}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-teal-300 border border-teal-500/30 text-xs font-semibold cursor-pointer transition-colors"
            >
              Order Student Bundle
            </button>
          </div>

          {/* Bachelor & Working Professionals */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-teal-500/40 space-y-4 relative flex flex-col justify-between shadow-xl shadow-teal-500/5 ring-1 ring-teal-500/20">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-teal-400 font-bold">Working Professionals</span>
                <span className="text-amber-300 font-semibold">Most Popular</span>
              </div>
              <h3 className="text-xl font-bold text-white">Bachelor / Professional</h3>
              <div className="text-2xl font-mono font-bold text-emerald-400 mt-2">
                ₦5,000 <span className="text-xs text-slate-400 font-normal">/ week</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                12 pieces — wash + press + fold + delivery. Monthly: ₦18,000 (48 pieces). Perfect for office shirts and corporate chinos.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400" /> Crisp collar steam pressing
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400" /> Light or medium starch included
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400" /> 24–48h scheduled delivery
                </li>
              </ul>
            </div>
            <button
              onClick={onStartCall}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-semibold cursor-pointer shadow-md shadow-teal-500/20 hover:from-teal-400 hover:to-emerald-400 transition-all"
            >
              Order Professional Bundle
            </button>
          </div>

          {/* Family Bundle */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-teal-400 font-bold">Ikorodu Households</span>
                <span className="text-slate-400">Family Size</span>
              </div>
              <h3 className="text-xl font-bold text-white">Family Bundle</h3>
              <div className="text-2xl font-mono font-bold text-emerald-400 mt-2">
                ₦8,000 <span className="text-xs text-slate-400 font-normal">/ week</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                20 pieces — wash + press + fold + delivery across Ikorodu. Monthly: ₦30,000 (80 pieces). Ideal for school uniforms & home wear.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400" /> School uniform stain removal
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400" /> Beddings & towels compatible
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400" /> Doorstep handover by zone
                </li>
              </ul>
            </div>
            <button
              onClick={onStartCall}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-teal-300 border border-teal-500/30 text-xs font-semibold cursor-pointer transition-colors"
            >
              Order Family Bundle
            </button>
          </div>
        </div>
      </section>

      {/* 7 Core Values (Section 3 of Feasibility Report) */}
      <section className="space-y-6">
        <div>
          <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">
            Section 3: Vision, Mission & Core Values
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Our Guiding Values at Freshcare
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            "To deliver clean, pressed, and perfectly folded laundry — on time, every time — with a service experience that turns first-time customers into loyal weekly subscribers."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-xs">
              <Clock className="w-4 h-4" />
              <span>Reliability</span>
            </div>
            <p className="text-xs text-slate-300">
              Every order ready when promised. No excuses. Late delivery = discount applied.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-xs">
              <Award className="w-4 h-4" />
              <span>Quality</span>
            </div>
            <p className="text-xs text-slate-300">
              Right detergent. Right temperature. Right fold. Right starch level. Every time.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-xs">
              <Zap className="w-4 h-4" />
              <span>Convenience</span>
            </div>
            <p className="text-xs text-slate-300">
              WhatsApp order. We collect. We deliver. Zero stress for the customer.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-xs">
              <Tag className="w-4 h-4" />
              <span>Transparency</span>
            </div>
            <p className="text-xs text-slate-300">
              Fixed prices in Naira. No hidden charges. Price list visible at shop and on WhatsApp.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-xs">
              <Heart className="w-4 h-4" />
              <span>Dignity</span>
            </div>
            <p className="text-xs text-slate-300">
              Every garment — ₦500 polo or ₦200,000 agbada — handled with equal respect.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Trust & Honesty</span>
            </div>
            <p className="text-xs text-slate-300">
              Every item tagged, photographed, tracked. If we make a mistake — we own it, fix it, and compensate the customer.
            </p>
          </div>
        </div>
      </section>

      {/* Customer Experience Chain of Excellence - Organisational Structure (from Document 2) */}
      <section className="bg-slate-900/40 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
        <div>
          <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">
            Customer Experience Chain of Excellence
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Our Dedicated Operational Team
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            "Every role in this chain exists for one reason: to ensure that every garment entrusted to Freshcare is returned clean, correctly starched, perfectly pressed, on time, and with zero damage."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="text-[11px] font-mono text-teal-400 font-bold">Tier 0 · Leadership</div>
            <div className="font-bold text-white text-sm">Business Owner / Founder</div>
            <div className="text-slate-400 text-[11px]">Azeez Saheed Oluwadamilola (Dammy)</div>
            <p className="text-slate-300 text-[11px] pt-1 border-t border-slate-800/80 italic">
              "Approves all policies that affect customer experience; brings certified HSE chemical handling competence."
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="text-[11px] font-mono text-teal-400 font-bold">Tier 1 · Operations</div>
            <div className="font-bold text-white text-sm">Operations Manager</div>
            <div className="text-slate-400 text-[11px]">Workflow & Timelines</div>
            <p className="text-slate-300 text-[11px] pt-1 border-t border-slate-800/80 italic">
              "Ensures every order is completed on time and strictly to standard across bays."
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="text-[11px] font-mono text-teal-400 font-bold">Tier 2 · Front Desk</div>
            <div className="font-bold text-white text-sm">Front Desk Officer (Alex)</div>
            <div className="text-slate-400 text-[11px]">Customer Service & Voice Concierge</div>
            <p className="text-slate-300 text-[11px] pt-1 border-t border-slate-800/80 italic">
              "Sets the tone of the customer's entire experience at intake; confirms starch and tags."
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="text-[11px] font-mono text-teal-400 font-bold">Tier 2 · Production Lead</div>
            <div className="font-bold text-white text-sm">Laundry Supervisor</div>
            <div className="text-slate-400 text-[11px]">Production & Quality</div>
            <p className="text-slate-300 text-[11px] pt-1 border-t border-slate-800/80 italic">
              "Guarantees the fabric quality standard customers pay for, matching delicate and heavy care."
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="text-[11px] font-mono text-teal-400 font-bold">Tier 3 · Washing</div>
            <div className="font-bold text-white text-sm">Washer / Attendant</div>
            <div className="text-slate-400 text-[11px]">Zero-Mix Wash Expert</div>
            <p className="text-slate-300 text-[11px] pt-1 border-t border-slate-800/80 italic">
              "Pre-treats stains, neutralises detergent residue, and restores delicate fabrics."
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="text-[11px] font-mono text-teal-400 font-bold">Tier 3 · Pressing</div>
            <div className="font-bold text-white text-sm">Presser / Ironer</div>
            <div className="text-slate-400 text-[11px]">Steam & Starch Station</div>
            <p className="text-slate-300 text-[11px] pt-1 border-t border-slate-800/80 italic">
              "Delivers the visual quality customers see and feel: sharp collars, zero shine marks."
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="text-[11px] font-mono text-teal-400 font-bold">Tier 3 · Quality Control</div>
            <div className="font-bold text-white text-sm">Quality Control Officer</div>
            <div className="text-slate-400 text-[11px]">The Final Defense</div>
            <p className="text-slate-300 text-[11px] pt-1 border-t border-slate-800/80 italic">
              "The last defence before a garment reaches the customer: checks stains, count, and folding."
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="text-[11px] font-mono text-teal-400 font-bold">Tier 3 · Logistics</div>
            <div className="font-bold text-white text-sm">Delivery / Pickup Officer</div>
            <div className="text-slate-400 text-[11px]">Doorstep Handover</div>
            <p className="text-slate-300 text-[11px] pt-1 border-t border-slate-800/80 italic">
              "Final touchpoint — delivers the WOW moment to the customer's door in Ikorodu."
            </p>
          </div>
        </div>
      </section>

      {/* Facility Specs, Location & Policies (Sections 8, 9, 12 of Feasibility Report) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Location & Contact Information */}
        <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Facility Location & Operating Hours</span>
          </div>

          <h3 className="text-lg font-bold text-white">Firstgate Facility, Ikorodu</h3>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Physical Address:</span> Roadside, Firstgate main access — facing LASUSTECH entrance, Ikorodu, Lagos State.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Hours:</span> Mon–Fri: 7:00 AM – 8:00 PM (Peak 7–9AM & 5–8PM) · Sat: 7:00 AM – 7:00 PM · Sun: 9:00 AM – 4:00 PM.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Service Zones:</span> Firstgate, LASUSTECH Campus & Hostels, Agric, Benson, Ikorodu Garage, Odogunyan, Ebute / Ipakodo.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Send className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Primary Channel:</span> WhatsApp Business & Walk-in counter.
              </div>
            </div>
          </div>
        </div>

        {/* Customer Liability & Policies */}
        <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
            <BadgeCheck className="w-4 h-4" />
            <span>Customer Liability & Guarantees</span>
          </div>

          <h3 className="text-lg font-bold text-white">Section 12: Customer Liability Policy</h3>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2">
              <span className="font-mono text-teal-400 font-bold">1.</span>
              <span>Every item received is photographed and tagged sequentially.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2">
              <span className="font-mono text-teal-400 font-bold">2.</span>
              <span>Freshcare is liable for garments damaged during washing — compensation equals full replacement cost.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2">
              <span className="font-mono text-teal-400 font-bold">3.</span>
              <span>Payment policy: 50% upfront for new walk-ins, pay on delivery for returning customers. Zero credit.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2">
              <span className="font-mono text-teal-400 font-bold">4.</span>
              <span>Loyalty Reward: Every 10th wash is completely FREE for returning customers!</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Call to Action */}
      <section className="bg-gradient-to-r from-teal-950 via-slate-950 to-blue-950 border border-teal-500/30 rounded-3xl p-6 sm:p-10 text-center space-y-4 shadow-xl">
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          "Stay in the game long enough to win."
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto italic">
          "Every fold tells you we care. You handle life. We handle the laundry."
        </p>
        <p className="text-xs text-teal-400 font-mono">
          Prepared by Azeez Saheed Oluwadamilola (Dammy) · Freshcare Laundry and Drycleaning Services
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <button
            onClick={onStartCall}
            className="px-6 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-white font-semibold text-xs shadow-lg shadow-teal-500/20 cursor-pointer transition-all active:scale-95 flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Connect with Alex (Voice Concierge)</span>
          </button>
          <button
            onClick={onOpenPricing}
            className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold cursor-pointer transition-colors"
          >
            <span>Calculate Order Total (₦)</span>
          </button>
        </div>
      </section>
    </div>
  );
};
