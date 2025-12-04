import React, { useEffect, useState } from "react";
import hero1 from "../assets/img/SP_autumn_special_Stage_Stage_mobile_50_-_3_2200x.webp";
import hero2 from "../assets/img/SP_FS_25_Stage_Stage_mobile_april_w19_00cc4a6a-64de-4fa0-bc3e-74773652f616_2200x.webp";

const images = [hero1, hero2];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const autoplayMs = 8000;

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % images.length), autoplayMs);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero">
      <div className="hero__slides">
        {images.map((src, idx) => (
          <div key={idx} className={`hero__slide ${idx === current ? "is-active" : ""}`}>
            <img src={src} alt={`Slide ${idx + 1}`} />
          </div>
        ))}
      </div>

      <div className="hero__content">
        <div className="SectionHeader hero__centered">
          <h2 className="custom_sileder_title">Autumn Special</h2>
          <h3 className="custom_sileder_subheader">Now up to 50% off autumn styles</h3>
          <div className="SectionHeader__ButtonWrapper">
            <div className="ButtonGroup ButtonGroup--spacingSmall">
              <a href="/collections/autumn-special-herrenschuhe" className="custom_button ButtonGroup__Item Button Button--primary">Discover now</a>
            </div>
          </div>
        </div>
      </div>

      <ol className="flickity-page-dots">
        {images.map((_, idx) => (
          <li key={idx} className={`dot ${idx === current ? "is-selected" : ""}`} onClick={() => setCurrent(idx)} />
        ))}
      </ol>
    </section>
  );
}
