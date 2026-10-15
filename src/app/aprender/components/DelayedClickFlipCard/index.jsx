"use client";

import { useEffect, useRef, useState } from "react";
import Card from "@/shared/components/Card";
import CARDS from "@/shared/data/";
import styles from "./DelayedFlipCard.module.css";

export default function DelayedClickFlipCard({
  delay = 3000,
  duration = 800,
}) {
  const [item, setItem] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [clickEnabled, setClickEnabled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const delayTimerRef = useRef(null);
  const animationTimerRef = useRef(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * CARDS.length);
    setItem(CARDS[randomIndex]);
  }, []);

  useEffect(() => {
    if (!item) return;

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
  }, [item, delay, duration]);

  const handleClick = () => {
    if (!clickEnabled || isAnimating) return;

    setIsAnimating(true);
    setRotation((currentRotation) => currentRotation + 180);

    clearTimeout(animationTimerRef.current);

    animationTimerRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, duration);
  };

  if (!item) {
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
