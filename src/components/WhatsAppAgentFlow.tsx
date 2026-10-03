import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Bot,
  User,
  Send,
  Database,
  CheckCircle2,
  Cpu,
  BookOpen,
  Wrench,
  Calculator,
  ShoppingCart,
  Calendar,
  Sparkles,
  Phone,
  ShieldCheck,
  Check,
  Clock,
  ArrowRight,
  ArrowDown,
  ChevronRight,
  Zap,
  Tag,
  MapPin,
  RefreshCw,
  Sliders,
  FileText
} from "lucide-react";
import { BookingState } from "../types";
import { FreshcareLogo } from "./FreshFoldLogo";

interface WhatsAppAgentFlowProps {
  bookingState: BookingState;
  setBookingState: React.Dispatch<React.SetStateAction<BookingState>>;
  onOpenOrderFunnel?: () => void;
  onOpenDashboard?: () => void;
}

interface SimulatedChatMessage {
  id: string;
  sender: "customer" | "ai_agent";
  text: string;
  time: string;
  activeNodeHighlight?: string;
  toolsUsed?: string[];
  priceCalculated?: number;
  piecesCounted?: number;
  tagAssigned?: string;
  pickupScheduled?: string;
}

export const WhatsAppAgentFlow: React.FC<WhatsAppAgentFlowProps> = ({
  bookingState,
  setBookingState,
  onOpenOrderFunnel,
  onOpenDashboard,
}) => {
  const [activeNode, setActiveNode] = useState<string>("ai_agent");
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTool, setActiveTool] = useState<"price" | "order" | "pickup" | "all" | null>(null);

  // Chat stream
  const [chatLog, setChatLog] = useState<SimulatedChatMessage[]>([
    {
      id: "msg-1",
      sender: "ai_agent",
      text: "👋 Hello and welcome to Freshcare Laundry & Drycleaning Services! I'm Alex, your automated customer agent on WhatsApp. How can we take care of your laundry, traditional native wear, or suits today?",
      time: "10:15 AM",
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog, isProcessing]);

  // Handle message submission
  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isProcessing) return;

    const userMsg: SimulatedChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "customer",
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatLog((prev) => [...prev, userMsg]);
    setInputText("");
    setIsProcessing(true);

    const lower = text.toLowerCase();

    // Trigger visual progression through the 8 stages:
    // Customer (0ms) -> WhatsApp (400ms) -> WhatsApp API (900ms) -> AI Agent (1400ms) ->
    // Knowledge Base (1900ms) -> Tools (2500ms) -> Database (3200ms) -> Confirmation (3900ms)
    setActiveNode("customer");
    setTimeout(() => setActiveNode("whatsapp"), 400);
    setTimeout(() => setActiveNode("whatsapp_api"), 900);
    setTimeout(() => setActiveNode("ai_agent"), 1400);
    setTimeout(() => setActiveNode("knowledge_base"), 1900);
    setTimeout(() => {
      setActiveNode("tools");
      if (lower.includes("price") || lower.includes("how much") || lower.includes("cost") || lower.includes("rate")) {
        setActiveTool("price");
      } else if (lower.includes("schedule") || lower.includes("pickup") || lower.includes("tomorrow") || lower.includes("agric")) {
        setActiveTool("pickup");
      } else {
        setActiveTool("all");
      }
    }, 2500);
    setTimeout(() => setActiveNode("database"), 3200);
    setTimeout(() => {
      setActiveNode("confirmation");
      generateAiResponse(text);
      setIsProcessing(false);
      setActiveTool(null);
    }, 3900);
  };

  const generateAiResponse = (userText: string) => {
    const lower = userText.toLowerCase();
    const randomTag = `FC-${Math.floor(100 + Math.random() * 900)}`;
    const randomRef = `FC-IKD-${Math.floor(100 + Math.random() * 900)}`;

    let reply = "";
    let toolsUsed: string[] = [];
    let priceCalculated: number = 3600;
    let piecesCounted: number = 4;
    let tagAssigned = randomTag;
    let pickupScheduled = "Tomorrow · 8:00 AM – 11:00 AM";

    if (lower.includes("18") || lower.includes("discount") || lower.includes("1500") || lower.includes("piece")) {
      toolsUsed = ["Price Calculator", "Order System", "Pickup Scheduling"];
      piecesCounted = 18;
      priceCalculated = 7200 - 1500; // with ₦1,500 welcome discount!
      reply =
        `✅ *Welcome Discount UNLOCKED!*\n` +
        `Your 18 clothing pieces exceed our 15-piece threshold, qualifying you for *₦1,500 OFF* your order.\n\n` +
        `*Order Summary:*\n` +
        `• Total Pieces: 18 garments\n` +
        `• Starch Level: Medium Crisp\n` +
        `• Subtotal: ₦7,200\n` +
        `• First Order Discount: -₦1,500\n` +
        `• Total Payable: *₦${priceCalculated.toLocaleString()}*\n\n` +
        `We have queued driver collection for *${pickupScheduled}* in Ikorodu. Sequential Tag *${tagAssigned}* has been reserved!`;

      setBookingState((prev) => ({
        ...prev,
        totalPieces: 18,
        isDiscountEligible: true,
        discountAmount: 1500,
        discountPitched: true,
        estimatedNairaTotal: priceCalculated,
        tagNumber: tagAssigned,
        bookingReference: randomRef,
        bookingStatus: "confirmed",
      }));
    } else if (lower.includes("senator") || lower.includes("native") || lower.includes("starch") || lower.includes("agbada")) {
      toolsUsed = ["Price Calculator", "Knowledge Base (Starch SOP)"];
      piecesCounted = 4;
      priceCalculated = 3600;
      reply =
        `👔 *Traditional Attire Estimate:*\n` +
        `• 2x Senator Sets (2-piece): ₦3,600 (₦1,800/set)\n` +
        `• Custom Starch: *Medium Crisp Starch* formulated for Kaftans.\n` +
        `• Zero-Mix Batch Washing: Strictly isolated batch.\n\n` +
        `💡 *Pro-Tip:* If you add 12 more everyday items to bring your total above 15 pieces, you unlock our *₦1,500 Welcome Discount*!\n\n` +
        `Would you like to lock in pickup at Firstgate, Agric, or Benson?`;

      setBookingState((prev) => ({
        ...prev,
        itemsMentioned: ["2x Senator / Native (2-piece)"],
        totalPieces: 4,
        isDiscountEligible: false,
        estimatedNairaTotal: priceCalculated,
        tagNumber: tagAssigned,
        bookingReference: randomRef,
      }));
    } else if (lower.includes("pickup") || lower.includes("tomorrow") || lower.includes("schedule") || lower.includes("agric") || lower.includes("firstgate")) {
      toolsUsed = ["Pickup Scheduling", "Order System", "Database Ingestion"];
      reply =
        `📍 *Pickup Scheduled in Ikorodu:*\n` +
        `• Location: Firstgate / LASUSTECH Environs\n` +
        `• Window: Tomorrow (8:00 AM – 11:00 AM)\n` +
        `• Delivery Fee: *FREE* (within 1km of LASUSTECH Firstgate)\n` +
        `• Assigned Rider: Ikorodu Route Dispatcher #02\n` +
        `• Sequential Tag: *${tagAssigned}*\n\n` +
        `Our rider will count pieces in your presence and WhatsApp photo-document your items upon intake!`;

      setBookingState((prev) => ({
        ...prev,
        tagNumber: tagAssigned,
        bookingReference: randomRef,
        bookingStatus: "confirmed",
      }));
    } else if (lower.includes("status") || lower.includes("track") || lower.includes("where")) {
      toolsUsed = ["Database Query", "Order System"];
      reply =
        `🔍 *Live Status for Tag FC-001:*\n` +
        `• Stage: *In Washing (Zero-Mix Isolation)*\n` +
        `• Facility Bay: Firstgate Facility · Bay 2\n` +
        `• Next Step: Quality Check & Steam Pressing\n` +
        `• Estimated Handover: Tomorrow, 2:00 PM\n\n` +
        `You will receive an automated WhatsApp ping once pressing is completed!`;
    } else {
      toolsUsed = ["Price Calculator", "Knowledge Base"];
      reply =
        `Freshcare Laundry is ready! We wash everyday wear (₦500-₦700), Senator & Agbada native wear with custom starching (₦1,800-₦3,500), and suits.\n\n` +
        `Pickup is *FREE* within 1km of LASUSTECH Firstgate, and bringing over 15 pieces saves you *₦1,500* instantly! What can we pick up for you?`;
    }

    const aiMsg: SimulatedChatMessage = {
      id: `ai-${Date.now()}`,
      sender: "ai_agent",
      text: reply,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      toolsUsed,
      priceCalculated,
      piecesCounted,
      tagAssigned,
      pickupScheduled,
    };

    setChatLog((prev) => [...prev, aiMsg]);
  };

  const nodeDescriptions: Record<
    string,
    {
      title: string;
      role: string;
      desc: string;
      tech: string;
    }
  > = {
    customer: {
      title: "1. Customer",
      role: "Inbound User Touchpoint",
      desc: "An Ikorodu resident, LASUSTECH student, or corporate professional sending text or voice notes requesting laundry services.",
      tech: "Mobile / Web WhatsApp Client",
    },
    whatsapp: {
      title: "2. WhatsApp",
      role: "End-to-End Encrypted Messenger",
      desc: "The primary communication channel in Nigeria. Customer sends request to Freshcare Business Desk (+234 803 000 FRESHCARE).",
      tech: "WhatsApp Business App / Client",
    },
    whatsapp_api: {
      title: "3. WhatsApp API",
      role: "Cloud Webhook Gateway",
      desc: "Ingests the incoming message payload, verifies security tokens, extracts media/audio, and forwards to the backend.",
      tech: "Meta WhatsApp Cloud API / Webhook Endpoint",
    },
    ai_agent: {
      title: "4. AI Agent (Alex)",
      role: "Core Reasoning & Orchestration",
      desc: "Our Gemini-powered conversational agent trained on Nigerian hospitality, laundry terminology, and Freshcare SOPs.",
      tech: "Gemini 2.5 / 3.8 Flash + Structured Tool Orchestration",
    },
    knowledge_base: {
      title: "5. Knowledge Base",
      role: "Domain Policy & SOP Repository",
      desc: "Contains Freshcare Section 12 Customer Liability, Zero-Mix washing protocols, ₦1,500 discount for >15 pcs rules, and Ikorodu geography.",
      tech: "SOP Embeddings & Context Prompts",
    },
    tools: {
      title: "6. Tools Orchestrator",
      role: "Dynamic Function Calling",
      desc: "Executes 3 specialized business functions based on the customer's intent: Price Calculator, Order System, and Pickup Scheduling.",
      tech: "TypeScript Function Calling Schema",
    },
    database: {
      title: "7. Database",
      role: "Central Operations Store",
      desc: "Writes the confirmed booking, assigns sequential tag (FC-108), saves customer phone and delivery window to PostgreSQL/CRM ledger.",
      tech: "PostgreSQL / Cloud SQL / CRM Ledger",
    },
    confirmation: {
      title: "8. Confirmation",
      role: "Outbound Dispatch Voucher",
      desc: "Dispatches the verified order confirmation template and digital voucher back to the customer's WhatsApp thread.",
      tech: "WhatsApp Template Messages API",
    },
  };

  const selectedNodeData = nodeDescriptions[activeNode] || nodeDescriptions.ai_agent;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-teal-950/40 border border-emerald-500/30 p-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp AI Agent Automation Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Customer → WhatsApp API → AI Agent → Tools → Database
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Interactive simulator demonstrating how inbound WhatsApp inquiries are parsed by Alex, checked against our Knowledge Base, routed through Price/Order/Pickup tools, and confirmed.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onOpenOrderFunnel && (
              <button
                onClick={onOpenOrderFunnel}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-teal-300 border border-teal-500/30 font-semibold text-xs cursor-pointer"
              >
                <span>Web Order Funnel (8 Steps)</span>
              </button>
            )}
            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <span>View Live CRM Ledger</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Split Interactive View: WhatsApp Simulator (Left) + System Pipeline (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: WhatsApp Interactive Phone Chat (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[680px]">
          {/* WhatsApp Chat Header */}
          <div className="bg-[#128C7E] px-4 py-3 flex items-center justify-between text-white shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-white text-emerald-800 flex items-center justify-center font-bold text-sm shadow">
                FC
              </div>
              <div>
                <div className="font-bold text-sm flex items-center gap-1">
                  <span>Freshcare Concierge (Alex)</span>
                  <span className="text-[10px] bg-emerald-400 text-emerald-950 px-1 py-0.2 rounded font-black">
                    ✓
                  </span>
                </div>
                <div className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  <span>Official WhatsApp Business (+234 803 000 FRESHCARE)</span>
                </div>
              </div>
            </div>

            <span className="text-[10px] font-mono bg-emerald-900/60 px-2 py-1 rounded">
              Ikorodu Desk
            </span>
          </div>

          {/* Quick Scenario Prompt Chips */}
          <div className="bg-slate-950/80 px-3 py-2 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto">
            {[
              { label: "18 Clothes (₦1,500 Off)", text: "I have 18 pieces of clothes for pickup tomorrow in Agric. Apply the ₦1,500 discount!" },
              { label: "2 Senators + Starch", text: "How much for 2 Senator sets with medium starch?" },
              { label: "Pickup in Firstgate", text: "Can you schedule a pickup tomorrow morning near LASUSTECH Firstgate?" },
              { label: "Track Tag FC-001", text: "What is the status of my order Tag FC-001?" },
            ].map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p.text)}
                disabled={isProcessing}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-850 text-[10px] font-medium text-teal-300 border border-slate-800 whitespace-nowrap cursor-pointer transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Conversation History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0b141a]/95">
            {chatLog.map((msg) => {
              const isAi = msg.sender === "ai_agent";
              return (
                <div
                  key={msg.id}
                  className={`flex ${isAi ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-md ${
                      isAi
                        ? "bg-[#202c33] text-slate-100 rounded-tl-sm border border-slate-700/50"
                        : "bg-[#005c4b] text-white rounded-tr-sm"
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>

                    {/* Tools & Metadata Badge if AI response */}
                    {isAi && msg.toolsUsed && msg.toolsUsed.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex flex-wrap items-center gap-1 text-[9px] font-mono text-teal-300">
                        <span className="text-slate-400">Tools:</span>
                        {msg.toolsUsed.map((t, i) => (
                          <span
                            key={i}
                            className="bg-teal-500/10 px-1.5 py-0.5 rounded border border-teal-500/20"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="text-[9px] text-right text-slate-400 mt-1 opacity-80">
                      {msg.time}
                    </div>
                  </div>
                </div>
              );
            })}

            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-[#202c33] text-teal-300 rounded-2xl p-3 text-xs flex items-center gap-2 border border-slate-700/50">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-[11px] text-slate-300 font-mono">
                    Alex querying Knowledge Base & Tools...
                  </span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Text Input Bar */}
          <div className="p-3 bg-[#202c33] border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type message on WhatsApp..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={isProcessing}
              className="flex-1 bg-[#2a3942] text-white text-xs px-3.5 py-2.5 rounded-xl border border-transparent focus:outline-none focus:border-teal-400 placeholder:text-slate-500"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isProcessing}
              className="w-9 h-9 rounded-xl bg-[#00a884] hover:bg-[#029070] disabled:opacity-30 text-white flex items-center justify-center cursor-pointer transition-colors shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Real-Time Architectural Flow Pipeline (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider">
                  Automated Pipeline Architecture
                </span>
                <h3 className="text-lg font-bold text-white">
                  WhatsApp AI Agent Execution Flow
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                Click any node to inspect
              </span>
            </div>

            {/* Visual Architecture Tree */}
            <div className="space-y-3">
              {/* NODE 1: CUSTOMER */}
              <button
                onClick={() => setActiveNode("customer")}
                className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  activeNode === "customer"
                    ? "bg-teal-500 text-slate-950 border-teal-300 shadow-lg scale-[1.01]"
                    : "bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-teal-400">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider">Customer</div>
                    <div className="text-[11px] opacity-80">
                      Inbound mobile user in Ikorodu (LASUSTECH, Agric, Benson)
                    </div>
                  </div>
                </div>
                <ArrowDown className="w-4 h-4 opacity-50" />
              </button>

              {/* NODE 2: WHATSAPP */}
              <button
                onClick={() => setActiveNode("whatsapp")}
                className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  activeNode === "whatsapp"
                    ? "bg-emerald-500 text-slate-950 border-emerald-300 shadow-lg scale-[1.01]"
                    : "bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-emerald-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider">WhatsApp</div>
                    <div className="text-[11px] opacity-80">
                      Encrypted mobile messaging app · #1 communication channel in Nigeria
                    </div>
                  </div>
                </div>
                <ArrowDown className="w-4 h-4 opacity-50" />
              </button>

              {/* NODE 3: WHATSAPP API */}
              <button
                onClick={() => setActiveNode("whatsapp_api")}
                className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  activeNode === "whatsapp_api"
                    ? "bg-teal-500 text-slate-950 border-teal-300 shadow-lg scale-[1.01]"
                    : "bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-sky-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider">WhatsApp API</div>
                    <div className="text-[11px] opacity-80">
                      Webhook ingestion gateway · Token verification · Media parsing
                    </div>
                  </div>
                </div>
                <ArrowDown className="w-4 h-4 opacity-50" />
              </button>

              {/* NODE 4: AI AGENT */}
              <button
                onClick={() => setActiveNode("ai_agent")}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between relative overflow-hidden ${
                  activeNode === "ai_agent"
                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 border-teal-300 shadow-xl scale-[1.02]"
                    : "bg-slate-950 border-teal-500/40 text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-teal-400">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider">
                      AI Agent (Alex)
                    </div>
                    <div className="text-[11px] opacity-90">
                      Reasoning engine · Intent detection · Function calling orchestrator
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/40 font-bold">
                  Gemini Flash
                </span>
              </button>

              {/* NODE 5: KNOWLEDGE BASE */}
              <button
                onClick={() => setActiveNode("knowledge_base")}
                className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  activeNode === "knowledge_base"
                    ? "bg-teal-500 text-slate-950 border-teal-300 shadow-lg scale-[1.01]"
                    : "bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-purple-400">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider">
                      Knowledge Base
                    </div>
                    <div className="text-[11px] opacity-80">
                      Freshcare SOP · Zero-Mix policy · Section 12 Liability · 15+ pcs rule
                    </div>
                  </div>
                </div>
                <ArrowDown className="w-4 h-4 opacity-50" />
              </button>

              {/* NODE 6: TOOLS (3 BRANCHES) */}
              <div className="p-4 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-teal-400 font-bold uppercase tracking-wider">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Tools (Dynamic Function Calling)</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">3 Sub-Tools</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  {/* Tool 1: Price Calculator */}
                  <div
                    className={`p-3 rounded-2xl border transition-all ${
                      activeTool === "price" || activeTool === "all"
                        ? "bg-teal-500/20 border-teal-400 text-white shadow-md scale-[1.02]"
                        : "bg-slate-900/80 border-slate-800 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-teal-300 mb-1">
                      <Calculator className="w-3.5 h-3.5" />
                      <span>Price Calculator</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-snug">
                      Naira pricing (₦), starch surcharges, and ₦1,500 discount qualification.
                    </p>
                  </div>

                  {/* Tool 2: Order System */}
                  <div
                    className={`p-3 rounded-2xl border transition-all ${
                      activeTool === "order" || activeTool === "all"
                        ? "bg-emerald-500/20 border-emerald-400 text-white shadow-md scale-[1.02]"
                        : "bg-slate-900/80 border-slate-800 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-emerald-300 mb-1">
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Order System</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-snug">
                      Garment counting, sequential waterproof tag generator (`FC-108`).
                    </p>
                  </div>

                  {/* Tool 3: Pickup Scheduling */}
                  <div
                    className={`p-3 rounded-2xl border transition-all ${
                      activeTool === "pickup" || activeTool === "all"
                        ? "bg-sky-500/20 border-sky-400 text-white shadow-md scale-[1.02]"
                        : "bg-slate-900/80 border-slate-800 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-sky-300 mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Pickup Scheduling</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-snug">
                      Ikorodu route dispatcher (Firstgate, Agric, Benson, Garage).
                    </p>
                  </div>
                </div>
              </div>

              {/* NODE 7: DATABASE */}
              <button
                onClick={() => setActiveNode("database")}
                className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  activeNode === "database"
                    ? "bg-teal-500 text-slate-950 border-teal-300 shadow-lg scale-[1.01]"
                    : "bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-teal-400">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider">Database</div>
                    <div className="text-[11px] opacity-80">
                      Persistent CRM ledger · Customer records · Order history & tag archives
                    </div>
                  </div>
                </div>
                <ArrowDown className="w-4 h-4 opacity-50" />
              </button>

              {/* NODE 8: CONFIRMATION */}
              <button
                onClick={() => setActiveNode("confirmation")}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  activeNode === "confirmation"
                    ? "bg-emerald-500 text-slate-950 border-emerald-300 shadow-xl scale-[1.01]"
                    : "bg-slate-950 border-emerald-500/30 text-emerald-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider">
                      Confirmation
                    </div>
                    <div className="text-[11px] opacity-90">
                      Automated WhatsApp intake template & voucher ping to customer
                    </div>
                  </div>
                </div>
                <Check className="w-4 h-4" />
              </button>
            </div>

            {/* Node Detailed Information Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{selectedNodeData.title}</span>
                <span className="text-[10px] font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                  {selectedNodeData.role}
                </span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {selectedNodeData.desc}
              </p>
              <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-850">
                <strong className="text-slate-300">Technical Implementation: </strong>
                <span className="font-mono text-teal-300">{selectedNodeData.tech}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
