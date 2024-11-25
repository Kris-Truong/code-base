import React, { useState, useEffect } from "react";
import { Routes } from "@config/routes";
import Link from "next/link";
import Modal from "./components/Modal";
import HeroSection from "./components/HeroSection"
import styles from "./index.module.css";

const IssuesPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Track window size and update `isSmallScreen`
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 930);
      if (window.innerWidth > 930 && isMenuOpen) {
        setIsMenuOpen(false); // Close menu on larger screens
      }
    };

    handleResize(); // Set initial screen size
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false); // Close menu when link is clicked
    }
  };

  function toggleChat() {
    setIsChatOpen(!isChatOpen);
  }

  return (
    <div>
      <header className={styles.header}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.logo} src="/icons/logo-large.svg" alt="Prolog logo" />
        <ul
          className={`${styles.navBar} ${
            isMenuOpen && isSmallScreen ? styles.open : ""
          }`}
        >
          <li>
            <Link href="/" onClick={handleLinkClick}>Home</Link>
          </li>
          <li>
            <Link href="/products" onClick={handleLinkClick}>Products</Link>
          </li>
          <li>
            <Link href="/documentation" onClick={handleLinkClick}>Documentation</Link>
          </li>
          <li>
            <Link href="/pricing" onClick={handleLinkClick}>Pricing</Link>
          </li>
          {isMenuOpen && isSmallScreen && (
            <li><div className={styles.dashboardContainer}>
              <a href={Routes.projects}>Open Dashboard</a>
            </div></li>
          )}
        </ul>
        <button className={styles.menuButton} onClick={toggleMenu}>
          ☰
        </button>
        {!isSmallScreen && (
          <a className={styles.dashboardLink} href={Routes.projects}>
            Open Dashboard
          </a>
        )}
      </header>
      <HeroSection isMenuOpen={isMenuOpen}/>
      <button className={styles.contactButton} onClick={toggleChat}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/message.svg" alt="Contact" />
      </button>
      {isChatOpen && <Modal toggleChat={toggleChat}/>}
    </div>
  );
};

export default IssuesPage;
