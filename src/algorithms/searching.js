const clone = (arr) => [...arr];

export function linearSearchSteps(input, target) {
  const array = clone(input);
  const steps = [];
  let comparisons = 0;

  for (let i = 0; i < array.length; i += 1) {
    comparisons += 1;
    steps.push({
      array,
      activeIndices: [i],
      line: 1,
      status: `Checking index ${i}`,
      found: false,
      comparisons,
    });

    if (array[i] === target) {
      steps.push({
        array,
        activeIndices: [i],
        line: 2,
        status: `Target found at index ${i}`,
        found: true,
        foundIndex: i,
        comparisons,
      });
      return { steps, stats: { comparisons, foundIndex: i } };
    }
  }

  steps.push({
    array,
    activeIndices: [],
    line: 3,
    status: "Target not found",
    found: false,
    foundIndex: -1,
    comparisons,
  });

  return { steps, stats: { comparisons, foundIndex: -1 } };
}

export function binarySearchSteps(input, target) {
  const array = clone(input).sort((a, b) => a - b);
  const steps = [];
  let left = 0;
  let right = array.length - 1;
  let comparisons = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    comparisons += 1;

    steps.push({
      array,
      activeIndices: [left, mid, right],
      line: 1,
      status: `Check middle index ${mid}`,
      found: false,
      comparisons,
    });

    if (array[mid] === target) {
      steps.push({
        array,
        activeIndices: [mid],
        line: 2,
        status: `Target found at index ${mid}`,
        found: true,
        foundIndex: mid,
        comparisons,
      });
      return { steps, stats: { comparisons, foundIndex: mid }, sortedArray: array };
    }

    if (array[mid] < target) {
      left = mid + 1;
      steps.push({
        array,
        activeIndices: [left, right],
        line: 3,
        status: "Move left bound right",
        found: false,
        comparisons,
      });
    } else {
      right = mid - 1;
      steps.push({
        array,
        activeIndices: [left, right],
        line: 4,
        status: "Move right bound left",
        found: false,
        comparisons,
      });
    }
  }

  steps.push({
    array,
    activeIndices: [],
    line: 5,
    status: "Target not found",
    found: false,
    foundIndex: -1,
    comparisons,
  });

  return { steps, stats: { comparisons, foundIndex: -1 }, sortedArray: array };
}

export const searchingAlgorithms = {
  linear: linearSearchSteps,
  binary: binarySearchSteps,
};