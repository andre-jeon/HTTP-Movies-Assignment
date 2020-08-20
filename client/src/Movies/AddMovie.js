import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const initialMovie = {
    title: '',
    director: '',
    metascore: 0,
    starValue: '',
    stars: [],
}

const AddMovie = (props) => {
    const { id } = useParams()
    const history = useHistory()
    const [movie, setMovies] = useState(initialMovie)

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => {
                // console.log(res.data)
                setMovies(res.data)
            })
            .catch((err) => console.error(err.message))
    }, [id])

    const handleOnChange = (e) => {
        setMovies({ ...movie, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then((res) => {
                props.movieList.filter(movie => movie.id !== id) // removing the old Godfather
                props.setMovieList([...props.movieList, res.data]); // setting res.data at the end of array
                props.getMovieList(); // resets the state in app
                history.push(`/movies/${id}`);
            })
            .catch((err) => console.error(err.message));
    };

    const addStar = (e) => {
        e.preventDefault();
        setMovies({...movie, starValue: '', stars: [...movie.stars, movie.starValue]})
    }


    return (
        <form onSubmit={handleSubmit}>
            <h1>Update Movie</h1>

            <label htmlFor='title'>
                <input
                    type='text'
                    id='title'
                    name='title'
                    value={movie.title}
                    onChange={handleOnChange}
                    placeholder='Title' />
            </label>
            <div className="baseline" />

            <label htmlFor='director'>
                <input
                    type='text'
                    id='director'
                    name='director'
                    value={movie.director}
                    onChange={handleOnChange}
                    placeholder='Director' />
            </label>
            <div className="baseline" />

            <label htmlFor='metascore'>
                <input
                    type='number'
                    id='metascore'
                    name='metascore'
                    value={movie.metascore}
                    onChange={handleOnChange}
                    placeholder='Metascore' />
            </label>
            <div className="baseline" />

            <label htmlFor='starValue'>
                <input
                    type='text'
                    id='starValue'
                    name='starValue'
                    value={movie.starValue}
                    onChange={handleOnChange}
                    placeholder='Star' />
            </label>
            <button onClick={addStar}>+</button>
            <div className="baseline" />
            
            {movie.stars.map(star => {
                return (
                    <div>{star}</div>
                )
            })}

            <button className="add-movie-btn">Add Movie</button>
        </form>
    )
}

export default AddMovie