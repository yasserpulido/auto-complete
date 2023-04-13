import { useCallback } from "react";
import { Country } from "../types";

export const useHighlight = () => {
  const highlightText = useCallback(
    <T extends Country>(data: T, search: string) => {
      let searchIndex = data.name.common
        .toLowerCase()
        .indexOf(search.toLowerCase());
      let string = data.name.common.substring(0, searchIndex);
      let highlightedString = data.name.common.substring(
        searchIndex,
        searchIndex + search.length
      );
      let endString = data.name.common.substring(searchIndex + search.length);

      return { string, highlightedString, endString };
    },
    []
  );

  return { highlightText };
};
