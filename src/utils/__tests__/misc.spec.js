import isEqual from 'lodash/isEqual';
import { isRegular, getCards, getResult } from '../misc';

describe('[utils] Misc', () => {
  describe('#isRegular', () => {
    it('should be able to tell if it it can be distribute evenly', () => {
      // Sunny day
      expect(isRegular(1)).toBeTruthy();
      expect(isRegular(2)).toBeTruthy();
      expect(isRegular(4)).toBeTruthy();
      expect(isRegular(52)).toBeTruthy();
      // Rainny day
      expect(isRegular(0)).toBeFalsy();
      expect(isRegular(3)).toBeFalsy();
      expect(isRegular(5)).toBeFalsy();
      expect(isRegular(6)).toBeFalsy();
      expect(isRegular(7)).toBeFalsy();
      expect(isRegular(8)).toBeFalsy();
      expect(isRegular(51)).toBeFalsy();
      // Exceeded card size should be truthy
      expect(isRegular(53)).toBeTruthy();
      expect(isRegular(54)).toBeTruthy();
    });

    it('should return true for size exceeding total card size', () => {
      expect(isRegular(53)).toBeTruthy();
      expect(isRegular(54)).toBeTruthy();
    });
  });

  describe('#getCards', () => {
    it('should be able to get 52 cards', () => {
      expect(getCards()).toHaveLength(52);
    });

    it('should be able to get full list of cards randomly', () => {
      const firstStacks = getCards();
      const secondStacks = getCards();
      expect(isEqual(firstStacks, secondStacks)).toEqual(false);
    });
  });

  describe('#getResult', () => {
    it('should be able to distribute evenly when possible', () => {
      const numOfPeople = 4;
      const stacks = getResult(numOfPeople);
      expect(stacks).toHaveLength(numOfPeople);
      expect(stacks[0]).toHaveLength(13); // first person
      expect(stacks[1]).toHaveLength(13); // second person
      expect(stacks[2]).toHaveLength(13); // third person
      expect(stacks[3]).toHaveLength(13); // fourth person
    });

    it('should be able to handle the remaining when not evenly distributed', () => {
      const numOfPeople = 3;
      const stacks = getResult(numOfPeople);
      expect(stacks).toHaveLength(numOfPeople);
      expect(stacks[0]).toHaveLength(18); // first person
      expect(stacks[1]).toHaveLength(17); // second person
      expect(stacks[2]).toHaveLength(17); // third person
    });

    it('should be able to handle both string and integer type number', () => {
      expect(getResult(4)).toHaveLength(4);
      expect(getResult('4')).toHaveLength(4);
      expect(getResult(5)).toHaveLength(5);
      expect(getResult(' 5')).toHaveLength(5);
    });

    it('should only accept whole number', () => {
      expect(getResult(4.4)).toHaveLength(0);
    });

    it('should be able to handle exception without crashing', () => {
      expect(getResult(NaN)).toHaveLength(0);
      expect(getResult()).toHaveLength(0);
      expect(getResult(0)).toHaveLength(0);
      expect(getResult(-1)).toHaveLength(0);
      expect(getResult('abc')).toHaveLength(0);
      expect(getResult([])).toHaveLength(0);
      expect(getResult(true)).toHaveLength(0);
      expect(getResult(false)).toHaveLength(0);
    });

    it('should be able to distribute to more than the card size', () => {
      const cardSize = getCards().length;
      const numOfPeople = cardSize + 10;
      expect(getResult(numOfPeople)).toHaveLength(numOfPeople);
    });
  });
});
