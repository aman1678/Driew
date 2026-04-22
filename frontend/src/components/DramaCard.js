import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

export default function DramaCard({ drama }) {
  return (
    <Link to={`/dramas/${drama.id}`} style={styles.link}>
      <div style={styles.card}>
        <img
          src={drama.poster_url || "https://via.placeholder.com/200x280?text=No+Poster"}
          alt={drama.title}
          style={styles.img}
        />
        <div style={styles.body}>
          <h3 style={styles.title}>{drama.title}</h3>
          <p style={styles.meta}>{drama.channel} · {drama.year}</p>
          <p style={styles.genre}>{drama.genre}</p>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:6 }}>
            <StarRating value={Math.round(drama.avg_rating || 0)} size={18} />
            <span style={styles.score}>
              {drama.avg_rating ? drama.avg_rating.toFixed(1) : "—"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

const styles = {
  link:  { textDecoration:"none", color:"inherit" },
  card:  { background:"#fff", borderRadius:10, overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,0.1)",
            transition:"transform 0.2s", cursor:"pointer", display:"flex", flexDirection:"column" },
  img:   { width:"100%", height:220, objectFit:"cover" },
  body:  { padding:"0.75rem" },
  title: { margin:"0 0 4px", fontSize:"1rem", fontWeight:600 },
  meta:  { margin:0, fontSize:"0.8rem", color:"#666" },
  genre: { margin:"4px 0 0", fontSize:"0.78rem", color:"#999" },
  score: { fontWeight:600, color:"#f5a623" },
};