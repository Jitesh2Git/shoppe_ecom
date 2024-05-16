"use client";

import { FooterBanner, HeroBanner, Product } from "@/components";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import React, { useEffect, useState } from "react";

function page() {
  const [products, setProduct] = useState(null);
  const [banner, setBanner] = useState(null);

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
            *[_type=='banner'] {
              ...,
            } | order(createdAt desc)
          `
        );
        setBanner(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {banner?.map((banner) => (
        <HeroBanner key={banner._id} banner={banner} />
      ))}
      <div className="products-heading">
        <h2>Our Best Selling Products</h2>
        <p>Choose from a variety of products</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      {banner?.map((banner) => (
        <FooterBanner key={banner._id} banner={banner} />
      ))}
    </div>
  );
}

export default page;
