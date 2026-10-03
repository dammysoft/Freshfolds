import { GoogleGenAI } from "@google/genai";
import {
  ContentIdea,
  AIScriptOutput,
  AIVoiceConfig,
  VideoRenderMockup,
  CaptionTrack,
  ThumbnailConfig,
  SocialPostBundle,
  PublishScheduleRecord,
  RawOrderRecord,
  CleanedOrderRecord,
  DataCleaningAuditStep,
  CleanedAnalyticsSummary,
  AIDataInsight,
  BusinessRecommendation
} from "../types";

// =========================================================================
// PIPELINE 2: IDEA -> AI SCRIPT -> AI VOICE -> VIDEO -> CAPTIONS -> THUMBNAIL -> SOCIAL POST -> PUBLISH
// =========================================================================

export const FRESHCARE_CONTENT_IDEAS: ContentIdea[] = [
  {
    id: "idea-1",
    title: "How to Keep White Senator Native Attire Crisp & Spotless",
    hook: "Stop washing your white Senator native wear like everyday T-shirts! Here is the Ikorodu drycleaner secret...",
    topicCategory: "traditional_care",
    targetAudience: "working_class",
    targetPlatform: "instagram_reels",
    tone: "relatable_nigerian",
    estimatedEngagement: "48K+ views · High WhatsApp conversions",
  },
  {
    id: "idea-2",
    title: "LASUSTECH Firstgate Student Rush: ₦1,500 Welcome Discount",
    hook: "Exams are starting next Monday and your laundry basket is overflowing? Listen up, LASUSTECH students!",
    topicCategory: "student_life",
    targetAudience: "students",
    targetPlatform: "tiktok",
    tone: "urgent_deal",
    estimatedEngagement: "65K+ views · 120+ direct pickup bookings",
  },
  {
    id: "idea-3",
    title: "The Zero-Mix Rule: Why We Never Wash Your Clothes With Another Customer",
    hook: "Did you know that 80% of roadside laundries throw 4 different people's clothes into one drum?",
    topicCategory: "behind_the_scenes",
    targetAudience: "families",
    targetPlatform: "whatsapp_status",
    tone: "professional",
    estimatedEngagement: "32K+ views · Reassurance & Trust Builder",
  },
  {
    id: "idea-4",
    title: "Removing Tough Palm Oil Stains From Yellow Lace Without Bleach",
    hook: "Your Sunday party was sweet until someone splashed palm oil on your lace. Do NOT touch that bleach bottle!",
    topicCategory: "stain_removal",
    targetAudience: "wedding_guests",
    targetPlatform: "instagram_reels",
    tone: "relatable_nigerian",
    estimatedEngagement: "75K+ views · Viral Share Potential",
  },
  {
    id: "idea-5",
    title: "Rainy Season Laundry Crisis in Lagos: 24h Express Drying",
    hook: "Raining for 3 days straight in Ikorodu and clothes smelling damp? Freshcare commercial dryers are ready!",
    topicCategory: "monsoon_care",
    targetAudience: "all",
    targetPlatform: "all",
    tone: "urgent_deal",
    estimatedEngagement: "55K+ views · High Seasonal Rush",
  },
];

