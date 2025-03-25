import React from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid2";

const MovieList = (props) => {
  let movieCards = props.movies.map((m) => (
    <Grid
      key={m.id}
      size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
      sx={{
        padding: "20px",
        background: "white",
        borderRadius: "8px",  // Rounded corners for cards
        boxShadow: 3,  // Subtle shadow for depth
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        '&:hover': {
          transform: "scale(1.05)",  // Slight zoom on hover
          boxShadow: 6,  // Stronger shadow on hover
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Movie key={m.id} movie={m} action={props.action} />
    </Grid>
  ));

  return (
    <Grid container spacing={2} sx={{ padding: "20px", justifyContent: "center" }}>
      {movieCards}
    </Grid>
  );
};

export default MovieList;
