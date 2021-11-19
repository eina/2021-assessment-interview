import { useEffect } from 'react';
import axios from 'axios';
import { useLiveQuery } from 'dexie-react-hooks';

import { db } from './db';
import ClearDatabaseButton from './components/ClearDatabaseButton';
import AddTagField from './components/AddTagField';
import TagList from './components/TagList';

const List = ({ data }) => {
  return (
    <ul>
      {data?.map((item) => (
        <li key={item.id}>
          {item.name} &mdash; {item.created_at}
          <TagList tags={item.tags} movieId={item.id} />
          <AddTagField movieId={item.id} tagLimit={item.tags.length === 5} />
        </li>
      ))}
    </ul>
  );
};

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

  return (
    <div className="App">
      <header>
        <h1>Movies</h1>
        <ClearDatabaseButton />
      </header>
      <List data={moviesList || []} />
    </div>
  );
};

export default App;
