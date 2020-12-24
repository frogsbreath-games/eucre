import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "app/ui";

const NavButton = () => {
  const { logout, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <>
        <Button variant="flat" disabled={true}>
          Loading...
        </Button>
      </>
    );
  }

  if (isAuthenticated) {
    return (
      <>
        <Button
          variant="flat"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log Out
        </Button>
      </>
    );
  }
  return (
    <>
      <Button variant="flat" onClick={loginWithRedirect}>
        Login
      </Button>
    </>
  );
};

export default NavButton;
