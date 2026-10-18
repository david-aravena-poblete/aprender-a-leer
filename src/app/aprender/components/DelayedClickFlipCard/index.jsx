"use client";

import { useEffect, useRef, useState } from "react";
import Card from "@/shared/components/Card";
import styles from "./DelayedFlipCard.module.css";

export default function DelayedClickFlipCard({
  card,
  delay = 3000,
  duration = 800,
  canInteract = true,
  startInitialFlip = null,
  onCardClick,
}) {
  const [rotation, setRotation] = useState(0);
  const [clickEnabled, setClickEnabled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const delayTimerRef = useRef(null);
  const animationTimerRef = useRef(null);

  useEffect(() => {
    if (!card) return;

    if (startInitialFlip === false) return;

    const beginInitialFlip = () => {
      setIsAnimating(true);
      setRotation(180);

      animationTimerRef.current = setTimeout(() => {
        setIsAnimating(false);
        setClickEnabled(true);
      }, duration);
    };

    if (startInitialFlip === true) {
      beginInitialFlip();
    } else {
      delayTimerRef.current = setTimeout(beginInitialFlip, delay);
    }

    return () => {
      clearTimeout(delayTimerRef.current);
      clearTimeout(animationTimerRef.current);
    };
  }, [card, delay, duration, startInitialFlip]);

  const handleClick = () => {
    if (!canInteract || !clickEnabled || isAnimating) return;

    onCardClick?.(rotation % 360 === 0 ? "back" : "front");
    setIsAnimating(true);
    const nextRotation = rotation + 180;
    setRotation(nextRotation);

    clearTimeout(animationTimerRef.current);

    animationTimerRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, duration);
  };

  if (!card) {
    return <div className={styles.placeholder} />;
  }

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
            {...card}
            face="back"
          />
        </div>

        <div className={`${styles.face} ${styles.back}`}>
          <Card
            {...card}
            face="front"
          />
        </div>
      </div>
    </div>
  );
}
