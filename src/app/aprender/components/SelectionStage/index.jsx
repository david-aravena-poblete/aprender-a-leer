"use client";

import { useState } from "react";
import Card from "@/shared/components/Card/";
import styles from "./SelectionStage.module.css";

export default function SelectionStage({
  correctCard,
  options,
}) {
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [isCorrectSelected, setIsCorrectSelected] = useState(false);

  const handleSelect = (card) => {
    const isCorrect = card.letter === correctCard.letter;

    if (isCorrect) {
      setIsCorrectSelected(true);
      return;
    }

    setIncorrectLetters((currentLetters) =>
      currentLetters.includes(card.letter)
        ? currentLetters
        : [...currentLetters, card.letter]
    );
  };

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
              <Card {...card} />
            </button>
          );
        })}
      </div>

      <div
        className={styles.continueArea}
        aria-hidden="true"
      />
    </section>
  );
}
