import { Link } from "react-router";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import img from "../../images/film-poster-placeholder.png";

export default function MovieRecommendations({ movie }) { 
  if (!movie) return null; 

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: "red" }}>
            <FavoriteIcon />
          </Avatar>
        }
        title={
          <Typography variant="h5" component="p">
            {movie.title || "Untitled"} {}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
        alt={movie.title} 
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}> {}
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" /> {movie.release_date || "Unknown"}
            </Typography>
          </Grid>
          <Grid item xs={6}> {}
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" /> {movie.vote_average ?? "N/A"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none" }}>
          <Button variant="outlined" size="small" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
