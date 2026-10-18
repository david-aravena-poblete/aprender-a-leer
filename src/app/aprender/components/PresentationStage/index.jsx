"use client";

import { useEffect, useState } from "react";
import Button from "@/shared/components/Button/";
import DelayedClickFlipCard from "../DelayedClickFlipCard/";
import useSpeechSynthesis from "../../hooks/useSpeechSynthesis";
import styles from "./PresentationStage.module.css";

export default function PresentationStage({
  card,
  delay,
  duration,
  onContinue,
}) {
  const [initialSpeechFinished, setInitialSpeechFinished] = useState(false);
  const { isFinished, speak } = useSpeechSynthesis(
    card?.letter ? `Esta es la letra ${card.letter}` : ""
  );

  useEffect(() => {
    if (isFinished) setInitialSpeechFinished(true);
  }, [isFinished]);

  const handleCardClick = (clickedFace) => {
    if (!initialSpeechFinished || !card) return;
    speak(clickedFace === "back" ? card.letter : card.word);
  };

  return (
    <section className={styles.stage}>
      <div className={styles.content}>
        <DelayedClickFlipCard
          card={card}
          delay={delay}
          duration={duration}
          canInteract={initialSpeechFinished}
          startInitialFlip={initialSpeechFinished}
          onCardClick={handleCardClick}
        />
      </div>

      <div className={styles.continueArea}>
        {initialSpeechFinished && (
          <Button
            className={styles.continueButton}
            onClick={onContinue}
          >
            Continuar
          </Button>
        )}
      </div>
    </section>
  );
}
