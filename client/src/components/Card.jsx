import React from "react";
import "./Card.css";

export default function Card({ title, image, diets }) {
  return (
    <div className="card">
      <img src={image} alt={title} className="img" />
      <h3>{title}</h3>
      <>
      {
        diets?.map((e)=><h3>{e.diets}</h3>)
      }
      </>
    </div>
  );
}
