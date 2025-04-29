import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [error, setError] = useState(null);  

  useEffect(() => {
    return () => {
      setInvalid(false);
      setError(null);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();    
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (response.ok) {
        const user = await response.json();
        setUser(user);  
        setInvalid(false);
        navigate("/profile"); 
      } else {
        setInvalid(true);
        const error = await response.json();
        console.error("Login error:", error);
        setError('Username or password is incorrect');
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };  

  return (
    <div className="login-form">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {invalid ? <p className="error-message" style={{ color: "red" }}>{error}</p> : null}
    </div>
  );
}

export default Login;
