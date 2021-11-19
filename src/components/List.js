/** @jsxImportSource @emotion/react */
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import TagList from './TagList';
import AddTagField from './AddTagField';

const list = css({
  listStyle: 'none',
  paddingLeft: 0,
});

const listItem = css({
  marginBottom: '1em',
  padding: '1em',
  borderRadius: 5,
  backgroundColor: '#e8e8e8',
  color: '#3c3e3d',
  display: 'grid',
  alignItems: 'center',
  '@media (min-width: 807px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  '@media (min-width: 1060px)': {
    gridTemplateColumns: '2fr 2fr 1fr',
  },
});

const tagGrid = css({
  '@media (min-width: 807px) and (max-width: 1060px)': {
    gridColumn: 1,
    gridRow: 2,
  },
  '@media (min-width: 1060px)': {
    justifySelf: 'end',
  },
});

const fieldGrid = css({
  '@media (min-width: 807px) and (max-width: 1060px)': {
    gridColumn: 3,
    gridRow: 2,
  },
  '@media (min-width: 807px)': {
    justifySelf: 'end',
  },
});

const List = ({ data = [] }) => {
  return (
    <ul css={list}>
      {data?.map((item) => (
        <li key={item.id} css={listItem}>
          <div>
            <p>{item.name}</p>
            <p>{item.created_at}</p>
          </div>

          <div css={tagGrid}>
            <TagList tags={item.tags} movieId={item.id} />
          </div>

          <div css={fieldGrid}>
            <AddTagField movieId={item.id} tagLimit={item.tags.length === 5} />
          </div>
        </li>
      ))}
    </ul>
  );
};

List.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      created_at: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
};

export default List;
