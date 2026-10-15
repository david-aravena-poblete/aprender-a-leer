"use client";

import { useEffect, useState } from "react";
import Card from "@/shared/components/Card";
import styles from "./DelayedFlipCard.module.css";

export default function DelayedClickFlipCard({
  item,
  delay = 3000,
  duration = 800,
}) {
  const [rotation, setRotation] = useState(0);
  const [clickEnabled, setClickEnabled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRotation(180);
      setClickEnabled(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleClick = () => {
    if (!clickEnabled) return;

    setRotation((currentRotation) => currentRotation + 180);
  };

  return (
    <div className={styles.scene}>
      <div
        className={styles.rotator}
        onClick={handleClick}
        style={{
          transform: `rotateY(${rotation}deg)`,
          transitionDuration: `${duration}ms`,
        }}
      >
        <div className={`${styles.face} ${styles.front}`}>
          <Card
            {...item}
            face="front"
          />
        </div>

        <div className={`${styles.face} ${styles.back}`}>
          <Card
            {...item}
            face="back"
          />
        </div>
      </div>
    </div>
  );
}