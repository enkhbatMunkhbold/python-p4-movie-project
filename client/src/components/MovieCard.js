import { Link } from 'react-router-dom'
import '../styling/movieCard.css'
import Ticket from './Ticket';

const MovieCard = ({ movie, setUser }) => {
  if(!movie) return null

  console.log("movie from MovieCard:", movie);

  function handleMovieClick() {
    movie.tickets.forEach(ticket => {
      <Ticket
        key={ticket.id}
        ticket={ticket}
        setUser={setUser}
        movie={movie}
        user={ticket.user}
      />
    });
  }

  return (
    <Link to={{ pathname: '/tickets',}} 
          state={{ movieId: movie.id, movie: movie }}
          onClick={handleMovieClick}>
      <div className='movie-card'>            
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
    </Link>
  )
}

export default MovieCard