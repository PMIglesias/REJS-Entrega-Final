import React from "react";
import { Link } from "react-router-dom";

export default function BrandsCarousel() {
  const filenames = [
    "Balenciaga_grey_6c46e11f-f070-4e05-9416-7059e9e7be15.webp",
    "brand_logos_horizontal-05_4970b4e3-c383-432b-9e87-e7639150388b.webp",
    "brand_logos_horizontal-06_530c7832-702d-4716-8ab7-fd34d76a1163.webp",
    "HD_horizontal-07_91665ee1-1f59-4081-82a9-49a00dab35f6.webp",
    "logo_burgol.webp",
    "logo_burlington.webp",
    "logo_falke.webp",
    "logo_vagabond.webp",
  ];

  const filenameToVendor = {
    "Balenciaga_grey_6c46e11f-f070-4e05-9416-7059e9e7be15.webp": "balenciaga",
    "brand_logos_horizontal-05_4970b4e3-c383-432b-9e87-e7639150388b.webp": "henry stevens",
    "brand_logos_horizontal-06_530c7832-702d-4716-8ab7-fd34d76a1163.webp": "n91",
    "HD_horizontal-07_91665ee1-1f59-4081-82a9-49a00dab35f6.webp": "heinrich dinkelacker",
    "logo_burgol.webp": "burgol",
    "logo_burlington.webp": "burlington",
    "logo_falke.webp": "falke",
    "logo_vagabond.webp": "vagabond",
  };

  const deriveLabel = (filename) => {
    if (filenameToVendor[filename]) {
      return filenameToVendor[filename]
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    }
    let name = filename.replace(/\.[^.]+$/, ""); 
    name = name.replace(/[_-][0-9a-f]{8,}(-[0-9a-f]{4,})*/gi, "");
    name = name.replace(/brand_logos_horizontal/gi, "");
    name = name.replace(/HD_horizontal/gi, "HD");
    name = name.replace(/_grey/gi, "");
    name = name.replace(/logo[_-]?/i, "");
    name = name.replace(/[-_]\d{1,3}$/g, "");
    name = name.replace(/[_-]+/g, " ").trim();
    name = name.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    return name || filename;
  };

  const logos = filenames.map((name) => {
    const src = new URL(`../assets/logos/${name}`, import.meta.url).href;
    const vendorQuery = filenameToVendor[name] || deriveLabel(name).toLowerCase();
    return { src, label: deriveLabel(name), vendorQuery };
  });

  const looped = [...logos, ...logos];

  return (
    <div className="brands-carousel" aria-hidden="false">
      <div className="brands-carousel__track">
        {looped.map((item, i) => (
          <div className="brands-carousel__item" key={i}>
            <Link to={`/search?q=${encodeURIComponent(item.vendorQuery)}`} aria-label={`Buscar ${item.label}`}>
              <img src={item.src} alt={item.label} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
