// Viewport and progress bar functions
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect()
  return rect.top < window.innerHeight && rect.bottom >= 0
}

function animateProgressBars() {
  document.querySelectorAll("#skills .progress-bar").forEach((bar) => {
    const width = bar.getAttribute("data-width")
    bar.style.width = width
  })
}

function resetProgressBars() {
  document.querySelectorAll("#skills .progress-bar").forEach((bar) => {
    bar.style.width = "0"
  })
}

function checkVisibility() {
  document.querySelectorAll("#hero, #about, #skills, #projects, #schools, #contact").forEach((section) => {
    if (isElementInViewport(section)) {
      section.classList.add("visible")
      if (section.id === "skills") animateProgressBars()
    } else {
      section.classList.remove("visible")
      if (section.id === "skills") resetProgressBars()
    }
  })
}

window.addEventListener("scroll", checkVisibility)
checkVisibility()

// Slideshow functionality
let currentSlideIndex = 1
const slideshowImages = [
  "https://github.com/abcde100/cris-abcde-cristobal/blob/main/Screenshot%202025-08-19%20114758.png?raw=true",
  "https://github.com/abcde100/cris-abcde-cristobal/blob/main/Screenshot%202025-08-19%20114703.png?raw=true",
  "https://github.com/abcde100/cris-abcde-cristobal/blob/main/Screenshot%202025-08-19%20114857.png?raw=true",
]

function openSlideshow() {
  document.getElementById("slideshowModal").style.display = "block"
  document.body.style.overflow = "hidden"
  showSlide(currentSlideIndex)
}

function closeSlideshow() {
  document.getElementById("slideshowModal").style.display = "none"
  document.body.style.overflow = "auto"
}

function changeSlide(direction) {
  currentSlideIndex += direction
  if (currentSlideIndex > slideshowImages.length) {
    currentSlideIndex = 1
  }
  if (currentSlideIndex < 1) {
    currentSlideIndex = slideshowImages.length
  }
  showSlide(currentSlideIndex)
}

function currentSlide(index) {
  currentSlideIndex = index
  showSlide(currentSlideIndex)
}

function showSlide(index) {
  const image = document.getElementById("slideshowImage")
  const counter = document.getElementById("slideCounter")
  const dots = document.querySelectorAll(".slideshow-dot")

  image.src = slideshowImages[index - 1]
  counter.textContent = `${index} / ${slideshowImages.length}`

  dots.forEach((dot) => dot.classList.remove("active"))
  dots[index - 1].classList.add("active")
}

// Close slideshow when clicking outside the image
document.getElementById("slideshowModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeSlideshow()
  }
})

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (document.getElementById("slideshowModal").style.display === "block") {
    if (e.key === "ArrowLeft") {
      changeSlide(-1)
    } else if (e.key === "ArrowRight") {
      changeSlide(1)
    } else if (e.key === "Escape") {
      closeSlideshow()
    }
  }
})
