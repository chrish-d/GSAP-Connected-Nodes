import gsap from "gsap";

// ====
// This controls the linking lines

window.addEventListener("load", function () {
  const pathA = document.querySelector(".pathA");
  const textA = document.querySelector(".textA");
  const pathB = document.querySelector(".pathB");
  const textB = document.querySelector(".textB");
  const pathC = document.querySelector(".pathC");

  const aToB = () => {
    const coordsA = boxA.getBoundingClientRect();
    const coordsB = boxB.getBoundingClientRect();

    const axCenter = coordsA.x + coordsA.width / 2;
    const ayCenter = coordsA.y + coordsA.height / 2;
    const bxCenter = coordsB.x + coordsB.width / 2;
    const byCenter = coordsB.y + coordsB.width / 2;
    pathA.setAttribute(
      "d",
      `
      M${bxCenter} ${byCenter}
      L${axCenter} ${ayCenter}
    `
    );

    textA.setAttribute("x", `${coordsA.x / 2}px`);
  };

  const bToC = () => {
    const coordsA = boxB.getBoundingClientRect();
    const coordsB = boxC.getBoundingClientRect();

    const axCenter = coordsA.x + coordsA.width / 2;
    const ayCenter = coordsA.y + coordsA.height / 2;
    const bxCenter = coordsB.x + coordsB.width / 2;
    const byCenter = coordsB.y + coordsB.width / 2;
    pathB.setAttribute(
      "d",
      `
      M${bxCenter} ${byCenter}
      L${axCenter} ${ayCenter}
    `
    );

    textB.setAttribute("x", `${coordsA.x * 1.1}px`);
  };

  const CtoA = () => {
    const coordsA = boxC.getBoundingClientRect();
    const coordsB = boxA.getBoundingClientRect();

    const axCenter = coordsA.x + coordsA.width / 2;
    const ayCenter = coordsA.y + coordsA.height / 2;
    const bxCenter = coordsB.x + coordsB.width / 2;
    const byCenter = coordsB.y + coordsB.width / 2;
    pathC.setAttribute(
      "d",
      `
      M${bxCenter} ${byCenter}
      L${axCenter} ${ayCenter}
    `
    );
  };

  // ====
  // This is for all of the box animations

  const boxes = document.getElementsByClassName("box");
  const boxA = boxes.item(0);
  const boxB = boxes.item(1);
  const boxC = boxes.item(2);

  const tlA = gsap.timeline({
    onUpdate: aToB,
    repeat: -1,
  });

  tlA
    // Snap to an initial position
    // loop through positions until we get
    // back to the inital position again
    .to(boxA, {
      ease: "none",
      duration: 0,
      x: "10%",
      y: "10%",
    })
    .to(boxA, {
      ease: "none",
      duration: 4,
      x: "30%",
      y: "0%",
    })
    .to(boxA, {
      ease: "none",
      duration: 4,
      x: "50%",
      y: "10%",
    })
    .to(boxA, {
      ease: "none",
      duration: 4,
      x: "70%",
      y: "20%",
    })
    .to(boxA, {
      ease: "none",
      duration: 4,
      x: "90%",
      y: "30%",
    })
    .to(boxA, {
      ease: "none",
      duration: 2,
      x: "100%",
      y: "35%",
    })
    .to(boxA, {
      ease: "none",
      duration: 12,
      x: "50%",
      y: "100%",
    })
    .to(boxA, {
      ease: "none",
      duration: 12,
      x: "10%",
      y: "10%",
    });

  const tlB = gsap.timeline({
    onUpdate: bToC,
    repeat: -1,
  });

  tlB
    // Snap to an initial position
    // loop through positions until we get
    // back to the inital position again
    .to(boxB, {
      ease: "none",
      duration: 0,
      x: "100%",
      y: "100%",
    })
    .to(boxB, {
      ease: "none",
      duration: 8,
      x: "50%",
      y: "75%",
    })
    .to(boxB, {
      ease: "none",
      duration: 8,
      x: "60%",
      y: "55%",
    })
    .to(boxB, {
      ease: "none",
      duration: 6,
      x: "80%",
      y: "85%",
    })
    .to(boxB, {
      ease: "none",
      duration: 4,
      x: "100%",
      y: "100%",
    });

  const tlC = gsap.timeline({
    onUpdate: CtoA,
    repeat: -1,
  });

  tlC
    // Snap to an initial position
    // loop through positions until we get
    // back to the inital position again
    .to(boxC, {
      ease: "none",
      duration: 0,
      x: "0%",
      y: "100%",
    })
    .to(boxC, {
      ease: "none",
      duration: 16,
      x: "80%",
      y: "125%",
    })
    .to(boxC, {
      ease: "none",
      duration: 8,
      x: "55%",
      y: "55%",
    })
    .to(boxC, {
      ease: "none",
      duration: 6,
      x: "30%",
      y: "75%",
    })
    .to(boxC, {
      ease: "none",
      duration: 4,
      x: "0%",
      y: "100%",
    });
});
