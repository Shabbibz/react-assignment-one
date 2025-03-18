//This is a new page I created as part of my react assignment in which it will display the
//current popular movies 

import React from "react";
import { getPopularMovies } from "../api/tmdb-api"; 
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToWatchLaterIcon from '../components/cardIcons/addToWatchLater' 


const PopularMovies = (props) => {

    const { data, error, isPending, isError  } = useQuery({
      queryKey: ['discoverPopularMovies'],
      queryFn: getPopularMovies,
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
        title="Discover Popular Movies"
        movies={movies}
        action={(movie) => {
          return <AddToWatchLaterIcon movie={movie} /> 
        }}
      />
  );
  };

  //Exports the page to the site
  export default PopularMovies;
