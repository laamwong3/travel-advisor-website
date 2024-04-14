import { proxy } from "valtio";
import { devtools } from "valtio/utils";

interface TCoords {
  coords:
    | {
        lat: number;
        lng: number;
      }
    | undefined;
}

export const mapStore = proxy<TCoords>({
  coords: undefined,
});

export const setCoords = (coords: { lat: number; lng: number }) => {
  mapStore.coords = coords;
};

devtools(mapStore, {
  name: "mapStore",
  enabled: true,
});
