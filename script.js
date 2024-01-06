window.location.hash = ""; // reset url

/* ----- CURSOR ------ */
const cursor = document.querySelector("[data-cursor]");
const clickElems = document.querySelectorAll("a, button");
window.addEventListener("mousemove", function (e) {
  const posX = e.clientX;
  const posY = e.clientY;

  cursor.animate(
    {
      left: `${posX}px`,
      top: `${posY}px`,
    },
    {duration: 200, fill: "forwards"}
  );
});

// POINTER
// Apply event listeners
clickElems.forEach((elem) => {
  elem.addEventListener("mouseenter", clickCursor);
  elem.addEventListener("mouseleave", normalCursor);
});

function clickCursor() {
  cursor.classList.add("cursor-scaled");
}

function normalCursor() {
  cursor.classList.remove("cursor-scaled");
}
/* ---------------------------------------------------------- */

/* ----- LAZY LOADING EFFECT ------ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});
const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

/* ----- SHOW PAGE ------ */
const pages = document.querySelectorAll("section");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
let pageIx = 1; // page index
prevBtn.classList.add("disabled");
prevBtn.addEventListener("click", () => showPage("prevBtn"));
nextBtn.addEventListener("click", () => showPage("nextBtn"));

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp") {
    // Simulate a click on the prevBtn
    showPage("prevBtn");
  } else if (event.key === "ArrowDown") {
    // Simulate a click on the nextBtn
    showPage("nextBtn");
  }
});

function showPage(buttonId) {
  let button = document.querySelector("#" + buttonId);
  switch (buttonId) {
    case "prevBtn":
      if (pageIx > 1) {
        pageIx--;
        button.href = "#page" + pageIx;
      }
      break;

    case "nextBtn":
      if (pageIx < pages.length) {
        pageIx++;
        button.href = "#page" + pageIx;
      }
      break;
  }

  window.location.hash = "page" + pageIx;

  checkArrows();
  arrowShadow();
  updateMenu();
  endSound();
}

function checkArrows() {
  if (pageIx == 1) {
    prevBtn.classList.add("disabled");
  } else if (pageIx == pages.length) {
    nextBtn.classList.add("disabled");
  } else {
    prevBtn.classList.remove("disabled");
    nextBtn.classList.remove("disabled");
  }
}

function arrowShadow() {
  let whitePages = [2, 3, 5];
  if (whitePages.includes(pageIx)) {
    prevBtn.classList.add("drop-shadow");
    nextBtn.classList.add("drop-shadow");
  } else {
    prevBtn.classList.remove("drop-shadow");
    nextBtn.classList.remove("drop-shadow");
  }
}

/* ----- MENU------ */
const menu = document.querySelector(".menu-wrap");
const menuItems = document.querySelectorAll("#menu-items li");
const showMenuBtn = document.querySelector("#menu-btn");
const closeMenuBtn = document.querySelector("#closeMenuBtn");

closeMenuBtn.addEventListener("click", hideMenu);
showMenuBtn.addEventListener("click", showMenu);

function showMenu() {
  menu.classList.add("show-menu");
  menu.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
}

function hideMenu() {
  menu.classList.remove("show-menu");
  menu.style.backgroundColor = "rgba(0, 0, 0, 0)";
}

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    let number = Number(item.getAttribute("data-page-nr"));
    pageIx = number;
    updateMenu();
    hideMenu();
    arrowShadow();
    checkArrows();
  });
});

function updateMenu() {
  let menuItem = document.querySelectorAll("#menu-items a");
  menuItem.forEach((item) => {
    item.classList.remove("active-menu");
  });
  switch (pageIx) {
    case 1:
      menuItem[0].classList.add("active-menu");
      break;
    case 2:
      menuItem[1].classList.add("active-menu");
      break;
    case 3:
    case 4:
      menuItem[2].classList.add("active-menu");
      break;
    case 5:
    case 6:
      menuItem[3].classList.add("active-menu");
      break;
    case 7:
    case 8:
      menuItem[4].classList.add("active-menu");
      break;
    case 9:
      menuItem[5].classList.add("active-menu");
      break;
  }
}
/* ---------------------------------------------------------- */

