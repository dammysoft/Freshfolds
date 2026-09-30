import React, { useState } from "react";
import { Header } from "./components/Header";
import { VoiceCallConsole } from "./components/VoiceCallConsole";
import { BookingBoard } from "./components/BookingBoard";
import { PricingCalculator } from "./components/PricingCalculator";
import { AboutServices } from "./components/AboutServices";
import { WebsiteOverview } from "./components/WebsiteOverview";
import { FreshFoldLogo } from "./components/FreshFoldLogo";
import { ChatMessage, BookingState } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<"overview" | "call" | "booking" | "pricing" | "sop">("overview");
  const [isCallActive, setIsCallActive] = useState<boolean>(false);

  // Booking state extracted by Alex in Ikorodu, Lagos
  const [bookingState, setBookingState] = useState<BookingState>({
    serviceType: "traditional",
    itemsMentioned: ["2x Senator / Native (2-piece)"],
    starchPreference: "medium",
    isPickup: true,
    preferredDate: "Tomorrow",
    preferredWindow: "8:00 AM – 11:00 AM",
    customerName: "",
    customerPhone: "",
    deliveryArea: "Firstgate / LASUSTECH",
    customerAddress: "",
    specialInstructions: "Medium starch, gentle fabric softener",
    discountPitched: false,
    discountAmount: 1500, // ₦1,500 welcome discount
    totalPieces: 4, // 2 Senator sets = 4 pieces
    isDiscountEligible: false, // requires > 15 pieces
    estimatedNairaTotal: 3600,
    deliveryFee: 0, // Free within 1km LASUSTECH Firstgate
    expressSurcharge: 0,
    bookingStatus: "inquiry",
    orderStage: "in_washing",
    stageLastUpdated: "Today · 11:30 AM",
    tagNumber: "FF-001",
    driverSlot: "Ikorodu Dispatch Dispatcher #02 (Agric/Firstgate Route)",
  });

  // Conversation history with Alex
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleCallAlexClick = () => {
    setActiveTab("call");
    const callButton = document.querySelector('button[title="Call Alex"]') as HTMLButtonElement;
    if (callButton) {
      callButton.click();
    }
  };

  const handleSendFromCalculator = (text: string) => {
    setActiveTab("call");
    setIsCallActive(true);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);

    // Send to backend
    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        voiceName: "Kore",
        generateAudio: true,
        currentBookingState: bookingState,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const reply =
          data.alexResponse ||
          "I have your order estimate right here! We can schedule our rider for tomorrow in Ikorodu. What window works best?";

        const alexMsg: ChatMessage = {
          id: `alex-${Date.now()}`,
          role: "assistant",
          content: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          audioBase64: data.audioBase64,
        };

        setMessages((prev) => [...prev, alexMsg]);

        if (data.extracted) {
          setBookingState((prev) => ({
            ...prev,
            ...data.extracted,
            discountPitched: true,
          }));
        }
      })
      .catch((err) => {
        console.error("Error from calculator consultation:", err);
      });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCallActive={isCallActive}
        onCallAlexClick={handleCallAlexClick}
        discountClaimed={bookingState.discountPitched}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === "overview" && (
          <WebsiteOverview
            onStartCall={() => setActiveTab("call")}
            onOpenPricing={() => setActiveTab("pricing")}
            onOpenTracker={() => setActiveTab("booking")}
            onOpenSop={() => setActiveTab("sop")}
          />
        )}

        {activeTab === "call" && (
          <VoiceCallConsole
            messages={messages}
            setMessages={setMessages}
            bookingState={bookingState}
            setBookingState={setBookingState}
            isCallActive={isCallActive}
            setIsCallActive={setIsCallActive}
            onOpenBookingTab={() => setActiveTab("booking")}
          />
        )}

        {activeTab === "pricing" && (
          <PricingCalculator
            onSendToAlex={handleSendFromCalculator}
            bookingState={bookingState}
            setBookingState={setBookingState}
          />
        )}

        {activeTab === "booking" && (
          <BookingBoard
            bookingState={bookingState}
            setBookingState={setBookingState}
            onOpenCallTab={() => setActiveTab("call")}
          />
        )}

        {activeTab === "sop" && (
          <AboutServices onStartCall={handleCallAlexClick} />
        )}
      </main>

      {/* Footer Featuring Feasibility Report Credentials */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-850">
            <FreshFoldLogo size="md" showTagline={true} />

            <div className="flex flex-wrap gap-4 text-xs">
              <button
                onClick={() => setActiveTab("overview")}
                className="hover:text-teal-400 transition-colors cursor-pointer"
              >
                Website Overview
              </button>
              <button
                onClick={() => setActiveTab("call")}
                className="hover:text-teal-400 transition-colors cursor-pointer"
              >
                Voice Concierge (Alex)
              </button>
              <button
                onClick={() => setActiveTab("pricing")}
                className="hover:text-teal-400 transition-colors cursor-pointer"
              >
                Pricing Menu (₦)
              </button>
              <button
                onClick={() => setActiveTab("booking")}
                className="hover:text-teal-400 transition-colors cursor-pointer"
              >
                Live Tracking & Dispatch
              </button>
              <button
                onClick={() => setActiveTab("sop")}
                className="hover:text-teal-400 transition-colors cursor-pointer"
              >
                SOP Protocols
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-slate-500">
            <div>
              <span>Founder: Azeez Saheed Oluwadamilola (Dammy)</span>
              <span className="mx-2">·</span>
              <span>Firstgate, LASUSTECH (formerly Laspotech), Ikorodu, Lagos State</span>
            </div>
            <div>
              <span>Mon–Sat 7AM–8PM · Sun 9AM–4PM · WhatsApp Business First</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

