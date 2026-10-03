import React, { useState } from "react";
import {
  Building2,
  Globe,
  MapPin,
  Share2,
  MessageSquare,
  Bot,
  ShoppingCart,
  UserCheck,
  LifeBuoy,
  Database,
  BarChart3,
  Calculator,
  Megaphone,
  LayoutDashboard,
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Play,
  Layers,
  Info,
  ChevronRight,
  CreditCard,
  Mail,
  Send,
  Wrench,
  BookOpen,
  Calendar,
  Tag,
  Check,
  Code
} from "lucide-react";
import { FreshcareLogo } from "./FreshFoldLogo";

export type ArchitectureMode = "enterprise" | "web_funnel" | "whatsapp_engine";

interface BusinessFlowArchitectureProps {
  onNavigateToDashboard?: () => void;
  onNavigateToCall?: () => void;
  onNavigateToPricing?: () => void;
  onNavigateToTracker?: () => void;
  onNavigateToOrderFunnel?: () => void;
  onNavigateToWhatsAppFlow?: () => void;
  onNavigateToAgentRAG?: () => void;
}

export const BusinessFlowArchitecture: React.FC<BusinessFlowArchitectureProps> = ({
  onNavigateToDashboard,
  onNavigateToCall,
  onNavigateToPricing,
  onNavigateToTracker,
  onNavigateToOrderFunnel,
  onNavigateToWhatsAppFlow,
  onNavigateToAgentRAG,
}) => {
  const [architectureMode, setArchitectureMode] = useState<ArchitectureMode>("enterprise");
  const [selectedNode, setSelectedNode] = useState<string>("ai_agent");
  const [showAsciiView, setShowAsciiView] = useState<boolean>(false);

  const [simulationState, setSimulationState] = useState<{
    running: boolean;
    step: number;
    scenarioTitle: string;
    scenarioChannel: string;
    scenarioTriage: string;
    scenarioText: string;
  } | null>(null);

  // Simulation runner
  const runSimulation = (scenario: {
    title: string;
    channel: string;
    triage: string;
    text: string;
  }) => {
    setSimulationState({
      running: true,
      step: 1,
      scenarioTitle: scenario.title,
      scenarioChannel: scenario.channel,
      scenarioTriage: scenario.triage,
      scenarioText: scenario.text,
    });

    const timers = [
      setTimeout(() => setSimulationState((prev) => prev ? { ...prev, step: 2 } : null), 800),
      setTimeout(() => setSimulationState((prev) => prev ? { ...prev, step: 3 } : null), 1600),
      setTimeout(() => setSimulationState((prev) => prev ? { ...prev, step: 4 } : null), 2500),
      setTimeout(() => setSimulationState((prev) => prev ? { ...prev, step: 5 } : null), 3500),
      setTimeout(() => setSimulationState((prev) => prev ? { ...prev, step: 6 } : null), 4600),
      setTimeout(() => setSimulationState((prev) => prev ? { ...prev, step: 7 } : null), 5800),
      setTimeout(() => setSimulationState((prev) => prev ? { ...prev, step: 8, running: false } : null), 7000),
    ];

    return () => timers.forEach(clearTimeout);
  };

  // Node details dictionary covering all 3 architectures
  const nodeDetails: Record<
    string,
    {
      title: string;
      tier: string;
      desc: string;
      metrics: string[];
      sop: string;
      tech: string;
      actionLabel?: string;
      action?: () => void;
    }
  > = {
    // Mode 1: Enterprise Pipeline
    business: {
      title: "Freshcare Enterprise Core",
      tier: "TIER 1 · FOUNDATIONAL ENTERPRISE",
      desc: "Freshcare Laundry and Drycleaning Services is an indigenous laundry powerhouse located at Firstgate, LASUSTECH, Ikorodu, Lagos State. Founded by Azeez Saheed Oluwadamilola (Dammy).",
      metrics: ["Target: 1,200 orders/mo", "CAC Registered Entity", "Zero-Mix Batch Policy"],
      sop: "Strict multi-stage quality control, chemical-free delicate wash basins, sequential waterproof tagging.",
      tech: "Hybrid Cloud + Local Operations Engine (Vite, Node.js, Gemini API, WhatsApp Cloud API)",
    },
    website: {
      title: "Digital Website Portal",
      tier: "TIER 2A · ACQUISITION / WEB",
      desc: "Modern responsive web portal built for Ikorodu residents, students of LASUSTECH, and commercial clients.",
      metrics: ["Online Price Calculator (₦)", "Doorstep Dispatch Booking", "Visual Lifecycle Order Tracker"],
      sop: "Syncs customer addresses within 1km LASUSTECH perimeter for automated ₦0 free delivery calculation.",
      tech: "React SPA, Tailwind CSS, Local Storage cache, WebSocket ready",
      actionLabel: "View Web Funnel",
      action: () => {
        setArchitectureMode("web_funnel");
        setSelectedNode("funnel_website");
      },
    },
    google_business: {
      title: "Google Business Profile",
      tier: "TIER 2B · LOCAL DISCOVERY / SEO",
      desc: "Local search and Google Maps listing for Freshcare Laundry Firstgate LASUSTECH. Drives local foot-traffic and click-to-call direct orders.",
      metrics: ["4.9★ Average Rating", "Top 3 Local 3-Pack Ikorodu", "Click-to-Call + Directions"],
      sop: "Automated SMS/WhatsApp prompts sent to happy customers at 'Delivered' stage to leave a Google Review.",
      tech: "Google Maps Platform Grounding, Google Places API, Local Structured Data JSON-LD",
    },
    social_media: {
      title: "Social Media Channels",
      tier: "TIER 2C · INBOUND DISCOVERY / BRAND",
      desc: "Instagram (@freshcare_laundry), TikTok (ASMR folding & stain transformation videos), and Facebook Page.",
      metrics: ["24.5k monthly impressions", "Direct DM link to WhatsApp", "Student promo reels"],
      sop: "Weekly video showcase of high-end traditional Senator wear pressing and wedding gown dry cleaning.",
      tech: "Meta Graph API, TikTok Creator Portal, Linktree WhatsApp direct routing",
    },
    customer_channels: {
      title: "Customer Channels Ingestion Layer",
      tier: "TIER 3 · INGESTION & CONVERSATION",
      desc: "Omnichannel hub consolidating customer touchpoints: WhatsApp Business (80% traffic in Nigeria), Web Portal chat/voice, and Social DMs.",
      metrics: ["Instant Response (< 3s)", "Single Customer Identity", "Unified Thread History"],
      sop: "Every inquiry regardless of source gets mapped to the customer's phone number as the universal primary key.",
      tech: "WhatsApp Business API webhook, Express gateway, Web Audio speech capture",
    },
    ai_agent: {
      title: "AI Customer Agent (Alex)",
      tier: "TIER 4 · INTELLIGENT TRIAGE & RESOLUTION",
      desc: "Voice & Text Concierge trained on Freshcare SOP, pricing in Naira (₦), and Ikorodu geography. Handles voice calls, extracts bookings, and triages requests into 3 streams.",
      metrics: ["94.2% Autonomous Resolution", "Naira Starch & Price Extraction", "15+ Pieces Promo Verification"],
      sop: "Identifies whether clothing quantity exceeds 15 pieces to automatically award ₦1,500 welcome credit.",
      tech: "Gemini 2.5 / 3.8 Flash, Speech-to-Speech synthesis, Structured JSON Schema Extraction",
      actionLabel: onNavigateToAgentRAG ? "Inspect 7 Tools & RAG" : "Launch Voice Concierge",
      action: onNavigateToAgentRAG || onNavigateToCall,
    },
    orders: {
      title: "Orders Stream",
      tier: "TIER 5A · DIRECT COMMERCE & DISPATCH",
      desc: "Direct laundry requests: Everyday wear, Senator native sets, Agbadas, Dry cleaning, and weekly student bundles.",
      metrics: ["Real-time piece counting", "Starch level preference", "Pickup & drop-off route scheduling"],
      sop: "Assigns sequential tag (FC-001) and generates digital WhatsApp receipt voucher.",
      tech: "Order State Machine (Picked Up -> In Washing -> Quality Check -> Out for Delivery -> Delivered)",
      actionLabel: "Configure Order in Catalog",
      action: onNavigateToPricing,
    },
    leads: {
      title: "Leads Pipeline",
      tier: "TIER 5B · SALES CONVERSION",
      desc: "Prospective customers inquiring about high-volume contracts: LASUSTECH student semester passes, hotel bedding, school lab coats, wedding events.",
      metrics: ["Lead Stage Tracking", "Quote Generation", "Automatic 24h follow-up ping"],
      sop: "High-value inquiries (>₦25,000) are flagged for immediate Front Desk Manager phone consultation.",
      tech: "Lead scoring matrix, Automated WhatsApp quote template delivery",
      actionLabel: "View Leads in CRM",
      action: onNavigateToDashboard,
    },
    support: {
      title: "Support & Care Stream",
      tier: "TIER 5C · QUALITY & RESOLUTION",
      desc: "Live order tracking, delivery ETA requests, garment starch modifications, re-wash guarantees, and feedback.",
      metrics: ["Zero-Mix Batch Verification", "100% Replacement Guarantee", "Sub-15m ticket resolution"],
      sop: "If customer expresses dissatisfaction, initiates Section 12 Customer Liability Protocol with free re-wash.",
      tech: "Ticket tracking system with escalation to Operations Manager",
      actionLabel: "Track Garment Lifecycle",
      action: onNavigateToTracker,
    },
    database_crm: {
      title: "Unified Database / CRM",
      tier: "TIER 6 · DATA WAREHOUSE & CUSTOMER CORE",
      desc: "Single source of truth storing customer profiles, order history, addresses in Ikorodu, garment tags, and loyalty rewards (10th wash free!).",
      metrics: ["Customer Lifetime Value", "Retention & Re-order Cycles", "Garment Tag Archives"],
      sop: "Maintains customer preference profiles: e.g. 'Always heavy starch on Senator trousers, no starch on shirt'.",
      tech: "PostgreSQL / Cloud SQL / Firestore compatible normalized data store with real-time listeners",
      actionLabel: "Open Live Database CRM",
      action: onNavigateToDashboard,
    },
    analytics: {
      title: "Analytics Engine",
      tier: "TIER 7A · BUSINESS INTELLIGENCE",
      desc: "Real-time metrics on customer acquisition channels, peak ordering windows, turn-around times, and fabric category demand.",
      metrics: ["Channel Attribution (WhatsApp vs Web vs Social)", "Turnaround Speed (Avg 26.4h)", "Customer Retention: 78%"],
      sop: "Daily operations report generated at 8:00 PM closing to optimize washer and presser bay shifts.",
      tech: "Real-time aggregation pipeline, dynamic trend charts, cohort retention models",
      actionLabel: "Inspect Analytics Charts",
      action: onNavigateToDashboard,
    },
    accounting: {
      title: "Accounting & Financial Ledger",
      tier: "TIER 7B · FINANCIAL CONTROL",
      desc: "Automated Nigerian Naira (₦) double-entry ledger. Tracks gross revenue, POS & bank transfer reconciliation, detergent & starch costs, and net margins.",
      metrics: ["Daily / Weekly Gross Revenue", "COGS (Detergent, Starch, Fuel)", "POS Moniepoint Reconciliation"],
      sop: "Reconciles 50% walk-in deposit and pay-on-delivery payments; tracks generator diesel expense during outages.",
      tech: "Double-entry transaction ledger, invoice generation, expense categorization",
      actionLabel: "Review Financial Ledger",
      action: onNavigateToDashboard,
    },
    marketing: {
      title: "Marketing Automation Engine",
      tier: "TIER 7C · GROWTH & RETENTION",
      desc: "Automated promotions: ₦1,500 welcome discount for >15 pcs, LASUSTECH student bundles, WhatsApp broadcast campaigns, and 10th wash free rewards.",
      metrics: ["Campaign ROI", "Discount Redemption Rate", "Referral Viral Coefficient"],
      sop: "Triggers automated WhatsApp re-engagement to clients whose last wash was >14 days ago.",
      tech: "Segmented customer broadcaster, Promo code validator, Loyalty punch card system",
      actionLabel: "Manage Marketing Engine",
      action: onNavigateToDashboard,
    },
    dashboard: {
      title: "Executive & Operations Dashboard",
      tier: "TIER 8 · COMMAND & CONTROL COCKPIT",
      desc: "Integrated cockpit for the Founder (Dammy) and Operations Manager to monitor live riders, active wash bays, today's cash flow, and triage queues.",
      metrics: ["Unified Live KPI Monitor", "One-Click Rider Dispatch", "Full-Spectrum Operational Control"],
      sop: "Monitors washer queue, delivery rider transit in Agric/Firstgate, and escalates delayed orders.",
      tech: "Real-time administrative command center with role-based visibility",
      actionLabel: "Launch Live Dashboard",
      action: onNavigateToDashboard,
    },

    // Mode 2: E-Commerce Web Funnel Nodes
    funnel_domain: {
      title: "1. Domain (DNS & SSL)",
      tier: "WEB FUNNEL · ENTRY GATEWAY",
      desc: "Custom registered domain (freshcare.ng / freshcarelaundry.com) pointing to cloud CDN edge with SSL encryption.",
      metrics: ["100% HTTPS encrypted", "Sub-50ms DNS resolution", "Instant mobile CDN routing"],
      sop: "Enforces strict HSTS security and geo-routing for Lagos ISP networks.",
      tech: "Custom domain CNAME, Let's Encrypt SSL, Cloudflare edge cache",
      actionLabel: "Inspect Funnel Step 1",
      action: onNavigateToOrderFunnel,
    },
    funnel_website: {
      title: "2. Website (Storefront Landing)",
      tier: "WEB FUNNEL · BRAND PORTAL",
      desc: "The Freshcare online presence highlighting the 3-step StoryBrand plan, zero-mix guarantees, and student promos.",
      metrics: ["Mobile-first responsive UI", "Instant load under 1.2s", "Zero-mix policy prominent"],
      sop: "Prominently displays the ₦1,500 welcome discount for >15 pieces on hero section.",
      tech: "React 19, Tailwind CSS, Vite client bundle, SEO Schema.org",
      actionLabel: "Open Live Storefront",
      action: () => setArchitectureMode("enterprise"),
    },
    funnel_catalogue: {
      title: "3. Product / Service Catalogue",
      tier: "WEB FUNNEL · COMMERCE INVENTORY",
      desc: "Official fixed pricing catalogue with interactive piece counters across Everyday Wear, Native Attire, Beddings, and Bundles.",
      metrics: ["40+ laundry & dryclean items", "Live Naira (₦) computation", ">15 pieces auto-discount meter"],
      sop: "All prices are fixed in Nigerian Naira with zero hidden surcharges.",
      tech: "Interactive React state calculator with dynamic subtotal & threshold triggers",
      actionLabel: "Open Pricing Catalogue",
      action: onNavigateToPricing,
    },
    funnel_order_form: {
      title: "4. Order Form (Intake & Logistics)",
      tier: "WEB FUNNEL · CUSTOMER CHECKOUT",
      desc: "Digital intake form capturing customer name, WhatsApp contact, Ikorodu delivery zone, date/time window, and starch preference.",
      metrics: ["1km free delivery validator", "Starch selector (Light/Med/Heavy)", "Express 24h toggle"],
      sop: "Validates Firstgate / LASUSTECH radius for instant ₦0 free delivery waiver.",
      tech: "Validated form state machine with local storage autosave",
      actionLabel: "Open Order Form",
      action: onNavigateToOrderFunnel,
    },
    funnel_database: {
      title: "5. Database (Order Persistence)",
      tier: "WEB FUNNEL · SYSTEM RECORD",
      desc: "Real-time write to the customer database and dispatch queue with sequential FC tag assignment (e.g. FC-001).",
      metrics: ["Atomic transaction write", "Auto-generated tag (FC-IKD-XXX)", "CRM record creation"],
      sop: "Every order writes directly to the operations queue before payment confirmation.",
      tech: "Database record with relational joins to customer ID and dispatch rider ID",
      actionLabel: "View in Database CRM",
      action: onNavigateToDashboard,
    },
    funnel_payment: {
      title: "6. Payment Engine",
      tier: "WEB FUNNEL · FINANCIAL SETTLEMENT",
      desc: "Multi-option payment gateway supporting Moniepoint POS on delivery, instant Nigerian bank transfer, and online debit cards.",
      metrics: ["Pay-on-Delivery with POS", "Bank Transfer Reconciliation", "Moniepoint Terminal Sync"],
      sop: "Zero-risk policy: Customer can inspect clothes before making final payment.",
      tech: "Moniepoint POS API integration, Paystack webhook, Bank Transfer validator",
      actionLabel: "Test Payment Simulation",
      action: onNavigateToOrderFunnel,
    },
    funnel_confirmation: {
      title: "7. Confirmation Screen & Voucher",
      tier: "WEB FUNNEL · ORDER RECEIPT",
      desc: "Verified confirmation voucher showing the unique booking reference, assigned rider, items breakdown, and estimated delivery.",
      metrics: ["Unique Booking Ref (FC-IKD-201)", "Printable digital voucher", "Stage 1 (Picked Up) init"],
      sop: "Displays physical receipt format with customer liability and zero-mix guarantee.",
      tech: "Dynamic SVG barcode/QR generator, Printable receipt HTML engine",
      actionLabel: "View Confirmation Voucher",
      action: onNavigateToTracker,
    },
    funnel_whatsapp_email: {
      title: "8. WhatsApp / Email Dispatch",
      tier: "WEB FUNNEL · NOTIFICATION ENGINE",
      desc: "Automated instant WhatsApp receipt dispatched to customer's phone alongside email confirmation and rider alert.",
      metrics: ["Instant WhatsApp delivery (< 5s)", "Photo-documentation trigger", "Direct chat link to Alex"],
      sop: "Customer receives WhatsApp ping with link to monitor live garment wash stages.",
      tech: "WhatsApp Cloud API template message + SendGrid transactional email",
      actionLabel: "Test WhatsApp Dispatch",
      action: onNavigateToOrderFunnel,
    },

    // Mode 3: WhatsApp AI Automation Engine Nodes
    wa_customer: {
      title: "1. Customer (Ikorodu User)",
      tier: "WHATSAPP AI · USER INITIATION",
      desc: "Mobile customer in Ikorodu, LASUSTECH student, or busy professional needing fast laundry pickup.",
      metrics: ["Mobile WhatsApp native", "No app download needed", "24/7 access from any smartphone"],
      sop: "80% of Nigerian consumer laundry inquiries originate on WhatsApp.",
      tech: "WhatsApp client on Android / iOS / Web",
      actionLabel: "Launch Live WhatsApp Simulator",
      action: onNavigateToWhatsAppFlow,
    },
    wa_whatsapp: {
      title: "2. WhatsApp Interface",
      tier: "WHATSAPP AI · MESSAGING INTERFACE",
      desc: "Verified Freshcare Laundry WhatsApp Business channel (+234 Ikorodu Desk) with quick-reply buttons and catalog links.",
      metrics: ["Verified Business badge", "Automated greeting greeting", "Rich media support for photos"],
      sop: "Auto-replies within 3 seconds to welcome customers and prompt for quantity and location.",
      tech: "WhatsApp Business Account (WABA), 2-way conversation thread",
      actionLabel: "Simulate WhatsApp Conversation",
      action: onNavigateToWhatsAppFlow,
    },
    wa_api: {
      title: "3. WhatsApp API Gateway",
      tier: "WHATSAPP AI · API & WEBHOOK LAYER",
      desc: "Meta Cloud API webhook forwarding incoming chat messages, voice notes, and customer photos directly to the server.",
      metrics: ["Zero message drop", "Sub-100ms webhook relay", "Secure payload signature verification"],
      sop: "Extracts sender's WhatsApp phone number as primary key and authenticates against CRM.",
      tech: "Meta WhatsApp Cloud API v19.0, Express HTTPS webhook receiver, HMAC SHA256",
      actionLabel: "Inspect API Gateway",
      action: onNavigateToWhatsAppFlow,
    },
    wa_ai_agent: {
      title: "4. AI Agent (Alex Engine)",
      tier: "WHATSAPP AI · INTELLIGENT BRAIN",
      desc: "Autonomous conversational engine powered by Gemini 2.5 / 3.8 Flash, trained on Nigerian hospitality, local Ikorodu terms, and starch preferences.",
      metrics: ["Gemini 3.8 Flash inference", "Contextual memory", "Natural Nigerian conversational cadence"],
      sop: "Understands local terms like 'Senator', 'Agbada', 'Chinos', 'Heavy crisp starch', 'Agric bus stop'.",
      tech: "Google Gen AI TypeScript SDK, JSON structured mode, system prompt injection",
      actionLabel: "Chat with Alex",
      action: onNavigateToWhatsAppFlow,
    },
    wa_knowledge_base: {
      title: "5. Knowledge Base (Freshcare SOP)",
      tier: "WHATSAPP AI · CONTEXT & GROUNDING",
      desc: "Comprehensive database of Freshcare operational rules: 40+ item fixed prices in ₦, free 1km LASUSTECH delivery, and ₦1,500 discount for >15 pcs.",
      metrics: ["Zero hallucination guardrails", "Live price menu grounding", "SOP compliance rules"],
      sop: "Enforces strict condition: ₦1,500 welcome discount only activates when items exceed 15 pieces.",
      tech: "Vector embeddings / Grounded system instruction context",
      actionLabel: "Read Freshcare SOP",
      action: onNavigateToCall,
    },
    wa_tools: {
      title: "6. Agent Tool Execution Layer",
      tier: "WHATSAPP AI · FUNCTION CALLING",
      desc: "The AI Agent autonomously selects and calls specialized operational tools to compute quotes, register orders, and schedule rider pickups.",
      metrics: ["Tool calling accuracy > 98%", "Multi-tool chained execution", "Structured parameter output"],
      sop: "Executes calculation before committing to database to verify discount eligibility.",
      tech: "Gemini Function Calling (Tools: calculatePrice, registerOrder, schedulePickup)",
      actionLabel: onNavigateToAgentRAG ? "Test 7 Agent Tools & RAG" : "Test AI Tools",
      action: onNavigateToAgentRAG || onNavigateToWhatsAppFlow,
    },
    wa_tool_price: {
      title: "Tool A: Price Calculator",
      tier: "WHATSAPP AI TOOL · FINANCIAL ENGINE",
      desc: "Calculates precise total in Naira based on clothing count, starching choices, express rush surcharges, and discount credits.",
      metrics: ["Itemized pricing", "Auto-detection of 16+ pieces for -₦1,500", "Delivery fee calculator"],
      sop: "Calculates ₦0 delivery fee for Firstgate / LASUSTECH; ₦500 for other Ikorodu environs.",
      tech: "pricing_calculator_tool(items, isExpress, area, isFirstOrder)",
      actionLabel: "Run Price Calculator",
      action: onNavigateToPricing,
    },
    wa_tool_order: {
      title: "Tool B: Order System",
      tier: "WHATSAPP AI TOOL · INVENTORY & BATCHING",
      desc: "Generates sequential waterproof tag (e.g. FC-001), reserves isolated zero-mix washing machine bay, and prepares photo intake ticket.",
      metrics: ["FC-series sequential tag", "Zero-mix machine bay allocation", "Garment photo queue"],
      sop: "Assigns tag immediately before pickup dispatch so tag is pre-printed for the rider.",
      tech: "order_system_tool(customer, items, starchPreference, tagNumber)",
      actionLabel: "Check Dispatch Board",
      action: onNavigateToTracker,
    },
    wa_tool_pickup: {
      title: "Tool C: Pickup Scheduling",
      tier: "WHATSAPP AI TOOL · DISPATCH ROUTING",
      desc: "Cross-references Ikorodu dispatch riders' calendar and books the customer's preferred date and arrival window.",
      metrics: ["Time window validation (8-11AM, 12-3PM, 4-7PM)", "Rider route optimization", "30-min advance ETA alert"],
      sop: "Restricts delivery bookings to operating hours (Mon-Sat 7AM-8PM, Sun 9AM-4PM).",
      tech: "pickup_scheduling_tool(address, preferredDate, preferredWindow, driverRoute)",
      actionLabel: "Open Scheduling Calendar",
      action: onNavigateToTracker,
    },
    wa_database: {
      title: "7. Database Sync",
      tier: "WHATSAPP AI · PERSISTENCE LAYER",
      desc: "Atomically stores the completed booking, customer profile, and conversation transcript into the unified Freshcare CRM database.",
      metrics: ["Real-time CRM record", "WhatsApp chat transcript linked", "Instant push to Operations Dashboard"],
      sop: "Creates or updates customer loyalty profile (tracking count towards 10th wash free).",
      tech: "Cloud SQL / PostgreSQL / Firestore relational storage with webhook event triggers",
      actionLabel: "View in Operations CRM",
      action: onNavigateToDashboard,
    },
    wa_confirmation: {
      title: "8. Confirmation WhatsApp Dispatch",
      tier: "WHATSAPP AI · CUSTOMER CLOSING",
      desc: "The AI Agent sends a finalized WhatsApp booking confirmation card with tag number, arrival time, pricing summary, and rider details.",
      metrics: ["Instant confirmation card", "Booking Ref (FC-IKD-XXX)", "Zero-mix guarantee badge"],
      sop: "Includes clear instruction: 'Have your garments ready for count and photo-tagging upon rider arrival.'",
      tech: "WhatsApp Interactive Button Message with Live Tracker Web Link",
      actionLabel: "Test Live Confirmation Flow",
      action: onNavigateToWhatsAppFlow,
    },
  };

  const selectedData = nodeDetails[selectedNode] || nodeDetails.business;

  // ASCII representations for direct copy or technical display
  const asciiRepresentations: Record<ArchitectureMode, string> = {
    enterprise: `BUSINESS
   │
   ├───────────────────────────────┼───────────────────────────────┐
   ↓                               ↓                               ↓
WEBSITE                     GOOGLE BUSINESS                  SOCIAL MEDIA
   │                            PROFILE                            │
   │                               │                               │
   └───────────────────────────────┼───────────────────────────────┘
                                   ↓
                           CUSTOMER CHANNELS
                     WhatsApp  │  Website  │  Social
                                   │
                                   ↓
                           AI CUSTOMER AGENT
                                   │
                   ┌───────────────┼───────────────┐
                   ↓               ↓               ↓
                 Orders          Leads          Support
                   │               │               │
                   └───────────────┼───────────────┘
                                   ↓
                              DATABASE/CRM
                                   │
                   ┌───────────────┼───────────────┐
                   ↓               ↓               ↓
               Analytics       Accounting      Marketing
                   │               │               │
                   └───────────────┼───────────────┘
                                   ↓
                               DASHBOARD`,

    web_funnel: `Domain
  ↓
Website
  ↓
Product/service catalogue
  ↓
Order form
  ↓
Database
  ↓
Payment
  ↓
Confirmation
  ↓
WhatsApp/email`,

    whatsapp_engine: `Customer
   ↓
WhatsApp
   ↓
WhatsApp API
   ↓
AI Agent
   ↓
Knowledge Base
   ↓
Tools
 ┌──────────────────────┼──────────────────────┐
 ↓                      ↓                      ↓
Price                 Order                  Pickup
                      System               Scheduling
   ↓                      ↓                      ↓
   └──────────────────────┼──────────────────────┘
                          ↓
                       Database
                          ↓
                     Confirmation`,
  };

  return (
    <div className="space-y-8">
      {/* Header Banner & Architecture Mode Selector */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-teal-950/40 to-slate-900 border border-teal-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-teal-400" />
              <span>Full End-to-End Enterprise Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Freshcare Business & Automation Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore the 3 complete operational diagrams for Freshcare Laundry and Drycleaning Services in Ikorodu. Switch modes below to inspect any tier, run live simulations, or launch working modules.
            </p>
          </div>

          {/* Quick Simulation Trigger */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
            {architectureMode === "enterprise" && (
              <button
                onClick={() =>
                  runSimulation({
                    title: "WhatsApp Pickup Request",
                    channel: "WhatsApp Business",
                    triage: "Orders",
                    text: "Customer: 'I have 18 pieces including 2 Senator sets for tomorrow pickup in Agric. Apply the ₦1,500 discount!'",
                  })
                }
                className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Simulate Enterprise Flow</span>
              </button>
            )}

            {architectureMode === "web_funnel" && (
              <button
                onClick={() =>
                  runSimulation({
                    title: "8-Step Web Order Checkout",
                    channel: "Web Portal",
                    triage: "Web Order",
                    text: "Customer selects 20 clothing pieces on Catalogue → Fills Order Form for LASUSTECH → DB commit → Moniepoint POS → Voucher FC-IKD-201 → WhatsApp Alert.",
                  })
                }
                className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Simulate Web Funnel</span>
              </button>
            )}

            {architectureMode === "whatsapp_engine" && (
              <button
                onClick={() =>
                  runSimulation({
                    title: "WhatsApp AI Tools Execution",
                    channel: "WhatsApp API",
                    triage: "AI Tools",
                    text: "WhatsApp Message → Webhook → Alex Agent → SOP KB → Tools: [Price: ₦6,500 (-₦1,500)] + [Order: FC-001] + [Pickup: Tomorrow 8AM] → DB Sync → Confirmation.",
                  })
                }
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Simulate AI Tools Flow</span>
              </button>
            )}

            <button
              onClick={() => setShowAsciiView(!showAsciiView)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-teal-300 border border-teal-500/30 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Code className="w-3.5 h-3.5" />
              <span>{showAsciiView ? "Show Visual Diagram" : "View Text Diagram"}</span>
            </button>
          </div>
        </div>

        {/* 3 Architecture Mode Switcher Tabs */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => {
              setArchitectureMode("enterprise");
              setSelectedNode("ai_agent");
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              architectureMode === "enterprise"
                ? "bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/25 scale-[1.02]"
                : "bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>1. Enterprise Omnichannel Pipeline</span>
            <span className="text-[10px] bg-slate-900/40 px-1.5 py-0.5 rounded font-mono">
              Channels → AI → CRM → Dashboard
            </span>
          </button>

          <button
            onClick={() => {
              setArchitectureMode("web_funnel");
              setSelectedNode("funnel_order_form");
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              architectureMode === "web_funnel"
                ? "bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/25 scale-[1.02]"
                : "bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>2. E-Commerce Web Funnel</span>
            <span className="text-[10px] bg-slate-900/40 px-1.5 py-0.5 rounded font-mono">
              Domain → Catalogue → Form → DB → Payment → Confirmation
            </span>
          </button>

          <button
            onClick={() => {
              setArchitectureMode("whatsapp_engine");
              setSelectedNode("wa_ai_agent");
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              architectureMode === "whatsapp_engine"
                ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 scale-[1.02]"
                : "bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>3. WhatsApp AI Automation Engine</span>
            <span className="text-[10px] bg-slate-900/40 px-1.5 py-0.5 rounded font-mono">
              Customer → WhatsApp API → AI Agent → KB → Tools → DB
            </span>
          </button>
        </div>

        {/* Live Simulation Visual Bar */}
        {simulationState && (
          <div className="mt-6 p-4 rounded-2xl bg-slate-950/90 border border-teal-500/40 space-y-3 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-bold text-teal-300 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-teal-400 animate-ping" />
                Live Architecture Pipeline Simulation: {simulationState.scenarioTitle}
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                Stage {simulationState.step} of 8 · Channel: {simulationState.scenarioChannel}
              </span>
            </div>

            <p className="text-xs text-slate-200 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 font-mono">
              {simulationState.scenarioText}
            </p>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 pt-1">
              {[
                { label: "1. Intake", active: simulationState.step >= 1 },
                { label: "2. Channel", active: simulationState.step >= 2 },
                { label: "3. Gateway", active: simulationState.step >= 3 },
                { label: "4. AI Agent", active: simulationState.step >= 4 },
                { label: `5. Processing`, active: simulationState.step >= 5 },
                { label: "6. Database", active: simulationState.step >= 6 },
                { label: "7. Settlement", active: simulationState.step >= 7 },
                { label: "8. Completed", active: simulationState.step >= 8 },
              ].map((st, idx) => (
                <div
                  key={idx}
                  className={`p-1.5 rounded-lg text-center text-[10px] font-medium transition-all ${
                    st.active
                      ? "bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/30"
                      : "bg-slate-900 text-slate-500 border border-slate-800"
                  }`}
                >
                  {st.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ASCII View Toggle Modal/Box */}
      {showAsciiView && (
        <div className="bg-slate-950 rounded-3xl border border-teal-500/30 p-6 space-y-3 font-mono text-xs text-teal-300 overflow-x-auto shadow-2xl">
          <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
            <span className="font-bold text-white uppercase">
              Specification Architecture Diagram ({architectureMode.replace("_", " ")})
            </span>
            <span className="text-[11px]">Exact structural layout implemented</span>
          </div>
          <pre className="text-xs sm:text-sm text-teal-300 font-mono leading-relaxed whitespace-pre py-2">
            {asciiRepresentations[architectureMode]}
          </pre>
        </div>
      )}

      {/* Main Interactive Diagram Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        {/* Visual Architectural Tree (Left 2 cols on wide screens) */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  {architectureMode === "enterprise" && "System Flow Diagram 1"}
                  {architectureMode === "web_funnel" && "System Flow Diagram 2"}
                  {architectureMode === "whatsapp_engine" && "System Flow Diagram 3"}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {architectureMode === "enterprise" && "Freshcare End-to-End Enterprise Pipeline"}
                  {architectureMode === "web_funnel" && "Freshcare E-Commerce Web Funnel"}
                  {architectureMode === "whatsapp_engine" && "Freshcare WhatsApp AI Automation Engine"}
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                Click any node to inspect details
              </span>
            </div>

            {/* ============================================================== */}
            {/* VIEW 1: ENTERPRISE ARCHITECTURE                               */}
            {/* ============================================================== */}
            {architectureMode === "enterprise" && (
              <div className="space-y-6 animate-fadeIn">
                {/* LEVEL 1: BUSINESS */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setSelectedNode("business")}
                    className={`w-full max-w-sm p-4 rounded-2xl border text-center transition-all cursor-pointer group ${
                      selectedNode === "business"
                        ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 border-teal-300 shadow-xl shadow-teal-500/25 scale-[1.02]"
                        : "bg-slate-950 hover:bg-slate-900 text-white border-teal-500/40"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Building2 className="w-5 h-5 text-teal-400 group-hover:text-slate-950 transition-colors" />
                      <span className="text-sm font-black tracking-wider uppercase">BUSINESS</span>
                    </div>
                    <div className="text-xs font-medium opacity-90">
                      Freshcare Laundry and Drycleaning Services (Ikorodu)
                    </div>
                  </button>

                  <div className="w-0.5 h-6 bg-gradient-to-b from-teal-500 to-slate-700" />
                  <div className="w-full max-w-xl border-t-2 border-slate-700 relative">
                    <div className="absolute -top-1.5 left-1/2 -ml-1.5 w-3 h-3 rounded-full bg-teal-400" />
                  </div>
                </div>

                {/* LEVEL 2: WEBSITE | GOOGLE BUSINESS PROFILE | SOCIAL MEDIA */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <button
                    onClick={() => setSelectedNode("website")}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedNode === "website"
                        ? "bg-teal-500/20 border-teal-400 text-white shadow-lg"
                        : "bg-slate-950/80 hover:bg-slate-900/90 border-slate-800 text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Globe className="w-4 h-4 text-sky-400" />
                      <span className="text-xs font-black uppercase tracking-wider">WEBSITE</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Online calculator, live tracking, booking form & web voice.
                    </p>
                  </button>

                  <button
                    onClick={() => setSelectedNode("google_business")}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedNode === "google_business"
                        ? "bg-teal-500/20 border-teal-400 text-white shadow-lg"
                        : "bg-slate-950/80 hover:bg-slate-900/90 border-slate-800 text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-black uppercase tracking-wider">GOOGLE PROFILE</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Firstgate LASUSTECH Maps listing, reviews, directions & phone.
                    </p>
                  </button>

                  <button
                    onClick={() => setSelectedNode("social_media")}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedNode === "social_media"
                        ? "bg-teal-500/20 border-teal-400 text-white shadow-lg"
                        : "bg-slate-950/80 hover:bg-slate-900/90 border-slate-800 text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Share2 className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-black uppercase tracking-wider">SOCIAL MEDIA</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Instagram, TikTok ASMR folds, Facebook community reels.
                    </p>
                  </button>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-full max-w-xl border-b-2 border-slate-700" />
                  <div className="w-0.5 h-6 bg-gradient-to-b from-slate-700 to-teal-500" />
                  <div className="text-[10px] text-teal-400 font-mono uppercase bg-slate-950 px-2 py-0.5 rounded border border-teal-500/30">
                    Inbound Ingestion
                  </div>
                </div>

                {/* LEVEL 3: CUSTOMER CHANNELS */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setSelectedNode("customer_channels")}
                    className={`w-full max-w-md p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                      selectedNode === "customer_channels"
                        ? "bg-teal-500/20 border-teal-400 text-white shadow-xl"
                        : "bg-slate-950 hover:bg-slate-900 text-white border-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 mb-1.5">
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-black tracking-wider uppercase">CUSTOMER CHANNELS</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs font-semibold text-teal-300">
                      <span className="bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        WhatsApp
                      </span>
                      <span>│</span>
                      <span className="bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">
                        Website
                      </span>
                      <span>│</span>
                      <span className="bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30">
                        Social
                      </span>
                    </div>
                  </button>

                  <div className="w-0.5 h-6 bg-teal-500" />
                </div>

                {/* LEVEL 4: AI CUSTOMER AGENT */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setSelectedNode("ai_agent")}
                    className={`w-full max-w-lg p-5 rounded-2xl border text-center transition-all cursor-pointer relative overflow-hidden group ${
                      selectedNode === "ai_agent"
                        ? "bg-gradient-to-r from-teal-950 via-slate-950 to-emerald-950 border-teal-400 text-white shadow-xl shadow-teal-500/20"
                        : "bg-slate-950 hover:bg-slate-900 border-teal-500/40 text-white"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Bot className="w-5 h-5 text-teal-400" />
                      <span className="text-sm font-black tracking-wider uppercase">
                        AI CUSTOMER AGENT (ALEX)
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium">
                      Autonomous Voice & Chat Engine · Starch & Naira Extraction · Omnichannel Triaging
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] text-teal-300 font-mono bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/30">
                      <Sparkles className="w-3 h-3" />
                      Triages to: Orders · Leads · Support
                    </div>
                  </button>

                  <div className="w-0.5 h-6 bg-gradient-to-b from-teal-500 to-slate-700" />
                  <div className="w-full max-w-xl border-t-2 border-slate-700 relative">
                    <div className="absolute -top-1.5 left-1/2 -ml-1.5 w-3 h-3 rounded-full bg-teal-400" />
                  </div>
                </div>

                {/* LEVEL 5: ORDERS | LEADS | SUPPORT */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <button
                    onClick={() => setSelectedNode("orders")}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedNode === "orders"
                        ? "bg-emerald-500/20 border-emerald-400 text-white shadow-lg"
                        : "bg-slate-950/80 hover:bg-slate-900/90 border-slate-800 text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <ShoppingCart className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-black uppercase tracking-wider">ORDERS</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Senator wear, dry cleaning, student bundles, doorstep pickup tags.
                    </p>
                  </button>

                  <button
                    onClick={() => setSelectedNode("leads")}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedNode === "leads"
                        ? "bg-amber-500/20 border-amber-400 text-white shadow-lg"
                        : "bg-slate-950/80 hover:bg-slate-900/90 border-slate-800 text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <UserCheck className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-black uppercase tracking-wider">LEADS</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Corporate contracts, hotel bedding quotes, LASUSTECH semester passes.
                    </p>
                  </button>

                  <button
                    onClick={() => setSelectedNode("support")}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedNode === "support"
                        ? "bg-rose-500/20 border-rose-400 text-white shadow-lg"
                        : "bg-slate-950/80 hover:bg-slate-900/90 border-slate-800 text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <LifeBuoy className="w-4 h-4 text-rose-400" />
                      <span className="text-xs font-black uppercase tracking-wider">SUPPORT</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Tag tracking (FC-001), starch adjustments, zero-mix re-wash guarantee.
                    </p>
                  </button>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-full max-w-xl border-b-2 border-slate-700" />
                  <div className="w-0.5 h-6 bg-gradient-to-b from-slate-700 to-teal-500" />
                  <div className="text-[10px] text-teal-400 font-mono uppercase bg-slate-950 px-2 py-0.5 rounded border border-teal-500/30">
                    Central Storage Core
                  </div>
                </div>

                {/* LEVEL 6: DATABASE / CRM */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setSelectedNode("database_crm")}
                    className={`w-full max-w-md p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                      selectedNode === "database_crm"
                        ? "bg-gradient-to-r from-blue-900/60 to-teal-900/60 border-teal-400 text-white shadow-xl"
                        : "bg-slate-950 hover:bg-slate-900 text-white border-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Database className="w-4 h-4 text-teal-400" />
                      <span className="text-xs font-black tracking-wider uppercase">DATABASE / CRM</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Unified Customer Profiles · Order History · Lead Pipeline · Support Logs
                    </p>
                  </button>

                  <div className="w-0.5 h-6 bg-gradient-to-b from-teal-500 to-slate-700" />
                  <div className="w-full max-w-xl border-t-2 border-slate-700 relative">
                    <div className="absolute -top-1.5 left-1/2 -ml-1.5 w-3 h-3 rounded-full bg-teal-400" />
                  </div>
                </div>

                {/* LEVEL 7: ANALYTICS | ACCOUNTING | MARKETING */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <button
                    onClick={() => setSelectedNode("analytics")}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedNode === "analytics"
                        ? "bg-sky-500/20 border-sky-400 text-white shadow-lg"
                        : "bg-slate-950/80 hover:bg-slate-900/90 border-slate-800 text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart3 className="w-4 h-4 text-sky-400" />
                      <span className="text-xs font-black uppercase tracking-wider">ANALYTICS</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Turnaround speeds, channel attribution, peak hours & retention rates.
                    </p>
                  </button>

                  <button
                    onClick={() => setSelectedNode("accounting")}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedNode === "accounting"
                        ? "bg-emerald-500/20 border-emerald-400 text-white shadow-lg"
                        : "bg-slate-950/80 hover:bg-slate-900/90 border-slate-800 text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Calculator className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-black uppercase tracking-wider">ACCOUNTING</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Naira financial ledger, POS Moniepoint reconciliation, detergent & fuel COGS.
                    </p>
                  </button>

                  <button
                    onClick={() => setSelectedNode("marketing")}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedNode === "marketing"
                        ? "bg-pink-500/20 border-pink-400 text-white shadow-lg"
                        : "bg-slate-950/80 hover:bg-slate-900/90 border-slate-800 text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Megaphone className="w-4 h-4 text-pink-400" />
                      <span className="text-xs font-black uppercase tracking-wider">MARKETING</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      ₦1,500 off &gt;15 pcs promo, student pass campaigns, WhatsApp broadcasts.
                    </p>
                  </button>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-full max-w-xl border-b-2 border-slate-700" />
                  <div className="w-0.5 h-6 bg-gradient-to-b from-slate-700 to-teal-500" />
                  <div className="text-[10px] text-teal-400 font-mono uppercase bg-slate-950 px-2 py-0.5 rounded border border-teal-500/30">
                    Executive Command Center
                  </div>
                </div>

                {/* LEVEL 8: DASHBOARD */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => {
                      setSelectedNode("dashboard");
                      if (onNavigateToDashboard) onNavigateToDashboard();
                    }}
                    className={`w-full max-w-md p-5 rounded-2xl border text-center transition-all cursor-pointer ${
                      selectedNode === "dashboard"
                        ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 border-teal-300 shadow-xl shadow-teal-500/25 scale-[1.02]"
                        : "bg-slate-950 hover:bg-slate-900 text-white border-teal-500/40"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <LayoutDashboard className="w-5 h-5 text-teal-400" />
                      <span className="text-sm font-black tracking-wider uppercase">DASHBOARD</span>
                    </div>
                    <div className="text-xs font-semibold">
                      Founder & Operations Cockpit · Live KPIs · Real-time Control
                    </div>
                    <div className="mt-2 text-[10px] font-mono opacity-80 flex items-center justify-center gap-1">
                      <span>Click to view live interactive CRM & Operations Console</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* VIEW 2: E-COMMERCE WEB FUNNEL                                  */}
            {/* ============================================================== */}
            {architectureMode === "web_funnel" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="text-xs text-slate-400 bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
                  <span className="font-bold text-teal-300">Web Funnel Specification:</span> Follows the customer's linear conversion journey from domain arrival to WhatsApp/email order verification.
                </div>

                {/* 8-Step Vertical Chain */}
                {[
                  {
                    id: "funnel_domain",
                    step: 1,
                    title: "Domain",
                    icon: Globe,
                    subtitle: "freshcare.ng · SSL & CDN Edge",
                    badge: "Entry",
                  },
                  {
                    id: "funnel_website",
                    step: 2,
                    title: "Website",
                    icon: LayoutDashboard,
                    subtitle: "Modern Storefront & StoryBrand 3-Step Plan",
                    badge: "Storefront",
                  },
                  {
                    id: "funnel_catalogue",
                    step: 3,
                    title: "Product/Service Catalogue",
                    icon: ShoppingCart,
                    subtitle: "Fixed Pricing (₦) Menu · Everyday, Native, Bedding & Bundles",
                    badge: "Pricing (₦)",
                  },
                  {
                    id: "funnel_order_form",
                    step: 4,
                    title: "Order Form",
                    icon: Tag,
                    subtitle: "Customer Intake · Pickup Window · Starch Selection · 1km Free Check",
                    badge: "Intake",
                  },
                  {
                    id: "funnel_database",
                    step: 5,
                    title: "Database",
                    icon: Database,
                    subtitle: "Sequential Tag FC-001 Assigned · Central CRM Record Created",
                    badge: "Persistence",
                  },
                  {
                    id: "funnel_payment",
                    step: 6,
                    title: "Payment",
                    icon: CreditCard,
                    subtitle: "Moniepoint POS on Delivery · Direct Bank Transfer · Card",
                    badge: "Settlement",
                  },
                  {
                    id: "funnel_confirmation",
                    step: 7,
                    title: "Confirmation",
                    icon: CheckCircle2,
                    subtitle: "Digital Handover Voucher FC-IKD-201 · Zero-Loss Guarantee",
                    badge: "Verified",
                  },
                  {
                    id: "funnel_whatsapp_email",
                    step: 8,
                    title: "WhatsApp / Email",
                    icon: Send,
                    subtitle: "Automated WhatsApp Dispatch Slip & Email Photo Verification",
                    badge: "Notification",
                  },
                ].map((item, index, arr) => {
                  const Icon = item.icon;
                  const isSelected = selectedNode === item.id;
                  return (
                    <div key={item.id} className="flex flex-col items-center">
                      <button
                        onClick={() => setSelectedNode(item.id)}
                        className={`w-full max-w-lg p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-4 ${
                          isSelected
                            ? "bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border-teal-400 text-white shadow-xl shadow-teal-500/10 scale-[1.01]"
                            : "bg-slate-950/80 hover:bg-slate-900 border-slate-800 text-slate-200"
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                              isSelected
                                ? "bg-teal-500 text-slate-950"
                                : "bg-slate-900 text-teal-400 border border-teal-500/30"
                            }`}
                          >
                            {item.step}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-white">{item.title}</span>
                              <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                                {item.badge}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400">{item.subtitle}</p>
                          </div>
                        </div>

                        <Icon
                          className={`w-5 h-5 flex-shrink-0 ${
                            isSelected ? "text-teal-400" : "text-slate-500"
                          }`}
                        />
                      </button>

                      {index < arr.length - 1 && (
                        <div className="flex flex-col items-center my-1">
                          <div className="w-0.5 h-4 bg-teal-500/50" />
                          <ArrowDown className="w-3.5 h-3.5 text-teal-400 -my-1" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* ============================================================== */}
            {/* VIEW 3: WHATSAPP AI AUTOMATION ENGINE                          */}
            {/* ============================================================== */}
            {architectureMode === "whatsapp_engine" && (
              <div className="space-y-5 animate-fadeIn">
                <div className="text-xs text-slate-400 bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
                  <span className="font-bold text-emerald-400">WhatsApp Automation Engine:</span> Demonstrates the WhatsApp webhook ingestion, Alex AI brain, SOP Knowledge Base, multi-tool execution, and automated confirmation dispatch.
                </div>

                {/* Level 1: Customer */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setSelectedNode("wa_customer")}
                    className={`w-full max-w-sm p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      selectedNode === "wa_customer"
                        ? "bg-emerald-500/20 border-emerald-400 text-white shadow-lg"
                        : "bg-slate-950 hover:bg-slate-900 border-slate-800 text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-black uppercase tracking-wider">Customer</span>
                    </div>
                    <div className="text-[11px] text-slate-400">Mobile User in Ikorodu / LASUSTECH</div>
                  </button>

                  <div className="w-0.5 h-5 bg-emerald-500" />
                  <ArrowDown className="w-3.5 h-3.5 text-emerald-400 -my-1" />
                </div>

                {/* Level 2: WhatsApp */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setSelectedNode("wa_whatsapp")}
                    className={`w-full max-w-sm p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      selectedNode === "wa_whatsapp"
                        ? "bg-emerald-500/20 border-emerald-400 text-white shadow-lg"
                        : "bg-slate-950 hover:bg-slate-900 border-slate-800 text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-black uppercase tracking-wider">WhatsApp</span>
                    </div>
                    <div className="text-[11px] text-slate-400">Official +234 Freshcare Desk</div>
                  </button>

                  <div className="w-0.5 h-5 bg-emerald-500" />
                  <ArrowDown className="w-3.5 h-3.5 text-emerald-400 -my-1" />
                </div>

                {/* Level 3: WhatsApp API */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setSelectedNode("wa_api")}
                    className={`w-full max-w-sm p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      selectedNode === "wa_api"
                        ? "bg-emerald-500/20 border-emerald-400 text-white shadow-lg"
                        : "bg-slate-950 hover:bg-slate-900 border-slate-800 text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Zap className="w-4 h-4 text-teal-400" />
                      <span className="text-xs font-black uppercase tracking-wider">WhatsApp API</span>
                    </div>
                    <div className="text-[11px] text-slate-400">Meta Cloud Webhook Gateway</div>
                  </button>

                  <div className="w-0.5 h-5 bg-emerald-500" />
                  <ArrowDown className="w-3.5 h-3.5 text-emerald-400 -my-1" />
                </div>

                {/* Level 4: AI Agent */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setSelectedNode("wa_ai_agent")}
                    className={`w-full max-w-md p-4 rounded-2xl border text-center transition-all cursor-pointer relative ${
                      selectedNode === "wa_ai_agent"
                        ? "bg-gradient-to-r from-emerald-950 to-teal-950 border-emerald-400 text-white shadow-xl shadow-emerald-500/20"
                        : "bg-slate-950 hover:bg-slate-900 border-emerald-500/40 text-white"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Bot className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm font-black tracking-wider uppercase">AI Agent (Alex)</span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium">
                      Gemini 3.8 Flash · Conversational Reasoning & Tool Orchestration
                    </p>
                  </button>

                  <div className="w-0.5 h-5 bg-emerald-500" />
                  <ArrowDown className="w-3.5 h-3.5 text-emerald-400 -my-1" />
                </div>

                {/* Level 5: Knowledge Base */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setSelectedNode("wa_knowledge_base")}
                    className={`w-full max-w-sm p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      selectedNode === "wa_knowledge_base"
                        ? "bg-emerald-500/20 border-emerald-400 text-white shadow-lg"
                        : "bg-slate-950 hover:bg-slate-900 border-slate-800 text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <BookOpen className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-black uppercase tracking-wider">Knowledge Base</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Freshcare SOP · Fixed Naira Prices · 15+ Pcs Promo Rules
                    </div>
                  </button>

                  <div className="w-0.5 h-6 bg-gradient-to-b from-emerald-500 to-slate-700" />
                  <div className="text-[10px] text-emerald-400 font-mono uppercase bg-slate-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    Function Calling Tools
                  </div>
                  <div className="w-0.5 h-3 bg-slate-700" />
                  <div className="w-full max-w-xl border-t-2 border-slate-700 relative">
                    <div className="absolute -top-1.5 left-1/2 -ml-1.5 w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                </div>

                {/* Level 6: Tools Split: Price | Order System | Pickup Scheduling */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <button
                    onClick={() => setSelectedNode("wa_tool_price")}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedNode === "wa_tool_price"
                        ? "bg-teal-500/20 border-teal-400 text-white shadow-lg"
                        : "bg-slate-950/80 hover:bg-slate-900/90 border-slate-800 text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Calculator className="w-4 h-4 text-teal-400" />
                      <span className="text-xs font-black uppercase tracking-wider">Price Tool</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Naira pricing calculator, ₦1,500 discount validator.
                    </p>
                  </button>

                  <button
                    onClick={() => setSelectedNode("wa_tool_order")}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedNode === "wa_tool_order"
                        ? "bg-emerald-500/20 border-emerald-400 text-white shadow-lg"
                        : "bg-slate-950/80 hover:bg-slate-900/90 border-slate-800 text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <ShoppingCart className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-black uppercase tracking-wider">Order System</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      FC-001 tag generator, zero-mix washing bay reserve.
                    </p>
                  </button>

                  <button
                    onClick={() => setSelectedNode("wa_tool_pickup")}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedNode === "wa_tool_pickup"
                        ? "bg-amber-500/20 border-amber-400 text-white shadow-lg"
                        : "bg-slate-950/80 hover:bg-slate-900/90 border-slate-800 text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-black uppercase tracking-wider">Pickup Scheduling</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Ikorodu dispatch rider calendar, arrival window booking.
                    </p>
                  </button>
                </div>

                {/* Convergence to Database */}
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-xl border-b-2 border-slate-700" />
                  <div className="w-0.5 h-5 bg-emerald-500" />
                  <ArrowDown className="w-3.5 h-3.5 text-emerald-400 -my-1" />
                </div>

                {/* Level 7: Database */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setSelectedNode("wa_database")}
                    className={`w-full max-w-md p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                      selectedNode === "wa_database"
                        ? "bg-gradient-to-r from-blue-900/60 to-emerald-900/60 border-emerald-400 text-white shadow-xl"
                        : "bg-slate-950 hover:bg-slate-900 text-white border-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Database className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-black tracking-wider uppercase">Database</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Atomically Committed · Customer Profile & Chat Log Synced
                    </p>
                  </button>

                  <div className="w-0.5 h-5 bg-emerald-500" />
                  <ArrowDown className="w-3.5 h-3.5 text-emerald-400 -my-1" />
                </div>

                {/* Level 8: Confirmation */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setSelectedNode("wa_confirmation")}
                    className={`w-full max-w-md p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                      selectedNode === "wa_confirmation"
                        ? "bg-emerald-500 text-slate-950 border-emerald-300 font-bold shadow-xl shadow-emerald-500/25"
                        : "bg-slate-950 hover:bg-slate-900 text-white border-emerald-500/40"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 group-hover:text-slate-950" />
                      <span className="text-sm font-black tracking-wider uppercase">Confirmation</span>
                    </div>
                    <div className="text-xs opacity-90">
                      Automated WhatsApp Booking Card Dispatched to Customer
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Node Deep Dive Inspector (Right 1 col) */}
        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-5 sticky top-20 shadow-xl">
            <div className="space-y-1">
              <div className="text-[11px] font-mono text-teal-400 font-semibold tracking-wider">
                {selectedData.tier}
              </div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>{selectedData.title}</span>
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedData.desc}
            </p>

            {/* Key Metrics */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Operational Highlights:
              </span>
              <div className="space-y-1.5">
                {selectedData.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-200 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SOP Protocol */}
            <div className="p-3.5 rounded-2xl bg-teal-950/20 border border-teal-500/20 space-y-1.5">
              <span className="text-[11px] font-bold text-teal-300 uppercase tracking-wide flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-teal-400" />
                Freshcare SOP Protocol:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedData.sop}
              </p>
            </div>

            {/* Technical Stack */}
            <div className="text-[11px] text-slate-400 space-y-1">
              <span className="font-semibold text-slate-300">Technical Foundation:</span>
              <div className="p-2 rounded-xl bg-slate-950 font-mono text-[10px] text-teal-400 border border-slate-850">
                {selectedData.tech}
              </div>
            </div>

            {/* Contextual Action Button */}
            <div className="pt-2">
              {selectedData.actionLabel && selectedData.action && (
                <button
                  onClick={selectedData.action}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md active:scale-95"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>{selectedData.actionLabel}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
