import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DataBLL } from '../BLL/DataBLL';
import { RestCountry } from '../entities/RestCountry';
import { Country } from '../entities/Country';
import { MyContext } from '../entities/MyContext';
import { ContinentGraph } from './views/ContinentGraph';
import { NoMatch } from './pageError/NoMatch';
import { GlobalGraph } from './views/GlobalGraph';
import styles from './Home.module.scss';

//Main component, shows the different views and fetchs the data
export function Home() {
  const [countries, setCountries] = useState<any[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<any[]>([]);
  const [indexContinents, setIndexContinents] = useState<string[]>([]);

  const [indexComponents, setIndexCompoNents] = useState<any[]>([]);
  const [routesComponents, setRoutesComponents] = useState<any[]>([]);

  const onFilter = (filterPopulationMore: number | null, filterPopulationLess: number | null) => {
    let newCountries = [...countries];
    if (filterPopulationMore != null)
      newCountries = newCountries.filter((c => c.population >= filterPopulationMore));
    if (filterPopulationLess != null)
      newCountries = newCountries.filter((c => c.population <= filterPopulationLess));
    setFilteredCountries(newCountries);
  };

  useEffect(() => {
    let _BLL: DataBLL = new DataBLL();
    _BLL.GetData().then((apiData: RestCountry[]) => {
      let data: Country[] = apiData.map((country) => {
        return ({
          name: country.name.common,
          population: country.population,
          region: country.region
        });
      });
      setCountries(data);
      setFilteredCountries(data);
      setIndexContinents([...new Set(data.map(a => a.region))]);
    }).catch((err) => {
      //TODO ERROR
    });
  }, []);

  useEffect(() => {

    let newIndexComponents = indexContinents.map((item) => {
      return (<Link to={`/${item}`} style={{ padding: 5 }}>
        {item}
      </Link>);
    });
    let newRoutesComponents = indexContinents.map((item) => {
      return (<Route path={`/${item}`} element={<ContinentGraph contient={item} />} />);
    });
    setIndexCompoNents(newIndexComponents);
    setRoutesComponents(newRoutesComponents);
  }, [indexContinents]);

  return (
    <>
    <Router>
      <nav className={styles.nav} style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}>
          Global
        </Link>
        {indexComponents}
      </nav>
      <MyContext.Provider value={{ countries, filteredCountries, onFilter }}>
        <Routes>
          <Route path="/" element={<GlobalGraph />} />
          {routesComponents}
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </MyContext.Provider>
    </Router>
    Made by Emilio with React, Vite, ChartJS and React Router
    </>
  );
}