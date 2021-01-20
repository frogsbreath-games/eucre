import * as React from "react";
import styles from "./ProfileIcon.module.scss";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const ProfileIcon = () => {
  const { user } = useAuth0();
  return (
    <div>
      <img src={user.picture} alt="profile" className={styles.image} />
    </div>
  );
};

// Wrap the component in the withAuthenticationRequired handler
export default withAuthenticationRequired(ProfileIcon);
