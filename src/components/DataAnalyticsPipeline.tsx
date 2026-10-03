import React, { useState, useEffect } from "react";
import {
  Database,
  Filter,
  BarChart3,
  LayoutDashboard,
  BrainCircuit,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Package,
  Clock,
  Sparkles,
  RefreshCw,
  Search,
  Check,
  Tag,
  ShieldCheck,
  Zap,
  Users,
  Calendar,
  Layers,
  FileSpreadsheet,
  AlertTriangle,
  ChevronRight,
  Truck,
  MessageSquare
} from "lucide-react";
import {
  DataPipelineStep,
  RawOrderRecord,
  CleanedOrderRecord,
  DataCleaningAuditStep,
  CleanedAnalyticsSummary,
  AIDataInsight,
  BusinessRecommendation
} from "../types";
import {
  RAW_DIRTY_ORDERS_DATASET,
  runDataCleaningPipeline,
  computeCleanedAnalytics,
  generateAIDataAnalysis,
  generateBusinessRecommendations
} from "../server/contentAndAnalyticsEngine";
import { FreshcareLogo } from "./FreshFoldLogo";

interface DataAnalyticsPipelineProps {
  onOpenPricingTab?: () => void;
  onOpenTrackerTab?: () => void;
  onOpenCallTab?: () => void;
}

