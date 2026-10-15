import Container from "@/shared/components/Container/";
import Stack from "@/shared/components/Stack/";
import DelayedClickFlipCard from "./components/DelayedClickFlipCard/";
import styles from "./page.module.css";

export default function AprenderPage() {
  return (
    <main className={styles.page}>
      <Container size="xl">
        <Stack
          gap="md"
          align="center"
          justify="center"
        >

          <DelayedClickFlipCard
            delay={3000}
            duration={800}
          />
          
        </Stack>
      </Container>
    </main>
  );
}
