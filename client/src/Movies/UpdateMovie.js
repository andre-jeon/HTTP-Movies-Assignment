import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: 0,
    stars: [],
}

const UpdateMovie = (props) => {
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

    const changeHandler = (ev) => {
        ev.persist();
        let value = ev.target.value;
        if (ev.target.name === "price") {
            value = parseInt(value, 10);
        }

        setMovies({
            ...movie,
            [ev.target.name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then((res) => {
                props.setMovies(res.data);
                history.push(`/update-movie/${id}`);
            })
            .catch((err) => console.error(err.message));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Update Movie</h1>

            <label htmlFor='title'>
                <input
                    type='text'
                    id='title'
                    name='title'
                    value={setMovies.title}
                    onChange={changeHandler}
                    placeholder='Title' />
            </label>
            <div className="baseline" />

            <label htmlFor='director'>
                <input
                    type='text'
                    id='director'
                    name='director'
                    value={setMovies.director}
                    onChange={changeHandler}
                    placeholder='Director' />
            </label>
            <div className="baseline" />

            <label htmlFor='metascore'>
                <input
                    type='number'
                    id='metascore'
                    name='metascore'
                    value={setMovies.metascore}
                    onChange={changeHandler}
                    placeholder='Metascore' />
            </label>
            <div className="baseline" />

            <button>Update Movie</button>
        </form>
    )


}

export default UpdateMovie