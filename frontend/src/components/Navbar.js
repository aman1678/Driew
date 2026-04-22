import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>😜 Driew</Link>
      <div style={styles.links}>
        {user ? (
          <>
            <span style={styles.username}>Hi, {user.username}</span>
            <button onClick={handleLogout} style={styles.btn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"    style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav:      { display:"flex", justifyContent:"space-between", alignItems:"center",
               padding:"0.75rem 1.5rem", background:"#1a1a2e", color:"#fff" },
  brand:    { color:"#e94560", fontWeight:700, fontSize:"1.3rem", textDecoration:"none" },
  links:    { display:"flex", gap:"1rem", alignItems:"center" },
  link:     { color:"#fff", textDecoration:"none", fontWeight:500 },
  username: { color:"#aaa", fontSize:"0.9rem" },
  btn:      { background:"#e94560", border:"none", color:"#fff", padding:"0.35rem 0.9rem",
               borderRadius:6, cursor:"pointer", fontWeight:500 },
};