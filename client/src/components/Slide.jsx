import React, { useRef, useEffect } from "react";
import "./Slide.css";
import img1 from "../image/bread.jpg";
import img2 from "../image/olive.jpg";
import img3 from "../image/pasta.jpg";
import img4 from "../image/bife-papas.jpg";

export default function Slide() {
  const slide = useRef(null);
  const intervalSlide = useRef(null);

  const front = () => {
    //console.log(slide.current.children);
    //comprobamos que slide tenga elementos//
    if (slide.current.children.length > 0) {
      //obtenemos el primer elemento//
      const first = slide.current.children[0];
      //establecemos la transición//
      slide.current.style.transition = `3000ms ease-out all`;
      //obtener el ancho//
      const width = slide.current.children[0].offsetWidth;
      //movemos el slide//
      slide.current.style.transform = `translateX(-${width}px)`;

      //volver al punto de inicio//
      const transition = () => {
        slide.current.style.transition = "none";
        slide.current.style.transform = `translateX(0)`;
        //envia el primer elemento al final
        slide.current.appendChild(first);
        slide.current.removeEventListener("transitionend", transition);
      };
      //función para poder capturar el momento en que termina el ciclo//
      slide.current.addEventListener("transitionend", transition);
    }
  };

//   const back = () => {
//     //comprobamos que slide tenga elementos//
//     if (slide.current.children.length > 0) {
//       //obtenemos el índice del último elemento//
//       const index = slide.current.children.length - 1;
//       //obtenemos el último elemento//
//       const last = slide.current.children[index];
//       slide.current.insertBefore(last, slide.current.firstChild);

//       slide.current.style.transition = "none";

//       const width = slide.current.children[0].offsetWidth;
//       slide.current.style.transform = `translateX(-${width}px)`;

//       setTimeout(() => {
//         slide.current.style.transition = `3000ms ease-out all`;
//         slide.current.style.transform = `translateX(0)`;
//       }, 30);
//     }
//   };

  useEffect(() => {
    intervalSlide.current = setInterval(() => {
      front();
    }, 5000);
    //eliminamos los intervalos//
    slide.current.addEventListener("mouseenter", () => {
      clearInterval(intervalSlide.current);
    });
    //volveos a poner los intervalos//
    slide.current.addEventListener("mouseleave", () => {
        intervalSlide.current= setInterval(()=>{
            front();
        }, 5000);
    });
    return ()=> clearInterval(intervalSlide.current)
  }, []);

  return (
    <div className="sli-principal">
      <div className="sli-slide" ref={slide}>
        <div className="sli">
          <img className="sli-img" src={img1} alt="pan" />
          <div className="texto">
            <p>Coock never</p>
          </div>
        </div>
        <div className="sli">
          <img className="sli-img" src={img2} alt="pan" />
          <div className="texto">
            <p>was to easy!</p>
          </div>
        </div>
        <div className="sli">
          <img className="sli-img" src={img3} alt="pan" />
          <div className="texto">
            <p>Welcome to:</p>
          </div>
        </div>
        <div className="sli">
          <img className="sli-img" src={img4} alt="pan" />
          <div className="texto">
            <p>Recipes of the World!!</p>
          </div>
        </div>
      </div>
      {/* <div className="controles">
        <button className="botton-left" onClick={back}>
          back
        </button>
        <button className="botton-right" onClick={front}>
          front
        </button>
      </div> */}
    </div>
  );
}
