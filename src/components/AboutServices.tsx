import React, { useState } from "react";
import {
  ShieldCheck,
  Clock,
  Sparkles,
  Phone,
  CheckCircle2,
  AlertTriangle,
  Beaker,
  Layers,
  Sparkle,
  MessageSquare,
  FileCheck2,
  FileText
} from "lucide-react";

interface AboutServicesProps {
  onStartCall: () => void;
}

export const AboutServices: React.FC<AboutServicesProps> = ({ onStartCall }) => {
  const [activeSopTab, setActiveSopTab] = useState<"sop" | "chemicals" | "fabrics" | "operations">("sop");

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/40 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 mb-3 inline-block">
            Freshfold Standard Operating Procedure (SOP)
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            Professional Laundry & Dry Cleaning Standards
          </h2>
          <p className="text-xs text-emerald-400 font-mono mb-4">
            Firstgate, near LASUSTECH, Ikorodu, Lagos • Document Ref: SOP-FF-2026
          </p>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            Freshfolds operates under strict institutional procedures for washing, pressing, starching,
            packaging, and fabric handling. We combine commercial-grade destainers with careful hand-washing
            for delicate traditional attire like Agbadas, Aso-Oke, and Kaftans.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onStartCall}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Speak with Alex for Booking</span>
            </button>
          </div>
        </div>
      </div>

      {/* SOP Section Navigation */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/60 p-2 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveSopTab("sop")}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-2 ${
            activeSopTab === "sop"
              ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Core SOP (Tagging, Starching, QC)</span>
        </button>
        <button
          onClick={() => setActiveSopTab("fabrics")}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-2 ${
            activeSopTab === "fabrics"
              ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>13. Fabric Treatment Table</span>
        </button>
        <button
          onClick={() => setActiveSopTab("chemicals")}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-2 ${
            activeSopTab === "chemicals"
              ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Beaker className="w-4 h-4 text-sky-400" />
          <span>8. Chemicals & Consumables</span>
        </button>
        <button
          onClick={() => setActiveSopTab("operations")}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-2 ${
            activeSopTab === "operations"
              ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Clock className="w-4 h-4 text-amber-400" />
          <span>7. Operational Flow & Hours</span>
        </button>
      </div>

      {/* TAB 1: Core SOP */}
      {activeSopTab === "sop" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 2. Receiving & Tagging Procedure */}
          <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <FileText className="w-4 h-4" /> Section 2 & 11
            </div>
            <h3 className="text-base font-bold text-white">Receiving & Tagging Procedure</h3>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>Count all items physically in front of customer.</li>
              <li>Inspect for stains, tears, missing buttons, or damages.</li>
              <li>Confirm requested service: Wash Only, Wash + Press, Press Only, or Starch level.</li>
              <li><strong className="text-amber-300">Tag every garment immediately (FF-001, FF-002...).</strong></li>
              <li>Separate whites, colours, darks, and delicate fabrics.</li>
              <li>Photo-document items on receipt using WhatsApp and issue digital receipt.</li>
              <li>Fold garments uniformly in branded Freshfold bag with customer tag attached.</li>
            </ul>
          </div>

          {/* 7. Starching Procedure */}
          <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkle className="w-4 h-4" /> Section 7
            </div>
            <h3 className="text-base font-bold text-white">Starching Specifications</h3>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <span className="font-bold text-sky-300">LIGHT STARCH:</span> For shirts, ladies blouses, and everyday wear.
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <span className="font-bold text-emerald-300">MEDIUM STARCH:</span> For native wear, kaftans, and office attire.
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-300">HEAVY STARCH:</span> For 3-piece Agbada, school uniforms, and ceremonial wear.
              </div>
              <div className="bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20 text-rose-300 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span><strong>WARNING:</strong> Never starch silk, lace, chiffon, or delicate fabrics heavily!</span>
              </div>
            </div>
          </div>

          {/* 9. Quality Control & Non-Negotiables */}
          <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Section 9 & 7.3
            </div>
            <h3 className="text-base font-bold text-white">Non-Negotiable Quality Standards</h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Every item must be tagged before washing — no exceptions.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span><strong className="text-white">Strict No-Mix Rule:</strong> No two customers&apos; clothes are mixed in the same wash batch!</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Delicate fabrics (lace, silk, beaded) are ALWAYS hand-washed only.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Every delivery package includes a FreshFold branded bag.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Delivery made within promised window — or a discount is applied.</span>
              </li>
            </ul>
          </div>

          {/* 8. Pressing Temperature Guide */}
          <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Section 8
            </div>
            <h3 className="text-base font-bold text-white">Pressing Temperature Guide</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Cotton:</span> <span className="font-bold text-white">High Heat</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Polyester:</span> <span className="font-bold text-white">Low Heat</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Linen:</span> <span className="font-bold text-white">Medium/High Heat</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Silk:</span> <span className="font-bold text-white">Low Heat (Cloth Guard)</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Wool:</span> <span className="font-bold text-white">Low Heat</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Denim:</span> <span className="font-bold text-white">Medium Heat</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Fabric Treatment Table */}
      {activeSopTab === "fabrics" && (
        <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Section 13: Fabric Treatment Master Table</h3>
              <p className="text-xs text-slate-400">Wash type, pressing temperature, starch level, and special handling instructions.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3">Fabric</th>
                  <th className="p-3">Wash Type</th>
                  <th className="p-3">Press Heat</th>
                  <th className="p-3">Starch</th>
                  <th className="p-3">Special Care</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-white">Cotton</td>
                  <td className="p-3">Normal Wash</td>
                  <td className="p-3 text-amber-400">High</td>
                  <td className="p-3">Light / Heavy</td>
                  <td className="p-3 text-slate-400">Easy maintenance</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-white">Polyester</td>
                  <td className="p-3">Cold Wash</td>
                  <td className="p-3 text-sky-400">Low</td>
                  <td className="p-3">Light Only</td>
                  <td className="p-3 text-slate-400">Avoid high heat</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-white">Linen</td>
                  <td className="p-3">Cold Wash</td>
                  <td className="p-3 text-amber-400">Medium</td>
                  <td className="p-3">Medium / Heavy</td>
                  <td className="p-3 text-slate-400">Wrinkles easily, steam well</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-white">Silk</td>
                  <td className="p-3 text-emerald-400 font-semibold">Hand Wash</td>
                  <td className="p-3 text-sky-400">Low</td>
                  <td className="p-3 text-rose-400 font-semibold">No Starch</td>
                  <td className="p-3 text-slate-400">Delicate handling</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-white">Wool</td>
                  <td className="p-3 text-emerald-400 font-semibold">Hand Wash</td>
                  <td className="p-3 text-sky-400">Low</td>
                  <td className="p-3 text-rose-400 font-semibold">No Starch</td>
                  <td className="p-3 text-slate-400">Avoid hot water</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-white">Denim</td>
                  <td className="p-3">Cold Wash</td>
                  <td className="p-3 text-amber-400">Medium</td>
                  <td className="p-3 text-rose-400">No Starch</td>
                  <td className="p-3 text-slate-400">Wash inside out</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-white">Lace / Beaded</td>
                  <td className="p-3 text-emerald-400 font-semibold">Gentle Wash</td>
                  <td className="p-3 text-sky-400">Low</td>
                  <td className="p-3 text-rose-400">No Starch</td>
                  <td className="p-3 text-slate-400">Handle carefully</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-white">Agbada</td>
                  <td className="p-3 text-emerald-400 font-semibold">Gentle Wash</td>
                  <td className="p-3 text-amber-400">Medium</td>
                  <td className="p-3 text-amber-400 font-bold">Heavy</td>
                  <td className="p-3 text-slate-400">Steam carefully, crisp drape</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Chemicals & Consumables */}
      {activeSopTab === "chemicals" && (
        <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Section 8: Professional-Grade Laundry Chemicals</h3>
              <p className="text-xs text-slate-400">Specific formulation applied correctly per fabric type to guarantee superior results without fiber degradation.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="font-bold text-emerald-400 mb-1">1. Laundry Detergent</div>
              <p className="text-slate-300">Primary cleaning agent — removes dirt and general soil from fabrics. (Every wash)</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="font-bold text-emerald-400 mb-1">2. Alkaline Builder Detergent</div>
              <p className="text-slate-300">Boosts detergent effectiveness on heavily soiled items; removes grease. (Heavy loads)</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="font-bold text-emerald-400 mb-1">3. Laundry Destainer</div>
              <p className="text-slate-300">Targets and removes stubborn stains (food, sweat, oil) without bleaching. (Stained garments)</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="font-bold text-emerald-400 mb-1">4. Bleach (Oxygen-Based)</div>
              <p className="text-slate-300">Whitens white fabrics; disinfects; removes deep stains — NOT for colours. (White items only)</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="font-bold text-emerald-400 mb-1">5. Laundry Neutraliser</div>
              <p className="text-slate-300">Balances pH after washing; protects fibres and prevents detergent residue. (Final rinse)</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="font-bold text-amber-400 mb-1">6. Fabric Starch</div>
              <p className="text-slate-300">Stiffens and gives a crisp, professional finish to shirts, uniforms, and agbada. (Formals & natives)</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="font-bold text-teal-400 mb-1">7. Fabric Softener</div>
              <p className="text-slate-300">Softens fabrics, reduces static, leaves pleasant fresh scent. (Most garments)</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="font-bold text-sky-400 mb-1">8. Laundry Emulsifier</div>
              <p className="text-slate-300">Breaks down oil-based stains and synthetic fabric buildup. (Oily items)</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="font-bold text-purple-400 mb-1">9. Disinfectant</div>
              <p className="text-slate-300">Kills bacteria and odour — especially important for bedding and undergarments.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Operational Flow & Hours */}
      {activeSopTab === "operations" && (
        <div className="space-y-6">
          {/* Operating Hours Table */}
          <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6 shadow-xl">
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Section 7.2: Official Operating Hours in Ikorodu</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="text-slate-400 mb-1 font-semibold">Monday – Friday</div>
                <div className="text-base font-bold text-white">7:00 AM – 8:00 PM</div>
                <div className="text-[11px] text-amber-300 mt-1">Peak: 7–9AM & 5–8PM</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="text-slate-400 mb-1 font-semibold">Saturday</div>
                <div className="text-base font-bold text-white">7:00 AM – 7:00 PM</div>
                <div className="text-[11px] text-emerald-400 mt-1">High walk-in & pickup day</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="text-slate-400 mb-1 font-semibold">Sunday</div>
                <div className="text-base font-bold text-white">9:00 AM – 4:00 PM</div>
                <div className="text-[11px] text-sky-400 mt-1">Delivery & advance order day</div>
              </div>
            </div>
          </div>

          {/* Daily 10-Step Operations Flow */}
          <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-3">
            <h3 className="text-base font-bold text-white mb-2">Section 7.1: Daily Operations Flow</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2">
                <span className="font-mono text-emerald-400 font-bold">Step 1:</span>
                <span>Customer drops off or books WhatsApp pickup (7AM–7PM daily).</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2">
                <span className="font-mono text-emerald-400 font-bold">Step 2:</span>
                <span>Items counted, inspected & tagged (FF-001, FF-002...) on receipt.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2">
                <span className="font-mono text-emerald-400 font-bold">Step 3:</span>
                <span>Customer receipt issued — items & total Naira confirmed.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2">
                <span className="font-mono text-emerald-400 font-bold">Step 4:</span>
                <span>Sorting by colour, fabric type, and service within 1 hour.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2">
                <span className="font-mono text-emerald-400 font-bold">Step 5:</span>
                <span>Washing — machine or hand-wash as appropriate (same day).</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2">
                <span className="font-mono text-emerald-400 font-bold">Step 6:</span>
                <span>Quality check post-wash — stains and damages reviewed.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2">
                <span className="font-mono text-emerald-400 font-bold">Step 7:</span>
                <span>Pressing and folding — standard FreshFold fold (within 4–6 hours).</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2">
                <span className="font-mono text-emerald-400 font-bold">Step 8:</span>
                <span>Packaging — branded FreshFold bag, customer tag attached.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2">
                <span className="font-mono text-emerald-400 font-bold">Step 9:</span>
                <span>WhatsApp notification sent to customer when ready.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2">
                <span className="font-mono text-emerald-400 font-bold">Step 10:</span>
                <span>Delivery or customer pickup — payment confirmed within 24–48hrs.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

