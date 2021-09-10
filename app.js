// Dev Test
// const firstPlayerBtn = document.getElementById('firstPlayer');
// const secondPlayerBtn = document.getElementById('secondPlayer');

// firstPlayerBtn.addEventListener('click', () => {
//   firstPlayersTurn = true;
//   secondPlayersTurn = false;
// });
// secondPlayerBtn.addEventListener('click', () => {
//   secondPlayersTurn = true;
//   firstPlayersTurn = false;
// });
// Dev Test End

const board = document.getElementById('board');
const squares = document.querySelectorAll('.square');
let boardNumbers = 0;
let boardGrid = [];
let fillInNumbers = [];
let numberOfMoves = 64;
let firstPlayerMovesLeft = 32;
let secondPlayerMovesLeft = 32;
let firstPlayersTurn = false;
let secondPlayersTurn = false;

let verticalTopArray = [];
let verticalBottomArray = [];
let horizontalLeftArray = [];
let horizontalRightArray = [];
let diagonalTopLeftArray = [];
let diagonalTopRightArray = [];
let diagonalBottomLeftArray = [];
let diagonalBottomRightArray = [];

squares.forEach((square) => {
  square.innerHTML = `<span>${boardNumbers}</span>`;
  fillInNumbers.push(boardNumbers);
  if (fillInNumbers.length > 7) {
    boardGrid.push(fillInNumbers);
    fillInNumbers = [];
  }
  boardNumbers++;
});

board.addEventListener('click', (e) => {
  if (e.target.classList.contains('square')) {
    if (firstPlayersTurn && !e.target.classList.contains('filled')) {
      e.target.classList.add('black');
      e.target.classList.add('filled');
      firstPlayerMovesLeft--;

      // test
      let piece = document.createElement('div');
      piece.classList.add('piece');
      piece.classList.add('blackPiece');
      e.target.append(piece);
      console.log('piece', piece);

      console.log('Inside the square: ', e.target.innerText);
      console.log('First Players Moves Left: ', firstPlayerMovesLeft);

      verticalCheck(e.target.innerText);
      horizontalCheck(e.target.innerText);
      diagonalCheck(e.target.innerText);

      firstPlayersTurn = false;
      secondPlayersTurn = true;
    } else if (secondPlayersTurn && !e.target.classList.contains('filled')) {
      e.target.classList.add('white');
      e.target.classList.add('filled');
      secondPlayerMovesLeft--;

      // test
      let piece = document.createElement('div');
      piece.classList.add('piece');
      piece.classList.add('whitePiece');
      e.target.append(piece);

      console.log('Inside the square: ', e.target.innerText);
      console.log('Second Players Moves Left: ', secondPlayerMovesLeft);

      verticalCheck(e.target.innerText);
      horizontalCheck(e.target.innerText);
      diagonalCheck(e.target.innerText);

      secondPlayersTurn = false;
      firstPlayersTurn = true;
    }
  }
});

function startGame() {
  const first = Math.ceil(Math.random() * 10);
  const second = Math.ceil(Math.random() * 10);
  console.log(first);
  console.log(second);
  if (first > second) {
    firstPlayersTurn = true;
  } else {
    secondPlayersTurn = true;
  }
  console.log(boardGrid);
}

function verticalCheck(square) {
  console.log('Inside the Vertical Check:', square);
  for (let i = 0; i < squares.length / 8; i++) {
    for (let j = 0; j < squares.length / 8; j++) {
      if (boardGrid[i][j] == square) {
        verticalTopArray = [];
        verticalBottomArray = [];
        recursiveCheckVerticalTop(i - 1, j);
        recursiveCheckVerticalBottom(i + 1, j);
      }
    }
  }
  console.log('verticalTopArray', verticalTopArray);
  console.log('verticalBottomArray', verticalBottomArray);
  firstPlayersTurn
    ? changeFlankedPieces('white', [verticalTopArray, verticalBottomArray])
    : changeFlankedPieces('black', [verticalTopArray, verticalBottomArray]);
}

