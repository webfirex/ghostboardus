const GlowBg = () => {

  return (
    <div
      className="absolute top-0 left-0 w-full h-full animate-glowBg backdrop-blur-sm"
      style={{
        transition: 'all 0.4s ease-in',
        background: 'conic-gradient(from 156deg at 50% 50%, rgba(0, 0, 0, 0.35) 0deg, rgba(0, 0, 0, 0.70) 54.00000214576721deg, rgba(0, 0, 0, 0.35) 108.00000429153442deg, rgba(0, 0, 0, 0.70) 161.99999570846558deg, rgba(0, 0, 0, 0.35) 216.00000858306885deg, rgba(0, 0, 0, 0.70) 270deg, rgba(0, 0, 0, 0.35) 323.99999141693115deg)' 
      }}
    ></div>
  );
};

export default GlowBg;
