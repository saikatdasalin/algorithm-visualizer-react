const snapshot = (array) => [...array];

const buildResult = (steps, comparisons, swaps) => ({
  steps,
  stats: { comparisons, swaps },
});

function createStep(steps, array, status, line, activeIndices = [], comparisons = 0, swaps = 0) {
  steps.push({
    array: snapshot(array),
    status,
    line,
    activeIndices,
    comparisons,
    swaps,
  });
}

export function bubbleSortSteps(input) {
  const array = snapshot(input);
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < array.length - 1; i += 1) {
    createStep(steps, array, `Pass ${i + 1} started`, 0, [i], comparisons, swaps);
    for (let j = 0; j < array.length - i - 1; j += 1) {
      comparisons += 1;
      createStep(steps, array, `Comparing index ${j} and ${j + 1}`, 1, [j, j + 1], comparisons, swaps);
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swaps += 1;
        createStep(steps, array, `Swapped ${j} with ${j + 1}`, 2, [j, j + 1], comparisons, swaps);
      }
    }
  }

  createStep(steps, array, "Array sorted", 3, [], comparisons, swaps);
  return buildResult(steps, comparisons, swaps);
}

export function selectionSortSteps(input) {
  const array = snapshot(input);
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < array.length; i += 1) {
    let minIndex = i;
    createStep(steps, array, `Selecting min from index ${i}`, 0, [i], comparisons, swaps);

    for (let j = i + 1; j < array.length; j += 1) {
      comparisons += 1;
      createStep(steps, array, `Comparing min index ${minIndex} with ${j}`, 1, [minIndex, j], comparisons, swaps);
      if (array[j] < array[minIndex]) {
        minIndex = j;
        createStep(steps, array, `New min found at index ${minIndex}`, 2, [minIndex], comparisons, swaps);
      }
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      swaps += 1;
      createStep(steps, array, `Swapped ${i} with min index ${minIndex}`, 3, [i, minIndex], comparisons, swaps);
    }
  }

  createStep(steps, array, "Array sorted", 4, [], comparisons, swaps);
  return buildResult(steps, comparisons, swaps);
}

export function insertionSortSteps(input) {
  const array = snapshot(input);
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  for (let i = 1; i < array.length; i += 1) {
    const key = array[i];
    let j = i - 1;
    createStep(steps, array, `Insert element at index ${i}`, 0, [i], comparisons, swaps);

    while (j >= 0) {
      comparisons += 1;
      createStep(steps, array, `Compare key with index ${j}`, 1, [j, j + 1], comparisons, swaps);
      if (array[j] > key) {
        array[j + 1] = array[j];
        swaps += 1;
        createStep(steps, array, `Shift index ${j} to ${j + 1}`, 2, [j, j + 1], comparisons, swaps);
        j -= 1;
      } else {
        break;
      }
    }
    array[j + 1] = key;
    createStep(steps, array, `Placed key at index ${j + 1}`, 3, [j + 1], comparisons, swaps);
  }

  createStep(steps, array, "Array sorted", 4, [], comparisons, swaps);
  return buildResult(steps, comparisons, swaps);
}

export function mergeSortSteps(input) {
  const array = snapshot(input);
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  const merge = (left, mid, right) => {
    const leftArr = array.slice(left, mid + 1);
    const rightArr = array.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    createStep(steps, array, `Merging [${left},${mid}] and [${mid + 1},${right}]`, 1, [left, right], comparisons, swaps);

    while (i < leftArr.length && j < rightArr.length) {
      comparisons += 1;
      createStep(steps, array, `Compare left ${leftArr[i]} and right ${rightArr[j]}`, 2, [k], comparisons, swaps);
      if (leftArr[i] <= rightArr[j]) {
        array[k] = leftArr[i];
        i += 1;
      } else {
        array[k] = rightArr[j];
        j += 1;
      }
      swaps += 1;
      createStep(steps, array, `Write at index ${k}`, 3, [k], comparisons, swaps);
      k += 1;
    }

    while (i < leftArr.length) {
      array[k] = leftArr[i];
      i += 1;
      swaps += 1;
      createStep(steps, array, `Drain left at index ${k}`, 4, [k], comparisons, swaps);
      k += 1;
    }

    while (j < rightArr.length) {
      array[k] = rightArr[j];
      j += 1;
      swaps += 1;
      createStep(steps, array, `Drain right at index ${k}`, 5, [k], comparisons, swaps);
      k += 1;
    }
  };

  const sort = (left, right) => {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    createStep(steps, array, `Split ${left}-${right}`, 0, [left, mid, right], comparisons, swaps);
    sort(left, mid);
    sort(mid + 1, right);
    merge(left, mid, right);
  };

  sort(0, array.length - 1);
  createStep(steps, array, "Array sorted", 6, [], comparisons, swaps);

  return buildResult(steps, comparisons, swaps);
}

export function quickSortSteps(input) {
  const array = snapshot(input);
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  const partition = (low, high) => {
    const pivot = array[high];
    let i = low - 1;
    createStep(steps, array, `Pivot = ${pivot} at ${high}`, 1, [high], comparisons, swaps);

    for (let j = low; j <= high - 1; j += 1) {
      comparisons += 1;
      createStep(steps, array, `Compare index ${j} with pivot`, 2, [j, high], comparisons, swaps);
      if (array[j] <= pivot) {
        i += 1;
        [array[i], array[j]] = [array[j], array[i]];
        swaps += 1;
        createStep(steps, array, `Move ${j} into left partition`, 3, [i, j], comparisons, swaps);
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    swaps += 1;
    createStep(steps, array, `Place pivot at ${i + 1}`, 4, [i + 1, high], comparisons, swaps);

    return i + 1;
  };

  const sort = (low, high) => {
    if (low < high) {
      createStep(steps, array, `Sort range ${low}-${high}`, 0, [low, high], comparisons, swaps);
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    }
  };

  sort(0, array.length - 1);
  createStep(steps, array, "Array sorted", 5, [], comparisons, swaps);

  return buildResult(steps, comparisons, swaps);
}

export function heapSortSteps(input) {
  const array = snapshot(input);
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  const heapify = (n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      comparisons += 1;
      createStep(steps, array, `Compare left child ${left} with ${largest}`, 1, [left, largest], comparisons, swaps);
      if (array[left] > array[largest]) largest = left;
    }

    if (right < n) {
      comparisons += 1;
      createStep(steps, array, `Compare right child ${right} with ${largest}`, 2, [right, largest], comparisons, swaps);
      if (array[right] > array[largest]) largest = right;
    }

    if (largest !== i) {
      [array[i], array[largest]] = [array[largest], array[i]];
      swaps += 1;
      createStep(steps, array, `Swap ${i} with ${largest}`, 3, [i, largest], comparisons, swaps);
      heapify(n, largest);
    }
  };

  const n = array.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i -= 1) {
    createStep(steps, array, `Heapify at ${i}`, 0, [i], comparisons, swaps);
    heapify(n, i);
  }

  for (let i = n - 1; i > 0; i -= 1) {
    [array[0], array[i]] = [array[i], array[0]];
    swaps += 1;
    createStep(steps, array, `Extract max to index ${i}`, 4, [0, i], comparisons, swaps);
    heapify(i, 0);
  }

  createStep(steps, array, "Array sorted", 5, [], comparisons, swaps);

  return buildResult(steps, comparisons, swaps);
}

export const sortingAlgorithms = {
  bubble: bubbleSortSteps,
  selection: selectionSortSteps,
  insertion: insertionSortSteps,
  merge: mergeSortSteps,
  quick: quickSortSteps,
  heap: heapSortSteps,
};