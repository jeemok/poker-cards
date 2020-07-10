import shuffle from 'lodash/shuffle';
import chunk from 'lodash/chunk';
import flatten from 'lodash/flatten';

// Spade = S, Heart = H, Diamond = D, Club = C
const CARD_TYPES = ['S', 'H', 'D', 'C'];
const CARD_RANGES = ['A', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'X', 'Q', 'K'];
const SEPARATOR = '-';

// Check if the card size is able to distribute properly to the given people size
export function isRegular(numOfPeople) {
  const cardSize = getCards().length;
  // If the number of people is bigger than the card size, we will distribute it properly
  if (numOfPeople >= cardSize) {
    return true;
  }
  // Otherwise check if it can be equally distribute
  return Number.isInteger(cardSize / numOfPeople);
}

// Get the list of cards as an array
export function getCards() {
  // Get stacks by types
  const cards = CARD_TYPES.map(type => CARD_RANGES.map(step => `${type}${SEPARATOR}${step}`));
  // Flatten to be single level array
  const flattenCards = flatten(cards);
  // Shuffle it before return
  return shuffle(flattenCards);
}

// Receive the total size of people, and return an array of each person's share as an array
// NOTE: This function assume that the input is pre-processed / pre-validated by the function `isRegular`.
//       To extend this function to handle irregularity distribution, the method is written in README.md
export function getResult(size) {
  // Input validation
  if (!Number.isInteger(size) || size <= 0) {
    return [];
  }

  const cards = getCards();

  // If it is more than the card range, no distribution is needed, just extend the array size
  if (size > cards.length) {
    return Array.from(Array(size)).map((_, index) => [cards[index]]);
  }

  // Each person's share of cards
  const totalCardPerPerson = cards.length / size;

  // Split it accordingly
  return chunk(cards, totalCardPerPerson);
}
