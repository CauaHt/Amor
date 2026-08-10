const MEMORIES = [
  {
    id: "primeiro-encontro",
    title: "Obrigado",
    date: "03 de Março, 2090",
    image: "cheiro.jpg",
    video: null,
    message:
      "simplesmente o melhor cheiro do mundo, da mulher mais cheirosa do mundo, e que por sinal é minha namorada!!!!!!",
    pos: {
      desktop: { top: 18, left: 40, rotate: -3 },
      mobile: { top: 10, left: 66, rotate: -3 },
    },
  },
  {
    id: "primeira-viagem",
    title: "melhor forma de acordar",
    date: "22 de Julho, 2090",
    image: "dormida.jpeg",
    video: null,
    message: "Existe jeito melhor de acordar? depois desse dia eu desconheço",
    pos: {
      desktop: { top: 8, left: 62, rotate: 2.5 },
      mobile: { top: 22, left: 20, rotate: 2 },
    },
  },
  {
    id: "pedido-namoro",
    title: "KKKKKKKKK",
    date: "14 de Fevereiro, 2020",
    image: "peitin.jpg",
    video: null,
    message: "Rir do seu lado é sempre bom",
    pos: {
      desktop: { top: 34, left: 74, rotate: -2 },
      mobile: { top: 34, left: 70, rotate: -2.5 },
    },
  },
  {
    id: "primeira-casa",
    title: "Já disse que amo te cheirar ?",
    date: "10 de Julho, 2090",
    image: "memoria-4.jpg",
    video: "lanche.mp4",
    message: "QUE CHEIRO BOM, PAPO DE ACALMAR A MENTE!",
    pos: {
      desktop: { top: 55, left: 58, rotate: 3 },
      mobile: { top: 46, left: 16, rotate: 3 },
    },
  },
  {
    id: "casamento",
    title: "Saudade daquele Sorvete",
    date: "18 de Setembro, 2022",
    image: "memoria-5.jpg",

    video: "comida.mp4",
    message: "Tudo ao seu lado , tem um brilho diferente!",
    pos: {
      desktop: { top: 70, left: 40, rotate: -2.5 },
      mobile: { top: 60, left: 62, rotate: -3 },
    },
  },
  {
    id: "hoje",
    title: "Nós",
    date: "Todos os dias",
    image: "memoria-6.jpg",
    video: "teamo.mp4",
    message:
      "Essa é a minha forma de te amar, e é isso que eu quero que a gente seja, acima das diferenças, da falta de comunicação, dos desentendimentos, das brigas. Essa é a forma que eu vejo a gente, e é assim que eu quero e pretendo amar, cuidar e proteger. EU TE AMO, AMOR. Foram umas férias bobocas, mas é assim que a gente é, algo pra gente se lembrar, pois todo dia eu escolho você!",
    pos: {
      desktop: { top: 82, left: 68, rotate: 2 },
      mobile: { top: 74, left: 24, rotate: 2.5 },
    },
  },
];

/* =========================================================================
   A partir daqui é a lógica do site — normalmente não precisa ser editada.
   ========================================================================= */

const memoriesLayer = document.getElementById("memories-layer");
const modalOverlay = document.getElementById("modal-overlay");
const modalClose = document.getElementById("modal-close");
const modalMedia = document.getElementById("modal-media");
const modalDate = document.getElementById("modal-date");
const modalTitle = document.getElementById("modal-title");
const modalMessage = document.getElementById("modal-message");

function isMobile() {
  return window.matchMedia("(max-width: 900px)").matches;
}

/* Gera uma imagem de capa "de reserva" (gradiente + inicial) caso o
   caminho informado em "image" ainda não exista — assim o site já fica
   bonito antes de você trocar pelas fotos reais. */
function placeholderFor(memory, index) {
  const hues = [340, 20, 190, 265, 45, 150];
  const hue = hues[index % hues.length];
  const initial = memory.title.trim().charAt(0).toUpperCase();
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='240' height='300'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='hsl(${hue},35%,18%)'/>
          <stop offset='100%' stop-color='hsl(${hue + 20},30%,8%)'/>
        </linearGradient>
      </defs>
      <rect width='240' height='300' fill='url(#g)'/>
      <text x='50%' y='54%' font-family='Georgia, serif' font-style='italic'
            font-size='96' fill='hsl(${hue},55%,72%)' text-anchor='middle'
            dominant-baseline='middle' opacity='0.85'>${initial}</text>
    </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function renderMemories() {
  memoriesLayer.innerHTML = "";

  MEMORIES.forEach((memory, index) => {
    const layout = isMobile() ? memory.pos.mobile : memory.pos.desktop;

    const btn = document.createElement("button");
    btn.className = "memory-frame";
    btn.style.top = layout.top + "%";
    btn.style.left = layout.left + "%";
    btn.style.setProperty("--rot", layout.rotate + "deg");
    btn.style.animationDelay = index * 0.4 + "s";
    btn.setAttribute("aria-label", "Abrir memória: " + memory.title);

    const inner = document.createElement("span");
    inner.className = "frame-inner";

    const img = document.createElement("img");
    img.src = memory.image;
    img.alt = memory.title;
    img.loading = "lazy";
    img.onerror = () => {
      img.onerror = null;
      img.src = placeholderFor(memory, index);
    };

    const caption = document.createElement("span");
    caption.className = "frame-caption";
    caption.textContent = memory.title;

    inner.appendChild(img);
    btn.appendChild(inner);
    btn.appendChild(caption);

    btn.addEventListener("click", () => openModal(memory, index));

    memoriesLayer.appendChild(btn);
  });
}

function openModal(memory, index) {
  modalMedia.innerHTML = "";

  if (memory.video) {
    const video = document.createElement("video");
    video.src = memory.video;
    video.controls = true;
    video.playsInline = true;
    video.poster = memory.image;
    modalMedia.appendChild(video);
  } else {
    const img = document.createElement("img");
    img.src = memory.image;
    img.alt = memory.title;
    img.onerror = () => {
      img.onerror = null;
      img.src = placeholderFor(memory, index);
    };
    modalMedia.appendChild(img);
  }

  modalDate.textContent = memory.date;
  modalTitle.textContent = memory.title;
  modalMessage.textContent = memory.message;

  modalOverlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

function closeModal() {
  modalOverlay.classList.remove("is-open");
  document.body.style.overflow = "";
  // pausa qualquer vídeo tocando ao fechar
  const video = modalMedia.querySelector("video");
  if (video) video.pause();
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* Re-renderiza os quadros ao trocar de orientação/tamanho de tela,
   para usar o layout mobile ou desktop corretamente. */
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(renderMemories, 200);
});

/* =========================================================================
   PARTÍCULAS BRILHANTES FLUTUANDO PELA CENA
   ========================================================================= */
const treeLayer = document.getElementById("tree-layer");

function spawnParticle() {
  const p = document.createElement("div");
  p.className = "particle";
  const left = 5 + Math.random() * 55; // concentra perto da árvore
  const duration = 5 + Math.random() * 4;
  const drift = Math.random() * 60 - 30 + "px";
  p.style.left = left + "%";
  p.style.setProperty("--drift", drift);
  p.style.animationDuration = duration + "s";
  treeLayer.appendChild(p);
  setTimeout(() => p.remove(), duration * 1000 + 200);
}

setInterval(spawnParticle, 900);

/* inicializa */
renderMemories();
