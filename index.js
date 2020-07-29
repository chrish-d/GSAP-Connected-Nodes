const container = document.getElementById("alumni");

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
  const vel = velocities.get(el);

  if (el.offsetLeft <= 0 && vel.x < 0) {
    vel.x = -1 * vel.x;
    console.log(`x`, vel.x);
  }

  if (el.offsetLeft + el.offsetWidth >= bnd.offsetWidth) {
    vel.x = -1 * vel.x;
    console.log(`x`, vel.x);
  }

  if (el.offsetTop <= 0 && vel.y < 0) {
    vel.y = -1 * vel.y;
    console.log(`y`, vel.y);
  }

  if (el.offsetTop + el.offsetHeight >= bnd.offsetHeight) {
    vel.y = -1 * vel.y;
    console.log(`y`, vel.y);
  }
}

// ====

function moveIt(image, bnd) {
  const vel = velocities.get(image);

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
      x: 1 + Math.floor(Math.random() * 3 * (Math.random() < 0.5 ? -1 : 1)),
      y: 1 + Math.floor(Math.random() * 2 * (Math.random() < 0.5 ? -1 : 1)),
    });

    image.style.left = `${random.left}px`;
    image.style.top = `${random.top}px`;

    moveIt(image, container);
  }
});
