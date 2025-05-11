import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import MovieCard from './MovieCard';

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const [userMovies, setUserMovies] = useState([]); 

  useEffect(() => {
    fetch("/movies")
    .then(r => r.json())
    .then(movies => {
      const filteredMovies = movies.map(movie => {
        const movieTickets = user.tickets.filter(ticket => {
          return ticket.movie.id === movie.id
        });
               
        if (movieTickets.length > 0) {
          return {
            ...movie,
            tickets: movieTickets
          };
        }
        return null;             
      })
      setUserMovies(filteredMovies);
    })
    .catch(error => {
      console.error("Error fetching movies:", error);
      setUserMovies([]);
    });
  }, [user]);

   if (!user) return <div>Loading...</div>;

  function renderUserMovies() {
    const uniqueMovies = new Map();
    userMovies.forEach(movie => {
      if (movie && !uniqueMovies.has(movie.id)) {
        uniqueMovies.set(movie.id, movie);
      }
    });

    return Array.from(uniqueMovies.values()).map(movie => (
      <MovieCard key={movie.id} movie={movie} />
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

export default UserProfile;