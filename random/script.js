// 🎂 SET BIRTHDAY DATE (YYYY, MM-1, DD)
const birthday = new Date(2026, 0, 20);

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const message = document.getElementById("message");
const countdown = document.getElementById("countdown");
const title = document.getElementById("title");
const music = document.getElementById("bgMusic");
const tapHint = document.querySelector(".tap-hint");

// 🎵 Enable music on first tap
document.body.addEventListener("click", () => {
  music.muted = false;
  music.play();
  tapHint.style.display = "none";
}, { once: true });

function updateCountdown() {
  const now = new Date();
  const diff = birthday - now;

  if (diff <= 0) {
    countdown.style.display = "none";
    message.classList.remove("hidden");
    title.innerText = "🎉 It's Your Birthday! 🎉";
    startConfetti();
    return;
  }

  daysEl.innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
  hoursEl.innerText = Math.floor((diff / (1000 * 60 * 60)) % 24);
  minutesEl.innerText = Math.floor((diff / (1000 * 60)) % 60);
  secondsEl.innerText = Math.floor((diff / 1000) % 60);
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* 🎊 Confetti */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

function startConfetti() {
  for (let i = 0; i < 300; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 5 + 2,
      color: `hsl(${Math.random() * 360},100%,50%)`
    });
  }
  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fillStyle = c.color;
    ctx.fill();
    c.y += c.d;
    if (c.y > canvas.height) c.y = 0;
  });
  requestAnimationFrame(animateConfetti);
}
