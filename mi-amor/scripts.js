/* ============================================
   CONFIGURACIÓN — edita esto libremente
   ============================================ */
const CONFIG = {
  // Fecha de aniversario (mes es 0-indexado: enero=0)
  fechaInicio: new Date(2024, 3, 1), // 1 de abril de 2024

  // Razones para amarte — el sello revela una cada vez, sin repetir
  // hasta que se acaben, y entonces vuelve a barajar.
  razones: [
    "Porque conviertes cualquier lugar en el favorito con solo estar ahí.",
    "Porque tu risa es la prueba de que las cosas buenas sí existen.",
    "Porque me escuchas incluso cuando no encuentro las palabras.",
    "Porque contigo hasta los días comunes se sienten importantes.",
    "Porque nunca dejas de sorprenderme, ni siquiera después de tanto tiempo.",
    "Porque tu forma de cuidar a los que quieres es un lenguaje propio.",
    "Porque sigues eligiéndome, un día a la vez.",
    "Porque contigo aprendí que el amor también es calma.",
    "Porque haces que lo cotidiano se sienta como un hogar.",
    "Porque cada aniversario contigo se siente como el primero.",
  ],
};

/* ============================================
   FECHA DE ENCABEZADO
   ============================================ */
function pintarDateline() {
  const hoy = new Date();
  const texto = hoy.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const el = document.getElementById("dateline");
  if (el) el.textContent = texto.charAt(0).toUpperCase() + texto.slice(1);
}

/* ============================================
   TIEMPO JUNTOS
   ============================================ */
function actualizarTiempoJuntos() {
  const inicio = CONFIG.fechaInicio;
  const hoy = new Date();

  let años = hoy.getFullYear() - inicio.getFullYear();
  let meses = hoy.getMonth() - inicio.getMonth();
  let dias = hoy.getDate() - inicio.getDate();

  if (dias < 0) {
    meses--;
    const ultimoMes = new Date(hoy.getFullYear(), hoy.getMonth(), 0);
    dias += ultimoMes.getDate();
  }
  if (meses < 0) {
    años--;
    meses += 12;
  }

  const h1 = document.getElementById("titulo-amor");
  if (h1) {
    h1.textContent = `Feliz ${años} año${años !== 1 ? "s" : ""}, ${meses} mes${meses !== 1 ? "es" : ""} y ${dias} día${dias !== 1 ? "s" : ""} juntos.`;
  }
}
actualizarTiempoJuntos();
setInterval(actualizarTiempoJuntos, 1000 * 60 * 60);

/* ============================================
   CUENTA REGRESIVA AL PRÓXIMO ANIVERSARIO
   ============================================ */
function actualizarCuentaRegresiva() {
  const hoy = new Date();
  const inicio = CONFIG.fechaInicio;

  let proximo = new Date(hoy.getFullYear(), inicio.getMonth(), inicio.getDate());
  // normalizar a medianoche para contar días completos
  proximo.setHours(0, 0, 0, 0);
  const hoyMedianoche = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

  if (proximo.getTime() < hoyMedianoche.getTime()) {
    proximo = new Date(hoy.getFullYear() + 1, inicio.getMonth(), inicio.getDate());
  }

  const msPorDia = 1000 * 60 * 60 * 24;
  const diasFaltantes = Math.round((proximo.getTime() - hoyMedianoche.getTime()) / msPorDia);

  const numEl = document.getElementById("countdown-num");
  const ticket = document.getElementById("ticket");
  if (numEl) {
    if (diasFaltantes === 0) {
      numEl.textContent = "🎉";
      if (ticket) ticket.querySelector(".ticket-sub").textContent = "¡es hoy!";
    } else {
      numEl.textContent = diasFaltantes;
    }
  }
}
actualizarCuentaRegresiva();
setInterval(actualizarCuentaRegresiva, 1000 * 60 * 60);

/* ============================================
   PÉTALOS AMBIENTALES (SVG, sutiles)
   ============================================ */
const petalsContainer = document.getElementById("petals");
const isMobile = window.matchMedia("(max-width: 600px)").matches;

const petalColors = ["#7d1f2b", "#a5333f", "#c48a8f", "#a9834f"];

function petalSVG(color) {
  return `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 1c4 3 8 6 8 10a8 8 0 0 1-16 0c0-4 4-7 8-10z" fill="${color}"/>
  </svg>`;
}

function createPetal() {
  if (!petalsContainer) return;
  const petal = document.createElement("div");
  petal.classList.add("petal");
  const color = petalColors[Math.floor(Math.random() * petalColors.length)];
  petal.innerHTML = petalSVG(color);

  const size = isMobile ? 10 + Math.random() * 8 : 12 + Math.random() * 12;
  petal.style.width = size + "px";
  petal.style.height = size + "px";
  petal.style.left = Math.random() * 100 + "vw";

  const duration = 10 + Math.random() * 8;
  petal.style.animationDuration = duration + "s";
  petal.style.setProperty("--drift", (Math.random() * 120 - 60) + "px");

  petalsContainer.appendChild(petal);
  setTimeout(() => petal.remove(), duration * 1000 + 200);
}

