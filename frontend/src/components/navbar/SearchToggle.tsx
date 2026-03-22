import useSearchContext from "@/context/useSearchContext";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";

const SearchToggle = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { search } = useSearchContext();

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setValue("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearch() {
    if (!open) {
      setOpen(true);
      return;
    }
    if (value.trim()) {
      search(value.trim());
      setValue("");
      setOpen(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") {
      setOpen(false);
      setValue("");
    }
  }

  return (
    <div ref={wrapperRef} className="flex items-center gap-2 relative">
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "w-40" : "w-0"
        }`}
      >
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Search"
          className="h-8 rounded-full px-4 bg-gray-200 text-gray-800 placeholder:text-gray-400 dark:bg-gray-200 dark:text-gray-800"
        />
      </div>

      <button
        onClick={handleSearch}
        className="cursor-pointer text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchToggle;
