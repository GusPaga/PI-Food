import React from "react";
import { Link } from "react-router-dom";
import Slide from "./Slide";
import "./Landing.css";
// import spices from '../image/spices.jpg'

export default function Landing() {
  return (
    <div>
      <nav className="lan-nav">
        <div className="lan-logo">
          <img
            src="https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png"
            alt="logo Henry"
            height="20px"
            width="100px"
          ></img>
        </div>
        <div className="lan-nav-buttons">
          <Link to="/home">
            <button>HOME</button>
          </Link>
          <Link to="/form">
            <button>CREATE</button>
          </Link>
        </div>
      </nav>
      <div className="lan-div">
        <h1 className="title">"Recipes of the Wold"</h1>
        <Slide />
      </div>
    </div>
  );
}
