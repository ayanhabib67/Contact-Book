import { Link } from "react-router-dom";
import styles from "./footer.module.css";

function FooterCmp() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.logo}>ContactBook</div>

     
        <ul className={styles.navLinks}>
  <li>
    <Link to="/contact" className={styles.link}>
      Home
    </Link>
  </li>
  <li>
    <Link to="/add-contact" className={styles.link}>
      Add Contact
    </Link>
  </li>
</ul>


      

        
      </div>

      <p className={styles.copy}>
        &copy; {new Date().getFullYear()} ContactBook. All rights reserved.
      </p>
    </footer>
  );
}

export default FooterCmp;
