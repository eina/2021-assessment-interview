/** @jsxImportSource @emotion/react */
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

import { removeTag } from '../db';
import { ReactComponent as RemoveIcon } from '../assets/x-icon.svg';

const tagItem = css({
  display: 'flex',
  // flex: '0 0 100%',
  margin: '0 4px',
  padding: '4px 12px 4px 10px',
  borderRadius: 25,
  backgroundColor: '#4a6fa9',
  color: '#fff',
  fontWeight: 600,
});

const removeButton = css({
  border: 'none',
  background: 'none',
  padding: 2,
  marginBottom: -3,
  marginLeft: 6,
  cursor: 'pointer',
  color: '#fff',
});

const TagList = ({ tags, movieId }) => {
  if (!tags.length) {
    return null;
  }

  return (
    <ul
      css={{
        listStyle: 'none',
        paddingLeft: 0,
        display: 'flex',
        alignContent: 'center',
      }}
    >
      {tags.map((t, idx) => (
        <li key={idx} css={tagItem}>
          {t}
          <button onClick={() => removeTag(movieId, t)} css={removeButton}>
            <RemoveIcon />
          </button>
        </li>
      ))}
    </ul>
  );
};

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  movieId: PropTypes.number,
};

export default TagList;
