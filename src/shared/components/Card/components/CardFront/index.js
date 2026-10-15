import styles from "./CardFront.module.css";

export default function CardFront({
  letter,
  lowercase,
  word,
  image,
}) {
  return (
    <div className={styles.front}>
      <header className={styles.header}>
        <span className={styles.uppercase}>{letter}</span>
        <span className={styles.lowercase}>{letter.toLowerCase()}</span>
      </header>

      <div className={styles.body}>
        <img
          className={styles.image}
          src={image}
          alt={word}
        />
      </div>

      <footer className={styles.footer}>
        <span className={styles.wordPrint}>{word}</span>
        <span className={styles.wordCursive}>
          {word.toLowerCase()}
        </span>
      </footer>
    </div>
  );
}