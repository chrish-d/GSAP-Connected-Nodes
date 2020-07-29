const container = document.getElementById("alumni");
let velX = 3;
let velY = 2;

const velocities = new Map();

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
  let velX = velocities.x;
  let velY = velocities.y;

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

function moveIt(image, bnd) {
  const vel = velocities.get(image);
  console.log(vel);

  hitBox(image, bnd);
  image.style.left = `${image.offsetLeft + vel.x}px`;
  image.style.top = `${image.offsetTop + vel.y}px`;

  setTimeout(() => {
    moveIt(image, bnd);
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

    velocities.set(image, {
      x: 1 + Math.floor(Math.random() * 3),
      y: 1 + Math.floor(Math.random() * 2),
    });

    image.style.left = `${random.left}px`;
    image.style.top = `${random.top}px`;

    moveIt(image, container);
  }

  // console.log(velocities);
});
