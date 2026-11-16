// ==========================================
// 1. frrravor textos
// ==========================================
const FLAVOR_TEXTS = [
  "Ousezakmar has no taste.",
  "Why do You keep on going? the path of slow descent of your mind is unforgiving.",
  "The Ministry calls for their recruits, no response.",
  "When sucessfully parrying an attack, you gain parry frames, in which automatically parries any attack in a short amount of time.",
  "Boss attacks are telegraphed with sound queues, listen closely to know what to do.",
  "Sculk and Hollow infused gear each have their own new pips, some give extra damage, or whole new attacks.",
  "Eyes are of great importance to Compendium.",
  "pesky bird",
  "I met a greedy fox once.",
  "Who will pay the price, the lost or the damned, when nothing will open eyes like steel in my hand?",
  "🐟fih.",
  "The song played is 'Sunk Too Far' by Ianthine.",
  "The world of Compendium is divided into 3 times: Suffering, Living and Numb.",
  "Humans were the first Consciental Being to be known to wander the Living.",
  "'The First Light' as they call it, was the catalyst of existence as a whole.",
  "Humans and Zoanthropes were the only ones to have different civilizations across Compendium.",
  "Blacksmith's parents are nowhere to be seen or known of, like they never existed.",
  "Eloquium is one of the adopted children of the Dux family.",
  "The hollowing fever was very common in the Heri period.",
  "You're the only one that has the ability to 'respawn'.",
  "Revival is possible in Compendium, using advanced technology you are able to restore consciousness even if they are lost high above.",
  "The Ministry was first build as a rebel group against zoanthrope research.",
  "Everything has an end, including your journey."
];

// ===========================
// 1.2. eerie spooky bg words
// ===========================
const GHOST_PHRASES = [
  ["STEP BY STEP YOU BREAK THE GLASS"],
  ["NOWHERE", "EVERYWHERE"],
  ["EVEN IF I DIE", "I KNOW THE END IS NIGH"],
  ["I CANT", "I CANT", "I CANT", "I CANT", "I CANT", "I CANT", "I CANT", "I CANT", "I CANT", "I CANT", "I CANT", "I CANT", "I CANT"]
];

// ============================================
// 1.5. thank you ianthine for this masterpiece
// ============================================
const audio = document.getElementById('bg-audio');
const audioBtn = document.getElementById('audio-toggle-btn');
const audioIcon = document.getElementById('audio-icon');

let isPlaying = false;

window.addEventListener('DOMContentLoaded', () => {
  if (audio) {
    audio.play().then(() => {
      isPlaying = true;
      audio.muted = false;
      if (audioIcon) audioIcon.src = 'unmute.png';
    }).catch(err => {
      console.log("Autoplay blocked by browser. Music will start on first interaction.", err);
    });
  }
});

if (audioBtn) {
  audioBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    
    if (audio.paused) {
      audio.play().then(() => {
        isPlaying = true;
        audio.muted = false;
        audioIcon.src = 'unmute.png';
      }).catch(err => {
        console.log("Playback prevented:", err);
      });
    } else {
      audio.muted = !audio.muted;
      audioIcon.src = audio.muted ? 'mute.png' : 'unmute.png';
    }
  });
}

document.addEventListener('click', () => {
  if (!isPlaying && audio) {
    audio.play().then(() => {
      isPlaying = true;
      audio.muted = false;
      if (audioIcon) audioIcon.src = 'unmute.png';
    }).catch(err => {
      console.log("Autoplay blocked by browser policy:", err);
    });
  }
}, { once: true });

// ==========================================
// 2. creepy ahh choosement
// ==========================================
const letters = document.querySelectorAll(".center-prompt span");

function jitterLetters() {
  letters.forEach((letter) => {
    const x = (Math.random() * 12 - 6).toFixed(1);
    const y = (Math.random() * 14 - 7).toFixed(1);
    const rot = (Math.random() * 0 - 0).toFixed(1);
    letter.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
  });

  const nextDelay = Math.floor(Math.random() * 1000) + 1000;
  setTimeout(jitterLetters, nextDelay);
}

