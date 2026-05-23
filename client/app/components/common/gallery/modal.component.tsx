"use client";

import { ReactNode } from "react";
import styles from "./modal.module.css";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ show, onClose, children }: ModalProps) {
  if (!show) return null;

  return (
    <div className={styles["modal-backdrop"]} onClick={onClose}>
      <div
        className={styles["modal-container"]}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles["modal-close"]} onClick={onClose}>
          ✕
        </button>

        <div className={styles["modal-images"]}>
          {children}
        </div>
      </div>
    </div>
  );
}