"use client";

import { useState, useEffect } from "react";
import Epona from "./Epona.component";

import styles from "./ocarina.module.css"

const songs: Record<string, string> = {
  "Eponas Song": "ULRULR",
};

function detectSong(input: string): string | null {
  for (const [name, pattern] of Object.entries(songs)) {
    if (pattern === input) {
      return name;
    }
  }
  return null;
}

export default function Ocarina() {
  const [nothing, setNothing] = useState(false);
  const [recording, setRecording] = useState<boolean>(false);
  const [keys, setKeys] = useState<string[]>([]);
  const [flash, setFlash] = useState(false);

  const [eponaSongPlayed, setEponaSongPlayed] = useState<boolean>(false);
  const keyMap: Record<string, string> = {
    ArrowUp: "U",
    ArrowDown: "D",
    ArrowLeft: "L",
    ArrowRight: "R",
    a: "A",
    A: "A"
  };

  function renderNotes() {
    return keys.map((k, i) => {
      const map: Record<string, string> = {
        U: styles.up,
        L: styles.left,
        R: styles.right,
        D: styles.down,
        A: styles.a
      };

      return <div key={i} className={`${styles.note} ${map[k]} ${flash ? styles.flashCorrect : ""}`} />;
    });
  }

  const handleKeyDown = (e: KeyboardEvent): void => {
    if (!recording) return;

    const mapped = keyMap[e.key];
    if (mapped) {
      setNothing(false);
      setKeys((prev) => {
        if (prev.length >= 6) return prev;
        return [...prev, mapped];
      });
    }
  };

  useEffect(() => {
    if (keys.length === 6) {
      const input = keys.join("");
      const song = detectSong(input);
      setEponaSongPlayed(false); 

      if (song) {
        if (song === "Eponas Song") {
            setFlash(true);
            setTimeout(() => setFlash(false), 600);
            setEponaSongPlayed(true);
        }
      } else {
        setNothing(true); 
      }

      setTimeout(() => setKeys([]), 300);
    }
  }, [keys]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [recording]);

  const toggleRecording = (): void => {
    setKeys([]);
    setRecording((prev) => !prev);
  };

  return (
    <div className={`${styles.ocarinaBox} standard-section light-section`}>
      <h4>Ocarina</h4>

      <p>
        To try playing a song, start by click the "Play" button and then use the arrow keys and A key to input up to 6‑notes. To stop recording inputs or reset just click the "Cancel" button.
      </p>

      <button className={styles.ocarinaButton} type="button" onClick={toggleRecording}>
        {recording ? "Cancel" : "Play"}
      </button>

      <div className={styles.musicSheet}>
        {renderNotes()}
      </div>

      {nothing && <div className={styles.nothing}>Nothing happened ...</div>}


      <Epona visible={eponaSongPlayed} />
    </div>
  );
}