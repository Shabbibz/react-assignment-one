import React from "react";
import { useParams } from 'react-router';
import { getRecommendations } from '../api/tmdb-api'
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'

const MoviePage = (props, recommendations) => {
  const { id } = useParams();
  const { data:movie, error, isPending, isError  } = useQuery({
    queryKey: ['movie', {id: id}],
    queryFn: getMovie, getRecommendations,
  })

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie}/>  
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
      {recommendations ? (
        <>
          <PageTemplate recommendations={recommendations}>
            <MovieRecommendations v={recommendations} />  
          </PageTemplate>
          
        </>
      ) : (
        <p>Waiting for movie recommendations</p>
      )}
    </>
  );
};

export default MoviePage;
