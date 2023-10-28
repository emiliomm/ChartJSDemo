import { MyContext } from '../entities/MyContext';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import styles from './FilterComponent.module.scss';

//Component reused to filter the data by population
export const FilterComponent = ({ isCountries }: any) => {

  const [filterPopulationMore, setPopulationMore] = useState<number | null>(null);
  const [filterPopulationLess, setPopulationLess] = useState<number | null>(null);

  const { onFilter } = useContext(MyContext);

  const onInputMoreChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = !Number.isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : null;
    setPopulationMore(value);
  };
  const onInputLessChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = !Number.isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : null;
    setPopulationLess(value);
  };
  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") { onFilter(filterPopulationMore, filterPopulationLess) }
  }

  useEffect(() => {
    setPopulationLess(null);
    setPopulationMore(null);
    onFilter(filterPopulationMore, filterPopulationLess);
  }, []);

  return (
    <>
      <div className={styles.root}>
        <div className={styles.control}>
          <label>Filter by {isCountries ? "countries" : "continents"} with more population than</label>
          <input
            type="number"
            value={filterPopulationMore ?? ''}
            onKeyDown={handleEnter}
            onChange={onInputMoreChange} />
        </div>
        <div className={styles.control}>
          <label>Filter by {isCountries ? "countries" : "continents"} with less population than</label>
          <input
            type="number"
            value={filterPopulationLess ?? ''}
            onKeyDown={handleEnter}
            onChange={onInputLessChange} />
        </div>
        <button onClick={() => onFilter(filterPopulationMore, filterPopulationLess)}>Filter</button>
      </div>
    </>
  );
};
