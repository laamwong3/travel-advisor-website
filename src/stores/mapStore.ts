import { proxy } from "valtio";
import { devtools } from "valtio/utils";

interface TCoords {
  defaultCoords:
    | {
        lat: number;
        lng: number;
      }
    | undefined;
  coords:
    | {
        lat: number;
        lng: number;
      }
    | undefined;
  zoomLevel: number | undefined;
  defaultZoomLevel: number;
}

export const mapStore = proxy<TCoords>({
  defaultCoords: undefined,
  coords: undefined,
  defaultZoomLevel: 12,
  zoomLevel: 12,
});

export const setDefaultCoords = (coords: { lat: number; lng: number }) => {
  mapStore.defaultCoords = coords;
};

export const setCoords = (coords: { lat: number; lng: number }) => {
  mapStore.coords = coords;
};

export const setZoomLevel = (zoomLevel: number) => {
  mapStore.zoomLevel = zoomLevel;
};

devtools(mapStore, {
  name: "mapStore",
  enabled: true,
});
