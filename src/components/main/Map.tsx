"use client";
import React, { useLayoutEffect } from "react";
import GoogleMapReact from "google-map-react";
import { useSnapshot } from "valtio";
import { mapStore, setCoords, setDefaultCoords } from "@/stores/mapStore";

const Map = () => {
  const mapStoreSnapshot = useSnapshot(mapStore);

  useLayoutEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setDefaultCoords({ lat: latitude, lng: longitude });
      },
    );
  }, []);

  return (
    <div className="h-full w-full">
      <GoogleMapReact
        onChange={(e) => {
          setCoords(e.center);
        }}
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API }}
        defaultCenter={mapStoreSnapshot.defaultCoords}
        center={mapStoreSnapshot.coords}
        defaultZoom={mapStoreSnapshot.defaultZoomLevel}
        zoom={mapStoreSnapshot.zoomLevel}
        options={{ disableDefaultUI: true, zoomControl: true }}
        // margin={[50, 50, 50, 50]}
      ></GoogleMapReact>
    </div>
  );
};

export default Map;
