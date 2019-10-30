const numbers = [2,4,7,2,3,0,8,2,4,7,2,2,1,89,22,67,14,90,01,45,73,32,22,33]

function bubbleSort(arrayToSort) {

  const array = [...arrayToSort]

  for (let i = 0; i < array.length - 1; i++) {

    for (let i = 0; i < array.length - 1; i++) {
      const currVal = array[i]
      const nextVal = array[i + 1]

      if (array[i] > array[i + 1]) {
        array.splice(i, 1, nextVal) // replaces one element at index 1
        array.splice(i + 1, 1, currVal)
      }

    }
  }

  return array
}


console.log(bubbleSort(numbers))
