import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./TermsNConditon.css";

const TermsNConditon = () => {
  return (
    <div>
      <Navbar />
      <main className="term-main">
        <div className="term-head">
          <h4>Terms of Use</h4>
        </div>
        <div className="term-content">
          These Terms of Use constitute a legally binding agreement between
          Optipack3d (“We,” “Us,” “Our”) and the users of our website and
          services (“You,” “Your,” “User”). By accessing or using our website
          and services, you agree to comply with and be bound by these Terms of
          Use.
          <br />
          <br />
          <br />
          <strong>1. Services</strong> <br />
          Optipack3d is an online platform engaged in the business of providing
          powerful 3D load planning tools for freight movements. We help
          companies optimize their cargo loading and transportation processes.
          <br />
          <br />
          <strong>2. Eligibility</strong>
          <br />
          a. Only users who are 18 years of age or older may use our Services.
          If you are under 18 years of age, you must have your parent or legal
          guardian’s permission to use our Services. <br /> b. Optipack3d
          reserves the right to refuse access to our Services if we discover
          that you are under the age of 18 years.
          <br />
          <br /> <strong>
            3. Account Registration and Security
          </strong> <br /> a. You may access and use our website and Services
          either as a registered user or as a guest user. However, not all
          sections of the website and Services will be accessible to guest
          users. <br /> b. Registered users: To access certain features of our
          Services, you may need to create an account with a unique login ID and
          password. You are responsible for maintaining the confidentiality and
          security of your account. <br />
          c. You agree to notify Optipack3d immediately of any unauthorized use
          of your account or any other security breach. <br /> d. You shall
          ensure that the account information you provide is complete, accurate,
          and up-to-date. Optipack3d reserves the right to suspend or terminate
          your account if we have reasonable grounds to suspect that the
          information provided is inaccurate or incomplete. <br />
          <br /> <strong>
            {" "}
            4. Use of the Website and Services
          </strong> <br /> When using our website and Services, you agree not
          to: <br /> a. Defame, abuse, harass, stalk, threaten, or otherwise
          violate the legal rights of others. <br /> b. Publish, post, upload,
          distribute, or disseminate any inappropriate, profane, defamatory,
          infringing, obscene, indecent, or unlawful content. <br />
          c. Upload or transmit viruses or any other type of malicious code.{" "}
          <br /> d. Interfere with or disrupt the integrity or performance of
          the website or Services. e. Attempt to gain unauthorized access to the
          website, Services, or related systems. <br />
          <br />
          <strong>5. Intellectual Property Rights</strong> <br /> All
          trademarks, service marks, logos, and other intellectual property
          rights displayed on the website or in our Services are the property of
          Optipack3d. You may not use, reproduce, or distribute our intellectual
          property without our prior written permission. <br />
          <br /> <strong>6. Privacy and Data Protection</strong> <br /> Your use
          of our Services is also governed by our Privacy Policy. Please review
          our Privacy Policy to understand how we collect, use, and protect your
          personal information. <br />
          <br /> <strong>7. Limitation of Liability</strong> <br /> Optipack3d
          shall not be liable for any special, incidental, indirect, or
          consequential damages arising from the use of our Services, even if we
          have been informed of the possibility of such damages. <br />
          <br /> <strong> 8. Updates to Terms of Use</strong> <br /> We reserve
          the right to modify these Terms of Use at any time. We will provide
          notice of significant changes and suggest that you regularly review
          these Terms of Use. <br />
          <br /> <strong> 9. Governing Law and Jurisdiction</strong> <br />
          These Terms of Use are governed by the laws of Insert applicable
          jurisdiction. Any legal proceedings related to these Terms of Use
          shall be subject to the jurisdiction of the courts in Insert
          applicable city/state. By using Optipack3d’s website and Services, you
          acknowledge that you have read, understood, and agree to be bound by
          these Terms of Use. If you do not agree with these terms, please do
          not use our website or Services.
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsNConditon;
