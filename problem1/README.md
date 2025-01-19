# Task
Provide 3 unique implementations of the following function in JavaScript.

**Input**: `n` - any integer

*Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

**Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

# Answer

### Work boundary
* number needs to be integer
* maxValue = Number.MAX_SAFE_INTEGER
* minValue = 0

## Solution 1
Upon a quick look up for the pattern on the internet, we can basically create a mathematical formula for this `n*(n+1)/2`. 

Time Complexity: O(1)

Space Complexity: O(1)

## Solution 2
Normal iterative loop. This approach is the most common and intuitive in terms of reading & understanding.

Time Complexity: O(n)

Space Complexity: O(1)

## Solution 3
Recursive loop. This approach is using recursive, although sometimes it's not very ideal with the stack size exceed error on bigger number

Time Complexity: O(n)

Space Complexity: O(1)
