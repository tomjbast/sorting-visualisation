export async function bubbleSort(arrayToSort, iterationCallback) {

  const array = [...arrayToSort]
  for (let i = 0; i < array.length - 1; i++) {
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        if (!(await swap(i,i+1,array,iterationCallback))){
          return
        }
      }
    }
  }

}

export async function selectSort(arrayToSort, iterationCallback) {
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
      await delay()
      if(!(iterationCallback(array))){
        return
      }
      //await delay()
    }

  }
}

export async function insertionSort(arrayToSort,iterationCallback){ //arrayToSort, iterationCallback
  const array = [...arrayToSort]

  for (let i = 1; i<array.length; i++){
    if (array[i] < array[i-1]){
      for(let j=i-1;j>=0;j--){
        if(array[j] > array[j+1]){
          if(!(await swap(j,j+1,array,iterationCallback))){
            return
          }
        } else {
          break
        }
      }
    }
  }
}

export async function quickSort(arrayToSort, iterationCallback){
  const array = [...arrayToSort]

  const doQuickSort = async (leftIndex, rightIndex) => {

    const subArrayLength = rightIndex - leftIndex

    if (subArrayLength < 2){
      return
    }
    const pivotIndex = leftIndex + Math.round(subArrayLength/2)
    const pivot = array[pivotIndex]

    //await swap(leftIndex, pivotIndex, array, iterationCallback)

    if (!(await swap(leftIndex,pivotIndex,array,iterationCallback))){
      return
    }

    // start a loop at array[1] move less than pivot value to left
    // then swap highest low value with pivot

    let highSwapCandidate = leftIndex+1

    for (let i = leftIndex+1; i< rightIndex; i++){

      if (array[i] < pivot){
        if (!(await swap(i, highSwapCandidate,array,iterationCallback))){
          debugger
          return
        }
        //await swap(i, highSwapCandidate, array, iterationCallback)
        highSwapCandidate++
      }
    }

    await swap(leftIndex, highSwapCandidate-1,array,iterationCallback)

    // this makes it perform multiple quicksorts on each partition at a time and looks super cool!
    await Promise.all([
       doQuickSort(leftIndex, highSwapCandidate-1),
       doQuickSort(highSwapCandidate, rightIndex)
    ])

  }

  await doQuickSort(0,array.length) // first call on main array

}

function delay() {
  return new Promise(function (resolve, reject) {

    setTimeout(() => {
      resolve()
    }, 100)

  })
}

export async function swap(leftIndex, rightIndex, array, iterationCallback){

  if (leftIndex !== rightIndex) {
    const holdVal = array[leftIndex]
    array[leftIndex] = array[rightIndex]
    array[rightIndex] = holdVal
    await delay()
  }

  return iterationCallback(array)

}

export default {
  selectSort,
  bubbleSort,
  quickSort,
  insertionSort
}