export const DataAnalyticsPipeline: React.FC<DataAnalyticsPipelineProps> = ({
  onOpenPricingTab,
  onOpenTrackerTab,
  onOpenCallTab,
}) => {
  const [currentStep, setCurrentStep] = useState<DataPipelineStep>("orders");
  const [rawOrders, setRawOrders] = useState<RawOrderRecord[]>(RAW_DIRTY_ORDERS_DATASET);
  const [cleanedOrders, setCleanedOrders] = useState<CleanedOrderRecord[]>([]);
  const [auditSteps, setAuditSteps] = useState<DataCleaningAuditStep[]>([]);
  const [qualityScore, setQualityScore] = useState<number>(68.2);
  const [isCleaningRunning, setIsCleaningRunning] = useState<boolean>(false);
  const [cleaningCompleted, setCleaningCompleted] = useState<boolean>(false);

  // Analytics state
  const [analytics, setAnalytics] = useState<CleanedAnalyticsSummary | null>(null);

  // AI Analysis state
  const [insights, setInsights] = useState<AIDataInsight[]>([]);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState<boolean>(false);

  // Recommendations state
  const [recommendations, setRecommendations] = useState<BusinessRecommendation[]>([]);
  const [appliedRecIds, setAppliedRecIds] = useState<string[]>([]);
  const [searchFilter, setSearchFilter] = useState<string>("");

  // Initialize pipeline
  useEffect(() => {
    // Run cleaning engine once to initialize data
    const res = runDataCleaningPipeline(RAW_DIRTY_ORDERS_DATASET);
    setCleanedOrders(res.cleanedOrders);
    setAuditSteps(res.auditSteps);
    setQualityScore(res.preCleaningQualityScore);
    const calculatedAnalytics = computeCleanedAnalytics(res.cleanedOrders);
    setAnalytics(calculatedAnalytics);
  }, []);

  const handleRunCleaning = () => {
    setIsCleaningRunning(true);
    setTimeout(() => {
      const res = runDataCleaningPipeline(rawOrders);
      setCleanedOrders(res.cleanedOrders);
      setAuditSteps(res.auditSteps);
      setQualityScore(res.postCleaningQualityScore);
      setIsCleaningRunning(false);
      setCleaningCompleted(true);

      const calculatedAnalytics = computeCleanedAnalytics(res.cleanedOrders);
      setAnalytics(calculatedAnalytics);

      // Trigger AI Analysis
      handleGenerateAIInsights(calculatedAnalytics);
    }, 1200);
  };

  const handleGenerateAIInsights = async (currentAnalytics: CleanedAnalyticsSummary) => {
    setIsGeneratingInsights(true);
    try {
      const res = await fetch("/api/analytics/ai-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analytics: currentAnalytics }),
      });
      const data = await res.json();
      if (data.success && data.insights) {
        setInsights(data.insights);
        const recs = generateBusinessRecommendations(data.insights, currentAnalytics);
        setRecommendations(recs);
      } else {
        const fallbackInsights = await generateAIDataAnalysis(currentAnalytics, null);
        setInsights(fallbackInsights);
        setRecommendations(generateBusinessRecommendations(fallbackInsights, currentAnalytics));
      }
    } catch {
      const fallbackInsights = await generateAIDataAnalysis(currentAnalytics, null);
      setInsights(fallbackInsights);
      setRecommendations(generateBusinessRecommendations(fallbackInsights, currentAnalytics));
    } finally {
      setIsGeneratingInsights(false);
    }
  };

  const handleToggleApplyRec = (recId: string) => {
    if (appliedRecIds.includes(recId)) {
      setAppliedRecIds(appliedRecIds.filter((id) => id !== recId));
    } else {
      setAppliedRecIds([...appliedRecIds, recId]);
    }
  };

  const pipelineSteps: { id: DataPipelineStep; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "orders", label: "Orders", icon: FileSpreadsheet },
    { id: "database", label: "Database", icon: Database },
    { id: "data_cleaning", label: "Data Cleaning", icon: Filter },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "ai_analysis", label: "AI Analysis", icon: BrainCircuit },
    { id: "recommendations", label: "Recommendations", icon: Lightbulb },
  ];

  const currentStepIndex = pipelineSteps.findIndex((s) => s.id === currentStep);

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <BrainCircuit className="w-48 h-48 text-emerald-400" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <BrainCircuit className="w-3 h-3 text-emerald-400" />
                Data Intelligence & Strategic AI Pipeline
              </span>
              <span className="text-xs text-slate-400">Freshcare • Ikorodu, Lagos</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Orders → AI Business Recommendations Engine
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-3xl">
              From raw, heterogeneous incoming customer order streams through schema-enforced database storage,
              automated data deduplication & phone sanitization, statistical metrics, interactive dashboards,
              deep Gemini AI pattern analysis, to high-ROI business recommendations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleRunCleaning}
              disabled={isCleaningRunning}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/40"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCleaningRunning ? "animate-spin" : ""}`} />
              Run Full Data Pipeline
            </button>
          </div>
        </div>

        {/* 7-Stage Interactive Pipeline Stepper */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {pipelineSteps.map((step, idx) => {
              const Icon = step.icon;
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isCurrent
                      ? "bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/25 scale-[1.02]"
                      : isPast
                      ? "bg-slate-800/80 text-teal-300 border-teal-500/30 hover:bg-slate-800"
                      : "bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-850 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold opacity-80">0{idx + 1}</span>
                    {isPast ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Icon className={`w-3.5 h-3.5 ${isCurrent ? "text-white" : "text-slate-400"}`} />
                    )}
                  </div>
                  <div className="text-xs font-bold truncate">{step.label}</div>
                  <div className={`text-[10px] mt-0.5 truncate ${isCurrent ? "text-emerald-100" : "text-slate-500"}`}>
                    {idx === 0
                      ? "Raw Intake"
                      : idx === 1
                      ? "Staging DB"
                      : idx === 2
                      ? "Sanitization"
                      : idx === 3
                      ? "Metric Math"
                      : idx === 4
                      ? "Executive View"
                      : idx === 5
                      ? "Gemini Patterns"
                      : "Strategic ROI"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Workspace per Step */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Step Workspace (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* STEP 1: ORDERS (RAW INGESTION) */}
          {currentStep === "orders" && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Stage 1: Raw Incoming Orders Stream</h2>
                    <p className="text-xs text-slate-400">Heterogeneous intake with real-world issues (duplicate bookings, non-standard phones, missing landmarks)</p>
                  </div>
                </div>

                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {rawOrders.length} Dirty Records
                </span>
              </div>

              {/* Data Quality Warning Card */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <div className="font-bold text-amber-300">Baseline Data Quality Score: 68.2%</div>
                  <p className="text-slate-300 leading-relaxed">
                    Orders arrive via WhatsApp voice notes, web forms, walk-ins, and phone calls. Common noise includes duplicate bookings (e.g. babatunde adeleke double-submitting), phone numbers missing country codes, currency symbols in numerical fields, and unmapped Ikorodu delivery addresses.
                  </p>
                </div>
              </div>

              {/* Raw Orders Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Raw ID</th>
                      <th className="p-3">Customer Name</th>
                      <th className="p-3">Phone (Raw)</th>
                      <th className="p-3">Channel</th>
                      <th className="p-3">Items Raw</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Detected Issues</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {rawOrders.map((o) => (
                      <tr key={o.rawId} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3 text-slate-500">{o.rawId}</td>
                        <td className="p-3 text-white font-sans font-medium">{o.customerNameRaw}</td>
                        <td className="p-3 text-amber-300">{o.phoneRaw}</td>
                        <td className="p-3 text-slate-400 capitalize">{o.channelRaw}</td>
                        <td className="p-3 text-slate-300 max-w-[160px] truncate">{o.itemsRaw}</td>
                        <td className="p-3 text-slate-200">{String(o.nairaAmountRaw)}</td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            {o.rawIssues.map((issue, idx) => (
                              <span
                                key={idx}
                                className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              >
                                {issue}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Navigation button */}
              <div className="flex justify-end pt-4 border-t border-slate-800">
                <button
                  onClick={() => setCurrentStep("database")}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  Proceed to Database Schema
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DATABASE */}
          {currentStep === "database" && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Stage 2: Staging Database Storage</h2>
                    <p className="text-xs text-slate-400">PostgreSQL/Firestore relational staging tables with ACID transactions and schema constraints</p>
                  </div>
                </div>

                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-teal-300 border border-slate-700">
                  table: raw_order_intake
                </span>
              </div>

              {/* Database Schema Visualizer */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-[10px] font-bold uppercase text-teal-400 tracking-wider">Primary Key</div>
                  <div className="text-xs font-mono text-white">order_id: VARCHAR(32)</div>
                  <div className="text-[11px] text-slate-500">Auto-incrementing FC-sequence</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-[10px] font-bold uppercase text-teal-400 tracking-wider">Foreign Keys</div>
                  <div className="text-xs font-mono text-white">customer_phone: VARCHAR(16)</div>
                  <div className="text-[11px] text-slate-500">Linked to customer_loyalty_ledger</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-[10px] font-bold uppercase text-teal-400 tracking-wider">Partition Key</div>
                  <div className="text-xs font-mono text-white">delivery_zone: ENUM</div>
                  <div className="text-[11px] text-slate-500">Ikorodu delivery logistics route</div>
                </div>
              </div>

              {/* Raw Database JSON Preview */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 border-b border-slate-800">
                  <span>POSTGRESQL RECORD DUMP (SNAPSHOT: raw_order_intake)</span>
                  <span className="text-emerald-400">STATUS: READY_FOR_ETL_CLEANING</span>
                </div>
                <pre className="text-[11px] text-emerald-300/90 overflow-x-auto py-2">
{`SELECT 
  o.raw_id, 
  o.customer_name_raw, 
  o.phone_raw, 
  o.naira_amount_raw, 
  c.status AS payment_status
FROM raw_orders_staging o
LEFT JOIN payments_ledger c ON o.raw_id = c.order_ref
WHERE o.created_at >= CURRENT_DATE;
-- 8 rows retrieved in 1.4ms (Indexed by phone_raw)`}
                </pre>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setCurrentStep("orders")}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Raw Orders
                </button>
                <button
                  onClick={() => setCurrentStep("data_cleaning")}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  Proceed to Data Cleaning
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DATA CLEANING */}
          {currentStep === "data_cleaning" && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Filter className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Stage 3: Automated Data Cleaning & Sanitization Engine</h2>
                    <p className="text-xs text-slate-400">Multi-pass transformation pipeline removing duplicates, normalizing phones, and categorizing garments</p>
                  </div>
                </div>

                <button
                  onClick={handleRunCleaning}
                  disabled={isCleaningRunning}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-950/40"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isCleaningRunning ? "animate-spin" : ""}`} />
                  {isCleaningRunning ? "Cleaning Data Pipeline..." : "Execute Cleaning Pass"}
                </button>
              </div>

              {/* Data Quality Jump Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Before Quality</div>
                  <div className="text-2xl font-black text-rose-400 mt-1">68.2%</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">High noise, duplicate records</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 text-center">
                  <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Cleaned Quality</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1">{qualityScore}%</div>
                  <div className="text-[10px] text-emerald-300 mt-0.5">Zero duplicates, 100% normalized</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-[10px] uppercase font-bold text-teal-400 tracking-wider">Duplicates Merged</div>
                  <div className="text-2xl font-black text-teal-400 mt-1">1 Twin Order</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Prevented double wash dispatch</div>
                </div>
              </div>

              {/* 5-Step Cleaning Audit Trail */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Transformation Rules Applied
                </h4>

                <div className="space-y-2">
                  {auditSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="font-bold text-white flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{step.stepName}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {step.recordsAffected} records cleaned
                          </span>
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed">{step.description}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {step.rulesApplied.map((rule, rIdx) => (
                            <span key={rIdx} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                              • {rule}
                            </span>
                          ))}
                        </div>
                      </div>

                      <span className="text-[10px] font-bold text-emerald-400 uppercase">Passed</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cleaned Records Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Sanitized Clean Dataset Ready for Analytics
                </h4>

                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Phone (E.164)</th>
                        <th className="p-3">Channel</th>
                        <th className="p-3">Delivery Area</th>
                        <th className="p-3">Pieces</th>
                        <th className="p-3">Total (₦)</th>
                        <th className="p-3">Quality</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {cleanedOrders.map((o) => (
                        <tr key={o.orderId} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-3 font-mono font-bold text-teal-400">{o.orderId}</td>
                          <td className="p-3 font-semibold text-white">{o.customerName}</td>
                          <td className="p-3 font-mono text-emerald-300">{o.phoneNormalized}</td>
                          <td className="p-3 text-slate-300 capitalize">{o.channel.replace("_", " ")}</td>
                          <td className="p-3 text-slate-400">{o.deliveryArea}</td>
                          <td className="p-3 text-slate-300">{o.totalPieces} pcs</td>
                          <td className="p-3 font-bold text-white">₦{o.totalNaira.toLocaleString()}</td>
                          <td className="p-3">
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                              99.4%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setCurrentStep("database")}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Database
                </button>
                <button
                  onClick={() => setCurrentStep("analytics")}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  Proceed to Analytics
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ANALYTICS */}
          {currentStep === "analytics" && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Stage 4: Statistical Analytics Computation</h2>
                    <p className="text-xs text-slate-400">Aggregated mathematical metrics from 100% verified clean order transactions</p>
                  </div>
                </div>
              </div>

              {analytics && (
                <div className="space-y-6">
                  {/* Top Key Performance Indicators */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Gross Revenue (Cleaned)</div>
                      <div className="text-xl font-black text-emerald-400 mt-1">
                        ₦{analytics.totalGrossRevenue.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-emerald-300/80 mt-1">Across 7 verified batches</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Average Order Value (AOV)</div>
                      <div className="text-xl font-black text-white mt-1">
                        ₦{analytics.averageOrderValue.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-teal-400 mt-1">High-ticket traditional wear</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Avg Pieces Per Order</div>
                      <div className="text-xl font-black text-amber-300 mt-1">
                        {analytics.averagePiecesPerOrder} pcs
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">Student bags hitting 22 pcs</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Repeat Retention Rate</div>
                      <div className="text-xl font-black text-sky-400 mt-1">
                        {analytics.repeatCustomerRate}%
                      </div>
                      <div className="text-[10px] text-sky-300/80 mt-1">Ikorodu residential loyalty</div>
                    </div>
                  </div>

                  {/* Channel Breakdown & Categories */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                        <span>Intake Channel Performance</span>
                        <span className="text-[10px] text-slate-500">By Revenue</span>
                      </h4>
                      <div className="space-y-2">
                        {analytics.topChannels.map((c, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-white font-medium">{c.channel}</span>
                              <span className="font-bold text-emerald-400">₦{c.revenue.toLocaleString()} ({c.sharePercent}%)</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-emerald-500 h-full rounded-full"
                                style={{ width: `${c.sharePercent}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                        <span>Garment & Fabric Revenue Split</span>
                        <span className="text-[10px] text-slate-500">Margin Breakdown</span>
                      </h4>
                      <div className="space-y-2">
                        {analytics.topCategories.map((cat, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-white font-medium">{cat.category}</span>
                              <span className="font-bold text-teal-300">₦{cat.revenue.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-teal-400 h-full rounded-full"
                                style={{ width: `${Math.round((cat.revenue / analytics.totalGrossRevenue) * 100)}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setCurrentStep("data_cleaning")}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Data Cleaning
                </button>
                <button
                  onClick={() => setCurrentStep("dashboard")}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  Proceed to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: DASHBOARD */}
          {currentStep === "dashboard" && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    <LayoutDashboard className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Stage 5: Executive Operations Dashboard</h2>
                    <p className="text-xs text-slate-400">Visual operational command center with route heatmaps and delivery velocity</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">Zone Filter:</span>
                  <select className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200">
                    <option>All Ikorodu Environs</option>
                    <option>Firstgate / LASUSTECH Zone</option>
                    <option>Agric & Benson Corridor</option>
                    <option>Sabo Market Zone</option>
                  </select>
                </div>
              </div>

              {/* Delivery Routes & Transit Velocity Grid */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Ikorodu Route Dispatch Velocity
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {analytics?.deliveryAreaBreakdown.map((zone, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{zone.area}</span>
                        <span className="text-xs font-bold text-emerald-400">₦{zone.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Orders: {zone.orderCount} batches</span>
                        <span className="flex items-center gap-1 text-sky-400">
                          <Clock className="w-3 h-3" /> Avg {zone.avgDeliveryMin} mins delivery
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Peak Order Windows Heatmap */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                  <span>Peak Order Influx Schedule</span>
                  <span className="text-[10px] text-slate-500">Ikorodu Customer Habits</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {analytics?.peakDayHours.map((peak, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                      <div className="text-[10px] font-bold text-teal-400 uppercase">{peak.day}</div>
                      <div className="text-xs font-semibold text-white mt-1">{peak.peakHour}</div>
                      <div className="text-[10px] text-slate-400 mt-1">{peak.count} orders/week</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setCurrentStep("analytics")}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Analytics
                </button>
                <button
                  onClick={() => setCurrentStep("ai_analysis")}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  Proceed to AI Analysis
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: AI ANALYSIS */}
          {currentStep === "ai_analysis" && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Stage 6: Gemini Deep AI Analysis</h2>
                    <p className="text-xs text-slate-400">Algorithmic pattern recognition detecting margin leaks, route bottlenecks, and student campus surges</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (analytics) handleGenerateAIInsights(analytics);
                  }}
                  disabled={isGeneratingInsights}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingInsights ? "animate-spin" : ""}`} />
                  Re-analyze Patterns
                </button>
              </div>

              {isGeneratingInsights ? (
                <div className="p-12 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-purple-400 animate-spin mx-auto" />
                  <p className="text-sm font-semibold text-slate-200">Gemini is parsing order distributions & operational margins...</p>
                  <p className="text-xs text-slate-500">Evaluating Friday Owanbe surges and Firstgate delivery fleet efficiency</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {insights.map((insight) => {
                    const isOpp = insight.severity === "opportunity";
                    const isCrit = insight.severity === "critical";
                    const isTrend = insight.severity === "trend";
                    return (
                      <div
                        key={insight.id}
                        className={`p-4 rounded-xl border transition-all ${
                          isOpp
                            ? "bg-emerald-950/20 border-emerald-500/40"
                            : isCrit
                            ? "bg-rose-950/20 border-rose-500/40"
                            : isTrend
                            ? "bg-sky-950/20 border-sky-500/40"
                            : "bg-amber-950/20 border-amber-500/40"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-bold text-white flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isOpp ? "bg-emerald-400" : isCrit ? "bg-rose-400" : isTrend ? "bg-sky-400" : "bg-amber-400"
                              }`}
                            />
                            {insight.title}
                          </h3>
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                              isOpp
                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                : isCrit
                                ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                                : isTrend
                                ? "bg-sky-500/20 text-sky-300 border-sky-500/30"
                                : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                            }`}
                          >
                            {insight.severity}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 mb-3">{insight.summary}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/60">
                          <div className="text-slate-400">
                            <strong className="text-slate-200">Data Evidence: </strong>
                            {insight.supportingData}
                          </div>
                          <div className="text-emerald-400 font-medium">
                            <strong className="text-slate-200">Potential Upside: </strong>
                            {insight.potentialImpact}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setCurrentStep("dashboard")}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </button>
                <button
                  onClick={() => setCurrentStep("recommendations")}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  Proceed to Business Recommendations
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 7: BUSINESS RECOMMENDATIONS */}
          {currentStep === "recommendations" && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Stage 7: Actionable Business Recommendations</h2>
                    <p className="text-xs text-slate-400">Prioritized strategic growth plays with projected monthly Naira ROI and implementation plans</p>
                  </div>
                </div>

                <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Total Projected Monthly ROI: +₦1,180,000
                </div>
              </div>

              {/* Recommendations Playbooks */}
              <div className="space-y-4">
                {recommendations.map((rec) => {
                  const isApplied = appliedRecIds.includes(rec.id);
                  return (
                    <div
                      key={rec.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        isApplied
                          ? "bg-emerald-950/30 border-emerald-500 shadow-md shadow-emerald-500/10"
                          : "bg-slate-950/80 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center text-xs font-bold">
                            ₦
                          </span>
                          <h3 className="text-sm font-bold text-white">{rec.title}</h3>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase">
                            {rec.category.replace("_", " ")}
                          </span>
                          <span className="text-[11px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                            +₦{rec.estimatedMonthlyGainNaira.toLocaleString()}/mo
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 mb-3">{rec.problemSolved}</p>

                      <div className="space-y-1.5 mb-4">
                        <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                          Action Roadmap:
                        </div>
                        {rec.actionPlan.map((act, aIdx) => (
                          <div key={aIdx} className="text-xs text-slate-300 flex items-start gap-2">
                            <span className="text-teal-400 font-bold">•</span>
                            <span>{act}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                        <span className="text-[11px] text-slate-400">
                          Effort: <strong className="text-slate-300">{rec.effort}</strong>
                        </span>

                        <button
                          onClick={() => handleToggleApplyRec(rec.id)}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            isApplied
                              ? "bg-emerald-500 text-white"
                              : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                          }`}
                        >
                          {isApplied ? (
                            <>
                              <Check className="w-3.5 h-3.5" /> Applied to Freshcare Operations
                            </>
                          ) : (
                            <>
                              <Zap className="w-3.5 h-3.5 text-amber-400" /> Apply Recommendation
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setCurrentStep("ai_analysis")}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to AI Analysis
                </button>
                <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Full Pipeline Operational & Synchronized
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Pipeline State & Quick Actions (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Summary Scorecard */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Pipeline Execution Status
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Data Quality Score:</span>
                <span className="font-bold text-emerald-400">{qualityScore}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Cleaned Orders:</span>
                <span className="font-bold text-white">{cleanedOrders.length} batches</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Gross Clean Revenue:</span>
                <span className="font-bold text-teal-300">
                  ₦{analytics?.totalGrossRevenue.toLocaleString() || "0"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Recommendations Applied:</span>
                <span className="font-bold text-amber-300">
                  {appliedRecIds.length} of {recommendations.length}
                </span>
              </div>
            </div>

            {/* Step Completion Checklist */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Pipeline Stages
              </div>
              {pipelineSteps.map((step, idx) => {
                const isPassed = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`w-full px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                      isCurrent
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold"
                        : isPassed
                        ? "text-teal-400 hover:bg-slate-800/60"
                        : "text-slate-400 hover:bg-slate-800/40"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] opacity-60">0{idx + 1}</span>
                      <span>{step.label}</span>
                    </div>
                    {isPassed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    ) : (
                      <span className="text-[10px] text-slate-600">Pending</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-950/30 to-slate-900 border border-teal-500/30 space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              Connected Operational Views
            </h4>
            <p className="text-xs text-slate-300">
              Recommendations immediately inform pricing tiers and concierge dispatch schedules.
            </p>
            <div className="space-y-2 pt-1">
              {onOpenPricingTab && (
                <button
                  onClick={onOpenPricingTab}
                  className="w-full p-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 flex items-center justify-between cursor-pointer"
                >
                  <span>Open Pricing Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              {onOpenTrackerTab && (
                <button
                  onClick={onOpenTrackerTab}
                  className="w-full p-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 flex items-center justify-between cursor-pointer"
                >
                  <span>Open Live Order Tracker</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              {onOpenCallTab && (
                <button
                  onClick={onOpenCallTab}
                  className="w-full p-2.5 rounded-xl text-xs font-bold bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 flex items-center justify-between cursor-pointer"
                >
                  <span>Consult Alex AI Concierge</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
