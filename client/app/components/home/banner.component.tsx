"use client";

import styles from "./homepage.module.css";

export default function Banner() {
  return (
    <div className={styles.banner}>
      <div className={styles["art-section"]}></div>
      <div className={styles["game-section"]}></div>
      <div className={styles["tech-art-section"]}></div>
      <div className={styles["programming-section"]}></div>

      <div className={styles["banner-textbox"]}>
        <div className={styles["banner-align"]}>
          <h1 className={`${styles["banner-h1"]} shadow-xl`}>Jacob Benedict</h1>
          <h3 className={`${styles["banner-h3"]} shadow-xl`}>
             Software Engineering & Game Developer
          </h3>
        </div>
      </div>
    </div>
  );
}