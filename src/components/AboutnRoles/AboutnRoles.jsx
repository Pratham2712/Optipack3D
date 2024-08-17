import React from "react";

const AboutnRoles = () => {
  return (
    <div>
      <div className="emphasized">
        Practical. Simple.
        <div>Optimal.</div>
      </div>
      <p
        style={{
          textAlign: "center",
          marginTop: "50px",
          color: "grey",
          fontSize: "25px",
          wordSpacing: "5px",
        }}
      >
        Execution ready, pragmatic and easy way of building 3d loads
      </p>

      <div className="emphasized">
        Get Started with OptiPack3D
        <div className="emphasized_buttons">
          <a href="#" className="btn" style={{ backgroundColor: "#1469C2" }}>
            Start Free Trial
          </a>
          <a
            href="#"
            className="btn-secondary"
            style={{ backgroundColor: "rgb(187, 187, 187)" }}
          >
            Request a Demo
          </a>
        </div>
      </div>

      <section className="about">
        <h2>Roles</h2>
        <div className="team">
          <div className="team-member">
            <img src="static/images/loadingteam.jpg" alt="Loading Team" />
            <p>Loading team</p>
            <p>Final set of loaders responsible for executing load plans</p>
          </div>
          <div className="team-member">
            <img
              src="static/images/shippingcoord.jpg"
              alt="Shipping Coordinator"
            />
            <p>Shipping Coordinator</p>
            <p>End -to-End management of freight </p>
          </div>
          <div className="team-member">
            <img src="static/images/loadplanner.jpg" alt="Load Planner" />
            <p>Load Planner</p>
            <p>Set of user responsible for creating right loads to dispatch;</p>
          </div>
          <div className="team-member">
            <img src="static/images/leadershipteam.jpg" alt="Leadership Team" />
            <p>Leadership team</p>
            <p>Track key performance metrics and drive productivity agenda</p>
          </div>
        </div>
      </section>
      <section className="about" style={{ maxWidth: "100%" }}>
        <h2>About us</h2>
        <p className="inner_about">
          We are a group of alumni from the Indian Institutes of Management
          (IIM) and the Indian Institutes of Technology (IIT) with extensive
          experience in Customer Service and Logistics. Our mission is to
          identify and address untapped opportunities, or "white spaces," within
          Supply Chain Organizations, where innovative solutions can drive
          significant improvements in efficiency, cost-effectiveness, and
          overall performance. By leveraging our diverse backgrounds and
          comprehensive knowledge, we develop and implement cutting-edge
          technologies and strategies to enhance supply chain operations,
          optimize logistics, and improve the end-to-end customer experience,
          creating robust, resilient, and responsive systems that adapt to
          market demands and drive long-term business success.
        </p>
        <h3>Contact Us:</h3>
        <div
          className="contact"
          style={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "80%",
            marginLeft: "130px",
          }}
        >
          <p>Phone: +91 88401970291</p>
          <p>
            Email:{" "}
            <a
              href="mailto:shahrukh@optipack3d.com"
              style={{ textDecoration: "none" }}
            >
              shahrukh@optipack3d.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutnRoles;
