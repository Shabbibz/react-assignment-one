import { getGenres } from "../../api/tmdb-api";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'; // Updated image
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';

const formControl = {
  margin: 1,
  minWidth: "150px",
  backgroundColor: "rgb(255, 255, 255)"
};

export default function FilterMoviesCard(props) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const genres = data.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "245", // Increased height to show more of the image
        backgroundColor: "transparent",
        boxShadow: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${img})`,
        backgroundSize: "cover", // Ensures the image covers the area without stretching
        backgroundRepeat: "no-repeat", // Prevents image repetition
        position: "fixed", // Fix the filter at the top of the page
        top: 0,
        zIndex: 1000,
        padding: 0, // Remove padding to allow full-width view
      }}
      variant="outlined"
    >
      <CardContent
        sx={{
          textAlign: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark background overlay for text visibility
          padding: 2,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Flex layout for icon and text */}
        <Typography variant="h5" component="h1" sx={{
          fontWeight: "bold",
          display: "flex",
          alignItems: "center", // Vertically aligns the icon with the text
          justifyContent: "center", // Centers the icon and text horizontally
        }}>
          <SearchIcon fontSize="large" sx={{ marginRight: 1 }} /> {/* Adds space between icon and text */}
          Filter the Movies
        </Typography>

        {/* Grid container for the search and genre filter */}
        <Grid container spacing={2} sx={{ marginTop: 2, justifyContent: "center" }}>
          {/* Search bar */}
          <Grid item xs={12} sm={6} md={4} sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              sx={{ ...formControl, width: "100%" }}
              id="filled-search"
              label="Search field"
              type="search"
              variant="filled"
              value={props.titleFilter}
              onChange={handleTextChange}
            />
          </Grid>

          {/* Genre filter */}
          <Grid item xs={12} sm={6} md={4} sx={{ display: "flex", justifyContent: "center" }}>
            <FormControl sx={{ ...formControl, width: "100%" }}>
              {}
              <InputLabel
                id="genre-label"
                sx={{
                  position: "absolute",
                  top: "-12px", // Moves the label above the select box
                  left: "10px", // Centers the label
                  fontSize: "1rem",
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.6)", 
                  padding: "0 5px",
                }}
              >
                Genre
              </InputLabel>
              <Select
                labelId="genre-label"
                id="genre-select"
                value={props.genreFilter}
                onChange={handleGenreChange}
                displayEmpty
                sx={{ paddingTop: "5px" }} // Adjust padding for space
              >
                {genres.map((genre) => (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
