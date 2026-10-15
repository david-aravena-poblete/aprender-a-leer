"use client";

import { useState } from "react";
import Card from "@/shared/components/Card/";
import styles from "./SelectionStage.module.css";

export default function SelectionStage({
  correctCard,
  options,
}) {
  const [selectedLetter, setSelectedLetter] = useState(null);

  const handleSelect = (card) => {
    setSelectedLetter(card.letter);
  };

  return (
    <section className={styles.stage}>
      <div className={styles.cardsArea}>
        {options.map((card) => {
          const isSelected = selectedLetter === card.letter;
          const isCorrect = card.letter === correctCard.letter;
          const isSelectedCorrect = isSelected && isCorrect;
          const isSelectedIncorrect = isSelected && !isCorrect;

          return (
            <button
              key={card.letter}
              type="button"
              className={`${styles.cardOption} ${
                isSelectedCorrect ? styles.correct : ""
              } ${
                isSelectedIncorrect ? styles.incorrect : ""
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
