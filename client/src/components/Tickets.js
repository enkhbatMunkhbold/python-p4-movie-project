import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import Ticket from './Ticket'

const Tickets = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const { movie } = location.state || {}; // Destructure movie from location.state
  const navigate = useNavigate();
  const [currentMovie, setCurrentMovie] = useState(location.state?.movie);

  if (!currentMovie) {
    navigate('/');
    return null;
  }

  const currentMovieTickets = user.tickets.filter(ticket => {
    return ticket.movie.id === movie.id
  });

  function handleDeleteTicket(ticketId) {
    setUser(prevUser => {
      const updatedUser = {
        ...prevUser,
        tickets: prevUser.tickets.filter(ticket => ticket.id !== ticketId),
      };
      return updatedUser;
    });
  
    setCurrentMovie(prevMovie => ({
      ...prevMovie,
      tickets: prevMovie.tickets.filter(ticket => ticket.id !== ticketId)
    }));
  }

  function handleEditSave(editedTicket) {  
    const ticketWithMovie = {
      ...editedTicket,
      movie: currentMovie
    };

    setCurrentMovie(prevMovie => ({
      ...prevMovie,
      tickets: prevMovie.tickets.map(ticket => 
        ticket.id === editedTicket.id ? ticketWithMovie : ticket
      )
    }));
  
    setUser(prevUser => {
      const updatedTickets = prevUser.tickets.map(ticket => 
        ticket.id === editedTicket.id ? editedTicket : ticket
      );
      return {
        ...prevUser,
        tickets: updatedTickets
      };
    });
    
  }

  function renderTickets() {      
    return currentMovieTickets.map(ticket => (
      <Ticket 
        key={ticket.id} 
        ticket={ticket} 
        onEditSave={handleEditSave} 
        onDeleteTicket={handleDeleteTicket}
      />
    ));
  }

  return (
    <div className="tickets-container">
      <h3>Your Tickets for {movie.title}:</h3>
      {movie.tickets && movie.tickets.length > 0 ? (
        <ul className="tickets-list">
          {renderTickets()}
        </ul>
      ) : (
        <p>No tickets purchased yet.</p>
      )}
    </div>
  )
}

export default Tickets