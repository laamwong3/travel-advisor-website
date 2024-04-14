"use client";
import React, { useLayoutEffect } from "react";
import GoogleMapReact from "google-map-react";
import { useSnapshot } from "valtio";
import { mapStore, setCoords } from "@/stores/mapStore";

const Map = () => {
  const mapStoreSnapshot = useSnapshot(mapStore);

  useLayoutEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      },
    );
  }, []);

  console.log(mapStoreSnapshot.coords);
  return (
    <div className="h-full w-full">
      <GoogleMapReact
        onChange={(e) => {
          setCoords(e.center);
        }}
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API }}
        defaultCenter={mapStoreSnapshot.coords}
        center={mapStoreSnapshot.coords}
        defaultZoom={12}
        options={{ disableDefaultUI: true, zoomControl: true }}
      ></GoogleMapReact>
    </div>
  );
};

export default Map;
