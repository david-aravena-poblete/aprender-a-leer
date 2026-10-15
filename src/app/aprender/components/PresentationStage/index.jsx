import Button from "@/shared/components/Button/";
import DelayedClickFlipCard from "../DelayedClickFlipCard/";
import styles from "./PresentationStage.module.css";

export default function PresentationStage({
  card,
  delay,
  duration,
  onContinue,
}) {
  return (
    <section className={styles.stage}>
      <div className={styles.content}>
        <DelayedClickFlipCard
          card={card}
          delay={delay}
          duration={duration}
        />
      </div>

      <div className={styles.continueArea}>
        <Button
          className={styles.continueButton}
          onClick={onContinue}
        >
          Continuar
        </Button>
      </div>
    </section>
  );
}