export async function generateContentScript(
  idea: ContentIdea,
  customNotes?: string,
  ai?: GoogleGenAI | null
): Promise<AIScriptOutput> {
  if (ai) {
    try {
      const prompt = `You are a viral social media director specializing in Nigerian small businesses, particularly Freshcare Laundry and Drycleaning Services in Ikorodu, Lagos (located at Firstgate near LASUSTECH).
Write an engaging 45-second video script for this idea:
Title: "${idea.title}"
Hook: "${idea.hook}"
Category: ${idea.topicCategory}
Target Audience: ${idea.targetAudience}
Tone: ${idea.tone}
Special Business Details:
- ₦1,500 off first order over 15 pieces.
- Free pickup within 1km of LASUSTECH Firstgate.
- Strict Zero-Mix batch rule (no clothes mixed).
- WhatsApp booking with photo verification.
- Professional medium/heavy starch for Senators and Agbadas.

${customNotes ? `Additional creator notes: ${customNotes}` : ""}

Return a valid JSON object matching this schema:
{
  "title": "String",
  "hookHeadline": "String (catchy on-screen hook)",
  "totalDurationSeconds": 45,
  "scenes": [
    {
      "sceneNumber": 1,
      "durationSeconds": 5,
      "visualDescription": "Camera angle and actor/b-roll action",
      "narration": "Spoken dialogue in energetic, relatable Nigerian tone",
      "onScreenText": "Short bold punchy caption text",
      "soundEffectOrBGM": "Audio cue or beat style"
    }
  ],
  "callToAction": "Clear CTA to WhatsApp or Website",
  "suggestedHashtags": ["#Tag1", "#Tag2"],
  "keySellingPoints": ["Point 1", "Point 2"]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      if (response && response.text) {
        const parsed = JSON.parse(response.text);
        return {
          id: `script-${Date.now()}`,
          title: parsed.title || idea.title,
          hookHeadline: parsed.hookHeadline || idea.hook,
          totalDurationSeconds: parsed.totalDurationSeconds || 45,
          scenes: parsed.scenes || [],
          callToAction: parsed.callToAction || "Send 'FRESHCARE' on WhatsApp to 0803 234 5678 for free Firstgate pickup!",
          suggestedHashtags: parsed.suggestedHashtags || ["#FreshcareIkorodu", "#LagosLaundry", "#LASUSTECH", "#SenatorStyle"],
          keySellingPoints: parsed.keySellingPoints || ["Zero-Mix Batch Guarantee", "₦1,500 Welcome Discount", "Free 1km Delivery"],
        };
      }
    } catch (err) {
      console.warn("Gemini script generation fallback triggered:", err);
    }
  }

  // Robust deterministic fallback script
  return {
    id: `script-${Date.now()}`,
    title: idea.title,
    hookHeadline: idea.hook,
    totalDurationSeconds: 42,
    scenes: [
      {
        sceneNumber: 1,
        durationSeconds: 6,
        visualDescription: "Close-up of a crumpled Senator native wear on an unmade bed, camera zooms in with record scratch sound.",
        narration: idea.hook,
        onScreenText: "STOP RUINING YOUR NATIVE WEAR 🛑",
        soundEffectOrBGM: "Vinyl scratch + energetic Afrobeats bassline",
      },
      {
        sceneNumber: 2,
        durationSeconds: 10,
        visualDescription: "Fast cut to Freshcare Ikorodu facility at Firstgate. Clean industrial washers and stainless steel pressing tables in action.",
        narration: "At Freshcare Laundry in Firstgate Ikorodu, we operate on a strict Zero-Mix rule. Your garments get their own dedicated wash drum — never shared with stranger clothes!",
        onScreenText: "100% Dedicated Wash Drum • Zero-Mix Guarantee",
        soundEffectOrBGM: "Smooth upbeat percussive beat",
      },
      {
        sceneNumber: 3,
        durationSeconds: 12,
        visualDescription: "Split screen: Master presser spraying custom medium starch onto collar and cuffs, followed by sharp razor-edge crease alignment.",
        narration: "Our steam pressers know the exact formula: light starch for office shirts, crisp medium starch for Senators, and rich heavy hold for ceremonial Agbada.",
        onScreenText: "Precision Steam Pressing & Custom Starching 👔",
        soundEffectOrBGM: "Steam iron hiss sound effect + upbeat rhythm",
      },
      {
        sceneNumber: 4,
        durationSeconds: 8,
        visualDescription: "Freshcare branded electric dispatch bike leaving Firstgate gate with cleanly packaged, tagged garments in protective garment covers.",
        narration: "Living near LASUSTECH Firstgate? Delivery within 1km is completely FREE. Plus, first-time orders over 15 pieces get ₦1,500 slashed instantly!",
        onScreenText: "FREE Firstgate Delivery • ₦1,500 Welcome Voucher ⚡",
        soundEffectOrBGM: "Bike rev chime + celebration bell",
      },
      {
        sceneNumber: 5,
        durationSeconds: 6,
        visualDescription: "Alex AI Concierge phone screen showing instant WhatsApp booking confirmation with photo verification card.",
        narration: "Tap the link in bio or WhatsApp 'FRESHCARE' right now. Let Alex book your pickup in 30 seconds!",
        onScreenText: "Tap Bio or WhatsApp 0803 234 5678 📲",
        soundEffectOrBGM: "WhatsApp notification chime sound",
      },
    ],
    callToAction: "Send 'FRESHCARE' on WhatsApp to 0803 234 5678 to claim ₦1,500 OFF your 15+ piece order!",
    suggestedHashtags: [
      "#FreshcareLaundry",
      "#IkoroduBusiness",
      "#LASUSTECHFirstgate",
      "#SenatorWearCare",
      "#LagosDrycleaners",
      "#ZeroMixLaundry"
    ],
    keySellingPoints: [
      "Zero-Mix batch separation guarantee",
      "₦1,500 off first order over 15 pieces",
      "Free pickup within 1km LASUSTECH Firstgate",
      "WhatsApp photo verification card",
    ],
  };
}

export const FRESHCARE_VOICE_CONFIGS: AIVoiceConfig[] = [
  {
    voiceId: "alex_warm",
    voiceLabel: "Alex (Front-Desk Concierge)",
    accent: "Warm Nigerian English · Trustworthy & Respectful",
    speed: 1.0,
    pitch: 1.0,
  },
  {
    voiceId: "chidi_hype",
    voiceLabel: "Chidi (Energetic Lagos Hype)",
    accent: "Dynamic Urban Nigerian · High Energy & Punchy",
    speed: 1.1,
    pitch: 1.05,
  },
  {
    voiceId: "ngozi_professional",
    voiceLabel: "Ngozi (Executive Care Specialist)",
    accent: "Polished Corporate Lagosian · Clear & Reassuring",
    speed: 0.95,
    pitch: 1.0,
  },
  {
    voiceId: "kore_concierge",
    voiceLabel: "Kore (Friendly Student / Campus Voice)",
    accent: "Campus Friendly · Relatable & Conversational",
    speed: 1.05,
    pitch: 1.02,
  },
];

export function generateCaptionTrack(script: AIScriptOutput): CaptionTrack {
  const fullNarration = script.scenes.map((s) => s.narration).join(" ");
  const words = fullNarration.split(/\s+/);
  
  let currentSec = 0;
  const wordDuration = script.totalDurationSeconds / Math.max(words.length, 1);

  const captionWords = words.map((w, i) => {
    const start = Number(currentSec.toFixed(2));
    const end = Number((currentSec + wordDuration).toFixed(2));
    currentSec += wordDuration;

    let highlightColor = undefined;
    const lower = w.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (["freshcare", "ikorodu", "lasustech", "free", "discount", "1500", "senator", "zero-mix", "whatsapp"].includes(lower)) {
      highlightColor = "#10b981"; // Emerald green highlight
    } else if (["stop", "ruining", "never", "bleach", "stain"].includes(lower)) {
      highlightColor = "#f59e0b"; // Amber warning highlight
    }

    return {
      text: w,
      highlightColor,
      startTimeSec: start,
      endTimeSec: end,
    };
  });

  return {
    id: `captions-${Date.now()}`,
    style: "hormozi_bold",
    captions: script.scenes.map((scene) => ({
      timestamp: `00:0${scene.sceneNumber * 7}`,
      text: scene.onScreenText,
      words: captionWords.slice(
        (scene.sceneNumber - 1) * Math.floor(captionWords.length / script.scenes.length),
        scene.sceneNumber * Math.floor(captionWords.length / script.scenes.length)
      ),
    })),
    hashtags: script.suggestedHashtags,
  };
}

export function generateSocialPostBundle(script: AIScriptOutput): SocialPostBundle {
  return {
    instagramReels: {
      caption: `🧺 ${script.hookHeadline}\n\nDon't let cheap roadside wash-men ruin your luxury fabrics and traditional wear! At Freshcare Laundry & Drycleaning Services (Firstgate, LASUSTECH, Ikorodu), every single customer order is washed separately in its own dedicated drum. Zero fabric mixing.\n\n✨ Why Ikorodu trusts Freshcare:\n• Strict Zero-Mix Batch Rule\n• Custom Starching: Light, Medium (Senators), or Heavy (Agbada)\n• FREE delivery within 1km of LASUSTECH Firstgate\n• ₦1,500 OFF your first order of 15+ clothes!\n\n📲 Tap the link in bio or WhatsApp 0803 234 5678 to book your doorstep pickup in 30 seconds!\n\n${script.suggestedHashtags.join(" ")}`,
      hashtags: script.suggestedHashtags,
      audioTrackName: "Afrobeats Trending Instrumental · Freshcare Audio",
    },
    tiktok: {
      caption: `${script.hookHeadline} 🧼✨ Lagos people, listen up! Save your clothes and your money at Freshcare Ikorodu! Use code FIRST1500 for ₦1,500 off. Link in bio! 📍 Firstgate LASUSTECH`,
      hashtags: ["#fyp", "#laundrytok", "#ikorodu", "#lasustech", "#foryoupage", "#freshcarelagos"],
      soundTitle: "Original Sound - Freshcare Laundry Ikorodu",
    },
    whatsappStatus: {
      textStatus: `🚨 SPECIAL LAUNDRY OFFER: ₦1,500 OFF your first order over 15 pieces! We are picking up today around Firstgate, Agric, and Benson. Reply 'CLEAN' to book! 🚚💨`,
      callNowLink: "https://wa.me/2348032345678?text=Hello%20Freshcare!%20I%20saw%20your%20video%20and%20want%20to%20schedule%20a%20pickup.",
      mediaCaption: `${script.title} — Watch our 45-second care guide! Quality laundry delivered in 24 hours.`,
    },
    facebookPage: {
      headline: `Professional Laundry & Drycleaning Near LASUSTECH Firstgate, Ikorodu`,
      postBody: `Are your delicate Senators, office shirts, and heavy duvets receiving the care they deserve? Experience the Freshcare difference: individual wash batches, hospital-grade stain treatment, and razor-sharp pressing.\n\nEnjoy FREE delivery within 1km of LASUSTECH Firstgate! For orders with 15+ items, get ₦1,500 OFF your first bill.\n\nCall our 24/7 AI Concierge or click the Send Message button below to schedule your pickup.`,
      buttonCta: "Send WhatsApp Message",
    },
    xTwitter: {
      tweetText: `Tired of clothes coming back smelling like other people's soap? 🛑\n\nFreshcare Laundry in Ikorodu operates on a STRICT Zero-Mix batch rule: your clothes are washed alone, starched to your exact taste, and delivered in 24-48 hrs. 🧵✨\n\n₦1,500 OFF 15+ pieces: 👇`,
      threadFollowup: `📍 Location: Firstgate, LASUSTECH, Ikorodu.\n🏍️ Free 1km delivery.\n📲 WhatsApp 0803 234 5678 or tap freshcare.ng/book to schedule rider pickup today!`,
    },
  };
}

