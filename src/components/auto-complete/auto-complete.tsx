import { useState } from "react";
import { Country } from "../../types";
import { useHighlight } from "../../hooks";
import "./auto-complete.css";

type AutoCompleteProps<T extends Country> = {
  placeholder: string;
  data: T[];
  setName: (name: string) => void;
  value: string;
};

const AutoComplete = <T extends Country>({
  placeholder,
  data,
  setName,
  value,
}: AutoCompleteProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { highlightText } = useHighlight();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value.replace(/^\s+/, ""));
  };

  return (
    <div className="input-group">
      <input
        placeholder={placeholder}
        type="text"
        onChange={(e) => handleChange(e)}
        value={value}
        onFocus={() => setIsOpen(true)}
        onMouseDown={() => setIsOpen(false)}
      />
      {isOpen && data.length > 0 && (
        <ul>
          {data.map((d) => {
            const { string, highlightedString, endString } = highlightText(
              d,
              value
            );

            return (
              <li
                key={d.name.common}
                onClick={() => {
                  setName(d.name.common);
                  setIsOpen(false);
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
