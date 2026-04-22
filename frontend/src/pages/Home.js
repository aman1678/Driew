import React, { useEffect, useState } from "react";
import { getDramas } from "../api";
import DramaCard from "../components/DramaCard";

const GENRES = ["", "Romance", "Thriller", "Comedy", "Family", "Historical", "Mystery"];

export default function Home() {
  const [dramas, setDramas]   = useState([]);
  const [search, setSearch]   = useState("");
  const [genre,  setGenre]    = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getDramas({ search, genre })
      .then(res => setDramas(res.data))
      .finally(() => setLoading(false));
  }, [search, genre]);

  return (
    <div style={{ padding:"1.5rem 0" }}>
      <h1 style={{ marginBottom:"1rem" }}>Pakistani Dramas</h1>

      {/* Search + filter bar */}
      <div style={{ display:"flex", gap:"0.75rem", marginBottom:"1.5rem", flexWrap:"wrap" }}>
        <input
          placeholder="Search dramas…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={styles.input}
        />
        <select value={genre} onChange={e => setGenre(e.target.value)} style={styles.select}>
          {GENRES.map(g => <option key={g} value={g}>{g || "All Genres"}</option>)}
        </select>
      </div>

      {loading ? <p>Loading…</p> : (
        <div style={styles.grid}>
          {dramas.map(d => <DramaCard key={d.id} drama={d} />)}
          {!dramas.length && <p>No dramas found.</p>}
        </div>
      )}
    </div>
  );
}

const styles = {
  input:  { flex:1, minWidth:200, padding:"0.5rem 0.75rem", borderRadius:8,
             border:"1px solid #ddd", fontSize:"0.95rem" },
  select: { padding:"0.5rem 0.75rem", borderRadius:8, border:"1px solid #ddd", fontSize:"0.95rem" },
  grid:   { display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))", gap:"1.25rem" },
};