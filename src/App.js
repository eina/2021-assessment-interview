/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLiveQuery } from 'dexie-react-hooks';

import { db } from './db';
import ClearDatabaseButton from './components/ClearDatabaseButton';
import List from './components/List';

const App = () => {
  const [search, setSearch] = useState('');
  useEffect(() => {
    const getMovies = async () => {
      try {
        // only grab data when table has no current data
        const rowCount = await db.movies.count();

        if (!rowCount) {
          const { data } = await axios.get(
            'https://my.api.mockaroo.com/movies.json?key=bf3c1c60',
          );

          await db.movies.bulkPut(data.map((d) => ({ ...d, tags: [] })));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getMovies();
  }, []);

  // todo: add loader
  const moviesList = useLiveQuery(async () => db.movies.toArray());
  const searchedList = useLiveQuery(
    async () => db.movies.where('tags').startsWith(search).distinct().toArray(),
    [search],
  );

  return (
    <div css={{ fontFamily: 'sans-serif' }}>
      <header>
        <h1>Movies</h1>
        <ClearDatabaseButton />
      </header>
      <label>
        Search Tags
        <input
          type="search"
          placeholder="Search Tags"
          aria-label="Search through tags"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
      <List data={search ? searchedList : moviesList} />
    </div>
  );
};

export default App;
