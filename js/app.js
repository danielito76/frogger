document.addEventListener('DOMContentLoaded', () => {



  const squares = document.querySelectorAll('.grid div')
  let currentFrogIndex = 76
  const width = 9
  // const timeBoard = document.querySelector('.timer')
  // let timeRemaining = +timeBoard.textContent
  // let timerId = null
  const scoreBoard = document.querySelector('.score')
  let score = 0

  // =========Countdown==================
  // function countdown() {
  //   timeRemaining--
  //   timeBoard.textContent = timeRemaining
  //
  //   if(timeRemaining === 0) {
  //     clearInterval(timerId)
  //   }
  // }
  //
  // timerId = setInterval(countdown, 1000)
  // ========= end of Countdown===============



  //==============first try of two lines of cars==========
  // const squaresCarsAbove = document.querySelectorAll('.squaresCarsAbove')
  // // const squaresCarsBelow = document.querySelectorAll('.squaresCarsBelow')
  // console.log(squaresCarsAbove)
  // function createCarsAbove() {
  // // randomly choose 1 square
  //   const randomCarAboveIndex = Math.floor(Math.random() * squaresCarsAbove.length)
  //   const randomSquareAboveCar = squares[randomCarAboveIndex]

  //   // add the class of car to the squares
  //   randomSquareAboveCar.classList.add('car')
  //
  //   // in 750ms remove the class of car from the sqares
  //   setTimeout(() => randomSquareAboveCar.classList.remove('car'), 750)
  // }
  // // repeat every 3000ms
  // timerId = setInterval(createCarsAbove, 3000)
  //==============end of first try of two lines of cars==========



  let carBelowIndex = 62
  function moveCarBelow() {
    squares[carBelowIndex].classList.remove('car')
    carBelowIndex -= 1
    squares[carBelowIndex].classList.add('car')
    if(carBelowIndex < 54) {
      squares[carBelowIndex].classList.remove('car')
      carBelowIndex = 63
    }
  }
  setInterval(moveCarBelow, 300)




  // let carAboveIndex = 44
  // function moveCarAbove() {
  //   squares[carAboveIndex].classList.remove('car')
  //   carAboveIndex += 1
  //   squares[carAboveIndex].classList.add('car')
  //   if(carAboveIndex > 53) {
  //     squares[carAboveIndex].classList.remove('car')
  //     carAboveIndex = 44
  //   }
  // }
  // setInterval(moveCarAbove, 300)



  // function randRange(data) {
  //   var newTime = data[Math.floor(data.length * Math.random())]
  //   return newTime
  // }
  // function toggleCarRandom() {
  //   var timeArray = new Array(1500, 1250, 2000, 3000, 3500, 1500)

    let carAboveIndex = 44
    function moveCarAbove() {
      squares[carAboveIndex].classList.remove('car')
      carAboveIndex += 1
      squares[carAboveIndex].classList.add('car')
      if(carAboveIndex > 53) {
        squares[carAboveIndex].classList.remove('car')
        carAboveIndex = 44
      }
    }
    setInterval(moveCarAbove, 500)
  //   clearInterval(timer)
  //   timer = setInterval(toggleCarRandom, randRange(timeArray))
  // }
  //
  // // 1000 = Initial timer when the page is first loaded
  // var timer = setInterval(toggleCarRandom, 1000)



  //Make the frog able to move
  function moveFrog(e) {

    squares[currentFrogIndex].classList.remove('frog')

    switch(e.keyCode) {
      case 37:
        if(currentFrogIndex % width !== 0) currentFrogIndex -= 1
        break
      case 38:
        if(currentFrogIndex - width >= 0) currentFrogIndex -= width
        break
      case 39:
        if(currentFrogIndex % width < width - 1) currentFrogIndex += 1
        break
      case 40:
        if(currentFrogIndex + width < width * width) currentFrogIndex += width
        break
    }

    if(squares[currentFrogIndex].classList.contains('lily')) {
      squares[currentFrogIndex].classList.add('lily_frog')
      currentFrogIndex = 76
      score++
      scoreBoard.textContent = score
    }
    squares[currentFrogIndex].classList.add('frog')

  }

  document.addEventListener('keyup', moveFrog)



  //=============Trunk try with array==============
  //
  // let trunk = [1,0]
  // let increment = 1
  //
  //
  // trunk.forEach(trunkHalh => squares[trunkHalh].classList.add('trunk'))
  //
  // setInterval(() => {
  //   const back = trunk.pop()
  //   // const front = back + 1
  //   squares[back].classList.remove('trunk')
  //   trunk.unshift(trunk[0] + increment)
  //   console.log(trunk)
  //   squares[trunk[0]].classList.add('trunk')
  //   // if(front < 18 && back < 17) {
  //   //   squares[front].classList.remove('trunk')
  //   //   carAboveIndex = 44
  //   // }
  // }, 1000)
  //==========end of Trunk try with array============


  // Upper trunk

  let upperFrontTrunkIndex = 8
  function moveUpperfrontTrunk() {
    squares[upperFrontTrunkIndex].classList.remove('trunk')
    upperFrontTrunkIndex += 1
    squares[upperFrontTrunkIndex].classList.add('trunk')
    if(upperFrontTrunkIndex < 9) {
      squares[upperFrontTrunkIndex].classList.remove('trunk')
    } else if (upperFrontTrunkIndex > 17) {
      squares[upperFrontTrunkIndex].classList.remove('trunk')
      upperFrontTrunkIndex = 8
    }
  }
  setInterval(moveUpperfrontTrunk, 1500)

  let upperBackTrunkIndex = 7
  function moveUpperAboveTrunk() {
    squares[upperBackTrunkIndex].classList.add('trunk')
    squares[upperBackTrunkIndex].classList.remove('trunk')
    upperBackTrunkIndex += 1
    squares[upperBackTrunkIndex].classList.add('trunk')
    if(upperBackTrunkIndex < 9) {
      squares[upperBackTrunkIndex].classList.remove('trunk')
    } else if (upperBackTrunkIndex > 17) {
      squares[upperBackTrunkIndex].classList.remove('trunk')
      upperBackTrunkIndex = 8
    }
  }
  setInterval(moveUpperAboveTrunk, 1500)









  // Middle trunk

  let middleFrontTrunkIndex = 17
  function moveMiddlefrontTrunk() {
    squares[middleFrontTrunkIndex].classList.remove('trunk')
    middleFrontTrunkIndex += 1
    squares[middleFrontTrunkIndex].classList.add('trunk')
    if(middleFrontTrunkIndex < 18) {
      squares[middleFrontTrunkIndex].classList.remove('trunk')
    } else if (middleFrontTrunkIndex > 26) {
      squares[middleFrontTrunkIndex].classList.remove('trunk')
      middleFrontTrunkIndex = 17
    }
  }
  setInterval(moveMiddlefrontTrunk, 500)

  let middleBackTrunkIndex = 16
  function moveMiddleAboveTrunk() {
    squares[middleBackTrunkIndex].classList.add('trunk')
    squares[middleBackTrunkIndex].classList.remove('trunk')
    middleBackTrunkIndex += 1
    squares[middleBackTrunkIndex].classList.add('trunk')
    if(middleBackTrunkIndex < 18) {
      squares[middleBackTrunkIndex].classList.remove('trunk')
    } else if (middleBackTrunkIndex > 26) {
      squares[middleBackTrunkIndex].classList.remove('trunk')
      middleBackTrunkIndex = 17
    }
  }
  setInterval(moveMiddleAboveTrunk, 500)



  // Lower trunk

  let lowerFrontTrunkIndex = 26
  function moveLowerFrontTrunk() {
    squares[lowerFrontTrunkIndex].classList.remove('trunk')
    lowerFrontTrunkIndex += 1
    squares[lowerFrontTrunkIndex].classList.add('trunk')
    if(lowerFrontTrunkIndex < 27) {
      squares[lowerFrontTrunkIndex].classList.remove('trunk')
    } else if (lowerFrontTrunkIndex > 35) {
      squares[lowerFrontTrunkIndex].classList.remove('trunk')
      lowerFrontTrunkIndex = 26
    }
  }
  setInterval(moveLowerFrontTrunk, 1000)

  let lowerBackTrunkIndex = 25
  function moveLowerBackTrunk() {
    squares[lowerBackTrunkIndex].classList.remove('trunk')
    lowerBackTrunkIndex += 1
    squares[lowerBackTrunkIndex].classList.add('trunk')
    if(lowerBackTrunkIndex < 27) {
      squares[lowerBackTrunkIndex].classList.remove('trunk')
    } else if (lowerBackTrunkIndex > 35) {
      squares[lowerBackTrunkIndex].classList.remove('trunk')
      lowerBackTrunkIndex = 26
    }
  }
  setInterval(moveLowerBackTrunk, 1000)















})
