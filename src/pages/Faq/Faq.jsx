import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  styled,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const FaqData = [
  {
    ques: "Accordion 1",
    ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elig , adon  adoseick lsgomf, fgkhdsafn,",
  },
  {
    ques: "Accordion 2",
    ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elig , adon  adoseick lsgomf, fgkhdsafn,",
  },
  {
    ques: "Accordion 3",
    ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elig , adon  adoseick lsgomf, fgkhdsafn,",
  },
  {
    ques: "Accordion 4",
    ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elig , adon  adoseick lsgomf, fgkhdsafn,",
  },
  {
    ques: "Accordion 5",
    ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elig , adon  adoseick lsgomf, fgkhdsafn,",
  },
];

const Faq = () => {
  const CustomAccordion = styled(Accordion)(({ theme }) => ({
    // border: "1px solid #E0E0E0", // Light gray border
    boxShadow: "none", // Remove default shadow
    "&:not(:last-child)": {
      marginBottom: "0.5rem", // Space between accordions
    },
    "&.Mui-expanded": {
      margin: "0", // Prevent unwanted margin when expanded
    },
  }));

  const CustomAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
    "& .MuiAccordionSummary-content": {
      margin: 0,
      color: "#000", // Black text
      fontWeight: 500, // Medium weight for the question text
    },
    "&.Mui-expanded": {
      minHeight: "48px", // Reduce height when expanded
    },
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(180deg)", // Rotate icon when expanded
    },
  }));

  const CustomAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
    padding: "8px 16px", // Customize padding for details
    backgroundColor: "#F9F9F9", // Light background for details
  }));
  return (
    <>
      <Navbar />
      <main className="term-main">
        <div className="term-head">
          <h4>Frequently Asked Questions</h4>
        </div>
        <div style={{ marginTop: "4rem" }}>
          {FaqData.map((item) => (
            <CustomAccordion>
              <CustomAccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span">{item.ques}</Typography>
              </CustomAccordionSummary>
              <CustomAccordionDetails>
                <Typography>{item.ans}</Typography>
              </CustomAccordionDetails>
            </CustomAccordion>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Faq;
