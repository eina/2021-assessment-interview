import PropTypes from 'prop-types';
import { ReactComponent as RemoveIcon } from '../assets/x-icon.svg';

import { removeTag } from '../db';

const TagList = ({ tags, movieId }) => {
  if (!tags.length) {
    return null;
  }

  return (
    <ul>
      {tags.map((t, idx) => (
        <li key={idx}>
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
