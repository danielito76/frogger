document.addEventListener('DOMContentLoaded', () => {



  const squares = document.querySelectorAll('.grid div')
  let currentFrogIndex = 76
  const width = 9
  // const timeBoard = document.querySelector('.timer')
  // let timeRemaining = +timeBoard.textContent
  // let timerId = null
  const scoreBoard = document.querySelector('.score')
  let score = 0
  let frogEnabled = true

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




  //==========Possible car with increment============
  // function randRange(data) {
  //   var newTime = data[Math.floor(data.length * Math.random())]
  //   return newTime
  // }
  // function toggleCarRandom() {
  //   var timeArray = new Array(1500, 1250, 2000, 3000, 3500, 1500)
    const carAboveTimer = setInterval(moveCarAbove, 500)
    let carAboveIndex = 44
    function moveCarAbove() {
      squares[carAboveIndex].classList.remove('car')
      carAboveIndex += 1
      squares[carAboveIndex].classList.add('car')
      if(carAboveIndex > 53) {
        squares[carAboveIndex].classList.remove('car')
        carAboveIndex = 44
      } else if(squares[currentFrogIndex] === squares[carAboveIndex]) {
        gameOverCars()
      }
    }
  //   clearInterval(timer)
  //   timer = setInterval(toggleCarRandom, randRange(timeArray))
  // }
  //
  // // 1000 = Initial timer when the page is first loaded
  // var timer = setInterval(toggleCarRandom, 1000)
  //==========End of possible car with increment============



  const carBelowTimer = setInterval(moveCarBelow, 300)
  let carBelowIndex = 62
  function moveCarBelow() {
    squares[carBelowIndex].classList.remove('car')
    carBelowIndex -= 1
    squares[carBelowIndex].classList.add('car')
    if(carBelowIndex < 54) {
      squares[carBelowIndex].classList.remove('car')
      carBelowIndex = 63
    } else if(squares[currentFrogIndex] === squares[carBelowIndex]) {
      gameOverCars()
    }
  }







  // Make the frog able to move
  function moveFrog(e) {
    if (frogEnabled) {
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
      } if(squares[currentFrogIndex].classList.contains('lily')) {
        squares[currentFrogIndex].classList.add('lily_frog')
        currentFrogIndex = 76
        score++
        scoreBoard.textContent = score
      } squares[currentFrogIndex].classList.add('frog')
    } if (squares[currentFrogIndex].classList.contains('river')) {
      gameOverTrunks()
    }
  }
  document.addEventListener('keyup', moveFrog)




  // // Make the frog able to move
  // function moveFrog(e) {
  //   if (frogEnabled) {
  //     squares[currentFrogIndex].classList.remove('frog')
  //
  //     switch(e.keyCode) {
  //       case 37:
  //         if(currentFrogIndex % width !== 0) currentFrogIndex -= 1
  //         break
  //       case 38:
  //         if(currentFrogIndex - width >= 0) currentFrogIndex -= width
  //         break
  //       case 39:
  //         if(currentFrogIndex % width < width - 1) currentFrogIndex += 1
  //         break
  //       case 40:
  //         if(currentFrogIndex + width < width * width) currentFrogIndex += width
  //         break
  //     } if(squares[currentFrogIndex].classList.contains('lily')) {
  //       squares[currentFrogIndex].classList.add('lily_frog')
  //       currentFrogIndex = 76
  //       score++
  //       scoreBoard.textContent = score
  //     } if (squares[currentFrogIndex].classList.contains('river')) {
  //       gameOverTrunks()
  //     } document.addEventListener('keyup', moveFrog)
  //   }
  // }










  //=============variables=================================
  // function moveFrogOnUpperTrunk () {
  //   squares[frogOnTrunkIndex].classList.remove('frog')
  //   const frogOnTrunkIndex = currentFrogIndex++
  //   squares[frogOnTrunkIndex].classList.add('frog')
  // }
  // setInterval(moveFrogOnUpperTrunk, 1000)
  //
  // const increment = 1
  // function frogOnTrunkIndex () {
  //   currentFrogIndex + increment
  // }
  // // // setInterval(frogOnTrunkIndex, 1000)
  // console.log(frogOnTrunkIndex)
  // // console.log(currentFrogIndex)
  //=============variables=================================









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
  const upperFrontTrunkTimer = setInterval(moveUpperFrontTrunk, 1500)
  let upperFrontTrunkIndex = 8
  function moveUpperFrontTrunk() {
    squares[upperFrontTrunkIndex].classList.add('river')
    squares[upperFrontTrunkIndex].classList.remove('trunk')
    upperFrontTrunkIndex += 1
    squares[upperFrontTrunkIndex].classList.remove('river')
    squares[upperFrontTrunkIndex].classList.add('trunk')
    if(upperFrontTrunkIndex < 9) {
      squares[upperFrontTrunkIndex].classList.remove('trunk')
      squares[upperFrontTrunkIndex].classList.add('river')
    } else if (upperFrontTrunkIndex > 17) {
      squares[upperFrontTrunkIndex].classList.remove('trunk')
      squares[upperFrontTrunkIndex].classList.add('river')
      upperFrontTrunkIndex = 8
    }
  }

  const upperBackTrunkTimer = setInterval(moveUpperAboveTrunk, 1500)
  let upperBackTrunkIndex = 7
  function moveUpperAboveTrunk() {
    squares[upperBackTrunkIndex].classList.add('river')
    squares[upperBackTrunkIndex].classList.remove('trunk')
    upperBackTrunkIndex += 1
    squares[upperBackTrunkIndex].classList.remove('river')
    squares[upperBackTrunkIndex].classList.add('trunk')
    if(upperBackTrunkIndex < 9) {
      squares[upperBackTrunkIndex].classList.remove('trunk')
      squares[upperBackTrunkIndex].classList.add('river')
    } else if (upperBackTrunkIndex > 17) {
      squares[upperBackTrunkIndex].classList.remove('trunk')
      squares[upperBackTrunkIndex].classList.add('river')
      upperBackTrunkIndex = 8
    }
  }




  // Middle trunk
  const middleFrontTrunkTimer = setInterval(moveMiddleFrontTrunk, 500)
  let middleFrontTrunkIndex = 17
  function moveMiddleFrontTrunk() {
    squares[middleFrontTrunkIndex].classList.add('river')
    squares[middleFrontTrunkIndex].classList.remove('trunk')
    middleFrontTrunkIndex += 1
    squares[middleFrontTrunkIndex].classList.remove('river')
    squares[middleFrontTrunkIndex].classList.add('trunk')
    if(middleFrontTrunkIndex < 18) {
      squares[middleFrontTrunkIndex].classList.remove('trunk')
      squares[middleFrontTrunkIndex].classList.add('river')
    } else if (middleFrontTrunkIndex > 26) {
      squares[middleFrontTrunkIndex].classList.remove('trunk')
      squares[middleFrontTrunkIndex].classList.add('river')
      middleFrontTrunkIndex = 17
    }
  }

  const middleBackTrunkTimer = setInterval(moveMiddleBackTrunk, 500)
  let middleBackTrunkIndex = 16
  function moveMiddleBackTrunk() {
    squares[middleBackTrunkIndex].classList.add('river')
    squares[middleBackTrunkIndex].classList.remove('trunk')
    middleBackTrunkIndex += 1
    squares[middleBackTrunkIndex].classList.remove('river')
    squares[middleBackTrunkIndex].classList.add('trunk')
    if(middleBackTrunkIndex < 18) {
      squares[middleBackTrunkIndex].classList.remove('trunk')
      squares[middleBackTrunkIndex].classList.add('river')
    } else if (middleBackTrunkIndex > 26) {
      squares[middleBackTrunkIndex].classList.remove('trunk')
      squares[middleBackTrunkIndex].classList.add('river')
      middleBackTrunkIndex = 17
    }
  }




  // Lower trunk
  const lowerFrontTrunkTimer = setInterval(moveLowerFrontTrunk, 1000)
  let lowerFrontTrunkIndex = 26
  function moveLowerFrontTrunk() {
    squares[lowerFrontTrunkIndex].classList.add('river')
    squares[lowerFrontTrunkIndex].classList.remove('trunk')
    lowerFrontTrunkIndex += 1
    squares[lowerFrontTrunkIndex].classList.remove('river')
    squares[lowerFrontTrunkIndex].classList.add('trunk')
    if(lowerFrontTrunkIndex < 27) {
      squares[lowerFrontTrunkIndex].classList.remove('trunk')
      squares[lowerFrontTrunkIndex].classList.add('river')
    } if (lowerFrontTrunkIndex > 35) {
      squares[lowerFrontTrunkIndex].classList.remove('trunk')
      squares[lowerFrontTrunkIndex].classList.remove('river')
      lowerFrontTrunkIndex = 26
    }
  }

  const lowerBackTrunkTimer = setInterval(moveLowerBackTrunk, 1000)
  let lowerBackTrunkIndex = 25
  function moveLowerBackTrunk() {
    squares[lowerBackTrunkIndex].classList.add('river')
    squares[lowerBackTrunkIndex].classList.remove('trunk')
    lowerBackTrunkIndex += 1
    squares[lowerBackTrunkIndex].classList.remove('river')
    squares[lowerBackTrunkIndex].classList.add('trunk')
    if(lowerBackTrunkIndex < 27) {
      squares[lowerBackTrunkIndex].classList.remove('trunk')
      squares[lowerBackTrunkIndex].classList.add('river')
    } if (lowerBackTrunkIndex > 35) {
      squares[lowerBackTrunkIndex].classList.remove('trunk')
      squares[lowerBackTrunkIndex].classList.remove('river')
      lowerBackTrunkIndex = 26
    }
  }






  const gameOverCars = function () {
    // create an alpha channel game over
    const gameOverScreen = document.createElement('div')
    gameOverScreen.textContent = 'Game Over'
    gameOverScreen.setAttribute('class', 'gameOver')
    document.body.appendChild(gameOverScreen)
    const fullScreen = document.getElementById('fullScreeen')
    fullScreen.insertBefore(gameOverScreen, fullScreen.childNodes[0])
    // change frog background
    squares[currentFrogIndex].classList.remove('frog')
    squares[currentFrogIndex].classList.add('frog_hit')
    // stop frog
    frogEnabled = false
    //stop timer car below
    clearInterval(carBelowTimer)
    clearInterval(carAboveTimer)
  }

  const gameOverTrunks = function () {
    // create an alpha channel game over
    const gameOverScreen = document.createElement('div')
    gameOverScreen.textContent = 'Game Over'
    gameOverScreen.setAttribute('class', 'gameOver')
    document.body.appendChild(gameOverScreen)
    const fullScreen = document.getElementById('fullScreeen')
    fullScreen.insertBefore(gameOverScreen, fullScreen.childNodes[0])
    // change frog background
    squares[currentFrogIndex].classList.remove('frog')
    squares[currentFrogIndex].classList.add('frog_hit')
    // stop frog
    frogEnabled = false
    //stop timer car below
    clearInterval(upperFrontTrunkTimer)
    clearInterval(upperBackTrunkTimer)
    clearInterval(middleFrontTrunkTimer)
    clearInterval(middleBackTrunkTimer)
    clearInterval(lowerFrontTrunkTimer)
    clearInterval(lowerBackTrunkTimer)
  }








})
