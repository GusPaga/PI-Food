import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <nav className="lan-nav">
      <div className="lan-logoNav">
        <img
          src="https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png"
          alt="logo Henry"
          height="20px"
          width="100px"
        ></img>
      </div>
      <div className="lan-buttons">
        <Link to="/home">
          <button>HOME</button>
        </Link>
        <Link to="/form">
          <button>CREAR</button>
        </Link>
      </div>
    </nav>
  );
}
