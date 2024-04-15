"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  setSelectedCountry,
  setSelectedState,
  setSelectedCity,
  locationStore,
} from "@/stores/locationStore";
import { setCoords, setZoomLevel } from "@/stores/mapStore";
import { City, Country, State } from "country-state-city";

interface TFrameworks {
  frameworks: Array<{
    value: string;
    label: string;
  }>;
  type: "country" | "state" | "city";
}

export default function SelectLocation({ frameworks, type }: TFrameworks) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const updateLocation = (currentValue: string) => {
    if (type === "country") {
      setSelectedCountry(currentValue);
      const coords = Country.getAllCountries().find(
        (country) => country.name === currentValue,
      );
      if (coords?.latitude !== undefined && coords?.longitude !== undefined) {
        setCoords({
          lat: Number(coords.latitude),
          lng: Number(coords.longitude),
        });
        setZoomLevel(4);
      }
    } else if (type === "state") {
      setSelectedState(currentValue);
      const selectedCountry = Country.getAllCountries().find(
        (country) => country.name === locationStore.selectedCountry,
      );
      const coords = State.getStatesOfCountry(selectedCountry?.isoCode).find(
        (state) => state.name === currentValue,
      );
      if (coords?.latitude !== undefined && coords?.longitude !== undefined) {
        setCoords({
          lat: Number(coords.latitude),
          lng: Number(coords.longitude),
        });
        setZoomLevel(8);
      }
    } else if (type === "city") {
      setSelectedCity(currentValue);
      const selectedCountry = Country.getAllCountries().find(
        (country) => country.name === locationStore.selectedCountry,
      );

      const selectedState = State.getStatesOfCountry(
        selectedCountry?.isoCode,
      ).find((state) => state.name === locationStore.selectedState);

      if (
        selectedCountry?.isoCode !== undefined &&
        selectedState?.isoCode !== undefined
      ) {
        const coords = City.getCitiesOfState(
          selectedCountry?.isoCode,
          selectedState?.isoCode,
        ).find((city) => city.name === currentValue);
        if (coords?.latitude !== undefined && coords?.longitude !== undefined) {
          setCoords({
            lat: Number(coords.latitude),
            lng: Number(coords.longitude),
          });
          setZoomLevel(12);
        }
      }
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between md:w-[400px]"
        >
          {value.length > 0
            ? frameworks.find((framework) => framework.value === value)?.label
            : `Select ${type}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 md:w-[400px]">
        <Command>
          <CommandInput placeholder={`Search ${type}...`} />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    updateLocation(currentValue);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
