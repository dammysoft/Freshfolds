import React, { useState } from "react";
import {
  Sparkles,
  Plus,
  Minus,
  Phone,
  Clock,
  ShieldCheck,
  Shirt,
  Layers,
  Home,
  Package,
  Sparkle,
  Truck,
  CheckCircle2,
  Info
} from "lucide-react";
import { BookingState } from "../types";

interface PricingCalculatorProps {
  onSendToAlex: (message: string) => void;
  bookingState: BookingState;
  setBookingState: React.Dispatch<React.SetStateAction<BookingState>>;
}

interface CatalogEntry {
  id: string;
  name: string;
  category: "everyday" | "traditional" | "bedding" | "dry_clean" | "bundle";
  washAndPressPrice?: number;
  washOnlyPrice?: number;
  pressOnlyPrice?: number;
  fixedPrice?: number;
  unit: string;
  description: string;
  notes?: string;
  popular?: boolean;
}

export const COMPLETE_PRICING_CATALOG: CatalogEntry[] = [
  // 6.1 Everyday Wear
  {
    id: "male_shirt",
    name: "Plain Shirt (Male)",
    category: "everyday",
    washAndPressPrice: 600,
    washOnlyPrice: 350,
    pressOnlyPrice: 250,
    unit: "per piece",
    description: "Cuff and collar pre-scrubbed, crisp button line pressing.",
    popular: true,
  },
  {
    id: "polo_tshirt",
    name: "Polo / T-Shirt",
    category: "everyday",
    washAndPressPrice: 500,
    washOnlyPrice: 300,
    pressOnlyPrice: 200,
    unit: "per piece",
    description: "Colour-safe wash, gentle temperature press to avoid collar warping.",
    popular: true,
  },
  {
    id: "jeans_trousers",
    name: "Jeans Trousers",
    category: "everyday",
    washAndPressPrice: 700,
    washOnlyPrice: 400,
    pressOnlyPrice: 300,
    unit: "per piece",
    description: "Heavy-duty soil extraction, preserved indigo dye wash, crease set.",
    popular: true,
  },
  {
    id: "plain_trousers",
    name: "Plain Trousers / Chinos",
    category: "everyday",
    washAndPressPrice: 600,
    washOnlyPrice: 350,
    pressOnlyPrice: 250,
    unit: "per piece",
    description: "Office trouser line pressing, anti-shine cloth barrier.",
  },
  {
    id: "shorts",
    name: "Shorts (Male/Female)",
    category: "everyday",
    washAndPressPrice: 400,
    washOnlyPrice: 250,
    pressOnlyPrice: 150,
    unit: "per piece",
    description: "Clean wash and crisp square fold.",
  },
  {
    id: "singlet_vest",
    name: "Singlet / Vest",
    category: "everyday",
    washAndPressPrice: 200,
    washOnlyPrice: 150,
    pressOnlyPrice: 100,
    unit: "per piece",
    description: "Oxygen-brightened white wash, odor disinfectant treatment.",
  },
  {
    id: "boxers_briefs",
    name: "Underwear / Boxers / Briefs",
    category: "everyday",
    washAndPressPrice: 200,
    washOnlyPrice: 150,
    unit: "per piece",
    description: "Hygienic anti-bacterial rinse, sanitized and folded.",
  },
  {
    id: "hoodie_sweatshirt",
    name: "Hoodie / Sweatshirt",
    category: "everyday",
    washAndPressPrice: 800,
    washOnlyPrice: 500,
    pressOnlyPrice: 300,
    unit: "per piece",
    description: "Fleece-fluffed drying, anti-shrink wash.",
  },
  {
    id: "cardigan_sweater",
    name: "Cardigan / Sweater",
    category: "everyday",
    washAndPressPrice: 800,
    washOnlyPrice: 500,
    pressOnlyPrice: 300,
    unit: "per piece",
    description: "Hand-wash wool / knit safe, flat rack drying.",
  },
  {
    id: "ladies_blouse",
    name: "Ladies Blouse",
    category: "everyday",
    washAndPressPrice: 600,
    washOnlyPrice: 350,
    pressOnlyPrice: 250,
    unit: "per piece",
    description: "Gentle wash with light starch, steam finish.",
  },
  {
    id: "ladies_gown_simple",
    name: "Ladies Gown (Simple)",
    category: "everyday",
    washAndPressPrice: 900,
    washOnlyPrice: 500,
    pressOnlyPrice: 400,
    unit: "per piece",
    description: "Everyday office or casual dress finish.",
  },
  {
    id: "ladies_gown_heavy",
    name: "Ladies Gown (Heavy / Beaded)",
    category: "everyday",
    washAndPressPrice: 1500,
    washOnlyPrice: 800,
    pressOnlyPrice: 700,
    unit: "per piece",
    description: "Delicate hand-wash only, stone and bead preservation.",
  },
  {
    id: "school_uniform",
    name: "School Uniform (Set)",
    category: "everyday",
    washAndPressPrice: 800,
    washOnlyPrice: 450,
    pressOnlyPrice: 350,
    unit: "per set",
    description: "Stain release formula with crisp medium-to-heavy starch.",
    popular: true,
  },
  {
    id: "lab_coat",
    name: "Lab Coat / Hospital Coat",
    category: "everyday",
    washAndPressPrice: 700,
    washOnlyPrice: 400,
    pressOnlyPrice: 300,
    unit: "per piece",
    description: "Hospital-grade sanitizer wash, sparkling bright white.",
  },

  // 6.2 Traditional & Formal Wear
  {
    id: "senator_native",
    name: "Senator / Native (2-piece)",
    category: "traditional",
    washAndPressPrice: 1800,
    pressOnlyPrice: 800,
    unit: "per 2-piece set",
    description: "Crisp neckband and chest finish, custom light or medium starch.",
    popular: true,
  },
  {
    id: "kaftan_simple",
    name: "Kaftan (Simple)",
    category: "traditional",
    washAndPressPrice: 1200,
    pressOnlyPrice: 600,
    unit: "per piece",
    description: "Smooth steam press with even starch distribution.",
  },
  {
    id: "kaftan_heavy",
    name: "Kaftan (Heavy / Embroidered)",
    category: "traditional",
    washAndPressPrice: 2000,
    pressOnlyPrice: 1000,
    unit: "per piece",
    description: "Embroidery thread safe treatment, crease-free drape.",
  },
  {
    id: "agbada_3pc",
    name: "Agbada (3-piece standard)",
    category: "traditional",
    washAndPressPrice: 3500,
    pressOnlyPrice: 1500,
    unit: "per 3-piece set",
    description: "Buba, Sokoto, and wide-wing Agbada with ceremonial heavy starch.",
    popular: true,
  },
  {
    id: "agbada_heavy",
    name: "Agbada (Heavy / Embroidered)",
    category: "traditional",
    washAndPressPrice: 5000,
    pressOnlyPrice: 2500,
    unit: "per 3-piece set",
    description: "Royal ceremonial handling, high-density embroidery treatment.",
  },
  {
    id: "aso_oke_set",
    name: "Aso-Oke (Gele + Iro + Buba set)",
    category: "traditional",
    washAndPressPrice: 2500,
    pressOnlyPrice: 1200,
    unit: "per set",
    description: "Hand-wash specialized care for woven luxury yarns.",
  },
  {
    id: "ankara_set",
    name: "Ankara / Iro & Buba (2-piece)",
    category: "traditional",
    washAndPressPrice: 1200,
    pressOnlyPrice: 600,
    unit: "per 2-piece set",
    description: "Colour-lock anti-bleed wash, vibrant African print care.",
  },
  {
    id: "suit_2pc_press",
    name: "Suit (2-piece - Jacket + Trouser)",
    category: "traditional",
    washAndPressPrice: 2500,
    pressOnlyPrice: 1200,
    unit: "per 2-piece suit",
    description: "Shoulder roll press, lapel roll maintenance.",
  },
  {
    id: "suit_3pc_press",
    name: "Suit (3-piece - with Waistcoat)",
    category: "traditional",
    washAndPressPrice: 3000,
    pressOnlyPrice: 1500,
    unit: "per 3-piece suit",
    description: "Full formal pressing on wooden suit hanger.",
  },
  {
    id: "tuxedo_suit",
    name: "Tuxedo / Dinner Suit",
    category: "traditional",
    washAndPressPrice: 3500,
    pressOnlyPrice: 1800,
    unit: "per set",
    description: "Satin lapel care, pristine evening wear finish.",
  },

  // 6.3 Bedding, Linen & Home Items
  {
    id: "bedsheet_single",
    name: "Single Bedsheet",
    category: "bedding",
    washAndPressPrice: 900,
    washOnlyPrice: 600,
    unit: "per piece",
    description: "Allergen extraction, fabric softening, hotel flat-pack fold.",
  },
  {
    id: "bedsheet_double",
    name: "Double / King Bedsheet",
    category: "bedding",
    washAndPressPrice: 1300,
    washOnlyPrice: 800,
    unit: "per piece",
    description: "Commercial extractor sanitized, crisp hospital fold.",
    popular: true,
  },
  {
    id: "duvet_inner_single",
    name: "Duvet Inner (Single)",
    category: "bedding",
    washAndPressPrice: 2000,
    washOnlyPrice: 1500,
    unit: "per piece",
    description: "Deep fiber sanitizing, tumble-lofting.",
  },
  {
    id: "duvet_inner_king",
    name: "Duvet Inner (Double / King)",
    category: "bedding",
    washAndPressPrice: 3500,
    washOnlyPrice: 2500,
    unit: "per piece",
    description: "Deep thermal wash, feather and down safe extraction.",
    popular: true,
  },
  {
    id: "large_bath_towel",
    name: "Large Bath Towel",
    category: "bedding",
    washAndPressPrice: 700,
    washOnlyPrice: 500,
    unit: "per piece",
    description: "Plush softening treatment, absorbent fiber restoration.",
  },
  {
    id: "curtain_panel",
    name: "Curtain Panel",
    category: "bedding",
    washAndPressPrice: 1800,
    washOnlyPrice: 1200,
    unit: "per panel",
    description: "Dust allergen extraction, vertical steam pleat press.",
  },

  // 6.4 Dry Cleaning Services
  {
    id: "dc_suit_2pc",
    name: "Suit (2-piece) Dry Clean",
    category: "dry_clean",
    fixedPrice: 4000,
    unit: "per suit",
    description: "Jacket + trouser, specialist dry clean treatment.",
    popular: true,
  },
  {
    id: "dc_suit_3pc",
    name: "Suit (3-piece) Dry Clean",
    category: "dry_clean",
    fixedPrice: 5000,
    unit: "per suit",
    description: "Includes waistcoat, luxury fabric conditioning.",
  },
  {
    id: "dc_agbada_3pc",
    name: "Agbada (3-piece) Dry Clean",
    category: "dry_clean",
    fixedPrice: 6000,
    unit: "per 3-piece",
    description: "Heavy traditional attire, delicate embroidery care.",
    popular: true,
  },
  {
    id: "dc_blazer",
    name: "Blazer / Jacket Dry Clean",
    category: "dry_clean",
    fixedPrice: 2500,
    unit: "per jacket",
    description: "Dry clean only, lint removal and shoulder press.",
  },
  {
    id: "dc_gown_evening",
    name: "Ladies Evening Gown Dry Clean",
    category: "dry_clean",
    fixedPrice: 3500,
    unit: "per gown",
    description: "Delicate fabrics (silk, chiffon, organza).",
  },
  {
    id: "dc_wedding_dress",
    name: "Wedding / Bridal Gown",
    category: "dry_clean",
    fixedPrice: 10000,
    unit: "per gown",
    description: "Full bridal treatment, stain preservation + protective garment box/bag.",
  },
  {
    id: "dc_leather_jacket",
    name: "Leather Jacket",
    category: "dry_clean",
    fixedPrice: 3000,
    unit: "per jacket",
    description: "Specialist conditioning and suppleness protection.",
  },
  {
    id: "dc_kaftan_heavy",
    name: "Kaftan (Heavy Embroidery) Dry Clean",
    category: "dry_clean",
    fixedPrice: 3000,
    unit: "per piece",
    description: "Colour-safe specialist treatment.",
  },

  // 9.6 Bundles & Subscriptions (Feasibility Report v2.0)
  {
    id: "bundle_student_weekly",
    name: "Student Bundle (Weekly)",
    category: "bundle",
    fixedPrice: 3500,
    unit: "8 pieces/order",
    description: "8 pieces — wash + press + fold + free delivery within 1km of LASUSTECH Firstgate.",
    popular: true,
  },
  {
    id: "bundle_bachelor_weekly",
    name: "Bachelor Bundle (Weekly)",
    category: "bundle",
    fixedPrice: 5000,
    unit: "12 pieces/order",
    description: "12 pieces — wash + press + fold + doorstep delivery in Ikorodu.",
    popular: true,
  },
  {
    id: "bundle_family_weekly",
    name: "Family Bundle (Weekly)",
    category: "bundle",
    fixedPrice: 8000,
    unit: "20 pieces/order",
    description: "20 pieces — wash + press + fold + doorstep delivery in Ikorodu.",
  },
  {
    id: "sub_student_monthly",
    name: "Student Monthly Subscription",
    category: "bundle",
    fixedPrice: 12000,
    unit: "32 pieces total",
    description: "4 weekly pickups × 8 pieces (32 total) with priority turnaround.",
  },
  {
    id: "sub_bachelor_monthly",
    name: "Bachelor Monthly Subscription",
    category: "bundle",
    fixedPrice: 18000,
    unit: "48 pieces total",
    description: "4 weekly pickups × 12 pieces (48 total) + shirt steam pressing included.",
  },
  {
    id: "sub_family_monthly",
    name: "Family Monthly Subscription",
    category: "bundle",
    fixedPrice: 30000,
    unit: "80 pieces total",
    description: "4 weekly pickups × 20 pieces (80 total) for busy Ikorodu households.",
  },
];

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  onSendToAlex,
  bookingState,
  setBookingState,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [serviceMode, setServiceMode] = useState<"wash_press" | "wash_only" | "press_only">("wash_press");
  const [selectedStarch, setSelectedStarch] = useState<"light" | "medium" | "heavy">("medium");
  const [expressSpeed, setExpressSpeed] = useState<"standard" | "express_24h" | "same_day_6h">("standard");
  const [deliveryZone, setDeliveryZone] = useState<"firstgate" | "extended_ikorodu">("firstgate");

  // Quantity tracking
  const [quantities, setQuantities] = useState<Record<string, number>>({
    senator_native: 2,
    male_shirt: 3,
    polo_tshirt: 2,
    jeans_trousers: 1,
  });

  const handleUpdateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  // Price resolver per item based on chosen mode
  const getItemPrice = (item: CatalogEntry): number => {
    if (item.fixedPrice !== undefined) {
      return item.fixedPrice;
    }
    if (serviceMode === "wash_only" && item.washOnlyPrice !== undefined) {
      return item.washOnlyPrice;
    }
    if (serviceMode === "press_only" && item.pressOnlyPrice !== undefined) {
      return item.pressOnlyPrice;
    }
    return item.washAndPressPrice || 0;
  };

  // Subtotal calculation & piece count calculation
  const totalPieces = COMPLETE_PRICING_CATALOG.reduce((acc, item) => {
    const qty = quantities[item.id] || 0;
    // Bundle count pieces if bundle, otherwise each qty is pieces
    if (item.id === "bundle_student_weekly") return acc + qty * 8;
    if (item.id === "bundle_bachelor_weekly") return acc + qty * 12;
    if (item.id === "bundle_family_weekly") return acc + qty * 20;
    if (item.id === "sub_student_monthly") return acc + qty * 32;
    if (item.id === "sub_bachelor_monthly") return acc + qty * 48;
    if (item.id === "sub_family_monthly") return acc + qty * 80;
    // 2-piece suits / native count as 2 pieces, 3-piece as 3
    if (item.id.includes("3pc")) return acc + qty * 3;
    if (item.id.includes("2pc") || item.id === "senator_native" || item.id === "ankara_set") return acc + qty * 2;
    return acc + qty;
  }, 0);

  const subtotal = COMPLETE_PRICING_CATALOG.reduce((acc, item) => {
    const qty = quantities[item.id] || 0;
    return acc + qty * getItemPrice(item);
  }, 0);

  // Delivery & Surcharges
  const deliveryCost = deliveryZone === "firstgate" ? 0 : 500;
  const expressSurcharge =
    expressSpeed === "express_24h" ? 500 : expressSpeed === "same_day_6h" ? 1000 : 0;
  
  // Rule: ₦1,500 discount ONLY applies to first order of clothes if clothes brought exceeds 15 pieces!
  const isDiscountEligible = totalPieces > 15;
  const piecesNeeded = Math.max(0, 16 - totalPieces);
  const welcomeDiscount = isDiscountEligible ? 1500 : 0;
  const finalTotalNaira = Math.max(0, subtotal + deliveryCost + expressSurcharge - welcomeDiscount);

  const filteredItems = COMPLETE_PRICING_CATALOG.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  const handleConsultWithAlex = () => {
    const selectedList = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => {
        const item = COMPLETE_PRICING_CATALOG.find((p) => p.id === id);
        return `${qty}x ${item?.name}`;
      });

    const starchDesc = selectedStarch ? `with ${selectedStarch} starch` : "";
    const speedDesc =
      expressSpeed === "express_24h"
        ? "with 24h Express (+₦500)"
        : expressSpeed === "same_day_6h"
        ? "with Same-Day 6h Rush (+₦1,000)"
        : "standard 24-48h";

    const discountMention = isDiscountEligible
      ? "I have over 15 pieces of clothes, so please apply the ₦1,500 welcome discount."
      : `I have ${totalPieces} pieces of clothes.`;

    const promptText =
      selectedList.length > 0
        ? `Hi Alex, I put together an order for: ${selectedList.join(
            ", "
          )} (${totalPieces} total pieces) ${starchDesc}, ${speedDesc}. ${discountMention} Pickup in ${
            deliveryZone === "firstgate" ? "Firstgate near LASUSTECH" : "Ikorodu environs"
          }. Can you confirm my total of ₦${finalTotalNaira.toLocaleString()} and lock in my driver pickup?`
        : "Hi Alex, can you give me an estimate for 2 Senator sets and 3 shirts with medium starch in Ikorodu?";

    setBookingState((prev) => ({
      ...prev,
      itemsMentioned: selectedList,
      totalPieces,
      isDiscountEligible,
      starchPreference: selectedStarch,
      estimatedNairaTotal: finalTotalNaira,
      deliveryFee: deliveryCost,
      expressSurcharge,
      discountPitched: isDiscountEligible,
      bookingStatus: "scheduling",
    }));

    onSendToAlex(promptText);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              Freshcare Official Fixed Pricing (₦)
            </span>
            <span className="text-xs text-slate-400">• Ikorodu, Lagos Branch</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Services & Fixed Pricing Menu
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Fixed prices — no negotiation, no hidden charges. Serving Firstgate, LASUSTECH, Agric, Benson & Ikorodu environs.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              selectedCategory === "all"
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setSelectedCategory("traditional")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-1 ${
              selectedCategory === "traditional"
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkle className="w-3.5 h-3.5" /> Traditional & Agbada
          </button>
          <button
            onClick={() => setSelectedCategory("everyday")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-1 ${
              selectedCategory === "everyday"
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Shirt className="w-3.5 h-3.5" /> Everyday Wear
          </button>
          <button
            onClick={() => setSelectedCategory("dry_clean")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-1 ${
              selectedCategory === "dry_clean"
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Dry Cleaning
          </button>
          <button
            onClick={() => setSelectedCategory("bundle")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-1 ${
              selectedCategory === "bundle"
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Package className="w-3.5 h-3.5 text-amber-400" /> Bundles & Subs
          </button>
          <button
            onClick={() => setSelectedCategory("bedding")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-1 ${
              selectedCategory === "bedding"
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Home className="w-3.5 h-3.5" /> Bedding & Linens
          </button>
        </div>
      </div>

      {/* Service Mode Toggles for Everyday & Traditional Wear */}
      <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-300">Choose Service Mode:</span>
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setServiceMode("wash_press")}
              className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                serviceMode === "wash_press"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Wash + Press + Fold
            </button>
            <button
              onClick={() => setServiceMode("wash_only")}
              className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                serviceMode === "wash_only"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Wash Only
            </button>
            <button
              onClick={() => setServiceMode("press_only")}
              className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                serviceMode === "press_only"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Press Only
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-300">Starch Level:</span>
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setSelectedStarch("light")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedStarch === "light"
                  ? "bg-sky-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Best for shirts and everyday blouses"
            >
              Light Starch
            </button>
            <button
              onClick={() => setSelectedStarch("medium")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedStarch === "medium"
                  ? "bg-sky-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Best for Senators and kaftans"
            >
              Medium Starch
            </button>
            <button
              onClick={() => setSelectedStarch("heavy")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedStarch === "heavy"
                  ? "bg-sky-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Crisp finish for Agbada & uniforms"
            >
              Heavy Starch
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Catalog List */}
        <div className="lg:col-span-2 space-y-3">
          {filteredItems.map((item) => {
            const qty = quantities[item.id] || 0;
            const price = getItemPrice(item);
            return (
              <div
                key={item.id}
                className="bg-slate-900/60 hover:bg-slate-900/90 rounded-2xl border border-slate-800 p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-white">{item.name}</h3>
                    {item.popular && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                        Popular in Ikorodu
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-2">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                    <span className="text-emerald-400 font-bold font-mono text-sm">
                      ₦{price.toLocaleString()}
                    </span>
                    <span className="text-slate-500">({item.unit})</span>
                    {item.washAndPressPrice && (
                      <span className="text-slate-500 text-[10px]">
                        Wash+Press: ₦{item.washAndPressPrice}
                        {item.pressOnlyPrice ? ` | Press: ₦${item.pressOnlyPrice}` : ""}
                        {item.washOnlyPrice ? ` | Wash: ₦${item.washOnlyPrice}` : ""}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 self-end sm:self-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, -1)}
                    disabled={qty <= 0}
                    className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <span className="w-10 text-center text-xs font-bold text-white font-mono">
                    {qty}
                  </span>

                  <button
                    onClick={() => handleUpdateQuantity(item.id, 1)}
                    className="w-8 h-8 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Summary Column */}
        <div className="space-y-6">
          <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6 shadow-xl sticky top-28 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Estimated Quote (₦)</h3>
              <span className="text-xs text-emerald-400 font-mono">Ikorodu Rates</span>
            </div>

            {/* Selected Basket */}
            <div className="space-y-2 max-h-40 overflow-y-auto text-xs">
              {Object.entries(quantities).filter(([_, q]) => q > 0).length === 0 ? (
                <p className="text-slate-500 italic py-2">
                  No items selected yet. Add clothes from the catalog to get your quote.
                </p>
              ) : (
                Object.entries(quantities)
                  .filter(([_, q]) => q > 0)
                  .map(([id, q]) => {
                    const item = COMPLETE_PRICING_CATALOG.find((p) => p.id === id);
                    if (!item) return null;
                    const price = getItemPrice(item);
                    return (
                      <div key={id} className="flex justify-between items-center text-slate-300">
                        <span className="truncate max-w-[170px]">
                          {q}x {item.name}
                        </span>
                        <span className="font-mono text-white">
                          ₦{(q * price).toLocaleString()}
                        </span>
                      </div>
                    );
                  })
              )}
            </div>

            {/* Options: Express Turnaround */}
            <div className="border-t border-slate-800 pt-3 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-sky-400" /> Turnaround Speed:
                </span>
                <select
                  value={expressSpeed}
                  onChange={(e) => setExpressSpeed(e.target.value as any)}
                  className="bg-slate-950 border border-slate-700 text-white rounded-lg px-2 py-1 text-xs"
                >
                  <option value="standard">Standard (24–48h)</option>
                  <option value="express_24h">24-hour Express (+₦500)</option>
                  <option value="same_day_6h">Same-Day 6h Rush (+₦1,000)</option>
                </select>
              </div>

              {/* Delivery Radius Selection */}
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-teal-400" /> Delivery Zone:
                </span>
                <select
                  value={deliveryZone}
                  onChange={(e) => setDeliveryZone(e.target.value as any)}
                  className="bg-slate-950 border border-slate-700 text-white rounded-lg px-2 py-1 text-xs max-w-[160px]"
                >
                  <option value="firstgate">Within 1km LASUSTECH (FREE)</option>
                  <option value="extended_ikorodu">Ikorodu Environs (+₦500)</option>
                </select>
              </div>
            </div>

            {/* Clothes Piece Counter & Eligibility */}
            <div className="border-t border-slate-800 pt-3 space-y-1.5 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span className="flex items-center gap-1 font-medium">
                  <Shirt className="w-3.5 h-3.5 text-emerald-400" /> Total Clothing Pieces:
                </span>
                <span className={`font-mono font-bold px-2 py-0.5 rounded-lg ${
                  isDiscountEligible
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-slate-800 text-slate-200 border border-slate-700"
                }`}>
                  {totalPieces} pcs
                </span>
              </div>

              {/* Progress towards >15 pieces threshold */}
              <div className="space-y-1 pt-1">
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isDiscountEligible ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                    style={{ width: `${Math.min(100, (totalPieces / 16) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>0 pcs</span>
                  <span className="font-semibold text-amber-300">Target: 16+ pieces</span>
                  <span>{isDiscountEligible ? "Unlocked! 🎉" : `${piecesNeeded} needed`}</span>
                </div>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="border-t border-slate-800 pt-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Items Subtotal:</span>
                <span className="font-mono text-white">₦{subtotal.toLocaleString()}</span>
              </div>

              {deliveryCost > 0 && (
                <div className="flex justify-between text-slate-400">
                  <span>Extended Delivery Fee:</span>
                  <span className="font-mono text-white">+₦{deliveryCost.toLocaleString()}</span>
                </div>
              )}

              {expressSurcharge > 0 && (
                <div className="flex justify-between text-amber-300">
                  <span>Express Surcharge:</span>
                  <span className="font-mono">+₦{expressSurcharge.toLocaleString()}</span>
                </div>
              )}

              {/* Conditional ₦1,500 Discount based strictly on >15 pieces */}
              {isDiscountEligible ? (
                <div className="flex justify-between text-emerald-300 font-bold bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> First-Order Welcome ({totalPieces} pcs &gt; 15):
                  </span>
                  <span className="font-mono text-emerald-400">-₦1,500</span>
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-amber-500/20 text-slate-300 space-y-1">
                  <div className="flex justify-between items-center text-amber-300 font-semibold text-[11px]">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> First-Order ₦1,500 Discount:
                    </span>
                    <span className="font-mono text-[10px] text-amber-400 font-bold">Unlocks at &gt;15 pcs</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Add <span className="text-amber-300 font-bold">{piecesNeeded} more clothing piece{piecesNeeded === 1 ? "" : "s"}</span> to unlock ₦1,500 OFF your first order!
                  </p>
                </div>
              )}

              <div className="border-t border-slate-800 pt-2 flex justify-between items-center text-base font-bold text-white">
                <span>Total Due:</span>
                <span className="text-xl text-emerald-400 font-mono">
                  ₦{finalTotalNaira.toLocaleString()}
                </span>
              </div>
            </div>

            {/* CTA to Consult with Alex */}
            <button
              onClick={handleConsultWithAlex}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold text-xs shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Ask Alex to Book This Order</span>
            </button>

            <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
              <span>Pay on delivery after checking your fresh clothes. WhatsApp receipt with tag # issued on collection!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

