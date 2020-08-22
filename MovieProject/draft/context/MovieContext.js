import React, {useState} from 'react';

const MovieContext = React.createContext();

export const MovieProvider = ({children}) => {
  const [movieList, setMovieList] = useState([]);

  const addMovie = () => {
    setMovieList([
      ...movieList,
      {title: `My favorite # ${movieList.length + 1} `},
    ]);
  };

  return (
    <MovieContext.Provider value={{data: movieList, addMovie}}>{children}</MovieContext.Provider>
  );
};

export default MovieContext;
