import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styling/movieCard.css'

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()

  function handleClick() {
    console.log("Movie clicked:", movie);
    navigate('/tickets', {
      state: { 
        movieId: movie.id,
        movie: movie
      }
    })
  }


  return (
    <div className='movie-card' onClick={handleClick}>
      <div className='movie-info'>
        <div className='movie-detail'>
          <span className='label'>Title:</span>
          <span className='value'>{movie.title}</span>
        </div>
        <div className='movie-detail'>
          <span className='label'>Genre:</span>
          <span className='value'>{movie.genre}</span>
        </div>
      </div>      
    </div>
  )
}

export default MovieCard