import React from 'react'
import Ticket from './Ticket'


const UserProfile = ({ user, setUser }) => {
  if (!user) return <div>Loading...</div>;


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

  function renderUserMovies() {
    const uniqueMovies = new Map();
    user.tickets.forEach(ticket => {
      if (ticket.movie && !uniqueMovies.has(ticket.movie.id)) {
        uniqueMovies.set(ticket.movie.id, ticket.movie);
      }
    });
    
    return Array.from(uniqueMovies.values()).map(movie => (
      <li key={movie.id}>
        <h3>{movie.title}</h3>
        <p>Genre: {movie.genre}</p>
        <p>Price: ${movie.price.toFixed(2)}</p>
      </li>
    ));
  }

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <div className="user-profile">
        <h3>Your Movies:</h3>
        {user.tickets && user.tickets.length > 0 ? (
          <ul>
            {renderUserMovies()}
          </ul>
        ) : (
          <p>No movies purchased yet.</p>
        )}
        <h3>Your Tickets:</h3>
        {user.tickets && user.tickets.length > 0 ? (
          <ul>
            {user.tickets.map(ticket => (
              <Ticket key={ticket.id} ticket={ticket} onEditTicket={handleEditTicket} onDeleteTicket={handleDeleteTicket}/>
            ))}
          </ul>
        ) : (
          <p>No tickets purchased yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile