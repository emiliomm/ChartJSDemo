import { useContext, useEffect, useState } from 'react';
import { ChartData } from 'chart.js';
import { MyContext } from '../../entities/MyContext';
import { FilterComponent } from '../FilterComponent';
import { BarChart } from '../chartJS/BarChar';

//Shows the population data in a graph divided by contient
export function GlobalGraph() {

  const { filteredCountries } = useContext(MyContext);
  const [continentData, setContinentData] = useState<any>(null);

  const datasets: ChartData<'bar', { key: string, value: number }[]> = {
    datasets: [{
      data: continentData,
      parsing: {
        xAxisKey: 'name',
        yAxisKey: 'population'
      }
    }],
  };

  useEffect(() => {
    let contient: any = {};
    //Group countries by contients, the API does not have a single call to obtain them
    filteredCountries.forEach(item => {
      if (contient[item.region] == null)
        contient[item.region] = item.population;
      else
        contient[item.region] = contient[item.region] + item.population;
    });
    //We convert it to an object to use it with the BarChart
    let continents: { name: string, population: number}[] =[];
    for (var key in contient) {
      if (contient.hasOwnProperty(key)) {
        continents.push({name: key, population: contient[key]});
      }
    }
    setContinentData(continents);
  }, [filteredCountries]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Population Graph by Continent</h2>
      <FilterComponent />
      <BarChart name={"Continents population"} chartData={datasets} />
    </div>
  );
}
