async function bubbleSort(arrayToSort, iterationCallback) {

  const array = [...arrayToSort]

  for (let i = 0; i < array.length - 1; i++) {

    for (let i = 0; i < array.length - 1; i++) {
      const currVal = array[i]
      const nextVal = array[i + 1]

      if (array[i] > array[i + 1]) {
        array.splice(i, 1, nextVal)
        array.splice(i + 1, 1, currVal)
        iterationCallback(array) // we use this callback so we retain context and update state for each array item change
        await delay() // this allows the users to see whats going on, also has a nice side effect of giving setState time to resolve
      }

    }
  }

}

async function selectSort(arrayToSort, iterationCallback) {
  const array = [...arrayToSort]

  for (let i = 0; i < array.length - 1; i++) {
    let isSmallest = array[i]
    let smallestPos

    for (let a = i + 1; a < array.length; a++) {
      if (array[a] < isSmallest) {
        isSmallest = array[a]
        smallestPos = a
      }
    }

    if (!smallestPos) {
      iterationCallback(array)
    } else {
      array.splice(smallestPos, 1) // removes one element at index smallestPos
      array.splice(i, 0, isSmallest) // inserts at index i
      iterationCallback(array)
      await delay()
    }

  }
}

async function quickSort(array, iterationCallback){

  const swap = async (leftIndex, rightIndex) => {

    if (leftIndex === rightIndex) {
      return
    }

    const holdVal = array[leftIndex]
    array[leftIndex] = array[rightIndex]
    array[rightIndex] = holdVal
    iterationCallback(array)
    await delay()
  }

  const doQuickSort = async (leftIndex, rightIndex) => {

    const subArrayLength = rightIndex - leftIndex

    if (subArrayLength < 2){
      return
    }
    const pivotIndex = leftIndex + Math.round(subArrayLength/2)
    const pivot = array[pivotIndex]

    await swap(leftIndex, pivotIndex)

    // start a loop at array[1] move less than pivot value to left
    // then swap highest low value with pivot

    let highSwapCandidate = leftIndex+1

    for (let i = leftIndex+1; i< rightIndex; i++){

      if (array[i] < pivot){
        await swap(i, highSwapCandidate)
        highSwapCandidate++
      }
    }

    await swap(leftIndex, highSwapCandidate-1)

    // this makes it perform multiple quicksorts at a time and just looks super cool! 
    await Promise.all([
       doQuickSort(leftIndex, highSwapCandidate-1),
       doQuickSort(highSwapCandidate, rightIndex)
    ])



  }

  await doQuickSort(0,array.length) // first call on main array

}


module.exports = {
  selectSort,
  bubbleSort,
  quickSort
}

function delay() {
  return new Promise(function (resolve, reject) {

    setTimeout(() => {
      resolve()
    }, 100)

  })
}
