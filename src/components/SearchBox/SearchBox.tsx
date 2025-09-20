import { useState } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (text: string) => void;
}

function SearchBox({ onSearch }: SearchBoxProps) {
  const [value, setValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    setValue(text);
    onSearch(text);
  }

  return <input onChange={onChange} value={value} className={css.input} type="text" placeholder="Search notes" />;
}

export default SearchBox;
