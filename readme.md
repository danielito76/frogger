# **Project 1: FROGGER LOBBER** ![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)
## Browser-based game

## Overview
This is my first project from General Assembly's Software Engineering Immersive Course. It is an individual project built in a week.
Frogger Lobber is a classic style, browser based game that i featured with a wide set of audio effects to make it funnier.  
The idea of Frogger is to guide a family of funny frogs across the road, and through the river to their 4 lily pads at the top of the screen.
To make things more challenging there are numerous moving obstacles that the frogs must avoid to reach their destination.

[Deployed project] (https://danielito76.github.io/frogger/)
[GitHub Repo] (https://github.com/danielito76/frogger)


![First GIF](/img/readme-screenshots/frogger.gif)

———————————————————————


### Brief

* Render a grid-based game in the browser
* All the elements are rendered as a background img
* Develop JavaScript logic to make frog able to move
* Develop JavaScript logic for moving car on the street
* Develop JavaScript logic for moving logs on the river
* Develop JavaScript logic for collisions frog-cars
* Develop JavaScript logic for match frog-logs and collisions frog-river
* Develop JavaScript logic for collisions frog-lilypads
* Develop JavaScript logic for Start function and conditions
* Develop JavaScript logic for Win function and conditions
* Develop JavaScript logic for Game Over function and conditions
* Develop JavaScript countdown function timer
* Style with CSS, background and animated GIFs
* Enrich with interactive sound effects
* Adding a Game Over Modal
* Adding a Win Modal
* Adding a GIF as an Intro
* Include separate HTML / CSS / JavaScript files
* Use Javascript for DOM manipulation
* Deploy your game online, using Github Pages, where is accessible from everyone
* Use semantic markup for HTML and CSS (adhere to best practices)


———————————————————————

### Technologies Used
* HTML5 with HTML5 audio
* CSS3 with animation
* JavaScript (ES6)
* Git 5
* GitHub
* Google Fonts



———————————————————————


### Approach Taken

Making the MVP
I started by setting up the HTML5 file with grid of squares.
After that I created the basic CSS3 rules to assign the picture of the elements as a background image for the frames.
Then I carried on with the JavaScript(ES6) logic firstly to make the elements able to move: frog needed to be able to move with the keyboards arrows within the limits of the squared grid; Cars needed to pass regularly; Logs had to come inside the stage gradually and pass with different speeds.
Next step was implementing the relations between frog, cars, logs and river:
- firstly I implemented the collision with the cars
- Second I made the match with the logs
- Third I made the collision with the river and the right edge of the river zone (where the frog can be dragged by the logs)
- At the end I made the collisions frog-lily-pads
Styling the game
I added sounds with HTML5 audio to make it strangeand funny (I used old style games sounds)
Then I made animated GIF with photopea.com and i added them together with Google Fonts to make the project more interesting and funnier. 
Then I made a bespoke background with photopea.com and I used it
Finally I added a animated gif intro to make it funnier
I handled the whole project using Git and GitHub.


———————————————————————


### Functionality:

-Frog move + collision frog-lilypad + collision frog-river

```javascript

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
      }

      if (currentFrogIndex > 45 && currentFrogIndex < 62 && carAboveIndex > 45) {
        horn.play()
        secondHorn.play()
      }

      if (currentFrogIndex > 45 && currentFrogIndex < 62 && carBelowIndex < 62) {
        secondHorn.play()
      }

      if (squares[currentFrogIndex].classList.contains('lily_frog') ||
        squares[currentFrogIndex].classList.contains('river')
      ) {
        gameOverModal()
      }

      if (squares[1].classList.contains('lily_frog') && squares[3].classList.contains('lily_frog') && squares[5].classList.contains('lily_frog') && squares[7].classList.contains('lily_frog')) {
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

```

------------------------------------------------------------------------------------------



-car move + collision car-frog

```javascript

let carBelowTimer = setInterval(moveCarBelow, 300)
let carBelowIndex = 62

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
```
------------------------------------------------------------------------------------------


-log move + match frog-log

```javascript

let upperFrontTrunkTimer = setInterval(moveUpperFrontTrunk, 1750)
let upperFrontTrunkIndex = 9
let upperBackTrunkTimer = setInterval(moveUpperBackTrunk, 1750)
let upperBackTrunkIndex = 8

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


  function moveUpperBackTrunk() {
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
```
------------------------------------------------------------------------------------------



-count-down function

```javascript

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
```




———————————————————————




### Screenshots
# Gameplay at MVP
![Gameplay MVP1](/img/readme-screenshots/Gameplay_at_MVP_1.png)
![Gameplay MVP2](/img/readme-screenshots/Gameplay_at_MVP_2.png)
# After some styling
![After Styling1](/img/readme-screenshots/Gameplay_styling_1.png)
![After Styling2](/img/readme-screenshots/Gameplay_styling_2.png)
![After Styling3](/img/readme-screenshots/Gameplay_styling_3.png)
![After Styling3](/img/readme-screenshots/Gameplay+intro.png)



———————————————————————


### Final Product
![Final product](/img/readme-screenshots/Gameplay_Final_Product.png)


———————————————————————


### Bugs
logs are set in a way that allows the user to win just in the first 20-30 seconds, after they never make a bridge to  allow the frog to pass



———————————————————————


### Wins, Blockers and key learnings
Wins:
-Logs working principles
-collisions and interactive sounds
-I was also able to find a method to make the cars frequency increasing but unfortunately this method was over my control
Blockers:
-Logs are two squares and they come in from the edge, I had to find a way to make them appear gradually
-Time relation between Logs
-Make match frog-logs
Key learnings:
Making all the Javascript functions working consistently together


———————————————————————


### Future Content
* Mobile compatibility
* Different difficulty levels.
* Auto generated boards.
* More interesting layout.
