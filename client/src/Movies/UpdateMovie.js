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

const UpdateForm = (props) => {
    const { id } = useParams()
    const useHistory = useHistory()
    const [movie, setMovie] = useState(initialMovie)

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then((res) => {console.log(res)})
        .catch((err) => {console.error(err)})
    })
}

export default UpdateMovie