if (letters.length > 0) {
  jitterLetters();
}

// ==========================================
// 3. cycle le flavor text
// ==========================================
const flavorElement = document.getElementById("flavor-text");
let currentIndex = -1;

function setRandomFlavorText() {
  if (!FLAVOR_TEXTS.length || !flavorElement) return;

  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * FLAVOR_TEXTS.length);
  } while (FLAVOR_TEXTS.length > 1 && nextIndex === currentIndex);

  currentIndex = nextIndex;

  flavorElement.classList.add("fade-out");
  setTimeout(() => {
    flavorElement.textContent = FLAVOR_TEXTS[currentIndex];
    flavorElement.classList.remove("fade-out");
  }, 400);
}

if (flavorElement) {
  flavorElement.textContent = FLAVOR_TEXTS[Math.floor(Math.random() * FLAVOR_TEXTS.length)];
  setInterval(setRandomFlavorText, 10000);
}

// ==========================================
// 4. deepwoken ref
// ==========================================
const canvas = document.getElementById("cinders-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");

  let width, height;
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const cinders = [];
  const maxCinders = 35;

  class Cinder {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 50;
      this.size = Math.random() * 2.2 + 0.8;
      this.speedY = Math.random() * 0.8 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.4 + 0.1;
      this.maxAlpha = this.alpha;
      this.life = 0;
      this.maxLife = Math.random() * 300 + 200;
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.02) * 0.2;
      this.life++;

      if (this.y < height * 0.2 || this.life >= this.maxLife) {
        this.alpha -= 0.005;
      }

      if (this.y < -10 || this.alpha <= 0) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(this.x, this.y, this.size, this.size);
      ctx.restore();
    }
  }

  for (let i = 0; i < maxCinders; i++) {
    const cinder = new Cinder();
    cinder.y = Math.random() * height;
    cinders.push(cinder);
  }

  function animateCinders() {
    ctx.clearRect(0, 0, width, height);
    cinders.forEach((cinder) => {
      cinder.update();
      cinder.draw();
    });
    requestAnimationFrame(animateCinders);
  }

  animateCinders();
}

// ===================================================
// 4.5. more shit to tghe ghost shit i forgot lol lmao
// ===================================================
const ghostContainer = document.getElementById('ghost-container');

function spawnGhostPhrase() {
  if (!ghostContainer || !GHOST_PHRASES.length) return;

  const phraseLines = GHOST_PHRASES[Math.floor(Math.random() * GHOST_PHRASES.length)];
  
  const phraseEl = document.createElement('div');
  phraseEl.className = 'ghost-phrase';

  if (Math.random() < 0.5) {
    phraseEl.style.filter = 'url(#crunchy-pixel)';
  }

  const randomScaleY = (Math.random() * 1.8 + 0.6).toFixed(2);
  phraseEl.style.transform = `scaleY(${randomScaleY})`;
  phraseEl.style.transformOrigin = 'left top';

  const lineElements = [];
  phraseLines.forEach(text => {
    const lineEl = document.createElement('div');
    lineEl.className = 'ghost-line';
    lineEl.textContent = text;
    phraseEl.appendChild(lineEl);
    lineElements.push(lineEl);
  });

  const randomX = Math.random() * (window.innerWidth - 500);
  const randomY = Math.random() * (window.innerHeight - 200);

  phraseEl.style.left = `${Math.max(20, randomX)}px`;
  phraseEl.style.top = `${Math.max(20, randomY)}px`;

  ghostContainer.appendChild(phraseEl);

  lineElements.forEach((lineEl, index) => {
    setTimeout(() => {
      lineEl.classList.add('show');
    }, index * 300);
  });

  const totalDuration = (lineElements.length * 300) + 2000;

  setTimeout(() => {
    phraseEl.remove();
  }, totalDuration);

  const nextTime = Math.floor(Math.random() * 10000) + 10000;
  setTimeout(spawnGhostPhrase, nextTime);
}

if (ghostContainer) {
  setTimeout(spawnGhostPhrase, 2000);
}

