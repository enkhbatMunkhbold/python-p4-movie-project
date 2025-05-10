import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import Ticket from './Ticket'

const Tickets = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentMovie, setCurrentMovie] = useState(location.state?.movie);

  if (!currentMovie) {
    navigate('/');
    return null;
  }

  function handleDeleteTicket(ticketId) {
    // Update user state
    setUser(prevUser => {
      const updatedUser = {
        ...prevUser,
        tickets: prevUser.tickets.filter(ticket => ticket.id !== ticketId),
      };
      return updatedUser;
    });

    // Update movie state
    setCurrentMovie(prevMovie => ({
      ...prevMovie,
      tickets: prevMovie.tickets.filter(ticket => ticket.id !== ticketId)
    }));
  }

  function handleEditSave(editedTicket) {
    // Ensure the edited ticket has the movie data
    const ticketWithMovie = {
      ...editedTicket,
      movie: currentMovie
    };

    // Update user state
    setUser(prevUser => {
      const updatedTickets = prevUser.tickets.map(ticket => 
        ticket.id === editedTicket.id ? ticketWithMovie : ticket
      );
      return {
        ...prevUser,
        tickets: updatedTickets
      };
    });

    // Update movie state
    setCurrentMovie(prevMovie => ({
      ...prevMovie,
      tickets: prevMovie.tickets.map(ticket => 
        ticket.id === editedTicket.id ? ticketWithMovie : ticket
      )
    }));
  }

  function renderTickets() {
    if (!currentMovie.tickets) return null;
    
    const userTickets = currentMovie.tickets.filter(ticket => ticket.user_id === user.id);
    return userTickets.map(ticket => (
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
      <h3>Your Tickets for {currentMovie.title}:</h3>
      {currentMovie.tickets && currentMovie.tickets.length > 0 ? (
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