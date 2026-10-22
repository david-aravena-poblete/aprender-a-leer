import TitleColors from "./components/TitleColors";
import Button from "@/shared/components/Button/";
import RotatingCard from "@/ui/RotatingCard";
import cards from "@/shared/data/";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.homeContent}>
        <div className={styles.titleContainer}>
          <TitleColors text="Aprender a leer" />
        </div>
        <div className={styles.cardContainer}>
          <RotatingCard cards={cards} />
        </div>
        <div className={styles.buttonContainer}>
          <Button href="/aprender" className={styles.startButton}>
            Comenzar
          </Button>
        </div>
      </div>
    </div>
  );
}
