import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getDetails } from "../redux/actions";

export default function Detail() {
  const details = useSelector((state) => state.details);
  const dispatch = useDispatch();
  const params = useParams();
  console.log('details' ,details)

  useEffect(() => {
    dispatch(getDetails(params.id));
  }, [dispatch, params.id]);

  if (!details) {
    return <p>wait a few seconds...</p>;
  }

  return (
    <div>
      <nav>
        <div className="det-logo">
          <img
            src="https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png"
            alt="logo Henry"
            height="20px"
            width="100px"
          ></img>
        </div>

        <div className="det-buttons">
          <Link to="/home">
            <button>HOME</button>
          </Link>
          <Link to="/form">
            <button>CREATE</button>
          </Link>
        </div>
      </nav>

      <div>
        <h3>{details.title}</h3>
        <img
          src={details.image}
          alt="?"
        />
      </div>
      <div>
        <h3>Type of Diet</h3>
        <h3>Health Score</h3>
        <h3>Summry</h3>
        <h3>Analyzed Instructions</h3>
      </div>
    </div>
  );
}
