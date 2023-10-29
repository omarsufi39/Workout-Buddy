import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="Navbar">
      <header>
        <div className="container">
          <Link to="/">
            <h1>Workout Buddy</h1>
          </Link>
          <nav>
            {isAuthenticated && <p>{user.email}</p>}
            <LoginButton />
            <LogoutButton />
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
