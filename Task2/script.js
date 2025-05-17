function sumTwoMax(arr) {
    if (arr.length === 0) {
      return 0;
    }

    if (arr.length === 1) {
      return arr[0];
    }

    let max1 = -Infinity;
    let max2 = -Infinity;

    for (let i=0; i<arr.length; i++) {
        if (arr[i] > max1) {
            max2 = max1;
            max1 = arr[i]
        } else if (arr[i] > max2 && arr[i] !== max1) {
            max2 = arr[i];
        }
    }

    return max1 + max2;
}


const arr1 = [1, 4, 2, 3, 5];
console.log("Test 1:", sumTwoMax(arr1)); 

const arr2 = [10, 20];
console.log("Test 2:", sumTwoMax(arr2)); 

const arr3 = [-1, -5, -3, -9];
console.log("Test 3:", sumTwoMax(arr3)); 

const arr4 = [0, -1, -2, -3];
console.log("Test 4:", sumTwoMax(arr4)); 

const arr5 = [9, 2, 9, 3];
console.log("Test 5:", sumTwoMax(arr5)); 

const arr6 = [];
console.log("Test 6:", sumTwoMax(arr6)); 

const arr7 = [2];
console.log("Test 7:", sumTwoMax(arr7));