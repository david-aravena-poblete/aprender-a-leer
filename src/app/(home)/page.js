import Container from "@/shared/components/Container/";
import Stack from "@/shared/components/Stack/";
import LoopFlipCard from "./components/LoopFlipCard/";
import TitleColors from "./components/TitleColors";
import Button from "@/shared/components/Button/";
import styles from "./page.module.css";
import cards from "@/shared/data/";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <Container size="xl">
        <Stack gap="md" align="center" justify="center">

        
          <TitleColors text="Aprender a leer" />

          <LoopFlipCard
            items={cards}
            interval={1000}
            duration={1000}
          />

          <Button href="/aprender" className={styles.startButton}>
            Comenzar
          </Button>

        </Stack>
      </Container>
    </main>
  );
}