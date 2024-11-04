import React, { createContext, useContext, useRef } from "react";

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const featureSectionRef = useRef(null);

  const scrollToFeatures = () => {
    const scrollAmount = 2350; // Pixels to scroll by, adjust as needed
    const startPosition = window.pageYOffset;
    const targetPosition = startPosition + scrollAmount;
    const duration = 300; // Short duration for a quick scroll
    let startTime = null;

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(
        timeElapsed,
        startPosition,
        scrollAmount,
        duration
      );

      window.scrollTo(0, run);

      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
    // featureSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ScrollContext.Provider value={{ scrollToFeatures, featureSectionRef }}>
      {children}
    </ScrollContext.Provider>
  );
};

// Custom hook to use the scroll context
export const useScroll = () => useContext(ScrollContext);
