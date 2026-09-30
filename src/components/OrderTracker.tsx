import React, { useState } from "react";
import {
  Truck,
  Waves,
  CheckCircle2,
  PackageCheck,
  Clock,
  ShieldCheck,
  Send,
  Sparkles,
  MapPin,
  FileText,
  AlertCircle,
  ChevronRight,
  ArrowRight,
  RefreshCw,
  PhoneCall
} from "lucide-react";
import { BookingState, OrderStage } from "../types";

interface OrderTrackerProps {
  bookingState: BookingState;
  onUpdateStage?: (stage: OrderStage) => void;
  onOpenCallTab?: () => void;
}

interface StageDefinition {
  id: OrderStage;
  title: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  sopCode: string;
  leadTime: string;
  description: string;
  checklist: string[];
  handler: string;
}

const STAGES: StageDefinition[] = [
  {
    id: "picked_up",
    title: "Picked Up",
    shortLabel: "Picked Up",
    icon: Truck,
    sopCode: "SOP-1.2 Receiving & Tagging",
    leadTime: "Day 1 · Morning",
    description:
      "Garments collected from doorstep or received at Firstgate facility. Items counted, inspected for pre-existing defects, and tagged with durable waterproof labels.",
    checklist: [
      "Physical piece count verified against booking slip",
      "Sequential waterproof tag attached (FF series)",
      "WhatsApp photo-documentation timestamped",
      "Pockets cleared & zip/button check completed",
    ],
    handler: "Ikorodu Logistics Dispatch Team · Rider #02",
  },
  {
    id: "in_washing",
    title: "In Washing",
    shortLabel: "In Washing",
    icon: Waves,
    sopCode: "SOP-3.1 Batch Washing Protocol",
    leadTime: "Day 1 · Afternoon",
    description:
      "Strict zero-mix batch wash active. Sorted by fabric type and color. Alkaline builder detergent applied with oxygen-based stain releases; delicates hand-washed.",
    checklist: [
      "Zero-mix quarantine: No foreign laundry mixed in batch",
      "Colours segregated (Whites, Dark, Vibrant Ankara)",
      "Delicate garments routed to hand-wash soak basin",
      "Anti-bacterial neutraliser rinse applied",
    ],
    handler: "Firstgate Facility · Wash Master Bay 2",
  },
  {
    id: "quality_check",
    title: "Quality Check",
    shortLabel: "Quality Check",
    icon: CheckCircle2,
    sopCode: "SOP-5.2 QC & Steam Pressing",
    leadTime: "Day 2 · Morning",
    description:
      "Post-wash inspection for residual stains, precise starch formulation (Light / Medium / Heavy Crisp), and industrial vacuum suction pressing.",
    checklist: [
      "Spot inspection: Collars, cuffs, and underarms 100% clean",
      "Starch calibration applied per customer preference",
      "High-pressure steam iron: Sharp crease lines for Senators",
      "Garments cooled & folded to FreshFold exact standard",
    ],
    handler: "Senior QC Inspector · Pressing Station 1",
  },
  {
    id: "out_for_delivery",
    title: "Out for Delivery",
    shortLabel: "Out for Delivery",
    icon: PackageCheck,
    sopCode: "SOP-7.3 Dispatch & Handover",
    leadTime: "Day 2 · Afternoon",
    description:
      "Packed inside Freshfolds waterproof protective garment bag. Dispatched with route rider across Ikorodu (Firstgate, Agric, Benson, Garage).",
    checklist: [
      "Final piece tally verified against order manifest",
      "Branded breathable garment protective cover sealed",
      "WhatsApp dispatch ping & 30-min ETA sent to customer",
      "Payment on handover terminal / cash confirmation ready",
    ],
    handler: "Express Route Driver · Ikorodu Environs Unit",
  },
];

