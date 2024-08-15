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
              <h1
              //</div>style="font-size: 56px;line-height: 60px;font-weight: 800;"
              >
                3D Load Planning Software
              </h1>
              <p
              //style="font-size: 19px;line-height: 24px;font-weight: 400;"
              >
                Optimize container volume and weight. Reduce shipping costs.
                Increase warehouse efficiency.
              </p>
              <div className="hero-buttons">
                <button
                  className="btn"
                  // style="color: black;background-color: white;margin-bottom: 25px;margin-top: 10px;width: 20%;display: inline; font-weight: 700;font-size: 16px;line-height: 24px;"
                >
                  Enquire Now
                </button>
              </div>
              <div className="hero-buttons">
                <a
                  href="{% url 'freeTrial' %}"
                  className="btn-secondary"
                  //style="display: inline; width: 15%; font-weight: 700;font-size: 16px;line-height: 24px;"
                >
                  Start Free Trial
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