function horizontalCheck(square) {
  console.log('Inside the Vertical Check:', square);
  for (let i = 0; i < squares.length / 8; i++) {
    for (let j = 0; j < squares.length / 8; j++) {
      if (boardGrid[i][j] == square) {
        horizontalLeftArray = [];
        horizontalRightArray = [];
        recursiveCheckHorizontalLeft(i, j - 1);
        recursiveCheckHorizontalRight(i, j + 1);
      }
    }
  }
  console.log('horizontalLeftArray', horizontalLeftArray);
  console.log('horizontalRightArray', horizontalRightArray);

  firstPlayersTurn
    ? changeFlankedPieces('white', [horizontalLeftArray, horizontalRightArray])
    : changeFlankedPieces('black', [horizontalLeftArray, horizontalRightArray]);
}

function diagonalCheck(square) {
  console.log('Inside the Diagonal Check:', square);
  for (let i = 0; i < squares.length / 8; i++) {
    for (let j = 0; j < squares.length / 8; j++) {
      if (boardGrid[i][j] == square) {
        diagonalTopLeftArray = [];
        diagonalTopRightArray = [];
        diagonalBottomLeftArray = [];
        diagonalBottomRightArray = [];
        recursiveCheckTopLeft(i - 1, j - 1);
        recursiveCheckTopRight(i + 1, j - 1);
        recursiveCheckBottomLeft(i - 1, j + 1);
        recursiveCheckBottomRight(i + 1, j + 1);
      }
    }
  }

  console.log('diagonalTopLeftArray', diagonalTopLeftArray);
  console.log('diagonalTopRightArray', diagonalTopRightArray);
  console.log('diagonalBottomLeftArray', diagonalBottomLeftArray);
  console.log('diagonalBottomRightArray', diagonalBottomRightArray);

  firstPlayersTurn
    ? changeFlankedPieces('white', [
        diagonalTopLeftArray,
        diagonalTopRightArray,
        diagonalBottomLeftArray,
        diagonalBottomRightArray,
      ])
    : changeFlankedPieces('black', [
        diagonalTopLeftArray,
        diagonalTopRightArray,
        diagonalBottomLeftArray,
        diagonalBottomRightArray,
      ]);
}

function recursiveCheckVerticalTop(i, j) {
  if (boardGrid[i] == undefined || boardGrid[j] == undefined) {
    console.log('Error Catch.');
    return;
  } else if (i >= 0 && j >= 0) {
    if (!squares[boardGrid[i][j]].classList.contains('filled')) {
      return;
    } else {
      verticalTopArray.push(squares[boardGrid[i][j]]);
    }

    recursiveCheckVerticalTop(i - 1, j);
  }
}

function recursiveCheckVerticalBottom(i, j) {
  if (boardGrid[i] == undefined || boardGrid[j] == undefined) {
    console.log('Error Catch.');
    return;
  } else if (i >= 0 && j >= 0) {
    if (!squares[boardGrid[i][j]].classList.contains('filled')) {
      return;
    } else {
      verticalBottomArray.push(squares[boardGrid[i][j]]);
    }

    recursiveCheckVerticalBottom(i + 1, j);
  }
}

// Recursive functions Horizontal
function recursiveCheckHorizontalLeft(i, j) {
  if (boardGrid[i] == undefined || boardGrid[j] == undefined) {
    console.log('Error Catch.');
    return;
  } else if (i >= 0 && j >= 0) {
    if (!squares[boardGrid[i][j]].classList.contains('filled')) {
      return;
    } else {
      horizontalLeftArray.push(squares[boardGrid[i][j]]);
    }

    recursiveCheckHorizontalLeft(i, j - 1);
  }
}

function recursiveCheckHorizontalRight(i, j) {
  if (boardGrid[i] == undefined || boardGrid[j] == undefined) {
    console.log('Error Catch.');
    return;
  } else if (i >= 0 && j >= 0) {
    if (!squares[boardGrid[i][j]].classList.contains('filled')) {
      return;
    } else {
      horizontalRightArray.push(squares[boardGrid[i][j]]);
    }

    recursiveCheckHorizontalRight(i, j + 1);
  }
}

