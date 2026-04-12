import { useContext } from "react";
import { SearchContext } from "./seach-context";

const useSearch = () => {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used inside SearchProvider");
  return ctx;
};

export default useSearch;
