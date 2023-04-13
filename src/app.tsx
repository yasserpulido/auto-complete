import { useCallback, useEffect, useState } from "react";
import { AutoComplete } from "./components";
import { Country } from "./types/country-test";
import "./styles/app.css";

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  const fetchCountries = useCallback(async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data: Country[] = await response.json();
      if (data.length > 0) {
        setCountries(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  return (
    <div className="app">
      <AutoComplete placeholder="Search a country here..." data={countries} />
    </div>
  );
};

export default App;
