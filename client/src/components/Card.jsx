import React from "react";
import "./Card.css";

export default function Card({ image, title, diet }) {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-img" />
      <h3>{title}</h3>
      <div className="card-diet">
        {diet?.map((e) =>
          e ? <h5 key={e}>{e}</h5> : <h5>"not avialable"</h5>
        )}
      </div>
    </div>
  );
}
