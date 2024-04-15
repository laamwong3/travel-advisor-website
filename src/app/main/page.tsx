import Map from "@/components/main/Map";
import Menubar from "@/components/main/Menubar";
import Navbar from "@/components/main/Navbar";
import React from "react";

const page = () => {
  return (
    <div className="fixed flex h-screen w-screen flex-col">
      <Navbar />
      <div className="flex h-full">
        <div className="h-full w-full border-r-2 xl:w-1/3">
          <Menubar />
        </div>
        <div className="hidden w-full md:block xl:w-2/3">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default page;
