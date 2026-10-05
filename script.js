// ============================================================
//  ✏️ EDIT THIS PART — everything personal lives here
// ============================================================
const CONFIG = {
  herName: "Khanyisa 'Khanya' Conjwa",
  fromName: "Resego",

  // Put your photos in an "images" folder and list them here.
  // You can add the same photo twice, or add more later.
  photos: ["images/us1.jpeg", "images/us2.jpeg", "images/us3.jpeg"],

  letter: [
    "Hi my love,",
    "Thank you for showing me how much you like me. You made it so clear that you're serious about being with me, and it means more to me than I can say.",
    "I also see everything you do for me. Taking me to work and picking me up, going out of your way just to make my life easier. You do it without making a big deal of it, and I notice and appreciate every single time.",
    "I'm so excited to start this journey with you. I wish us so much fun, laughter and success, together and in everything we each want to achieve.",
    "Yes, a thousand times yes. I'm so happy to be your girlfriend.",
  ],

  reasons: [
    "You make me laugh when I least expect it",
    "You're so thoughtful",
    "You make me feel safe being exactly who I am ",
    "Your smile fixes bad days ",
    "You're kind to everyone you meet ",
    "Being around you just feels like home ",
    "You complete my weirdness! "
  ],

//   dates: [
//     "Picnic with way too many snacks 🧺",
//     "Cute café hopping, trying every dessert 🍰",
//     "Stargazing with a blanket and hot chocolate ✨",
//     "Matching painting night 🎨",
//     "Sunset walk and photos together 📸",
//     "Cook a new recipe together (messy is encouraged) 🍝",
//     "Movie marathon in blanket forts 🎬",
//   ],
};
// ============================================================

const $ = (id) => document.getElementById(id);

$("herName").textContent = CONFIG.herName;
$("fromName").textContent = CONFIG.fromName;

/* ---------- Drifting photo background ---------- */
function buildBackground() {
  const bg = $("bg");
  bg.innerHTML = "";
  const rowCount = window.innerWidth < 600 ? 3 : 4;
  const perSet = 10; // cards in one half of a track (enough to cover wide screens)

  for (let r = 0; r < rowCount; r++) {
    const row = document.createElement("div");
    row.className = "row";

    const track = document.createElement("div");
    track.className = "track";
    // Different speed per row so it feels alive
    track.style.setProperty("--dur", `${55 + r * 18}s`);

    // Build one half, then repeat it so the loop is seamless
    const half = [];
    for (let i = 0; i < perSet; i++) {
      const src = CONFIG.photos[(i + r) % CONFIG.photos.length];
      half.push({
        src,
        rot: (Math.random() * 12 - 6).toFixed(1),
        y: Math.round(Math.random() * 16 - 8),
      });
    }

    [...half, ...half].forEach((p) => track.appendChild(makePhoto(p)));
    row.appendChild(track);
    bg.appendChild(row);
  }
}

function makePhoto({ src, rot, y }) {
  const card = document.createElement("div");
  card.className = "photo";
  card.style.setProperty("--rot", `${rot}deg`);
  card.style.setProperty("--y", `${y}px`);

  const img = new Image();
  img.src = src;
  img.alt = "";
  img.onerror = () => {
    const ph = document.createElement("div");
    ph.className = "ph";
    ph.textContent = "💗";
    img.replaceWith(ph);
  };
  card.appendChild(img);
  return card;
}

buildBackground();
let lastWidth = window.innerWidth;
window.addEventListener("resize", () => {
  // Only rebuild if the layout class changes (avoids restarting on mobile scroll)
  if (lastWidth < 600 !== window.innerWidth < 600) buildBackground();
  lastWidth = window.innerWidth;
});

/* ---------- Heart bursts ---------- */
const EMOJIS = ["💖", "💗", "💕", "💘", "✨", "🌸", "🌈"];

function burst(x, y, n = 14) {
  for (let i = 0; i < n; i++) {
    const s = document.createElement("span");
    s.className = "pop";
    s.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 130;
    s.style.left = x + "px";
    s.style.top = y + "px";
    s.style.fontSize = 16 + Math.random() * 18 + "px";
    s.style.setProperty("--dx", Math.cos(angle) * dist + "px");
    s.style.setProperty("--dy", Math.sin(angle) * dist - 40 + "px");
    s.style.setProperty("--rot", Math.random() * 80 - 40 + "deg");
    document.body.appendChild(s);
    s.addEventListener("animationend", () => s.remove());
  }
}

function burstFromElement(el, n) {
  const r = el.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2, n);
}

// Tap anywhere for a little sparkle
document.addEventListener("click", (e) => {
  if (e.target.closest("button")) return;
  burst(e.clientX, e.clientY, 6);
});

// Gentle hearts floating up in the background
setInterval(() => {
  const h = document.createElement("span");
  h.className = "rise";
  h.textContent = ["💗", "💕", "🌸"][Math.floor(Math.random() * 3)];
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 14 + Math.random() * 16 + "px";
  h.style.setProperty("--t", 7 + Math.random() * 5 + "s");
  h.style.setProperty("--sway", Math.random() * 80 - 40 + "px");
  document.body.appendChild(h);
  h.addEventListener("animationend", () => h.remove());
}, 900);

/* ---------- The ticking boxes (auto, like she'll see it) ---------- */
setTimeout(() => {
  $("box").classList.add("checked");
  burstFromElement($("box"), 16);
}, 1200);

setTimeout(() => {
  $("box2").classList.add("checked");
  burstFromElement($("box2"), 10);
}, 1900);

/* ---------- Letter ---------- */
const letter = $("letter");
letter.innerHTML =
  CONFIG.letter
    .map((t, i) => `<p style="animation-delay:${i * 0.6}s">${t}</p>`)
    .join("") +
  `<p class="sign" style="animation-delay:${CONFIG.letter.length * 0.6}s">Your girlfriend 💕<br>${CONFIG.fromName}</p>`;

$("letterBtn").addEventListener("click", (e) => {
  const open = letter.hidden;
  letter.hidden = !open;
  e.target.textContent = open ? "Close my letter 💌" : "Open my letter 💌";
  if (open) {
    burstFromElement(e.target, 14);
    setTimeout(
      () => letter.scrollIntoView({ behavior: "smooth", block: "center" }),
      100,
    );
  }
});

/* ---------- Reasons (shuffled, cycles through all) ---------- */
function makeShuffler(list) {
  let pool = [];
  return () => {
    if (!pool.length) pool = [...list].sort(() => Math.random() - 0.5);
    return pool.pop();
  };
}

const nextReason = makeShuffler(CONFIG.reasons);
const nextDate = makeShuffler(CONFIG.dates);

function showBubble(el, text) {
  el.hidden = false;
  el.textContent = text;
  // restart the pop animation
  el.style.animation = "none";
  void el.offsetWidth;
  el.style.animation = "";
}

$("reasonBtn").addEventListener("click", (e) => {
  showBubble($("reasonBubble"), nextReason());
  burstFromElement(e.target, 10);
});




