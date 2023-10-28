import { useContext, useEffect, useState } from 'react';
import { ChartData } from 'chart.js';
import { BarChart } from '../chartJS/BarChar';
import { MyContext } from '../../entities/MyContext';
import { FilterComponent } from '../FilterComponent';

//Shows the population data in a graph divided by country and filtered by contient
export function ContinentGraph(props: any) {
  const { filteredCountries } = useContext(MyContext);

  const [continent, setContinent] = useState<string>("");
  const [countriesByContinent, setCountriesByContinent] = useState<any[]>([]);

  useEffect(() => {
    setContinent(props.contient ?? "");
    setCountriesByContinent(filteredCountries.filter((c => c.region == props.contient)));
  }, [props.contient, filteredCountries]);

  const datasets: ChartData<'bar', { key: string, value: number }[]> = {
    datasets: [{
      data: countriesByContinent,
      parsing: {
        xAxisKey: 'name',
        yAxisKey: 'population'
      }
    }],
  };


  return (
    <div style={{ padding: 20 }}>
      <h2>Population Graph by Country ({continent})</h2>
      <FilterComponent isCountries />
      <BarChart  name={"Countries population"} chartData={datasets} />
    </div>
  );
}
