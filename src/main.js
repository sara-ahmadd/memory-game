let nameSpan = document.querySelector(".data #name");
let scoreSpan = document.querySelector(".data #score");
let nameInputField = document.querySelector('input[type="text"]');
let submit = document.querySelector('input[type="submit"]');
let overlay = document.querySelector(".container");
let blockContainer = document.querySelector(".container .block-of-images");
let imageBlocks = Array.from(blockContainer.children);


submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (nameInputField.value !== "") {
    overlay.classList.add("none");
    nameSpan.innerText = nameInputField.value;
    document.querySelector("#ready").play();
    nameInputField.value = "";
  }
});

//function to get random order for images in images block
function randomInteger(maxValue) {
  return Math.floor(Math.random() * maxValue);
}

imageBlocks.forEach((image) => {
  image.style.order = randomInteger(imageBlocks.length);
  image.addEventListener("click", () => {
    flip(image);
  });
});

let rightAnswer = 0,
  flippdArray = [];

function flip(element) {
  element.classList.add("flipped");
  flippdArray.push(element);
  if (flippdArray.length === 2) {
    stopClick();
    checkSimilarImages(flippdArray[0], flippdArray[1]);
  }
}

let time = 1000;

function stopClick() {
  blockContainer.classList.add("no-click");
  setTimeout(() => {
    blockContainer.classList.remove("no-click");
  }, time);
}

function checkSimilarImages(first, second) {
  if (first.dataset.name === second.dataset.name) {
    document.querySelector("#succes").play();
    rightAnswer++;
    if (rightAnswer === 8) {
      document.querySelector(".completed").style.display = "flex";
      document.querySelector("#wow").play();
    }
    scoreSpan.innerHTML = `${rightAnswer}`;
    first.classList.replace("flipped", "matched");
    second.classList.replace("flipped", "matched");
    flippdArray = [];
  } else {
    document.querySelector("#fail").play();
    setTimeout(() => {
      first.classList.remove("flipped");
      second.classList.remove("flipped");
      flippdArray = [];
    }, time);
  }
}
