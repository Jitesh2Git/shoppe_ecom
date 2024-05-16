import React from "react";
import { urlForImage } from "@/sanity/lib/image";
import Link from "next/link";

function HeroBanner({
  banner: {
    smallText,
    midText,
    largeText1,
    largeText2,
    image,
    buttonText,
    desc,
  },
}) {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{smallText}</p>
        <h3>{midText}</h3>
        <h1>
          {largeText1} {largeText2}
        </h1>

        <img
          src={urlForImage(image && image[0])}
          alt="headphones"
          className="hero-banner-image"
        />

        <div>
          <Link href={`/product/${"headphones_new"}`}>
            <button type="button">{buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
