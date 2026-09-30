// Audio helper utilities for Freshfolds Voice Concierge

let currentAudio: HTMLAudioElement | null = null;

// Sound Effects via Web Audio API
export function playChime(type: "dial" | "connect" | "hangup" | "bubble") {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === "connect") {
      // Pleasant double bell chime (G5 -> C6)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc2.type = "sine";

      osc1.frequency.setValueAtTime(783.99, ctx.currentTime); // G5
      osc1.frequency.setValueAtTime(1046.5, ctx.currentTime + 0.15); // C6

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

      osc1.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc1.stop(ctx.currentTime + 0.5);
    } else if (type === "hangup") {
      // Gentle soft tone down
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(261.63, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === "dial") {
      // Subtle phone dial ring tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    }
  } catch (e) {
    console.debug("Web Audio tone error:", e);
  }
}

// Stop any currently playing audio
export function stopCurrentAudio() {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch {}
    currentAudio = null;
  }
  if (typeof window !== "undefined" && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }
}

// Play base64 WAV audio from gemini-3.8-flash-tts
export function playWavBase64(
  base64Audio: string,
  onStart?: () => void,
  onEnd?: () => void,
  playbackRate: number = 1.0
): HTMLAudioElement {
  stopCurrentAudio();

  const audioSrc = `data:audio/wav;base64,${base64Audio}`;
  const audio = new Audio(audioSrc);
  currentAudio = audio;
  audio.playbackRate = playbackRate;

  audio.onplay = () => {
    onStart?.();
  };

  audio.onended = () => {
    if (currentAudio === audio) currentAudio = null;
    onEnd?.();
  };

  audio.onerror = (e) => {
    console.error("Audio playback error:", e);
    if (currentAudio === audio) currentAudio = null;
    onEnd?.();
  };

  audio.play().catch((err) => {
    console.warn("Audio autoplay blocked or failed:", err);
    onEnd?.();
  });

  return audio;
}

// Fallback SpeechSynthesis player in case of TTS failure or network limits
export function speakWithBrowser(
  text: string,
  onStart?: () => void,
  onEnd?: () => void,
  rate: number = 1.0
) {
  stopCurrentAudio();

  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    onEnd?.();
    return;
  }

  const cleanText = text
    .replace(/[\*\#\_\[\]\(\)\{\}]/g, "")
    .replace(/₦([0-9,]+)/g, "$1 Naira")
    .replace(/N([0-9,]+)/g, "$1 Naira")
    .trim();

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = rate;
  utterance.pitch = 1.05; // Slightly warmer/friendly pitch for Alex

  // Try to find a pleasant English voice
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(
    (v) =>
      v.lang.startsWith("en") &&
      (v.name.includes("Samantha") ||
        v.name.includes("Google US English") ||
        v.name.includes("Victoria") ||
        v.name.includes("Natural") ||
        v.name.includes("Jenny"))
  );
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  utterance.onstart = () => onStart?.();
  utterance.onend = () => onEnd?.();
  utterance.onerror = () => onEnd?.();

  window.speechSynthesis.speak(utterance);
}

// Speech Recognition (Web Speech API) helper
export function createSpeechRecognizer(
  onResult: (text: string, isFinal: boolean) => void,
  onError: (err: any) => void,
  onEnd: () => void
) {
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onresult = (event: any) => {
    let interimTranscript = "";
    let finalTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    if (finalTranscript) {
      onResult(finalTranscript, true);
    } else if (interimTranscript) {
      onResult(interimTranscript, false);
    }
  };

  recognition.onerror = (event: any) => {
    onError(event.error);
  };

  recognition.onend = () => {
    onEnd();
  };

  return recognition;
}