/* ----- SLIDERS ------ */
let apertureImg = document.querySelector("#aperture-img");
let isoImg = document.querySelector("#iso-img");
let shutterSpeedImg = document.querySelector("#shutter-speed-img");
let buttons = document.querySelectorAll(".slider-buttons button");
let shutterGroup = document.querySelectorAll(".shutter-group button");
let isoGroup = document.querySelectorAll(".iso-group button");
let apertureGroup = document.querySelectorAll(".aperture-group button");

buttons.forEach((button) => {
  if (button.classList.contains("iso-button")) {
    button.addEventListener("click", () => changeImage(isoImg, button));
  } else if (button.classList.contains("aperture-button")) {
    button.addEventListener("click", () => changeImage(apertureImg, button));
  } else if (button.classList.contains("shutter-speed-button")) {
    button.addEventListener("click", () => changeImage(shutterSpeedImg, button));
  }
});

function changeImage(imgElement, button) {
  let group;
  if (imgElement == isoImg) {
    group = isoGroup;
    activateBtn();
  } else if (imgElement == apertureImg) {
    apertureGroup.forEach((btn) => btn.classList.remove("active-shutter"));
    button.classList.add("active-shutter");
  } else if (imgElement == shutterSpeedImg) {
    group = shutterGroup;
    activateBtn();
  }

  let imgSrc = button.getAttribute("data-img-src");
  imgElement.src = imgSrc;

  function activateBtn() {
    group.forEach((btn) => btn.classList.remove("active-btn"));
    button.classList.add("active-btn");
  }
}

/* ---------------------------------------------------------- */
/* ----- TEST-BTNS ------ */
let testButtonDiv = document.querySelectorAll(".test-btns");

testButtonDiv.forEach((group) => {
  let buttons = group.querySelectorAll(".test-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      let correctAnswer = button.getAttribute("data-correct");
      switch (correctAnswer) {
        case "true":
          correctAnswerSound(true);
          removeAnswers(group); // Pass the group
          button.classList.add("correct-answer");
          disableWrongAnswers(group); // Pass the group
          break;
        case "false":
          correctAnswerSound(false);
          removeAnswers(group); // Pass the group
          button.classList.add("wrong-answer");
          break;
      }
    });
  });
});

function removeAnswers(group) {
  let buttons = group.querySelectorAll(".test-btn");
  buttons.forEach((button) => {
    button.classList.remove("correct-answer", "wrong-answer");
  });
}

function disableWrongAnswers(group) {
  let buttons = group.querySelectorAll(".test-btn");
  buttons.forEach((button) => {
    if (button.getAttribute("data-correct") === "false") {
      button.disabled = true;
      button.style.opacity = "0.5";
    }
  });
}
/* ---------------------------------------------------------- */
/* ----- SOUNDS ------ */
let soundBtn = document.querySelector("#sound");
let isSoundOn = true;
const soundOff = "img/icons/sound-off.svg";
const soundOn = "img/icons/sound-on.svg";
const buttonSound = new Audio("sounds/page.wav");
let correctAnswer = new Audio("../sounds/correct_answer.mp3");
let wrongAnswer = new Audio("../sounds/wrong_answer.mp3");

soundBtn.addEventListener("click", function () {
  isSoundOn = !isSoundOn;
  soundBtn.src = isSoundOn ? soundOn : soundOff;
});

function correctAnswerSound(correct) {
  if (isSoundOn) {
    switch (correct) {
      case true:
        correctAnswer.play();
        break;
      case false:
        wrongAnswer.play();
        break;
    }
  }
}

let hasPlayed = false; 
function endSound() {
  if (isSoundOn && pageIx == pages.length && !hasPlayed) {
    correctAnswer.play();
    hasPlayed = true;
  }
}

/* ---------------------------------------------------------- */
