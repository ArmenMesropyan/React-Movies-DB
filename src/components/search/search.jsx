import React from 'react';
import './search.scss';
// import {Container} from 'reactstrap';

const Search = ({onInputChange}) => {
    return (
        <section className="movies-page__search search-panel">
            <label htmlFor="search">Search</label>
            <input type="text" className="search-panel__input" id="search" placeholder="Search" onChange={onInputChange}/>
        </section>
    )
}

export default Search;