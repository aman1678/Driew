import React, { useEffect, useState } from "react";
import { getReviews } from "../api";

export default function ReviewFeed({ dramaId }) {
  const [data, setData]   = useState({ reviews:[], total:0, pages:1 });
  const [page, setPage]   = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getReviews(dramaId, page)
      .then(res => setData(res.data))
      .catch(() => setData({ reviews: [], total: 0, pages: 1 }))
      .finally(() => setLoading(false));
  }, [dramaId, page]);

  if (loading) return <p>Loading reviews…</p>;
  if (!data.reviews.length) return <p style={{ color:"#888" }}>No reviews yet. Be the first!</p>;

  return (
    <div>
      {data.reviews.map(r => (
        <div key={r.id} style={styles.card}>
          <div style={styles.header}>
            <strong>{r.username}</strong>
            <span style={styles.date}>{new Date(r.created_at).toLocaleDateString()}</span>
          </div>
          <p style={styles.content}>{r.content}</p>
        </div>
      ))}
      {data.pages > 1 && (
        <div style={styles.pagination}>
          <button disabled={page===1}          onClick={() => setPage(p => p-1)} style={styles.pgBtn}>← Prev</button>
          <span>Page {page} of {data.pages}</span>
          <button disabled={page===data.pages} onClick={() => setPage(p => p+1)} style={styles.pgBtn}>Next →</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  card:       { background:"#f9f9f9", borderRadius:8, padding:"0.75rem 1rem", marginBottom:"0.75rem" },
  header:     { display:"flex", justifyContent:"space-between", marginBottom:6 },
  date:       { color:"#aaa", fontSize:"0.8rem" },
  content:    { margin:0, lineHeight:1.6 },
  pagination: { display:"flex", gap:"1rem", alignItems:"center", justifyContent:"center", marginTop:"1rem" },
  pgBtn:      { padding:"0.3rem 0.8rem", borderRadius:6, border:"1px solid #ddd", cursor:"pointer",
                 background:"#fff", fontWeight:500 },
};