import React from "react";
import { getTopRatedMovies } from "../api/tmdb-api"; 
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToWatchLaterIcon from '../components/cardIcons/addToWatchLater' 

const TopRatedMovies = (props) => {

  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['discoverTopRatedMovies'],
    queryFn: getTopRatedMovies,
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;


  return (
    <PageTemplate
      title="Discover Top Rated Movies"
      movies={movies}
      action={(movie) => {
        return <AddToWatchLaterIcon movie={movie} /> 
      }}
    />
);
};
export default TopRatedMovies;
