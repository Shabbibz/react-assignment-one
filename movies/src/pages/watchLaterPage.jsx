import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromWatchLater from "../components/cardIcons/removeFromWatchLater";

const WatchLaterPage = () => {
  const {watchLater, setWatchLater } = useState([]);

  // Similar to FavouriteMoviesPage: Create an array of queries and run in parallel.

  useEffect(() => {
    const storedWatchLater = JSON.parse(localStorage.getItem("watchLater")) || [];
    setWatchLater(storedWatchLater);
  }, []);
  
  // Checking if any of the parallel queries is still loading.
  const isPending = watchLaterPageQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const movies = watchLaterPageQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const toDo = () => true;

  return (
    <PageTemplate
      title="Watch Later List"
      movies={watchLater}
      action={(movie) => {
        return (
          <>
             <RemoveFromWatchLater movie={movie} />
          </>
        );
      }}
    />
  );
};

export default WatchLaterPage;
