/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLiveQuery } from 'dexie-react-hooks';

import { db } from './db';
import ClearDatabaseButton from './components/ClearDatabaseButton';
import List from './components/List';
import SearchField from './components/SearchField';

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

          await db.movies.bulkPut(
            data.map((d, idx) => ({ ...d, tags: idx === 0 ? ['Tag!'] : [] })),
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    getMovies();
  }, []);

  const moviesList = useLiveQuery(async () => db.movies.toArray());
  const searchedList = useLiveQuery(
    async () => db.movies.where('tags').startsWith(search).distinct().toArray(),
    [search],
  );

  return (
    <div
      css={{
        padding: '24px',
        backgroundColor: '#F3F3F3',
        minHeight: '100vh',
      }}
    >
      <header
        css={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
        }}
      >
        <div>
          <ClearDatabaseButton />
        </div>
        <SearchField
          search={search}
          handleSearch={(e) => setSearch(e.target.value)}
        />
      </header>

      <List data={search ? searchedList : moviesList} />
    </div>
  );
};

export default App;
