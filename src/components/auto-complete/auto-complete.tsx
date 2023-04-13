import { useEffect, useState } from "react";
import { Country } from "../../types";
import "./auto-complete.css";
import { useHighlight } from "../../hooks";

type AutoCompleteProps<T extends Country> = {
  placeholder: string;
  data: T[];
};

const AutoComplete = <T extends Country>({
  placeholder,
  data,
}: AutoCompleteProps<T>) => {
  const { highlightText } = useHighlight();
  const [search, setSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<T[]>([]);

  useEffect(() => {
    if (search.length > 0) {
      const result = data.filter((d) =>
        d.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(result);
    } else {
      setFilteredData([]);
    }
  }, [data, search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value.replace(/^\s+/, ""));
  };

  return (
    <div className="input-group">
      <input
        placeholder={placeholder}
        type="text"
        onChange={(e) => handleChange(e)}
        value={search}
      />
      {filteredData.length > 0 && (
        <ul>
          {filteredData.map((d) => {
            const { string, highlightedString, endString } = highlightText(
              d,
              search
            );

            return (
              <li
                key={d.name.common}
                onClick={() => {
                  setSearch(d.name.common);
                }}
              >
                {string}
                <span>{highlightedString}</span>
                {endString}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
