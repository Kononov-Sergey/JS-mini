const slides = document.querySelectorAll(".slider__slide");

for (const slide of slides) {
  slide.addEventListener("click", () => {
    clearActiveClasses();
    slide.classList.add("active");
  });
}

function clearActiveClasses() {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
}

// drag and drop

function DragAndDrop() {
  const items = document.querySelectorAll(".item");

  const palaceHolders = document.querySelectorAll(".placeholder");
  for (let item of items) {
    item.addEventListener("dragstart", dragstart);
    item.addEventListener("dragend", dragend);
  }

  function dragstart(event) {
    event.target.classList.add("hold");
    setTimeout(() => event.target.classList.add("hide"), 0);
  }

  function dragend(event) {
    event.target.classList.remove("hold", "hide");
  }

  for (const placeholder of palaceHolders) {
    placeholder.addEventListener("dragover", dragover);
    placeholder.addEventListener("dragenter", dragenter);
    placeholder.addEventListener("dragleave", dragleave);
    placeholder.addEventListener("drop", dragdrop);
  }

  function dragover(event) {
    event.preventDefault();
    const activeElement = document.querySelector(`.hold`);
    event.target.append(activeElement);
  }

  function dragenter(event) {
    event.target.classList.add("hovered");
  }

  function dragleave(event) {
    event.target.classList.remove("hovered");
  }

  function dragdrop(event) {
    event.target.classList.remove("hovered");
  }
}
DragAndDrop();

const btnAdd = document.querySelector(".button_add");
const btnDel = document.querySelector(".button_del");

btnAdd.addEventListener("click", buttonAddHandler);
btnDel.addEventListener("click", buttonDelHandler);

function buttonAddHandler(event) {
  const containerForPlaceholders = document.querySelector(
    ".drag-drop__content"
  );

  const newRow = document.createElement("div");
  newRow.classList.add("row");
  newRow.innerHTML = `
    <div class="placeholder">
      <div class="item" draggable="true">Drag me!</div>
    </div>
    <div class="placeholder"></div>
    <div class="placeholder"></div>
  `;

  containerForPlaceholders.append(newRow);
  DragAndDrop();

  // window.scrollTo({
  //   top: event.target,
  //   behavior: "smooth",
  // });
}

function buttonDelHandler() {
  const rows = Array.from(document.querySelectorAll(".row"));
  if (rows.length > 1) {
    rows[rows.length - 1].remove();
  }
}

// Vertical slider

const upBtn = document.querySelector(".up-button");
const downBtn = document.querySelector(".down-button");

const sidebar = document.querySelector(".sidebar");

const mainSlide = document.querySelector(".main-slide");

const slidesCount = mainSlide.querySelectorAll("div").length;

sidebar.style.top = `-${(slidesCount - 1) * 100}vh`;

upBtn.addEventListener("click", () => {
  changeSlide("up");
});

downBtn.addEventListener("click", () => {
  changeSlide("down");
});

let activeSlideIndex = 0;

function changeSlide(direction) {
  if (direction === "up") {
    activeSlideIndex++;
    if (activeSlideIndex === slidesCount) {
      activeSlideIndex = 0;
    }
  }

  if (direction === "down") {
    activeSlideIndex--;
    if (activeSlideIndex < 0) {
      activeSlideIndex = slidesCount - 1;
    }
  }

  const height = document.querySelector(".vertical-slider__inner").clientHeight;

  mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`;
  sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`;
}

// Board

let hoverBoard = document.querySelector("#hoverBoard");
const hoverColors = ["#ffa439", "#ff7320", "#ff3e30", "#fd0e30", "#a4014a"];
const SQUARES_NUMBER = 400;

for (let i = 0; i < SQUARES_NUMBER; i++) {
  const square = document.createElement("div");
  square.classList.add("square");

  square.addEventListener("mouseover", () => {
    setColor(square);
  });

  square.addEventListener("mouseleave", () => {
    removeColor(square);
  });

  hoverBoard.append(square);
}

function setColor(element) {
  let color = getRandomColor(hoverColors);
  element.style.backgroundColor = color;
  element.style.boxShadow = `0 0 2px ${color}, 0 0 12px  ${color}`;
}

function removeColor(element) {
  element.style.backgroundColor = "#1d1d1d";
  element.style.boxShadow = "0 0 2px #000";
}




// aim game

const startBtn = document.querySelector(".btn-start");
const screens = document.querySelectorAll(".aim-game__screen");
const timeList = document.querySelector(".time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");

const aimColors = ["#DFF4F3", "#DDE7F2", "#B9BBDF", "#878ECD"];

let time = 0;
let score = 0;
let missScore = 0;
let decreaseTimeID;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = +event.target.getAttribute("data-time");
    screens[1].classList.add("up");
  }
  startGame();
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircule();
  }
  if (
    event.target.classList.contains("board") &&
    event.target.classList.contains("active")
  ) {
    event.target.classList.add("miss");
    setTimeout(() => event.target.classList.remove("miss"), 170);
    missScore++;
  }
});

function startGame() {
  board.classList.add("active");
  decreaseTimeID = setInterval(decreaseTime, 1000);
  createRandomCircule();
  createRandomCircule();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
    clearInterval(decreaseTimeID)
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function createRandomCircule() {
  const circule = document.createElement("div");
  const size = getRandomNumber(15, 60);
  const { width, height } = board.getBoundingClientRect();

  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circule.classList.add("circle");
  circule.style.width = size + "px";
  circule.style.height = size + "px";
  circule.style.top = y + "px";
  circule.style.left = x + "px";
  circule.style.background = getRandomColor(aimColors);
  board.append(circule);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function finishGame() {
  timeEl.parentElement.classList.add("hide");
  board.classList.remove("active");
  board.innerHTML = `<h1>Ваш счёт: <span>${score}</span></h1> <h2>Аккуратность: 
  ${score != 0 ? Math.floor((score / (score + missScore)) * 100) : 0}%</h2>`;
}

function getRandomColor(mass) {
  let index = Math.floor(Math.random() * mass.length);
  return mass[index];
}
