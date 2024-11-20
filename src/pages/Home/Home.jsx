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
import { Link, useNavigate } from "react-router-dom";
import { contact_us, free_trail } from "../../constants/links";
const Home = () => {
  const { featureSectionRef } = useScroll();
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <main>
        <div className="outer_img_box">
          <section className="hero">
            <div className="home-image">
              <img src={home_container} alt="3D Load Planning Software" />
            </div>
            <div className="hero-content">
              <h1>3D Load Planning Software</h1>
              <p>
                Optimize container volume and weight. <br />
                Reduce shipping costs. <br />
                Increase warehouse efficiency.
              </p>
              <div className="all-buttons">
                <div className="hero-buttons">
                  <Link to={contact_us} style={{ textDecoration: "none" }}>
                    <button className="enquire">Enquire Now</button>
                  </Link>
                </div>
                <div className="hero-buttons">
                  <Link className="free" to={free_trail}>
                    Start Free Trial
                  </Link>
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
            marginBottom: "0px",
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
