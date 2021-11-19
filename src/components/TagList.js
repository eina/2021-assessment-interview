/** @jsxImportSource @emotion/react */
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

import { removeTag } from '../db';
import { ReactComponent as RemoveIcon } from '../assets/x-icon.svg';

const tagItem = css({
  margin: '0 4px',
  backgroundColor: '#4a6fa9',
  color: '#fff',
});

const TagList = ({ tags, movieId }) => {
  if (!tags.length) {
    return null;
  }

  return (
    <ul css={{ listStyle: 'none', paddingLeft: 0, display: 'flex' }}>
      {tags.map((t, idx) => (
        <li key={idx} css={tagItem}>
          {t}
          <button onClick={() => removeTag(movieId, t)}>
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
