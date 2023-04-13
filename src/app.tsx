import { useCallback, useEffect, useState } from "react";
import { AutoComplete } from "./components";
import { Country } from "./types/country";
import { useDebounce } from "./hooks";
import "./styles/app.css";

const App = () => {
  const [name, setName] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const debouncedValue = useDebounce<string>(name, 1000);

  const fetchCountries = useCallback(async () => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${debouncedValue}`
      );
      const data: Country[] = await response.json();
      if (data.length > 0) {
        setCountries(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (debouncedValue.length > 0) {
      fetchCountries();
    } else {
      setCountries([]);
    }
  }, [fetchCountries, debouncedValue]);

  return (
    <div className="app">
      <AutoComplete
        placeholder="Search a country here..."
        data={countries}
        setName={setName}
        value={name}
      />
    </div>
  );
};

export default App;
