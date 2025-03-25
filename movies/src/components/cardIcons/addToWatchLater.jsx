import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

const AddToWatchLaterIcon = ({ movie }) => {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const watchLater = JSON.parse(localStorage.getItem("watchLater")) || [];
    setAdded(watchLater.some((m) => m.id === movie.id));
  }, [movie.id]);

  const handleAddToWatchLater = () => {
    let watchLater = JSON.parse(localStorage.getItem("watchLater")) || [];

    if (!watchLater.some((m) => m.id === movie.id)) {
      watchLater.push(movie);
      localStorage.setItem("watchLater", JSON.stringify(watchLater));
      setAdded(true);
    }
  };

  return (
    <IconButton onClick={handleAddToWatchLater} color={added ? "primary" : "default"}>
      <WatchLaterIcon />
    </IconButton>
  );
};

export default AddToWatchLaterIcon;