// ambiente ligero, no un chorro constante
const petalInterval = isMobile ? 3200 : 2200;
setInterval(createPetal, petalInterval);
for (let i = 0; i < 4; i++) setTimeout(createPetal, i * 900);

/* ============================================
   SELLO DE CERA → RAZONES PARA AMARTE
   ============================================ */
let mazoRazones = [];

function barajarRazones() {
  mazoRazones = [...CONFIG.razones];
  for (let i = mazoRazones.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mazoRazones[i], mazoRazones[j]] = [mazoRazones[j], mazoRazones[i]];
  }
}
barajarRazones();

const sealBtn = document.getElementById("seal-btn");
const razonCard = document.getElementById("razon-card");
const razonTexto = document.getElementById("razon-texto");
const sealHint = document.querySelector(".seal-hint");

if (sealBtn) {
  sealBtn.addEventListener("click", () => {
    if (mazoRazones.length === 0) barajarRazones();
    const razon = mazoRazones.pop();

    sealBtn.classList.add("is-cracked");
    razonTexto.textContent = razon;
    razonCard.hidden = false;
    // reinicia la animación si ya estaba visible
    razonCard.style.animation = "none";
    void razonCard.offsetWidth;
    razonCard.style.animation = "";

    if (sealHint) sealHint.textContent = "rompe el sello para otra razón";
  });
}

/* ============================================
   POEMA (vía /api/poema)
   ============================================ */
const poemas = [
  "Hoy el sol se despierta más despacio,\nsolo para darte tiempo de brillar tú primero.\nCada día contigo es un espacio\nque el tiempo guarda entero.",

  "No necesito buscar en las estrellas\nninguna razón para quererte,\nporque tú ya eres la más bella\nrazón que tuve para no perderte.",

  "Eres la calma después de la tormenta,\nel café tibio en una mañana fría,\nla razón por la que mi alma cuenta\nlos días junto a ti, uno a uno, con alegría.",

  "Si el amor fuera un lugar, serías mi casa,\nel rincón donde el mundo no me alcanza,\ndonde cada silencio no pasa\nsin que tu mano sea mi esperanza.",

  "Te quiero en lo simple, en lo cotidiano,\nen un mensaje de buenos días,\nen sostener, sin soltar, tu mano,\ny en amarte más, cada una de mis días.",

  "No hay poema que alcance a describirte,\nni palabra que iguale tu sonrisa,\nsolo sé que quiero seguir escribirte\nversos nuevos, sin ninguna prisa.",

  "Contigo el tiempo cambia de manera,\nlos minutos se sienten como instantes,\ny aunque el mundo entero desapareciera,\nseguirías siendo tú, entre todos, mi constante.",

  "Eres la razón detrás de mis sonrisas,\nel motivo por el que el día vale más,\ny en cada una de nuestras brisas,\nsé que a tu lado siempre querré estar.",

  "No busco un amor de cuento perfecto,\nbusco el tuyo, real y verdadero,\nese que se queda, sin ningún defecto,\nen los días buenos y en los de invierno.",

  "Hoy, como cada día, elijo quererte,\nsin condiciones, sin medida,\nporque contigo entendí que la suerte\nes compartir contigo esta vida.",
];

function cargarPoema() {
  const poemaEl = document.getElementById("poema");
  if (!poemaEl) return;

  try {
    const hoy = new Date();
    const inicioAño = new Date(hoy.getFullYear(), 0, 0);
    const diff = hoy - inicioAño;
    const unDia = 1000 * 60 * 60 * 24;
    const diaDelAño = Math.floor(diff / unDia);

    const indice = diaDelAño % poemas.length;
    poemaEl.textContent = poemas[indice];
  } catch (err) {
    poemaEl.textContent = "Hoy no se pudieron encontrar las palabras justas, pero lo que siento por ti sigue intacto.";
  }
}

cargarPoema();
/* ============================================
   BUZÓN SINCERO (vía /api/queja)
   ============================================ */
const buzonForm = document.getElementById("buzonForm");
if (buzonForm) {
  buzonForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const mensajeEl = document.getElementById("mensaje");
    const status = document.getElementById("status");
    const mensaje = mensajeEl.value;

    status.textContent = "Enviando…";
    try {
      const res = await fetch("/api/queja", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje }),
      });
      const data = await res.json();
      status.textContent = data.ok ? "Enviado con cariño." : "No se pudo enviar. Intenta de nuevo.";
      if (data.ok) mensajeEl.value = "";
    } catch (err) {
      status.textContent = "No se pudo enviar. Intenta de nuevo.";
    }
  });
}

/* ============================================
   INIT
   ============================================ */
pintarDateline();