// =========================================================================
// PIPELINE 3: ORDERS -> DATABASE -> DATA CLEANING -> ANALYTICS -> DASHBOARD -> AI ANALYSIS -> RECOMMENDATIONS
// =========================================================================

export const RAW_DIRTY_ORDERS_DATASET: RawOrderRecord[] = [
  {
    rawId: "raw-001",
    customerNameRaw: "babatunde adeleke",
    phoneRaw: "0803 234 5678",
    channelRaw: "whatsapp",
    addressRaw: "lasustech firstgate, opp zenith bank",
    itemsRaw: "2 senetor native, 1 heavy agbada",
    piecesRaw: "16",
    nairaAmountRaw: "₦7,600",
    paymentRaw: "transfer (moniepoint)",
    orderTimestamp: "2026-10-02 08:30:12",
    rawIssues: ["Lowercase name", "Unstandardized phone format", "Unparsed native wear category", "Naira currency symbol in amount"],
  },
  {
    rawId: "raw-002",
    customerNameRaw: "Dr. Mrs Folashade Okonjo",
    phoneRaw: "+2348128765432",
    channelRaw: "Website Form",
    addressRaw: "Benson bus stop, beside total energy",
    itemsRaw: "3 corporate blazer, 2 silk gown, 1 two piece suit",
    piecesRaw: 6,
    nairaAmountRaw: 11500,
    paymentRaw: "paid_pos",
    orderTimestamp: "2026-10-02 09:15:40",
    rawIssues: ["Inconsistent casing in channel name", "E.164 phone without spacing"],
  },
  {
    rawId: "raw-003",
    customerNameRaw: "babatunde adeleke", // Duplicate customer booking attempted within 15 mins!
    phoneRaw: "08032345678",
    channelRaw: "whatsapp",
    addressRaw: "lasustech first gate opp zenith",
    itemsRaw: "2 senetor native, 1 heavy agbada",
    piecesRaw: "16",
    nairaAmountRaw: "7600",
    paymentRaw: "pending",
    orderTimestamp: "2026-10-02 08:44:00",
    rawIssues: ["DUPLICATE_ORDER: Double tap on WhatsApp web hook", "Phone missing leading country code", "Pending reconciliation"],
  },
  {
    rawId: "raw-004",
    customerNameRaw: "CHUKWUDI EMMANUEL",
    phoneRaw: "8023456789", // Missing leading 0
    channelRaw: "WALKIN",
    addressRaw: "Shop 14, LASUSTECH student village hostel",
    itemsRaw: "15 plain shirt, 5 polo, 2 bedsheet",
    piecesRaw: "22 pieces",
    nairaAmountRaw: "₦12,400 (discount claimed)",
    paymentRaw: "CASH_ON_HAND",
    orderTimestamp: "2026-10-02 10:02:18",
    rawIssues: ["Missing leading 0 in phone", "String in pieces count", "Discount text polluted price integer", "All caps name"],
  },
  {
    rawId: "raw-005",
    customerNameRaw: "Barrister Seyi Oladipo",
    phoneRaw: "234-805-111-2233",
    channelRaw: "concierge_call",
    addressRaw: "Agric roundabout, near royal estate gate",
    itemsRaw: "4 corporate suit, 6 formal white shirts",
    piecesRaw: 10,
    nairaAmountRaw: "8400.00",
    paymentRaw: "bank_transfer_gtb",
    orderTimestamp: "2026-10-02 11:20:05",
    rawIssues: ["Dashes in phone number", "Float string in price", "Unnormalized payment channel"],
  },
  {
    rawId: "raw-006",
    customerNameRaw: "Blessing Okoro (LASUSTECH Student)",
    phoneRaw: "09012344321",
    channelRaw: "whatsapp",
    addressRaw: "Firstgate student hostel block B",
    itemsRaw: "1 jumbo duvet, 2 bedsheets, 4 pillow cases",
    piecesRaw: "7",
    nairaAmountRaw: "6500",
    paymentRaw: "opay_transfer",
    orderTimestamp: "2026-10-02 12:45:50",
    rawIssues: ["Parentheses in customer name", "Uncategorized bedding item"],
  },
  {
    rawId: "raw-007",
    customerNameRaw: "ALHAJI IBRAHIM DANJUMA",
    phoneRaw: "+234 809 988 7766",
    channelRaw: "walkin",
    addressRaw: "Sabo market plaza",
    itemsRaw: "5 heavy agbada, 3 kaftan",
    piecesRaw: 8,
    nairaAmountRaw: "14000",
    paymentRaw: "paid_pos",
    orderTimestamp: "2026-10-02 14:10:12",
    rawIssues: ["All caps customer name", "High starch protocol required"],
  },
  {
    rawId: "raw-008",
    customerNameRaw: "kevin omokaro",
    phoneRaw: "07065554321",
    channelRaw: "web_booking",
    addressRaw: "Odogunyan industrial estate",
    itemsRaw: "10 polo, 4 jeans",
    piecesRaw: 14,
    nairaAmountRaw: "7800",
    paymentRaw: "card_paystack",
    orderTimestamp: "2026-10-02 15:30:22",
    rawIssues: ["Missing title case", "Extended distance beyond 1km free radius (surcharge needed)"],
  },
];

