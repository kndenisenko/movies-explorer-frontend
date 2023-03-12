import "./main.css";

import Hero from "../Hero/Hero";
import Navigation from "../Navigation/Navigation";
import About from "../About/About";

import React from "react";

function Main() {
  console.log('main')

  return (
  <>
    <Hero />
    <Navigation />
    <About />
  </>
  );
}

export default Main;