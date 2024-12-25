import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { StepConnector, styled } from "@mui/material";

const steps = [
  "Add Load Details",
  "Add Container Details",
  "Add Optimization Constraints",
];
const Steps = ({ activeStep }) => {
  const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
    [`& .MuiStepConnector-line`]: {
      borderColor: theme.palette.grey[400],
      borderTopWidth: 2,
    },
    [`&.Mui-active .MuiStepConnector-line`]: {
      borderColor: "green",
    },
    [`&.Mui-completed .MuiStepConnector-line`]: {
      borderColor: "green ",
    },
  }));
  return (
    <Box sx={{ width: "100%", margin: "2rem 0rem" }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<CustomStepConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                sx: {
                  "&.Mui-active": {
                    color: "#cc9c87",
                  },
                  "&.Mui-completed": {
                    color: "green",
                  },
                  borderRadius: "50%", // Ensures the icon looks like a button
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default Steps;
