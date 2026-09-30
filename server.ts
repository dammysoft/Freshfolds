import express, { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize GoogleGenAI SDK with standard User-Agent
const apiKey = process.env.GEMINI_API_KEY || "";
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

const ALEX_SYSTEM_INSTRUCTION = `
You are "Alex", the warm, professional, respectful, and sharp front-desk voice concierge for Freshfolds Laundry and Dry Cleaning Service, located in Ikorodu, Lagos, Nigeria (serving Firstgate, LASUSTECH, Agric, Benson, Ikorodu Garage, and surrounding environs).
Your voice persona is natural, conversational, friendly, and reassuring with a welcoming Nigerian hospitality warmth. Speak with an organized tone that reassures callers their everyday clothes, traditional attire (Senators, Kaftans, Agbadas, Ankara, Aso-Oke), suits, and household linens are in expert hands.

# Business Location & Operational Details:
- Location: Firstgate, near Lagos State University of Science and Technology (LASUSTECH), Ikorodu, Lagos, Nigeria.
- Delivery: FREE delivery within 1km of Firstgate / LASUSTECH. Extended delivery beyond 1km across Ikorodu environs is a ₦500 flat fee.
- Operating Hours:
  * Monday – Friday: 7:00 AM – 8:00 PM (Peak hours: 7:00 AM – 9:00 AM & 5:00 PM – 8:00 PM)
  * Saturday: 7:00 AM – 7:00 PM (Walk-in & major pickup day)
  * Sunday: 9:00 AM – 4:00 PM (Delivery & advance orders)
- Quality Guarantee (Freshfolds Standard Operating Procedure):
  * Strict no-mix rule: No two customers' clothes are EVER washed in the same batch.
  * Tagging & Photo-Documentation: Every item is tagged (FF-001 series) and photo-documented on WhatsApp upon receipt.
  * Delicates (silk, lace, chiffon, beaded gowns) are ALWAYS hand-washed with zero harsh chemicals.
  * Professional starching options: Light starch (everyday shirts & blouses), Medium starch (kaftans, office wear), Heavy starch (Agbadas, ceremonial wear, uniforms). Starch is never used on silk or chiffon.
  * Standard Turnaround: 24 to 48 hours.
  * Express Service: 24-hour turnaround (+₦500 surcharge) or Same-Day 6-hour rush (+₦1,000 surcharge).
- Special Welcome Offer:
  * ₦1,500 OFF your first order of clothes ONLY if the items brought exceed 15 pieces! For orders with 15 pieces or fewer, the welcome discount does not apply yet (let them know adding just a few more pieces unlocks the ₦1,500 discount).

# Fixed Pricing Menu (in Nigerian Naira ₦ - strictly fixed, no hidden charges):
- Everyday Wear (Wash + Press):
  * Plain Shirt (Male): ₦600 (Wash only: ₦350, Press only: ₦250)
  * Polo / T-Shirt: ₦500 (Wash: ₦300, Press: ₦200)
  * Jeans Trousers: ₦700 (Wash: ₦400, Press: ₦300)
  * Plain Trousers / Chinos: ₦600 (Wash: ₦350, Press: ₦250)
  * Shorts: ₦400 (Wash: ₦250, Press: ₦150)
  * Singlet / Vest / Boxers: ₦200 each
  * Hoodie / Sweatshirt / Cardigan: ₦800
  * Ladies Blouse: ₦600
  * Ladies Gown: Simple ₦900, Heavy/Beaded ₦1,500
  * School Uniform Set: ₦800
  * Work Overall / Lab Coat: ₦700 – ₦1,000
- Traditional & Formal Wear (Wash + Press):
  * Senator / Native (2-piece): ₦1,800 (Press only: ₦800)
  * Kaftan (Simple): ₦1,200 (Press only: ₦600)
  * Kaftan (Heavy / Embroidered): ₦2,000 (Press only: ₦1,000)
  * Agbada (3-piece): ₦3,500 (Press only: ₦1,500)
  * Agbada (Heavy / Embroidered): ₦5,000 (Press only: ₦2,500)
  * Aso-Oke (Gele + Iro + Buba set): ₦2,500 (Press only: ₦1,200)
  * Ankara / Iro & Buba (2-piece): ₦1,200 (Press only: ₦600)
  * Suit (2-piece): ₦2,500 (Press only: ₦1,200; Dry cleaning: ₦4,000)
  * Suit (3-piece): ₦3,000 (Dry cleaning: ₦5,000)
  * Blazer / Jacket: ₦1,200 (Dry cleaning: ₦2,500)
  * Wedding / Bridal Gown: ₦6,000 (Dry cleaning + packaging: ₦10,000)
- Beddings & Linens:
  * Single Bedsheet: ₦900 (Wash only: ₦600)
  * Double / King Bedsheet: ₦1,300 (Wash only: ₦800)
  * Duvet Inner (Single): ₦2,000; Duvet Inner (Double/King): ₦3,500
  * Large Bath Towel: ₦700; Curtain Panel: ₦1,800
- Bundles & Monthly Subscriptions (From Section 9.6 of Feasibility Report):
  * Student Bundle (Weekly): 8 pieces wash+press+fold+delivery = ₦3,500
  * Bachelor Bundle (Weekly): 12 pieces wash+press+fold+delivery = ₦5,000
  * Family Bundle (Weekly): 20 pieces wash+press+fold+delivery = ₦8,000
  * Student Monthly Sub: 4 weekly pickups of 8 pcs (32 total) = ₦12,000
  * Bachelor Monthly Sub: 4 weekly pickups of 12 pcs (48 total) = ₦18,000
  * Family Monthly Sub: 4 weekly pickups of 20 pcs (80 total) = ₦30,000

# Voice Output Rules:
1. Keep responses concise and conversational (2-4 sentences max).
2. Avoid bullet points, asterisks, or markdown symbols in speech.
3. State prices clearly in Naira (e.g. "one thousand eight hundred Naira for a two-piece Senator").
4. Mention starch preferences whenever traditional or corporate wear is mentioned (Light, Medium, or Heavy crisp starch).
5. Always offer to confirm pickup location around Ikorodu (Firstgate, LASUSTECH, Agric, etc.) or store drop-off.

When responding, ALWAYS return valid JSON matching this schema:
{
  "alexResponse": "The conversational text Alex speaks to the customer.",
  "extracted": {
    "serviceType": "everyday" | "traditional" | "dry_cleaning" | "bedding" | "bundle" | null,
    "itemsMentioned": ["item 1", "item 2"],
    "starchPreference": "none" | "light" | "medium" | "heavy" | null,
    "isPickup": true | false | null,
    "preferredDate": "e.g. Tomorrow" | null,
    "preferredWindow": "8:00 AM - 11:00 AM" | null,
    "customerName": "Customer name" | null,
    "customerPhone": "Phone" | null,
    "deliveryArea": "Firstgate / LASUSTECH" | "Agric" | "Benson" | "Ikorodu Garage" | "Other Ikorodu environs" | null,
    "customerAddress": "Address" | null,
    "discountPitched": true | false,
    "estimatedNairaTotal": number | null,
    "orderStage": "picked_up" | "in_washing" | "quality_check" | "out_for_delivery" | null,
    "bookingStatus": "inquiry" | "scheduling" | "details_needed" | "confirmed"
  }
}
`;

function getFallbackResponse(userMessage: string, bookingState: any) {
  const lower = userMessage.toLowerCase();
  let reply = "Hello and welcome to Freshfolds Laundry in Ikorodu! I'm Alex. How can we take care of your laundry or traditional wear today?";
  let serviceType = bookingState?.serviceType || "everyday";
  let isPickup = bookingState?.isPickup ?? true;
  let bookingStatus = bookingState?.bookingStatus || "inquiry";
  let starchPreference = bookingState?.starchPreference || "medium";

  if (lower.includes("track") || lower.includes("stage") || lower.includes("status") || lower.includes("where is") || lower.includes("progress")) {
    reply = "Your order progresses through four strict stages: Picked Up, In Washing with zero-mix isolation, Quality Check with custom starching, and Out for Delivery with our Ikorodu dispatch rider. You can monitor live updates on your Live Dispatch Board!";
    bookingStatus = "scheduling";
  } else if (lower.includes("discount") || lower.includes("1500") || lower.includes("1,500") || lower.includes("promo") || lower.includes("offer") || lower.includes("piece")) {
    reply = "Our one thousand five hundred Naira welcome discount applies strictly to your first order of clothes if your order exceeds fifteen pieces! If you bring sixteen pieces or more, we deduct one thousand five hundred Naira instantly. How many pieces do you have ready for pickup?";
    bookingStatus = "scheduling";
  } else if (lower.includes("senator") || lower.includes("agbada") || lower.includes("kaftan") || lower.includes("native") || lower.includes("ankara")) {
    reply = "We specialize in native wear and Agbadas with custom starching! A two-piece Senator is one thousand eight hundred Naira. If your first order exceeds fifteen pieces of clothing, you qualify for our special one thousand five hundred Naira discount. Would you like a pickup in Ikorodu or are you dropping by our Firstgate facility?";
    serviceType = "traditional";
    bookingStatus = "scheduling";
  } else if (lower.includes("student") || lower.includes("lasustech") || lower.includes("bundle")) {
    reply = "Our Student Weekly Bundle is just three thousand five hundred Naira for eight pieces with wash, press, and free delivery within one kilometer of LASUSTECH Firstgate. What day would you like our rider to pick up?";
    serviceType = "bundle";
    bookingStatus = "scheduling";
  } else if (lower.includes("suit") || lower.includes("dry clean") || lower.includes("gown")) {
    reply = "Our specialist dry cleaning for two-piece suits is four thousand Naira with delicate steam pressing. Remember that when your first order exceeds fifteen pieces, you get one thousand five hundred Naira off. When should our driver swing by your address?";
    serviceType = "dry_cleaning";
    bookingStatus = "scheduling";
  } else if (lower.includes("duvet") || lower.includes("bedsheet") || lower.includes("blanket")) {
    reply = "We wash and refresh large duvets and bedsheets thoroughly. A double or king duvet is three thousand five hundred Naira. Plus, delivery within Firstgate and LASUSTECH is completely free! Would tomorrow work for pickup?";
    serviceType = "bedding";
    bookingStatus = "scheduling";
  } else if (lower.includes("tomorrow") || lower.includes("morning") || lower.includes("pickup") || lower.includes("agric") || lower.includes("firstgate")) {
    reply = "That window is open on our Ikorodu dispatch route. To lock your slot in, please give me your name, phone number, and address or landmark around Ikorodu.";
    bookingStatus = "details_needed";
  } else {
    reply = "Freshfolds handles everyday wear, crisp native attire, and dry cleaning right here in Ikorodu. Plus, if your first order of clothes exceeds fifteen pieces, you receive one thousand five hundred Naira off! What can we refresh for you today?";
  }

  return {
    alexResponse: reply,
    extracted: {
      serviceType,
      itemsMentioned: [userMessage.slice(0, 40)],
      starchPreference,
      isPickup,
      preferredDate: "Tomorrow",
      preferredWindow: "8:00 AM - 11:00 AM",
      customerName: bookingState?.customerName || null,
      customerPhone: bookingState?.customerPhone || null,
      deliveryArea: "Firstgate / LASUSTECH",
      customerAddress: bookingState?.customerAddress || null,
      discountPitched: true,
      estimatedNairaTotal: 4500,
      bookingStatus,
    },
  };
}

async function generateSpeechAudio(text: string, voiceName: string = "Kore"): Promise<string | null> {
  if (!ai) return null;
  try {
    // Format text cleanly for natural speech in Naira
    const cleanSpeech = text
      .replace(/[\*\#\_\[\]\(\)\{\}]/g, "")
      .replace(/₦([0-9,]+)/g, "$1 Naira")
      .replace(/N([0-9,]+)/g, "$1 Naira")
      .trim();

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash-tts",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: cleanSpeech,
              speechMetadata: {
                style: "Warm, professional Nigerian hospitality concierge, friendly and reassuring tone",
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName || "Kore" },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio || null;
  } catch (err) {
    console.error("Error generating speech with gemini-3.8-flash-tts:", err);
    return null;
  }
}

// POST /api/chat: Processes user messages and returns Alex's response + audio + extracted booking metadata
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { messages, voiceName = "Kore", generateAudio = true, currentBookingState } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "Missing or invalid messages array" });
      return;
    }

    const lastUserMessage = messages[messages.length - 1]?.content || "";
    let alexResponse = "";
    let extracted = currentBookingState || {};

    if (ai) {
      try {
        const formattedContents = messages.map((m: any) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));

        const contextNote = `\n\n[Current Booking State: ${JSON.stringify(currentBookingState || {})}]`;
        if (formattedContents.length > 0) {
          const lastTurn = formattedContents[formattedContents.length - 1];
          lastTurn.parts[0].text += contextNote;
        }

        const modelResponse = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: formattedContents,
          config: {
            systemInstruction: ALEX_SYSTEM_INSTRUCTION,
            responseMimeType: "application/json",
            temperature: 0.7,
          },
        });

        const rawText = modelResponse.text?.trim() || "";
        try {
          const parsed = JSON.parse(rawText);
          alexResponse = parsed.alexResponse || parsed.reply || "";
          extracted = parsed.extracted || parsed.bookingUpdate || currentBookingState;
        } catch {
          alexResponse = rawText;
        }
      } catch (geminiError: any) {
        console.warn("Gemini call fallback:", geminiError?.message);
        const fallback = getFallbackResponse(lastUserMessage, currentBookingState);
        alexResponse = fallback.alexResponse;
        extracted = fallback.extracted;
      }
    } else {
      const fallback = getFallbackResponse(lastUserMessage, currentBookingState);
      alexResponse = fallback.alexResponse;
      extracted = fallback.extracted;
    }

    let audioBase64: string | null = null;
    if (generateAudio && alexResponse) {
      audioBase64 = await generateSpeechAudio(alexResponse, voiceName);
    }

    res.json({
      alexResponse,
      extracted,
      audioBase64,
      mimeType: audioBase64 ? "audio/wav" : null,
      usedTtsModel: audioBase64 ? "gemini-3.8-flash-tts" : null,
    });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: error.message || "Failed to process chat" });
  }
});

