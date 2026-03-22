import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "./context";

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const search = (q: string) => {
    setQuery(q);
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <SearchContext.Provider value={{ query, navigate, search, goHome }}>
      {children}
    </SearchContext.Provider>
  );
};
