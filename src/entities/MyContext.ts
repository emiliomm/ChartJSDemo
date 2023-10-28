import React from "react";

export type MyContextType = {
  countries: any[],
  filteredCountries: any[],
  onFilter(filterPopulationMore: number | null, filterPopulationLess: number | null): void
};
export const MyContext = React.createContext<MyContextType>({
  countries: [],
  filteredCountries: [],
  onFilter: (filterPopulationMore: number | null, filterPopulationLess: number | null) => { }
});