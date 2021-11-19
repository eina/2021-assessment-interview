/** @jsxImportSource @emotion/react */
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

import { ReactComponent as SearchIcon } from '../assets/search-icon.svg';

const inputField = css({
  width: '100%',
  padding: '1em',
  paddingLeft: 'calc(1em + 24px)',
  marginRight: 10,
  color: '#3c3e3d',
});

const searchIcon = css({
  position: 'absolute',
  top: '0.75em',
  left: 12,
  width: 18,
  color: '#889295',
});

const SearchField = ({ search, handleSearch }) => {
  return (
    <div css={{ position: 'relative' }}>
      <SearchIcon css={searchIcon} />
      <input
        type="search"
        placeholder="Search Tags"
        aria-label="Search through tags"
        value={search}
        onChange={handleSearch}
        css={inputField}
      />
    </div>
  );
};

SearchField.propTypes = {
  search: PropTypes.string,
  handleSearch: PropTypes.func,
};

export default SearchField;
