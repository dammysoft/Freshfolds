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
  tagNumber?: string; // e.g. FF-001
  driverSlot?: string;
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

