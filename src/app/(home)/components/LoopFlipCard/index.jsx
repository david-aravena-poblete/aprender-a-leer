"use client";

import { useEffect, useRef, useState } from "react";
import Card from "@/shared/components/Card";
import styles from "./LoopFlipCard.module.css";

export default function LoopFLipCard({
  items = [],
  interval = 3000,
  duration = 800,
}) {
  const [rotation, setRotation] = useState(0);

  const [frontIndex, setFrontIndex] = useState(0);
  const [backIndex, setBackIndex] = useState(
    items.length > 1 ? 1 : 0
  );

  const currentIndexRef = useRef(0);
  const rotationRef = useRef(0);

  useEffect(() => {
    if (items.length < 2) return;

    let changeContentTimer;

    const rotationTimer = setInterval(() => {
      const nextRotation = rotationRef.current + 180;

      rotationRef.current = nextRotation;
      setRotation(nextRotation);

      changeContentTimer = setTimeout(() => {
        const nextVisibleIndex =
          (currentIndexRef.current + 1) % items.length;

        const followingIndex =
          (nextVisibleIndex + 1) % items.length;

        currentIndexRef.current = nextVisibleIndex;

        const backIsVisible =
          (nextRotation / 180) % 2 === 1;

        if (backIsVisible) {
          // La cara frontal está oculta.
          setFrontIndex(followingIndex);
        } else {
          // La cara trasera está oculta.
          setBackIndex(followingIndex);
        }
      }, duration);
    }, interval);

    return () => {
      clearInterval(rotationTimer);
      clearTimeout(changeContentTimer);
    };
  }, [items, interval, duration]);

  if (!items.length) return null;

  if (items.length === 1) {
    return <Card {...items[0]} />;
  }

  return (
    <div className={styles.scene}>
      <div
        className={styles.rotator}
        style={{
          transform: `rotateY(${rotation}deg)`,
          transitionDuration: `${duration}ms`,
        }}
      >
        <div className={`${styles.face} ${styles.front}`}>
          <Card {...items[frontIndex]} />
        </div>

        <div className={`${styles.face} ${styles.back}`}>
          <Card {...items[backIndex]} />
        </div>
      </div>
    </div>
  );
}