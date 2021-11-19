import { useState } from 'react';
import PropTypes from 'prop-types';

import { db } from '../db';

const AddTagField = ({ movieId, tagLimit }) => {
  const [tags, setTags] = useState({});

  const addTag = async (id, tag) => {
    try {
      await db.movies
        .where('id')
        .equals(id)
        .modify((x) => {
          x.tags.push(tag);
          setTags({ ...tag, [id]: null });
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <label>
        Add tag
        <input
          type="text"
          name={`tag-${movieId}`}
          value={tags[movieId] || ''}
          placeholder="Placeholder"
          onChange={(e) =>
            setTags({
              ...tags,
              [movieId]: e.target.value,
            })
          }
          disabled={tagLimit}
        />
      </label>
      <button
        onClick={() => addTag(movieId, tags[movieId])}
        disabled={tagLimit}
      >
        Add Tag
      </button>
    </>
  );
};

AddTagField.propTypes = {
  movieId: PropTypes.number,
  tagLimit: PropTypes.bool,
};

export default AddTagField;
