import React, { useState } from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";

function NavbarCmp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>ContactBook</div>

      <div
  className={`${styles.hamburger} ${isOpen ? styles.hamburgerActive : ""}`}
  onClick={() => setIsOpen(!isOpen)}
>
  <span></span>
  <span></span>
  <span></span>
</div>



      <ul className={`${styles.navLinks} ${isOpen ? styles.active : ""}`}>
        <li>
          <Link 
            to="/contact" 
            className={styles.link} 
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/add-contact" 
            className={styles.link} 
            onClick={() => setIsOpen(false)}
          >
            Add Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarCmp;
