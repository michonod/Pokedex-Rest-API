import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Pokedex</h1>
      <Link href="/allpokemons/00">
        <span className={styles.buttonStart}>Catch them all</span>
      </Link>
    </div>
  );
};

export default Home;
