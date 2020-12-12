import * as React from "react";
import styles from "./NavMenu.module.css";

export default class NavMenu extends React.PureComponent<{}> {
  public render() {
    return (
      <header>
        <div>
          <ul className={styles.navMenu}>
            <li className={styles.navItem}>
              <a className={styles.link} href="/">
                Eucre
              </a>
            </li>
            <li className={styles.navItem}>
              <a className={styles.link} href="/counter">
                Counter
              </a>
            </li>
            <li className={styles.navItem}>
              <a className={styles.link} href="/fetch-data">
                Fetch data
              </a>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}
