# Poker Cards

A simple poker/trump cards distribution app. Cloned from React's sample project [Emoji Search](https://github.com/ahfarmer/emoji-search) as the base.

This poker card app has a few characteristics:

- Input validation are done in `components/SearchInput` on change event.
- `getResult` function is meant to handle evenly distribute size only. The input should be pre-validated using `isRegular` function and handle separately by the component render logic. To extend the function to handle irregularity, add this code at the end of the function:

```javascript
const chunks = chunk(cards, totalCardPerPerson);
// If it can be equally distributed, separate by chunk
if (chunks.length === size) {
  return chunks;
}
// Flatten the remaining cards into one array
const remaining = flatten(chunks.splice(size));
// Distribute the remaining cards
return chunks.map((each, index) => each.concat(remaining[index]).filter(Boolean));
```

- Functions are stored in `utils/` folder for separation of concerns + easier unit testing and reusability.

## Installation

Start the setup by installing all the required dependencies. Do this by running:

> Note that you need to have Node + NPM installed.

```bash
npm install
```

## Start the application

```bash
npm start
```

## Running tests

```bash
npm run test
```
