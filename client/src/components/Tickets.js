import { useLocation, useNavigate } from 'react-router-dom'
import Ticket from './Ticket'

const Tickets = ({ user, setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie } = location.state || {};

  if (!movie) {
    navigate('/');
    return null;
  }

  function handleDeleteTicket(ticketId) {
    setUser(prevUser => ({
      ...prevUser,
      tickets: prevUser.tickets.filter(ticket => ticket.id !== ticketId),
    }));
  }

  function handleEditSave(editedTicket) {
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
    if (!movie.tickets) return null;
    
    const userTickets = movie.tickets.filter(ticket => ticket.user_id === user.id);
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