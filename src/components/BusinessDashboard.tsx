import React, { useState } from "react";
import {
  LayoutDashboard,
  Database,
  BarChart3,
  Calculator,
  Megaphone,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Plus,
  Send,
  Sparkles,
  Phone,
  MessageSquare,
  Globe,
  MapPin,
  Share2,
  DollarSign,
  ShieldCheck,
  Package,
  Truck,
  Users,
  Calendar,
  Layers,
  Flame,
  Download,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Bot,
  LifeBuoy
} from "lucide-react";
import {
  CRMOrderRecord,
  CRMLeadRecord,
  CRMSupportRecord,
  CustomerProfile,
  AccountingTransaction,
  MarketingCampaign,
  CustomerChannel,
  OrderStage
} from "../types";
import { FreshcareLogo } from "./FreshFoldLogo";
import { BusinessFlowArchitecture } from "./BusinessFlowArchitecture";

interface BusinessDashboardProps {
  onOpenCallTab: () => void;
  onOpenPricingTab: () => void;
  onOpenTrackerTab: () => void;
}

export const BusinessDashboard: React.FC<BusinessDashboardProps> = ({
  onOpenCallTab,
  onOpenPricingTab,
  onOpenTrackerTab,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    "overview" | "crm" | "analytics" | "accounting" | "marketing" | "flow"
  >("overview");

  // CRM Filter states
  const [crmTypeFilter, setCrmTypeFilter] = useState<"all" | "orders" | "leads" | "support">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChannelFilter, setSelectedChannelFilter] = useState<string>("all");

  // Mock CRM Data representing realistic Ikorodu laundry operations
  const [orders, setOrders] = useState<CRMOrderRecord[]>([
    {
      id: "ord-1",
      tagNumber: "FC-101",
      customerName: "Babatunde Adeleke",
      customerPhone: "0803 234 5678",
      channel: "whatsapp",
      serviceType: "traditional",
      items: ["2x Senator / Native (2-piece)", "1x Heavy Agbada"],
      totalPieces: 16,
      totalNaira: 7600,
      paymentStatus: "paid_transfer",
      stage: "in_washing",
      deliveryArea: "Firstgate / LASUSTECH",
      createdAt: "Today, 08:30 AM",
      eta: "Tomorrow, 02:00 PM",
    },
    {
      id: "ord-2",
      tagNumber: "FC-102",
      customerName: "Dr. Mrs. Folashade Okonjo",
      customerPhone: "0812 876 5432",
      channel: "website",
      serviceType: "dry_cleaning",
      items: ["3x Corporate Blazer", "2x Silk Gown", "1x Two-piece Suit"],
      totalPieces: 6,
      totalNaira: 11500,
      paymentStatus: "paid_pos",
      stage: "quality_check",
      deliveryArea: "Agric",
      createdAt: "Yesterday, 04:15 PM",
      eta: "Today, 05:00 PM",
    },
    {
      id: "ord-3",
      tagNumber: "FC-103",
      customerName: "Ayomide Lasisi (LASUSTECH Student)",
      customerPhone: "0905 112 3344",
      channel: "whatsapp",
      serviceType: "bundle",
      items: ["Student Weekly Bundle (8 pcs wash + press + fold)"],
      totalPieces: 8,
      totalNaira: 3500,
      paymentStatus: "paid_transfer",
      stage: "out_for_delivery",
      deliveryArea: "Firstgate / LASUSTECH",
      createdAt: "Yesterday, 10:00 AM",
      eta: "Today, 12:30 PM",
    },
    {
      id: "ord-4",
      tagNumber: "FC-104",
      customerName: "Chief Gbenga Balogun",
      customerPhone: "0802 998 8776",
      channel: "google_business",
      serviceType: "traditional",
      items: ["3x Heavy Embroidered Agbada", "4x Senator", "Aso-Oke set"],
      totalPieces: 19,
      totalNaira: 28500,
      paymentStatus: "50_percent_deposit",
      stage: "picked_up",
      deliveryArea: "Ebute / Ipakodo",
      createdAt: "Today, 09:45 AM",
      eta: "In 2 days, 11:00 AM",
    },
    {
      id: "ord-5",
      tagNumber: "FC-105",
      customerName: "Blessing Eze",
      customerPhone: "0813 445 6677",
      channel: "social",
      serviceType: "everyday",
      items: ["Jeans, Chinos, T-Shirts, Hoodies"],
      totalPieces: 18,
      totalNaira: 6800,
      paymentStatus: "pay_on_delivery",
      stage: "in_washing",
      deliveryArea: "Benson",
      createdAt: "Today, 07:15 AM",
      eta: "Tomorrow, 10:00 AM",
    },
  ]);

  const [leads, setLeads] = useState<CRMLeadRecord[]>([
    {
      id: "lead-1",
      leadCode: "LD-301",
      name: "LASUSTECH Engineering Students Hostel Rep",
      phone: "0806 777 8899",
      channel: "whatsapp",
      interest: "Weekly Student Laundry Subscription for 40 hostel students",
      estimatedPieces: 320,
      estimatedValue: 140000,
      status: "quote_sent",
      notes: "Met with Alex on voice concierge. Requested student group discount voucher.",
      createdAt: "Yesterday, 02:40 PM",
    },
    {
      id: "lead-2",
      leadCode: "LD-302",
      name: "Grand Orchid Guest House (Agric, Ikorodu)",
      phone: "0818 333 2211",
      channel: "website",
      interest: "Daily bedsheet, duvet inner, and hotel bath towels linen wash",
      estimatedPieces: 95,
      estimatedValue: 85000,
      status: "contacted",
      notes: "Interested in scheduled Tuesday & Friday commercial pickups.",
      createdAt: "2 days ago",
    },
    {
      id: "lead-3",
      leadCode: "LD-303",
      name: "Pastor David Adele (RCCG Ikorodu Central)",
      phone: "0803 555 4433",
      channel: "google_business",
      interest: "Choir robes and pastor ceremonial agbadas dry cleaning",
      estimatedPieces: 35,
      estimatedValue: 52000,
      status: "new",
      notes: "Called via Google Maps listing. Inquired about heavy starch & crisp pressing.",
      createdAt: "Today, 10:15 AM",
    },
  ]);

  const [supportTickets, setSupportTickets] = useState<CRMSupportRecord[]>([
    {
      id: "sup-1",
      ticketId: "TKT-801",
      customerName: "Mrs. Toyin Adebayo",
      phone: "0802 123 9988",
      channel: "whatsapp",
      category: "starch_adjustment",
      priority: "normal",
      status: "resolved",
      details: "Customer requested medium starch instead of heavy starch on her husband's Kaftan.",
      resolution: "Alex flagged washer bay supervisor. Starch adjusted before pressing.",
      createdAt: "Today, 08:50 AM",
    },
    {
      id: "sup-2",
      ticketId: "TKT-802",
      customerName: "Engr. Kunle Coker",
      phone: "0809 987 1122",
      channel: "website",
      category: "delivery_eta",
      priority: "normal",
      status: "in_progress",
      details: "Customer requested dispatcher ETA for delivery at Benson bus stop.",
      resolution: "Rider slot #02 notified. Real-time GPS ping sent to customer on WhatsApp.",
      createdAt: "Today, 10:30 AM",
    },
  ]);

  // Accounting Transactions in Nigerian Naira (₦)
  const [transactions, setTransactions] = useState<AccountingTransaction[]>([
    {
      id: "tx-1",
      type: "income",
      category: "Laundry Orders",
      description: "Order FC-101 Payment (Traditional wear + Agbada)",
      amount: 7600,
      paymentMethod: "Bank Transfer (OPay/GTB)",
      date: "Today, 08:35 AM",
      reference: "TRX-789021",
    },
    {
      id: "tx-2",
      type: "income",
      category: "Dry Cleaning",
      description: "Order FC-102 Payment (Blazers, Suits, Silk Gowns)",
      amount: 11500,
      paymentMethod: "POS (Moniepoint)",
      date: "Yesterday, 04:20 PM",
      reference: "POS-449102",
    },
    {
      id: "tx-3",
      type: "expense",
      category: "Supplies (Starch & Detergent)",
      description: "Commercial cold-water laundry starch (25kg bag) + Omo drum",
      amount: 14500,
      paymentMethod: "Bank Transfer (OPay/GTB)",
      date: "Yesterday, 01:00 PM",
      reference: "EXP-1092",
    },
    {
      id: "tx-4",
      type: "expense",
      category: "Utilities & Fuel",
      description: "Diesel fuel (20L) for Mikano Generator during Ikorodu power outage",
      amount: 24000,
      paymentMethod: "Cash",
      date: "2 days ago",
      reference: "EXP-1088",
    },
    {
      id: "tx-5",
      type: "income",
      category: "Student Subscription",
      description: "Ayomide Lasisi Student Weekly Pass (Firstgate)",
      amount: 3500,
      paymentMethod: "Bank Transfer (OPay/GTB)",
      date: "Yesterday, 10:05 AM",
      reference: "TRX-788910",
    },
    {
      id: "tx-6",
      type: "expense",
      category: "Packaging Materials",
      description: "Branded Freshcare heavy nylon bags & sequential garment tags (1,000 units)",
      amount: 9800,
      paymentMethod: "Bank Transfer (OPay/GTB)",
      date: "3 days ago",
      reference: "EXP-1075",
    },
    {
      id: "tx-7",
      type: "income",
      category: "Laundry Orders",
      description: "Chief Balogun 50% Deposit for Agbadas & Aso-Oke (FC-104)",
      amount: 14250,
      paymentMethod: "POS (Moniepoint)",
      date: "Today, 09:50 AM",
      reference: "POS-449230",
    },
  ]);

  // Marketing Campaigns
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([
    {
      id: "camp-1",
      name: "₦1,500 Welcome Discount (>15 pieces)",
      code: "WELCOME1500",
      channel: "WhatsApp & Website Voice Alex",
      benefit: "₦1,500 OFF first order exceeding 15 pieces",
      active: true,
      conversions: 48,
      revenueGenerated: 284000,
      targetAudience: "New Ikorodu households and corporate workers",
    },
    {
      id: "camp-2",
      name: "LASUSTECH Student Semester Laundry Pass",
      code: "STUDENTPASS",
      channel: "Social Media (TikTok / Instagram) & Campus Flyers",
      benefit: "₦3,500 weekly bundle / ₦12,000 monthly 4-pickup pass",
      active: true,
      conversions: 62,
      revenueGenerated: 345000,
      targetAudience: "Students living within 1km Firstgate perimeter",
    },
    {
      id: "camp-3",
      name: "10th Wash FREE Loyalty Reward",
      code: "LOYALTY10",
      channel: "Automated WhatsApp Post-Delivery Tracker",
      benefit: "100% Free 8-piece wash upon completing 9 paid orders",
      active: true,
      conversions: 29,
      revenueGenerated: 198000,
      targetAudience: "Returning customers in Agric, Benson, and Garage",
    },
    {
      id: "camp-4",
      name: "Google 5-Star Review Prompt",
      code: "GOOGLEREVIEW",
      channel: "Google Business Profile + WhatsApp Link",
      benefit: "₦500 voucher on next dry clean for authentic review",
      active: true,
      conversions: 37,
      revenueGenerated: 142000,
      targetAudience: "Customers with delivered orders without issues",
    },
  ]);

  // Calculate accounting totals
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpenses;
  const grossMargin = totalIncome > 0 ? Math.round((netProfit / totalIncome) * 100) : 0;

  // Filter CRM Items
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.tagNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone.includes(searchQuery);
    const matchesChannel =
      selectedChannelFilter === "all" || o.channel === selectedChannelFilter;
    return matchesSearch && matchesChannel;
  });

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.leadCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery);
    const matchesChannel =
      selectedChannelFilter === "all" || l.channel === selectedChannelFilter;
    return matchesSearch && matchesChannel;
  });

  const filteredSupport = supportTickets.filter((s) => {
    const matchesSearch =
      s.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.phone.includes(searchQuery);
    const matchesChannel =
      selectedChannelFilter === "all" || s.channel === selectedChannelFilter;
    return matchesSearch && matchesChannel;
  });

  // Render Channel Icon
  const getChannelBadge = (channel: CustomerChannel) => {
    switch (channel) {
      case "whatsapp":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <MessageSquare className="w-3 h-3" /> WhatsApp
          </span>
        );
      case "website":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
            <Globe className="w-3 h-3" /> Website
          </span>
        );
      case "google_business":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <MapPin className="w-3 h-3" /> Google Profile
          </span>
        );
      case "social":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <Share2 className="w-3 h-3" /> Social Media
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Freshcare Operations Cockpit · Ikorodu, Lagos</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Integrated Business & Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Unified control for AI Omnichannel Ingestion, CRM Pipeline, Financial Ledger, and Real-time Analytics.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveSubTab("flow")}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>View Architecture Tree</span>
          </button>
          <button
            onClick={onOpenCallTab}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 text-xs font-bold shadow-md shadow-teal-500/20 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Test Alex Voice Concierge</span>
          </button>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 overflow-x-auto">
        {[
          { id: "overview", label: "Executive Overview", icon: LayoutDashboard },
          { id: "crm", label: "Database / CRM", icon: Database, badge: orders.length + leads.length },
          { id: "analytics", label: "Analytics Engine", icon: BarChart3 },
          { id: "accounting", label: "Accounting Ledger (₦)", icon: Calculator },
          { id: "marketing", label: "Marketing Campaigns", icon: Megaphone, badge: campaigns.length },
          { id: "flow", label: "Architecture Pipeline", icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/25"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive
                      ? "bg-slate-950 text-teal-400"
                      : "bg-slate-800 text-slate-300 border border-slate-700"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* SUB-TAB 1: EXECUTIVE OVERVIEW */}
      {activeSubTab === "overview" && (
        <div className="space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Today's Revenue */}
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-medium">Total Ledger Revenue</span>
                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <TrendingUp className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                ₦{totalIncome.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                <ArrowUpRight className="w-3 h-3" />
                <span>+24.5% vs last week · POS & Transfers</span>
              </div>
            </div>

            {/* Card 2: Active Orders */}
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-medium">Active Batch Orders</span>
                <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <Package className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {orders.length} <span className="text-sm font-normal text-slate-400">batches</span>
              </div>
              <div className="text-[11px] text-teal-400 flex items-center gap-1">
                <span>Strict Zero-Mix · Firstgate wash facility</span>
              </div>
            </div>

            {/* Card 3: AI Agent Autonomous Rate */}
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-medium">AI Agent Resolution</span>
                <span className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <Bot className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-teal-300">
                94.2%
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <span>Alex triaged 186 conversations this week</span>
              </div>
            </div>

            {/* Card 4: Average Turnaround Time */}
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-medium">Avg Turnaround Time</span>
                <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Clock className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                26.4 <span className="text-sm font-normal text-slate-400">hours</span>
              </div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                <span>Well under standard 48h SOP target</span>
              </div>
            </div>
          </div>

          {/* Quick Flow Architecture Summary Bar */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-950/40 via-slate-900 to-blue-950/40 border border-teal-500/30 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider">
                  Live Architecture Pipeline
                </span>
                <h3 className="text-lg font-bold text-white">
                  Omnichannel Stream: Acquisition → AI Agent → CRM → Operations
                </h3>
              </div>
              <button
                onClick={() => setActiveSubTab("flow")}
                className="text-xs text-teal-300 font-bold hover:text-teal-200 flex items-center gap-1 cursor-pointer"
              >
                <span>Interactive Diagram</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Visual Process Stages */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-teal-400 font-bold">
                  <span>1. Inbound Channels</span>
                  <span className="text-[10px] font-mono text-slate-500">Tier 2/3</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  WhatsApp (58%), Website (27%), Google Profile (10%), Social (5%).
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-teal-400 font-bold">
                  <span>2. AI Customer Agent</span>
                  <span className="text-[10px] font-mono text-slate-500">Alex</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Triages inputs into Orders, Leads, or Support tickets automatically.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-teal-400 font-bold">
                  <span>3. Database / CRM</span>
                  <span className="text-[10px] font-mono text-slate-500">Tier 6</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Sequential tagging (FC-001), 10th-wash free loyalty & customer profiles.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-teal-400 font-bold">
                  <span>4. Operations Hub</span>
                  <span className="text-[10px] font-mono text-slate-500">Tier 7/8</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Analytics attribution, double-entry Naira accounting, marketing engine.
                </p>
              </div>
            </div>
          </div>

          {/* Dual Split: Recent Orders and Financial Snapshot */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Active Orders in Progress */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Package className="w-4 h-4 text-teal-400" />
                  <span>Active Washing & Dispatch Queue</span>
                </h3>
                <button
                  onClick={() => setActiveSubTab("crm")}
                  className="text-xs text-teal-400 hover:text-teal-300 font-semibold cursor-pointer"
                >
                  View All Orders →
                </button>
              </div>

              <div className="space-y-2.5">
                {orders.slice(0, 3).map((ord) => (
                  <div
                    key={ord.id}
                    className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                          {ord.tagNumber}
                        </span>
                        <span className="font-semibold text-white">{ord.customerName}</span>
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        {ord.items.join(", ")} · {ord.totalPieces} pieces
                      </div>
                    </div>

                    <div className="text-right space-y-1 flex-shrink-0">
                      <div className="font-bold text-amber-300">₦{ord.totalNaira.toLocaleString()}</div>
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize bg-sky-500/10 text-sky-300 border border-sky-500/20">
                        {ord.stage.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Quick Accounting & Margin Summary */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  <span>Naira (₦) Operations Ledger</span>
                </h3>
                <button
                  onClick={() => setActiveSubTab("accounting")}
                  className="text-xs text-teal-400 hover:text-teal-300 font-semibold cursor-pointer"
                >
                  Full Accounting Ledger →
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                  <span className="text-slate-400">Total Income:</span>
                  <div className="text-xl font-black text-emerald-400">
                    ₦{totalIncome.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-400">From laundry & subscriptions</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1">
                  <span className="text-slate-400">Operating Expenses:</span>
                  <div className="text-xl font-black text-rose-400">
                    ₦{totalExpenses.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-400">Starch, detergent & fuel</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block">Net Operating Margin:</span>
                  <span className="font-bold text-white">Gross Margin: {grossMargin}%</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-teal-400">
                    ₦{netProfit.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-emerald-400 block font-semibold">
                    Healthy Profitability
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: DATABASE / CRM */}
      {activeSubTab === "crm" && (
        <div className="space-y-6">
          {/* CRM Controls Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search customers, tag (FC-101), phone, or items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-400 placeholder:text-slate-500"
              />
            </div>

            {/* Filter by Category */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {[
                { id: "all", label: "All Streams", count: orders.length + leads.length + supportTickets.length },
                { id: "orders", label: "Orders", count: orders.length },
                { id: "leads", label: "Leads", count: leads.length },
                { id: "support", label: "Support", count: supportTickets.length },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setCrmTypeFilter(f.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap transition-all ${
                    crmTypeFilter === f.id
                      ? "bg-teal-500 text-slate-950 font-bold"
                      : "bg-slate-950 text-slate-300 hover:text-white border border-slate-800"
                  }`}
                >
                  {f.label} ({f.count})
                </button>
              ))}
            </div>

            {/* Filter by Channel */}
            <select
              value={selectedChannelFilter}
              onChange={(e) => setSelectedChannelFilter(e.target.value)}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-teal-400"
            >
              <option value="all">All Inbound Channels</option>
              <option value="whatsapp">WhatsApp Business</option>
              <option value="website">Website Portal</option>
              <option value="google_business">Google Profile</option>
              <option value="social">Social Media</option>
            </select>
          </div>

          {/* CRM Stream 1: ORDERS */}
          {(crmTypeFilter === "all" || crmTypeFilter === "orders") && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-white">
                    Orders Stream ({filteredOrders.length})
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  Sequential Freshcare Tag Series
                </span>
              </div>

              <div className="space-y-3">
                {filteredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-teal-500/40 transition-colors space-y-3 text-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-black text-sm text-teal-300 bg-teal-500/10 px-2.5 py-1 rounded-lg border border-teal-500/30">
                          {ord.tagNumber}
                        </span>
                        <div>
                          <div className="font-bold text-white text-sm">{ord.customerName}</div>
                          <div className="text-slate-400 flex items-center gap-2 text-[11px]">
                            <span>{ord.customerPhone}</span>
                            <span>·</span>
                            <span>{ord.deliveryArea}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {getChannelBadge(ord.channel)}
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/30">
                          {ord.stage.replace("_", " ")}
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-slate-300 text-[11px]">
                      <div>
                        <span className="text-slate-500">Items: </span>
                        <span>{ord.items.join(" · ")}</span>
                        <span className="font-semibold text-teal-300 ml-1.5">
                          ({ord.totalPieces} pieces)
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span>
                          ETA: <strong className="text-white">{ord.eta}</strong>
                        </span>
                        <span className="text-emerald-400 font-black text-sm">
                          ₦{ord.totalNaira.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CRM Stream 2: LEADS PIPELINE */}
          {(crmTypeFilter === "all" || crmTypeFilter === "leads") && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">
                    Leads Pipeline ({filteredLeads.length})
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  Corporate, Campus & Bulk Inquiries
                </span>
              </div>

              <div className="space-y-3">
                {filteredLeads.map((ld) => (
                  <div
                    key={ld.id}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-3 text-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                          {ld.leadCode}
                        </span>
                        <div>
                          <div className="font-bold text-white text-sm">{ld.name}</div>
                          <div className="text-slate-400 text-[11px]">{ld.phone}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {getChannelBadge(ld.channel)}
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30">
                          {ld.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-300 bg-slate-900/70 p-2.5 rounded-xl border border-slate-800 text-[11px] leading-relaxed">
                      {ld.interest} · Estimated {ld.estimatedPieces} pcs · Value:{" "}
                      <strong className="text-amber-300">
                        ₦{ld.estimatedValue.toLocaleString()}
                      </strong>
                    </p>

                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Notes: {ld.notes}</span>
                      <span className="font-mono text-[10px] text-slate-500">{ld.createdAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CRM Stream 3: SUPPORT & CARE */}
          {(crmTypeFilter === "all" || crmTypeFilter === "support") && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <LifeBuoy className="w-5 h-5 text-rose-400" />
                  <h3 className="text-base font-bold text-white">
                    Support & Care Stream ({filteredSupport.length})
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  SOP Quality & Guarantee Logs
                </span>
              </div>

              <div className="space-y-3">
                {filteredSupport.map((sup) => (
                  <div
                    key={sup.id}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                          {sup.ticketId}
                        </span>
                        <span className="font-bold text-white">{sup.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getChannelBadge(sup.channel)}
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            sup.status === "resolved"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {sup.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-300 text-[11px] leading-relaxed">{sup.details}</p>

                    <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-teal-300 flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                      <span>Resolution: {sup.resolution}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 3: ANALYTICS ENGINE */}
      {activeSubTab === "analytics" && (
        <div className="space-y-6">
          {/* Channel Attribution Breakdown */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider">
                  Attribution Matrix
                </span>
                <h3 className="text-lg font-bold text-white">
                  Customer Channel Volume & Conversion Rate
                </h3>
              </div>
              <span className="text-xs text-slate-400">Past 30 Days · 420 Total Inbound Requests</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4" /> WhatsApp
                  </span>
                  <span className="font-mono text-emerald-300 font-bold">58% Share</span>
                </div>
                <div className="text-2xl font-black text-white">244 Leads</div>
                <p className="text-[11px] text-slate-400">
                  #1 Channel in Nigeria · Highest conversion rate (68.4%)
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-sky-950/20 border border-sky-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sky-400 flex items-center gap-1.5">
                    <Globe className="w-4 h-4" /> Website
                  </span>
                  <span className="font-mono text-sky-300 font-bold">27% Share</span>
                </div>
                <div className="text-2xl font-black text-white">113 Orders</div>
                <p className="text-[11px] text-slate-400">
                  Pricing calculator & voice concierge bookings
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> Google Profile
                  </span>
                  <span className="font-mono text-amber-300 font-bold">10% Share</span>
                </div>
                <div className="text-2xl font-black text-white">42 Calls</div>
                <p className="text-[11px] text-slate-400">
                  LASUSTECH Firstgate Maps listing & click-to-call
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-400 flex items-center gap-1.5">
                    <Share2 className="w-4 h-4" /> Social Media
                  </span>
                  <span className="font-mono text-purple-300 font-bold">5% Share</span>
                </div>
                <div className="text-2xl font-black text-white">21 DMs</div>
                <p className="text-[11px] text-slate-400">
                  Instagram & TikTok ASMR laundry videos
                </p>
              </div>
            </div>
          </div>

          {/* Garment Demand & Starch Preference */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Garment Category Demand */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 text-xs">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-teal-400" />
                <span>Garment Category Breakdown</span>
              </h3>

              <div className="space-y-3">
                {[
                  { name: "Traditional (Senators, Kaftans, Agbadas)", pct: 42, color: "bg-teal-400" },
                  { name: "Everyday Wear (Shirts, Trousers, Polos)", pct: 31, color: "bg-emerald-400" },
                  { name: "Suits & Special Dry Clean", pct: 15, color: "bg-sky-400" },
                  { name: "Beddings & Linens (Duvet inner, Sheets)", pct: 12, color: "bg-purple-400" },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-slate-300">
                      <span>{item.name}</span>
                      <span className="font-bold font-mono">{item.pct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Starch Preference Breakdown */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 text-xs">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Starch Preference Distribution</span>
              </h3>

              <div className="space-y-3">
                {[
                  { name: "Medium Crisp Starch (Everyday & Office Kaftans)", pct: 54, color: "bg-amber-400" },
                  { name: "Heavy Military Starch (Ceremonial Agbadas & Uniforms)", pct: 28, color: "bg-emerald-400" },
                  { name: "Light Soft Starch (Ladies blouses, Casual shirts)", pct: 14, color: "bg-teal-400" },
                  { name: "Zero Starch (Silks, Chiffons, Delicate wool)", pct: 4, color: "bg-slate-500" },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-slate-300">
                      <span>{item.name}</span>
                      <span className="font-bold font-mono">{item.pct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: ACCOUNTING & FINANCE */}
      {activeSubTab === "accounting" && (
        <div className="space-y-6">
          {/* Financial Summary Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <span className="text-xs text-slate-400 font-medium">Gross Cash Inflow</span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                ₦{totalIncome.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-400">Recorded orders & student passes</span>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <span className="text-xs text-slate-400 font-medium">Operating Outflow (COGS)</span>
              <div className="text-2xl sm:text-3xl font-black text-rose-400">
                ₦{totalExpenses.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-400">Detergent, Starch, Generator fuel</span>
            </div>

            <div className="p-5 rounded-3xl bg-teal-950/30 border border-teal-500/30 space-y-1.5">
              <span className="text-xs text-teal-300 font-medium">Net Operating Profit</span>
              <div className="text-2xl sm:text-3xl font-black text-teal-300">
                ₦{netProfit.toLocaleString()}
              </div>
              <span className="text-[11px] text-teal-400">Profit Margin: {grossMargin}%</span>
            </div>
          </div>

          {/* Double-entry Ledger Table */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">
                  Real-time Double Entry Ledger (Naira ₦)
                </h3>
                <p className="text-xs text-slate-400">
                  Audited against Moniepoint POS, OPay transfers, and walk-in cash drawer
                </p>
              </div>
              <span className="text-xs font-mono text-teal-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                Zero Credit SOP Enforced
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3">Reference</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Method</th>
                    <th className="p-3">Date</th>
                    <th className="p-3 text-right">Amount (₦)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-950/40 transition-colors">
                      <td className="p-3 font-mono text-slate-400">{tx.reference}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-200">
                          {tx.category}
                        </span>
                      </td>
                      <td className="p-3 font-medium text-white">{tx.description}</td>
                      <td className="p-3 text-slate-400">{tx.paymentMethod}</td>
                      <td className="p-3 text-slate-400">{tx.date}</td>
                      <td className="p-3 text-right font-mono font-bold">
                        <span
                          className={
                            tx.type === "income" ? "text-emerald-400" : "text-rose-400"
                          }
                        >
                          {tx.type === "income" ? "+" : "-"}₦{tx.amount.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: MARKETING CAMPAIGNS */}
      {activeSubTab === "marketing" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Active Marketing Campaigns</h3>
              <p className="text-xs text-slate-400">
                Automated promotional campaigns driving customer acquisition & retention
              </p>
            </div>
            <span className="text-xs font-mono text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/30">
              4 Live Campaigns
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campaigns.map((camp) => (
              <div
                key={camp.id}
                className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-emerald-400 font-bold font-mono text-[10px] uppercase tracking-wide">
                      {camp.code}
                    </span>
                    <h4 className="text-base font-bold text-white">{camp.name}</h4>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Active
                  </span>
                </div>

                <p className="text-slate-300 leading-relaxed">{camp.benefit}</p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px]">
                  <div>
                    <span className="text-slate-500 block">Conversions:</span>
                    <strong className="text-white font-mono text-sm">{camp.conversions}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Revenue Generated:</span>
                    <strong className="text-teal-400 font-mono text-sm">
                      ₦{camp.revenueGenerated.toLocaleString()}
                    </strong>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 bg-slate-950 p-2 rounded-xl border border-slate-850">
                  Target: {camp.targetAudience}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 6: FULL BUSINESS ARCHITECTURE TREE */}
      {activeSubTab === "flow" && (
        <BusinessFlowArchitecture
          onNavigateToDashboard={() => setActiveSubTab("overview")}
          onNavigateToCall={onOpenCallTab}
          onNavigateToPricing={onOpenPricingTab}
          onNavigateToTracker={onOpenTrackerTab}
        />
      )}
    </div>
  );
};
