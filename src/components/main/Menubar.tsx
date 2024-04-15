import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { attractions } from "@/constants/attractions";
import TravelCard from "./TravelCard";

const Menubar = () => {
  return (
    <ScrollArea className="flex h-full w-full items-center justify-center px-32 pb-20 pt-4">
      {attractions.data
        .filter(
          (attraction) =>
            attraction.photo?.images !== undefined &&
            attraction.description !== undefined &&
            attraction.description.length > 0,
        )
        .map((attraction) => (
          <>
            <TravelCard key={attraction.location_id} attraction={attraction} />
            <div className="my-4" />
          </>
        ))}
    </ScrollArea>
  );
};

export default Menubar;
