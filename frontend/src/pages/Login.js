import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser }   from "../api";
import { useAuth }     from "../context/AuthContext";

export default function Login() {
  const [form, setForm]   = useState({ email:"", password:"" });
  const [error, setError] = useState("");
  const { login }  = useAuth();
  const navigate   = useNavigate();

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    try {
      const res = await loginUser(form);
      login(res.data);
      navigate("/");
    } catch {
      setError("Invalid email or password.");
    }
  };

  return (
    <div style={styles.wrap}>
      <h2>Login</h2>
      {error && <p style={{ color:"red" }}>{error}</p>}
      <input name="email"    placeholder="Email"    value={form.email}    onChange={change} style={styles.input} />
      <input name="password" placeholder="Password" value={form.password} onChange={change} style={styles.input} type="password" />
      <button onClick={submit} style={styles.btn}>Login</button>
    </div>
  );
}

const styles = {
  wrap:  { maxWidth:380, margin:"4rem auto", display:"flex", flexDirection:"column", gap:"0.75rem" },
  input: { padding:"0.55rem 0.75rem", borderRadius:8, border:"1px solid #ddd", fontSize:"0.95rem" },
  btn:   { padding:"0.6rem", background:"#e94560", color:"#fff", border:"none",
            borderRadius:8, cursor:"pointer", fontWeight:600, fontSize:"1rem" },
};