"use client";

import { useState } from "react";
import styles from "./gallery.module.css";

interface GalleryItemProps {
  name: string;
  img: string;
  mediaType: string;
  description?: string;
  date?: string;
  toolIcons?: React.ReactNode;
  breakdownIcons?: React.ReactNode;
}

function cardColour(type: string): string {
  return `rgb(var(--${type.toLowerCase()}-colour))`;
}

export default function GalleryItem({
  name,
  img,
  mediaType,
  toolIcons,
  breakdownIcons,
}: GalleryItemProps) {
  const [background, setBackground] = useState<string>(
    "var(--primary-colour)"
  );

  const handleMouseOver = () => {
    setBackground(cardColour(mediaType));
  };

  const handleMouseOut = () => {
    setBackground("var(--primary-colour)");
  };

  return (
    <div
      className={`${styles["gallery-item-container"]} ${styles.shadow} rounded box ${styles["gallery-item-animate"]}`}
      style={{
        background,
        transition: "background 150ms ease-in-out",
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className={styles["gallery-item-header"]}>
        {toolIcons}
        <h4 className={`${styles["gallery-item-name"]} ${styles["filter-white"]}`}>
          {name}
        </h4>
      </div>

      <div className={styles["gallery-item-media"]}>{breakdownIcons}</div>

      <div className={styles["gallery-item-thumbnail-container"]}>
        <img
          className={styles["gallery-item-thumbnail"]}
          src={img}
          alt={name}
        />
      </div>
    </div>
  );
}