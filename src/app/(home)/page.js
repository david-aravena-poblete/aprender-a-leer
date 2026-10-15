import Container from "@/shared/components/Container/";
import Stack from "@/shared/components/Stack/";
import LoopFlipCard from "./components/LoopFlipCard/";
import Button from "@/shared/components/Button/";
import styles from "./page.module.css";
import cards from "@/shared/data/";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <Container size="xl">
        <Stack gap="md" align="center" justify="center">
          <h1 className={styles.title}>
            Aprender a leer
          </h1>

          <LoopFlipCard
            items={cards}
            interval={1000}
            duration={1000}
          />

          <Button className={styles.startButton}>
            Comenzar
          </Button>
        </Stack>
      </Container>
    </main>
  );
}