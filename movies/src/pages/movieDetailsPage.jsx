import React from "react";
import { useParams } from 'react-router';
import { getRecommendations } from '../api/tmdb-api'
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'

// Fetch movie details
const MoviePage = (props) => {
  const { id } = useParams();
  const { data:movie, error, isPending, isError  } = useQuery({
    queryKey: ['movie', {id: id}],
    queryFn: getMovie,
  })

  
  // Fetch recommendations
  const { data: recommendations, error: recError, isPending: isRecLoading, isError: isRecError } = useQuery({
    queryKey: ['recommendations', { id }],
    queryFn: () => getRecommendations(id), // 
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  return (
    <>
      {movie ? (
        <PageTemplate movie={movie}>
          <MovieDetails movie={movie} />
        </PageTemplate>
      ) : (
        <p>Waiting for movie details</p>
      )}

      {recommendations && recommendations.results.length > 0 ? (
        <MovieRecommendations recommendations={recommendations.results} />
      ) : (
        <p>No recommendations available</p>
      )}
    </>
  );
};

export default MoviePage;
