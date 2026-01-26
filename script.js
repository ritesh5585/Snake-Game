const board = document.querySelector(".board");
const startBtn = document.querySelector(".btn-start");
const modal = document.querySelector(".modal");
const restartBtn = document.querySelector(".restart");
const gameStart = document.querySelector(".start-game");
const gameOver = document.querySelector(".game-over");

let highScoreElement = document.getElementById("high-score");
let scoreElement = document.getElementById("score");
let timeElement = document.getElementById("time");

const BLOCKm = 25;
let cols = Math.floor(board.clientWidth / BLOCKm);
let rows = Math.floor(board.clientHeight / BLOCKm);

let intervalId = null;
let timerId = null;
let score = 0;
let time = `00-00`;

let highScore = localStorage.getItem("highScore") || 0;
highScoreElement.innerText = highScore;

let blocks = [];
let snake = [{ x: 2, y: 6 }];

let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    // block.innerText = `${row}:${col}`; // index of each box

    const key = `${row}-${col}`;
    blocks[key] = block;
  }
}

let direction = "right";

// keyboard event listener
addEventListener("keydown", (e) => {
  const map = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
  };
  if (map[e.key]) direction = map[e.key];
});

// start game
startBtn.addEventListener("click", () => {
  modal.style.display = "none";
  intervalId = setInterval(() => {
    render();
  }, 150);
});

timerId = setInterval(() => {
  let [min, sec] = time.split("-").map(Number);
  
  if (sec === 59) {
    min++;
    sec = 0;
  } else {
    sec++;
  }

  time = `${min}-${sec}`;
  timeElement.innerText = time;
}, 1000);

const render = () => {
  let head = null;

  const pallet = `${food.x}-${food.y}`;
  blocks[pallet].classList.add("food");
  
  // move snake from direction
  if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }
  // game over condition
  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    clearInterval(intervalId);
    gameStart.style.display = "none";
    gameOver.style.display = "flex";
  }
  
  //  food consume
  if (head.x == food.x && head.y == food.y) {
    const pallet = `${food.x}-${food.y}`;
    blocks[pallet].classList.remove("food");

    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };

    blocks[`${food.x}-${food.y}`].classList.add("food");
    snake.unshift(head);

    score++;
    scoreElement.innerText = score;
    
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore.toString());
    }
  }

  // snake movement
  snake.forEach((segment) => {
    const key = `${segment.x}-${segment.y}`;
    blocks[key].classList.remove("fill");
  });

  snake.unshift(head);
  snake.pop();

  // render snake
  snake.forEach((segment) => {
    const key = `${segment.x}-${segment.y}`;
    const cell = blocks[key];

    if (!cell) {
      console.warn("Invalid cell:", key);
      return;
    }
    cell.classList.add("fill");
  });
};

const restart = async () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  const foodKey = `${food.x}-${food.y}`;
  blocks[foodKey]?.classList.remove("food");

  await Promise.resolve().then(() => {
    snake.forEach((segment) => {
      const key = `${segment.x}-${segment.y}`;
      blocks[key]?.classList.remove("fill");
    });
  });
  
  score = 0;
  time = "00-00";

  scoreElement.innerText = score;
  timeElement.innerText = time;
  highScoreElement.innerText = highScore;

  gameOver.style.display = "none";

  snake = [{ x: 1, y: 3 }];

  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };
  
  blocks[`${food.x}-${food.y}`].classList.add("food");
  
  await Promise.resolve();
  intervalId = setInterval(render, 300);
};

restartBtn.addEventListener("click", restart);