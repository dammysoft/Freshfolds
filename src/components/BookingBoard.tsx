import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Truck,
  ShieldCheck,
  CheckCircle,
  FileText,
  Sparkles,
  ArrowRight,
  Printer,
  Sparkle,
  MessageSquare
} from "lucide-react";
import { BookingState, DeliveryArea, StarchPreference, OrderStage } from "../types";
import { OrderTracker } from "./OrderTracker";

interface BookingBoardProps {
  bookingState: BookingState;
  setBookingState: React.Dispatch<React.SetStateAction<BookingState>>;
  onOpenCallTab: () => void;
}

const IKORODU_AREAS: DeliveryArea[] = [
  "Firstgate / LASUSTECH",
  "Agric",
  "Benson",
  "Ikorodu Garage",
  "Odogunyan",
  "Ebute / Ipakodo",
  "Other Ikorodu environs",
];

export const BookingBoard: React.FC<BookingBoardProps> = ({
  bookingState,
  setBookingState,
  onOpenCallTab,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showReceiptModal, setShowReceiptModal] = useState<boolean>(false);

  const subtotal = bookingState.estimatedNairaTotal || 4500;
  const deliveryCost = bookingState.deliveryFee ?? (bookingState.deliveryArea === "Firstgate / LASUSTECH" ? 0 : 500);
  const expressCost = bookingState.expressSurcharge ?? 0;
  const totalPieces = bookingState.totalPieces || (bookingState.itemsMentioned ? bookingState.itemsMentioned.length : 0);
  const isDiscountEligible = bookingState.isDiscountEligible !== undefined
    ? bookingState.isDiscountEligible
    : totalPieces > 15;
  const discount = isDiscountEligible ? 1500 : 0;
  const piecesNeeded = Math.max(0, 16 - totalPieces);
  const finalTotalNaira = Math.max(0, subtotal + deliveryCost + expressCost - discount);

  const handleConfirmReservation = () => {
    const randomId = Math.floor(100 + Math.random() * 900);
    setBookingState((prev) => ({
      ...prev,
      bookingStatus: "confirmed",
      bookingReference: prev.bookingReference || `FC-IKD-${randomId}`,
      tagNumber: prev.tagNumber || `FC-${randomId}`,
      driverSlot: prev.driverSlot || "Ikorodu Dispatch Dispatcher #02 (Agric/Firstgate Route)",
    }));
    setShowReceiptModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Title & Introduction */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              Freshcare Ikorodu Operations
            </span>
            <span className="text-xs text-slate-400">• Live Dispatch & Tagging Board</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Order Dispatch & WhatsApp Tag Status
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Serving Firstgate, LASUSTECH, Agric, Benson, and across Ikorodu. Tagged and photo-documented on WhatsApp upon receipt!
          </p>
        </div>

        <div className="flex items-center gap-2">
          {bookingState.bookingStatus !== "confirmed" ? (
            <button
              onClick={handleConfirmReservation}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold text-xs shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Confirm Ikorodu Booking</span>
            </button>
          ) : (
            <button
              onClick={() => setShowReceiptModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>View WhatsApp Voucher</span>
            </button>
          )}
        </div>
      </div>

      {/* Visual Order Lifecycle Tracking Component */}
      <OrderTracker
        bookingState={bookingState}
        onUpdateStage={(newStage: OrderStage) => {
          setBookingState((prev) => ({
            ...prev,
            orderStage: newStage,
            stageLastUpdated: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          }));
        }}
        onOpenCallTab={onOpenCallTab}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Scheduled Pickup & Driver Dispatch */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Logistics & Service Mode</h3>
                  <p className="text-xs text-slate-400">
                    {bookingState.isPickup
                      ? `Doorstep Pickup in ${bookingState.deliveryArea || "Ikorodu"}`
                      : "Freshcare Firstgate Facility Drop-off"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold border ${
                    bookingState.bookingStatus === "confirmed"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : "bg-amber-500/10 text-amber-300 border-amber-500/30"
                  }`}
                >
                  {bookingState.bookingStatus === "confirmed"
                    ? "✓ Confirmed & Tagged"
                    : "• Inquiry in Progress"}
                </span>
              </div>
            </div>

            {/* Grid of logistics details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                <div className="text-slate-400 flex items-center gap-1.5 mb-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  Scheduled Pickup Date
                </div>
                <div className="text-sm font-bold text-white">
                  {bookingState.preferredDate || "Tomorrow"}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Operating Mon–Sat 7AM–8PM | Sun 9AM–4PM
                </div>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                <div className="text-slate-400 flex items-center gap-1.5 mb-1.5 font-medium">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  Arrival Window
                </div>
                <div className="text-sm font-bold text-emerald-400">
                  {bookingState.preferredWindow || "8:00 AM – 11:00 AM"}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  SMS / WhatsApp alert sent 30 mins before arrival
                </div>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                <div className="text-slate-400 flex items-center gap-1.5 mb-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-teal-400" />
                  Delivery Zone & Fee
                </div>
                <div className="text-sm font-bold text-white">
                  {bookingState.deliveryArea}
                </div>
                <div className="text-[11px] text-emerald-400 mt-1">
                  {bookingState.deliveryArea === "Firstgate / LASUSTECH"
                    ? "FREE Delivery (Within 1km LASUSTECH)"
                    : "₦500 Flat Fee across Ikorodu"}
                </div>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                <div className="text-slate-400 flex items-center gap-1.5 mb-1.5 font-medium">
                  <Sparkle className="w-4 h-4 text-amber-400" />
                  Starch Level Preference
                </div>
                <div className="text-sm font-bold text-white capitalize">
                  {bookingState.starchPreference || "Medium"} Starch
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Customized for Senators, Kaftans & Agbadas
                </div>
              </div>
            </div>

            {/* Customer Contact & Address Block */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Customer & Handover Information
                </h4>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
                >
                  {isEditing ? "Save Edits" : "Quick Edit Details"}
                </button>
              </div>

              {isEditing ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <input
                    type="text"
                    placeholder="Customer Name"
                    value={bookingState.customerName}
                    onChange={(e) =>
                      setBookingState({ ...bookingState, customerName: e.target.value })
                    }
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="WhatsApp Phone Number"
                    value={bookingState.customerPhone}
                    onChange={(e) =>
                      setBookingState({ ...bookingState, customerPhone: e.target.value })
                    }
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <select
                    value={bookingState.deliveryArea}
                    onChange={(e) => {
                      const area = e.target.value as DeliveryArea;
                      setBookingState({
                        ...bookingState,
                        deliveryArea: area,
                        deliveryFee: area === "Firstgate / LASUSTECH" ? 0 : 500,
                      });
                    }}
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    {IKORODU_AREAS.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Street / Landmark (e.g. Near LASUSTECH Gate)"
                    value={bookingState.customerAddress}
                    onChange={(e) =>
                      setBookingState({ ...bookingState, customerAddress: e.target.value })
                    }
                    className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              ) : (
                <div className="bg-slate-950/40 p-3.5 rounded-2xl border border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold text-white">
                      {bookingState.customerName || "Customer (pending voice collection)"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300">
                      {bookingState.customerPhone || "(Pending WhatsApp number)"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300 truncate max-w-xs">
                      {bookingState.customerAddress || `Address in ${bookingState.deliveryArea}`}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SOP Compliance Badge */}
          <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6 shadow-xl">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-teal-400" />
                <span>Garments & SOP Tag Assignment</span>
              </h3>
              <span className="text-xs text-emerald-400 font-mono">
                {bookingState.tagNumber ? `Tag: ${bookingState.tagNumber}` : "Auto Tag on Receipt"}
              </span>
            </div>

            {bookingState.itemsMentioned && bookingState.itemsMentioned.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {bookingState.itemsMentioned.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-medium flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
                <span>
                  No specific items identified yet. Speak with Alex or choose garments from the Fixed Pricing Menu.
                </span>
                <button
                  onClick={onOpenCallTab}
                  className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 cursor-pointer"
                >
                  Speak with Alex <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Pricing Breakdown & ₦1,500 Trial Savings */}
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/30 shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-15 text-amber-400">
              <Sparkles className="w-20 h-20" />
            </div>

            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              New Customer Welcome Credit
            </div>

            <h3 className="text-2xl font-black text-white mb-1">
              {isDiscountEligible ? "₦1,500 OFF Applied" : "₦1,500 Welcome Offer"}
            </h3>
            <p className="text-xs text-amber-200/80 mb-4 leading-relaxed">
              {isDiscountEligible
                ? `Active: First order of clothes (${totalPieces} pieces) exceeds 15 pieces!`
                : `Applies to your first order of clothes only when items exceed 15 pieces (currently ${totalPieces} pcs; add ${piecesNeeded} more to unlock).`}
            </p>

            <div className="space-y-2 border-t border-amber-500/20 pt-3 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-white font-mono">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Delivery ({bookingState.deliveryArea}):</span>
                <span className="font-mono text-emerald-400">
                  {deliveryCost === 0 ? "FREE (1km LASUSTECH)" : `+₦${deliveryCost.toLocaleString()}`}
                </span>
              </div>
              <div className="flex items-center justify-between text-amber-300 font-bold">
                <span>Welcome Discount (&gt;15 pcs):</span>
                <span className="font-mono">
                  {discount > 0 ? `-₦${discount.toLocaleString()}` : "₦0 (Locked)"}
                </span>
              </div>
              <div className="border-t border-slate-800 pt-2 flex items-center justify-between text-sm font-bold text-white">
                <span>Total Due on Handover:</span>
                <span className="text-emerald-400 text-lg font-mono">
                  ₦{finalTotalNaira.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-4 p-2.5 rounded-xl bg-slate-950/70 border border-amber-500/20 text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Zero-risk guarantee: Pay only after inspecting your garments. Branded Freshcare bag included!</span>
            </div>
          </div>

          {/* Quick Support / Contact Information */}
          <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-5 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Freshcare Ikorodu Central Facility
            </h4>
            <div className="text-xs space-y-2 text-slate-400">
              <div className="flex items-center justify-between">
                <span>Location:</span>
                <span className="text-white">Firstgate, Near LASUSTECH, Ikorodu</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Operating Hours:</span>
                <span className="text-white">Mon–Sat 7AM–8PM | Sun 9AM–4PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span>WhatsApp Desk:</span>
                <span className="text-emerald-400 font-mono">+234 (WhatsApp Order Sync)</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenCallTab}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Return to Voice Call with Alex</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3 shadow-lg">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Pickup Window Confirmed!</h3>
              <p className="text-xs text-slate-400 mt-1">
                Booking Reference:{" "}
                <span className="font-mono text-emerald-400 font-bold">
                  {bookingState.bookingReference || "FC-IKD-201"}
                </span>{" "}
                • Tag:{" "}
                <span className="font-mono text-amber-300 font-bold">
                  {bookingState.tagNumber || "FC-001"}
                </span>
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs mb-6">
              <div className="flex justify-between py-1 border-b border-slate-800/80 text-slate-300">
                <span>Facility Location:</span>
                <span className="font-semibold text-white">Firstgate, LASUSTECH Environs, Ikorodu</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80 text-slate-300">
                <span>Scheduled Window:</span>
                <span className="font-semibold text-emerald-400">
                  {bookingState.preferredDate || "Tomorrow"} ({bookingState.preferredWindow || "8:00 AM – 11:00 AM"})
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80 text-slate-300">
                <span>Starch Level:</span>
                <span className="text-white capitalize">{bookingState.starchPreference} Starch</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80 text-slate-300">
                <span>Current Stage:</span>
                <span className="font-semibold text-emerald-400 capitalize">
                  {bookingState.orderStage
                    ? bookingState.orderStage.replace("_", " ")
                    : "In Washing"}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80 text-slate-300">
                <span>Welcome Discount:</span>
                <span className={isDiscountEligible ? "font-bold text-amber-400" : "text-slate-400"}>
                  {isDiscountEligible ? "-₦1,500 (15+ pieces)" : "₦0 (Requires >15 pieces)"}
                </span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-bold text-white">
                <span>Total Due on Handover:</span>
                <span className="text-emerald-400 font-mono">₦{finalTotalNaira.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowReceiptModal(false)}
                className="flex-1 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-xs shadow-md shadow-emerald-500/20 cursor-pointer transition-colors"
              >
                Close & Return to Console
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

