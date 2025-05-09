import { useLocation } from 'react-router-dom'
import Ticket from './Ticket'

const Tickets = ({ user, setUser }) => {
  const location = useLocation();
  const { movie } = location.state || {};

  function handleDeleteTicket(ticketId) {
    setUser(prevUser => ({
      ...prevUser,
      tickets: prevUser.tickets.filter(ticket => ticket.id !== ticketId),
    }));
  }

  function handleEditSave(editedTicket) {
    console.log("editedTicket from Tickets:", editedTicket);
    setUser(prevUser => ({
      ...prevUser,
      tickets: prevUser.tickets.map(ticket => 
        ticket.id === editedTicket.id ? editedTicket : ticket
      ),
    }));
  }

  function renderTickets() {
    const userTickets = movie.tickets.filter(ticket => ticket.user_id === user.id);
    return userTickets.map(ticket => (
      <Ticket key={ticket.id} ticket={ticket} onEditSave={handleEditSave} onDeleteTicket={handleDeleteTicket}/>
    ));
  }

  return (
    <div>
      <>
        <h3>Your Tickets for {movie.title}:</h3>
        {movie.tickets && movie.tickets.length > 0 ? (
          <ul>
            {renderTickets()}
          </ul>
        ) : (
          <p>No tickets purchased yet.</p>
        )}
      </>      
    </div>
  )
}

export default Tickets