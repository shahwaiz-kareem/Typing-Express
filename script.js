const textContainer = document.getElementById("text-container");
const userInput = document.getElementById("inp");
const timer = document.getElementById("timer");
const switchBtn = document.getElementById("switch-btn");
const changeBtn = document.getElementById("change-btn");
const closeBtn = document.getElementById("close-btn");
const modal = document.getElementById("modal");

const resContainer = document.getElementById("result-container");

let textRandom = Math.floor(Math.random() * paragraphs.length);
let text = paragraphs[textRandom];
let i = 0;
let correctLetters = 0;
let wrongLetters = [];
let secCount = 0;
let interval;
let testStarted = false;

const setTextToContainer = () => {
  textContainer.innerHTML = "";
  text = paragraphs[textRandom];
  const displayText = text.trim().split(" ");
  displayText.forEach((word) => {
    word.split("").forEach((letter) => {
      textContainer.innerHTML += `<span class="letter-span" >${letter}</span>`;
    });
    textContainer.innerHTML += `<span class="letter-space" >${" "}</span>`;
  });
};
const showResult = () => {
  let difficultLetters = [];
  const arr = wrongLetters;
  for (let i = 0; i < arr.length; i++) {
    const letter = arr.splice(i, 1);
    if (arr.includes(letter[0])) difficultLetters.push(letter[0]);
  }
  difficultLetters = Array.from(new Set(difficultLetters));
  const speed = correctLetters / 5 / (secCount / 60);
  const accuracy = (correctLetters / text.length) * 100;
  const time = `${
    timer.innerText.split(":")[0] > 0
      ? timer.innerText.split(":")[0].concat(" minutes and ")
      : ""
  } ${timer.innerText.split(":")[1]} seconds`;
  resContainer.innerHTML = ` <div><strong>Typing Speed:</strong> <span>${speed.toFixed(
    0
  )} WPM </span></div>
  <div><strong>Accuracy:</strong> <span>${accuracy.toFixed(2)}% </span></div>
  <div><strong>Total words:</strong> <span>${
    text.split(" ").length
  }</span></div>
  <div><strong>Time Taken:</strong> <span>${time} </span></div>
  <div><strong>Total Mistakes:</strong> <span>${
    wrongLetters.length
  } </span></div>
  <div><strong>Letters you struggled with most:</strong> <span>${difficultLetters.join(
    " "
  )}</span></div>`;

  modal.show();
};

const resetApp = () => {
  timer.innerHTML = "00:00";
  i = 0;
  clearInterval(interval);
  userInput.value = "";
  correctLetters = 0;
  wrongLetters = [];
  secCount = 0;
  testStarted = false;
};

const switchTest = () => {
  testStarted = !testStarted;
  switchBtn.style.backgroundColor = testStarted ? "#b30202" : "green";
  if (testStarted) {
    let sec = 0;
    console.log(textContainer.children[0]);
    interval = setInterval(() => {
      timer.innerText = `${
        Math.floor(secCount / 60) < 10 ? "0" : ""
      }${Math.floor(secCount / 60)}:${sec < 10 ? "0" : ""}${sec}`;
      secCount++;
      sec < 60 ? sec++ : (sec = 0);
    }, 1000);
    setTextToContainer();
    resContainer.innerHTML = "";
    switchBtn.innerText = "Stop Test";
    userInput.removeAttribute("disabled");
    changeBtn.setAttribute("disabled", null);
    textContainer.children[0].classList.add("letter-styles");
  } else {
    showResult();
    ``;
    resetApp();
    switchBtn.innerText = "Start Test";
    userInput.setAttribute("disabled", null);
    changeBtn.removeAttribute("disabled");
  }
};

const changePara = () => {
  textRandom = Math.floor(Math.random() * paragraphs.length);
  resContainer.innerHTML = "";
  resetApp();
  setTextToContainer();
};

const closeModal = () => {
  modal.close();
};
setTextToContainer();
switchBtn.addEventListener("click", switchTest);
changeBtn.addEventListener("click", changePara);
closeBtn.addEventListener("click", closeModal);

userInput.addEventListener("input", (e) => {
  if (i === text.length - 1) return switchTest();
  const letter = textContainer.children[i].innerText;
  const inpLetter = e.target.value[i];
  const previousLetter = Array.from(textContainer.children)[i];
  const nextLetter = Array.from(textContainer.children)[i + 1];
  nextLetter.classList.add("letter-styles");

  if (letter === inpLetter) {
    textContainer.children[i].style.color = "green";
    correctLetters++;
    i++;
  } else if (inpLetter === undefined) {
    textContainer.children[i - 1].style.color = "white";
    textContainer.children[i - 1].classList.add("letter-styles");
    textContainer.children[i + 1].classList.remove("letter-styles");
    i != 0 && i--;
  } else {
    textContainer.children[i].style.color = "red";
    wrongLetters.push(letter);

    i++;
  }
  previousLetter.classList.remove("letter-styles");
});
