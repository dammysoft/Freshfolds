import React, { useState } from "react";
import {
  Wrench,
  Bot,
  Database,
  Search,
  Sparkles,
  Calculator,
  ShoppingCart,
  Clock,
  CheckCircle2,
  Calendar,
  Send,
  UserCheck,
  Building2,
  Heart,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
  ArrowDown,
  Layers,
  Code,
  Zap,
  Play,
  Copy,
  Check,
  RefreshCw,
  Terminal,
  FileText
} from "lucide-react";
import {
  AgentToolName,
  ToolExecutionLog,
  RAGDocument,
  RAGSearchResult,
  BrandRepPillar,
  BookingState
} from "../types";
import {
  BRAND_REP_PILLARS,
  FRESHCARE_RAG_DOCUMENTS,
  buildBrandRepresentativeSystemPrompt,
  executeAgentTool,
  searchRAGVectorDatabase
} from "../server/agentEngine";
import { FreshcareLogo } from "./FreshFoldLogo";

interface AgentToolsAndRAGConsoleProps {
  bookingState: BookingState;
  setBookingState: React.Dispatch<React.SetStateAction<BookingState>>;
  onOpenCall?: () => void;
  onOpenWhatsApp?: () => void;
}

export const AgentToolsAndRAGConsole: React.FC<AgentToolsAndRAGConsoleProps> = ({
  bookingState,
  setBookingState,
  onOpenCall,
  onOpenWhatsApp,
}) => {
  const [activeConsoleTab, setActiveConsoleTab] = useState<"tools" | "brand_rep" | "rag">("tools");

  // Tool testing state
  const [selectedTool, setSelectedTool] = useState<AgentToolName>("get_price");
  const [toolArgsState, setToolArgsState] = useState<Record<string, any>>({
    items: [
      { name: "Senator / Native (2-piece)", quantity: 2 },
      { name: "Plain Shirt", quantity: 14 }
    ],
    deliveryArea: "Firstgate / LASUSTECH",
    isFirstOrder: true,
    isExpress: false
  });
  const [executionLogs, setExecutionLogs] = useState<ToolExecutionLog[]>([]);
  const [latestResult, setLatestResult] = useState<any>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  // RAG Search State
  const [ragQuery, setRagQuery] = useState<string>("What is the policy for ₦1,500 discount and delicate silks?");
  const [ragSearchResults, setRagSearchResults] = useState<RAGSearchResult[]>([]);
  const [isSearchingRag, setIsSearchingRag] = useState<boolean>(false);
  const [selectedRagDoc, setSelectedRagDoc] = useState<RAGDocument>(FRESHCARE_RAG_DOCUMENTS[1]);

  // Brand Rep Pillar Selection
  const [selectedPillar, setSelectedPillar] = useState<BrandRepPillar>("brand_personality");

  // Pre-fill inputs for each of the 7 tools
  const handleSelectTool = (tool: AgentToolName) => {
    setSelectedTool(tool);
    setLatestResult(null);

    switch (tool) {
      case "get_price":
        setToolArgsState({
          items: [
            { name: "Senator / Native (2-piece)", quantity: 2 },
            { name: "Plain Shirt", quantity: 14 }
          ],
          deliveryArea: "Firstgate / LASUSTECH",
          isFirstOrder: true,
          isExpress: false
        });
        break;
      case "create_order":
        setToolArgsState({
          customerName: "Engr. Babatunde Lawal",
          customerPhone: "0803 456 7890",
          items: ["2x Senator Native", "1x Agbada Heavy", "3x Plain Shirts"],
          totalPieces: 8,
          deliveryArea: "Firstgate / LASUSTECH",
          customerAddress: "Flat 4, Staff Quarters, LASUSTECH Main Gate, Ikorodu",
          starchPreference: "medium",
          preferredDate: "Tomorrow",
          preferredWindow: "8:00 AM – 11:00 AM"
        });
        break;
      case "check_order":
        setToolArgsState({
          orderIdOrTagOrPhone: "FC-001"
        });
        break;
      case "schedule_pickup":
        setToolArgsState({
          customerName: "Blessing Adebayo",
          customerPhone: "0814 123 4567",
          deliveryArea: "Agric",
          customerAddress: "No. 14, Olumo Street, Near Agric Bus Stop, Ikorodu",
          preferredDate: "Tomorrow",
          preferredWindow: "8:00 AM – 11:00 AM"
        });
        break;
      case "check_pickup_availability":
        setToolArgsState({
          date: "Tomorrow",
          deliveryArea: "Firstgate / LASUSTECH"
        });
        break;
      case "send_confirmation":
        setToolArgsState({
          bookingReference: "FC-IKD-201",
          customerPhone: "0803 456 7890",
          tagNumber: "FC-001",
          channel: "whatsapp"
        });
        break;
      case "transfer_to_human":
        setToolArgsState({
          customerName: "Dr. Adekunle Johnson",
          customerPhone: "0802 999 1122",
          reason: "Requesting custom weekly laundry contract for 45 LASUSTECH academic staff",
          urgency: "high_value_quote",
          conversationSummary: "Client interested in monthly retainer for academic staff robes and Senators."
        });
        break;
    }
  };

  // Run the selected tool
  const handleExecuteTool = async () => {
    setIsExecuting(true);
    const start = Date.now();

    try {
      const response = await fetch("/api/tools/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: selectedTool, args: toolArgsState })
      });

      if (response.ok) {
        const data = await response.json();
        setLatestResult(data.result);

        const newLog: ToolExecutionLog = {
          id: `log-${Date.now()}`,
          tool: selectedTool,
          input: toolArgsState,
          output: data.result,
          status: "success",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          executionMs: data.latencyMs || Date.now() - start
        };
        setExecutionLogs((prev) => [newLog, ...prev.slice(0, 9)]);

        // If create_order was run, update the global booking state
        if (selectedTool === "create_order" && data.result.tagNumber) {
          setBookingState((prev) => ({
            ...prev,
            tagNumber: data.result.tagNumber,
            bookingReference: data.result.bookingReference,
            bookingStatus: "confirmed",
            orderStage: "picked_up"
          }));
        }
      } else {
        // Client-side fallback
        const { result, latencyMs } = executeAgentTool(selectedTool, toolArgsState);
        setLatestResult(result);

        const newLog: ToolExecutionLog = {
          id: `log-${Date.now()}`,
          tool: selectedTool,
          input: toolArgsState,
          output: result,
          status: "success",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          executionMs: latencyMs
        };
        setExecutionLogs((prev) => [newLog, ...prev.slice(0, 9)]);
      }
    } catch {
      // Local fallback
      const { result, latencyMs } = executeAgentTool(selectedTool, toolArgsState);
      setLatestResult(result);
    } finally {
      setIsExecuting(false);
    }
  };

  // Run RAG Semantic Search
  const handleRunRAGSearch = async (queryText?: string) => {
    const q = queryText || ragQuery;
    if (!q.trim()) return;

    setIsSearchingRag(true);
    try {
      const response = await fetch("/api/rag/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, limit: 3 })
      });

      if (response.ok) {
        const data = await response.json();
        setRagSearchResults(data.results || []);
      } else {
        const localMatches = await searchRAGVectorDatabase(q, 3);
        setRagSearchResults(localMatches);
      }
    } catch {
      const localMatches = await searchRAGVectorDatabase(q, 3);
      setRagSearchResults(localMatches);
    } finally {
      setIsSearchingRag(false);
    }
  };

  // Tool Definitions metadata
  const TOOL_METADATA: Record<
    AgentToolName,
    { title: string; desc: string; icon: any; category: string }
  > = {
    get_price: {
      title: "get_price",
      desc: "Computes exact Naira (₦) pricing, delivery fee, express surcharges & verifies >15 pieces for ₦1,500 welcome credit.",
      icon: Calculator,
      category: "Pricing & Finance"
    },
    create_order: {
      title: "create_order",
      desc: "Registers new order in operations database, reserves zero-mix wash cycle & generates sequential FC-series tag.",
      icon: ShoppingCart,
      category: "Orders & Intake"
    },
    check_order: {
      title: "check_order",
      desc: "Queries real-time garment lifecycle tracking: Picked Up, In Washing, Quality Check, Out for Delivery, Delivered.",
      icon: Clock,
      category: "Tracking & Support"
    },
    schedule_pickup: {
      title: "schedule_pickup",
      desc: "Reserves doorstep pickup window on Ikorodu route and assigns dispatch rider slot.",
      icon: Calendar,
      category: "Dispatch & Logistics"
    },
    check_pickup_availability: {
      title: "check_pickup_availability",
      desc: "Validates operating hours, active driver zones, and available pickup windows for any Ikorodu area.",
      icon: CheckCircle2,
      category: "Dispatch & Logistics"
    },
    send_confirmation: {
      title: "send_confirmation",
      desc: "Dispatches WhatsApp booking voucher, digital receipt, and live tracking web link to the customer.",
      icon: Send,
      category: "Notifications"
    },
    transfer_to_human: {
      title: "transfer_to_human",
      desc: "Escalates complex requests, complaints, or bulk institutional quotes directly to Dammy / Operations Lead.",
      icon: UserCheck,
      category: "Escalations"
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-teal-950/40 to-slate-900 border border-teal-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Autonomous Agent Capabilities & Knowledge Core</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              AI Tools, Brand Representative & RAG Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Inspect the 7 operational tools callable by Alex, explore how 5 pillars synthesize our AI Brand Representative, and query the semantic RAG vector database.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onOpenCall && (
              <button
                onClick={onOpenCall}
                className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Speak with Alex</span>
              </button>
            )}
            {onOpenWhatsApp && (
              <button
                onClick={onOpenWhatsApp}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Test WhatsApp Flow</span>
              </button>
            )}
          </div>
        </div>

        {/* 3 Main Console Navigation Tabs */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveConsoleTab("tools")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeConsoleTab === "tools"
                ? "bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/25 scale-[1.02]"
                : "bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>1. The 7 Agent Tools</span>
            <span className="text-[10px] bg-slate-900/50 px-1.5 py-0.5 rounded font-mono">
              7 Active Functions
            </span>
          </button>

          <button
            onClick={() => setActiveConsoleTab("brand_rep")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeConsoleTab === "brand_rep"
                ? "bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/25 scale-[1.02]"
                : "bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>2. AI Brand Representative</span>
            <span className="text-[10px] bg-slate-900/50 px-1.5 py-0.5 rounded font-mono">
              5-Pillar Architecture
            </span>
          </button>

          <button
            onClick={() => setActiveConsoleTab("rag")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeConsoleTab === "rag"
                ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 scale-[1.02]"
                : "bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
            }`}
          >
            <Database className="w-4 h-4" />
            <span>3. RAG Pipeline & Vector DB</span>
            <span className="text-[10px] bg-slate-900/50 px-1.5 py-0.5 rounded font-mono">
              Docs → Embeddings → RAG
            </span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* SECTION 1: THE 7 AGENT TOOLS INTERACTIVE LAB                         */}
      {/* ==================================================================== */}
      {activeConsoleTab === "tools" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Tool Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {(Object.keys(TOOL_METADATA) as AgentToolName[]).map((toolKey) => {
              const meta = TOOL_METADATA[toolKey];
              const Icon = meta.icon;
              const isSelected = selectedTool === toolKey;
              return (
                <button
                  key={toolKey}
                  onClick={() => handleSelectTool(toolKey)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-teal-500 text-slate-950 border-teal-300 shadow-lg shadow-teal-500/20 scale-[1.03] font-bold"
                      : "bg-slate-900/70 hover:bg-slate-800 text-slate-300 border-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-4 h-4 ${isSelected ? "text-slate-950" : "text-teal-400"}`} />
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                        isSelected ? "bg-slate-950 text-teal-300" : "bg-slate-950 text-slate-400"
                      }`}
                    >
                      Active
                    </span>
                  </div>
                  <div>
                    <div className="font-mono text-xs truncate">{meta.title}</div>
                    <div
                      className={`text-[10px] truncate ${
                        isSelected ? "text-slate-800" : "text-slate-400"
                      }`}
                    >
                      {meta.category}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Tool Playground */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Input Config & Execution */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-teal-400" />
                    <h3 className="font-mono font-bold text-white text-base">
                      {TOOL_METADATA[selectedTool].title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {TOOL_METADATA[selectedTool].desc}
                  </p>
                </div>
                <span className="text-[11px] font-mono text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
                  Tool Schema
                </span>
              </div>

              {/* Arguments Form */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  JSON Arguments (Interactive Payload):
                </span>
                <textarea
                  rows={8}
                  value={JSON.stringify(toolArgsState, null, 2)}
                  onChange={(e) => {
                    try {
                      setToolArgsState(JSON.parse(e.target.value));
                    } catch {
                      // allow free typing
                    }
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs font-mono text-teal-300 focus:outline-none focus:border-teal-500 resize-none shadow-inner"
                />

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSelectTool(selectedTool)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer transition-colors"
                    >
                      Reset Payload
                    </button>
                    {selectedTool === "get_price" && (
                      <button
                        onClick={() =>
                          setToolArgsState({
                            items: [
                              { name: "Senator / Native (2-piece)", quantity: 2 },
                              { name: "Plain Shirt", quantity: 15 } // 17 pieces = triggers ₦1,500 discount
                            ],
                            deliveryArea: "Firstgate / LASUSTECH",
                            isFirstOrder: true
                          })
                        }
                        className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-medium cursor-pointer"
                      >
                        Pre-fill &gt;15 Pcs (₦1,500 Promo)
                      </button>
                    )}
                  </div>

                  <button
                    onClick={handleExecuteTool}
                    disabled={isExecuting}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-teal-500/20 active:scale-95 transition-all"
                  >
                    {isExecuting ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Executing Tool...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Execute {selectedTool}()</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Return Payload & Live Card */}
            <div className="space-y-4">
              <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-bold text-white text-base">Execution Result</h3>
                  </div>
                  {latestResult && (
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                      HTTP 200 · Success
                    </span>
                  )}
                </div>

                {latestResult ? (
                  <div className="space-y-3">
                    {/* Visual Card if get_price */}
                    {selectedTool === "get_price" && latestResult.finalTotalNaira !== undefined && (
                      <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 space-y-2 text-xs">
                        <div className="flex items-center justify-between text-slate-300">
                          <span>Clothing Pieces:</span>
                          <span className="font-mono font-bold text-white">
                            {latestResult.totalPieces} pieces
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-slate-300">
                          <span>Delivery Fee:</span>
                          <span className="font-mono text-emerald-400 font-bold">
                            {latestResult.deliveryFeeNaira === 0
                              ? "FREE (1km LASUSTECH)"
                              : `₦${latestResult.deliveryFeeNaira}`}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-amber-300 font-semibold">
                          <span>Welcome Discount:</span>
                          <span className="font-mono">
                            {latestResult.isDiscountEligible
                              ? "-₦1,500 Applied 🎉"
                              : `₦0 (Need ${latestResult.piecesNeededForDiscount} more pieces)`}
                          </span>
                        </div>
                        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-base font-bold text-white">
                          <span>Final Total Due:</span>
                          <span className="font-mono text-emerald-400 text-lg">
                            ₦{latestResult.finalTotalNaira.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Visual Card if create_order */}
                    {selectedTool === "create_order" && latestResult.tagNumber && (
                      <div className="p-4 rounded-2xl bg-slate-950/80 border border-teal-500/30 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Assigned Tag:</span>
                          <span className="font-mono font-bold text-amber-300 text-sm">
                            {latestResult.tagNumber}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Booking Ref:</span>
                          <span className="font-mono font-bold text-emerald-400">
                            {latestResult.bookingReference}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Rider Assigned:</span>
                          <span className="text-white font-medium">
                            {latestResult.dispatchRiderAssigned}
                          </span>
                        </div>
                        <p className="text-[11px] text-teal-300 pt-1 border-t border-slate-800/80">
                          {latestResult.message}
                        </p>
                      </div>
                    )}

                    {/* Raw JSON Return */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono text-slate-400 block">
                        Full Structured Return Payload:
                      </span>
                      <pre className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-[11px] font-mono text-emerald-300 max-h-56 overflow-y-auto">
                        {JSON.stringify(latestResult, null, 2)}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl space-y-2">
                    <Wrench className="w-8 h-8 text-slate-600 mx-auto" />
                    <div>Click "Execute {selectedTool}()" above to test tool calling in real time.</div>
                  </div>
                )}
              </div>

              {/* Execution History */}
              {executionLogs.length > 0 && (
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                    <span>Recent Tool Execution Logs</span>
                    <span className="text-[10px] font-mono">{executionLogs.length} runs</span>
                  </div>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto text-[11px] font-mono">
                    {executionLogs.map((log) => (
                      <div
                        key={log.id}
                        className="p-2 rounded-xl bg-slate-950/70 border border-slate-850 flex items-center justify-between text-slate-300"
                      >
                        <span className="text-teal-400 font-bold">{log.tool}()</span>
                        <span className="text-slate-400">{log.executionMs}ms</span>
                        <span className="text-slate-500 text-[10px]">{log.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION 2: AI BRAND REPRESENTATIVE 5-PILLAR ARCHITECTURE             */}
      {/* ==================================================================== */}
      {activeConsoleTab === "brand_rep" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Architectural Synthesis Tree */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  Persona Composition Framework
                </span>
                <h3 className="text-xl font-bold text-white">
                  How 5 Knowledge Pillars Synthesize Alex
                </h3>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(buildBrandRepresentativeSystemPrompt());
                  setCopiedPrompt(true);
                  setTimeout(() => setCopiedPrompt(false), 2000);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPrompt ? "Copied System Prompt!" : "Copy Full Persona Prompt"}</span>
              </button>
            </div>

            {/* 5 Inbound Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
              {BRAND_REP_PILLARS.map((pillar) => {
                const isSelected = selectedPillar === pillar.id;
                return (
                  <button
                    key={pillar.id}
                    onClick={() => setSelectedPillar(pillar.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-teal-500/20 border-teal-400 text-white shadow-lg shadow-teal-500/15 scale-[1.02]"
                        : "bg-slate-950/80 hover:bg-slate-900 border-slate-800 text-slate-300"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {pillar.id === "brand_personality" && <Heart className="w-4 h-4 text-pink-400" />}
                        {pillar.id === "company_knowledge" && <Building2 className="w-4 h-4 text-sky-400" />}
                        {pillar.id === "products_services" && <ShoppingCart className="w-4 h-4 text-emerald-400" />}
                        {pillar.id === "faqs" && <HelpCircle className="w-4 h-4 text-amber-400" />}
                        {pillar.id === "customer_policies" && <ShieldCheck className="w-4 h-4 text-purple-400" />}
                        <span className="text-xs font-black uppercase tracking-wider">{pillar.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                        {pillar.tagline}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-teal-400 font-mono">
                      Click to inspect rules →
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Connecting Convergence */}
            <div className="flex flex-col items-center">
              <div className="w-full max-w-2xl border-b-2 border-slate-700" />
              <div className="w-0.5 h-6 bg-gradient-to-b from-slate-700 to-teal-500" />
              <div className="text-[10px] text-teal-400 font-mono uppercase bg-slate-950 px-3 py-1 rounded-full border border-teal-500/30">
                Persona Synthesis & Prompt Injection
              </div>
            </div>

            {/* Synthesized Core: AI Brand Representative */}
            <div className="flex flex-col items-center">
              <div className="w-full max-w-xl p-5 rounded-3xl bg-gradient-to-r from-teal-950 via-slate-950 to-emerald-950 border border-teal-400 text-white shadow-2xl text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-teal-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-teal-500/30">
                  <Bot className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-black tracking-tight">
                  Alex — AI Brand Representative
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Trained on authentic Nigerian hospitality, Freshcare fixed pricing in ₦, zero-mix washing guarantees, and Ikorodu geography. Backed by real tool calling.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30">
                    Voice Concierge (Kore)
                  </span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    WhatsApp AI Agent
                  </span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    7 Autonomous Tools
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Deep Dive into Selected Pillar */}
          {(() => {
            const currentPillar = BRAND_REP_PILLARS.find((p) => p.id === selectedPillar)!;
            return (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase text-teal-400 font-bold">
                      Selected Pillar Details
                    </span>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <span>{currentPillar.title}</span>
                    </h3>
                    <p className="text-xs text-slate-400">{currentPillar.tagline}</p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                      Core Directives Enforced:
                    </span>
                    <div className="space-y-2">
                      {currentPillar.keyDirectives.map((dir, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-950/80 border border-slate-850 text-xs text-slate-200 flex items-start gap-2.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                          <span>{dir}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase text-teal-400 font-bold">
                      Role in Persona Assembly
                    </span>
                    <h3 className="text-base font-bold text-white">
                      Contribution to Alex
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                      {currentPillar.contributionToPersona}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                      System Prompt Directive Snippet:
                    </span>
                    <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-teal-300 whitespace-pre-wrap leading-relaxed">
                      {currentPillar.samplePromptSnippet}
                    </pre>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION 3: RAG PIPELINE & VECTOR DATABASE                            */}
      {/* ==================================================================== */}
      {activeConsoleTab === "rag" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Visual RAG Pipeline Representation */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Information Retrieval Architecture
              </span>
              <h3 className="text-xl font-bold text-white">
                Freshcare RAG (Retrieval-Augmented Generation) Pipeline
              </h3>
            </div>

            {/* 5-Step Pipeline Chain */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
              {[
                {
                  step: 1,
                  title: "Documents",
                  sub: "6 Structured SOP & Policy Docs",
                  icon: FileText,
                  badge: "Knowledge",
                },
                {
                  step: 2,
                  title: "Embeddings",
                  sub: "gemini-embedding-2-preview",
                  icon: Code,
                  badge: "128 / 768-Dim",
                },
                {
                  step: 3,
                  title: "Vector Database",
                  sub: "Cosine Similarity Index",
                  icon: Database,
                  badge: "In-Memory Store",
                },
                {
                  step: 4,
                  title: "RAG Retrieval",
                  sub: "Top-K Chunks Grounding",
                  icon: Search,
                  badge: "Semantic Rank",
                },
                {
                  step: 5,
                  title: "AI Agent (Alex)",
                  sub: "Zero-Hallucination Answers",
                  icon: Bot,
                  badge: "Grounded Output",
                },
              ].map((item, idx, arr) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-xs">
                        {item.step}
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                        {item.badge}
                      </span>
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{item.title}</div>
                      <p className="text-[11px] text-slate-400">{item.sub}</p>
                    </div>

                    {idx < arr.length - 1 && (
                      <div className="hidden sm:block absolute -right-2 top-1/2 -mt-2 z-10">
                        <ArrowRight className="w-4 h-4 text-emerald-400" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive RAG Semantic Search Engine */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Search Input & Results */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold">
                  Vector Database Query Lab
                </span>
                <h3 className="text-lg font-bold text-white">Semantic Search Engine</h3>
                <p className="text-xs text-slate-400">
                  Type any laundry inquiry below to observe real-time vector search across Freshcare's documents.
                </p>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    value={ragQuery}
                    onChange={(e) => setRagQuery(e.target.value)}
                    placeholder="Search Freshcare Knowledge Base..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 pl-10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-medium"
                    onKeyDown={(e) => e.key === "Enter" && handleRunRAGSearch()}
                  />
                  <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3.5" />
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    "₦1,500 welcome discount rule",
                    "Agbada starch levels",
                    "Section 12 customer damage liability",
                    "LASUSTECH student bundle delivery"
                  ].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => {
                        setRagQuery(preset);
                        handleRunRAGSearch(preset);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-emerald-300 text-[11px] border border-slate-800 cursor-pointer transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleRunRAGSearch()}
                    disabled={isSearchingRag}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
                  >
                    {isSearchingRag ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Search className="w-3.5 h-3.5" />
                    )}
                    <span>Perform Vector Search</span>
                  </button>
                </div>
              </div>

              {/* Ranked Matches Output */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Top Ranked Document Chunks (Similarity Score):
                </span>

                {ragSearchResults.length > 0 ? (
                  <div className="space-y-2.5">
                    {ragSearchResults.map((match, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-white truncate max-w-xs">
                            {match.document.title}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[10px] border border-emerald-500/30 font-bold">
                            {(match.similarityScore * 100).toFixed(1)}% Match
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-2.5 rounded-xl border border-slate-850 font-mono text-[11px]">
                          {match.matchedSnippets[0] || match.document.content.slice(0, 160)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl">
                    Run a search query to view semantic chunk ranking.
                  </div>
                )}
              </div>
            </div>

            {/* Document Knowledge Base Explorer */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold">
                  Indexed Document Repository
                </span>
                <h3 className="text-lg font-bold text-white">Freshcare Knowledge Base</h3>
                <p className="text-xs text-slate-400">
                  {FRESHCARE_RAG_DOCUMENTS.length} official documents chunked and vector-embedded for RAG grounding.
                </p>
              </div>

              {/* Doc Selection Pills */}
              <div className="flex flex-wrap gap-1.5">
                {FRESHCARE_RAG_DOCUMENTS.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedRagDoc(doc)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer truncate max-w-xs ${
                      selectedRagDoc.id === doc.id
                        ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                        : "bg-slate-950 text-slate-300 hover:text-white border border-slate-800"
                    }`}
                  >
                    {doc.title.split(" ")[0]} {doc.title.split(" ")[1]}...
                  </button>
                ))}
              </div>

              {/* Selected Document Full Text */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h4 className="text-sm font-bold text-white">{selectedRagDoc.title}</h4>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {selectedRagDoc.category}
                  </span>
                </div>

                <pre className="text-xs text-slate-300 whitespace-pre-wrap font-sans leading-relaxed max-h-72 overflow-y-auto">
                  {selectedRagDoc.content}
                </pre>

                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {selectedRagDoc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800 font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
