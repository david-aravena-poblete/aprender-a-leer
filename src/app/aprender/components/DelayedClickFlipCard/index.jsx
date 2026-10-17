"use client";

import { useEffect, useRef, useState } from "react";
import Card from "@/shared/components/Card";
import styles from "./DelayedFlipCard.module.css";

export default function DelayedClickFlipCard({
  card,
  delay = 3000,
  duration = 800,
  canInteract = true,
  onFlipComplete,
}) {
  const [rotation, setRotation] = useState(0);
  const [clickEnabled, setClickEnabled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const delayTimerRef = useRef(null);
  const animationTimerRef = useRef(null);

  useEffect(() => {
    if (!card) return;

    delayTimerRef.current = setTimeout(() => {
      setIsAnimating(true);
      setRotation(180);

      animationTimerRef.current = setTimeout(() => {
        setIsAnimating(false);
        setClickEnabled(true);
      }, duration);
    }, delay);

    return () => {
      clearTimeout(delayTimerRef.current);
      clearTimeout(animationTimerRef.current);
    };
  }, [card, delay, duration]);

  const handleClick = () => {
    if (!canInteract || !clickEnabled || isAnimating) return;

    setIsAnimating(true);
    const nextRotation = rotation + 180;
    setRotation(nextRotation);

    clearTimeout(animationTimerRef.current);

    animationTimerRef.current = setTimeout(() => {
      setIsAnimating(false);
      onFlipComplete?.(nextRotation % 360 === 0 ? "back" : "front");
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
