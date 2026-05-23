"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={`${styles["nav-bar"]} sticky-top`}>
      <div className={styles["navbar-inner"]}>
        
        {/* Brand */}
        <Link href="/" className={styles["navbar-brand"]}>
          JACOB BENEDICT
        </Link>

        {/* Mobile Toggle */}
        <button
          className={styles["navbar-toggle"]}
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <span className={styles["toggle-bar"]} />
          <span className={styles["toggle-bar"]} />
          <span className={styles["toggle-bar"]} />
        </button>
        
        {/* Social Icons */}
        <ul className={`${styles["navbar-social"]} ${styles["desktop-only"]}`}>
          <li>
            <a
              href="https://github.com/JacobBndct"
              target="_blank"
              rel="noreferrer"
              className={`${styles["nav-link"]} ${styles["nav-dir"]} ${styles["filter-white"]}`}
            >
              <img src="/images/github.svg" alt="github" height={35} />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/jacob-benedict"
              target="_blank"
              rel="noreferrer"
              className={`${styles["nav-link"]} ${styles["nav-dir"]} ${styles["filter-white"]}`}
            >
              <img src="/images/linkedin.svg" alt="linkedin" height={35} />
            </a>
          </li>
          <li>
            <a
              href="mailto:jacobbndct@gmail.com"
              target="_blank"
              rel="noreferrer"
              className={`${styles["nav-link"]} ${styles["nav-dir"]} ${styles["filter-white"]}`}
            >
              <img src="/images/envelope-solid.svg" alt="email" height={35} />
            </a>
          </li>
        </ul>
      </div>

      {/* Collapsible Menu (now sits BELOW navbar-inner on mobile) */}
      <div className={`${styles["navbar-collapse"]} ${open ? styles.open : ""}`}>
        <ul className={styles["navbar-links"]}>
          <li>
            <Link href="/Art" className={`${styles["nav-link"]} ${styles["nav-dir"]}`}>
              Art
            </Link>
          </li>
          <li>
            <Link href="/Game" className={`${styles["nav-link"]} ${styles["nav-dir"]}`}>
              Games
            </Link>
          </li>
          <li>
            <Link href="/Shader" className={`${styles["nav-link"]} ${styles["nav-dir"]}`}>
              Shaders
            </Link>
          </li>
          <li>
            <Link href="/Programming" className={`${styles["nav-link"]} ${styles["nav-dir"]}`}>
              Programming
            </Link>
          </li>
        </ul>

        {/* Social Icons */}
        <ul className={`${styles["navbar-social"]} ${styles["mobile-only"]}`}>
          <li>
            <a
              href="https://github.com/JacobBndct"
              target="_blank"
              rel="noreferrer"
              className={`${styles["nav-link"]} ${styles["nav-dir"]} ${styles["filter-white"]}`}
            >
              <img src="/images/github.svg" alt="github" height={35} />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/jacob-benedict"
              target="_blank"
              rel="noreferrer"
              className={`${styles["nav-link"]} ${styles["nav-dir"]} ${styles["filter-white"]}`}
            >
              <img src="/images/linkedin.svg" alt="linkedin" height={35} />
            </a>
          </li>
          <li>
            <a
              href="mailto:jacobbndct@gmail.com"
              target="_blank"
              rel="noreferrer"
              className={`${styles["nav-link"]} ${styles["nav-dir"]} ${styles["filter-white"]}`}
            >
              <img src="/images/envelope-solid.svg" alt="email" height={35} />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}