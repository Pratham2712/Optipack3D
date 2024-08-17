import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import home_container from "../../assests/home_container.png";

const Home = () => {
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
                  <a className="free">Start Free Trial</a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
