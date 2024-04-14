"use client";

import React, { useEffect, useState } from "react";
import SelectLocation from "../home/SelectLocation";
import { City, Country, State } from "country-state-city";
import {
  locationStore,
  setSelectedCity,
  setSelectedState,
} from "@/stores/locationStore";
import { useSnapshot } from "valtio";

const Navbar = () => {
  const locationStoreSnapshot = useSnapshot(locationStore);

  const countryFrameworks = Country.getAllCountries().map((country) => ({
    value: country.name,
    label: country.name,
  }));

  const [countryList] = useState(countryFrameworks);
  const [stateList, setStateList] = useState<typeof countryFrameworks>([]);
  const [cityList, setCityList] = useState<typeof countryFrameworks>([]);

  useEffect(() => {
    setSelectedState("");
    setSelectedCity("");
    setCityList([]);
    setStateList([]);
    if (locationStoreSnapshot.selectedCountry.length !== 0) {
      const selectedCountry = Country.getAllCountries().find(
        (country) => country.name === locationStoreSnapshot.selectedCountry,
      );
      const tempStateList = State.getStatesOfCountry(
        selectedCountry?.isoCode,
      ).map((state) => ({
        value: state.name,
        label: state.name,
      }));
      setStateList(tempStateList);
    }
  }, [locationStoreSnapshot.selectedCountry]);

  useEffect(() => {
    if (
      locationStoreSnapshot.selectedState.length !== 0 &&
      locationStoreSnapshot.selectedCountry.length !== 0
    ) {
      setSelectedCity("");
      setCityList([]);
      const selectedCountry = Country.getAllCountries().find(
        (country) => country.name === locationStoreSnapshot.selectedCountry,
      );
      const selectedState = State.getAllStates().find(
        (state) => state.name === locationStoreSnapshot.selectedState,
      );

      if (
        selectedState?.isoCode !== undefined &&
        selectedCountry?.isoCode !== undefined
      ) {
        const tempCityList = City.getCitiesOfState(
          selectedCountry?.isoCode,
          selectedState?.isoCode,
        ).map((city) => ({
          value: city.name,
          label: city.name,
        }));
        setCityList(tempCityList);
      }
    }
  }, [
    locationStoreSnapshot.selectedState,
    locationStoreSnapshot.selectedCountry,
  ]);
  return (
    <nav className="flex flex-wrap justify-center gap-4 border-b-2 p-4">
      <SelectLocation frameworks={countryList} type={"country"} />
      <SelectLocation frameworks={stateList} type={"state"} />
      <SelectLocation frameworks={cityList} type={"city"} />
    </nav>
  );
};

export default Navbar;
