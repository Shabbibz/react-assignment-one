import React from "react";
import { useParams } from "react-router";
import { getRecommendations, getMovie, getCredits } from "../api/tmdb-api";
import MovieRecommendations from "../components/movieRecommendations";
import MovieCredits from "../components/moviecredits";
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import Grid from "@mui/material/Grid";

// Fetch movie details
const MoviePage = () => {
  const { id } = useParams();
  const { data: movie, error, isPending, isError } = useQuery({
    queryKey: ["movie", { id }],
    queryFn: () => getMovie(id),
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // Fetch recommendations
  const {
    data: recommendations,
    error: recError,
    isPending: isRecLoading,
    isError: isRecError,
  } = useQuery({
    queryKey: ["recommendations", { id }],
    queryFn: () => getRecommendations(id),
  });

  // Fetch credits
  const {
    data: credits,
    error: creError,
    isPending: isCreLoading,
    isError: isCreError,
  } = useQuery({
    queryKey: ["credits", { id }],
    queryFn: () => getCredits(id),
  });

  return (
    <>
      {movie ? (
        <PageTemplate movie={movie}>
          <MovieDetails movie={movie} />
        </PageTemplate>
      ) : (
        <p>Waiting for movie details...</p>
      )}

      <h1>Movie Recommendations:</h1>
      {isRecLoading ? (
        <Spinner />
      ) : isRecError ? (
        <h1>{recError.message}</h1>
      ) : recommendations?.results?.length > 0 ? (
        <Grid container spacing={2}>
          {recommendations.results.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4}>
              <MovieRecommendations movie={movie} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No recommendations available</p>
      )}

      <h1>Movie Credits:</h1>
      {isCreLoading ? (
        <Spinner />
      ) : isCreError ? (
        <h1>{creError.message}</h1>
      ) : credits?.cast?.length > 0 ? (
        <Grid container spacing={2}>
          {credits.cast.map((person) => (
            <Grid item key={person.id} xs={12} sm={6} md={4}>
              <MovieCredits person={person} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No credits available</p>
      )}
    </>
  );
};

export default MoviePage;
