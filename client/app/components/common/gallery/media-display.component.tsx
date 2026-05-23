"use client";

import { useState, ReactNode } from "react";
import styles from "./mediaDisplay.module.css";

import Carousel from "../carousel/carousel.component";
import Modal from "./modal.component";

import { Media, Breakdown } from "@/app/types/media.types";

// -------------------- Types --------------------

interface MediaDisplayProps {
  children: ReactNode;
  media: Media;
}

// -------------------- Helpers --------------------

function ShowMedia(media: Media): ReactNode[] {
  const items: ReactNode[] = [
    <div className={styles["BreakdownItem"]} key="main">
      <img
        className={styles["MediaDisplayImage"]}
        src={media.previewImageURL}
        alt="media"
      />
      <p>{media.description}</p>
    </div>,
  ];

  if (media.breakdowns) {
    items.push(
      ...media.breakdowns.map((b, i) => (
        <div className={styles["BreakdownItem"]} key={i}>
          <img
            className={styles["MediaDisplayImage"]}
            src={b.breakdownLink}
            alt="media"
          />
          <p>{b.breakdownDescription}</p>
        </div>
      ))
    );
  }

  return items;
}

// -------------------- Component --------------------

export default function MediaDisplay({ children, media }: MediaDisplayProps) {
  const [isShow, setShow] = useState(false);

  const toggleModal = () => setShow((prev) => !prev);

  const date = new Date(media.dateOfCreation);

  return (
    <>
      <div onClick={toggleModal}>{children}</div>

      <Modal show={isShow} onClose={toggleModal}>
        <div className={styles["MediaDisplayHeader"]}>
          <h2>{media.name}</h2>
          <p>{date.toDateString().split(" ").slice(1).join(" ")}</p>
        </div>

        {media.link && (
          <p>
            Media Link:{" "}
            <a href={media.link} target="_blank" rel="noreferrer">
              {media.link}
            </a>
          </p>
        )}

        <div className={styles["MediaDisplayCarousel"]}>
          <Carousel
            show={1}
            length={1 + (media.breakdowns?.length ?? 0)}
            autoScroll={false}
          >
            {ShowMedia(media)}
          </Carousel>
        </div>
      </Modal>
    </>
  );
}
