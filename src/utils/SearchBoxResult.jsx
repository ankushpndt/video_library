import { Link } from 'react-router-dom';

export const SearchBoxResult = ({ video, setToggleDropbox }) => {
  return (
    <Link
      to={`/video/${video?.videoId}`}
      style={{
        textDecoration: 'none',
        color: 'black',

        marginBottom: '1rem',
      }}
      onClick={setToggleDropbox ? () => setToggleDropbox(false) : () => {}}
      className='searchBox__result'
    >
      <div className='sb'>
        <img className='avatar__img' src={video.image} alt='avatar' />

        <div className='result__content'>
          <h5 className='title'>{video.title}</h5>
        </div>
      </div>
    </Link>
  );
};
