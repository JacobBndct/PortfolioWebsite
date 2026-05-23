"use client";

import { useEffect, useRef, ReactNode } from "react";
import Link from "next/link";
import VanillaTilt, { TiltOptions } from "vanilla-tilt";
import fitty from "fitty";

import styles from "./featuredItems.module.css";

// -------------------- Types --------------------

interface TiltProps extends React.HTMLAttributes<HTMLDivElement> {
  options: TiltOptions;
  children: ReactNode;
}

interface FeaturedItemProps {
  link: string;
  mediaType: string;
  name: string;
  img: string;
  description: string;
  date: string;
}

// -------------------- Tilt Wrapper --------------------

function Tilt({ options, children, ...rest }: TiltProps) {
  const tiltRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, options);
    }
  }, [options]);

  return (
    <div ref={tiltRef} {...rest}>
      {children}
    </div>
  );
}

// -------------------- Color Helpers --------------------

function cardColour(type: string, opacity: number): string {
  return `rgba(var(--${type.toLowerCase()}-colour), ${opacity})`;
}

function cardColourBlendWhite(type: string, percent: number): string {
  return `color-mix(in srgb, rgb(var(--${type.toLowerCase()}-colour)) ${percent}%, white)`;
}

// -------------------- Featured Item Component --------------------

export default function FeaturedItem({
  link,
  mediaType,
  name,
  img,
  description,
  date,
}: FeaturedItemProps) {
  useEffect(() => {
    fitty(`.${styles["featured-item-title"]}`, {
      maxSize: 300,
      minSize: 6,
    });
  }, []);

  const options: TiltOptions = {
    reverse: true,
    glare: true,
    "max-glare": 0.3,
    scale: 1.1,
    speed: 1000,
    max: 20,
  };

  return (
    <Tilt className={`${styles["featured-item-card"]} shadow rounded`} options={options}>
      <div className={styles["featured-item-card-floating"]}>
        <div className={styles["featured-item-notes"]}>
          <p className={styles["featured-item-creators"]}>
            <b>Creator: Jacob Benedict</b>
          </p>
          <p className={styles["featured-item-date"]}>
            <i>{date}</i>
          </p>
        </div>

        <div
          className={`${styles["description-text"]} shadow-sm`}
          style={{
            backgroundColor: `color-mix(in srgb, ${cardColour(
              mediaType,
              0.7
            )} 40%, white)`,
            borderColor: cardColour(mediaType, 0.9),
          }}
        >
          <p>{description}</p>
        </div>
      </div>

      <div className={`${styles["card-outer"]}`}>
        <Link className={styles["featured-item-link"]} href={link}>
          <div
            className={styles["featured-item-background"]}
            style={{
              backgroundImage: `url(/card_backgrounds/${mediaType.toLowerCase()}.jpg)`,
            }}
            data-tilt
          >
            <div
              className={styles["featured-item-container"]}
              style={{ backgroundColor: cardColour(mediaType, 0.8) }}
            >
              <div
                className={`${styles["title-container"]} rounded shadow-sm`} 
                style={{
                  backgroundColor: cardColourBlendWhite(mediaType, 50),
                  borderColor: cardColour(mediaType, 0.9),
                }}
              >
                <div className={styles["fit-container"]}>
                  <h4 className={styles["featured-item-title"]}>{name}</h4>
                </div>
              </div>

              <img
                className={`${styles["preview-image"]} shadow-sm`}
                src={img}
                alt={name}
                style={{ borderColor: cardColour(mediaType, 0.9) }}
              />

              <h5
                className={`${styles["featured-item-type"]} rounded shadow-sm`}
                style={{
                  backgroundColor: cardColourBlendWhite(mediaType, 50),
                  borderColor: cardColour(mediaType, 0.9),
                }}
              >
                {mediaType}
              </h5>
            </div>
          </div>
        </Link>
      </div>
    </Tilt>
  );
}