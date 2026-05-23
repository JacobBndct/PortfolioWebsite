"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import axios from "axios";

import GalleryItem from "./gallery-item.component";
import MediaDisplay from "./media-display.component";

import { Media, Breakdown } from "@/app/types/media.types";
import styles from "./gallery.module.css";

// -------------------- Types --------------------

interface GalleryProps {
  mediaType_id: string;
}

// -------------------- Dynamic SVG Icon Loader --------------------

type IconProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  name: string;
};

export function Icon({ name, ...rest }: IconProps) {
  if (!name) return null;

  return <img src={`/images/mediaTypes/${name}.svg`} {...rest} />;
}

// -------------------- Breakdown Helpers --------------------

function findMediaTypeHelper(breakdowns: Breakdown[] | undefined): string[] {
  if (!breakdowns) return [];

  const types: string[] = [];

  for (const breakdown of breakdowns) {
    if (!types.includes(breakdown.type) && breakdown.type !== "image") {
      types.push(breakdown.type);
    }
  }

  return types;
}

function findMediaType(breakdowns: Breakdown[] | undefined): ReactNode[] {
  const base = (
    <div className={`${styles["gallery-item-media-box"]} rounded`} key="base">
      <img className={`${styles["filter-white"]} ${styles["gallery-item-media-image"]}`} src="/images/mediaTypes/image.svg" alt="tool" />
    </div>
  );

  const breakdownTypes = findMediaTypeHelper(breakdowns);

  const icons = breakdownTypes.map((type) => (
    <div className={`${styles["gallery-item-media-box"]} rounded`} key={type}>
      <Icon
        width="100%"
        height="100%"
        className={styles["filter-white"]}
        name={type}
      />
    </div>
  ));

  return [base, ...icons];
}

// -------------------- Sorting --------------------

function sortMedia(items: ReactNode[]): ReactNode[][] {
  const col1: ReactNode[] = [];
  const col2: ReactNode[] = [];
  const col3: ReactNode[] = [];

  items.forEach((item, i) => {
    if (i % 3 === 0) col1.push(item);
    else if (i % 3 === 1) col2.push(item);
    else col3.push(item);
  });

  return [col1, col2, col3];
}

// -------------------- Generate Gallery Items --------------------

function generateGalleryItems(mediaData: Media[]): ReactNode[] {
  if (!mediaData || mediaData.length === 0) {
    console.log("gallery empty");
    return [];
  }

  return mediaData.map((media) => {
    const date = new Date(media.dateOfCreation);
    const type =
      media.typeOfMedia_ids.name.charAt(0).toUpperCase() +
      media.typeOfMedia_ids.name.slice(1);

    const toolName = media.tool_ids[0]?.name ?? null;

    if (!toolName) return;

    const mediaToolIcons = (
      <Icon
        className={`${styles["gallery-item-logo"]} ${styles["filter-white"]}`}
        name={toolName}
      />
    );

    const mediaBreakdownIcons = findMediaType(media.breakdowns);

    return (
      <MediaDisplay media={media} key={media._id}>
        <GalleryItem
          key={media._id}
          img={media.previewImageURL}
          mediaType={type}
          toolIcons={mediaToolIcons}
          name={media.name}
          date={date.toDateString().split(" ").slice(1).join(" ")}
          description={media.description}
          breakdownIcons={mediaBreakdownIcons}
        />
      </MediaDisplay>
    );
  });
}

// -------------------- Gallery Component --------------------

export default function Gallery({ mediaType_id }: GalleryProps) {
  const [media, setMedia] = useState<Media[]>([]);
  const [mediaLock, setMediaLock] = useState(false);
  const [skip, setSkip] = useState(0);

  const endRef = useRef<HTMLDivElement | null>(null);

  const getMedia = async (media_id: string, limit: number, offset: number) => {
    try {
      const response = await axios.get<Media[]>(
        `https://jacobbndct.ca/media/type_${media_id}?limit=${limit}&offset=${offset}`
      );
      setMedia((prev) => [...prev, ...response.data]);
      setSkip((prev) => prev + limit);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    if (!endRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !mediaLock) {
        setMediaLock(true);
        getMedia(mediaType_id, 1, skip).finally(() =>
          setMediaLock(false)
        );
      }
    });

    observer.observe(endRef.current);

    return () => observer.disconnect();
  }, [mediaType_id, skip, mediaLock]);

  const items = generateGalleryItems(media);
  const sortedItems = sortMedia(items);

  return (
    <div className={styles["wide-section"]}>
      <div className={styles["gallery-row"]}>
        <div className={styles["gallery-col"]}>
          {sortedItems[0]}
          <div ref={endRef} />
        </div>

        <div className={styles["gallery-col"]}>
          {sortedItems[1]}
          <div ref={endRef} />
        </div>

        <div className={styles["gallery-col"]}>
          {sortedItems[2]}
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
}