// POST /api/tts: Standalone TTS endpoint using gemini-3.8-flash-tts
app.post("/api/tts", async (req: Request, res: Response) => {
  try {
    const { text, voiceName = "Kore" } = req.body;
    if (!text || typeof text !== "string") {
      res.status(400).json({ error: "Missing or invalid text parameter" });
      return;
    }

    const audioBase64 = await generateSpeechAudio(text, voiceName);

    if (audioBase64) {
      res.json({
        audioBase64,
        mimeType: "audio/wav",
        model: "gemini-3.8-flash-tts",
      });
    } else {
      res.status(503).json({
        error: "Unable to generate TTS audio",
        fallbackRequired: true,
      });
    }
  } catch (error: any) {
    console.error("Error in /api/tts:", error);
    res.status(500).json({ error: error.message || "Failed to generate TTS" });
  }
});

// GET /api/health
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    concierge: "Alex - Freshfolds Front Desk Concierge (Ikorodu, Lagos)",
    currency: "NGN (₦)",
    models: {
      dialogue: "gemini-3.8-flash",
      tts: "gemini-3.8-flash-tts",
    },
  });
});

// Dev vs Prod Vite setup
if (process.env.NODE_ENV !== "production") {
  const { createServer } = await import("vite");
  const vite = await createServer({
    server: { middlewareMode: true, host: "0.0.0.0", port: Number(PORT) },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, "dist")));
  app.get("*", (_req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
  });
}

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Freshfolds Ikorodu Concierge Server running on http://0.0.0.0:${PORT}`);
});

