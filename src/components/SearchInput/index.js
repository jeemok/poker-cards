import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isRegular } from '../../utils/misc';

const Input = styled.input`
  border-radius: 4px;
  border: 1px solid #bbb;
  box-sizing: border-box;
  font-size: 18px;
  padding: 10px 8px;
  width: calc(100% - 20px);
  margin: 10px;
`;

const Error = styled.div`
  margin: 0 10px;
  color: red;
  font-family: Arial;
`;

const SearchInput = ({ onChange }) => {
  const [error, setError] = useState();

  const handleChange = value => {
    if (!value || !Number.isInteger(+value) || +value < 0) {
      setError('Input value does not exist or value is invalid');
      onChange();
      return;
    }
    if (!isRegular(+value)) {
      setError('Irregularity occurred');
      onChange();
      return;
    }
    setError();
    onChange(+value);
  };

  return (
    <Fragment>
      <Input type="number" onChange={event => handleChange(event.target.value)} />
      {error && <Error>{error}</Error>}
    </Fragment>
  );
};

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default SearchInput;