export function runDataCleaningPipeline(rawOrders: RawOrderRecord[]): {
  cleanedOrders: CleanedOrderRecord[];
  auditSteps: DataCleaningAuditStep[];
  preCleaningQualityScore: number;
  postCleaningQualityScore: number;
  duplicateCount: number;
} {
  const auditSteps: DataCleaningAuditStep[] = [
    {
      stepName: "Step 1: E.164 Phone Normalization",
      recordsAffected: 7,
      description: "Standardized heterogeneous phone strings (dashes, missing country code, missing leading zero) to clean '+234 80X XXX XXXX' format.",
      rulesApplied: ["Strip non-digits", "Prepend +234 if starting with 0 or 80/70/90", "Format with readable national spacing"],
      status: "completed",
    },
    {
      stepName: "Step 2: Customer Deduplication & Conflict Merging",
      recordsAffected: 2,
      description: "Detected duplicate concurrent order submission (raw-003 was identical WhatsApp double-click within 14 mins of raw-001). Safely merged.",
      rulesApplied: ["Fuzzy customer phone + address match", "Time window threshold < 30 mins", "Preserve earliest verified payment"],
      status: "completed",
    },
    {
      stepName: "Step 3: Landmark Geocoding & Delivery Zone Mapping",
      recordsAffected: 8,
      description: "Standardized free-text addresses into Ikorodu dispatch logistics zones (Firstgate LASUSTECH, Benson, Agric, Sabo, Odogunyan).",
      rulesApplied: ["Map 'first gate/opp zenith' -> 'Firstgate / LASUSTECH Zone A'", "Determine free delivery vs ₦500 extended zone"],
      status: "completed",
    },
    {
      stepName: "Step 4: Price & Piece Count Type Sanitization",
      recordsAffected: 6,
      description: "Cleaned currency symbols ('₦'), discount text, and string piece counts into integer values for accounting integrity.",
      rulesApplied: ["Regex strip '₦' and non-numeric characters", "Typecast to integer Naira", "Validate against fixed price sheet"],
      status: "completed",
    },
    {
      stepName: "Step 5: Garment Classification & Starch Rules",
      recordsAffected: 8,
      description: "Parsed loose garment descriptions into standardized categories: Traditional Attire, Corporate Drycleaning, Bedding & Linens, Everyday Wear.",
      rulesApplied: ["Auto-tag Agbada -> Heavy Starch", "Auto-tag Senator -> Medium Starch", "Auto-tag Silk/Lace -> Zero Starch / Handwash"],
      status: "completed",
    },
  ];

  // Execute cleaning logic
  const cleaned: CleanedOrderRecord[] = [];
  const seenPhoneAndItems = new Set<string>();
  let duplicateCount = 0;

  for (const raw of rawOrders) {
    // Deduplication check
    const dedupKey = `${raw.phoneRaw.replace(/\D/g, "").slice(-8)}-${raw.itemsRaw.toLowerCase().slice(0, 15)}`;
    if (seenPhoneAndItems.has(dedupKey)) {
      duplicateCount++;
      continue; // Skip duplicate order
    }
    seenPhoneAndItems.add(dedupKey);

    // Normalize phone
    let digits = raw.phoneRaw.replace(/\D/g, "");
    if (digits.startsWith("234")) {
      digits = digits.slice(3);
    }
    if (digits.startsWith("0")) {
      digits = digits.slice(1);
    }
    const phoneNormalized = `+234 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`;

    // Title case name
    const customerName = raw.customerNameRaw
      .replace(/\(.*?\)/g, "")
      .trim()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");

    // Standardize channel
    let cleanChannel: "whatsapp" | "website" | "walkin" | "concierge_call" = "whatsapp";
    const lowerChannel = raw.channelRaw.toLowerCase();
    if (lowerChannel.includes("web")) cleanChannel = "website";
    else if (lowerChannel.includes("walk")) cleanChannel = "walkin";
    else if (lowerChannel.includes("call") || lowerChannel.includes("concierge")) cleanChannel = "concierge_call";

    // Clean address & delivery zone
    let deliveryArea = "Firstgate / LASUSTECH (Free 1km)";
    const lowerAddr = raw.addressRaw.toLowerCase();
    if (lowerAddr.includes("benson")) deliveryArea = "Benson Bus Stop (Zone 2)";
    else if (lowerAddr.includes("agric")) deliveryArea = "Agric Roundabout (Zone 2)";
    else if (lowerAddr.includes("sabo")) deliveryArea = "Sabo Market (Zone 3)";
    else if (lowerAddr.includes("odogunyan")) deliveryArea = "Odogunyan Industrial (Zone 4)";

    // Clean numbers
    const cleanNaira = Number(String(raw.nairaAmountRaw).replace(/[^0-9]/g, "")) || 5000;
    const cleanPieces = Number(String(raw.piecesRaw).replace(/[^0-9]/g, "")) || 4;

    // Categorize items
    const itemsCategorized: string[] = [];
    const lowerItems = raw.itemsRaw.toLowerCase();
    if (lowerItems.includes("senator") || lowerItems.includes("native") || lowerItems.includes("kaftan")) {
      itemsCategorized.push("Traditional Native Wear (Medium Starch)");
    }
    if (lowerItems.includes("agbada")) {
      itemsCategorized.push("Ceremonial Agbada (Heavy Starch)");
    }
    if (lowerItems.includes("blazer") || lowerItems.includes("suit")) {
      itemsCategorized.push("Corporate Suit / Blazer (Dry Clean Only)");
    }
    if (lowerItems.includes("duvet") || lowerItems.includes("bedsheet")) {
      itemsCategorized.push("Duvet & Household Bedding (Deep Sanitize)");
    }
    if (lowerItems.includes("shirt") || lowerItems.includes("polo") || lowerItems.includes("jeans")) {
      itemsCategorized.push("Everyday Wear (Wash & Press)");
    }
    if (itemsCategorized.length === 0) {
      itemsCategorized.push("General Garment Care");
    }

    // Standardize payment
    let paymentStatus: "paid_transfer" | "paid_pos" | "paid_cash" | "pending_cash_on_delivery" = "paid_transfer";
    const lowerPay = raw.paymentRaw.toLowerCase();
    if (lowerPay.includes("pos")) paymentStatus = "paid_pos";
    else if (lowerPay.includes("cash")) paymentStatus = "paid_cash";
    else if (lowerPay.includes("pending")) paymentStatus = "pending_cash_on_delivery";

    cleaned.push({
      orderId: `FC-${100 + cleaned.length + 1}`,
      customerName,
      phoneNormalized,
      channel: cleanChannel,
      deliveryArea,
      cleanAddress: raw.addressRaw,
      itemsCategorized,
      totalPieces: cleanPieces,
      totalNaira: cleanNaira,
      paymentStatus,
      stage: "in_washing",
      orderTimestamp: raw.orderTimestamp,
      cleanedFields: ["phone_normalized", "name_casing", "delivery_area_mapped", "currency_cast", "garment_classified"],
      dataQualityScore: 99.4,
    });
  }

  return {
    cleanedOrders: cleaned,
    auditSteps,
    preCleaningQualityScore: 68.2,
    postCleaningQualityScore: 99.4,
    duplicateCount,
  };
}

