document.addEventListener('DOMContentLoaded', () => {




  //=================== VARIABLES=========================================
  const squares = document.querySelectorAll('.grid div')
  let currentFrogIndex = 76
  const width = 9
  const timeBoard = document.querySelector('.timer')
  let timeRemaining = +timeBoard.textContent
  let timerId = null
  const scoreBoard = document.querySelector('.score')
  let score = 0
  let frogEnabled = false
  const gameOver = document.querySelector('.gameOver')
  const youWinScreen = document.querySelector('.youWin')
  const frogFly = document.querySelector('.test')

  //SOUNDS
  // const audioButton = document.querySelector('#stopAllAudios')
  const backgroundSound = document.createElement('AUDIO')
  backgroundSound.loop = true
  backgroundSound.src = 'sounds/background.wav'

  const roosterSound = document.createElement('AUDIO')
  roosterSound.src = 'sounds/rooster.wav'

  const playBackgroundSound = document.getElementById('backgroundSound')
  const playRoosterSound = document.getElementById('backgroundSound')
  const playFrogEats = document.getElementById('frogEats')

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

  //creating frog eating sound
  const frogEats = document.createElement('AUDIO')
  frogEats.loop = true
  frogEats.src = 'sounds/frog_eats.mp3'

  //Cars
  let carAboveTimer = setInterval(moveCarAbove, 500)
  let carAboveIndex = 44

  let carBelowTimer = setInterval(moveCarBelow, 300)
  let carBelowIndex = 62

  //LOGS


  let upperFrontTrunkTimer = setInterval(moveUpperFrontTrunk, 2000)
  let upperFrontTrunkIndex = 8
  let upperBackTrunkTimer = setInterval(moveUpperAboveTrunk, 2000)
  let upperBackTrunkIndex = 7

  let middleFrontTrunkTimer = setInterval(moveMiddleFrontTrunk, 1000)
  let middleFrontTrunkIndex = 17
  let middleBackTrunkTimer = setInterval(moveMiddleBackTrunk, 1000)
  let middleBackTrunkIndex = 16

  let lowerFrontTrunkTimer = setInterval(moveLowerFrontTrunk, 500)
  let lowerFrontTrunkIndex = 26
  let lowerBackTrunkTimer = setInterval(moveLowerBackTrunk, 500)
  let lowerBackTrunkIndex = 25




  //======================FUNCTIONS=========================================

  //Sounds

  playBackgroundSound.addEventListener('click', () => {
    if(backgroundSound.paused) {
      backgroundSound.play()
    } else {
      backgroundSound.pause()
      backgroundSound.currentTime = 0
    }
  })

  playRoosterSound.addEventListener('click', () => {
    if(roosterSound.paused) {
      roosterSound.play()
    } else {
      roosterSound.pause()
      roosterSound.currentTime = 0
    }
  })

  playFrogEats.addEventListener('click', () => {
    if(frogEats.paused) {
      frogEats.play()
    } else {
      frogEats.pause()
      frogEats.currentTime = 0
    }
  })





  // =========Countdown==================
  function countdown() {
    timeRemaining--
    timeBoard.textContent = timeRemaining

    if(timeRemaining === 0) {
      clearInterval(timerId)
      gameOverModal()
    }
  }
  const startRestart = document.getElementById('btStart')
  startRestart.addEventListener('click', () => {
    if(timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      timerId = setInterval(countdown, 1000)
    }
  })




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
      } if (squares[currentFrogIndex].classList.contains('lily_frog')) {
        gameOverModal()
      } if (squares[currentFrogIndex].classList.contains('river')) {
        gameOverModal()
      } if (squares[1].classList.contains('lily_frog') && squares[3].classList.contains('lily_frog') && squares[5].classList.contains('lily_frog') && squares[7].classList.contains('lily_frog')) {
        youWin()
      }
      if(squares[currentFrogIndex].classList.contains('lily')) {
        frogOnThePad.play()
        squares[currentFrogIndex].classList.add('lily_frog')
        currentFrogIndex = 76
        score++
        scoreBoard.textContent = score
      }
      squares[currentFrogIndex].classList.add('frog')
    }
  }


  //Cars

  //==========Possible car with increment============
  // function randRange(data) {
  //   var newTime = data[Math.floor(data.length * Math.random())]
  //   return newTime
  // }
  // function toggleCarRandom() {
  //   var timeArray = new Array(1500, 1250, 2000, 3000, 3500, 1500)

  function moveCarAbove() {
    squares[carAboveIndex].classList.remove('cartoright')
    carAboveIndex += 1
    squares[carAboveIndex].classList.add('cartoright')
    if(carAboveIndex > 53) {
      squares[carAboveIndex].classList.remove('cartoright')
      carAboveIndex = 44
    } else if(squares[currentFrogIndex] === squares[carAboveIndex]) {
      gameOverModal()
    }
  }
  //   clearInterval(timer)
  //   timer = setInterval(toggleCarRandom, randRange(timeArray))
  // }

  // 1000 = Initial timer when the page is first loaded
  // var timer = setInterval(toggleCarRandom, 1000)
  //==========End of possible car with increment============




  function moveCarBelow() {
    squares[carBelowIndex].classList.remove('cartoleft')
    carBelowIndex -= 1
    squares[carBelowIndex].classList.add('cartoleft')
    if(carBelowIndex < 54) {
      squares[carBelowIndex].classList.remove('cartoleft')
      carBelowIndex = 63
    } else if(squares[currentFrogIndex] === squares[carBelowIndex]) {
      gameOverModal()
    }
  }


  //trunks

  // Upper trunk

  function moveUpperFrontTrunk() {
    if (squares[upperFrontTrunkIndex].classList.contains('frog')) {
      squares[currentFrogIndex].classList.remove('frog')
      currentFrogIndex +=1
      squares[currentFrogIndex].classList.add('frog')
      if (currentFrogIndex === 18) {
        gameOverModal()
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


  function moveUpperAboveTrunk() {
    if (squares[upperBackTrunkIndex].classList.contains('frog')) {
      squares[currentFrogIndex].classList.remove('frog')
      currentFrogIndex +=1
      squares[currentFrogIndex].classList.add('frog')
      if (currentFrogIndex === 18) {
        gameOverModal()
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

  function moveMiddleFrontTrunk() {
    if (squares[middleFrontTrunkIndex].classList.contains('frog')) {
      squares[currentFrogIndex].classList.remove('frog')
      currentFrogIndex +=1
      squares[currentFrogIndex].classList.add('frog')
      if (currentFrogIndex === 27) {
        gameOverModal()
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


  function moveMiddleBackTrunk() {
    if (squares[middleBackTrunkIndex].classList.contains('frog')) {
      squares[currentFrogIndex].classList.remove('frog')
      currentFrogIndex +=1
      squares[currentFrogIndex].classList.add('frog')
      if (currentFrogIndex === 27) {
        gameOverModal()
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

  function moveLowerFrontTrunk() {
    if (squares[lowerFrontTrunkIndex].classList.contains('frog')) {
      squares[currentFrogIndex].classList.remove('frog')
      currentFrogIndex +=1
      squares[currentFrogIndex].classList.add('frog')
      if (currentFrogIndex === 36) {
        gameOverModal()
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


  function moveLowerBackTrunk() {
    if (squares[lowerBackTrunkIndex].classList.contains('frog')) {
      squares[currentFrogIndex].classList.remove('frog')
      currentFrogIndex +=1
      squares[currentFrogIndex].classList.add('frog')
      if (currentFrogIndex === 36) {
        gameOverModal()
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


  const gameOverModal = function () {
    squares[lowerFrontTrunkIndex].classList.remove('trunk')
    squares[lowerBackTrunkIndex].classList.remove('trunk')
    squares[middleBackTrunkIndex].classList.remove('trunk')
    squares[middleFrontTrunkIndex].classList.remove('trunk')
    squares[upperFrontTrunkIndex].classList.remove('trunk')
    squares[upperBackTrunkIndex].classList.remove('trunk')
    // create an alpha channel game over
    gameOver.classList.remove('hidden')
    badLuck.play()
    // squares[currentFrogIndex].classList.remove('cartoleft')
    // squares[currentFrogIndex].classList.add('frog_hit')
    squares[currentFrogIndex].className = ''
    squares[currentFrogIndex].classList.add('frog_hit')
    // stop frog
    frogEnabled = false
    //stop timer countdown
    clearInterval(timerId)
    //stop timer car below
    clearInterval(carBelowTimer)
    clearInterval(carAboveTimer)
    //stop timer car below
    clearInterval(upperFrontTrunkTimer)
    clearInterval(upperBackTrunkTimer)
    clearInterval(middleFrontTrunkTimer)
    clearInterval(middleBackTrunkTimer)
    clearInterval(lowerFrontTrunkTimer)
    clearInterval(lowerBackTrunkTimer)
  }



  const youWin = function () {
    squares[lowerFrontTrunkIndex].classList.remove('trunk')
    squares[lowerBackTrunkIndex].classList.remove('trunk')
    squares[middleBackTrunkIndex].classList.remove('trunk')
    squares[middleFrontTrunkIndex].classList.remove('trunk')
    squares[upperFrontTrunkIndex].classList.remove('trunk')
    squares[upperBackTrunkIndex].classList.remove('trunk')
    // create an alpha channel game over
    youWinScreen.classList.remove('hidden')
    youWinSound.play()
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



  // =============Start function =======================================================

  function start(){
    gameOver.classList.add('hidden')
    frogFly.classList.add('hidden')
    startSound.play()
    frogEnabled = true
    clearInterval(timerId)
    clearInterval(carAboveTimer)
    clearInterval(carBelowTimer)
    clearInterval(upperFrontTrunkTimer)
    clearInterval(upperBackTrunkTimer)
    clearInterval(middleFrontTrunkTimer)
    clearInterval(middleBackTrunkTimer)
    clearInterval(lowerFrontTrunkTimer)
    clearInterval(lowerBackTrunkTimer)
    squares[1].classList.remove('lily_frog')
    squares[3].classList.remove('lily_frog')
    squares[5].classList.remove('lily_frog')
    squares[7].classList.remove('lily_frog')
    squares[currentFrogIndex].classList.remove('frog_hit')
    squares[currentFrogIndex].classList.remove('frog_hit')
    squares[currentFrogIndex].classList.remove('frog')
    squares[carBelowIndex].classList.remove('cartoleft')
    squares[carAboveIndex].classList.remove('cartoright')
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
    timerId = setInterval(countdown, 1000)
    carAboveTimer = setInterval(moveCarAbove, 500)
    carBelowTimer = setInterval(moveCarBelow, 300)
    upperFrontTrunkTimer = setInterval(moveUpperFrontTrunk, 2000)
    upperBackTrunkTimer = setInterval(moveUpperAboveTrunk, 2000)
    middleFrontTrunkTimer = setInterval(moveMiddleFrontTrunk, 1000)
    middleBackTrunkTimer = setInterval(moveMiddleBackTrunk, 1000)
    lowerFrontTrunkTimer = setInterval(moveLowerFrontTrunk, 500)
    lowerBackTrunkTimer = setInterval(moveLowerBackTrunk, 500)
    squares[currentFrogIndex].classList.add('frog')
    squares[carBelowIndex].classList.add('cartoleft')
    squares[carAboveIndex].classList.add('cartoright')
    squares[upperFrontTrunkIndex].classList.add('trunk')
    squares[upperBackTrunkIndex].classList.add('trunk')
    squares[middleFrontTrunkIndex].classList.add('trunk')
    squares[middleBackTrunkIndex].classList.add('trunk')
    squares[lowerFrontTrunkIndex].classList.add('trunk')
    squares[lowerBackTrunkIndex].classList.add('trunk')
    timeBoard.textContent = timeRemaining
    scoreBoard.textContent = score
    squares[1].classList.add('lily')
    squares[3].classList.add('lily')
    squares[5].classList.add('lily')
    squares[7].classList.add('lily')

  }




  // Event listeners

  document.addEventListener('keyup', moveFrog)
  document.getElementById('btStart').addEventListener('click', start)















})
