import { useState } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  handleSearch: (text: string) => void;
}

function SearchBox({ handleSearch }: SearchBoxProps) {
  const [value, setVallue] = useState("");

  const handleOnClange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    setVallue(text);
    handleSearch(text);
  }

  return <input onChange={handleOnClange} value={value} className={css.input} type="text" placeholder="Search notes" />;
}

export default SearchBox;