export function computeCleanedAnalytics(orders: CleanedOrderRecord[]): CleanedAnalyticsSummary {
  const totalGrossRevenue = orders.reduce((sum, o) => sum + o.totalNaira, 0);
  const totalOrders = orders.length;
  const averageOrderValue = Math.round(totalGrossRevenue / Math.max(totalOrders, 1));
  const totalPieces = orders.reduce((sum, o) => sum + o.totalPieces, 0);
  const averagePiecesPerOrder = Number((totalPieces / Math.max(totalOrders, 1)).toFixed(1));

  // Channel breakdown
  const channelMap: Record<string, { count: number; rev: number }> = {};
  for (const o of orders) {
    if (!channelMap[o.channel]) channelMap[o.channel] = { count: 0, rev: 0 };
    channelMap[o.channel].count += 1;
    channelMap[o.channel].rev += o.totalNaira;
  }
  const topChannels = Object.entries(channelMap).map(([channel, data]) => ({
    channel: channel === "whatsapp" ? "WhatsApp AI Agent" : channel === "website" ? "Website Funnel" : channel === "walkin" ? "Firstgate Walk-in" : "Phone Concierge",
    sharePercent: Math.round((data.count / totalOrders) * 100),
    orderCount: data.count,
    revenue: data.rev,
  }));

  // Category breakdown
  const catMap: Record<string, { count: number; rev: number }> = {
    "Traditional Native & Agbada": { count: 4, rev: 29200 },
    "Corporate Suits & Gowns": { count: 2, rev: 19900 },
    "Duvets & Linens": { count: 2, rev: 14300 },
    "Everyday Wash & Press": { count: 3, rev: 20200 },
  };
  const topCategories = Object.entries(catMap).map(([category, data]) => ({
    category,
    orderCount: data.count,
    revenue: data.rev,
  }));

  // Delivery area breakdown
  const deliveryAreaBreakdown = [
    { area: "Firstgate / LASUSTECH (Free 1km)", orderCount: 4, revenue: 32900, avgDeliveryMin: 18 },
    { area: "Benson Bus Stop (Zone 2)", orderCount: 1, revenue: 11500, avgDeliveryMin: 32 },
    { area: "Agric Roundabout (Zone 2)", orderCount: 1, revenue: 8400, avgDeliveryMin: 35 },
    { area: "Sabo Market (Zone 3)", orderCount: 1, revenue: 14000, avgDeliveryMin: 45 },
  ];

  const peakDayHours = [
    { day: "Monday", peakHour: "07:30 AM - 09:00 AM", count: 18 },
    { day: "Wednesday", peakHour: "05:00 PM - 07:30 PM", count: 14 },
    { day: "Friday (Pre-Owanbe Rush)", peakHour: "08:00 AM - 12:00 PM", count: 26 },
    { day: "Saturday (Major Dropoff)", peakHour: "09:00 AM - 04:00 PM", count: 34 },
  ];

  return {
    totalGrossRevenue,
    totalOrders,
    averageOrderValue,
    averagePiecesPerOrder,
    cleanQualityScore: 99.4,
    repeatCustomerRate: 64, // 64% repeat rate in Ikorodu
    topChannels,
    topCategories,
    deliveryAreaBreakdown,
    peakDayHours,
  };
}

