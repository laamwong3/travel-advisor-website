import Image from "next/image";
import React from "react";
import backgroundImage from "@/assets/images/backgroundImage.jpeg";
import { Button } from "../ui/button";
import Link from "next/link";

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
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <Link href={"/main"} className="flex items-center">
            <Button className="w-[200px]">Explore</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
