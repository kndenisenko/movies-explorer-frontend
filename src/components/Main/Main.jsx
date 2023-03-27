import "./main.css";

import {React, useEffect} from "react";

import Hero from "../Hero/Hero";
import Navigation from "../Navigation/Navigation";
import About from "../About/About";
import Tech from "../Tech/Tech";
import Student from "../Student/Student";



function Main({ forceLogOut }) {
  // console.log('main')

  useEffect(() => {
    forceLogOut();;
  }, []);

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
