import React from 'react'
import { useLocation } from 'react-router-dom'
import Ticket from './Ticket'
// import MovieCard from './MovieCard'

const Tickets = ({ setUser }) => {
  const location = useLocation();
  const { movie } = location.state || {};

  console.log("Tickets component rendered with movie:", movie.tickets);

  function handleDeleteTicket(ticketId) {
    console.log("Deleted ticket ID:", ticketId);
    setUser(prevUser => ({
      ...prevUser,
      tickets: prevUser.tickets.filter(ticket => ticket.id !== ticketId),
    }));
  }

  function handleEditTicket(editedTicket) {
    console.log("Edited ticket:", editedTicket);
    setUser(prevUser => ({
      ...prevUser,
      tickets: prevUser.tickets.map(ticket => 
        ticket.id === editedTicket.id ? editedTicket : ticket
      ),
    }));
  }

  return (
    <div>
      <>
        <h3>Your Tickets for {movie.title}:</h3>
        {movie.tickets && movie.tickets.length > 0 ? (
          <ul>
            {movie.tickets.map(ticket => (
              <Ticket key={ticket.id} ticket={ticket} onEditTicket={handleEditTicket} onDeleteTicket={handleDeleteTicket}/>
            ))}
          </ul>
        ) : (
          <p>No tickets purchased yet.</p>
        )}
      </>      
    </div>
  )
}

export default Tickets