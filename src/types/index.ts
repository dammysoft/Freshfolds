export type ServiceType = 
  | "everyday" 
  | "traditional" 
  | "dry_cleaning" 
  | "bedding" 
  | "bundle";

export type StarchPreference = "none" | "light" | "medium" | "heavy";

export type DeliveryArea = 
  | "Firstgate / LASUSTECH" 
  | "Agric" 
  | "Benson" 
  | "Ikorodu Garage" 
  | "Odogunyan" 
  | "Ebute / Ipakodo" 
  | "Other Ikorodu environs";

export type OrderStage = 
  | "picked_up"
  | "in_washing"
  | "quality_check"
  | "out_for_delivery"
  | "delivered";

export interface BookingState {
  serviceType: ServiceType;
  itemsMentioned: string[];
  starchPreference: StarchPreference;
  isPickup: boolean;
  preferredDate: string;
  preferredWindow: string;
  customerName: string;
  customerPhone: string;
  deliveryArea: DeliveryArea;
  customerAddress: string;
  specialInstructions: string;
  discountPitched: boolean;
  discountAmount: number; // in Naira, e.g. 1500
  totalPieces: number; // total clothing pieces in order
  isDiscountEligible: boolean; // true if first order and pieces > 15
  estimatedNairaTotal: number;
  deliveryFee: number; // 0 within 1km LASUSTECH, 500 beyond
  expressSurcharge: number; // 0, 500 (24h), 1000 (same day 6h)
  bookingStatus: "inquiry" | "scheduling" | "details_needed" | "confirmed";
  orderStage?: OrderStage;
  stageLastUpdated?: string;
  bookingReference?: string;
  tagNumber?: string; // e.g. FC-001
  driverSlot?: string;
}

export type OrderFunnelStep = 
  | "domain"
  | "website"
  | "catalogue"
  | "order_form"
  | "database"
  | "payment"
  | "confirmation"
  | "whatsapp_email";

export interface FunnelPaymentDetails {
  method: "bank_transfer" | "moniepoint_pos" | "pay_on_delivery" | "deposit_50";
  reference: string;
  paidAmount: number;
  isVerified: boolean;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
}

export type CRMRecordType = "order" | "lead" | "support";
export type CustomerChannel = "whatsapp" | "website" | "social" | "google_business";

export interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  area: DeliveryArea;
  totalOrders: number;
  loyaltyWashes: number; // e.g. 7 out of 10
  preferredStarch: StarchPreference;
  notes?: string;
  lastActive: string;
}

export interface CRMOrderRecord {
  id: string;
  tagNumber: string; // e.g. FC-104
  customerName: string;
  customerPhone: string;
  channel: CustomerChannel;
  serviceType: ServiceType;
  items: string[];
  totalPieces: number;
  totalNaira: number;
  paymentStatus: "paid_pos" | "paid_transfer" | "50_percent_deposit" | "pay_on_delivery";
  stage: OrderStage;
  deliveryArea: DeliveryArea;
  createdAt: string;
  eta: string;
}

export interface CRMLeadRecord {
  id: string;
  leadCode: string;
  name: string;
  phone: string;
  channel: CustomerChannel;
  interest: string;
  estimatedPieces: number;
  estimatedValue: number;
  status: "new" | "contacted" | "quote_sent" | "converted";
  notes: string;
  createdAt: string;
}

export interface CRMSupportRecord {
  id: string;
  ticketId: string;
  customerName: string;
  phone: string;
  channel: CustomerChannel;
  category: "order_status" | "starch_adjustment" | "delivery_eta" | "quality_rewash" | "pricing_inquiry";
  priority: "normal" | "urgent";
  status: "open" | "in_progress" | "resolved";
  details: string;
  resolution: string;
  createdAt: string;
}

export interface AccountingTransaction {
  id: string;
  type: "income" | "expense";
  category: string;
  description: string;
  amount: number;
  paymentMethod: "POS (Moniepoint)" | "Bank Transfer (OPay/GTB)" | "Cash" | "Internal";
  date: string;
  reference: string;
}

export interface MarketingCampaign {
  id: string;
  name: string;
  code: string;
  channel: string;
  benefit: string;
  active: boolean;
  conversions: number;
  revenueGenerated: number;
  targetAudience: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  audioBase64?: string | null;
  audioDuration?: number;
  isAudioPlaying?: boolean;
}

export interface VoiceOption {
  id: string;
  name: string;
  tone: string;
  gender: string;
  description: string;
}

export interface FixedPriceItem {
  id: string;
  category: "everyday" | "traditional" | "bedding" | "dry_clean" | "bundle";
  name: string;
  washAndPressPrice?: number;
  washOnlyPrice?: number;
  pressOnlyPrice?: number;
  dryCleanPrice?: number;
  bundlePrice?: number;
  unit: string;
  description?: string;
  notes?: string;
  popular?: boolean;
}

// 7 Standard Agent Tools requested by user
export type AgentToolName =
  | "get_price"
  | "create_order"
  | "check_order"
  | "schedule_pickup"
  | "check_pickup_availability"
  | "send_confirmation"
  | "transfer_to_human";

export interface ToolExecutionLog {
  id: string;
  tool: AgentToolName;
  input: Record<string, any>;
  output: Record<string, any>;
  status: "success" | "warning" | "error";
  timestamp: string;
  executionMs: number;
  reasoningSnippet?: string;
}

// Brand Representative 5-Pillar Architecture
export type BrandRepPillar =
  | "brand_personality"
  | "company_knowledge"
  | "products_services"
  | "faqs"
  | "customer_policies";

export interface BrandRepPillarInfo {
  id: BrandRepPillar;
  title: string;
  tagline: string;
  iconName: string;
  keyDirectives: string[];
  samplePromptSnippet: string;
  contributionToPersona: string;
}

// RAG Documents & Embeddings
export interface RAGDocument {
  id: string;
  title: string;
  category: "feasibility" | "pricing" | "sop" | "policies" | "faqs" | "bundles";
  content: string;
  tags: string[];
  embeddingVectorLength?: number;
  lastUpdated: string;
}

export interface RAGSearchResult {
  document: RAGDocument;
  similarityScore: number; // 0 to 1
  matchedSnippets: string[];
}

// =========================================================================
// PIPELINE 2: Idea -> AI script -> AI voice -> Video -> Captions -> Thumbnail -> Social post -> Publish
// =========================================================================

export type ContentPipelineStep =
  | "idea"
  | "script"
  | "voice"
  | "video"
  | "captions"
  | "thumbnail"
  | "social_post"
  | "publish";

export interface ContentIdea {
  id: string;
  title: string;
  hook: string;
  topicCategory: "traditional_care" | "promotions" | "student_life" | "stain_removal" | "behind_the_scenes" | "monsoon_care";
  targetAudience: "students" | "working_class" | "families" | "wedding_guests" | "all";
  targetPlatform: "instagram_reels" | "tiktok" | "whatsapp_status" | "youtube_shorts" | "all";
  tone: "relatable_nigerian" | "professional" | "humorous" | "urgent_deal";
  estimatedEngagement: string;
}

export interface VideoScriptScene {
  sceneNumber: number;
  durationSeconds: number;
  visualDescription: string;
  narration: string;
  onScreenText: string;
  soundEffectOrBGM?: string;
}

export interface AIScriptOutput {
  id: string;
  title: string;
  hookHeadline: string;
  totalDurationSeconds: number;
  scenes: VideoScriptScene[];
  callToAction: string;
  suggestedHashtags: string[];
  keySellingPoints: string[];
}

export interface AIVoiceConfig {
  voiceId: "alex_warm" | "chidi_hype" | "ngozi_professional" | "kore_concierge";
  voiceLabel: string;
  accent: string;
  speed: number;
  pitch: number;
  audioPreviewUrl?: string;
  generatedAudioBase64?: string;
}

export interface VideoRenderMockup {
  aspectRatio: "9:16" | "16:9" | "1:1";
  backgroundColor: string;
  videoBadge: string;
  logoOverlay: boolean;
  watermark: string;
  motionPreset: "dynamic_zoom" | "subtle_pan" | "fast_paced_cut";
}

export interface CaptionWord {
  text: string;
  highlightColor?: string;
  startTimeSec: number;
  endTimeSec: number;
}

export interface CaptionTrack {
  id: string;
  style: "hormozi_bold" | "clean_subtitles" | "neon_glow" | "minimal_white";
  captions: {
    timestamp: string;
    text: string;
    words: CaptionWord[];
  }[];
  hashtags: string[];
}

export interface ThumbnailConfig {
  headline: string;
  subHeadline: string;
  badgeText: string;
  themeColor: "emerald" | "amber" | "indigo" | "rose" | "teal";
  showSticker: boolean;
  stickerText: string;
  beforeAfterMockup: boolean;
  garmentIcon: string;
}

export interface SocialPostBundle {
  instagramReels: {
    caption: string;
    hashtags: string[];
    audioTrackName: string;
  };
  tiktok: {
    caption: string;
    hashtags: string[];
    soundTitle: string;
  };
  whatsappStatus: {
    textStatus: string;
    callNowLink: string;
    mediaCaption: string;
  };
  facebookPage: {
    postBody: string;
    headline: string;
    buttonCta: string;
  };
  xTwitter: {
    tweetText: string;
    threadFollowup: string;
  };
}

export interface PublishScheduleRecord {
  id: string;
  contentTitle: string;
  platforms: string[];
  scheduledTime: string;
  status: "scheduled" | "published" | "draft";
  reachEstimate: string;
  webhookUrl?: string;
  liveUrl?: string;
}

// =========================================================================
// PIPELINE 3: Orders -> Database -> Data cleaning -> Analytics -> Dashboard -> AI analysis -> Business recommendations
// =========================================================================

export type DataPipelineStep =
  | "orders"
  | "database"
  | "data_cleaning"
  | "analytics"
  | "dashboard"
  | "ai_analysis"
  | "recommendations";

export interface RawOrderRecord {
  rawId: string;
  customerNameRaw: string;
  phoneRaw: string;
  channelRaw: string;
  addressRaw: string;
  itemsRaw: string;
  piecesRaw: string | number;
  nairaAmountRaw: string | number;
  paymentRaw: string;
  orderTimestamp: string;
  rawIssues: string[]; // e.g., ["Non-standard phone", "Missing landmark", "Missing starch preference", "Dirty price format"]
}

export interface CleanedOrderRecord {
  orderId: string;
  customerName: string;
  phoneNormalized: string;
  channel: "whatsapp" | "website" | "walkin" | "concierge_call";
  deliveryArea: string;
  cleanAddress: string;
  itemsCategorized: string[];
  totalPieces: number;
  totalNaira: number;
  paymentStatus: "paid_transfer" | "paid_pos" | "paid_cash" | "pending_cash_on_delivery";
  stage: OrderStage;
  orderTimestamp: string;
  cleanedFields: string[];
  dataQualityScore: number; // 0 to 100
}

export interface DataCleaningAuditStep {
  stepName: string;
  recordsAffected: number;
  description: string;
  rulesApplied: string[];
  status: "completed" | "in_progress" | "pending";
}

export interface CleanedAnalyticsSummary {
  totalGrossRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  averagePiecesPerOrder: number;
  cleanQualityScore: number;
  repeatCustomerRate: number;
  topChannels: { channel: string; sharePercent: number; orderCount: number; revenue: number }[];
  topCategories: { category: string; orderCount: number; revenue: number }[];
  deliveryAreaBreakdown: { area: string; orderCount: number; revenue: number; avgDeliveryMin: number }[];
  peakDayHours: { day: string; peakHour: string; count: number }[];
}

export interface AIDataInsight {
  id: string;
  title: string;
  severity: "opportunity" | "critical" | "trend" | "efficiency";
  summary: string;
  detectedPattern: string;
  supportingData: string;
  potentialImpact: string;
}

export interface BusinessRecommendation {
  id: string;
  title: string;
  category: "operations" | "pricing_optimization" | "marketing" | "fleet_logistics" | "loyalty";
  priority: "high" | "medium" | "quick_win";
  estimatedMonthlyGainNaira: number;
  effort: "Low (1-2 days)" | "Medium (1 week)" | "High (2-4 weeks)";
  problemSolved: string;
  actionPlan: string[];
  appliedStatus: boolean;
}



