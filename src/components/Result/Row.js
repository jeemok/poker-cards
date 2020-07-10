import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Person } from '@styled-icons/open-iconic';
import { Spades, Diamonds, Heart, Clubs } from '@styled-icons/icomoon';

const SEPARATOR = '-';
const TYPES = {
  S: { Element: Spades, color: 'black' },
  D: { Element: Diamonds, color: 'red' },
  H: { Element: Heart, color: 'red' },
  C: { Element: Clubs, color: 'black' },
};

const Container = styled.div`
  padding: 5px 15px;
  margin: 10px;
  font-family: Arial;
  font-size: 12px;
`;
const MiniCard = styled.div`
  position: relative;
  display: inline-block;
  box-shadow: 0 2px 5px grey;
  border-radius: 5px;
  margin: 5px 5px 5px 0;
  padding: 5px;
  min-width: 30px;
  min-height: 50px;
`;
const CardNumber = styled.span`
  position: absolute;
  top: 15px;
  left: 5px;
  font-size: 35px;
`;
const TypeIcon = styled.span`
  position: absolute;
  top: 0;
  left: 2px;
  margin-left: 1px;
  vertical-align: top;
`;

const Row = ({ cards }) => (
  <Container>
    <Person size={20} style={{ verticalAlign: 'top' }} />
    <div>
      {Children.toArray(
        cards.filter(Boolean).map(each => {
          const [type, number] = each.split(SEPARATOR);
          const { Element, color } = TYPES[type];
          return (
            <MiniCard>
              <CardNumber>{number}</CardNumber>
              <TypeIcon>
                <Element size={10} color={color} />
              </TypeIcon>
            </MiniCard>
          );
        })
      )}
    </div>
    <div>Output: {cards.join(', ')}</div>
    <div>Size: {cards.filter(Boolean).length}</div>
  </Container>
);

Row.propTypes = {
  cards: PropTypes.array,
};

export default Row;
