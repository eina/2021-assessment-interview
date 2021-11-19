import Dexie from 'dexie';

export const db = new Dexie('tagsdb');

// only indexing necessary keys
db.version(1).stores({
  movies: '++id, *tags',
});
