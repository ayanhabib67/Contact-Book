import React from "react";
import NavbarCmp from "../../components/NavbarCmp";
import FooterCmp from "../../components/footerCmp";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

let NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <NavbarCmp />

      <main className={styles.mainContent}>
        <div className={styles.container}>
          <h1 className={styles.title}>404</h1>
          <p className={styles.message}>
            Oops! The page you are looking for doesn’t exist.
          </p>
          <Link to="/" className={styles.button}>
            Go Back Home
          </Link>
        </div>
      </main>

      <FooterCmp />
    </div>
  );
};

export default NotFound;
