import { Link } from 'react-router-dom'
import '../styling/movieCard.css'
import Ticket from './Ticket';

const MovieCard = ({ movie, setUser }) => {
  if(!movie) return null

  console.log("movie from MovieCard:", movie); 

  function handleDeleteTicket(ticketId) {
    setUser(prevUser => ({
      ...prevUser,
      tickets: prevUser.tickets.filter(ticket => ticket.id !== ticketId),
    }));
  }

  function handleEditTicket(editedTicket) {
    console.log("editedTicket from Tickets:", editedTicket);
    setUser(prevUser => ({
      ...prevUser,
      tickets: prevUser.tickets.map(ticket => 
        ticket.id === editedTicket.id ? editedTicket : ticket
      ),
    }));
  }

  function handleMovieClick() {
    movie.tickets.forEach(ticket => {
      <Ticket
        key={ticket.id}
        ticket={ticket}
        onEditTicket={handleEditTicket}
        onDeleteTicket={handleDeleteTicket}
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