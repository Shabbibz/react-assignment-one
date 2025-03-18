import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import WatchLaterIcon from "@mui/icons-material/PlaylistAdd";

const AddToWatchLaterIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToWatchLater = (e) => {
    e.preventDefault();
    context.addToWatchLater(movie);
  };

  return (
    <IconButton aria-label="add to watchlater" onClick={handleAddToWatchLater}>
      <WatchLaterIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToWatchLaterIcon;
