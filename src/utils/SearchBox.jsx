import { SearchBoxResult } from './SearchBoxResult';

import './SearchBox.css';
import { useData } from '../Context/DataContext';

export const SearchBox = ({ setToggleDropbox, searchTerm }) => {
  const { videoList } = useData();
  const filteredVideoList = videoList.filter((el) =>
    el.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className='searchBox'>
      {searchTerm?.length !== 0 && (
        <div className='searchBox__results'>
          {filteredVideoList.map((video) => (
            <SearchBoxResult
              key={video._id}
              video={video}
              setToggleDropbox={setToggleDropbox}
            />
          ))}
        </div>
      )}

      {searchTerm?.length === 0 && (
        <>
          <h4 className='searchBox__heading'>Search</h4>
          <div className='searchBox__empty'>No results found</div>
        </>
      )}
    </div>
  );
};
