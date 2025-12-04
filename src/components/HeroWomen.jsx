import React, { useEffect, useState } from "react";
import "./Hero.css";
import imgAuto from "../assets/img/SP_autumn_special_Stage_Stage_mobile_50_-_3_2200x.webp";
import imgHw from "../assets/img/SP_HW_25_Stage_Stage_mobile_-_30.09_2000x.webp";

export default function HeroWomen() {
  const slides = [
    { id: 1, img: imgAuto, alt: "Autumn Special" },
    { id: 2, img: imgHw, alt: "SP HW 25" },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="Hero Carousel--insideDots" aria-label="Hero - MUJER">
      <div className="slides">
        {slides.map((s, i) => (
          <div key={s.id} className={`slide ${i === current ? "is-active" : ""}`}>
            <div className="image-container">
              <img src={s.img} alt={s.alt} />
            </div>

            {s.id === 1 && i === current && (
              <div className="overlay">
                <header className="SectionHeader">
                  <h2 className="custom_sileder_title">Autumn Special</h2>
                  <h3 className="custom_sileder_subheader">Up to 50% off autumn styles</h3>

                  <div className="SectionHeader__ButtonWrapper">
                    <div className="ButtonGroup ButtonGroup--spacingSmall">
                      <a href="/collections/autumn-special-damenschuhe" className="custom_button ButtonGroup__Item Button Button--primary">Discover now</a>
                    </div>
                  </div>
                </header>
              </div>
            )}

            {s.id === 2 && i === current && (
              <div className="overlay overlay--left-bottom">
                <header className="SectionHeader">
                  <h2 className="custom_sileder_title">Autumn Special</h2>
                  <h3 className="custom_sileder_subheader">Up to 50% off autumn styles</h3>

                  <div className="SectionHeader__ButtonWrapper">
                    <div className="ButtonGroup ButtonGroup--spacingSmall">
                      <a href="/collections/autumn-special-damenschuhe" className="custom_button ButtonGroup__Item Button Button--primary">Discover now</a>
                    </div>
                  </div>
                </header>
              </div>
            )}
          </div>
        ))}
      </div>

      <ol className="flickity-page-dots" role="tablist" aria-label="Navegación del slider">
        {slides.map((_, idx) => (
          <li
            key={idx}
            role="tab"
            aria-selected={idx === current}
            className={`dot ${idx === current ? "active" : ""}`}
            onClick={() => setCurrent(idx)}
            title={`Slide ${idx + 1}`}
          />
        ))}
      </ol>
    </section>
  );
}
 
