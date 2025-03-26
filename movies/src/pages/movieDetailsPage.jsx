import React, { useState } from "react";
import { useParams } from 'react-router';
import { getRecommendations } from '../api/tmdb-api'
import MovieRecommendations from "../components/movieRecommendations";
import MovieDetails from "../components/movieDetails/";
import MovieCredits from "../components/movieCredits";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
import Grid from "@mui/material/Grid";

const MoviePage = (props) => {
  const { id } = useParams();
  const { data: movie, error, isPending, isError } = useQuery({
    queryKey: ['movie', { id: id }],
    queryFn: getMovie,
  });

  const { data: recommendations, isPending: isRecLoading, isError: isRecError } = useQuery({
    queryKey: ['recommendations', { id }],
    queryFn: () => getRecommendations(id),
  });

  const [page, setPage] = useState(1);
  const recommendationsPerPage = 6;
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const currentRecommendations = recommendations?.results.slice(
    (page - 1) * recommendationsPerPage,
    page * recommendationsPerPage
  );

  // const { data: credits, isPending: isCreLoading, isError: isCreError } = useQuery({
  //   queryKey: ['credits', { id }],
  //   queryFn: () => getCredits(id),
  // });

  // const [page, setPage] = useState(1);
  // const creditsPerPage = 6;
  // const handleChangePage = (event, value) => {
  //   setPage(value);
  // };
  // const currentCredits = credits?.cast.slice(
  //   (page - 1) * creditsPerPage,
  //   page * creditsPerPage
  // );

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

      <h1>Movie Recommendations:</h1>

      {recommendations?.results?.length > 0 ? (
        <>
          <Grid container spacing={2}>
            {currentRecommendations?.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4}>
                <MovieRecommendations movie={movie} />
              </Grid>
            ))}
          </Grid>
          
          <h1>Movie Credits:</h1>

          {/* {credits?.cast?.length > 0 ? (
        <>
          <Grid container spacing={2}>
            {currentCredits?.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4}>
                <MovieCredits movie={movie} />
              </Grid>
            ))}
          </Grid> */}

        </>
      ) : (
        <p>No recommendations available</p>
      )}
    </>
  );
};

export default MoviePage;
