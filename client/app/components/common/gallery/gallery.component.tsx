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
      <img
        className={`${styles["filter-white"]} ${styles["gallery-item-media-image"]}`}
        src="/images/mediaTypes/image.svg"
        alt="tool"
      />
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
    console.log("[Gallery] No media to generate items from");
    return [];
  }

  return mediaData.map((media) => {
    const date = new Date(media.dateOfCreation);
    const type =
      media.typeOfMedia_ids.name.charAt(0).toUpperCase() +
      media.typeOfMedia_ids.name.slice(1);

    const toolName = media.tool_ids[0]?.name ?? null;
    const mediaToolIcons = toolName ? (
      <Icon className={`${styles["gallery-item-logo"]} ${styles["filter-white"]}`} name={toolName} />
    ) : null;

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
  console.log("[Render] Gallery render start");

  const [mediaMaxCount, setMediaMaxCount] = useState(0);
  const [media, setMedia] = useState<Media[]>([]);
  const [mediaLock, setMediaLock] = useState(false);
  const [skip, setSkip] = useState(0);

  const endRef = useRef<HTMLDivElement | null>(null);

  // Live refs for observer
  const skipRef = useRef(skip);
  const lockRef = useRef(mediaLock);
  const countRef = useRef(mediaMaxCount);

  useEffect(() => {
    lockRef.current = mediaLock;
    console.log("[Ref Sync] lockRef updated:", lockRef.current);
  }, [mediaLock]);

  useEffect(() => {
    countRef.current = mediaMaxCount;
    console.log("[Ref Sync] countRef updated:", countRef.current);
  }, [mediaMaxCount]);

  const getMedia = async (media_id: string, limit: number, offset: number) => {
    console.log(`[API] Requesting media: id=${media_id}, limit=${limit}, offset=${offset}`);

    try {
      const response = await axios.get<Media[]>(
        `https://jacobbndct.ca/media/type_${media_id}?limit=${limit}&offset=${offset}`
      );

      console.log("[API] Media response:", response.data);

      setMedia((prev) => [...prev, ...response.data]);
      setSkip((prev) => {
        const newSkip = prev + limit;
        skipRef.current = newSkip ;
        return newSkip;
      });

      console.log("[State] New skip:", skipRef.current + limit);
    } catch (err) {
      console.error("[API ERROR] getMedia failed:", err);
    }
  };

  const getMediaCount = async (media_id: string) => {
    console.log(`[API] Requesting media count for: ${media_id}`);

    try {
      const response = await axios.get<{ count: number }>(
        `https://jacobbndct.ca/media/typeCount/${media_id}`
      );

      console.log("[API] Count response:", response.data);
      console.log("[Fix] Using count:", response.data.count);

      setMediaMaxCount(response.data.count);
    } catch (err) {
      console.error("[API ERROR] getMediaCount failed:", err);
    }
  };

  // Load count once
  useEffect(() => {
    console.log("[Effect] mediaType_id changed → resetting gallery");
    setMedia([]);
    setSkip(0);
    getMediaCount(mediaType_id);
  }, [mediaType_id]);

  useEffect(() => {
    if (!endRef.current) return;

    console.log("[Effect] mediaMaxCount changed → forcing observer check");

    const rect = endRef.current.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom >= 0;

    if (inView) {
      console.log("[Effect] Sentinel visible → triggering load");

      if (!lockRef.current && skipRef.current < countRef.current) {
        lockRef.current = true;

        getMedia(mediaType_id, 3, skipRef.current).finally(() => {
          lockRef.current = false;
          console.log("[Effect] Forced load finished");
        });
      }
    }
  }, [mediaMaxCount]);

  // Create observer once
  useEffect(() => {
    if (!endRef.current) {
      console.log("[Observer] endRef not ready");
      return;
    }

    console.log("[Observer] Creating observer");

    const observer = new IntersectionObserver(([entry]) => {
      console.log("[Observer] Entry:", entry.isIntersecting);
      console.log("[Observer] Current values:", {
        skip: skipRef.current,
        max: countRef.current,
        lock: lockRef.current,
      });

      if (
        entry.isIntersecting &&
        !lockRef.current &&
        skipRef.current < countRef.current
      ) {
        console.log("[Observer] Conditions met → loading media");

        lockRef.current = true;

        getMedia(mediaType_id, 3, skipRef.current).finally(() => {
          lockRef.current = false;
          console.log("[Observer] Media load finished → lock released");
        });
      } else {
        console.log("[Observer] Conditions NOT met → no load");
      }
    });

    observer.observe(endRef.current);

    return () => {
      console.log("[Observer] Disconnecting observer");
      observer.disconnect();
    };
  }, [mediaType_id]);

  const items = generateGalleryItems(media);
  const sortedItems = sortMedia(items);

  console.log("[Render] Media count:", media.length);
  console.log("[Render] Max count:", mediaMaxCount);
  console.log("[Render] Skip:", skip);

  return (
    <div className={styles["wide-section"]}>
      <div className={styles["gallery-row"]}>
        <div className={styles["gallery-col"]}>{sortedItems[0]}</div>
        <div className={styles["gallery-col"]}>{sortedItems[1]}</div>
        <div className={styles["gallery-col"]}>{sortedItems[2]}</div>
      </div>

      <div ref={endRef} style={{ height: "20px" }} />
    </div>
  );
}
