import React from "react";
import "./styles/Card.css";

export default function Card({ image, title, diet }) {
  
  return (
    <div className="card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <div className="card-diet">
        {diet?.map((e) =>
          e.name ? <h5 key={e.name}>{e.name}</h5> : <h5 key={e}>{e}</h5>
        )}
      </div>
    </div>
  );
}
