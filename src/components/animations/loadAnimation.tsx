'use client'
import React, { useEffect, useState } from 'react';

export default function LoadAnimation() {
  const [Lottie, setLottie] = useState<any>(null);

  useEffect(() => {
    import('lottie-react').then(LottieModule => {
      setLottie(() => LottieModule.default);
    });
  }, []);

  const animationData = require('../../../public/animations/load.json');

  if (!Lottie) {
    return null;
  }

  return <Lottie animationData={animationData} loop={false} style={{ width: 350, height: 350 }} />;
};