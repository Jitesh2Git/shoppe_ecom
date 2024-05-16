import React from "react";
import { urlForImage } from "@/sanity/lib/image";
import Link from "next/link";

const FooterBanner = ({
  banner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    product,
    buttonText,
    image,
    desc,
  },
}) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${"headphones_new"}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>
        <img
          src={urlForImage(image && image[0])}
          className="footer-banner-image"
        />
      </div>
    </div>
  );
};

export default FooterBanner;
