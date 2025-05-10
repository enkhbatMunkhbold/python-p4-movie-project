import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import SignUp from "./SignUp";
import Home from "./Home";
import Login from "./Login";
import UserProfile from "./UserProfile";
import Tickets from "./Tickets";

function App() {

  const [user, setUser] = useState(null);  

  useEffect(() => {
    fetch("/check_session")
    .then(r => {
      if(r.ok) {
        r.json().then(user => setUser(user));
      } else if (r.status === 204) {
        setUser(null)
      }
    }).catch(error => {
      console.error("Error checking session:", error)
      setUser(null)
    });
  }, []);  

  function handleLogout() {   
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <Router>
      <NavBar user={user} onLogout={handleLogout} />
      <main>
        {user ? (
          <Routes>
            <Route path="/" element={<Home user={user} setUser={setUser} />} />
            <Route path="/profile" element={<UserProfile user={user} setUser={setUser}/>}/>
            <Route path="/tickets" element={<Tickets user={user} setUser={setUser}/>} />
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/signup" element={<SignUp setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/" element={<Home user={user} setUser={setUser} />} />
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        )}
      </main>
    </Router>
  );
}

export default App;
