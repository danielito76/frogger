document.addEventListener('DOMContentLoaded', () => {



  const squares = document.querySelectorAll('.grid div')
  let currentFrogIndex = 76
  const width = 9
  const timeBoard = document.querySelector('.timer')
  let timeRemaining = +timeBoard.textContent
  let timerId = null
  const scoreBoard = document.querySelector('.score')
  let score = 0
  let frogEnabled = false
  const audioButton = document.querySelector('#stopAllAudios')







  //=================SOUNDS=================================================
  //creating background sound
  const backgroundSound = document.createElement('AUDIO')
  backgroundSound.loop = true
  backgroundSound.src = 'sounds/background.wav'

  const playBackgroundSound = document.getElementById('backgroundSound')

  playBackgroundSound.addEventListener('click', () => {
    if(backgroundSound.paused) {
      backgroundSound.play()
    } else {
      backgroundSound.pause()
      backgroundSound.currentTime = 0
    }
  })


  //creating frog call
  const frogCall = document.createElement('AUDIO')
  frogCall.src = 'sounds/frogonce.wav'

  //creating bud luck sound
  const badLuck = document.createElement('AUDIO')
  badLuck.src = 'sounds/badluck.wav'

  //creating victory sound
  const youWinSound = document.createElement('AUDIO')
  youWinSound.src = 'sounds/youwin.mp3'

  //creating horn sound
  const horn = document.createElement('AUDIO')
  horn.src = 'sounds/car_horn.wav'

  //creating second horn sound
  const secondHorn = document.createElement('AUDIO')
  secondHorn.src = 'sounds/second_horn.wav'

  //creating Start sound
  const startSound = document.createElement('AUDIO')
  startSound.src = 'sounds/start.wav'

  //creating frog on the pad sound
  const frogOnThePad = document.createElement('AUDIO')
  frogOnThePad.src = 'sounds/got_the_pad.wav'

  const allAudio = [frogCall, badLuck, youWinSound, horn, secondHorn]


  // ======try stop all sounds=======================
  // let i
  audioButton.addEventListener('click', () => {
    allAudio.forEach(audio => audio.pause())
  })





  // =========Countdown==================
  function countdown() {
    timeRemaining--
    timeBoard.textContent = timeRemaining

    if(timeRemaining === 0) {
      clearInterval(timerId)
    }
  }

  timerId = setInterval(countdown, 1000)
  // ========= end of Countdown===============






  //================FROG================================================

  // Make the frog able to move
  function moveFrog(e) {
    if (frogEnabled === true) {
      squares[currentFrogIndex].classList.remove('frog')
      // const el = document.getElementById('firstFrog')
      // el.remove()
      // document.getElementById('firstFrog').classList.remove('firstFrog')

      switch(e.keyCode) {
        case 37:
          if(currentFrogIndex % width !== 0) currentFrogIndex -= 1
          frogCall.play()
          break
        case 38:
          if(currentFrogIndex - width >= 0) currentFrogIndex -= width
          frogCall.play()
          break
        case 39:
          if(currentFrogIndex % width < width - 1) currentFrogIndex += 1
          frogCall.play()
          break
        case 40:
          if(currentFrogIndex + width < width * width) currentFrogIndex += width
          frogCall.play()
          break
      }if (currentFrogIndex > 45 && currentFrogIndex < 62 && carAboveIndex > 45) {
        horn.play()
        secondHorn.play()
      }if (currentFrogIndex > 45 && currentFrogIndex < 62 && carBelowIndex < 62) {
        secondHorn.play()
      }
      if(squares[currentFrogIndex].classList.contains('lily')) {
        frogOnThePad.play()
        squares[currentFrogIndex].classList.add('lily_frog')
        currentFrogIndex = 76
        score++
        scoreBoard.textContent = score
      } squares[currentFrogIndex].classList.add('frog')
    // } if (squares[currentFrogIndex].classList.contains('river')) {
    //   gameOverTrunks()
    } if (squares[1, 3, 5, 7].classList.contains('lily_frog')) {
      youWin()
    }
  }

  document.addEventListener('keyup', moveFrog)










  //=====================CARS===================================================

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
  //==============end of first try of two lines of cars========

  //==========Possible car with increment============
  // function randRange(data) {
  //   var newTime = data[Math.floor(data.length * Math.random())]
  //   return newTime
  // }
  // function toggleCarRandom() {
  //   var timeArray = new Array(1500, 1250, 2000, 3000, 3500, 1500)
  let carAboveTimer = setInterval(moveCarAbove, 500)
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



  let carBelowTimer = setInterval(moveCarBelow, 300)
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







  //=====================TRUNKS===================================================


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
  const upperFrontTrunkTimer = setInterval(moveUpperFrontTrunk, 2000)
  let upperFrontTrunkIndex = 8
  function moveUpperFrontTrunk() {
    if (squares[upperFrontTrunkIndex].classList.contains('frog')) {
      squares[currentFrogIndex].classList.remove('frog')
      currentFrogIndex +=1
      squares[currentFrogIndex].classList.add('frog')
      if (currentFrogIndex === 18) {
        gameOverTrunks()
      }
    }
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

  const upperBackTrunkTimer = setInterval(moveUpperAboveTrunk, 2000)
  let upperBackTrunkIndex = 7
  function moveUpperAboveTrunk() {
    if (squares[upperBackTrunkIndex].classList.contains('frog')) {
      squares[currentFrogIndex].classList.remove('frog')
      currentFrogIndex +=1
      squares[currentFrogIndex].classList.add('frog')
      if (currentFrogIndex === 18) {
        gameOverTrunks()
      }
    }
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
  const middleFrontTrunkTimer = setInterval(moveMiddleFrontTrunk, 1000)
  let middleFrontTrunkIndex = 17
  function moveMiddleFrontTrunk() {
    if (squares[middleFrontTrunkIndex].classList.contains('frog')) {
      squares[currentFrogIndex].classList.remove('frog')
      currentFrogIndex +=1
      squares[currentFrogIndex].classList.add('frog')
      if (currentFrogIndex === 27) {
        gameOverTrunks()
      }
    }
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

  const middleBackTrunkTimer = setInterval(moveMiddleBackTrunk, 1000)
  let middleBackTrunkIndex = 16
  function moveMiddleBackTrunk() {
    if (squares[middleBackTrunkIndex].classList.contains('frog')) {
      squares[currentFrogIndex].classList.remove('frog')
      currentFrogIndex +=1
      squares[currentFrogIndex].classList.add('frog')
      if (currentFrogIndex === 27) {
        gameOverTrunks()
      }
    }
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
  const lowerFrontTrunkTimer = setInterval(moveLowerFrontTrunk, 500)
  let lowerFrontTrunkIndex = 26
  function moveLowerFrontTrunk() {
    if (squares[lowerFrontTrunkIndex].classList.contains('frog')) {
      squares[currentFrogIndex].classList.remove('frog')
      currentFrogIndex +=1
      squares[currentFrogIndex].classList.add('frog')
      if (currentFrogIndex === 36) {
        gameOverTrunks()
      }
    }
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

  const lowerBackTrunkTimer = setInterval(moveLowerBackTrunk, 500)
  let lowerBackTrunkIndex = 25
  function moveLowerBackTrunk() {
    if (squares[lowerBackTrunkIndex].classList.contains('frog')) {
      squares[currentFrogIndex].classList.remove('frog')
      currentFrogIndex +=1
      squares[currentFrogIndex].classList.add('frog')
      if (currentFrogIndex === 36) {
        gameOverTrunks()
      }
    }
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



  //=====================GAMEOVERandYOUWIN======================================


  const gameOverCars = function () {
    // create an alpha channel game over
    const gameOverScreen = document.createElement('div')
    badLuck.play()
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
    badLuck.play()
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



  const youWin = function () {
    // create an alpha channel game over
    const youWinScreen = document.createElement('div')
    youWinSound.play()
    youWinScreen.textContent = 'You Win, dude!'
    youWinScreen.setAttribute('class', 'youWin')
    document.body.appendChild(youWinScreen)
    const fullScreen = document.getElementById('fullScreeen')
    fullScreen.insertBefore(youWinScreen, fullScreen.childNodes[0])
    // change frog background
    squares[currentFrogIndex].classList.remove('frog')
    // stop frog
    frogEnabled = false
    //stop timer countdown
    clearInterval(timerId)
    //stop timer trunks
    clearInterval(upperFrontTrunkTimer)
    clearInterval(upperBackTrunkTimer)
    clearInterval(middleFrontTrunkTimer)
    clearInterval(middleBackTrunkTimer)
    clearInterval(lowerFrontTrunkTimer)
    clearInterval(lowerBackTrunkTimer)
    //stop timer cars
    clearInterval(carBelowTimer)
    clearInterval(carAboveTimer)
  }

  // =============Reset function =======================================================

  //
  // function resetEverything () {
  //   squares[currentFrogIndex].classList.remove('frog')
  //   clearInterval(upperFrontTrunkTimer)
  //   clearInterval(upperBackTrunkTimer)
  //   clearInterval(middleFrontTrunkTimer)
  //   clearInterval(middleBackTrunkTimer)
  //   clearInterval(lowerFrontTrunkTimer)
  //   clearInterval(lowerBackTrunkTimer)
  //   clearInterval(carBelowTimer)
  //   clearInterval(carAboveTimer)
  //   clearInterval(timerId)
  //   currentFrogIndex = 76
  //   timeRemaining = 60
  //   score = 0
  //   frogEnabled = true
  //   squares[currentFrogIndex].classList.add('frog')
  //   // carAboveIndex = 44
  //   // carBelowIndex = 62
  //   // upperFrontTrunkIndex = 8
  //   // upperBackTrunkIndex = 7
  //   // middleFrontTrunkIndex = 17
  //   // middleBackTrunkIndex = 16
  //   // lowerFrontTrunkIndex = 26
  //   // lowerBackTrunkIndex = 25
  //   timeBoard.textContent = timeRemaining
  //   scoreBoard.textContent = score
  // }
  // document.getElementById('reset').addEventListener('click', resetEverything)
  //
  //
  // function start(){
  //   clearInterval(timerId)
  //   timerId = setInterval(countdown, 1000)
  //   clearInterval(carAboveTimer)
  //   carAboveTimer = setInterval(moveCarAbove, 500)
  //   clearInterval(carBelowTimer)
  //   carBelowTimer = setInterval(moveCarBelow, 300)
  // }
  // document.getElementById('btStart').addEventListener('click', start)






  function resetEverything () {
    clearInterval(upperFrontTrunkTimer)
    clearInterval(upperBackTrunkTimer)
    clearInterval(middleFrontTrunkTimer)
    clearInterval(middleBackTrunkTimer)
    clearInterval(lowerFrontTrunkTimer)
    clearInterval(lowerBackTrunkTimer)
    clearInterval(carBelowTimer)
    clearInterval(carAboveTimer)
    clearInterval(timerId)
    squares[currentFrogIndex].classList.remove('frog')
    squares[carBelowIndex].classList.remove('car')
    squares[carAboveIndex].classList.remove('car')
    squares[upperFrontTrunkIndex].classList.remove('trunk')
    squares[upperBackTrunkIndex].classList.remove('trunk')
    squares[middleFrontTrunkIndex].classList.remove('trunk')
    squares[middleBackTrunkIndex].classList.remove('trunk')
    squares[lowerFrontTrunkIndex].classList.remove('trunk')
    squares[lowerBackTrunkIndex].classList.remove('trunk')
    currentFrogIndex = 76
    timeRemaining = 60
    score = 0
    carAboveIndex = 44
    carBelowIndex = 62
    upperFrontTrunkIndex = 8
    upperBackTrunkIndex = 7
    middleFrontTrunkIndex = 17
    middleBackTrunkIndex = 16
    lowerFrontTrunkIndex = 26
    lowerBackTrunkIndex = 25
    squares[currentFrogIndex].classList.add('frog')
    squares[carBelowIndex].classList.add('car')
    squares[carAboveIndex].classList.add('car')
    squares[upperFrontTrunkIndex].classList.add('trunk')
    squares[upperBackTrunkIndex].classList.add('trunk')
    squares[middleFrontTrunkIndex].classList.add('trunk')
    squares[middleBackTrunkIndex].classList.add('trunk')
    squares[lowerFrontTrunkIndex].classList.add('trunk')
    squares[lowerBackTrunkIndex].classList.add('trunk')
    timeBoard.textContent = timeRemaining
    scoreBoard.textContent = score
    frogEnabled = false
  }
  document.getElementById('reset').addEventListener('click', resetEverything)


  function start(){
    startSound.play()
    frogEnabled = true
    clearInterval(timerId)
    timerId = setInterval(countdown, 1000)
    clearInterval(carAboveTimer)
    carAboveTimer = setInterval(moveCarAbove, 500)
    clearInterval(carBelowTimer)
    carBelowTimer = setInterval(moveCarBelow, 300)
  }
  document.getElementById('btStart').addEventListener('click', start)

















})
