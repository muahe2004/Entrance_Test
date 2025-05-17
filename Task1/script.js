function mostFrequentLengthStr(arr) {
  let lengthCount = {};

  for (let i = 0; i < arr.length; i++) {
    const len = arr[i].length;
    lengthCount[len] = (lengthCount[len] || 0) + 1;
  }

  let maxCount = 0;
  let mostFrequentLength = 0;

  for (const len in lengthCount) {
    if (lengthCount[len] > maxCount) {
      maxCount = lengthCount[len];
      mostFrequentLength = Number(len);
    }
  }

  let results = [];

  for (let i=0; i<arr.length; i++) {
    if (arr[i].length === mostFrequentLength) {
        results.push(arr[i]);
    }
  }

  return results;
}

console.log(mostFrequentLengthStr(['a', 'ab', 'abc', 'cd', 'def', 'gh'])); 
console.log(mostFrequentLengthStr(['hello', 'hi', 'hey', 'yo', 'no'])); 
console.log(mostFrequentLengthStr([])); 
console.log(mostFrequentLengthStr(['a', 'b', 'c'])); 
console.log(mostFrequentLengthStr(['ab', 'abc', 'abcd', 'ab', 'abc']));


