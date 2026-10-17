"use client";

import { useEffect, useState } from "react";
import Button from "@/shared/components/Button/";
import Card from "@/shared/components/Card/";
import useSpeechSynthesis from "../../hooks/useSpeechSynthesis";
import styles from "./SelectionStage.module.css";

export default function SelectionStage({
  correctCard,
  options,
  onNewRound,
}) {
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [isCorrectSelected, setIsCorrectSelected] = useState(false);
  const [showCardFront, setShowCardFront] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCardFront(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  const { speak } = useSpeechSynthesis(
    correctCard?.letter ? `Encuentra la letra ${correctCard.letter}` : ""
  );

  const handleSelect = (card) => {
    const isCorrect = card.letter === correctCard.letter;

    if (isCorrect) {
      setIsCorrectSelected(true);
      speak("Muy bien");
      return;
    }

    setIncorrectLetters((currentLetters) =>
      currentLetters.includes(card.letter)
        ? currentLetters
        : [...currentLetters, card.letter]
    );
    speak("Te equivocaste");
  };

  const hasSelection =
    isCorrectSelected || incorrectLetters.length > 0;

  return (
    <section className={styles.stage}>
      <div className={styles.cardsArea}>
        {options.map((card) => {
          const isCorrect = card.letter === correctCard.letter;
          const showCorrect = isCorrect && isCorrectSelected;
          const showIncorrect = incorrectLetters.includes(card.letter);

          return (
            <button
              key={card.letter}
              type="button"
              className={`${styles.cardOption} ${
                showCorrect ? styles.correct : ""
              } ${
                showIncorrect ? styles.incorrect : ""
              }`.trim()}
              onClick={() => handleSelect(card)}
              aria-label={`Seleccionar ${card.word}`}
            >
              <span
                className={styles.rotator}
                style={{ transform: `rotateY(${showCardFront ? 180 : 0}deg)` }}
              >
                <span className={styles.face}>
                  <Card {...card} face="back" />
                </span>
                <span className={`${styles.face} ${styles.backFace}`}>
                  <Card {...card} face="front" />
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className={styles.continueArea}>
        {hasSelection && (
          <Button
            className={styles.continueButton}
            onClick={onNewRound}
          >
            Continuar
          </Button>
        )}
      </div>
    </section>
  );
}
