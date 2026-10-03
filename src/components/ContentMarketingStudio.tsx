import React, { useState, useEffect } from "react";
import {
  Lightbulb,
  FileText,
  Mic,
  Video,
  Subtitles,
  Image as ImageIcon,
  Share2,
  Send,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Calendar,
  Volume2,
  Clock,
  Layers,
  Smartphone,
  ExternalLink,
  Tag,
  Zap,
  RefreshCw,
  Sliders,
  MessageSquare,
  Instagram,
  Facebook,
  Twitter,
  Eye,
  Download,
  AlertCircle
} from "lucide-react";
import {
  ContentPipelineStep,
  ContentIdea,
  AIScriptOutput,
  AIVoiceConfig,
  VideoRenderMockup,
  CaptionTrack,
  ThumbnailConfig,
  SocialPostBundle,
  PublishScheduleRecord
} from "../types";
import {
  FRESHCARE_CONTENT_IDEAS,
  FRESHCARE_VOICE_CONFIGS,
  generateContentScript,
  generateCaptionTrack,
  generateSocialPostBundle
} from "../server/contentAndAnalyticsEngine";
import { FreshcareLogo } from "./FreshFoldLogo";

interface ContentMarketingStudioProps {
  onOpenOrderFunnel?: () => void;
  onOpenWhatsAppFlow?: () => void;
}

