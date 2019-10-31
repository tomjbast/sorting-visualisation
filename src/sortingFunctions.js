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

  return array
}


async function selectSort(arrayToSort, iterationCallback){
  const array = [...arrayToSort]

  for (let i=0; i<array.length-1; i++){
    let isSmallest = array[i]
    let smallestPos = 0

    for (let a = i+1; a < array.length; a++) {
      if (array[a] < isSmallest) {
        isSmallest = array[a]
        smallestPos = a
      }
    }

    if (smallestPos === 0) {
      iterationCallback(array)
      await delay()
    } else {
      array.splice(smallestPos,1) // removes one element at index smallestPos
      array.splice(i,0,isSmallest) // inserts at index i
      iterationCallback(array)
      await delay()
    }

  }

  return array
}


module.exports = {
  selectSort,
  bubbleSort
}

function delay() {
  return new Promise(function (resolve, reject) {

    setTimeout(() => {
      resolve()
    }, 250)

  })
}
