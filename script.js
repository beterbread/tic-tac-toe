function Gameboard() {
  this.board = [["", "", ""], ["", "", ""], ["", "", ""]];
  this.updateBoard = function(position, marker) {
    if (position === "one") {
      this.board[0][0] = marker;
    }
    else if (position === "two") {
      this.board[0][1] = marker;      
    }
    else if (position === "three") {
      this.board[0][2] = marker;    
    }
    else if (position === "four") {
      this.board[1][0] = marker;    
    }
    else if (position === "five") {
      this.board[1][1] = marker;    
    }
    else if (position === "six") {
      this.board[1][2] = marker;  
    }
    else if (position === "seven") {
      this.board[2][0] = marker;
    }
    else if (position === "eight") {
      this.board[2][1] = marker;
    }
    else if (position === "nine") {
      this.board[2][2] = marker;
    }
  }
  this.botMove = function(marker) {
    for (let i = 0; i < 3; i++)  {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === "") {
          this.board[i][j] = marker;
          if (i === 0 && j === 0) {
            const box = document.getElementById("one");
            box.textContent = marker;
          }
          else if (i === 0 && j === 1) {
            const box = document.getElementById("two");
            box.textContent = marker;
          }
          else if (i === 0 && j === 2) {
            const box = document.getElementById("three");
            box.textContent = marker;
          }
          else if (i === 1 && j === 0) {
            const box = document.getElementById("four");
            box.textContent = marker;
          }
          else if (i === 1 && j === 1) {
            const box = document.getElementById("five");
            box.textContent = marker;
          }
          else if (i === 1 && j === 2) {
            const box = document.getElementById("six");
            box.textContent = marker;
          }
          else if (i === 2 && j === 0) {
            const box = document.getElementById("seven");
            box.textContent = marker;
          }
          else if (i === 2 && j === 1) {
            const box = document.getElementById("eight");
            box.textContent = marker;
          }
          else if (i === 2 && j === 2) {
            const box = document.getElementById("nine");
            box.textContent = marker;
          }
          return;
        }
      }
    }
  }
  this.gameover = function() {
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0] !== "" &&
        this.board[i][0] === this.board[i][1] &&
        this.board[i][0] === this.board[i][2]
      ) {
        return this.board[i][0]; 
      }
    }
    for (let j = 0; j < 3; j++) {
      if (
        this.board[0][j] !== "" &&
        this.board[0][j] === this.board[1][j] &&
        this.board[0][j] === this.board[2][j]
      ) {
        return this.board[0][j];
      }
    }
    if (
      this.board[0][0] !== "" &&
      this.board[0][0] === this.board[1][1] &&
      this.board[0][0] === this.board[2][2]
    ) {
      return this.board[0][0];
    }
  
    if (
      this.board[0][2] !== "" &&
      this.board[0][2] === this.board[1][1] &&
      this.board[0][2] === this.board[2][0]
    ) {
      return this.board[0][2];
    } 
    return null;
  }
}

function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}

const winner = document.querySelector("h1");
const gameboard = new Gameboard();
const player = new Player("Player", "X");
const bot = new Player("Bot", "O");
const boxes = document.querySelectorAll(".box");
boxes.forEach(box => {
  box.addEventListener('click', function () {
    if (box.textContent === "") {
      box.textContent = player.marker;    
      gameboard.updateBoard(box.getAttribute("id"), player.marker);
      let check = gameboard.gameover();
      if (check === null && gameboard.counter === 9) {
        winner.textContent = "Tie";
      }
      else if (check === player.marker) {
        winner.textContent = "You won";  
      }
      else if (check === bot.marker) {
        winner.textContent = "You lost";
      }
      else {
        gameboard.botMove(bot.marker);
        check = gameboard.gameover();
        if (check === null && gameboard.counter === 9) {
          winner.textContent = "Tie";
        }
        else if (check === player.marker) {
          winner.textContent = "You won";  
        }
        else if (check === bot.marker) {
          winner.textContent = "You lost";
        }  
      }
    }
  });
});