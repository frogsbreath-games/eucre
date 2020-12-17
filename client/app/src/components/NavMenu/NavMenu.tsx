import * as React from "react";
import styles from "./NavMenu.module.scss";

export default class NavMenu extends React.PureComponent<{}> {
  public render() {
    return (
      <header>
        <div>
          <ul className={styles.navMenu}>
            <li className={styles.navItem}>
              <a
                className={
                  window.location.pathname == "/"
                    ? styles.selected
                    : styles.link
                }
                href="/"
              >
                Home
              </a>
            </li>
            <li className={styles.navItem}>
              <a
                className={
                  window.location.pathname == "/counter"
                    ? styles.selected
                    : styles.link
                }
                href="/counter"
              >
                Counter
              </a>
            </li>
            <li className={styles.navItem}>
              <a
                className={
                  window.location.pathname == "/fetch-data"
                    ? styles.selected
                    : styles.link
                }
                href="/fetch-data"
              >
                Fetch data
              </a>
            </li>
            <li className={styles.navItem}>
              <a
                className={
                  window.location.pathname == "/eucre"
                    ? styles.selected
                    : styles.link
                }
                href="/eucre"
              >
                Eucre
              </a>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}
