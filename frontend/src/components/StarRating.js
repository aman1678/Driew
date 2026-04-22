import React, { useState } from "react";

export default function StarRating({ value = 0, onChange = null, size = 24 }) {
  const [hover, setHover] = useState(0);
  const active = hover || value;
  const readonly = !onChange;

  return (
    <div style={{ display:"flex", gap:2 }}>
      {[1,2,3,4,5].map((star) => (
        <span
          key={star}
          style={{
            fontSize: size,
            cursor:   readonly ? "default" : "pointer",
            color:    star <= active ? "#f5a623" : "#ccc",
            transition: "color 0.15s",
          }}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          onClick={()      => !readonly && onChange(star)}
        >★</span>
      ))}
    </div>
  );
}