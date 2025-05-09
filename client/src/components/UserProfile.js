import MovieCard from './MovieCard'


const UserProfile = ({ user, setUser }) => {

  if (!user) return <div>Loading...</div>;  

  console.log("user from UserProfile:", user);
  
  function renderUserMovies() {
    const uniqueMovies = new Map();

    user.tickets.forEach(ticket => {
      if (ticket.movie && !uniqueMovies.has(ticket.movie.id)) {
        uniqueMovies.set(ticket.movie.id, ticket.movie);
      }
    });
    
    return Array.from(uniqueMovies.values()).map(movie => (
      <MovieCard key={movie.id} movie={movie} setUser={setUser}/>
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
          <p>No movie to watch yet.</p>
        )}        
      </div>
    </div>
  );
};

export default UserProfile