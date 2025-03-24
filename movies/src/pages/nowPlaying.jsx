//This is a new page I created as part of my react assignment in which it will display the
//current popular movies 

import React from "react";
import { getNowPlayingMovies } from "../api/tmdb-api"; 
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToWatchLaterIcon from '../components/cardIcons/addToWatchLater' 


const NowPlayingMovies = (props) => {

    const { data, error, isPending, isError  } = useQuery({
      queryKey: ['discoverNowPlayingMovies'],
      queryFn: getNowPlayingMovies,
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
        title="Now Playing Movies"
        movies={movies}
        action={(movie) => {
          return <AddToWatchLaterIcon movie={movie} /> 
        }}
      />
  );
  };

  //Exports the page to the site
  export default NowPlayingMovies;
