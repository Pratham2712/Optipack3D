import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import home_container from "../../assests/home_container.png";

import KeyFeature from "../../components/KeyFeature/KeyFeature";
import "../../components/KeyFeature/KeyFeature.css";
import HowItWork from "../../components/HowItWork/HowItWork";
import AboutnRoles from "../../components/AboutnRoles/AboutnRoles";
import Footer from "../../components/Footer/Footer";
import KeyFeat from "../../components/KeyFeatures2/KeyFeat";
import Tabs from "../../components/Tabs/Tabs";
import { useScroll } from "../../Util/ScrollContext";
import { useNavigate } from "react-router-dom";
import { free_trail } from "../../constants/links";
const Home = () => {
  const { featureSectionRef } = useScroll();
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <main>
        <div className="outer_img_box">
          <section className="hero">
            <img src={home_container} alt="3D Load Planning Software" />
            <div className="hero-content">
              <h1>3D Load Planning Software</h1>
              <p>
                Optimize container volume and weight. Reduce shipping costs.
                Increase warehouse efficiency.
              </p>
              <div className="all-buttons">
                <div className="hero-buttons">
                  <button className="enquire">Enquire Now</button>
                </div>
                <div className="hero-buttons">
                  <a className="free" onClick={() => navigate(free_trail)}>
                    Start Free Trial
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section
          className="features"
          style={{
            backgroundColor: "#CC9C87",
            backgroundColor: "rgb(204 156 135 / 14%)",
            paddingBottom: "50px",
          }}
        >
          <KeyFeat />
        </section>
        <div></div>
        <section
          className="features"
          style={{
            backgroundColor: "#CC9C87",
            backgroundColor: "rgb(204 156 135 / 14%)",
            paddingBottom: "70px",
            paddingTop: "50px",
          }}
          id="feature-tab"
          ref={featureSectionRef}
        >
          <Tabs />
        </section>
        {/* <section className="features">
          <KeyFeature />
        </section> */}
        {/* <section className="how-it-works">
          <HowItWork />
        </section> */}
        {/* <div>
          <AboutnRoles />
        </div> */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
