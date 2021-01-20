import * as React from "react";
import styles from "./NavMenu.module.scss";
import NavButton from "./NavButton/NavButton";
import ProfileIcon from "../ProfileIcon/ProfileIcon";

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
                  window.location.pathname == "/games/eucre"
                    ? styles.selected
                    : styles.link
                }
                href="/games/eucre"
              >
                Eucre
              </a>
            </li>
            <li className={styles.navItem}>
              <a
                className={
                  window.location.pathname == "/games/lobby"
                    ? styles.selected
                    : styles.link
                }
                href="/games/lobby"
              >
                Lobby
              </a>
            </li>
            <li className={styles.profileItem}>
              <a
                className={
                  window.location.pathname == "/games/profile"
                    ? styles.selected
                    : styles.link
                }
                href="/games/profile"
              >
                <ProfileIcon />
              </a>
            </li>
            <li className={styles.navButton}>
              <NavButton />
            </li>
          </ul>
        </div>
      </header>
    );
  }
}
