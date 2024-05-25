let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-g');
let newGameBtn = document.querySelector('#gameNew');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let turn0 = true;

const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Modal Elements
let modal = document.getElementById('winnerModal');
let winnerMsg = document.getElementById('winnerMsg');
let closeBtn = document.querySelector('.close-btn');

const resetGame = () => {
  turn0 = true;
  enableBtn();
  msgContainer.classList.add('hide');
  modal.classList.add('hide');
};

const showWinner = (winner) => {
  winnerMsg.innerText = `CONGRATULATIONS! Winner is ${winner}`;
  modal.classList.remove('hide');
  modal.style.display = 'block';
  disableBtn();
};

const disableBtn = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBtn = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = '';
  }
};

const checkWinner = () => {
  for (let pattern of winPattern) {
    let posVal1 = boxes[pattern[0]].innerText;
    let posVal2 = boxes[pattern[1]].innerText;
    let posVal3 = boxes[pattern[2]].innerText;
    if (posVal1 != '' && posVal2 != '' && posVal3 != '') {
      if (posVal1 === posVal2 && posVal2 === posVal3) {
        console.log('winner', posVal1);
        showWinner(posVal1);
        return;
      }
    }
  }
};

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    console.log('Box was clicked');

    if (turn0) {
      // player0
      box.innerText = 'O';
      turn0 = false;
    } else {
      // player x
      box.innerText = 'X';
      turn0 = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);

// Close the modal when the close button is clicked
closeBtn.addEventListener('click', () => {
  modal.classList.add('hide');
  resetGame();
  modal.style.display = 'none';
});

// Close the modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.add('hide');
    resetGame();
    modal.style.display = 'none';
  }
});
