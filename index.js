let velX = 3;
let velY = 2;
const container = document.getElementById("alumni");

// ====

function setRandomPosition() {
  const cntWidth = container.offsetWidth / 2;
  const cntWidthNeg = (container.offsetWidth / 2) * -1;

  const cntHeight = container.offsetHeight / 2;
  const cntHeightNeg = (container.offsetHeight / 2) * -1;

  const randWidth =
    Math.floor(Math.random() * (cntWidth - cntWidthNeg)) + cntWidthNeg;
  const randHeight =
    Math.floor(Math.random() * (cntHeight - cntHeightNeg)) + cntHeightNeg;

  const opts = {
    cntWidth: cntWidth,
    cntWidthNeg: cntWidthNeg,
    cntHeight: cntHeight,
    cntHeightNeg: cntHeightNeg,
    randWidth: randWidth,
    randHeight: randHeight,
  };

  return opts;
}

// ====

function hitBox(el, bnd) {
  if (el.offsetLeft <= 0 && velX < 0) {
    velX = -1 * velX;
  }

  if (el.offsetLeft + el.offsetWidth >= bnd.offsetWidth) {
    velX = -1 * velX;
  }

  if (el.offsetTop <= 0 && velY < 0) {
    velY = -1 * velY;
  }

  if (el.offsetTop + el.offsetHeight >= bnd.offsetHeight) {
    velY = -1 * velY;
  }
}

// ====

function moveIt(el, bnd) {
  hitBox(el, bnd);
  el.style.left = `${el.offsetLeft + velX}px`;
  el.style.top = `${el.offsetTop + velY}px`;

  setTimeout(() => {
    moveIt(el, bnd);
  }, 25);
}

// ====

document.addEventListener("DOMContentLoaded", function () {
  // 1. Find all of our images
  const images = document.getElementsByClassName("box");
  let image = null;

  // 2. Do some stuff to our images
  for (image of images) {
    // 1. Set a random position
    image.setAttribute(
      "style",
      `left: ${setRandomPosition("alumni").randWidth}px`
    );
    image.setAttribute(
      "style",
      `top: ${setRandomPosition("alumni").randHeight}px`
    );

    // 2. Animate random movement
    setTimeout(() => {
      moveIt(image, container);
    }, 25);
  }
});
