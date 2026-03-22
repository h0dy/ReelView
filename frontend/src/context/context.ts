import { createContext } from "react";
import type { NavigateFunction } from "react-router-dom";

type SearchContextType = {
  query: string;
  navigate: NavigateFunction;
  search: (q: string) => void;
  goHome: () => void;
};

export const SearchContext = createContext<SearchContextType | null>(null);
