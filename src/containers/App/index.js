import React, { Children, Fragment, useState } from 'react';
import Header from '../../components/Header';
import SearchInput from '../../components/SearchInput';
import ResultRow from '../../components/Result/Row';
import { getResult } from '../../utils/misc';

export default () => {
  const [result, setResult] = useState([]);

  const handleChange = value => {
    setResult(getResult(value));
  };

  return (
    <Fragment>
      <Header />
      <SearchInput onChange={handleChange} />
      {Children.toArray(result.map(cards => <ResultRow cards={cards} />))}
    </Fragment>
  );
};
