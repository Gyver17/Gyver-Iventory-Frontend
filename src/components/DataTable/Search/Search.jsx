import React, { useState } from 'react'
import styles from "./style.module.css"

const Search = ({ onSearch }) => {
    const [search, setSearch] = useState("");

    const onInputChange = value => {
        setSearch(value);
        onSearch(value);
    };
    return (
        <div className={styles.container}>
            <input
                type="text"
                // className={styles.input}
                placeholder="Buscar"
                value={search}
                onChange={e => onInputChange(e.target.value)}
            />
            {/*<div className={styles.icon}><i id={styles.iconSearch} className="icon iconmagnifier" /></div>*/}
            <span className="icon iconmagnifier" />
        </div>
    );
}

export default Search
