import Map from "@/components/main/Map";
import Menubar from "@/components/main/Menubar";
import Navbar from "@/components/main/Navbar";
import React from "react";

const page = () => {
  return (
    <div className="fixed flex h-screen w-screen flex-col">
      <Navbar />
      <div className="flex h-full">
        <div className="w-full border-r-2 md:w-1/4">
          <Menubar />
        </div>
        <div className="hidden w-full md:block md:w-3/4">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default page;
