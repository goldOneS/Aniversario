function actualizarTiempoJuntos() {
  const inicio = new Date(2024, 3, 1); // 1 de abril de 2024 (mes 3 porque enero=0)
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

  const h1 = document.querySelector("h1");
  h1.textContent = `Feliz ${años} año${años !== 1 ? "s" : ""}, ${meses} mes${meses !== 1 ? "es" : ""} y ${dias} día${dias !== 1 ? "s" : ""}, mi amor 💖`;
}
  actualizarTiempoJuntos();
  setInterval(actualizarTiempoJuntos, 1000 * 60 * 60 * 24);
    
    const rosesContainer = document.getElementById("roses");
    const btnMore = document.getElementById("btn-more");

    const flowers = ["🌹", "🌷", "💐", "🌺", "🌸", "💗", "💘"];

    // detectar si es pantalla chica para no saturar
    const isMobile = window.matchMedia("(max-width: 600px)").matches;

    function createRose() {
      const rose = document.createElement("div");
      rose.classList.add("rose");
      rose.textContent = flowers[Math.floor(Math.random() * flowers.length)];
      rose.style.left = Math.random() * 100 + "vw";
      const duration = 6 + Math.random() * 5;
      rose.style.animationDuration = duration + "s";
      const size = isMobile ? (1.5 + Math.random() * 1.8) : (2 + Math.random() * 2.6);
      rose.style.fontSize = size + "rem";

      rosesContainer.appendChild(rose);

      setTimeout(() => {
        rose.remove();
      }, duration * 1000 + 120);
    }

    // generar varias al inicio (menos si es teléfono)
    const initialCount = isMobile ? 10 : 18;
    for (let i = 0; i < initialCount; i++) {
      setTimeout(createRose, i * 350);
    }

    // botón para más rosas
    btnMore.addEventListener("click", () => {
      const extra = isMobile ? 8 : 12;
      for (let i = 0; i < extra; i++) {
        setTimeout(createRose, i * 180);
      }
    });

    // caída constante
    setInterval(() => {
      createRose();
    }, isMobile ? 1500 : 1200);

    //Poema
async function cargarPoema() {
  const poemaEl = document.querySelector("#poema");

  try {
    const res = await fetch("/api/poema");
    const data = await res.json();

    poemaEl.textContent = data.poema.trim();
  } catch (err) {
    poemaEl.textContent = "Hoy no se pudo cargar el poema 😢";
  }
}

// Ejecuta cuando cargue la página
cargarPoema();
