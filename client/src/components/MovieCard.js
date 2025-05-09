import React from 'react'
import { Link } from 'react-router-dom'
import '../styling/movieCard.css'

const MovieCard = ({ movie }) => {
  if(!movie) return null

  return (
    <div className='movie-card'>
      <Link to={{ pathname: '/tickets',}} state={{ movieId: movie.id, movie: movie }}>      
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
      </Link>
    </div>
  )
}

export default MovieCard