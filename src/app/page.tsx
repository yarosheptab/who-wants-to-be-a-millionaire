import StartSection from '@/components/home-page/start-section';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <StartSection />
      </main>
    </div>
  );
}
