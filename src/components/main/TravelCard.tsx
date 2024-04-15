import React from "react";
import { Card, CardContent } from "../ui/card";
import { type attractions } from "@/constants/attractions";
import Image from "next/image";

type Unpacked<T> = T extends Array<infer U> ? U : T;

interface TTravelCard {
  attraction: Unpacked<typeof attractions.data>;
}

const TravelCard = ({ attraction }: TTravelCard) => {
  return (
    <Card className="flex flex-col items-center justify-center">
      {/* <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader> */}
      <CardContent className="rounded-lg p-2">
        <Image
          src={attraction.photo?.images.original.url ?? ""}
          alt={attraction.name ?? ""}
          className="rounded-lg object-cover object-center"
          width={Number(attraction.photo?.images.original.width) ?? 0}
          height={Number(attraction.photo?.images.original.height) ?? 0}
        />
        <h1 className="mt-2 text-center font-extrabold">{attraction.name}</h1>
        <h2>{attraction.description}</h2>
      </CardContent>
    </Card>
  );
};

export default TravelCard;
