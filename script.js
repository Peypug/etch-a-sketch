const board = document.querySelector(".board");
const buttonBoardSize = document.querySelector(".boardSize");
const rainbowButton = document.querySelector(".rainbow");
const colorPicker = document.querySelector(".color-picker");
const clearButton = document.querySelector(".clear")
let count = 0;
let column;
let boardSize = 25;
let rainbowColor = "pink";
let rainbowMode = false;
sketch(boardSize);

// Asks for board size when button is clicked
buttonBoardSize.addEventListener("click",function () {
  clear()
  // Makes sure the board size is appropriate
  let boardSize = prompt("How many squares per side: ");
  boardSize = Number(boardSize);
  while (!Number.isInteger(boardSize) || boardSize < 1 || boardSize > 100) {
    boardSize = prompt("How many squares per side: ");
    boardSize = Number(boardSize);
  }
  boardSize = boardSize.toString()
  sketch(boardSize);
})

rainbowButton.addEventListener("click", function() {
  rainbowMode = !rainbowMode;
  if (rainbowMode == true) {
    rainbowButton.style.backgroundColor = "pink";
  }
  else {
    rainbowButton.style.backgroundColor = "white";
  }
  console.log(rainbowMode);
})

function clear() {
  // Clears board
  if (count >= 1) {
    while (board.firstElementChild) {
      board.removeChild(board.firstChild);
    }
  }
}

clearButton.addEventListener("click",function () {
  clear();
  sketch(boardSize);
});

function sketch(boardSize) {
  count += 1;
  // loop through the rows of the sketch board
  for (i = 0; i < boardSize; i++) {
    // Loop through the rows of the sketch board
    column = document.createElement("div");
    column.classList.add("column");
    for (j = 0; j < boardSize; j++) {
      // Create cell on sketch board
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cellSize = 20/boardSize * 25;
      cellSize = cellSize.toString();
      cell.style.height = cellSize + "px";
      cell.style.width = cellSize + "px";
      // Apply effects to the cell 
      cell.addEventListener("dragover", function () {
        if (rainbowMode == true) {
          cell.addEventListener("dragover", function() {
            let rainbowColorR = Math.floor(Math.random() * 256);
            let rainbowColorG = Math.floor(Math.random() * 256);
            let rainbowColorB = Math.floor(Math.random() * 256);
            rainbowColor = 
            "rgb("+rainbowColorR+","+rainbowColorG+","+rainbowColorB+")";
            color = rainbowColor;
          })
        }
        else {
          color = colorPicker.value;
        }
        // sets fill color to the color selected
        cell.style.backgroundColor = color;
      });
      // Adds the cell to the board
      column.appendChild(cell);
    }
    board.appendChild(column);
  }
}
