"use client";

import { useEffect, useState } from "react";
import Card from "@/shared/components/Card";
import { rotateCard } from "@/utils/rotateCard";
import { updateCardContent } from "@/utils/updateCardContent";
import styles from "./RotatingCard.module.css";

const INTERVAL = 1000;
const DURATION = 600;

export default function RotatingCard({ cards = [] }) {
  const [rotation, setRotation] = useState(0);
  const [faces, setFaces] = useState([
    cards[0] ?? null,
    cards[1] ?? cards[0] ?? null,
  ]);

  useEffect(() => {
    setRotation(0);
    setFaces([cards[0] ?? null, cards[1] ?? cards[0] ?? null]);

    return rotateCard({
      interval: INTERVAL,
      duration: DURATION,
      itemCount: cards.length,
      onRotate: setRotation,
      onUpdate: (visibleIndex, hiddenFace) => {
        setFaces((previousFaces) =>
          updateCardContent({ cards, previousFaces, visibleIndex, hiddenFace })
        );
      },
    });
  }, [cards]);

  if (!cards.length) return null;

  if (cards.length === 1) return <Card {...cards[0]} />;

  return (
    <div className={styles.scene}>
      <div
        className={styles.rotator}
        style={{
          transform: `rotateY(${rotation}deg)`,
          transitionDuration: `${DURATION}ms`,
        }}
      >
        <div className={`${styles.face} ${styles.front}`}>
          {faces[0] && <Card {...faces[0]} />}
        </div>
        <div className={`${styles.face} ${styles.back}`}>
          {faces[1] && <Card {...faces[1]} />}
        </div>
      </div>
    </div>
  );
}
