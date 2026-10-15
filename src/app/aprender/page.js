import { connection } from "next/server";
import Container from "@/shared/components/Container/";
import Stack from "@/shared/components/Stack/";
import DelayedClickFlipCard from "./components/DelayedClickFlipCard/";
import CARDS from "@/shared/data/";
import styles from "./page.module.css";



export default async function AprenderPage() {
  await connection();

  const randomIndex = Math.floor(
    Math.random() * CARDS.length
  );

  const card = CARDS[randomIndex];
  
  return (
    <main className={styles.page}>
      <Container size="xl">
        <Stack
          gap="md"
          align="center"
          justify="center"
        >
        
          <DelayedClickFlipCard
            item={card}
            delay={3000}
            duration={800}
          />

        </Stack>
      </Container>
    </main>
  );
}