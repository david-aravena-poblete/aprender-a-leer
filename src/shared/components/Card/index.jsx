import CardFront from "./components/CardFront/";
import CardBack from "./components/CardBack/";
import styles from "./Card.module.css";


export default function Card({
  letter = "A",
  word = "Abeja",
  image = "/images/A.png",
  color = "yellow",
  face = "front",
}) {
  return (
    <div className={styles.cardFrame}>
      <article
        className={styles.card}
        style={{
          "--card-border-color": `var(--color-${color})`,
        }}
      >
        {face === "back" ? (
          <div className={styles.card__back}>
            <CardBack letter={letter} />
          </div>
        ) : (
          <CardFront
            letter={letter}
            word={word}
            image={image}
          />
        )}
      </article>
    </div>
  );
}

