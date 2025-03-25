import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";

const WatchLaterPage = () => {
  const [watchLater, setWatchLater] = useState([]);

  useEffect(() => {
    const storedWatchLater = JSON.parse(localStorage.getItem("watchLater")) || [];
    setWatchLater(storedWatchLater);
  }, []);

  return (
    <PageTemplate
      title="Watch Later"
      movies={watchLater}
      action={() => null} // No extra buttons needed
    />
  );
};

export default WatchLaterPage;
