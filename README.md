# Link to GitHub Pages Site

https://zclark0625.github.io/game-project-client/

# User Stories

- As an online TicTacToe player, I want to be able to signup and login to the service

- As a player, after I am logged in I should be able to create a new game

    - That new game should be created locally

    - The new game should also be sent to the server

- As a player, I should be able to click on squares in the game board to make X and/or O marks on the board

    - Clicking an occupied square should notify me to pick a new square

    - The marks I make should be rotated between x and o if I'm playing single player

    - The game state should be updated both in local storage and in the server using the game-api

- As a player, I should be notified which token I am currently using (in the case of a single player with no AI), or be able to choose my token (in the case of an AI opponent)

- As a player, I should be visually notified at the end of the game who won, with a slash through the winning three tokens, and then be able to start a new game

- As a player, I should be able to get my lifetime statistics

    - This should include total games played, games won, and games lost

    - Stretch: be able to continue an unfinished game stored on the server

# References

https://medium.com/@alialaa/tic-tac-toe-with-javascript-es2015-ai-player-with-minimax-algorithm-59f069f46efa

https://www.neverstopbuilding.com/blog/minimax