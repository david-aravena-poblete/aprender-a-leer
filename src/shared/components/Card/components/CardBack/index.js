import styles from "./CardBack.module.css";

export default function CardBack({ letter = "A" }) {
  return (
    <span className={styles.card__backLetter}>
      {letter}
    </span>
  );
}