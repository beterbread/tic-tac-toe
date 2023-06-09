function Gameboard() {
  this.counter = 0;
  this.board = [["", "", ""], ["", "", ""], ["", "", ""]];
  this.clearBoard = function() {
    this.counter = 0;
    this.board = [["", "", ""], ["", "", ""], ["", "", ""]];
    const boxes = document.querySelectorAll(".box");
    boxes.forEach(box => { 
      box.querySelector('span').textContent = ""; 
      box.querySelector('span').style.opacity = 0; 
    });
  }
  this.updateBoard = function(position, marker) {
    this.counter++;
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

let winnerCheck = false;
let playerCheck = false;
const winner = document.querySelector(".winner");
const again = document.querySelector(".again");
const gameboard = new Gameboard();
const playerone = new Player("X", "X");
const playertwo = new Player("O", "O");
const boxes = document.querySelectorAll(".box");
boxes.forEach(box => {
  box.addEventListener('click', function () {
    if (box.textContent === "" && winnerCheck === false) {
      let player;
      if (playerCheck === false) {
        box.querySelector('span').style.color = "#9878b7";
        player = playerone;
        playerCheck = true;
      }
      else {
        box.querySelector('span').style.color = "#b69ccf";
        player = playertwo;
        playerCheck = false;
      }
      box.querySelector('span').textContent = player.marker;   
      box.querySelector('span').style.opacity = 1;
      gameboard.updateBoard(box.getAttribute("id"), player.marker);
      let check = gameboard.gameover();
      if (check === null && gameboard.counter === 9) {
        winnerCheck = true;
        winner.textContent = "Tied game!";
        again.textContent = "Play again?";
      }
      else if (check === playerone.marker) {
        winnerCheck = true;
        winner.textContent = playerone.marker + " wins!";
        again.textContent = "Play again?";
      }
      else if (check === playertwo.marker) {
        winnerCheck = true;
        winner.textContent = playertwo.marker + " wins!";
        again.textContent = "Play again?";
      }
    }
  });
});

again.addEventListener('click', function() {
  gameboard.clearBoard();
  winner.textContent = "";
  again.textContent = "";
  winnerCheck = false;
  playerCheck = false;
});