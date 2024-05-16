import React from "react";
import Head from "next/head";
import { Navbar } from "@/components";

const Layout = () => {
  return (
    <div className="layout">
      <Head>
        <title>Ecommerce Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
    </div>
  );
};

export default Layout;