export const OrderTracker: React.FC<OrderTrackerProps> = ({
  bookingState,
  onUpdateStage,
  onOpenCallTab,
}) => {
  const [currentStage, setCurrentStage] = useState<OrderStage>(
    bookingState.orderStage || "in_washing"
  );
  const [whatsAppNotifSent, setWhatsAppNotifSent] = useState<boolean>(false);
  const [lastNotificationTime, setLastNotificationTime] = useState<string>("Just now");

  const currentStageIndex = STAGES.findIndex((s) => s.id === currentStage);
  const activeStageInfo = STAGES[currentStageIndex] || STAGES[1];

  const handleSelectStage = (stageId: OrderStage) => {
    setCurrentStage(stageId);
    setWhatsAppNotifSent(false);
    if (onUpdateStage) {
      onUpdateStage(stageId);
    }
  };

  const handleAdvanceNext = () => {
    if (currentStageIndex < STAGES.length - 1) {
      const nextStage = STAGES[currentStageIndex + 1].id;
      handleSelectStage(nextStage);
    }
  };

  const handleStepBack = () => {
    if (currentStageIndex > 0) {
      const prevStage = STAGES[currentStageIndex - 1].id;
      handleSelectStage(prevStage);
    }
  };

  const handleSendWhatsAppNotification = () => {
    setWhatsAppNotifSent(true);
    setLastNotificationTime(
      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
    setTimeout(() => {
      setWhatsAppNotifSent(false);
    }, 4500);
  };

  return (
    <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 shadow-xl relative overflow-hidden space-y-6">
      {/* Tracker Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span className="font-semibold text-emerald-400">Live Garment Tracking</span>
            <span aria-hidden="true">·</span>
            <span>Tag #{bookingState.tagNumber || "FF-001"}</span>
            <span aria-hidden="true">·</span>
            <span>Ref: {bookingState.bookingReference || "FF-IKD-201"}</span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span>Order Processing Lifecycle</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time status tracking from collection to final doorstep delivery in Ikorodu.
          </p>
        </div>

        {/* Live Simulation Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleStepBack}
            disabled={currentStageIndex === 0}
            className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Previous Stage"
          >
            ← Previous
          </button>
          <button
            onClick={handleAdvanceNext}
            disabled={currentStageIndex === STAGES.length - 1}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-md shadow-emerald-600/20"
            title="Advance to Next Stage"
          >
            Advance Stage →
          </button>
        </div>
      </div>

      {/* Visual Stepper Pipeline */}
      <div className="relative pt-2 pb-4">
        {/* Continuous track behind markers */}
        <div className="hidden md:block absolute top-[38px] left-[6%] right-[6%] h-1 bg-slate-800 -z-0">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 ease-out"
            style={{
              width: `${(currentStageIndex / (STAGES.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Responsive Grid / Timeline */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            const isUpcoming = idx > currentStageIndex;

            return (
              <button
                key={stage.id}
                onClick={() => handleSelectStage(stage.id)}
                className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                  isCurrent
                    ? "bg-slate-950 border-emerald-500/80 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/50"
                    : isCompleted
                    ? "bg-slate-950/70 border-slate-700/80 hover:border-slate-600"
                    : "bg-slate-950/30 border-slate-800/60 opacity-60 hover:opacity-90"
                }`}
              >
                {/* Step indicator header */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition-colors ${
                      isCurrent
                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30 ring-4 ring-emerald-500/10"
                        : isCompleted
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-slate-800 text-slate-400 border border-slate-700"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>

                  <span className="text-[11px] font-mono text-slate-500">
                    0{idx + 1}
                  </span>
                </div>

                {/* Stage Titles */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-xs font-bold transition-colors ${
                        isCurrent
                          ? "text-emerald-300"
                          : isCompleted
                          ? "text-slate-200"
                          : "text-slate-400"
                      }`}
                    >
                      {stage.title}
                    </span>
                    {isCurrent && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                    {stage.leadTime}
                  </div>
                </div>

                {/* Status indicator line */}
                <div className="mt-3 pt-2 border-t border-slate-800/70 flex items-center justify-between text-[10px]">
                  <span
                    className={
                      isCurrent
                        ? "text-emerald-400 font-semibold"
                        : isCompleted
                        ? "text-slate-400"
                        : "text-slate-500"
                    }
                  >
                    {isCurrent ? "Active Stage" : isCompleted ? "Completed" : "Queued"}
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Deep-Dive Card */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <activeStageInfo.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">
                  Stage {currentStageIndex + 1}: {activeStageInfo.title}
                </h4>
                <span className="text-[11px] font-mono text-emerald-400">
                  [{activeStageInfo.sopCode}]
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Assigned Unit: <span className="text-slate-300 font-medium">{activeStageInfo.handler}</span>
              </p>
            </div>
          </div>

          {/* WhatsApp Notification Simulation Button */}
          <button
            onClick={handleSendWhatsAppNotification}
            className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors active:scale-95"
          >
            <Send className="w-3.5 h-3.5 text-emerald-400" />
            <span>Send WhatsApp Status Alert</span>
          </button>
        </div>

        {/* Stage Narrative Description */}
        <p className="text-xs text-slate-300 leading-relaxed">
          {activeStageInfo.description}
        </p>

        {/* SOP Protocol Checklist for Current Stage */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>SOP Verification Protocols Checked</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {activeStageInfo.checklist.map((item, cIdx) => (
              <div
                key={cIdx}
                className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-start gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-[11px]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Notification Confirmation Alert Banner */}
        {whatsAppNotifSent && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 flex items-center justify-between gap-3 animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>
                <strong>WhatsApp Dispatched:</strong> Customer notified that order{" "}
                <span className="font-mono font-bold text-emerald-300">
                  #{bookingState.tagNumber || "FF-001"}
                </span>{" "}
                is now <strong>{activeStageInfo.title}</strong> at {lastNotificationTime}.
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">Delivered ✓✓</span>
          </div>
        )}

        {/* Facility Details & Live Summary Bar */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>Facility: Firstgate near LASUSTECH, Ikorodu</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Standard Turnaround: 24–48 Hours</span>
            </span>
          </div>

          {onOpenCallTab && (
            <button
              onClick={onOpenCallTab}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Ask Alex about this order</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
