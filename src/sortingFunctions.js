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

async function selectSort(arrayToSort, iterationCallback){
  const array = [...arrayToSort]

  for (let i=0; i<array.length-1; i++){
    let isSmallest = array[i]
    let smallestPos

    for (let a = i+1; a < array.length; a++) {
      if (array[a] < isSmallest) {
        isSmallest = array[a]
        smallestPos = a
      }
    }

    if (!smallestPos) {
      iterationCallback(array)
    } else {
      array.splice(smallestPos,1) // removes one element at index smallestPos
      array.splice(i,0,isSmallest) // inserts at index i
      iterationCallback(array)
      await delay()
    }

  }
}
//eslint-disable-next-line
async function quickSorting(arrayToSort, iterationCallback){
  const array = [...arrayToSort]
  const middleElement = (Math.round(arrayToSort.length/2))- 1
  let piv = array[middleElement]

  let leftIndex
  let rightIndex

  // while BOTH right index and leftIndex are true (i.e not undefined) run the loops below.
  // As soon as there is not a bigger to the right OR smaller value to the left of pivot this while breaks

  while (leftIndex && rightIndex) {

    for (let i = 0; i < middleElement; i++) { // when this finds a number bigger on the left stop, note its index
      if (array[i] > piv) {
        leftIndex = i
        break
      }
    }

    for (let i = array.length - 1; i > middleElement; i--) { // when this finds a number bigger on the left stop, note its index
      if (array[i] < piv) {
        rightIndex = i
        break
      }
    }

    console.log("preswitch",array, piv, leftIndex, rightIndex)
    swapValues(leftIndex,rightIndex,array) // this is mutating array variable
    console.log("postswitch",array)

  }



  return iterationCallback(array)

}

function swapValues(indexOne, indexTwo, array){
  console.log("in swap")
  const tempStore = array[indexOne]

  array[indexOne] = array[indexTwo]
  array[indexTwo] = tempStore

  return array
}

//eslint-disable-next-line
function quickSort2(arrayToSort, iterationCallback){

  const array = [...arrayToSort]
  const middleElement = (Math.round(arrayToSort.length/2))- 1
  let piv = array[middleElement]
  let i = 0
  let j = array.length - 1

  console.log(array,piv)

  while(array[i] !== piv){
     console.log(middleElement,piv)
    // move array[i] to right of pivot and do not increment i
    if (array[i] > piv){
      console.log("array value is bigger, lets cut and move", array[i],piv,middleElement+1)
      array.splice(i,1) // removes one item at index i
      array.splice(middleElement+1,0,array[i]) // inserts the bigger value at index of pivot + 1
      console.log("this is what the array looks like now", array)
      iterationCallback(array)
    } else {
      i++
    }
  }

  while(array[j] !== piv){
    console.log(middleElement,piv)

    // move array[j] to left of pivot and do not decrease j
    if (array[j] < piv){
      const arrayValue = array[j]
      //console.log("array value is smaller, lets cut and move", array[j],piv,middleElement-1)
      array.splice(j,1) // removes one item at index j
      array.splice(middleElement-1,0,arrayValue) // inserts the smaller value at index of pivot - 1
     // console.log("this is what the array looks like now", array)
      iterationCallback(array)
    } else {
      j--
    }
  }

}

async function quickSort(arrayToSort, iterationCallback){
  const array = [...arrayToSort]
  const middleElement = (Math.round(arrayToSort.length/2))- 1
  let piv = array[middleElement]

  let i = 0
  let j = array.length -1

  let leftIndexToSwap
  let rightIndexToSwap

  while(i <= j){
    console.log(i, array[i],j,array[j], piv)

    if(array[i]>piv){
      leftIndexToSwap = i
    } else {
      i++
    }

    if (array[j]<piv){
      rightIndexToSwap = j
    } else {
      j--
    }

    if (leftIndexToSwap !== undefined && rightIndexToSwap){
      swapValues(leftIndexToSwap, rightIndexToSwap, array)
      iterationCallback(array)
      await delay()
      leftIndexToSwap = undefined
      rightIndexToSwap = undefined
      i++
      j--
    }

  }
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
    }, 3000)

  })
}
