import React from "react";
import css from "./styles/home.module.css";
import treetops from "./media/images/treetops.png";
import treeview from "./media/images/forest_mountain.png";

const About = () => {
  return (
    <div className="page-home">
      <div className={css.Container}>
        <div className={css.textContainer}>
          <h1>Our systems</h1>
        </div>
        <div className={css.textContainerWhite}>
          <h1>Sawmill Go</h1>
        </div>
        <div className={css.textContainerWhite}>
          <p>
            <strong>
              Sawmill Go is our comprehensive database system designed
              specifically for sawmills.
            </strong>
          </p>
          <p>
            It offers efficient management of logs and processed planks,
            streamlining inventory control and optimizing operations. With its
            user-friendly interface and essential features, Sawmill Go provides
            a reliable solution for your sawmill's everyday needs.
          </p>

          <div className={css.buttonContainer}>
            <button>Find out More</button>
          </div>
        </div>
        <div className={css.headimage}>
          <img className={css.images} src={treeview} alt="My Image" />
        </div>

        <div className={css.textContainerWhite}>
          <h1>Eco pro</h1>
        </div>
          <div className={css.textContainerWhite}>
          <p>
            <strong>
              Eco Pro is our advanced system that encompasses the
              entire process, from tree to planks. It goes beyond the
              functionality of Sawmill Go, capturing and organizing data at
              every stage.
            </strong>
          </p>
          <p>
            This holistic solution allows you to trace the journey of each
            material, empowering you to provide customers with a complete
            picture of the sourcing, processing, and origins of their products.
            Experience unrivaled transparency and customer engagement with
            Eco Pro.
          </p>
          <div className={css.buttonContainer}>
            <button>Find out More</button>
          </div>
          </div>
          
        </div>

       
      </div>
   
  );
};

export default About;
