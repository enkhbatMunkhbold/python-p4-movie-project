import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar({ user, onLogout }) {

  const navigate = useNavigate();

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        onLogout();
        navigate("/");
      }
    });
  }

  const handleNavigation = () => {
    if (window.location.pathname === "/login") {
      const loginComponent = document.querySelector(".login-form");
      if (loginComponent) {
        const errorElement = loginComponent.querySelector(".error-message");
        if (errorElement) {
          errorElement.style.display = "none";
        }
      }
    }
  };

  return (
    <header>
      <div>
        {user && <Link to="/" onClick={handleNavigation}>Home</Link>}
      </div>
      <div>
        {user ? (
          <>
            <Link to="/profile" onClick={handleNavigation}>Profile</Link>
            <button onClick={handleLogoutClick}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup" onClick={handleNavigation}>Signup</Link>
            <Link to="/login" onClick={handleNavigation}>Login</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar;
