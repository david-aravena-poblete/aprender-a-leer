"use client";

import { useEffect, useState } from "react";

export default function useSpeechSynthesis(text) {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setIsFinished(false);

    if (!text) {
      setIsFinished(true);
      return;
    }

    if (typeof window === "undefined" ||
        !("speechSynthesis" in window) ||
        !("SpeechSynthesisUtterance" in window)) {
      setIsFinished(true);
      return;
    }

    const synthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    let active = true;

    utterance.lang = "es-CL";
    utterance.onend = () => {
      if (active) setIsFinished(true);
    };
    utterance.onerror = () => {
      if (active) setIsFinished(true);
    };

    synthesis.cancel();
    synthesis.speak(utterance);

    return () => {
      active = false;
      utterance.onend = null;
      utterance.onerror = null;
      synthesis.cancel();
    };
  }, [text]);

  return { isFinished };
}
