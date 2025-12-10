/* ========= STARFIELD BACKGROUND ========= */

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Star {
  constructor(isShooting = false) {
    this.reset(isShooting);
  }

  reset(isShooting) {
    this.isShooting = isShooting;
    const w = canvas.width;
    const h = canvas.height;

    if (isShooting) {
      this.x = Math.random() * w * 0.4;
      this.y = Math.random() * h * 0.3;
      const speed = Math.random() * 6 + 5;
      const angle = Math.PI / 3.2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.radius = 2.5;
    } else {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() * 0.3) - 0.15;
      this.vy = Math.random() * 0.35;
      this.radius = Math.random() * 1.8 + 0.4;
    }

    this.alpha = Math.random() * 0.6 + 0.4;
    this.baseAlpha = this.alpha;
    this.alphaChange = (Math.random() * 0.02) - 0.01;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    this.alpha += this.alphaChange;
    if (this.alpha < 0.1 || this.alpha > this.baseAlpha + 0.3) {
      this.alphaChange *= -1;
    }

    if (this.isShooting) {
      if (this.x > canvas.width + 60 || this.y > canvas.height + 60) {
        this.reset(false);
      }
    } else {
      if (
        this.y > canvas.height + 10 ||
        this.x < -10 ||
        this.x > canvas.width + 10
      ) {
        this.reset(false);
        this.y = -10;
      }
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;

    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.radius * 4
    );
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.4, "rgba(220, 240, 255, 0.8)");
    gradient.addColorStop(1, "rgba(0, 150, 255, 0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
    ctx.fill();

    if (this.isShooting) {
      ctx.globalAlpha *= 0.8;
      ctx.beginPath();
      ctx.moveTo(this.x - this.vx * 2, this.y - this.vy * 2);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = "rgba(200, 245, 255, 0.9)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    ctx.restore();
  }
}

let stars = [];
const STAR_COUNT = 130;

function initStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push(new Star(false));
  }
}
initStars();

setInterval(() => {
  const index = Math.floor(Math.random() * stars.length);
  stars[index].reset(true);
}, 1400);

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const star of stars) {
    star.update();
    star.draw();
  }
  requestAnimationFrame(animateStars);
}
animateStars();


/* ========= QUOTES (OSHO) ========= */

const quotes = [
  "Be — don’t try to become.",
  "The real question is not whether life exists after death. The real question is whether you are alive before death.",
  "Truth is not something outside to be discovered, it is something inside to be realized.",
  "Love is the goal, life is the journey.",
  "Meditation is the only magic in the world and the only miracle.",
  "Courage is a love affair with the unknown.",
  "If you love a flower, let it be. Love is not about possession.",
  "Drop the idea of becoming someone, because you are already a masterpiece."
];

const quoteTextEl = document.getElementById("quote-text");
const quoteDotsEl = document.getElementById("quote-dots");
let quoteIndex = 0;

function renderQuote() {
  quoteTextEl.textContent = "“" + quotes[quoteIndex] + "”";

  let dots = "";
  for (let i = 0; i < quotes.length; i++) {
    dots += i === quoteIndex ? "● " : "○ ";
  }
  quoteDotsEl.textContent = dots.trim();
}

function nextQuote() {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  renderQuote();
}
renderQuote();
setInterval(nextQuote, 6000);


/* ========= SCROLL REVEAL ========= */

const revealEls = document.querySelectorAll(".reveal");

function handleReveal() {
  const triggerBottom = window.innerHeight * 0.86;

  revealEls.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", handleReveal);
window.addEventListener("load", handleReveal);


/* ========= BACK TO TOP ========= */

const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTopBtn.style.display = window.scrollY > 400 ? "block" : "none";
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* ========= PARALLAX ORBS (MOUSE MOVE) ========= */

const layers = document.querySelectorAll(".parallax-layer");

window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth) - 0.5;
  const y = (e.clientY / window.innerHeight) - 0.5;

  layers.forEach((layer) => {
    const depth = parseFloat(layer.dataset.depth || "0.1");
    const moveX = -x * depth * 40;
    const moveY = -y * depth * 40;
    layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
  });
});


/* ========= GALLERY SLIDER ========= */

const galleryData = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/0/00/Osho-portrait.jpg",
    caption: "Osho in silent presence during a discourse."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Osho_1970s.jpg/320px-Osho_1970s.jpg",
    caption: "Early years of talks and meditation camps in India."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Osho_in_usa.jpg/320px-Osho_in_usa.jpg",
    caption: "Osho during the Rajneeshpuram years in the United States."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Osho_rajneesh_neo_sannyasins.jpg/320px-Osho_rajneesh_neo_sannyasins.jpg",
    caption: "Meditators gathered around Osho in celebration and silence."
  }
];

const galleryImg = document.getElementById("galleryImg");
const galleryCaption = document.getElementById("galleryCaption");
const prevImgBtn = document.getElementById("prevImg");
const nextImgBtn = document.getElementById("nextImg");

let galleryIndex = 0;

function updateGallery() {
  const item = galleryData[galleryIndex];
  galleryImg.src = item.src;
  galleryCaption.textContent = item.caption;
}
updateGallery();

prevImgBtn.addEventListener("click", () => {
  galleryIndex = (galleryIndex - 1 + galleryData.length) % galleryData.length;
  updateGallery();
});
nextImgBtn.addEventListener("click", () => {
  galleryIndex = (galleryIndex + 1) % galleryData.length;
  updateGallery();
});


/* ========= AUDIO PLAYER ========= */

const audio = document.getElementById("medAudio");
const playPauseBtn = document.getElementById("playPauseBtn");
const audioBar = document.querySelector(".audio-bar");
const audioProgress = document.getElementById("audioProgress");
const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");

function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

audio.addEventListener("loadedmetadata", () => {
  totalTimeEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  currentTimeEl.textContent = formatTime(audio.currentTime);
  const pct = (audio.currentTime / audio.duration) * 100;
  audioProgress.style.width = `${pct || 0}%`;
});

playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶";
  }
});

audioBar.addEventListener("click", (e) => {
  const rect = audioBar.getBoundingClientRect();
  const ratio = (e.clientX - rect.left) / rect.width;
  audio.currentTime = ratio * audio.duration;
});

window.addEventListener("beforeunload", () => {
  audio.pause();
});


/* ========= ACCORDION ========= */

const accItems = document.querySelectorAll(".acc-item");

accItems.forEach((item) => {
  const header = item.querySelector(".acc-header");
  header.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    accItems.forEach((i) => i.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  });
});
