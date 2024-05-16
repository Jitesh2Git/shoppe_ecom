"use client";

import React, { useEffect, useState } from "react";
import { urlForImage } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "@/components";
import { useStateContext } from "@/context/StateContext";

const page = ({ params: { slug } }) => {
  const [products, setProduct] = useState(null);
  const [indi_p, setIndi_p] = useState(null);
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await client.fetch(
          groq`
            *[_type=='product'] {
              ...,
            } | order(createdAt desc)
          `
        );
        setProduct(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await client.fetch(
          groq`
          *[_type=='product' && slug.current == '${slug}'][0]`
        );
        setIndi_p(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleClick = () => {
    onAdd(indi_p, qty);
    setShowCart(true);
  };

  const image = indi_p?.image;
  const name = indi_p?.name;
  const details = indi_p?.details;
  const price = indi_p?.price;

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            {image && image.length > 0 && (
              <img
                key={image[0]}
                src={urlForImage(image[index])}
                className="product-detail-image"
              />
            )}

            <div className="small-images-container">
              {image?.map((img, i) => (
                <img
                  key={i}
                  src={urlForImage(img && img)}
                  className={
                    i == index ? "small-image selected-image" : "small-image"
                  }
                  onMouseEnter={() => setIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details : </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity : </h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(indi_p, qty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleClick}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
