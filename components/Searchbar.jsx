import React from "react";
import styles from "../styles/Home.module.scss";
import { BiSearch } from "react-icons/bi";
function Searchbar({ search, setSearch }) {
  return (
    <div className={styles.searchbar}>
      <BiSearch className={styles.searchbar__pulse} />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
}

export default Searchbar;
