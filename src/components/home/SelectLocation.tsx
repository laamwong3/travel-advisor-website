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
} from "@/stores/locationStore";

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
    } else if (type === "state") {
      setSelectedState(currentValue);
    } else if (type === "city") {
      setSelectedCity(currentValue);
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
