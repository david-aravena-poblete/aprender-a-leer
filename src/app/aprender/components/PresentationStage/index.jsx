"use client";

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
  const { isFinished } = useSpeechSynthesis(
    card?.letter ? `Esta es la letra ${card.letter}` : ""
  );

  return (
    <section className={styles.stage}>
      <div className={styles.content}>
        <DelayedClickFlipCard
          card={card}
          delay={delay}
          duration={duration}
        />
      </div>

      <div className={styles.continueArea}>
        {isFinished && (
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