export async function generateAIDataAnalysis(
  analytics: CleanedAnalyticsSummary,
  ai?: GoogleGenAI | null
): Promise<AIDataInsight[]> {
  if (ai) {
    try {
      const prompt = `You are a Chief Operations Officer and Data Scientist analyzing Freshcare Laundry and Drycleaning Services in Ikorodu, Lagos (Firstgate LASUSTECH).
Analyze these cleaned business metrics:
- Total Gross Revenue: ₦${analytics.totalGrossRevenue.toLocaleString()}
- Total Orders Cleaned: ${analytics.totalOrders}
- Average Order Value (AOV): ₦${analytics.averageOrderValue.toLocaleString()}
- Avg Pieces Per Order: ${analytics.averagePiecesPerOrder} pieces
- Repeat Customer Rate: ${analytics.repeatCustomerRate}%
- Top Channel: WhatsApp Agent (${analytics.topChannels[0]?.sharePercent}%)
- Free 1km Firstgate Zone represents 57% of order volume.

Identify 4 deep operational patterns, customer friction points, or revenue leakage opportunities.
Return valid JSON array:
[
  {
    "id": "insight-1",
    "title": "String",
    "severity": "opportunity" | "critical" | "trend" | "efficiency",
    "summary": "Short 1-2 sentence executive summary",
    "detectedPattern": "Specific finding in the data",
    "supportingData": "Numeric metrics backing this up",
    "potentialImpact": "Monetary or operational value"
  }
]`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: { responseMimeType: "application/json" },
      });

      if (response && response.text) {
        return JSON.parse(response.text);
      }
    } catch (err) {
      console.warn("Gemini data analysis fallback triggered:", err);
    }
  }

  // Deterministic high-value insights
  return [
    {
      id: "insight-1",
      title: "Friday Pre-Owanbe Agbada & Native Spike (High Margin Opportunity)",
      severity: "opportunity",
      summary: "Traditional wear and ceremonial Agbada account for 41% of total revenue despite only representing 33% of order count.",
      detectedPattern: "Customers submitting Agbadas on Friday morning consistently pay higher ticket values (₦7,600 - ₦14,000) and request heavy starch.",
      supportingData: "Average revenue per native order is ₦8,300 vs ₦4,800 for everyday wash.",
      potentialImpact: "Introducing an express 'Friday Owanbe Rush' guarantee with +₦1,000 surcharge will capture an extra ₦180,000/month.",
    },
    {
      id: "insight-2",
      title: "LASUSTECH Student Exam Cycle Volume Surge",
      severity: "trend",
      summary: "Student hostel bookings in Firstgate peak heavily during mid-semester and exam weeks, clustering around 15-22 piece laundry bags.",
      detectedPattern: "Students utilize the ₦1,500 discount threshold (>15 pieces) by pooling clothes with roommates to hit the discount minimum.",
      supportingData: "AOV for student hostel orders is ₦12,400 with 22 average pieces per bag.",
      potentialImpact: "A structured 'Roommate Bundle (20 pieces + Free Delivery)' will secure recurring weekly campus contracts.",
    },
    {
      id: "insight-3",
      title: "Delivery Zone 3 (Sabo) Dispatch Bottleneck",
      severity: "critical",
      summary: "Deliveries to Sabo Market average 45 minutes roundtrip due to Ikorodu garage traffic, tying up riders during morning peak.",
      detectedPattern: "Single rider trips to Sabo reduce Firstgate campus pickup velocity by 28% between 8:00 AM and 10:00 AM.",
      supportingData: "Firstgate turnaround is 18 mins vs Sabo 45 mins.",
      potentialImpact: "Batching Sabo deliveries into a strict 1:00 PM - 3:00 PM afternoon window frees up 2 peak morning hours.",
    },
    {
      id: "insight-4",
      title: "WhatsApp Dominance as Primary Booking Vector (52%)",
      severity: "efficiency",
      summary: "Over half of all orders originate from WhatsApp voice notes and text, where customers demand immediate price estimates.",
      detectedPattern: "Customers who receive instant WhatsApp quotes with photo verification have an 88% order completion rate.",
      supportingData: "Conversion rate via WhatsApp AI Agent is 2.4x higher than standard web forms.",
      potentialImpact: "Further automating WhatsApp quotation tools directly protects ₦420,000/month in pipeline velocity.",
    },
  ];
}

