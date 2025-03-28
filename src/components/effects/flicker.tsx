'use client';

import { useEffect, useState } from 'react';

const FlickerBg = () => {
  const [opacity, setOpacity] = useState(0.5);

  useEffect(() => {
    const flicker = () => {
      const newOpacity = Math.random() * 0.5 + 0.5; // Randomly generate opacity between 0 and 0.5
      setOpacity(newOpacity);
    };

    const interval = setInterval(flicker, Math.random() * 200 + 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-black -z-10 dashGhostBg"
      style={{
        opacity: opacity,
        transition: 'opacity 0.5s ease-in-out', // Smooth transition for a natural flicker
      }}
    ></div>
  );
};

export default FlickerBg;
