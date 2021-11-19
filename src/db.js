import Dexie from 'dexie';

export const db = new Dexie('tagsdb');

// only indexing necessary keys
db.version(1).stores({
  movies: '++id, *tags',
});

export const removeTag = async (id, tag) => {
  try {
    await db.movies
      .where('id')
      .equals(id)
      .modify((x) => {
        x.tags = x.tags.filter((y) => y !== tag);
      });
  } catch (error) {
    console.error(error);
  }
};
