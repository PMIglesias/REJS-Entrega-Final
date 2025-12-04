import React from "react";
import BrandsCarousel from "./BrandsCarousel";
import "./Brands.css";

export default function Brands() {
  const brands = [
    { name: "CHEANEY", logo: "/brands/cheaney.jpg" },
    { name: "CROCKETT & JONES", logo: "/brands/crockett.jpg" },
    { name: "HEINRICH DINKELACKER", logo: "/brands/heinrich.jpg" },
    { name: "JOHN LOBB", logo: "/brands/johnlobb.jpg" },
  ];

  return (
    <section className="brands">
      <h2>Algunas de Nuestras Marcas Exclusivas</h2>

      <BrandsCarousel />
    </section>
  );
}
