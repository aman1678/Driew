import React, { useEffect, useState } from "react";
import { useParams }   from "react-router-dom";
import { getDrama, postReview, submitRating } from "../api";
import { useAuth }     from "../context/AuthContext";
import StarRating      from "../components/StarRating";
import ReviewFeed      from "../components/ReviewFeed";

export default function DramaDetail() {
  const { id }   = useParams();
  const { user } = useAuth();

  const [drama,       setDrama]       = useState(null);
  const [reviewText,  setReviewText]  = useState("");
  const [userRating,  setUserRating]  = useState(0);
  const [avgRating,   setAvgRating]   = useState(null);
  const [reviewKey,   setReviewKey]   = useState(0);   // bump to re-fetch reviews
  const [submitting,  setSubmitting]  = useState(false);
  const [msg,         setMsg]         = useState("");

  useEffect(() => {
    getDrama(id).then(res => {
      setDrama(res.data);
      setAvgRating(res.data.avg_rating);
    });
  }, [id]);

  const handleRating = async (score) => {
    setUserRating(score);
    const res = await submitRating({ drama_id: Number(id), score });
    setAvgRating(res.data.avg_rating);
  };

  const handleReview = async () => {
    if (!reviewText.trim()) return;
    setSubmitting(true);
    try {
      await postReview({ drama_id: Number(id), content: reviewText });
      setReviewText("");
      setReviewKey(k => k+1);
      setMsg("Review posted!");
      setTimeout(() => setMsg(""), 3000);
    } catch { setMsg("Failed to post review."); }
    finally { setSubmitting(false); }
  };

  if (!drama) return <p style={{ padding:"2rem" }}>Loading…</p>;

  return (
    <div style={{ padding:"1.5rem 0", maxWidth:800 }}>
      <div style={styles.hero}>
        <img
          src={drama.poster_url || "https://via.placeholder.com/200x280?text=No+Poster"}
          alt={drama.title}
          style={styles.poster}
        />
        <div style={styles.info}>
          <h1 style={{ marginTop:0 }}>{drama.title}</h1>
          <p style={styles.meta}>{drama.channel} · {drama.year} · {drama.genre}</p>
          <p>{drama.description}</p>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <StarRating value={Math.round(avgRating || 0)} size={26} />
            <strong>{avgRating ? avgRating.toFixed(1) : "No ratings yet"}</strong>
          </div>
        </div>
      </div>

      {user && (
        <div style={styles.section}>
          <h3>Rate this drama</h3>
          <StarRating value={userRating} onChange={handleRating} size={32} />
        </div>
      )}

      <div style={styles.section}>
        <h3>Reviews</h3>
        {user && (
          <div style={{ marginBottom:"1rem" }}>
            <textarea
              rows={3}
              placeholder="Share your thoughts…"
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              style={styles.textarea}
            />
            <button onClick={handleReview} disabled={submitting} style={styles.btn}>
              {submitting ? "Posting…" : "Post Review"}
            </button>
            {msg && <span style={{ marginLeft:12, color:"green" }}>{msg}</span>}
          </div>
        )}
        <ReviewFeed key={reviewKey} dramaId={Number(id)} />
      </div>
    </div>
  );
}

const styles = {
  hero:     { display:"flex", gap:"1.5rem", flexWrap:"wrap", marginBottom:"2rem" },
  poster:   { width:200, height:280, objectFit:"cover", borderRadius:10 },
  info:     { flex:1, minWidth:240 },
  meta:     { color:"#666", marginTop:0 },
  section:  { marginTop:"1.5rem" },
  textarea: { width:"100%", padding:"0.6rem", borderRadius:8, border:"1px solid #ddd",
               fontSize:"0.95rem", resize:"vertical", boxSizing:"border-box" },
  btn:      { marginTop:"0.5rem", padding:"0.45rem 1.2rem", background:"#e94560",
               color:"#fff", border:"none", borderRadius:8, cursor:"pointer", fontWeight:600 },
};