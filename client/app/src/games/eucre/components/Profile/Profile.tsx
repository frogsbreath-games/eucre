import * as React from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const Profile = () => {
  const { user } = useAuth0();
  return (
    <div>
      <img
        src={user.picture}
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        alt="profile"
      />
      <h3>Nickname: {user.nickname}</h3>
      <h3>Email: {user.email}</h3>
    </div>
  );
};

// Wrap the component in the withAuthenticationRequired handler
export default withAuthenticationRequired(Profile);
