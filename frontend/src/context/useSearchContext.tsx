import { useContext } from "react";
import { SearchContext } from "./context";

const useSearchContext = () => {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used inside SearchProvider");
  return ctx;
};

export default useSearchContext;
