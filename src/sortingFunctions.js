const numbers = [2,4,7,2,3,0,8,2,4,7,34,56,7,21,0,2,78,44567,32,1,234,554,22,43]

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

function selectSort(arrayToSort){
  const array = [...arrayToSort]
  const arrangedArray = []

  while (array.length) {
    let isSmallest = array[0]

    for (let i = 0; i < array.length; i++) {
      if (array[i] < isSmallest) {
        isSmallest = array[i]
      }
    }

    const indexOfSmallest = array.indexOf(isSmallest)
    array.splice(indexOfSmallest,1)
    arrangedArray.push(isSmallest)
  }

  return arrangedArray
}

console.log(selectSort(numbers))

module.exports = {
  selectSort,
  bubbleSort
}
