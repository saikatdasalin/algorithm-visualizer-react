export const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateRandomArray = (size = 24, min = 10, max = 99) =>
  Array.from({ length: size }, () => randomInt(min, max));

export const generateSortedArray = (size = 20, min = 5, max = 99) =>
  generateRandomArray(size, min, max).sort((a, b) => a - b);