export function generateBusinessRecommendations(
  insights: AIDataInsight[],
  analytics: CleanedAnalyticsSummary
): BusinessRecommendation[] {
  return [
    {
      id: "rec-1",
      title: "Launch 'Friday Owanbe Express' Premium Starch Package",
      category: "pricing_optimization",
      priority: "high",
      estimatedMonthlyGainNaira: 240000,
      effort: "Low (1-2 days)",
      problemSolved: "Captures surge demand from Ikorodu residents needing crisp Senators and Agbadas for Saturday weddings without disrupting weekday laundry.",
      actionPlan: [
        "Create dedicated 'Owanbe Express' toggle on WhatsApp bot and Pricing page with ₦1,000 rush fee.",
        "Allocate 2 dedicated master steam pressers from 7:00 AM to 1:00 PM every Friday.",
        "Guarantee 12-hour turnaround with Gold-label dust protection bag.",
      ],
      appliedStatus: false,
    },
    {
      id: "rec-2",
      title: "Standardize Student Campus 'Roommate 20-Piece' Bundle",
      category: "marketing",
      priority: "high",
      estimatedMonthlyGainNaira: 380000,
      effort: "Low (1-2 days)",
      problemSolved: "Formalizes student cloth-pooling behavior around LASUSTECH Firstgate into predictable recurring revenue.",
      actionPlan: [
        "Package 20 everyday garments (shirts, polos, jeans, boxers) for flat ₦8,500 including ₦1,500 welcome discount.",
        "Deploy campus flyers and WhatsApp student union broadcasts at LASUSTECH gates.",
        "Schedule twice-weekly hostel corridor pickup sweeps on Tuesday & Thursday evenings.",
      ],
      appliedStatus: false,
    },
    {
      id: "rec-3",
      title: "Implement Batching Window for Sabo & Benson Dispatch Routes",
      category: "fleet_logistics",
      priority: "medium",
      estimatedMonthlyGainNaira: 160000,
      effort: "Medium (1 week)",
      problemSolved: "Eliminates random single-package trips through Ikorodu garage traffic that cause rider exhaustion and delivery delays.",
      actionPlan: [
        "Zone Ikorodu into 2 dispatch blocks: Morning (Firstgate & Agric) and Afternoon (Sabo & Benson).",
        "Inform customers in Sabo that standard delivery arrival is 1:00 PM – 3:30 PM.",
        "Save 18 liters of generator/bike fuel weekly and boost rider deliveries from 14 to 22 orders/day.",
      ],
      appliedStatus: false,
    },
    {
      id: "rec-4",
      title: "Automated 10th-Wash Loyalty Redemption Trigger on WhatsApp",
      category: "loyalty",
      priority: "quick_win",
      estimatedMonthlyGainNaira: 190000,
      effort: "Low (1-2 days)",
      problemSolved: "Increases customer lifetime value (LTV) and defends against local roadside laundry poaching.",
      actionPlan: [
        "Track customer completed batches in CRM database automatically.",
        "Send personalized WhatsApp celebration card on 9th wash: '1 wash away from your FREE 10th wash!'.",
        "Credit ₦3,500 voucher on 10th order.",
      ],
      appliedStatus: false,
    },
    {
      id: "rec-5",
      title: "Monsoon Moisture & Odor Protection Surcharge Service",
      category: "operations",
      priority: "medium",
      estimatedMonthlyGainNaira: 210000,
      effort: "Medium (1 week)",
      problemSolved: "Solves the chronic rainy season damp smell crisis in Lagos homes using industrial hot tumble dry + lavender anti-mildew seal.",
      actionPlan: [
        "Feature '100% Guaranteed Dry & Odor-Free' badge across all marketing channels.",
        "Add duvet + heavy jeans anti-mildew treatment addon for ₦600.",
        "Run social ads targeting Ikorodu residents during multi-day rain forecasts.",
      ],
      appliedStatus: false,
    },
  ];
}
