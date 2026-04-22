import React, { useState } from "react";
import { useNavigate }  from "react-router-dom";
import { registerUser } from "../api";

export default function Register() {
  const [form, setForm]   = useState({ username:"", email:"", password:"" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    try {
      await registerUser(form);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (e) {
      setError(e.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <div style={styles.wrap}>
      <h2>Create Account</h2>
      {error   && <p style={{ color:"red" }}>{error}</p>}
      {success && <p style={{ color:"green" }}>Registered! Redirecting to login…</p>}
      <input name="username" placeholder="Username" value={form.username} onChange={change} style={styles.input} />
      <input name="email"    placeholder="Email"    value={form.email}    onChange={change} style={styles.input} />
      <input name="password" placeholder="Password" value={form.password} onChange={change} style={styles.input} type="password" />
      <button onClick={submit} style={styles.btn}>Register</button>
    </div>
  );
}

const styles = {
  wrap:  { maxWidth:380, margin:"4rem auto", display:"flex", flexDirection:"column", gap:"0.75rem" },
  input: { padding:"0.55rem 0.75rem", borderRadius:8, border:"1px solid #ddd", fontSize:"0.95rem" },
  btn:   { padding:"0.6rem", background:"#1a1a2e", color:"#fff", border:"none",
            borderRadius:8, cursor:"pointer", fontWeight:600, fontSize:"1rem" },
};