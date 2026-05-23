"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./gallery.module.css";

interface GalleryNavProps {
  mediaType_id: string;
  mediaType: string;
}

function cardColour(type: string): string {
  return `rgb(var(--${type.toLowerCase()}-colour))`;
}

async function getMediaCount(media_id: string): Promise<number> {
  try {
    const response = await axios.get<number>(
      `https://jacobbndct.ca/media/typeCount_${media_id}`
    );
    return response.data;
  } catch (err) {
    console.error("Error:", err);
    return 0;
  }
}

export default function GalleryNav({ mediaType_id, mediaType }: GalleryNavProps) {
  const [background, setBackground] = useState<string>("var(--primary-colour)");
  const [mediaCount, setMediaCount] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const count = await getMediaCount(mediaType_id);
      setMediaCount(count);
    }
    fetchData();
  }, [mediaType_id]);

  const handleMouseOver = () => {
    setBackground(cardColour(mediaType));
  };

  const handleMouseOut = () => {
    setBackground("var(--primary-colour)");
  };

  return (
    <div className={styles["normal-section"]}>
      <div>
        <p>Items: {mediaCount}</p>
      </div>

      <div className={styles["filter-nav"]}>
        <div>
          <p>Tool 1 Tool 2 Tool 3</p>
        </div>

        <div className={styles["filter-nav-dropdowns"]}>
          <div className={styles["filter-nav-dropdown"]}>
            <p className={styles["filter-nav-dropbtn"]}>Skills</p>
            <div className={styles["filter-nav-dropdown-content"]}>
              <button>Test 1</button>
              <button>Test 2</button>
              <button>Test 3</button>
            </div>
          </div>

          <div className={styles["filter-nav-dropdown"]}>
            <p className={styles["filter-nav-dropbtn"]}>Sort</p>
            <div className={styles["filter-nav-dropdown-content"]}>
              <button>Test 1</button>
              <button>Test 2</button>
              <button>Test 3</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}