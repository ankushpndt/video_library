import React, { useState } from 'react';

import { SearchBox } from '../utils/SearchBox';
import { Backdrop } from '../utils/Backdrop';
import './searchbar.css';
export const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [toggleDropbox, setToggleDropbox] = useState(false);

  //   const timeoutRef = useRef(null);
  //   useEffect(() => {
  //     if (timeoutRef.current !== null) {
  //       clearTimeout(timeoutRef.current);
  //     }

  //     timeoutRef.current = setTimeout(() => {
  //       timeoutRef.current = null;
  //       if (searchTerm !== '') {

  //       }
  //     }, 1000);
  //   }, [searchTerm]);
  //   console.log(result);
  return (
    <div>
      <div className='search__bar'>
        {toggleDropbox && (
          <Backdrop
            toggle={setToggleDropbox}
            className='search__bar__backdrop'
          />
        )}

        <input
          type='search'
          value={searchTerm}
          onFocus={() => setToggleDropbox(true)}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='search__input'
          placeholder='Search'
        />
        {toggleDropbox && (
          <SearchBox
            setToggleDropbox={setToggleDropbox}
            searchTerm={searchTerm}
          />
        )}
      </div>
    </div>
  );
};
