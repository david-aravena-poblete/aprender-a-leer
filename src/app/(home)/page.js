import styles from "./page.module.css";

import Container from "@/shared/components/Container/";
import Stack from "@/shared/components/Stack/";
import Card from "@/shared/components/Card/";
import Button from "@/shared/components/Button/";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <Container size="xl">
        <Stack gap="md" align="center" justify="center">
          <h1 className={styles.title}>
            Aprender a leer
          </h1>

          <Card
            letter="A"
            lowercase="a"
            word="Abeja"
            image="/A.png"
            color="yellow"
          />

          <Button className={styles.startButton}>
            Comenzar
          </Button>
        </Stack>
      </Container>
    </main>
  );
}