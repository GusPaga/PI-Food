import React from "react";
import "./Card.css";

export default function Card({ title, image, diet }) {
  return (
    <div className="card">
      <img src={image} alt={title} className="img" />
      <h3>{title}</h3>
      {diet.diet?.map((e) =>
        e.name ? (
          <h3 key={e.id}>{e.name}</h3>
        ) : (
          e.map((e) => <h3 key={e.id}>{e}</h3>)
        )
      )}
    </div>
  );
}
