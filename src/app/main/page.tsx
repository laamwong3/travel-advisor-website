import Navbar from "@/components/main/Navbar";
import React from "react";

const page = () => {
  return (
    <div className="fixed flex h-screen w-screen flex-col">
      <Navbar />
      <div className="flex h-full">
        <div className="w-1/4 border-r-2">LEFT</div>
        <div className="w-3/4">RIGHT</div>
      </div>
    </div>
  );
};

export default page;
