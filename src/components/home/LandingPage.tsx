import Image from "next/image";
import React from "react";
import backgroundImage from "@/assets/images/backgroundImage.jpeg";
import SelectLocation from "./SelectLocation";

const LandingPage = () => {
  return (
    <div className="fixed h-screen w-screen">
      <Image
        src={backgroundImage}
        alt="background"
        className="h-full w-full object-cover object-center opacity-50"
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-3xl font-bold">
        <h1 className="mb-4">where are you going?</h1>
        <SelectLocation />
      </div>
    </div>
  );
};

export default LandingPage;