export const ContentMarketingStudio: React.FC<ContentMarketingStudioProps> = ({
  onOpenOrderFunnel,
  onOpenWhatsAppFlow,
}) => {
  const [currentStep, setCurrentStep] = useState<ContentPipelineStep>("idea");
  const [selectedIdea, setSelectedIdea] = useState<ContentIdea>(FRESHCARE_CONTENT_IDEAS[0]);
  const [customIdeaTitle, setCustomIdeaTitle] = useState("");
  const [customIdeaHook, setCustomIdeaHook] = useState("");
  const [customAudience, setCustomAudience] = useState<ContentIdea["targetAudience"]>("working_class");
  const [customTone, setCustomTone] = useState<ContentIdea["tone"]>("relatable_nigerian");

  // Script state
  const [script, setScript] = useState<AIScriptOutput | null>(null);
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [creatorNotes, setCreatorNotes] = useState("");

  // Voice state
  const [selectedVoice, setSelectedVoice] = useState<AIVoiceConfig>(FRESHCARE_VOICE_CONFIGS[0]);
  const [voiceSpeed, setVoiceSpeed] = useState(1.0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechSynthesisActive, setSpeechSynthesisActive] = useState(false);

  // Video mockup state
  const [videoConfig, setVideoConfig] = useState<VideoRenderMockup>({
    aspectRatio: "9:16",
    backgroundColor: "#022c22",
    videoBadge: "₦1,500 WELCOME DISCOUNT",
    logoOverlay: true,
    watermark: "@freshcare.lagos",
    motionPreset: "dynamic_zoom",
  });
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // Captions state
  const [captionTrack, setCaptionTrack] = useState<CaptionTrack | null>(null);
  const [captionStyle, setCaptionStyle] = useState<CaptionTrack["style"]>("hormozi_bold");

  // Thumbnail state
  const [thumbnailConfig, setThumbnailConfig] = useState<ThumbnailConfig>({
    headline: "STOP WASHING SENATOR LIKE T-SHIRT! 🛑",
    subHeadline: "Ikorodu Drycleaner Reveals The Secret",
    badgeText: "₦1,500 OFF 15+ PCS",
    themeColor: "emerald",
    showSticker: true,
    stickerText: "ZERO-MIX GUARANTEED",
    beforeAfterMockup: true,
    garmentIcon: "👔",
  });

  // Social posts state
  const [socialPosts, setSocialPosts] = useState<SocialPostBundle | null>(null);
  const [selectedSocialTab, setSelectedSocialTab] = useState<"instagram" | "tiktok" | "whatsapp" | "facebook" | "x">("whatsapp");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Publish state
  const [scheduleDate, setScheduleDate] = useState("2026-10-04");
  const [scheduleTime, setScheduleTime] = useState("17:30");
  const [targetPlatforms, setTargetPlatforms] = useState<string[]>([
    "whatsapp_status",
    "instagram_reels",
    "tiktok",
  ]);
  const [publishStatus, setPublishStatus] = useState<"idle" | "publishing" | "published">("idle");
  const [scheduledList, setScheduledList] = useState<PublishScheduleRecord[]>([
    {
      id: "pub-001",
      contentTitle: "How to Keep White Senator Native Attire Crisp & Spotless",
      platforms: ["Instagram Reels", "WhatsApp Status", "TikTok"],
      scheduledTime: "Tomorrow · 5:30 PM",
      status: "scheduled",
      reachEstimate: "48,000 views · ~120 WhatsApp inquiries",
    },
    {
      id: "pub-002",
      contentTitle: "LASUSTECH Student Exam Laundry Rush ₦1,500 Off",
      platforms: ["WhatsApp Status", "TikTok", "Facebook"],
      scheduledTime: "Friday · 11:00 AM",
      status: "scheduled",
      reachEstimate: "65,000 views · ~190 student bookings",
    },
  ]);

  // Initial load: generate script for first idea
  useEffect(() => {
    handleGenerateScript(selectedIdea);
  }, []);

  const handleGenerateScript = async (idea: ContentIdea) => {
    setIsGeneratingScript(true);
    try {
      const res = await fetch("/api/content/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, customNotes: creatorNotes }),
      });
      const data = await res.json();
      if (data.success && data.script) {
        setScript(data.script);
        const caps = generateCaptionTrack(data.script);
        setCaptionTrack(caps);
        const posts = generateSocialPostBundle(data.script);
        setSocialPosts(posts);
        setThumbnailConfig((prev) => ({
          ...prev,
          headline: data.script.hookHeadline.toUpperCase(),
          subHeadline: data.script.keySellingPoints[0] || "Freshcare Laundry Firstgate Ikorodu",
        }));
      } else {
        // Fallback locally
        const fallbackScript = await generateContentScript(idea, creatorNotes, null);
        setScript(fallbackScript);
        setCaptionTrack(generateCaptionTrack(fallbackScript));
        setSocialPosts(generateSocialPostBundle(fallbackScript));
      }
    } catch {
      const fallbackScript = await generateContentScript(idea, creatorNotes, null);
      setScript(fallbackScript);
      setCaptionTrack(generateCaptionTrack(fallbackScript));
      setSocialPosts(generateSocialPostBundle(fallbackScript));
    } finally {
      setIsGeneratingScript(false);
    }
  };

  const handleSpeechPreview = () => {
    if (!script) return;
    if ("speechSynthesis" in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        setSpeechSynthesisActive(false);
        return;
      }
      window.speechSynthesis.cancel();
      const currentScene = script.scenes[activeSceneIndex] || script.scenes[0];
      const utterance = new SpeechSynthesisUtterance(currentScene.narration);
      utterance.rate = voiceSpeed;
      utterance.pitch = selectedVoice.pitch;
      utterance.onend = () => {
        setIsPlayingAudio(false);
        setSpeechSynthesisActive(false);
      };
      setIsPlayingAudio(true);
      setSpeechSynthesisActive(true);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 3000);
    }
  };

  const handlePlayVideoToggle = () => {
    if (!script) return;
    setIsPlayingVideo(!isPlayingVideo);
  };

  // Video playback timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingVideo && script) {
      interval = setInterval(() => {
        setActiveSceneIndex((prev) => (prev + 1) % script.scenes.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlayingVideo, script]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handlePublishExecution = () => {
    if (!script) return;
    setPublishStatus("publishing");
    setTimeout(() => {
      setPublishStatus("published");
      const newRecord: PublishScheduleRecord = {
        id: `pub-${Date.now()}`,
        contentTitle: script.title,
        platforms: targetPlatforms.map((p) => p.replace("_", " ").toUpperCase()),
        scheduledTime: `${scheduleDate} at ${scheduleTime}`,
        status: "scheduled",
        reachEstimate: "Est. 52,000 views · 140+ WhatsApp chats",
        liveUrl: "https://wa.me/2348032345678",
      };
      setScheduledList((prev) => [newRecord, ...prev]);
    }, 1200);
  };

  const pipelineSteps: { id: ContentPipelineStep; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "idea", label: "Idea", icon: Lightbulb },
    { id: "script", label: "AI Script", icon: FileText },
    { id: "voice", label: "AI Voice", icon: Mic },
    { id: "video", label: "Video", icon: Video },
    { id: "captions", label: "Captions", icon: Subtitles },
    { id: "thumbnail", label: "Thumbnail", icon: ImageIcon },
    { id: "social_post", label: "Social Post", icon: Share2 },
    { id: "publish", label: "Publish", icon: Send },
  ];

  const currentStepIndex = pipelineSteps.findIndex((s) => s.id === currentStep);

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950/40 to-slate-900 border border-teal-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Sparkles className="w-48 h-48 text-teal-400" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-teal-400" />
                AI Content Marketing & Social Media Automation Engine
              </span>
              <span className="text-xs text-slate-400">Freshcare • Ikorodu, Lagos</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Video & Viral Marketing Pipeline
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-3xl">
              Turn laundry and drycleaning care ideas into viral 9:16 vertical videos, realistic AI voiceovers,
              Hormozi-style burned-in captions, eye-catching thumbnails, and multi-platform social posts ready to publish to WhatsApp, Instagram, and TikTok.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                if (script) handleGenerateScript(selectedIdea);
              }}
              disabled={isGeneratingScript}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/40 hover:bg-teal-500/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingScript ? "animate-spin" : ""}`} />
              Regenerate Content
            </button>
            {onOpenWhatsAppFlow && (
              <button
                onClick={onOpenWhatsAppFlow}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-950/40 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp Agent Flow
              </button>
            )}
          </div>
        </div>

        {/* 8-Stage Interactive Pipeline Stepper */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
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
                      ? "bg-teal-500 text-white border-teal-400 shadow-lg shadow-teal-500/25 scale-[1.02]"
                      : isPast
                      ? "bg-slate-800/80 text-emerald-300 border-emerald-500/30 hover:bg-slate-800"
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
                  <div className={`text-[10px] mt-0.5 truncate ${isCurrent ? "text-teal-100" : "text-slate-500"}`}>
                    {idx === 0
                      ? "Idea Lab"
                      : idx === 1
                      ? "Scenes & Hook"
                      : idx === 2
                      ? "Voice Synthesizer"
                      : idx === 3
                      ? "9:16 Mockup"
                      : idx === 4
                      ? "Hormozi Style"
                      : idx === 5
                      ? "CTR Graphic"
                      : idx === 6
                      ? "Omnichannel"
                      : "Schedule"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area per Step */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Step Workspace (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* STEP 1: IDEA */}
          {currentStep === "idea" && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Stage 1: Content Idea Lab</h2>
                    <p className="text-xs text-slate-400">Select a tested viral concept or compose a custom angle for Ikorodu laundry customers</p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {FRESHCARE_CONTENT_IDEAS.length} Presets Available
                </span>
              </div>

              {/* Preset Cards Grid */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Top Recommended Freshcare Viral Concepts
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FRESHCARE_CONTENT_IDEAS.map((idea) => {
                    const isSelected = selectedIdea.id === idea.id;
                    return (
                      <div
                        key={idea.id}
                        onClick={() => {
                          setSelectedIdea(idea);
                          handleGenerateScript(idea);
                        }}
                        className={`p-4 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                          isSelected
                            ? "bg-teal-950/40 border-teal-500 shadow-md shadow-teal-500/10"
                            : "bg-slate-800/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/70"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold text-teal-400 bg-teal-500/20 px-2 py-0.5 rounded-full border border-teal-500/30">
                            <Check className="w-3 h-3" /> Selected
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider">
                              {idea.topicCategory.replace("_", " ")}
                            </span>
                            <span className="text-slate-600 text-[10px]">•</span>
                            <span className="text-[10px] text-slate-400">
                              {idea.targetAudience.replace("_", " ")}
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-white mb-2">{idea.title}</h3>
                          <p className="text-xs text-slate-300 italic mb-3">"{idea.hook}"</p>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-emerald-400 pt-2 border-t border-slate-800/60 font-medium">
                          <span>{idea.estimatedEngagement}</span>
                          <span className="text-slate-400 capitalize">{idea.tone.replace("_", " ")}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Custom Concept Input */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Or Compose a Custom Content Concept
                  </h4>
                  <span className="text-[11px] text-slate-400">Powered by Gemini AI Scriptwriter</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Concept Title / Topic</label>
                    <input
                      type="text"
                      placeholder="e.g. Why Washing Duvets in Home Machines Destroys Motors"
                      value={customIdeaTitle}
                      onChange={(e) => setCustomIdeaTitle(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Opening 3-Second Hook</label>
                    <input
                      type="text"
                      placeholder="e.g. Do not put that heavy duvet into that 7kg top-loader!"
                      value={customIdeaHook}
                      onChange={(e) => setCustomIdeaHook(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400">Tone:</span>
                    <select
                      value={customTone}
                      onChange={(e) => setCustomTone(e.target.value as any)}
                      className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none"
                    >
                      <option value="relatable_nigerian">Relatable Nigerian Pidgin/English</option>
                      <option value="professional">Professional & Authoritative</option>
                      <option value="humorous">Humorous & Entertaining</option>
                      <option value="urgent_deal">Urgent Promotional Deal</option>
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      if (!customIdeaTitle) return;
                      const customObj: ContentIdea = {
                        id: `custom-${Date.now()}`,
                        title: customIdeaTitle,
                        hook: customIdeaHook || customIdeaTitle,
                        topicCategory: "behind_the_scenes",
                        targetAudience: customAudience,
                        targetPlatform: "instagram_reels",
                        tone: customTone,
                        estimatedEngagement: "Custom campaign · Real-time AI generated",
                      };
                      setSelectedIdea(customObj);
                      handleGenerateScript(customObj);
                    }}
                    disabled={!customIdeaTitle || isGeneratingScript}
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-white transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-teal-500/20"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Generate AI Script for Custom Idea
                  </button>
                </div>
              </div>

              {/* Navigation button */}
              <div className="flex justify-end pt-4 border-t border-slate-800">
                <button
                  onClick={() => setCurrentStep("script")}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-teal-500/20"
                >
                  Proceed to AI Scriptwriter
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: AI SCRIPT */}
          {currentStep === "script" && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Stage 2: AI Video Script</h2>
                    <p className="text-xs text-slate-400">Structured scene-by-scene storyboard optimized for 30s–45s viral completion rate</p>
                  </div>
                </div>

                <button
                  onClick={() => handleGenerateScript(selectedIdea)}
                  disabled={isGeneratingScript}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingScript ? "animate-spin" : ""}`} />
                  Regenerate Scenes
                </button>
              </div>

              {isGeneratingScript ? (
                <div className="p-12 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-teal-400 animate-spin mx-auto" />
                  <p className="text-sm font-semibold text-slate-200">Gemini is drafting scene visuals & relatable narration...</p>
                  <p className="text-xs text-slate-500">Injecting Freshcare Ikorodu local landmarks, starch rules, and ₦1,500 discount</p>
                </div>
              ) : script ? (
                <div className="space-y-4">
                  {/* Script Header Bar */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-bold uppercase text-teal-400 tracking-wider">Hook Headline</div>
                      <h3 className="text-sm font-bold text-amber-300 mt-0.5">"{script.hookHeadline}"</h3>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-sky-400" /> {script.totalDurationSeconds} Seconds
                      </span>
                      <span className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-emerald-400" /> {script.scenes.length} Scenes
                      </span>
                    </div>
                  </div>

                  {/* Scene by Scene Breakdown */}
                  <div className="space-y-3">
                    {script.scenes.map((scene, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border transition-all ${
                          activeSceneIndex === idx
                            ? "bg-teal-950/20 border-teal-500/50 shadow-md"
                            : "bg-slate-800/40 border-slate-800"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center text-xs font-bold">
                              {scene.sceneNumber}
                            </span>
                            <span className="text-xs font-semibold text-white">
                              Scene {scene.sceneNumber} ({scene.durationSeconds}s)
                            </span>
                          </div>
                          {scene.soundEffectOrBGM && (
                            <span className="text-[10px] text-amber-300/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                              🎵 {scene.soundEffectOrBGM}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                              <Video className="w-3 h-3 text-sky-400" /> Visual Direction
                            </div>
                            <p className="text-slate-300 leading-relaxed">{scene.visualDescription}</p>
                            <div className="mt-2 text-[10px] font-bold text-teal-400 bg-teal-950/50 p-1.5 rounded border border-teal-900/60">
                              Text Overlay: "{scene.onScreenText}"
                            </div>
                          </div>

                          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                              <Mic className="w-3 h-3 text-emerald-400" /> Spoken Narration (Voiceover)
                            </div>
                            <p className="text-slate-200 leading-relaxed font-serif italic">"{scene.narration}"</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Banner */}
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-bold text-emerald-300">Call to Action: </span>
                      <span className="text-slate-200">{script.callToAction}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(script.callToAction, "cta")}
                      className="text-[10px] font-semibold text-emerald-300 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === "cta" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      Copy CTA
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setCurrentStep("idea")}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Idea
                </button>
                <button
                  onClick={() => setCurrentStep("voice")}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-teal-500/20"
                >
                  Proceed to AI Voice Studio
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: AI VOICE */}
          {currentStep === "voice" && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Mic className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Stage 3: AI Voice Synthesizer</h2>
                    <p className="text-xs text-slate-400">Select authentic Nigerian voice personas and test audio narration</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSpeechPreview}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      isPlayingAudio
                        ? "bg-rose-600 text-white animate-pulse"
                        : "bg-teal-500 hover:bg-teal-400 text-white shadow-md shadow-teal-500/20"
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <Pause className="w-3.5 h-3.5" /> Stop Voice Preview
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5" /> Play Voiceover Preview
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Voice Personas Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FRESHCARE_VOICE_CONFIGS.map((v) => {
                  const isSelected = selectedVoice.voiceId === v.voiceId;
                  return (
                    <div
                      key={v.voiceId}
                      onClick={() => setSelectedVoice(v)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-purple-950/30 border-purple-500 shadow-md shadow-purple-500/10"
                          : "bg-slate-800/40 border-slate-800 hover:bg-slate-800/60"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-white">{v.voiceLabel}</span>
                        {isSelected && <span className="text-xs text-purple-400 font-bold">Active</span>}
                      </div>
                      <p className="text-xs text-slate-400 mb-3">{v.accent}</p>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/60">
                        <span>Speed: {v.speed}x</span>
                        <span>Pitch: {v.pitch}</span>
                        <span className="text-purple-300 font-semibold">Gemini Flash TTS</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Voice Tuning Controls */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-teal-400" />
                  Voice Tuning & Audio Waveform Controls
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                      <span>Speaking Cadence / Speed</span>
                      <span className="font-bold text-teal-400">{voiceSpeed.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.8"
                      max="1.4"
                      step="0.05"
                      value={voiceSpeed}
                      onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
                      className="w-full accent-teal-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>Calm (0.8x)</span>
                      <span>Normal (1.0x)</span>
                      <span>Fast / TikTok Hype (1.4x)</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-300 mb-1">Narration Segment in Cue</div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 italic">
                      "{script?.scenes[activeSceneIndex]?.narration || selectedIdea.hook}"
                    </div>
                  </div>
                </div>

                {/* Animated sound wave simulation */}
                <div className="h-10 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-center gap-1 px-4">
                  {[...Array(32)].map((_, i) => (
                    <span
                      key={i}
                      className={`w-1 rounded-full bg-teal-400 transition-all duration-150 ${
                        isPlayingAudio
                          ? "animate-pulse"
                          : "opacity-30"
                      }`}
                      style={{
                        height: isPlayingAudio
                          ? `${Math.max(15, (Math.sin(i * 0.5 + Date.now() * 0.01) + 1) * 16)}px`
                          : "6px",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setCurrentStep("script")}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Script
                </button>
                <button
                  onClick={() => setCurrentStep("video")}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-teal-500/20"
                >
                  Proceed to Video Studio Mockup
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: VIDEO */}
          {currentStep === "video" && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Stage 4: 9:16 Video Render Mockup</h2>
                    <p className="text-xs text-slate-400">Mobile vertical preview with active scene switcher, overlays, and brand branding</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePlayVideoToggle}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      isPlayingVideo
                        ? "bg-amber-600 text-white"
                        : "bg-teal-500 hover:bg-teal-400 text-white shadow-md shadow-teal-500/20"
                    }`}
                  >
                    {isPlayingVideo ? (
                      <>
                        <Pause className="w-3.5 h-3.5" /> Pause Video Reel
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" /> Play Reel Animation
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Video Player Display */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                {/* 9:16 Smartphone Frame */}
                <div className="w-[280px] sm:w-[320px] h-[520px] rounded-3xl bg-slate-900 border-4 border-slate-700 shadow-2xl relative overflow-hidden flex flex-col justify-between p-4">
                  {/* Smartphone Top Notch & Live Status */}
                  <div className="flex items-center justify-between z-10">
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-white">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      <span>REELS</span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-amber-500/30">
                      {videoConfig.videoBadge}
                    </span>
                  </div>

                  {/* Dynamic Scene Visual Area */}
                  <div className="my-auto text-center space-y-4 z-10 px-2">
                    <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center mx-auto shadow-lg shadow-teal-500/30">
                      <FreshcareLogo size="sm" showTagline={false} />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-teal-400 uppercase tracking-widest">
                        SCENE 0{activeSceneIndex + 1} OF 0{script?.scenes.length || 5}
                      </span>
                      <h4 className="text-base font-extrabold text-white leading-tight">
                        {script?.scenes[activeSceneIndex]?.onScreenText || "FRESHCARE IKORODU"}
                      </h4>
                    </div>

                    {/* Spoken subtitle card (Hormozi style bold) */}
                    <div className="bg-black/85 backdrop-blur-md border border-teal-500/40 rounded-xl p-3 shadow-xl">
                      <p className="text-xs font-black text-amber-300 tracking-wide uppercase">
                        "{script?.scenes[activeSceneIndex]?.narration || selectedIdea.hook}"
                      </p>
                    </div>
                  </div>

                  {/* Smartphone Bottom Actions & Watermark */}
                  <div className="z-10 space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-slate-300 bg-black/60 backdrop-blur-md p-2 rounded-xl">
                      <span className="font-bold text-teal-300">@freshcare.lagos</span>
                      <span>📍 Firstgate LASUSTECH</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-teal-400 h-full transition-all duration-300"
                        style={{
                          width: `${(((activeSceneIndex + 1) / (script?.scenes.length || 5)) * 100).toFixed(0)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Right: Scene Selector & Config Options */}
                <div className="flex-1 space-y-4 w-full">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Interactive Scene Timeline Jump
                  </h4>
                  <div className="space-y-2">
                    {script?.scenes.map((scene, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSceneIndex(idx)}
                        className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between text-xs ${
                          activeSceneIndex === idx
                            ? "bg-teal-500 text-white border-teal-400 shadow-md shadow-teal-500/20"
                            : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            activeSceneIndex === idx ? "bg-white text-teal-700" : "bg-slate-800 text-slate-400"
                          }`}>
                            {scene.sceneNumber}
                          </span>
                          <span className="font-medium truncate max-w-[240px]">{scene.onScreenText}</span>
                        </div>
                        <span className="text-[10px] opacity-80">{scene.durationSeconds}s</span>
                      </button>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                    <div className="font-bold text-slate-200">Video Render Settings</div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                      <div>Format: 1080x1920 (9:16 Vertical)</div>
                      <div>FPS: 60 FPS (Ultra Smooth)</div>
                      <div>Audio: 48kHz Stereo Master</div>
                      <div>Watermark: @freshcare.lagos</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setCurrentStep("voice")}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to AI Voice
                </button>
                <button
                  onClick={() => setCurrentStep("captions")}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-teal-500/20"
                >
                  Proceed to Burned-in Captions
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: CAPTIONS */}
          {currentStep === "captions" && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Subtitles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Stage 5: Burned-in Captions & Subtitles</h2>
                    <p className="text-xs text-slate-400">Auto-synchronized Alex Hormozi / TikTok bold subtitles with keyword highlights</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (captionTrack) {
                      const srtContent = captionTrack.captions
                        .map((c, i) => `${i + 1}\n${c.timestamp},000 --> 00:0${(i + 1) * 8},000\n${c.text}\n`)
                        .join("\n");
                      copyToClipboard(srtContent, "srt");
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedKey === "srt" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Export SRT Subtitle File
                </button>
              </div>

              {/* Caption Style Switcher */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "hormozi_bold", label: "Hormozi Bold (Viral)" },
                  { id: "clean_subtitles", label: "Clean Minimalist" },
                  { id: "neon_glow", label: "Neon Glow" },
                  { id: "minimal_white", label: "White Boxed" },
                ].map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setCaptionStyle(style.id as any)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      captionStyle === style.id
                        ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20"
                        : "bg-slate-800/60 text-slate-300 border-slate-800 hover:bg-slate-800"
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>

              {/* Live Caption Visual Preview */}
              <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 text-center space-y-4">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Live On-Screen Subtitle Rendering
                </div>

                <div className="py-4">
                  <div className="inline-block bg-slate-900/90 border-2 border-amber-500/60 rounded-2xl px-6 py-4 shadow-2xl">
                    <p className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                      <span>STOP WASHING </span>
                      <span className="text-amber-400 underline decoration-amber-500 decoration-4">YOUR SENATOR </span>
                      <span className="text-emerald-400">LIKE T-SHIRTS! </span>
                    </p>
                    <p className="text-xs font-bold text-teal-300 mt-1 tracking-wider">
                      ZERO-MIX GUARANTEED • ₦1,500 WELCOME DISCOUNT
                    </p>
                  </div>
                </div>
              </div>

              {/* Synchronized Caption Lines Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Timeline Timestamp Alignment
                </h4>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {captionTrack?.captions.map((cap, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800/60">
                          {cap.timestamp}
                        </span>
                        <span className="text-white font-medium">{cap.text}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">Auto-synced</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setCurrentStep("video")}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Video
                </button>
                <button
                  onClick={() => setCurrentStep("thumbnail")}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-teal-500/20"
                >
                  Proceed to Thumbnail Designer
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: THUMBNAIL */}
          {currentStep === "thumbnail" && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Stage 6: Viral Thumbnail Studio</h2>
                    <p className="text-xs text-slate-400">High click-through-rate cover graphic with bold typography and badge overlays</p>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(JSON.stringify(thumbnailConfig, null, 2), "thumb_cfg")}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedKey === "thumb_cfg" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Config
                </button>
              </div>

              {/* Live Thumbnail Visual Canvas */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex justify-center">
                <div className="w-full max-w-lg aspect-video rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border-2 border-emerald-500/40 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Sparkles className="w-40 h-40 text-emerald-400" />
                  </div>

                  {/* Top Badges */}
                  <div className="flex items-center justify-between z-10">
                    <div className="bg-emerald-500 text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
                      {thumbnailConfig.badgeText}
                    </div>
                    <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-teal-300 border border-teal-500/30">
                      📍 FIRSTGATE IKORODU
                    </div>
                  </div>

                  {/* Center Big Punchy Headline */}
                  <div className="my-auto z-10 space-y-2">
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight uppercase drop-shadow-md">
                      {thumbnailConfig.headline}
                    </h3>
                    <p className="text-xs font-bold text-amber-300 tracking-wide uppercase drop-shadow">
                      {thumbnailConfig.subHeadline}
                    </p>
                  </div>

                  {/* Bottom Strip */}
                  <div className="flex items-center justify-between z-10 pt-2 border-t border-emerald-500/30">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{thumbnailConfig.garmentIcon}</span>
                      <span className="text-[11px] font-bold text-emerald-300 uppercase">
                        {thumbnailConfig.stickerText}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-300 bg-black/60 px-2 py-0.5 rounded">
                      WhatsApp 0803 234 5678
                    </span>
                  </div>
                </div>
              </div>

              {/* Thumbnail Customization Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Headline Text</label>
                  <input
                    type="text"
                    value={thumbnailConfig.headline}
                    onChange={(e) => setThumbnailConfig({ ...thumbnailConfig, headline: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Subheadline / Selling Point</label>
                  <input
                    type="text"
                    value={thumbnailConfig.subHeadline}
                    onChange={(e) => setThumbnailConfig({ ...thumbnailConfig, subHeadline: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Corner Discount Badge</label>
                  <input
                    type="text"
                    value={thumbnailConfig.badgeText}
                    onChange={(e) => setThumbnailConfig({ ...thumbnailConfig, badgeText: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Guarantee Sticker</label>
                  <input
                    type="text"
                    value={thumbnailConfig.stickerText}
                    onChange={(e) => setThumbnailConfig({ ...thumbnailConfig, stickerText: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setCurrentStep("captions")}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Captions
                </button>
                <button
                  onClick={() => setCurrentStep("social_post")}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-teal-500/20"
                >
                  Proceed to Social Post Composer
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 7: SOCIAL POST */}
          {currentStep === "social_post" && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Stage 7: Multi-Platform Social Post Composer</h2>
                    <p className="text-xs text-slate-400">Platform-optimized copy, hashtags, and CTA links tailored for Lagos audiences</p>
                  </div>
                </div>
              </div>

              {/* Social Platform Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
                {[
                  { id: "whatsapp", label: "WhatsApp Status (Primary)", icon: MessageSquare, color: "text-emerald-400" },
                  { id: "instagram", label: "Instagram Reels", icon: Instagram, color: "text-pink-400" },
                  { id: "tiktok", label: "TikTok", icon: Video, color: "text-sky-400" },
                  { id: "facebook", label: "Facebook Page", icon: Facebook, color: "text-blue-400" },
                  { id: "x", label: "X (Twitter)", icon: Twitter, color: "text-slate-200" },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = selectedSocialTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedSocialTab(tab.id as any)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? "bg-teal-500 text-white shadow-md shadow-teal-500/20"
                          : "bg-slate-800/80 text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : tab.color}`} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Active Tab Preview */}
              {socialPosts && (
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                  {selectedSocialTab === "whatsapp" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                          <MessageSquare className="w-4 h-4" /> WhatsApp Status Text & Video Caption
                        </span>
                        <button
                          onClick={() => copyToClipboard(socialPosts.whatsappStatus.textStatus, "wa_status")}
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1 transition-all cursor-pointer"
                        >
                          {copiedKey === "wa_status" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          Copy WhatsApp Status
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-slate-200 font-mono whitespace-pre-line leading-relaxed">
                        {socialPosts.whatsappStatus.textStatus}
                      </div>

                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-slate-400">Direct WhatsApp Click-to-Chat Link:</span>
                        <a
                          href={socialPosts.whatsappStatus.callNowLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                        >
                          wa.me/2348032345678 <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}

                  {selectedSocialTab === "instagram" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-pink-400 flex items-center gap-1.5">
                          <Instagram className="w-4 h-4" /> Instagram Reels Caption & Hashtags
                        </span>
                        <button
                          onClick={() => copyToClipboard(socialPosts.instagramReels.caption, "ig_caption")}
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-pink-600 hover:bg-pink-500 text-white flex items-center gap-1 transition-all cursor-pointer"
                        >
                          {copiedKey === "ig_caption" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          Copy Instagram Caption
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                        {socialPosts.instagramReels.caption}
                      </div>
                    </div>
                  )}

                  {selectedSocialTab === "tiktok" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                          <Video className="w-4 h-4" /> TikTok Viral Caption & Sound
                        </span>
                        <button
                          onClick={() => copyToClipboard(socialPosts.tiktok.caption, "tiktok_caption")}
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white flex items-center gap-1 transition-all cursor-pointer"
                        >
                          {copiedKey === "tiktok_caption" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          Copy TikTok Caption
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                        {socialPosts.tiktok.caption}
                      </div>
                    </div>
                  )}

                  {selectedSocialTab === "facebook" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                          <Facebook className="w-4 h-4" /> Facebook Business Post Body
                        </span>
                        <button
                          onClick={() => copyToClipboard(socialPosts.facebookPage.postBody, "fb_body")}
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1 transition-all cursor-pointer"
                        >
                          {copiedKey === "fb_body" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          Copy Facebook Post
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                        {socialPosts.facebookPage.postBody}
                      </div>
                    </div>
                  )}

                  {selectedSocialTab === "x" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                          <Twitter className="w-4 h-4" /> X (Twitter) Tweet & Follow-up Thread
                        </span>
                        <button
                          onClick={() => copyToClipboard(`${socialPosts.xTwitter.tweetText}\n\n${socialPosts.xTwitter.threadFollowup}`, "x_tweet")}
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-1 transition-all cursor-pointer"
                        >
                          {copiedKey === "x_tweet" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          Copy Tweet Thread
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                        <p className="font-semibold text-white">{socialPosts.xTwitter.tweetText}</p>
                        <div className="my-2 border-t border-slate-800" />
                        <p className="text-slate-400">{socialPosts.xTwitter.threadFollowup}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setCurrentStep("thumbnail")}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Thumbnail
                </button>
                <button
                  onClick={() => setCurrentStep("publish")}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-teal-500/20"
                >
                  Proceed to Publish & Schedule
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 8: PUBLISH */}
          {currentStep === "publish" && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Stage 8: Omnichannel Publish & Scheduler</h2>
                    <p className="text-xs text-slate-400">Broadcast across WhatsApp Status, Instagram, TikTok, and Facebook simultaneously</p>
                  </div>
                </div>

                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Ready to Dispatch
                </span>
              </div>

              {/* Publish Configuration Box */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-5">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Target Broadcast Destinations
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "whatsapp_status", label: "WhatsApp Status (Ikorodu Direct)", icon: MessageSquare },
                    { id: "instagram_reels", label: "Instagram Reels & Feed", icon: Instagram },
                    { id: "tiktok", label: "TikTok Viral Feed", icon: Video },
                  ].map((plat) => {
                    const isChecked = targetPlatforms.includes(plat.id);
                    const Icon = plat.icon;
                    return (
                      <div
                        key={plat.id}
                        onClick={() => {
                          if (isChecked) {
                            setTargetPlatforms(targetPlatforms.filter((p) => p !== plat.id));
                          } else {
                            setTargetPlatforms([...targetPlatforms, plat.id]);
                          }
                        }}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isChecked
                            ? "bg-teal-950/30 border-teal-500 text-white"
                            : "bg-slate-900 border-slate-800 text-slate-400"
                        }`}
                      >
                        <div className="flex items-center gap-2 text-xs font-bold">
                          <Icon className="w-4 h-4 text-teal-400" />
                          <span>{plat.label}</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="accent-teal-500"
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Scheduled Publish Date</label>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Peak Lagos Engagement Time</label>
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Instant Action CTA Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
                  <div className="text-xs text-slate-400">
                    Estimated Reach: <strong className="text-emerald-400">48K–65K impressions</strong> · 120+ direct inquiries
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href="https://wa.me/?text=Hello!%20Check%20out%20Freshcare%20Laundry%20Ikorodu:%20Quality%20laundry,%20zero-mix%20guarantee,%20and%20%E2%82%A61,500%20OFF%20your%20first%20order%20exceeding%2015%20pieces!%20wa.me/2348032345678"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Post Direct to WhatsApp Now
                    </a>

                    <button
                      onClick={handlePublishExecution}
                      disabled={publishStatus === "publishing"}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-teal-500/25"
                    >
                      {publishStatus === "publishing" ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          Publishing Webhooks...
                        </>
                      ) : publishStatus === "published" ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
                          Published to Calendar!
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          Simulate Broadcast Publish
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Published Content Queue */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-teal-400" />
                  Scheduled Content Broadcast Calendar
                </h4>

                <div className="space-y-2">
                  {scheduledList.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="font-bold text-white mb-0.5">{item.contentTitle}</div>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                          <span>{item.scheduledTime}</span>
                          <span>•</span>
                          <span className="text-teal-400 font-semibold">{item.platforms.join(", ")}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-emerald-400 font-medium">{item.reachEstimate}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {item.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Pipeline Summary & Quick Switcher (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Summary Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-teal-400" />
              Active Campaign Blueprint
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
              <div className="text-[10px] font-bold uppercase text-teal-400 tracking-wider">Title</div>
              <div className="font-bold text-white">{selectedIdea.title}</div>

              <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider pt-2">Opening Hook</div>
              <div className="text-slate-300 italic">"{selectedIdea.hook}"</div>

              <div className="pt-2 flex items-center justify-between text-[11px] border-t border-slate-800">
                <span className="text-slate-400">Audience:</span>
                <span className="text-teal-300 capitalize">{selectedIdea.targetAudience.replace("_", " ")}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Voice Persona:</span>
                <span className="text-purple-300">{selectedVoice.voiceLabel}</span>
              </div>
            </div>

            {/* Step Completion Checklist */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Pipeline Stage Status
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
                        ? "bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold"
                        : isPassed
                        ? "text-emerald-400 hover:bg-slate-800/60"
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
                      <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                    ) : (
                      <span className="text-[10px] text-slate-600">Pending</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Cross-Navigation Links */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-slate-900 border border-emerald-500/30 space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Connected Freshcare Systems
            </h4>
            <p className="text-xs text-slate-300">
              Content created here feeds directly into the WhatsApp AI Agent and Order Funnel.
            </p>
            <div className="space-y-2 pt-1">
              {onOpenOrderFunnel && (
                <button
                  onClick={onOpenOrderFunnel}
                  className="w-full p-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 flex items-center justify-between cursor-pointer"
                >
                  <span>View 8-Step Order Funnel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              {onOpenWhatsAppFlow && (
                <button
                  onClick={onOpenWhatsAppFlow}
                  className="w-full p-2.5 rounded-xl text-xs font-bold bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 flex items-center justify-between cursor-pointer"
                >
                  <span>Test WhatsApp Live Agent</span>
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
