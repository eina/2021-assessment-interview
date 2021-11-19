import { useEffect } from 'react';
import axios from 'axios';
import { useLiveQuery } from 'dexie-react-hooks';

import { db } from './db';
import ClearDatabaseButton from './components/ClearDatabaseButton';

const App = () => {
  useEffect(() => {
    const getMovies = async () => {
      try {
        // only grab data when table has no current data
        const rowCount = await db.movies.count();

        if (!rowCount) {
          const { data } = await axios.get(
            'https://my.api.mockaroo.com/movies.json?key=bf3c1c60',
          );

          await db.movies.bulkPut(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getMovies();
  }, []);

  // todo: add loader
  const moviesList = useLiveQuery(async () => db.movies.toArray());

  return (
    <div className="App">
      <header>
        <h1>Movies</h1>
        <ClearDatabaseButton />
      </header>
      <ul>
        {moviesList?.map((movie) => (
          <li key={movie.id}>
            {movie.name} &mdash; {movie.created_at}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
