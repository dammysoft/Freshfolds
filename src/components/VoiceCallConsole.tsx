import React, { useState, useEffect, useRef } from "react";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Send,
  User,
  Bot,
  Flame,
  CheckCircle2,
  Radio,
  Sliders,
  ChevronDown,
  MapPin,
  Tag
} from "lucide-react";
import { ChatMessage, BookingState, VoiceOption } from "../types";
import {
  playChime,
  playWavBase64,
  speakWithBrowser,
  stopCurrentAudio,
  createSpeechRecognizer,
} from "../utils/audio";

interface VoiceCallConsoleProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  bookingState: BookingState;
  setBookingState: React.Dispatch<React.SetStateAction<BookingState>>;
  isCallActive: boolean;
  setIsCallActive: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenBookingTab: () => void;
}

const AVAILABLE_VOICES: VoiceOption[] = [
  {
    id: "Kore",
    name: "Kore (Recommended)",
    tone: "Warm, Bright, Welcoming",
    gender: "Feminine",
    description: "Natural front-desk host tone with reassuring cadence",
  },
  {
    id: "Puck",
    name: "Puck",
    tone: "Friendly, Upbeat, Energetic",
    gender: "Masculine",
    description: "Fast, crisp concierge style with helpful warmth",
  },
  {
    id: "Zephyr",
    name: "Zephyr",
    tone: "Calm, Soothing, Balanced",
    gender: "Feminine",
    description: "Gentle professional tone ideal for luxury garments",
  },
  {
    id: "Fenrir",
    name: "Fenrir",
    tone: "Deep, Confident, Articulate",
    gender: "Masculine",
    description: "Authoritative and reliable operations concierge",
  },
  {
    id: "Charon",
    name: "Charon",
    tone: "Soft, Attentive, Polite",
    gender: "Masculine",
    description: "Discreet and polished customer care tone",
  },
];

const QUICK_PROMPTS = [
  {
    label: "2 Senators + Medium Starch",
    text: "Hi Alex! I have two 2-piece Senator sets. Can I get them washed and pressed with medium starch?",
    badge: "₦1,800/set",
  },
  {
    label: "Agbada Heavy Starch",
    text: "Hello! I need a 3-piece heavy Agbada washed and pressed with crisp ceremonial starch for a Saturday wedding.",
    badge: "₦3,500",
  },
  {
    label: "LASUSTECH Student Bundle",
    text: "I'm a student at LASUSTECH near Firstgate. How does the ₦3,500 weekly student bundle (8 pieces) work?",
    badge: "8 pcs • ₦3,500",
  },
  {
    label: "King Duvet & Beddings",
    text: "Can you pick up a king-size duvet and two bedsheets tomorrow morning in Agric, Ikorodu?",
    badge: "Beddings",
  },
  {
    label: "2-Piece Suit Dry Cleaning",
    text: "What is your turnaround and price for dry cleaning a 2-piece business suit in Ikorodu?",
    badge: "₦4,000",
  },
  {
    label: "₦1,500 Discount (>15 pcs)",
    text: "I have 18 pieces of clothes for my first order. How do I apply the ₦1,500 first-order discount?",
    badge: "15+ Pieces Promo",
  },
  {
    label: "Ask About ₦1,500 Rules",
    text: "Does the ₦1,500 welcome discount apply if I have 8 shirts, or do I need more than 15 pieces of clothes?",
    badge: "Eligibility Check",
  },
  {
    label: "Track Order Status (Tag FF-001)",
    text: "Hi Alex, what stage is my order Tag FF-001 currently in? Has it finished washing and quality check?",
    badge: "Live Tracking",
  },
];

export const VoiceCallConsole: React.FC<VoiceCallConsoleProps> = ({
  messages,
  setMessages,
  bookingState,
  setBookingState,
  isCallActive,
  setIsCallActive,
  onOpenBookingTab,
}) => {
  const [selectedVoice, setSelectedVoice] = useState<string>("Kore");
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isAlexSpeaking, setIsAlexSpeaking] = useState<boolean>(false);
  const [isMicListening, setIsMicListening] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [callDuration, setCallDuration] = useState<number>(0);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [micTranscript, setMicTranscript] = useState<string>("");
  const [showVoiceSettings, setShowVoiceSettings] = useState<boolean>(false);
  const [lastSpeechText, setLastSpeechText] = useState<string>("");
  const [lastAudioBase64, setLastAudioBase64] = useState<string | null>(null);

  const timerRef = useRef<any>(null);
  const recognitionRef = useRef<any>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isProcessing, micTranscript]);

  useEffect(() => {
    if (isCallActive) {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setCallDuration(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isCallActive]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartCall = async () => {
    setIsConnecting(true);
    playChime("dial");

    setTimeout(async () => {
      setIsConnecting(false);
      setIsCallActive(true);
      playChime("connect");

      const greetingText =
        "Hello and welcome to Freshfolds Laundry and Dry Cleaning here in Ikorodu! I'm Alex. How can we take care of your laundry, crisp native wear, or suits today?";

      const greetingMessage: ChatMessage = {
        id: `alex-init-${Date.now()}`,
        role: "assistant",
        content: greetingText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages([greetingMessage]);
      setLastSpeechText(greetingText);

      await synthesizeAndPlay(greetingText, selectedVoice);
    }, 1200);
  };

  const handleEndCall = () => {
    stopCurrentAudio();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    setIsMicListening(false);
    setIsAlexSpeaking(false);
    setIsCallActive(false);
    playChime("hangup");
  };

  const synthesizeAndPlay = async (text: string, voiceName: string) => {
    if (isMuted) return;
    setIsAlexSpeaking(true);

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          voiceName: voiceName || "Kore",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.audioBase64) {
          setLastAudioBase64(data.audioBase64);
          playWavBase64(
            data.audioBase64,
            () => setIsAlexSpeaking(true),
            () => setIsAlexSpeaking(false),
            playbackSpeed
          );
          return;
        }
      }
    } catch (e) {
      console.warn("TTS fetch fallback:", e);
    }

    speakWithBrowser(
      text,
      () => setIsAlexSpeaking(true),
      () => setIsAlexSpeaking(false),
      playbackSpeed
    );
  };

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim()) return;

    stopCurrentAudio();
    setIsAlexSpeaking(false);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputText("");
    setMicTranscript("");
    setIsProcessing(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          voiceName: selectedVoice,
          generateAudio: !isMuted,
          currentBookingState: bookingState,
        }),
      });

      if (!response.ok) throw new Error("Chat request failed");

      const data = await response.json();
      const alexReply =
        data.alexResponse ||
        "I'm right here! Freshfolds Ikorodu takes care of your clothes and traditional wear, plus ₦1,500 off your first order of clothes if you bring over 15 pieces.";

      if (data.extracted) {
        setBookingState((prev) => {
          const updated = { ...prev, ...data.extracted };
          if (data.extracted.discountPitched) {
            updated.discountPitched = true;
          }
          if (data.extracted.bookingStatus === "confirmed" && !updated.bookingReference) {
            const randomId = Math.floor(100 + Math.random() * 900);
            updated.bookingReference = `FF-IKD-${randomId}`;
            updated.tagNumber = `FF-${randomId}`;
            updated.driverSlot = "Ikorodu Dispatch Dispatcher #02 (Agric/Firstgate Route)";
          }
          return updated;
        });
      }

      const alexMessage: ChatMessage = {
        id: `alex-${Date.now()}`,
        role: "assistant",
        content: alexReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        audioBase64: data.audioBase64,
      };

      setMessages([...newMessages, alexMessage]);
      setLastSpeechText(alexReply);

      if (data.audioBase64 && !isMuted) {
        setLastAudioBase64(data.audioBase64);
        playWavBase64(
          data.audioBase64,
          () => setIsAlexSpeaking(true),
          () => setIsAlexSpeaking(false),
          playbackSpeed
        );
      } else if (!isMuted) {
        speakWithBrowser(
          alexReply,
          () => setIsAlexSpeaking(true),
          () => setIsAlexSpeaking(false),
          playbackSpeed
        );
      }
    } catch (err) {
      console.error("Error communicating with Alex:", err);
      const fallbackReply =
        "Freshfolds Ikorodu handles everyday wear, native attire, and duvets with free delivery within one kilometer of LASUSTECH Firstgate. How can I assist you with your booking?";

      const errorMsg: ChatMessage = {
        id: `alex-err-${Date.now()}`,
        role: "assistant",
        content: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages([...newMessages, errorMsg]);
      setLastSpeechText(fallbackReply);

      if (!isMuted) {
        speakWithBrowser(
          fallbackReply,
          () => setIsAlexSpeaking(true),
          () => setIsAlexSpeaking(false),
          playbackSpeed
        );
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleToggleMic = () => {
    if (isMicListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      setIsMicListening(false);
    } else {
      stopCurrentAudio();
      setIsAlexSpeaking(false);

      const recognizer = createSpeechRecognizer(
        (text, isFinal) => {
          setMicTranscript(text);
          if (isFinal && text.trim().length > 0) {
            handleSendMessage(text);
            setIsMicListening(false);
          }
        },
        (error) => {
          console.warn("Speech recognition notice:", error);
          setIsMicListening(false);
        },
        () => {
          setIsMicListening(false);
        }
      );

      if (recognizer) {
        recognitionRef.current = recognizer;
        try {
          recognizer.start();
          setIsMicListening(true);
        } catch (e) {
          console.error("Recognizer start error:", e);
        }
      } else {
        alert(
          "Microphone recognition is not supported in this browser. Please type directly in the box below!"
        );
      }
    }
  };

  const handleReplaySpeech = () => {
    if (!lastSpeechText) return;
    if (lastAudioBase64 && !isMuted) {
      playWavBase64(
        lastAudioBase64,
        () => setIsAlexSpeaking(true),
        () => setIsAlexSpeaking(false),
        playbackSpeed
      );
    } else {
      synthesizeAndPlay(lastSpeechText, selectedVoice);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-h-[880px] bg-slate-900/60 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
      {/* Voice Concierge Calling Room Header */}
      <div className="bg-slate-950/70 border-b border-slate-800/80 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                isAlexSpeaking
                  ? "bg-gradient-to-tr from-emerald-500 to-teal-400 ring-4 ring-emerald-500/30 scale-105"
                  : isCallActive
                  ? "bg-gradient-to-tr from-emerald-600 to-teal-500 ring-2 ring-emerald-500/30"
                  : "bg-slate-800 text-slate-400"
              }`}
            >
              <Bot className="w-6 h-6 text-white" />
            </div>
            {isCallActive && (
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-950"></span>
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                Alex
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  Freshfolds Concierge • Ikorodu
                </span>
              </h2>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-2">
              {isConnecting ? (
                <span className="text-amber-400 flex items-center gap-1 animate-pulse">
                  <Radio className="w-3.5 h-3.5" /> Dialing Freshfolds Ikorodu Desk...
                </span>
              ) : isCallActive ? (
                <span className="text-emerald-400 flex items-center gap-2 font-mono">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Call Live: {formatDuration(callDuration)}
                </span>
              ) : (
                <span className="text-slate-400 flex items-center gap-1">
                  Ready to connect • Firstgate, LASUSTECH Hub
                </span>
              )}
              <span className="text-slate-700">|</span>
              <span className="text-emerald-400 text-[11px] hidden sm:inline">
                Voice Model: gemini-3.8-flash-tts
              </span>
            </div>
          </div>
        </div>

        {/* Right Header Action Bar */}
        <div className="flex items-center gap-2">
          {/* Voice Settings Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowVoiceSettings(!showVoiceSettings)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Voice Settings"
            >
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Voice:</span>
              <span className="font-semibold text-white">{selectedVoice}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showVoiceSettings && (
              <div className="absolute right-0 mt-2 w-72 p-3 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                <div className="text-xs font-bold text-white mb-2 flex items-center justify-between">
                  <span>Gemini 3.8 Flash TTS Voice</span>
                  <span className="text-[10px] text-emerald-400">24kHz Audio</span>
                </div>
                <div className="space-y-1.5 mb-3">
                  {AVAILABLE_VOICES.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setSelectedVoice(v.id);
                        setShowVoiceSettings(false);
                      }}
                      className={`w-full text-left p-2 rounded-xl text-xs transition-colors cursor-pointer flex flex-col gap-0.5 ${
                        selectedVoice === v.id
                          ? "bg-emerald-500/20 text-emerald-200 border border-emerald-500/40"
                          : "hover:bg-slate-800 text-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold">
                        <span>{v.name}</span>
                        <span className="text-[10px] text-slate-400">{v.gender}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">{v.tone}</span>
                    </button>
                  ))}
                </div>

                <div className="border-t border-slate-800 pt-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                    <span>Speed: {playbackSpeed}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.8"
                    max="1.25"
                    step="0.05"
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              if (!isMuted) stopCurrentAudio();
              setIsMuted(!isMuted);
            }}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isMuted
                ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
                : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700"
            }`}
            title={isMuted ? "Unmute Voice" : "Mute Voice"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleReplaySpeech}
            disabled={!lastSpeechText || isAlexSpeaking}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 disabled:opacity-40 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title="Replay Alex's last sentence"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {!isCallActive ? (
            <button
              onClick={handleStartCall}
              disabled={isConnecting}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{isConnecting ? "Connecting..." : "Call Alex"}</span>
            </button>
          ) : (
            <button
              onClick={handleEndCall}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow-lg shadow-rose-600/30 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <PhoneOff className="w-3.5 h-3.5" />
              <span>End Call</span>
            </button>
          )}
        </div>
      </div>

      {/* Visualizer Banner */}
      <div className="relative py-4 px-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/70 flex items-center justify-between gap-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="relative flex items-center justify-center w-14 h-14">
            {isAlexSpeaking && (
              <span className="absolute inset-0 rounded-full bg-emerald-400/20 animate-pulse-ring" />
            )}
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isAlexSpeaking
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/50 scale-105"
                  : isMicListening
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/50 animate-pulse"
                  : "bg-slate-800 text-slate-400"
              }`}
            >
              {isAlexSpeaking ? (
                <Volume2 className="w-6 h-6 animate-bounce" />
              ) : isMicListening ? (
                <Mic className="w-6 h-6" />
              ) : (
                <Bot className="w-6 h-6" />
              )}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
              Ikorodu Live Audio Stream
            </div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              {isAlexSpeaking ? (
                <span className="text-emerald-300 flex items-center gap-2">
                  <span>Alex is speaking</span>
                  <span className="flex items-center gap-0.5 h-4">
                    <span className="w-1 bg-emerald-400 rounded-full animate-wave-bar" style={{ animationDelay: "0ms" }} />
                    <span className="w-1 bg-emerald-400 rounded-full animate-wave-bar" style={{ animationDelay: "150ms" }} />
                    <span className="w-1 bg-emerald-400 rounded-full animate-wave-bar" style={{ animationDelay: "300ms" }} />
                    <span className="w-1 bg-emerald-400 rounded-full animate-wave-bar" style={{ animationDelay: "450ms" }} />
                  </span>
                </span>
              ) : isMicListening ? (
                <span className="text-sky-300 flex items-center gap-2">
                  <span>Listening to you...</span>
                  <span className="flex items-center gap-0.5 h-4">
                    <span className="w-1 bg-sky-400 rounded-full animate-wave-bar" style={{ animationDelay: "0ms" }} />
                    <span className="w-1 bg-sky-400 rounded-full animate-wave-bar" style={{ animationDelay: "200ms" }} />
                    <span className="w-1 bg-sky-400 rounded-full animate-wave-bar" style={{ animationDelay: "400ms" }} />
                  </span>
                </span>
              ) : isProcessing ? (
                <span className="text-amber-300 animate-pulse">Alex is calculating prices...</span>
              ) : isCallActive ? (
                <span className="text-slate-300">Alex is listening. Tap mic or ask a question below!</span>
              ) : (
                <span className="text-slate-400">Click &quot;Call Alex&quot; to speak directly with Freshfolds</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Info Widget */}
        <div className="hidden md:flex items-center gap-3 relative z-10">
          <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-2xl flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-400/10 text-amber-300 border border-amber-400/20">
              <Tag className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[11px] font-semibold text-amber-300 flex items-center gap-1">
                <span>₦1,500 Welcome Credit</span>
                {bookingState.discountPitched && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </div>
              <div className="text-xs text-slate-300 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-sky-400" />
                <span>{bookingState.deliveryArea || "Ikorodu Environs"}</span>
              </div>
            </div>
            <button
              onClick={onOpenBookingTab}
              className="ml-1 text-xs px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 cursor-pointer font-medium transition-colors"
            >
              View Dispatch
            </button>
          </div>
        </div>
      </div>

      {/* Transcript Conversation Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 shadow-xl">
              <Phone className="w-8 h-8 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Freshfolds Ikorodu Voice Concierge
            </h3>
            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              Alex is ready to answer questions about everyday wear, Senator & Agbada custom starching,
              LASUSTECH student bundles, dry cleaning, and book your pickup in Ikorodu with{" "}
              <span className="text-amber-300 font-semibold">₦1,500 OFF</span> your first order of clothes (for orders exceeding 15 pieces)!
            </p>
            <button
              onClick={handleStartCall}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold text-sm shadow-xl shadow-emerald-500/20 transition-all cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Connect with Alex Now</span>
            </button>
          </div>
        ) : (
          messages.map((message) => {
            const isAlex = message.role === "assistant";
            return (
              <div
                key={message.id}
                className={`flex gap-3 max-w-2xl ${
                  isAlex ? "mr-auto" : "ml-auto flex-row-reverse"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                    isAlex
                      ? "bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20"
                      : "bg-slate-700 text-slate-200"
                  }`}
                >
                  {isAlex ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed transition-all ${
                    isAlex
                      ? "bg-slate-800/90 text-slate-100 border border-slate-700 shadow-lg"
                      : "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-1 text-[11px] opacity-70">
                    <span className="font-semibold">
                      {isAlex ? "Alex (Freshfolds Ikorodu Concierge)" : "You (Caller)"}
                    </span>
                    <span>{message.timestamp}</span>
                  </div>

                  <p className="whitespace-pre-wrap">{message.content}</p>

                  {isAlex && (
                    <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs">
                      <button
                        onClick={() => {
                          if (message.audioBase64) {
                            playWavBase64(
                              message.audioBase64,
                              () => setIsAlexSpeaking(true),
                              () => setIsAlexSpeaking(false),
                              playbackSpeed
                            );
                          } else {
                            synthesizeAndPlay(message.content, selectedVoice);
                          }
                        }}
                        className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Listen to Alex</span>
                      </button>

                      <span className="text-[10px] text-slate-400">
                        {message.audioBase64 ? "Synthesized via Gemini TTS" : ""}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}

        {micTranscript && (
          <div className="flex gap-3 max-w-2xl ml-auto flex-row-reverse animate-pulse">
            <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-bold bg-sky-600 text-white">
              <Mic className="w-4 h-4" />
            </div>
            <div className="rounded-2xl px-4 py-3 text-sm bg-sky-600/40 text-sky-100 border border-sky-500/50">
              <div className="text-[11px] opacity-75 mb-0.5">Speaking into mic...</div>
              <p>{micTranscript}</p>
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="flex gap-3 max-w-2xl mr-auto">
            <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-bold bg-slate-800 text-slate-300">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="rounded-2xl px-4 py-3 text-sm bg-slate-800/80 border border-slate-700 text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Alex is checking Ikorodu pricing and driver route...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Caller Prompts */}
      <div className="bg-slate-950/80 border-t border-slate-800/80 px-4 py-2 overflow-x-auto scrollbar-none flex items-center gap-2 text-xs">
        <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          Ikorodu Scenarios:
        </span>
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt.text)}
            disabled={!isCallActive}
            className="whitespace-nowrap px-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
          >
            <span>{prompt.label}</span>
            <span className="text-[10px] text-emerald-400 font-medium">({prompt.badge})</span>
          </button>
        ))}
      </div>

      {/* Input / Control Bar */}
      <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center gap-2">
        <button
          onClick={handleToggleMic}
          disabled={!isCallActive}
          className={`p-3 rounded-2xl transition-all cursor-pointer flex-shrink-0 ${
            isMicListening
              ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30 animate-pulse"
              : isCallActive
              ? "bg-emerald-500 hover:bg-emerald-400 text-white shadow-md shadow-emerald-500/20"
              : "bg-slate-800 text-slate-500 cursor-not-allowed"
          }`}
          title={isMicListening ? "Stop listening" : "Speak to Alex"}
        >
          {isMicListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputText);
          }}
          className="flex-1 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={!isCallActive}
            placeholder={
              isCallActive
                ? isMicListening
                  ? "Listening to your voice..."
                  : "Ask Alex about Senator washing, starch, prices in Naira, or pickup around Ikorodu..."
                : "Click 'Call Alex' above to start your voice conversation..."
            }
            className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={!isCallActive || !inputText.trim() || isProcessing}
            className="p-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-white shadow-md shadow-emerald-500/20 transition-all cursor-pointer flex-shrink-0"
            title="Send to Alex"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

