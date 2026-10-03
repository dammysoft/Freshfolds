import React, { useState } from "react";
import {
  Globe,
  Layout,
  ShoppingCart,
  FileText,
  Database,
  CreditCard,
  CheckCircle2,
  Send,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  MapPin,
  Clock,
  Truck,
  Phone,
  Mail,
  Copy,
  Check,
  Printer,
  ExternalLink,
  Lock,
  Zap,
  Tag,
  AlertCircle,
  Building2,
  Sparkle
} from "lucide-react";
import {
  BookingState,
  OrderFunnelStep,
  DeliveryArea,
  StarchPreference,
  ServiceType,
  FunnelPaymentDetails
} from "../types";
import { FreshcareLogo } from "./FreshFoldLogo";
import { COMPLETE_PRICING_CATALOG } from "./PricingCalculator";

interface OrderFunnelWizardProps {
  bookingState: BookingState;
  setBookingState: React.Dispatch<React.SetStateAction<BookingState>>;
  onOpenTracker?: () => void;
  onOpenDashboard?: () => void;
}

export const OrderFunnelWizard: React.FC<OrderFunnelWizardProps> = ({
  bookingState,
  setBookingState,
  onOpenTracker,
  onOpenDashboard,
}) => {
  const [currentStep, setCurrentStep] = useState<OrderFunnelStep>("domain");
  const [copiedAccount, setCopiedAccount] = useState<boolean>(false);
  const [isTransferVerified, setIsTransferVerified] = useState<boolean>(false);
  const [isDatabaseSaved, setIsDatabaseSaved] = useState<boolean>(true);
  const [whatsappSent, setWhatsappSent] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);

  // Catalogue quantities
  const [itemQuantities, setItemQuantities] = useState<{ [id: string]: number }>({
    male_shirt: 3,
    senator_native: 2,
    jeans_trouser: 2,
    t_shirt_polo: 4,
  });

  const [selectedStarch, setSelectedStarch] = useState<StarchPreference>(
    bookingState.starchPreference || "medium"
  );

  const [paymentDetails, setPaymentDetails] = useState<FunnelPaymentDetails>({
    method: "bank_transfer",
    reference: `FC-TRF-${Math.floor(100000 + Math.random() * 900000)}`,
    paidAmount: 0,
    isVerified: false,
    bankName: "Moniepoint Microfinance Bank",
    accountNumber: "8123456789",
    accountName: "Freshcare Laundry Services Ltd",
  });

  // Calculate pieces from quantities
  const totalPieces = COMPLETE_PRICING_CATALOG.reduce((acc, item) => {
    const qty = itemQuantities[item.id] || 0;
    if (item.id === "bundle_student_weekly") return acc + qty * 8;
    if (item.id === "bundle_bachelor_weekly") return acc + qty * 12;
    if (item.id === "bundle_family_weekly") return acc + qty * 20;
    if (item.id.includes("3pc")) return acc + qty * 3;
    if (item.id.includes("2pc") || item.id === "senator_native" || item.id === "ankara_set")
      return acc + qty * 2;
    return acc + qty;
  }, 0);

  // Subtotal
  const subtotal = COMPLETE_PRICING_CATALOG.reduce((acc, item) => {
    const qty = itemQuantities[item.id] || 0;
    const price = item.washAndPressPrice || item.fixedPrice || 600;
    return acc + qty * price;
  }, 0);

  // Welcome discount rule: strictly > 15 pieces!
  const isDiscountEligible = totalPieces > 15;
  const discountAmount = isDiscountEligible ? 1500 : 0;
  const piecesNeeded = Math.max(0, 16 - totalPieces);

  // Delivery fee: ₦0 within 1km LASUSTECH, ₦500 beyond
  const isFreeDelivery = bookingState.deliveryArea === "Firstgate / LASUSTECH";
  const deliveryFee = isFreeDelivery ? 0 : 500;
  const expressSurcharge = bookingState.expressSurcharge || 0;
  const finalTotalNaira = Math.max(0, subtotal + deliveryFee + expressSurcharge - discountAmount);

  // Update item quantity
  const handleUpdateQty = (id: string, delta: number) => {
    setItemQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  // Funnel steps metadata
  const FUNNEL_STEPS: {
    id: OrderFunnelStep;
    number: number;
    title: string;
    shortLabel: string;
    icon: React.ComponentType<{ className?: string }>;
    desc: string;
  }[] = [
    {
      id: "domain",
      number: 1,
      title: "Domain",
      shortLabel: "1. Domain",
      icon: Globe,
      desc: "freshcarelaundry.ng (SSL Secure Host)",
    },
    {
      id: "website",
      number: 2,
      title: "Website",
      shortLabel: "2. Website",
      icon: Layout,
      desc: "Ikorodu Portal & Service Mode",
    },
    {
      id: "catalogue",
      number: 3,
      title: "Product/Service Catalogue",
      shortLabel: "3. Catalogue",
      icon: ShoppingCart,
      desc: "Naira (₦) Menu & Starch Selection",
    },
    {
      id: "order_form",
      number: 4,
      title: "Order Form",
      shortLabel: "4. Order Form",
      icon: FileText,
      desc: "Pickup Details & Garment Count",
    },
    {
      id: "database",
      number: 5,
      title: "Database",
      shortLabel: "5. Database",
      icon: Database,
      desc: "CRM Sync & Sequential Tag (FC-108)",
    },
    {
      id: "payment",
      number: 6,
      title: "Payment",
      shortLabel: "6. Payment",
      icon: CreditCard,
      desc: "Moniepoint POS / OPay Transfer (₦)",
    },
    {
      id: "confirmation",
      number: 7,
      title: "Confirmation",
      shortLabel: "7. Confirmation",
      icon: CheckCircle2,
      desc: "Intake Receipt & Order Voucher",
    },
    {
      id: "whatsapp_email",
      number: 8,
      title: "WhatsApp / Email",
      shortLabel: "8. WhatsApp/Email",
      icon: Send,
      desc: "Instant Dispatch & Photo Proof",
    },
  ];

  const currentStepIndex = FUNNEL_STEPS.findIndex((s) => s.id === currentStep);

  const handleNextStep = () => {
    if (currentStepIndex < FUNNEL_STEPS.length - 1) {
      const next = FUNNEL_STEPS[currentStepIndex + 1].id;
      setCurrentStep(next);

      // Perform state syncing when crossing key milestones
      if (next === "database" || next === "payment") {
        const randomId = Math.floor(100 + Math.random() * 900);
        setBookingState((prev) => ({
          ...prev,
          totalPieces,
          isDiscountEligible,
          discountAmount: isDiscountEligible ? 1500 : 0,
          discountPitched: isDiscountEligible,
          estimatedNairaTotal: finalTotalNaira,
          deliveryFee,
          starchPreference: selectedStarch,
          tagNumber: prev.tagNumber || `FC-${randomId}`,
          bookingReference: prev.bookingReference || `FC-IKD-${randomId}`,
          bookingStatus: "confirmed",
        }));
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(FUNNEL_STEPS[currentStepIndex - 1].id);
    }
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText("8123456789");
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 3000);
  };

  const handleVerifyTransfer = () => {
    setIsTransferVerified(true);
    setPaymentDetails((prev) => ({ ...prev, isVerified: true, paidAmount: finalTotalNaira }));
  };

  // Formatted WhatsApp Message
  const getWhatsAppMessage = () => {
    const items = Object.entries(itemQuantities)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => {
        const item = COMPLETE_PRICING_CATALOG.find((p) => p.id === id);
        return `${qty}x ${item?.name}`;
      })
      .join(", ");

    return encodeURIComponent(
      `*FRESHCARE LAUNDRY & DRYCLEANING SERVICES*\n` +
      `--------------------------------------\n` +
      `*Tag #:* ${bookingState.tagNumber || "FC-108"}\n` +
      `*Booking Ref:* ${bookingState.bookingReference || "FC-IKD-842"}\n` +
      `*Customer:* ${bookingState.customerName || "Customer"}\n` +
      `*Phone:* ${bookingState.customerPhone || "080-FRESHCARE"}\n` +
      `*Delivery Area:* ${bookingState.deliveryArea} (${bookingState.customerAddress || "Firstgate"})\n` +
      `*Items:* ${items} (${totalPieces} pieces)\n` +
      `*Starch Preference:* ${selectedStarch.toUpperCase()} Starch\n` +
      `*Scheduled Window:* ${bookingState.preferredDate} (${bookingState.preferredWindow})\n` +
      `*Discount Applied:* ${isDiscountEligible ? "₦1,500 OFF (>15 pieces rule)" : "₦0"}\n` +
      `*Total Payable:* ₦${finalTotalNaira.toLocaleString()}\n` +
      `*Payment Status:* ${isTransferVerified ? "PAID via Bank Transfer" : "Pay on Inspection / POS"}\n` +
      `--------------------------------------\n` +
      `Please dispatch your rider to collect my garments. Thank you!`
    );
  };

  return (
    <div className="space-y-8">
      {/* Funnel Roadmap Header Bar */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-teal-950/40 to-slate-900 border border-teal-500/30 p-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-teal-400" />
              <span>Standard Customer Order Funnel</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Freshcare End-to-End Order Workflow
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Domain → Website → Product Catalogue → Order Form → Database → Payment → Confirmation → WhatsApp/Email
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-teal-300 font-mono bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              Step {currentStepIndex + 1} of 8: <strong className="text-white">{FUNNEL_STEPS[currentStepIndex].title}</strong>
            </span>
          </div>
        </div>

        {/* 8-Step Breadcrumb Progress Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-2">
          {FUNNEL_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? "bg-teal-500 text-slate-950 border-teal-300 shadow-lg shadow-teal-500/25 scale-[1.03] font-bold"
                    : isCompleted
                    ? "bg-slate-900/90 text-teal-300 border-teal-500/40"
                    : "bg-slate-950/60 text-slate-500 border-slate-800/80 hover:text-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Icon className={`w-4 h-4 ${isCurrent ? "text-slate-950" : isCompleted ? "text-teal-400" : "text-slate-500"}`} />
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 text-teal-400" />
                  ) : (
                    <span className="text-[10px] font-mono opacity-80">{step.number}</span>
                  )}
                </div>
                <div className="text-[11px] font-bold truncate leading-tight">
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Step Workspace Container */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        {/* ================= STEP 1: DOMAIN ================= */}
        {currentStep === "domain" && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-3xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mx-auto shadow-xl">
                <Globe className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider">
                Stage 1: Verified Web Domain
              </span>
              <h3 className="text-2xl font-black text-white">freshcarelaundry.ng</h3>
              <p className="text-xs text-slate-400 max-w-lg mx-auto">
                Secure 256-bit SSL encrypted digital endpoint serving Ikorodu, Lagos State. Optimized for local Google Search, Maps Grounding, and direct WhatsApp routing.
              </p>
            </div>

            {/* Domain Security & Network Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>SSL / HTTPS</span>
                </div>
                <div className="text-white font-semibold">Active & Secured</div>
                <p className="text-[11px] text-slate-400">Zero data leaks for payment & addresses</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-sky-400 font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Geo-Routing</span>
                </div>
                <div className="text-white font-semibold">Firstgate, LASUSTECH</div>
                <p className="text-[11px] text-slate-400">Localized latency &lt; 50ms across Lagos</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-purple-400 font-bold">
                  <Globe className="w-3.5 h-3.5" />
                  <span>DNS Canonical</span>
                </div>
                <div className="text-white font-semibold">freshcare.com.ng</div>
                <p className="text-[11px] text-slate-400">CAC Registered Enterprise Host</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-teal-500/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-slate-300">Domain Session Initialized · Ikorodu Inbound Route</span>
              </div>
              <span className="font-mono text-teal-400 text-[11px]">200 OK · Cloud Native</span>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNextStep}
                className="px-6 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <span>Proceed to Website Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: WEBSITE ================= */}
        {currentStep === "website" && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-3xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mx-auto shadow-xl">
                <Layout className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider">
                Stage 2: Official Website Portal
              </span>
              <h3 className="text-2xl font-black text-white">
                Freshcare Laundry & Drycleaning Services
              </h3>
              <p className="text-xs text-slate-400 max-w-lg mx-auto">
                "Every fold tells you we care. You handle life. We handle the laundry."
              </p>
            </div>

            {/* Core Value Props */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
                <span className="font-bold text-teal-400 block">Strict Zero-Mix</span>
                <span className="text-slate-400 text-[11px]">Never mix clothes from 2 clients</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
                <span className="font-bold text-amber-300 block">₦1,500 OFF</span>
                <span className="text-slate-400 text-[11px]">First order exceeding 15 pieces</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
                <span className="font-bold text-emerald-400 block">FREE Delivery</span>
                <span className="text-slate-400 text-[11px]">Within 1km of LASUSTECH Firstgate</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
                <span className="font-bold text-sky-400 block">24–48h Return</span>
                <span className="text-slate-400 text-[11px]">Fast turnaround with 6h rush option</span>
              </div>
            </div>

            {/* Select Logistics Mode */}
            <div className="p-5 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-white block">
                Choose Your Order Intake Mode:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <button
                  onClick={() => setBookingState((prev) => ({ ...prev, isPickup: true }))}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    bookingState.isPickup
                      ? "bg-teal-500/20 border-teal-400 text-white shadow-md"
                      : "bg-slate-900 border-slate-800 text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Truck className="w-4 h-4 text-teal-400" />
                    <span className="font-bold">Doorstep Pickup in Ikorodu</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Our rider arrives at your home, hostel, or office in Ikorodu.
                  </p>
                </button>

                <button
                  onClick={() => setBookingState((prev) => ({ ...prev, isPickup: false }))}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    !bookingState.isPickup
                      ? "bg-teal-500/20 border-teal-400 text-white shadow-md"
                      : "bg-slate-900 border-slate-800 text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold">Firstgate Facility Drop-off</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Drop off physically at our facility facing LASUSTECH main gate.
                  </p>
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={handlePrevStep}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold cursor-pointer"
              >
                ← Back to Domain
              </button>
              <button
                onClick={handleNextStep}
                className="px-6 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <span>Browse Product Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: PRODUCT/SERVICE CATALOGUE ================= */}
        {currentStep === "catalogue" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider">
                  Stage 3: Product & Service Catalogue
                </span>
                <h3 className="text-xl font-bold text-white">Select Items & Starch Formulation</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/30">
                  Fixed Pricing (₦) · Zero Hidden Fees
                </span>
              </div>
            </div>

            {/* Starch Formulation Selector */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                <Sparkle className="w-3.5 h-3.5 text-amber-400" />
                Select Starch Preference for Traditional Wear & Corporate Shirts:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: "none", label: "No Starch", desc: "Silks, chiffon & soft casuals" },
                  { id: "light", label: "Light Starch", desc: "Everyday office shirts" },
                  { id: "medium", label: "Medium Starch", desc: "Recommended for Senators & Kaftans" },
                  { id: "heavy", label: "Heavy Starch", desc: "Ceremonial Agbada crisp finish" },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStarch(s.id as StarchPreference)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedStarch === s.id
                        ? "bg-teal-500 text-slate-950 font-bold border-teal-300 shadow-md"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
                    }`}
                  >
                    <div className="font-bold text-[11px]">{s.label}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Garment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {COMPLETE_PRICING_CATALOG.slice(0, 9).map((item) => {
                const qty = itemQuantities[item.id] || 0;
                const price = item.washAndPressPrice || item.fixedPrice || 600;

                return (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-white text-sm">{item.name}</span>
                        <span className="font-mono font-bold text-emerald-400">
                          ₦{price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-850">
                      <span className="text-[11px] text-slate-400 font-mono">{item.unit}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateQty(item.id, -1)}
                          disabled={qty === 0}
                          className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-300 disabled:opacity-30 border border-slate-800 flex items-center justify-center font-bold text-sm cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-mono font-bold text-white text-sm">
                          {qty}
                        </span>
                        <button
                          onClick={() => handleUpdateQty(item.id, 1)}
                          className="w-7 h-7 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 border border-teal-400 flex items-center justify-center font-bold text-sm cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Piece Counter & ₦1,500 Promo Bar */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300">
                  Total Clothing Pieces: <strong className="text-white text-sm">{totalPieces}</strong>
                </span>
                <span className={isDiscountEligible ? "text-emerald-400 font-bold" : "text-amber-300"}>
                  {isDiscountEligible
                    ? "🎉 ₦1,500 First Order Discount UNLOCKED!"
                    : `Add ${piecesNeeded} more piece${piecesNeeded > 1 ? "s" : ""} to unlock ₦1,500 OFF (>15 pcs rule)`}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    isDiscountEligible ? "bg-emerald-400" : "bg-gradient-to-r from-amber-400 to-teal-400"
                  }`}
                  style={{ width: `${Math.min(100, (totalPieces / 16) * 100)}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <button
                onClick={handlePrevStep}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold cursor-pointer"
              >
                ← Back to Website
              </button>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Subtotal:</span>
                  <span className="text-lg font-black text-white font-mono">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={handleNextStep}
                  disabled={totalPieces === 0}
                  className="px-6 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 disabled:opacity-30 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
                >
                  <span>Continue to Order Form</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 4: ORDER FORM ================= */}
        {currentStep === "order_form" && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider">
                Stage 4: Customer & Logistics Order Form
              </span>
              <h3 className="text-xl font-bold text-white">Enter Contact & Pickup Details in Ikorodu</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Customer Full Name:</label>
                <input
                  type="text"
                  placeholder="e.g. Babatunde Adeleke"
                  value={bookingState.customerName}
                  onChange={(e) => setBookingState((prev) => ({ ...prev, customerName: e.target.value }))}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">WhatsApp Phone Number:</label>
                <input
                  type="text"
                  placeholder="e.g. 0803 234 5678"
                  value={bookingState.customerPhone}
                  onChange={(e) => setBookingState((prev) => ({ ...prev, customerPhone: e.target.value }))}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Delivery Area in Ikorodu:</label>
                <select
                  value={bookingState.deliveryArea}
                  onChange={(e) =>
                    setBookingState((prev) => ({
                      ...prev,
                      deliveryArea: e.target.value as DeliveryArea,
                      deliveryFee: e.target.value === "Firstgate / LASUSTECH" ? 0 : 500,
                    }))
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-400"
                >
                  <option value="Firstgate / LASUSTECH">Firstgate / LASUSTECH (FREE Delivery &lt;1km)</option>
                  <option value="Agric">Agric (₦500 Flat Fee)</option>
                  <option value="Benson">Benson (₦500 Flat Fee)</option>
                  <option value="Ikorodu Garage">Ikorodu Garage (₦500 Flat Fee)</option>
                  <option value="Odogunyan">Odogunyan (₦500 Flat Fee)</option>
                  <option value="Ebute / Ipakodo">Ebute / Ipakodo (₦500 Flat Fee)</option>
                  <option value="Other Ikorodu environs">Other Ikorodu environs (₦500 Flat Fee)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Scheduled Window:</label>
                <select
                  value={bookingState.preferredWindow}
                  onChange={(e) => setBookingState((prev) => ({ ...prev, preferredWindow: e.target.value }))}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-400"
                >
                  <option value="8:00 AM – 11:00 AM">Morning (8:00 AM – 11:00 AM)</option>
                  <option value="11:00 AM – 2:00 PM">Midday (11:00 AM – 2:00 PM)</option>
                  <option value="2:00 PM – 5:00 PM">Afternoon (2:00 PM – 5:00 PM)</option>
                  <option value="5:00 PM – 8:00 PM">Evening (5:00 PM – 8:00 PM)</option>
                </select>
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-slate-300 font-medium">Street Address / Landmark:</label>
                <input
                  type="text"
                  placeholder="e.g. Flat 4, LASUSTECH Main Gate Hostels, Firstgate, Ikorodu"
                  value={bookingState.customerAddress}
                  onChange={(e) => setBookingState((prev) => ({ ...prev, customerAddress: e.target.value }))}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>

            {/* Order Review Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Items Subtotal ({totalPieces} pieces):</span>
                <span className="font-mono">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Ikorodu Delivery:</span>
                <span className="font-mono text-emerald-400">
                  {deliveryFee === 0 ? "FREE (Firstgate/LASUSTECH)" : "₦500"}
                </span>
              </div>
              {isDiscountEligible && (
                <div className="flex justify-between text-amber-300 font-bold">
                  <span>Welcome Discount (&gt;15 pieces):</span>
                  <span className="font-mono">-₦1,500</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-slate-850 font-bold text-white text-sm">
                <span>Estimated Total:</span>
                <span className="font-mono text-teal-400 text-base">₦{finalTotalNaira.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={handlePrevStep}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold cursor-pointer"
              >
                ← Back to Catalogue
              </button>
              <button
                onClick={handleNextStep}
                className="px-6 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <span>Save to Database & Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 5: DATABASE ================= */}
        {currentStep === "database" && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-3xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mx-auto shadow-xl">
                <Database className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider">
                Stage 5: Unified Database / CRM Persistence
              </span>
              <h3 className="text-2xl font-black text-white">Record Logged & Sequential Tag Assigned</h3>
              <p className="text-xs text-slate-400 max-w-lg mx-auto">
                Order successfully ingested into Freshcare's central database. Waterproof tag series and driver route locked in.
              </p>
            </div>

            {/* Generated Record Highlights */}
            <div className="p-5 rounded-3xl bg-slate-950 border border-teal-500/40 space-y-4 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono font-black text-sm text-teal-300 bg-teal-500/10 px-3 py-1 rounded-xl border border-teal-500/30">
                    TAG: {bookingState.tagNumber || "FC-108"}
                  </span>
                  <span className="font-mono text-slate-400">
                    REF: {bookingState.bookingReference || "FC-IKD-842"}
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  DATABASE SYNC: 100% OK
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300 text-[11px]">
                <div>
                  <span className="text-slate-500 block">Customer Name:</span>
                  <strong className="text-white">{bookingState.customerName || "Babatunde Adeleke"}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Phone / WhatsApp:</span>
                  <strong className="text-white">{bookingState.customerPhone || "0803 234 5678"}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Assigned Facility Bay:</span>
                  <strong className="text-teal-300">Firstgate Facility · Wash Master Bay 2</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Zero-Mix Quarantine:</span>
                  <strong className="text-emerald-400">Strictly Enforced (No garment mixing)</strong>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={handlePrevStep}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold cursor-pointer"
              >
                ← Back to Order Form
              </button>
              <button
                onClick={handleNextStep}
                className="px-6 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <span>Proceed to Payment (₦)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 6: PAYMENT ================= */}
        {currentStep === "payment" && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider">
                Stage 6: Payment Checkout (Naira ₦)
              </span>
              <h3 className="text-xl font-bold text-white">Select Your Payment Method</h3>
              <p className="text-xs text-slate-400">
                In compliance with Section 12 Customer Liability Policy: Pay on inspection, instant bank transfer, or Moniepoint POS.
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <button
                onClick={() => setPaymentDetails((prev) => ({ ...prev, method: "bank_transfer" }))}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  paymentDetails.method === "bank_transfer"
                    ? "bg-teal-500/20 border-teal-400 text-white shadow-md"
                    : "bg-slate-950 border-slate-800 text-slate-300"
                }`}
              >
                <div className="font-bold text-white mb-1">Instant Bank Transfer</div>
                <p className="text-[11px] text-slate-400">OPay, PalmPay, Moniepoint, GTBank</p>
              </button>

              <button
                onClick={() => setPaymentDetails((prev) => ({ ...prev, method: "pay_on_delivery" }))}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  paymentDetails.method === "pay_on_delivery"
                    ? "bg-teal-500/20 border-teal-400 text-white shadow-md"
                    : "bg-slate-950 border-slate-800 text-slate-300"
                }`}
              >
                <div className="font-bold text-white mb-1">Pay on Inspection</div>
                <p className="text-[11px] text-slate-400">Moniepoint POS with delivery rider</p>
              </button>

              <button
                onClick={() => setPaymentDetails((prev) => ({ ...prev, method: "deposit_50" }))}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  paymentDetails.method === "deposit_50"
                    ? "bg-teal-500/20 border-teal-400 text-white shadow-md"
                    : "bg-slate-950 border-slate-800 text-slate-300"
                }`}
              >
                <div className="font-bold text-white mb-1">50% Walk-in Deposit</div>
                <p className="text-[11px] text-slate-400">50% upfront, balance on pickup</p>
              </button>
            </div>

            {/* Bank Transfer Details Box */}
            {paymentDetails.method === "bank_transfer" && (
              <div className="p-5 rounded-3xl bg-slate-950 border border-teal-500/30 space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-teal-300">Dedicated Transfer Account:</span>
                  <span className="font-mono text-emerald-400 font-bold">Auto-Reconciled</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Bank Name:</span>
                    <strong className="text-white font-mono">{paymentDetails.bankName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Account Number:</span>
                    <div className="flex items-center gap-2">
                      <strong className="text-emerald-400 font-mono text-base font-black">
                        {paymentDetails.accountNumber}
                      </strong>
                      <button
                        onClick={handleCopyAccount}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                        title="Copy account"
                      >
                        {copiedAccount ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Account Name:</span>
                    <strong className="text-white">{paymentDetails.accountName}</strong>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-slate-400 text-[11px]">
                    Reference: <span className="font-mono text-white">{paymentDetails.reference}</span>
                  </div>

                  {!isTransferVerified ? (
                    <button
                      onClick={handleVerifyTransfer}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      I Have Transferred ₦{finalTotalNaira.toLocaleString()}
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">
                      <CheckCircle2 className="w-4 h-4" /> Transfer Verified
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Total Due Banner */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block">Total Amount Payable:</span>
                <span className="text-xl font-black text-emerald-400 font-mono">
                  ₦{finalTotalNaira.toLocaleString()}
                </span>
              </div>
              <span className="text-[11px] text-slate-400">Zero hidden fees · Official Receipt Issued</span>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={handlePrevStep}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold cursor-pointer"
              >
                ← Back to Database
              </button>
              <button
                onClick={handleNextStep}
                className="px-6 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <span>Confirm & Generate Voucher</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 7: CONFIRMATION ================= */}
        {currentStep === "confirmation" && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto shadow-xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                Stage 7: Official Intake Confirmation Voucher
              </span>
              <h3 className="text-2xl font-black text-white">Order Confirmed & Tagged</h3>
              <p className="text-xs text-slate-400 max-w-lg mx-auto">
                Your order is officially queued for doorstep collection or facility processing at Firstgate, LASUSTECH.
              </p>
            </div>

            {/* Digital Printable Voucher */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 text-xs font-sans shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-slate-850 pb-4">
                <FreshcareLogo size="sm" />
                <div className="text-right">
                  <div className="font-mono font-bold text-teal-400 text-sm">
                    {bookingState.tagNumber || "FC-108"}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Ref: {bookingState.bookingReference || "FC-IKD-842"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] py-2">
                <div>
                  <span className="text-slate-500 block">Customer:</span>
                  <strong className="text-white">{bookingState.customerName || "Babatunde Adeleke"}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Delivery Area:</span>
                  <strong className="text-white">{bookingState.deliveryArea}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Starch Level:</span>
                  <strong className="text-teal-300 capitalize">{selectedStarch} Starch</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Turnaround:</span>
                  <strong className="text-emerald-400">24–48 Hours SOP</strong>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center font-mono">
                <span className="text-slate-300">Total Due on Handover:</span>
                <span className="text-emerald-400 font-bold text-base">
                  ₦{finalTotalNaira.toLocaleString()}
                </span>
              </div>

              <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1">
                <span>Proof of Intake: Photo-documented on WhatsApp</span>
                <span>Section 12 Replacement Guarantee</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4">
              <button
                onClick={handlePrevStep}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold cursor-pointer w-full sm:w-auto"
              >
                ← Back to Payment
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Voucher</span>
                </button>
                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 flex-1 sm:flex-initial"
                >
                  <span>Trigger WhatsApp / Email Dispatch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 8: WHATSAPP / EMAIL ================= */}
        {currentStep === "whatsapp_email" && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto shadow-xl">
                <Send className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                Stage 8: Omnichannel Dispatch Trigger
              </span>
              <h3 className="text-2xl font-black text-white">Direct WhatsApp & Email Routing</h3>
              <p className="text-xs text-slate-400 max-w-lg mx-auto">
                Automated order manifest sent to Freshcare Ikorodu dispatch desk. Connect with your driver or verify email receipt.
              </p>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* WhatsApp Card */}
              <div className="p-5 rounded-3xl bg-emerald-950/20 border border-emerald-500/30 space-y-3 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Phone className="w-4 h-4" />
                    <span>WhatsApp Business Direct Dispatch</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Sends your pre-filled order manifest with Tag #{bookingState.tagNumber || "FC-108"}, address, and starch preference to Freshcare Ikorodu Desk (+234 803 000 FRESHCARE).
                  </p>
                </div>

                <a
                  href={`https://wa.me/2348030000000?text=${getWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setWhatsappSent(true)}
                  className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-95 text-center"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Order to WhatsApp Dispatch</span>
                </a>
              </div>

              {/* Email Card */}
              <div className="p-5 rounded-3xl bg-sky-950/20 border border-sky-500/30 space-y-3 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sky-400 font-bold">
                    <Mail className="w-4 h-4" />
                    <span>Automated Email Intake Receipt</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Electronic PDF voucher copy routed to your personal email and internal facility operations (dispatch@freshcarelaundry.ng).
                  </p>
                </div>

                <button
                  onClick={() => setEmailSent(true)}
                  className="w-full py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-sky-600/20 active:scale-95"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{emailSent ? "Voucher Dispatched to Email!" : "Send Electronic Voucher"}</span>
                </button>
              </div>
            </div>

            {/* Finish & Link to Live Dispatch Tracker */}
            <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <h4 className="font-bold text-white text-sm">Next Step: Monitor Real-Time Status</h4>
                <p className="text-slate-400 text-[11px]">
                  Track Picked Up → In Washing → Quality Check → Out for Delivery on the Live Board.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {onOpenTracker && (
                  <button
                    onClick={onOpenTracker}
                    className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Open Live Order Tracker</span>
                  </button>
                )}
                {onOpenDashboard && (
                  <button
                    onClick={onOpenDashboard}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 font-semibold text-xs cursor-pointer"
                  >
                    <span>View CRM Ledger</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
