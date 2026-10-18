
import styles from "./TitleColors.module.css";

const colors = [
  "var(--color-yellow)",
  "var(--color-blue)",
  "var(--color-pink)",
  "var(--color-purple)",

  "var(--color-green)",


  "var(--color-red)",

];

export default function TitleColors({
  text = "Aprender a leer",
}) {

  let colorIndex = 0;

  return (
    <h1 className={styles.title}>
      {text.trim().split(/\s+/).map((word, wordIndex) => (
        <span className={styles.word} key={wordIndex}>
          {Array.from(word).map((char, index) => {
            const color = colors[colorIndex % colors.length];
            colorIndex++;

            return (
              <span key={index} style={{ color }}>
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
