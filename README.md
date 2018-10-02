# Technologies Used

- HTML
- Javascript
- Sass
- JQuery
- AJAX
- Bootstrap
- Node
- Grunt
- Git

# Plan

I started with game logic, making the game play and switch between characters upon each turn. I then added the ability to check for a win condition upon each play. Next came implementing the HTML of the board, and wasting too much time making the board symmetrical. After making the board look reasonable, I made click handlers to make moves, and write the results of the move to the HTML of the board. After this, I added authentication components in their entirety (meaning from HTML button to api call) one at a time. I started with a sign up form, then a sign in form, a change password form, and a sign out button in that order. After getting authentication api calls working, I would be able to test my game api calls. So I added a new game button that would clear the board and make a CREATE call to the api. After this, I wrote the PATCH api call to run upon a click on the game board. Next came some HTML/CSS cleanup to get buttons and forms to only show at appropriate times, and clear the contents of forms when they should be cleared. After this came creating a button and api call to get all games for the current player, and displaying the total number of games returned. This is where I considered the project to be close to meeting MVP requirements.

Now I started to add features above the MVP requirements. I started with fixing some small bugs pointed out by testing from my peers. Then I added a bootstrap table to display the results of indexing games. Next I added to the table a mini game board for each indexed game, rather than displaying the results as an array. Next I moved most of the buttons in the app in to a collapsible navbar, and made the change password form pop in as a modal rather than removing other components from the screen. I added pagination and sorting to the display of old games next, which proved rather difficult. The last feature I added was AI. I started by attempting to get the "AI" to pick a random square immediately after the player chose a square. As I had not designed the application thus far to use promises, this proved to be a daunting workload. I decided to add a "Let AI Decide" button to the application instead, with the plan to refactor the code to use promises in a future iteration. After getting the random choice AI to work, I did research to find an algorithm to use for an unbeatable AI. The answer seemed to be the Minimax algorithm, so I designed an implementation of the algorithm, referencing other projects I found online (referenced below). 

# Unsolved Problems

I am unhappy with the design aesthetic of the page, though I lack the skills or mindset to make this significantly better than it currently is.

Code should be refactored to use promises in several places, which would allow the AI to play after the player selects a square, rather than needing the player to click a button to activate the AI for each move.

Multiplayer has not been completed, and could be in a future iteration.

# Wireframes

https://drive.google.com/file/d/1dADnE8mwb66zXTzhLW6V4HNWKqLzBalC/view?usp=sharing

# User Stories

- As an online TicTacToe player, I want to be able to signup and login to the service

- As a player I should be able to change my password when I am logged in

- As a player, after I am logged in I should be able to create a new game

    - That new game should be created locally

    - The new game should also be created in the server

- As a player, I should be able to click on squares in the game board to make marks on the board

    - Clicking an occupied square should notify me to pick a new square

    - The marks I make should be rotated between x and o if I'm playing single player

    - The game state should be updated both in local storage and in the server using the game-api

- As a player, I should be notified which token I am currently using

- As a player, I should be visually notified at the end of the game who won and then be able to start a new game

- As a player, I should be able to see my past games

    - This should include options for all games, complete games, and incomplete games

    - Stretch: be able to continue an unfinished game stored on the server

- Stretch: As a player, I want to be able to let an AI decide moves

    - I should be able to use this AI as an opponent

    - I should be able to use this AI to help me make my own moves

# AI References

https://medium.com/@alialaa/tic-tac-toe-with-javascript-es2015-ai-player-with-minimax-algorithm-59f069f46efa

https://www.neverstopbuilding.com/blog/minimax