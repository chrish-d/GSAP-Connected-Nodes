const container = document.getElementById("alumni");
const pathContainer = document.getElementById("paths");
const velocities = new Map();

// ====

function randomLeftTop(el, img) {
  const containerWidth = el.offsetWidth / 4;
  const containerHeight = el.offsetHeight / 4;
  const imageWidth = img.offsetWidth / 4;
  const imageHeight = img.offsetHeight / 4;
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
  movePath({ image }, image.dataset.index);

  requestAnimationFrame(() => {
    moveIt(image, bnd);
  });
}

// ====

function movePath({ image }, index) {
  const lines = document.querySelectorAll(`line[data-from='${index}']`);

  if (!(lines.length > 0)) {
    return;
  }

  const fromX = image.offsetLeft;
  const fromY = image.offsetTop;

  for (const line of lines) {
    const to = line.dataset.to;
    const {
      x: toX,
      y: toY,
      width: toWidth,
      height: toHeight,
    } = document
      .querySelector(`.box[data-index='${to}'`)
      .getBoundingClientRect();

    line.setAttribute("x1", fromX + image.offsetWidth / 2);
    line.setAttribute("y1", fromY + image.offsetHeight / 2);
    line.setAttribute("x2", toX + toWidth / 2);
    line.setAttribute("y2", toY + toHeight / 2);
  }
}

// ====

function connectNodes(from, to) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

  const start = from.getBoundingClientRect();
  const end = to.getBoundingClientRect();

  const startX = start.x;
  const startY = start.y;
  const endX = end.x;
  const endY = end.y;

  line.setAttribute("x1", startX);
  line.setAttribute("y1", startY);
  line.setAttribute("x2", endX);
  line.setAttribute("y2", endY);

  line.dataset.from = from.dataset.index;
  line.dataset.to = to.dataset.index;

  line.classList.add("path");

  pathContainer.appendChild(line);
}

// ====

const images = document.getElementsByClassName("box");
const imageContainer = document.getElementById("boxes");
let currentIndex = 1;

imageContainer.addEventListener("mouseover", function (event) {
  event.target.style.zIndex = ++currentIndex;
  event.target.style.borderWidth = 0;
});

for (const image of images) {
  const random = randomLeftTop(container, image);

  velocities.set(image, {
    x: 1 + Math.floor(Math.random() * 2 * (Math.random() < 0.5 ? -1 : 1)),
    y: 1 + Math.floor(Math.random() * 1 * (Math.random() < 0.5 ? -1 : 1)),
  });

  image.style.left = `${random.left}px`;
  image.style.top = `${random.top}px`;

  requestAnimationFrame(() => {
    moveIt(image, container);
  });

  if (image.dataset.connect) {
    const connectTo = image.dataset.connect;
    const fromNode = image;
    const toNode = images.item(connectTo);

    console.log(
      `Connecting [${fromNode.dataset.index}] to [${toNode.dataset.index}]`
    );

    requestAnimationFrame(() => {
      connectNodes(fromNode, toNode);
    });
  }
}
