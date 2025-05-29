document.addEventListener("DOMContentLoaded", function () {
  const sliderContainer = document.querySelector(".slider-container");
  const slides = document.querySelectorAll(".slide");

  let moveSpeed = 50; // Scroll speed per frame
  let animation;

  function startScrolling(direction) {
    stopScrolling(); // Ensure we don't stack animations

    let containerRect = sliderContainer.getBoundingClientRect();
    let parentRect = sliderContainer.parentElement.getBoundingClientRect();

    if (direction === "left" && containerRect.left >= parentRect.left) {
      return; // Stop scrolling if at the left edge
    }

    if (direction === "right" && containerRect.right <= parentRect.right) {
      return; // Stop scrolling if at the right edge
    }

    animation = gsap.to(sliderContainer, {
      x: direction === "left" ? "+=" + moveSpeed : "-=" + moveSpeed,
      duration: 0.1,
      ease: "linear",
      repeat: -1,
    });
  }

  function stopScrolling() {
    gsap.killTweensOf(sliderContainer);
  }

  // Detect mouse movement to left or right within 10px of edges
  document.addEventListener("mousemove", function (e) {
    if (e.clientX <= 10) {
      startScrolling("left");
    } else if (e.clientX >= window.innerWidth - 10) {
      startScrolling("right");
    } else {
      stopScrolling();
    }
  });
});
