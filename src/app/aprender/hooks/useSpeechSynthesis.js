"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function useSpeechSynthesis(text) {
  const [isFinished, setIsFinished] = useState(false);
  const activeRef = useRef(null);

  const speak = useCallback((message) => {
    if (activeRef.current) activeRef.current.active = false;

    if (typeof window === "undefined" ||
        !("speechSynthesis" in window) ||
        !("SpeechSynthesisUtterance" in window) ||
        !message) {
      setIsFinished(true);
      return;
    }

    const synthesis = window.speechSynthesis;
    synthesis.cancel();

    const session = { active: true };
    activeRef.current = session;
    setIsFinished(false);

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "es-CL";
    utterance.onend = utterance.onerror = () => {
      if (session.active) setIsFinished(true);
    };
    synthesis.speak(utterance);
  }, []);

  useEffect(() => {
    if (text) speak(text);
    else setIsFinished(true);

    return () => {
      if (activeRef.current) activeRef.current.active = false;
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [text, speak]);

  return { isFinished, speak };
}
