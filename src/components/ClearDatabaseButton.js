import { db } from '../db';

// taken from Dexie's example: https://stackblitz.com/edit/dexie-todo-list?file=models%2Fdb.ts
const ClearDatabaseButton = () => {
  const handleClear = () => {
    db.transaction('rw', db.tables, async () => {
      await Promise.all(db.tables.map((table) => table.clear()));
    });
  };

  return <button onClick={handleClear}>Clear database</button>;
};

export default ClearDatabaseButton;
