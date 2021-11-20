/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

import { db } from '../db';

const inputField = css({
  width: '100%',
  padding: '1em',
  marginRight: 10,
  color: '#3c3e3d',
});

const addButton = css({
  width: 170,
  padding: '1em',
  border: 'none',
  borderRadius: 5,
  backgroundColor: '#2c6765',
  fontWeight: 600,
  color: '#fff',
  cursor: 'pointer',
  '&:hover, &:focus, &:active': {
    backgroundColor: 'rgba(44, 103, 101, 0.9)',
  },
  '&:disabled': {
    backgroundColor: '#888',
  },
});

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
    <div css={{ display: 'flex' }}>
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
        aria-label="Add tag"
        css={inputField}
      />
      <button
        onClick={() => addTag(movieId, tags[movieId])}
        disabled={tagLimit}
        css={addButton}
      >
        Add Tag
      </button>
    </div>
  );
};

AddTagField.propTypes = {
  movieId: PropTypes.number,
  tagLimit: PropTypes.bool,
};

export default AddTagField;