// ==========================================
// 5 & 6. peak transition
// ==========================================
const chainsCanvas = document.getElementById('chains-canvas');
const vowCard = document.querySelector('.vow-card.active');
const videoOverlay = document.getElementById('video-overlay');
const transitionVideo = document.getElementById('transition-video');

let triggerVowChains = null;

if (chainsCanvas) {
  const cCtx = chainsCanvas.getContext('2d');
  let cw, ch;

  const sideImg = new Image();
  sideImg.src = 'chainside.png';
  const frontImg = new Image();
  frontImg.src = 'chainfront.png';

  let imagesLoaded = 0;
  const onImgLoad = () => {
    imagesLoaded++;
    if (imagesLoaded === 2) {
      initChains();
      requestAnimationFrame(animateChains);
    }
  };
  sideImg.onload = onImgLoad;
  frontImg.onload = onImgLoad;

  const mouse = { x: -9999, y: -9999, vx: 0, vy: 0, prevX: -9999, prevY: -9999 };
  window.addEventListener('mousemove', (e) => {
    if (mouse.prevX !== -9999) {
      mouse.vx = e.clientX - mouse.prevX;
      mouse.vy = e.clientY - mouse.prevY;
    }
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.prevX = e.clientX;
    mouse.prevY = e.clientY;
  });

  const LINK_CONFIG = {
    side: {
      redYRatio: 0.13,
      greenYRatio: 0.86,
      scale: 0.34
    },
    front: {
      redYRatio: 0.26,
      greenYRatio: 0.74,
      scale: 0.34
    }
  };

  class ChainNode {
    constructor(x, y, pinned = false) {
      this.x = x;
      this.y = y;
      this.oldX = x;
      this.oldY = y;
      this.pinned = pinned;
    }

    update(gravity, damping, wind, mouseRepel = true) {
      if (this.pinned) return;

      const vx = (this.x - this.oldX) * damping;
      const vy = (this.y - this.oldY) * damping;

      this.oldX = this.x;
      this.oldY = this.y;

      this.x += vx + wind;
      this.y += vy + gravity;

      if (mouseRepel) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 110 && dist > 0) {
          const force = (1 - dist / 110) * 1.4;
          this.x += (dx / dist) * force + mouse.vx * 0.04;
          this.y += (dy / dist) * force + mouse.vy * 0.04;
        }
      }
    }
  }

  class ChainStick {
    constructor(nodeA, nodeB, length, isFront) {
      this.nodeA = nodeA;
      this.nodeB = nodeB;
      this.length = length;
      this.isFront = isFront;
    }

    solve() {
      const dx = this.nodeB.x - this.nodeA.x;
      const dy = this.nodeB.y - this.nodeA.y;
      const dist = Math.hypot(dx, dy);
      if (dist === 0) return;

      const diff = (this.length - dist) / dist;
      const offsetX = dx * diff * 0.5;
      const offsetY = dy * diff * 0.5;

      if (!this.nodeA.pinned) {
        this.nodeA.x -= offsetX;
        this.nodeA.y -= offsetY;
      }
      if (!this.nodeB.pinned) {
        this.nodeB.x += offsetX;
        this.nodeB.y += offsetY;
      }
    }

    draw(ctx) {
      const img = this.isFront ? frontImg : sideImg;
      const cfg = this.isFront ? LINK_CONFIG.front : LINK_CONFIG.side;

      const drawW = img.width * cfg.scale;
      const drawH = img.height * cfg.scale;

      const redLocalY = drawH * cfg.redYRatio;
      const greenLocalY = drawH * cfg.greenYRatio;
      const spriteSpan = greenLocalY - redLocalY;

      const dx = this.nodeB.x - this.nodeA.x;
      const dy = this.nodeB.y - this.nodeA.y;
      const currentDist = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx) - Math.PI / 2;

      const stretchY = spriteSpan > 0 ? currentDist / spriteSpan : 1;

      ctx.save();
      ctx.translate(this.nodeA.x, this.nodeA.y);
      ctx.rotate(angle);
      ctx.scale(1, stretchY);
      ctx.drawImage(img, -drawW / 2, -redLocalY, drawW, drawH);
      ctx.restore();
    }
  }

  class CornerChain {
    constructor(startX, startY, endX, endY, slackMultiplier = 1.02, sagFactor = 0.04) {
      this.nodes = [];
      this.sticks = [];

      const sideSpan = sideImg.height * LINK_CONFIG.side.scale * (LINK_CONFIG.side.greenYRatio - LINK_CONFIG.side.redYRatio);
      const frontSpan = frontImg.height * LINK_CONFIG.front.scale * (LINK_CONFIG.front.greenYRatio - LINK_CONFIG.front.redYRatio);
      const avgSpan = (sideSpan + frontSpan) / 2;

      const chordDist = Math.hypot(endX - startX, endY - startY);
      const targetArcLength = chordDist * slackMultiplier;
      const numLinks = Math.max(4, Math.round(targetArcLength / avgSpan));

      for (let i = 0; i <= numLinks; i++) {
        const t = i / numLinks;
        const x = startX + (endX - startX) * t;
        const sag = Math.sin(t * Math.PI) * (chordDist * sagFactor);
        const y = startY + (endY - startY) * t + sag;
        const isPinned = (i === 0 || i === numLinks);
        this.nodes.push(new ChainNode(x, y, isPinned));
      }

      for (let i = 0; i < numLinks; i++) {
        const isFront = (i % 2 === 1);
        const linkLen = isFront ? frontSpan : sideSpan;
        this.sticks.push(new ChainStick(this.nodes[i], this.nodes[i + 1], linkLen, isFront));
      }
    }

    update(time, phaseOffset) {
      const wind = Math.sin(time * 0.0012 + phaseOffset) * 0.03;
      for (const node of this.nodes) {
        node.update(0.32, 0.985, wind, true);
      }
      for (let iter = 0; iter < 8; iter++) {
        for (const stick of this.sticks) {
          stick.solve();
        }
      }
    }

    draw(ctx) {
      for (const stick of this.sticks) {
        if (stick.isFront) stick.draw(ctx);
      }
      for (const stick of this.sticks) {
        if (!stick.isFront) stick.draw(ctx);
      }
    }
  }

  // Action Snap Chain shooting from Vow of Heart icon to a screen corner
  class SnapChain {
    constructor(originX, originY, targetX, targetY) {
      this.originX = originX;
      this.originY = originY;
      this.targetX = targetX;
      this.targetY = targetY;
      this.progress = 0;
      this.nodes = [];
      this.sticks = [];

      const sideSpan = sideImg.height * LINK_CONFIG.side.scale * (LINK_CONFIG.side.greenYRatio - LINK_CONFIG.side.redYRatio);
      const frontSpan = frontImg.height * LINK_CONFIG.front.scale * (LINK_CONFIG.front.greenYRatio - LINK_CONFIG.front.redYRatio);
      const avgSpan = (sideSpan + frontSpan) / 2;

      const dist = Math.hypot(targetX - originX, targetY - originY);
      const numLinks = Math.max(6, Math.round((dist * 1.01) / avgSpan));

      for (let i = 0; i <= numLinks; i++) {
        const isPinned = (i === 0 || i === numLinks);
        this.nodes.push(new ChainNode(originX, originY, isPinned));
      }

      for (let i = 0; i < numLinks; i++) {
        const isFront = (i % 2 === 1);
        const linkLen = isFront ? frontSpan : sideSpan;
        this.sticks.push(new ChainStick(this.nodes[i], this.nodes[i + 1], linkLen, isFront));
      }
    }

    update() {
      if (this.progress < 1) {
        this.progress = Math.min(1, this.progress + 0.075);
        const ease = 1 - Math.pow(1 - this.progress, 3);
        const tipX = this.originX + (this.targetX - this.originX) * ease;
        const tipY = this.originY + (this.targetY - this.originY) * ease;

        const lastNode = this.nodes[this.nodes.length - 1];
        lastNode.x = tipX;
        lastNode.y = tipY;

        for (let i = 1; i < this.nodes.length - 1; i++) {
          const t = i / (this.nodes.length - 1);
          const whipWave = Math.sin(t * Math.PI) * (1 - ease) * 35;
          this.nodes[i].x = this.originX + (tipX - this.originX) * t + whipWave;
          this.nodes[i].y = this.originY + (tipY - this.originY) * t - whipWave;
        }
      }

      for (const node of this.nodes) {
        node.update(0.18, 0.92, 0, false);
      }
      for (let iter = 0; iter < 12; iter++) {
        for (const stick of this.sticks) {
          stick.solve();
        }
      }
    }

    draw(ctx) {
      for (const stick of this.sticks) {
        if (stick.isFront) stick.draw(ctx);
      }
      for (const stick of this.sticks) {
        if (!stick.isFront) stick.draw(ctx);
      }
    }
  }

  let chains = [];
  let activeSnapChains = [];

  function initChains() {
    cw = chainsCanvas.width = window.innerWidth;
    ch = chainsCanvas.height = window.innerHeight;

    chains = [
      new CornerChain(-20, ch * 0.28, cw * 0.20, -20, 1.01, 0.03),
      new CornerChain(cw * 0.80, -20, cw + 20, ch * 0.28, 1.01, 0.03),
      new CornerChain(-30, ch * 0.65, cw * 0.30, ch + 30, 1.14, 0.16),
      new CornerChain(cw * 0.70, ch + 30, cw + 30, ch * 0.65, 1.14, 0.16)
    ];
  }

  window.addEventListener('resize', () => {
    if (imagesLoaded === 2) initChains();
  });

  triggerVowChains = (originX, originY, onComplete) => {
    activeSnapChains = [
      new SnapChain(originX, originY, -15, -15),         // Top-Left
      new SnapChain(originX, originY, cw + 15, -15),     // Top-Right
      new SnapChain(originX, originY, -15, ch + 15),     // Bottom-Left
      new SnapChain(originX, originY, cw + 15, ch + 15)  // Bottom-Right
    ];

    setTimeout(() => {
      if (onComplete) onComplete();
    }, 650);
  };

  function animateChains(time) {
    cCtx.clearRect(0, 0, cw, ch);

    // 1. Draw Background Corner Chains (Darkened)
    cCtx.save();
    cCtx.filter = 'brightness(0.55)';
    chains.forEach((chain, idx) => {
      chain.update(time, idx * 1.5);
      chain.draw(cCtx);
    });
    cCtx.restore();

    // 2. Draw Vow of Heart Snap Chains (Full Brightness - unaffected)
    if (activeSnapChains.length > 0) {
      cCtx.save();
      cCtx.filter = 'none';
      activeSnapChains.forEach((snapChain) => {
        snapChain.update();
        snapChain.draw(cCtx);
      });
      cCtx.restore();
    }

    mouse.vx *= 0.85;
    mouse.vy *= 0.85;

    requestAnimationFrame(animateChains);
  }
}

// =================
// voh click handler
// =================
let isTransitioning = false;

if (vowCard && videoOverlay && transitionVideo) {
  vowCard.addEventListener('click', (e) => {
    e.preventDefault();
    if (isTransitioning) return;
    isTransitioning = true;

    const iconEl = vowCard.querySelector('.icon-wrapper') || vowCard;
    const rect = iconEl.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const startVideo = () => {
      if (typeof audio !== 'undefined' && audio && !audio.paused) {
        audio.pause();
      }

      videoOverlay.style.display = 'flex';
      transitionVideo.currentTime = 0;
      transitionVideo.play().catch(err => {
        console.error("Error playing video:", err);
        window.location.href = vowCard.getAttribute('href');
      });
    };

    if (triggerVowChains) {
      triggerVowChains(originX, originY, startVideo);
    } else {
      startVideo();
    }
  });

  transitionVideo.addEventListener('ended', () => {
    window.location.href = vowCard.getAttribute('href');
  });
}