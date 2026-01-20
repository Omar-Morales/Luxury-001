if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

const revealItems = document.querySelectorAll(".reveal-on-scroll");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => observer.observe(item));

const headerBrand = document.querySelector(".header-brand-text");

if (headerBrand) {
  headerBrand.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const videoCards = document.querySelectorAll("[data-video]");
videoCards.forEach((card) => {
  const video = card.querySelector("video");
  if (!video) {
    return;
  }

  card.addEventListener("mouseenter", () => {
    video.play().catch(() => {});
  });

  card.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });
});

const eventFilter = document.querySelector("[data-event-filter]");
const eventCards = document.querySelectorAll(".event-card");

if (eventFilter) {
  eventFilter.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");
    if (!button) {
      return;
    }

    eventFilter.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.toggle("active", btn === button);
    });

    const sede = button.dataset.sede;
    eventCards.forEach((card) => {
      card.style.display = card.dataset.sede === sede ? "block" : "none";
    });
  });

  const defaultButton = eventFilter.querySelector(".filter-btn.active");
  if (defaultButton) {
    const sede = defaultButton.dataset.sede;
    eventCards.forEach((card) => {
      card.style.display = card.dataset.sede === sede ? "block" : "none";
    });
  }
}

const cateringData = {
  menu: [
    {
      title: "Menu Ejecutivo",
      desc: "Plato fuerte con acompanamientos premium.",
      image: "media/menu-ejecutivo.jpg",
    },
    {
      title: "Menu Signature",
      desc: "Recetas de autor y presentacion elegante.",
      image: "media/menu-signature.jpg",
    },
    {
      title: "Menu Clasico",
      desc: "Sabores tradicionales con toque Luxury.",
      image: "media/menu-clasico.jpg",
    },
  ],
  salados: [
    {
      title: "Mini wraps",
      desc: "Bocados frescos y ligeros.",
      image: "media/salados-wraps.jpg",
    },
    {
      title: "Canapes gourmet",
      desc: "Sabores intensos en formato mini.",
      image: "media/salados-canapes.jpg",
    },
    {
      title: "Brochetas saladas",
      desc: "Perfectas para recepciones.",
      image: "media/salados-brochetas.jpg",
    },
  ],
  dulces: [
    {
      title: "Mini tartas",
      desc: "Dulces delicados y elegantes.",
      image: "media/dulces-tartas.jpg",
    },
    {
      title: "Shots de postre",
      desc: "Texturas suaves en porciones perfectas.",
      image: "media/dulces-shots.jpg",
    },
    {
      title: "Petits fours",
      desc: "Clasicos premium para tus invitados.",
      image: "media/dulces-petits.jpg",
    },
  ],
  bebidas: [
    {
      title: "Cocteles de autor",
      desc: "Combinaciones frescas y sofisticadas.",
      image: "media/bebidas-cocteles.jpg",
    },
    {
      title: "Bar premium",
      desc: "Destilados seleccionados y mixers.",
      image: "media/bebidas-bar.jpg",
    },
    {
      title: "Mocktails",
      desc: "Opciones sin alcohol con estilo.",
      image: "media/bebidas-mocktails.jpg",
    },
  ],
};

const cateringFilter = document.querySelector("[data-catering-filter]");
const carouselTrack = document.querySelector("[data-carousel-track]");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
let activeCategory = "menu";
let activeIndex = 0;

const renderCarousel = () => {
  if (!carouselTrack) {
    return;
  }

  const items = cateringData[activeCategory];
  const visibleItems = items.slice(activeIndex, activeIndex + 3);
  const needed = 3 - visibleItems.length;

  const itemsToRender =
    needed > 0 ? visibleItems.concat(items.slice(0, needed)) : visibleItems;

  carouselTrack.innerHTML = itemsToRender
    .map(
      (item) => `
      <article class="carousel-card">
        <img src="${item.image}" alt="${item.title}" />
        <div class="card-body">
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        </div>
      </article>
    `
    )
    .join("");
};

const updateCategory = (category) => {
  activeCategory = category;
  activeIndex = 0;
  renderCarousel();
};

if (cateringFilter) {
  cateringFilter.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");
    if (!button) {
      return;
    }

    cateringFilter.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.toggle("active", btn === button);
    });

    updateCategory(button.dataset.category);
  });
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    const items = cateringData[activeCategory];
    activeIndex = (activeIndex - 1 + items.length) % items.length;
    renderCarousel();
  });

  nextBtn.addEventListener("click", () => {
    const items = cateringData[activeCategory];
    activeIndex = (activeIndex + 1) % items.length;
    renderCarousel();
  });
}

renderCarousel();

const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");
    faqItems.forEach((faq) => faq.classList.remove("active"));
    item.classList.toggle("active", !isActive);
  });
});

const contactForm = document.querySelector("#contactForm");
const whatsappNumbers = {
  comas: "51900000000",
  trapiche: "51900000001",
};

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const sede = formData.get("sede");
    const number = whatsappNumbers[sede] || whatsappNumbers.comas;
    const message = [
      "Hola Luxury, quiero cotizar un evento.",
      `Nombre: ${formData.get("nombre")}`,
      `Telefono: ${formData.get("telefono")}`,
      `Correo: ${formData.get("correo")}`,
      `Evento: ${formData.get("tipo")}`,
      `Sede: ${sede}`,
      `Mensaje: ${formData.get("mensaje") || "Sin detalles adicionales."}`,
    ].join("\n");

    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  });
}

const sectionLinks = Array.from(document.querySelectorAll(".navbar-nav .nav-link"));
const sectionTargets = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

sectionLinks.forEach((link) => {
  if (link.getAttribute("href") === "#inicio") {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

const updateActiveNav = () => {
  const scrollPosition = window.scrollY + 140;
  let activeId = "";

  sectionTargets.forEach((section) => {
    if (section.offsetTop <= scrollPosition) {
      activeId = section.id;
    }
  });

  sectionLinks.forEach((link) => {
    const linkTarget = link.getAttribute("href").slice(1);
    link.classList.toggle("active", linkTarget === activeId);
  });
};

updateActiveNav();
window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("resize", updateActiveNav);
