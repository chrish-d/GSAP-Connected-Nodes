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
  }

  if (el.offsetLeft + el.offsetWidth >= bnd.offsetWidth) {
    vel.x = -1 * vel.x;
  }

  if (el.offsetTop <= 0 && vel.y < 0) {
    vel.y = -1 * vel.y;
  }

  if (el.offsetTop + el.offsetHeight >= bnd.offsetHeight) {
    vel.y = -1 * vel.y;
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

function connectNodes(from, to, path) {
  const start = from.getBoundingClientRect();
  const end = to.getBoundingClientRect();

  const startX = start.x;
  const startY = start.y;
  const endX = end.x;
  const endY = end.y;

  path.setAttribute("d", `M${startY} ${startX} L${endY} ${endX}`);

  console.log('start', start);
  console.log('end', end);
}

// ====

document.addEventListener("DOMContentLoaded", function () {
  // 1. Find all of our images
  const images = document.getElementsByClassName("box");

  // let count = 0;
  for (const image of images) {
    // 2. Position them at random, and animate their left/top
    //    properties within a boundary
    const random = randomLeftTop(container, image);

    velocities.set(image, {
      x: 1 + Math.floor(Math.random() * 2 * (Math.random() < 0.5 ? -1 : 1)),
      y: 1 + Math.floor(Math.random() * 1 * (Math.random() < 0.5 ? -1 : 1)),
    });

    image.style.left = `${random.left}px`;
    image.style.top = `${random.top}px`;

    // moveIt(image, container);

    const pathA = document.querySelector(".pathA");

    if (image.dataset.connect) {
      const connectTo = image.dataset.connect;
      const fromNode = image;
      const toNode = images.item(connectTo);

      console.log(
        `connecting ${fromNode.dataset.index} to ${toNode.dataset.index}`
      );

      console.log(toNode);

      connectNodes(fromNode, toNode, pathA);
    }
  }
});