// Recursive functions Diagonal
function recursiveCheckTopLeft(i, j) {
  console.log('Recursion on Top Left: ');
  if (boardGrid[i] == undefined || boardGrid[j] == undefined) {
    console.log('Error Catch.');
    return;
  } else if (i >= 0 && j >= 0) {
    if (!squares[boardGrid[i][j]].classList.contains('filled')) {
      return;
    } else {
      diagonalTopLeftArray.push(squares[boardGrid[i][j]]);
    }

    recursiveCheckTopLeft(i - 1, j - 1);
  }
}

function recursiveCheckTopRight(i, j) {
  console.log('Recursion on Top Right: ');

  if (boardGrid[i] == undefined || boardGrid[j] == undefined) {
    console.log('Error Catch.');
    return;
  } else if (i >= 0 && j >= 0) {
    if (!squares[boardGrid[i][j]].classList.contains('filled')) {
      return;
    } else {
      diagonalTopRightArray.push(squares[boardGrid[i][j]]);
    }

    recursiveCheckTopRight(i + 1, j - 1);
  }
}

function recursiveCheckBottomLeft(i, j) {
  console.log('Recursion on Bottom Left: ');
  if (boardGrid[i] == undefined || boardGrid[j] == undefined) {
    console.log('Error Catch.');
    return;
  } else if (i >= 0 && j >= 0) {
    if (!squares[boardGrid[i][j]].classList.contains('filled')) {
      return;
    } else {
      diagonalBottomLeftArray.push(squares[boardGrid[i][j]]);
    }

    recursiveCheckBottomLeft(i - 1, j + 1);
  }
}

function recursiveCheckBottomRight(i, j) {
  console.log('Recursion on Bottom Right: ');
  if (boardGrid[i] == undefined || boardGrid[j] == undefined) {
    console.log('Error Catch.');
    return;
  } else if (i >= 0 && j >= 0) {
    if (!squares[boardGrid[i][j]].classList.contains('filled')) {
      return;
    } else {
      diagonalBottomRightArray.push(squares[boardGrid[i][j]]);
    }

    recursiveCheckBottomRight(i + 1, j + 1);
  }
}

function changeFlankedPiecesColor(flankedPieces) {
  flankedPieces.forEach((flanked) => {
    let piece = flanked.querySelector('.piece');
    if (firstPlayersTurn) {
      flanked.classList.remove('white');
      flanked.classList.add('black');
      piece.classList.remove('whitePiece');
      piece.classList.add('blackPiece');
    }
    if (secondPlayersTurn) {
      flanked.classList.remove('black');
      flanked.classList.add('white');
      piece.classList.remove('blackPiece');
      piece.classList.add('whitePiece');
    }
  });
}

function changeFlankedPieces(opponentsColor, squaresDirectionArray) {
  squaresDirectionArray.forEach((direction) => {
    let temporaryDirectionArray = [];
    for (let i = 0; i < direction.length; i++) {
      if (direction[i].classList.contains(opponentsColor)) {
        temporaryDirectionArray.push(direction[i]);
      } else if (!direction[i].classList.contains(opponentsColor)) {
        console.log('temporaryDirectionArray ', temporaryDirectionArray);
        changeFlankedPiecesColor(temporaryDirectionArray);
        i = direction.length;
      } else if (
        i == direction.length - 1 &&
        direction[i].classList.contains(opponentsColor)
      ) {
        temporaryDirectionArray = [];
      } else if (
        i == direction.length - 1 &&
        !direction[i].classList.contains(opponentsColor)
      ) {
        console.log('temporaryDirectionArray ', temporaryDirectionArray);
        changeFlankedPiecesColor(temporaryDirectionArray);
      } else {
        i = direction.length;
      }
    }
  });
}

startGame();
