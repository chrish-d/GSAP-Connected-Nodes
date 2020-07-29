const container = document.getElementById("alumni");
let velX = 3;
let velY = 2;

// ====

function randomLeftTop(el, img) {
  const containerWidth = el.offsetWidth / 2;
  const containerHeight = el.offsetHeight / 2;
  const imageWidth = img.offsetWidth / 2;
  const imageHeight = img.offsetHeight / 2;
  return {
    left: Math.floor(Math.random() * (containerWidth - imageWidth)),
    top: Math.floor(Math.random() * (containerHeight - imageHeight)),
  };
}

// ====

function hitBox(el, bnd) {
  if (el.offsetLeft <= 0 && velX < 0) {
    velX = -1 * velX;
    console.log(`velX`, velX);
  }

  if (el.offsetLeft + el.offsetWidth >= bnd.offsetWidth) {
    velX = -1 * velX;
    console.log(`velX`, velX);
  }

  if (el.offsetTop <= 0 && velY < 0) {
    velY = -1 * velY;
    console.log(`velY`, velY);
  }

  if (el.offsetTop + el.offsetHeight >= bnd.offsetHeight) {
    velY = -1 * velY;
    console.log(`velY`, velY);
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
    const random = randomLeftTop(container, image);

    image.style.left = `${random.left}px`;
    image.style.top = `${random.top}px`;

    moveIt(image, container);
  }
});
