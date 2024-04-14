import { proxy } from "valtio";
import { devtools } from "valtio/utils";

export const locationStore = proxy({
  selectedCountry: "",
  selectedState: "",
  selectedCity: "",
});

export const setSelectedCountry = (country: string) => {
  locationStore.selectedCountry = country;
};

export const setSelectedState = (state: string) => {
  locationStore.selectedState = state;
};

export const setSelectedCity = (city: string) => {
  locationStore.selectedCity = city;
};

devtools(locationStore, {
  name: "locationStore",
  enabled: true,
});
