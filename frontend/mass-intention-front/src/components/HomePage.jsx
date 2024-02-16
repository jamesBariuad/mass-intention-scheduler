import React from "react";
import heroImage from "../assets/daniel-tseng-QCjC1KpA4nA-unsplash.jpg";

const HomePage = () => {
  return (
    <>
      <div
        className="w-screen h-dvh bg-center grayscale brightness-90 bg-cover absolute -z-10"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
      </div>
      <div className="z-10 text-center text-slate-50 h-screen flex flex-col items-center justify-center absolute w-screen">
          <div className="text-4xl font-semibold">Mass Intention</div>
          <div className="text-sm px-8 mt-2 opacity-95">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
            nam nostrum odio et aspernatur illo!
          </div>
          <button className="mt-5 font-semibold text-black bg-slate-50 mx-auto px-5 py-2 rounded-xl">
            Schedule A Mass
          </button>
        </div>
      <div className="w-screen h-screen bg-black opacity-20 absolute  "></div>
    </>
  );
};

export default HomePage;
