// define min & max Value
const minValue = 0;
const maxValue = Number.MAX_SAFE_INTEGER;

const validCondition = (n) => Number.isInteger(n) && n > minValue && n <= maxValue;

/**
 * First solution, using mathematical formula, has O(1) time and space complexity,
 * @param n
 * @returns {number}
 */
const sum_to_n_a = (n) => {
  // early return if it doesn't fit the condition
  if (!validCondition(n)) {
    throw new Error('invalid input');
  }

  return (n * (n + 1)) / 2;
};

/**
 * Second solution, using normal for loop, has O(n) time complexity, O(1) space complexity
 * @param n
 * @returns {number}
 */
const sum_to_n_b = (n) => {
  if (!validCondition(n)) {
    throw new Error('invalid input');
  }

  let result = 0;
  for (let i = 1; i <= n; i++) {
    result += i;
  }

  return result;
};

/**
 * Third solution, using recursive with tail, has O(n) time complexity, O(1) space complexity
 * Recursive options sometimes not very ideal because we might reach maximum call stack error on bigger number, in my test case, number above 10k produce this error
 * @param n
 * @returns {number}
 */
const sum_to_n_c = (n) => {
  if (!validCondition(n)) {
    throw new Error('invalid input');
  }

  const recursiveSumWithTail = (num, acc = 0) => {
    if (num <= minValue) {
      return acc
    }

    return recursiveSumWithTail(num-1, acc + num);
  }

  return recursiveSumWithTail(n)
};

/** test case to make sure each solution produce the same results */
const testCase = (numArr) => {
    numArr.forEach(n => {
    const suma = sum_to_n_a(n)
    const sumb = sum_to_n_b(n)
    const sumc = sum_to_n_c(n)

    if (suma === sumb && sumb === sumc) {
      console.log('pass')
    } else {
      console.log('fail at num: ', n)
    }
  })
}

testCase([1, 100, 1000, 5000]);
