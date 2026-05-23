"use client";

import { useEffect, useState, useRef, ReactNode } from "react";
import styles from "./carousel.module.css";

import Image from "next/image";

interface WindowDimensions {
  width: number;
  height: number;
}

interface CarouselProps {
  children: React.ReactNode | React.ReactNode[];
  show: number;
  length: number;
  autoScroll?: boolean;
}

// -------------------- Window Size Hook --------------------

function getWindowDimensions(): WindowDimensions {
  if (typeof window === "undefined") {
    return { width: 0, height: 0 };
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

function useWindowDimensions(): WindowDimensions {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

// -------------------- Interval Hook --------------------

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const tick = () => savedCallback.current?.();
    const id = setInterval(tick, delay);

    return () => clearInterval(id);
  }, [delay]);
}

// -------------------- Carousel Component --------------------

export default function Carousel({
  children,
  show,
  length,
  autoScroll = true,
}: CarouselProps) {
  // -------------------- Helper Functions (MUST COME FIRST) --------------------

  const renderDots = (index: number): ReactNode => {
    if (length <= 1) return null;

    const output: ReactNode[] = [];
    for (let i = 0; i < length; i++) {
      output.push(
        <span
          key={i}
          className={i === index ? styles["highlighted-dot"] : styles["dot"]}
        />
      );
    }
    return output;
  };

  const renderExtraPrev = (): ReactNode[] => {
    if (!children || !Array.isArray(children)) return [];
    const output: ReactNode[] = [];
    for (let i = 0; i < show; i++) {
      output.push(children[length - 1 - i]);
    }
    return output.reverse();
  };

  const renderExtraNext = (): ReactNode[] => {
    if (!children || !Array.isArray(children)) return [];
    const output: ReactNode[] = [];
    for (let i = 0; i < show; i++) {
      output.push(children[i]);
    }
    return output;
  };

  // -------------------- Hooks (MUST ALWAYS RUN IN ORDER) --------------------

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const widthLimit = 1800;
  const resetInterval = 10000;
  const shortInterval = 3000;

  const countRef = useRef(0);

  const [canClick, setCanClick] = useState(true);
  const [hasInteracted, setInteracted] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [pauseAutoScroll, setPauseAutoScroll] = useState(false);

  const { width } = useWindowDimensions();

  const [currentIndex, setCurrentIndex] = useState(
    show === 1 ? 0 : show
  );

  const [touchPosition, setTouchPosition] = useState<number | null>(null);
  const [isShowingDots, setShowingDots] = useState(true);
  const [dots, setDots] = useState<ReactNode>(null);

  // Update dots
  useEffect(() => {
    setDots(renderDots(currentIndex % length));
  }, [currentIndex]);

  // Disable auto-scroll on mobile
  useEffect(() => {
    setPauseAutoScroll(width < widthLimit);
  }, [width]);

  // -------------------- Navigation --------------------

  const next = () => {
    setCurrentIndex((prev) => prev + 1);
    setTransitionEnabled(true);
  };

  const prev = () => {
    setCurrentIndex((prev) => prev - 1);
    setTransitionEnabled(true);
  };

  const leftButton = () => {
    if (!canClick) return;
    prev();
    setCanClick(false);
    setInteracted(true);
    countRef.current = 0;
  };

  const rightButton = () => {
    if (!canClick) return;
    next();
    setCanClick(false);
    setInteracted(true);
    countRef.current = 0;
  };

  // -------------------- Auto Scroll --------------------

  useInterval(() => {
    if (hasInteracted || !autoScroll || pauseAutoScroll) return;
    next();
  }, shortInterval);

  // Reset interaction timer
  useInterval(() => {
    countRef.current += 1000;
    if (countRef.current >= resetInterval) {
      setInteracted(false);
      countRef.current = 0;
    }
  }, 1000);

  // -------------------- Transition Looping --------------------

  const handleTransitionEnd = () => {
    if (currentIndex <= 0) {
      setTransitionEnabled(false);
      setCurrentIndex(length);
    } else if (currentIndex >= length + show) {
      setTransitionEnabled(false);
      setCurrentIndex(show);
    }
    setCanClick(true);
  };

  // -------------------- Touch Controls --------------------

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchPosition === null) return;

    const diff = touchPosition - e.touches[0].clientX;

    if (diff > 5) rightButton();
    if (diff < -5) leftButton();

    setTouchPosition(null);
  };

  // -------------------- Safe Early Return --------------------

  if (!mounted) return null;

  // -------------------- Render --------------------

  return (
    <div
      className={styles["carousel-container"]}
      onMouseOver={() => setPauseAutoScroll(true)}
      onMouseOut={() => setPauseAutoScroll(false)}
    >
      <div className={styles["carousel-wrapper"]}>
        {length > 1 && (
          <button onClick={leftButton} className={styles["left-arrow"]}>
            <Image src="/images/left-arrow.svg" alt="Left Arrow" width={25} height={25} />
          </button>
        )}

        <div
          className={styles["carousel-content-wrapper"]}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className={styles["carousel-content"]}
            style={{
              width: `calc((83.5% / ${width < widthLimit ? 1 : show}))`,
              transform:
                length > 1
                  ? `translateX(-${currentIndex * 120}%)`
                  : "0%",
              transition: transitionEnabled ? undefined : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {renderExtraPrev()}
            {children}
            {renderExtraNext()}
          </div>
        </div>

        {length > 1 && (
          <button onClick={rightButton} className={styles["right-arrow"]}>
            <Image src="/images/right-arrow.svg" alt="Right Arrow" width={25} height={25} />
          </button>
        )}
      </div>

      <div
        className={`${styles[`dot-container`]} ${
          isShowingDots ? "dot-show" : "dot-hidden"
        }`}
        onTransitionEnd={() => setShowingDots(false)}
      >
        {dots}
      </div>
    </div>
  );
}