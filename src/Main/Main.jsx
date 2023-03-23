import "./main.css";

import Hero from "../Hero/Hero";
import Navigation from "../Navigation/Navigation";
import About from "../About/About";
import Tech from "../Tech/Tech";
import Student from "../Student/Student";

import React from "react";

function Main() {
  // console.log('main')

  return (
  <>
    <Hero />
    <Navigation />
    <About />
    <Tech />
    <Student />
  </>
  );
}

export default Main;