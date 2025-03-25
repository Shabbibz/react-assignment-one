import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromWatchLaterIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleRemoveFromWatchLater = (e) => {
    e.preventDefault();
    context.removeFromWatchLater(movie);
  };
  return (
    <IconButton
      aria-label="remove from watch later list"
      onClick={handleRemoveFromWatchLater}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromWatchLaterIcon;
