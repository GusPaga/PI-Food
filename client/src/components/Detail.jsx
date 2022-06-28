import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getDetails } from "../redux/actions";
import "./Details.css";

export default function Detail() {
  const details = useSelector((state) => state.details);
  const dispatch = useDispatch();
  const params = useParams();

  //   let analize = details.analyzedInstructions;
  // console.log(analize)

  useEffect(() => {
    dispatch(getDetails(params.id));
  }, [dispatch, params.id]);

  const [, setDetails] = useState("");

  function handleClick(e) {
    setDetails("");
  }
  if (!details) {
    return <p>wait a few seconds...</p>;
  }

  return (
    <div>
      <nav className="det-nav">
        <div className="det-logo">
          <img
            src="https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png"
            alt="logo Henry"
            height="20px"
            width="100px"
          ></img>
        </div>

        <div >
          <Link to="/home">
            <button
            className="det-buttons"
              onClick={(e) => {
                handleClick(e);
              }}
            >
              HOME
            </button>
          </Link>
          <Link to="/form">
            <button className="det-buttons"
            >CREATE</button>
          </Link>
        </div>
      </nav>

      <div>
        <h3>{details.title}</h3>
        <h3>Health Score: {details.healthScore} pts.</h3>
      </div>
      <div className="informations">
        <div className="sup">
          <img className="img" src={details.image} alt="?" />
          <div>
            <h2>Type of Diet: </h2>
            {details.diet
              ? details.diet.map((e) => <p key={e}>{e}</p>)
              : "Diet not available"}
          </div>
        </div>
        <div className="inf">
          <div>
            <h3>Analyzed Instructions</h3>
            {details.analyzedInstructions
              ? details.analyzedInstructions?.map((e) => <p key={e}>{e}</p>)
              : "Diet not available"}
          </div>

          <div className="body">
            <h3>Summary:</h3>
            {details.summary ? (
              <p>
                {details.summary.replace(/(<b>|<\/b>|<a href=|<\/a>)/g, "")}
              </p>
            ) : (
              <p>{details.summary}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// .replace(/(<b>|<\/b>|<a href=\\|<\/a>)/g)
//.replace(/(<b>|<\/b>|<a href=\\-<\/a>)/g, "")
// (/(<b>|<\/b>|<a href=|<\/a>)/g)
