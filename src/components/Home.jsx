import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="Page">
      <Navbar />
      <h2>Home</h2>
      <p>Contenuto della pagina Home...</p>
      <Footer />
    </div>
  );
};

export default Home;
