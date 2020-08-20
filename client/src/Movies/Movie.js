import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import UpdateMovie from "./UpdateMovie";

function Movie({ addToSavedList, movieList, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const history = useHistory()
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        console.log(res)
        const updateMovieList = movieList.filter(movie => movie.id !== res.data) 
        // filter out the movie that has the resp.data (return params.id) id that matches 
        setMovieList(updateMovieList); 
        // set the new list
        history.push('/')
      })
      .catch((err) => {console.error(err)})
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const pushRoute = () => {
    history.push(`/update-movie/${params.id}`)
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={pushRoute}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Movie;
