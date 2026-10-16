"use client";

import { useEffect, useState } from "react";
import Container from "@/shared/components/Container/";
import Stack from "@/shared/components/Stack/";
import CARDS from "@/shared/data/";
import PresentationStage from "./components/PresentationStage/";
import SelectionStage from "./components/SelectionStage/";
import styles from "./page.module.css";

function getRandomCard() {
  return CARDS[Math.floor(Math.random() * CARDS.length)];
}

function getRandomCardExcept(card) {
  const availableCards = CARDS.filter(
    (candidate) => candidate.letter !== card.letter
  );

  return availableCards[
    Math.floor(Math.random() * availableCards.length)
  ];
}

function createLearningRound(previousCorrectCard = null) {
  const correctCard = previousCorrectCard
    ? getRandomCardExcept(previousCorrectCard)
    : getRandomCard();
  const wrongCard = getRandomCardExcept(correctCard);
  const correctFirst = Math.random() < 0.5;

  return {
    correctCard,
    wrongCard,
    options: correctFirst
      ? [correctCard, wrongCard]
      : [wrongCard, correctCard],
  };
}

export default function AprenderPage() {
  const [stage, setStage] = useState("presentation");
  const [round, setRound] = useState(null);

  useEffect(() => {
    setRound(createLearningRound());
  }, []);

  const goToSelection = () => {
    setStage("selection");
  };

  const startNewRound = () => {
    setRound((currentRound) =>
      createLearningRound(currentRound?.correctCard ?? null)
    );
    setStage("presentation");
  };

  return (
    <main className={styles.page}>
      <Container
        size="xl"
        className={styles.container}
      >
        <Stack
          gap="md"
          align="center"
          justify="center"
          height="100%"
          className={styles.stack}
        >
          {round && stage === "presentation" && (
            <PresentationStage
              card={round.correctCard}
              delay={3000}
              duration={800}
              onContinue={goToSelection}
            />
          )}

          {round && stage === "selection" && (
            <SelectionStage
              correctCard={round.correctCard}
              options={round.options}
              onNewRound={startNewRound}
            />
          )}
        </Stack>
      </Container>
    </main>
  );
}
