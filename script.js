// Product database (so product links stay clean: product.html?sku=...)
const PRODUCTS = {
  "phantom-black": {
    name: "Air Phantom Black",
    price: 189,
    desc:
      "Experience the pinnacle of footwear engineering. Responsive cushioning, breathable mesh upper, and a design that commands attention.",
    variantName: null,
    filter: "grayscale(100%) brightness(0.7)"
  },
  "pure-white": {
    name: "Air Pure White",
    price: 159,
    desc:
      "Engineered for comfort. Designed for speed. A clean minimal look with premium feel—built for everyday wear.",
    variantName: "beach",
    filter: "grayscale(100%) brightness(1.2)"
  },
  "blaze-orange": {
    name: "Air Blaze Orange",
    price: 210,
    desc:
      "High-energy colorway with bold presence. Lightweight build and street-ready comfort in one package.",
    variantName: null,
    filter: "hue-rotate(20deg) saturate(3) brightness(1.1)"
  },
  "midnight-blue": {
    name: "Air Midnight Blue",
    price: 195,
    desc:
      "Deep tones, modern silhouette. Built to stand out at night with all-day comfort underfoot.",
    variantName: null,
    filter: "hue-rotate(190deg) saturate(2)"
  },
  "forest-green": {
    name: "Air Forest Green",
    price: 180,
    desc:
      "Nature-inspired tone with premium styling. Balanced cushioning and breathable upper for daily performance.",
    variantName: null,
    filter: "hue-rotate(90deg) saturate(1.5)"
  },
  "gold-edition": {
    name: "Air Gold Edition",
    price: 299,
    desc:
      "Limited look, luxury vibes. A bold gold finish with premium feel for collectors and trendsetters.",
    variantName: null,
    filter: "sepia(100%) hue-rotate(10deg) saturate(3)"
  }
};

function setActiveNavFromBody() {
  const page = document.body.dataset.page; // home/products/about/contact
  document.querySelectorAll(".nav-links a").forEach(a => a.classList.remove("active"));

  const map = {
    home: "nav-home",
    products: "nav-products",
    about: "nav-about",
    contact: "nav-contact"
  };

  const id = map[page];
  if (id) document.getElementById(id)?.classList.add("active");
}

function initMobileMenu() {
  const navLinks = document.getElementById("navLinks");
  const menuToggle = document.getElementById("menuToggle");
  const closeBtn = document.getElementById("closeBtn");

  if (!navLinks || !menuToggle || !closeBtn) return;

  const open = () => navLinks.classList.add("active-menu");
  const close = () => navLinks.classList.remove("active-menu");

  menuToggle.addEventListener("click", open);
  closeBtn.addEventListener("click", close);

  // close menu when clicking any link (mobile)
  navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
}

function initSizePickers() {
  document.querySelectorAll("[data-size-picker]").forEach(container => {
    container.addEventListener("click", (e) => {
      const opt = e.target.closest(".size-opt");
      if (!opt) return;

      container.querySelectorAll(".size-opt").forEach(el => el.classList.remove("active"));
      opt.classList.add("active");
    });
  });
}

function initHomeColorSelector() {
  const selector = document.getElementById("homeColorSelector");
  const viewer = document.getElementById("main-shoe");
  const nameElement = document.getElementById("shoe-name");
  const priceElement = document.getElementById("shoe-price");

  if (!selector || !viewer || !nameElement || !priceElement) return;

  function applyColor(color) {
    selector.querySelectorAll(".color-dot").forEach(dot => dot.classList.remove("active"));
    selector.querySelector(`.color-dot.${color}`)?.classList.add("active");

    viewer.variantName = null;
    viewer.style.filter = "none";

    if (color === "black") {
      nameElement.innerText = "Air Midnight Black";
      priceElement.innerText = "$169.00";
      viewer.style.filter = "grayscale(100%) brightness(0.7)";
    } else if (color === "blue") {
      nameElement.innerText = "Air Royal Blue";
      priceElement.innerText = "$179.00";
      viewer.style.filter = "hue-rotate(20deg) saturate(3) brightness(1.1)";
    } else {
      nameElement.innerText = "Air Pure White";
      priceElement.innerText = "$159.00";
      viewer.variantName = "beach";
      viewer.style.filter = "grayscale(100%) brightness(1.2)";
    }
  }

  selector.addEventListener("click", (e) => {
    const dot = e.target.closest(".color-dot");
    if (!dot) return;
    const color = dot.dataset.color;
    if (!color) return;
    applyColor(color);
  });

  // default
  applyColor("white");
}

function initProductPage() {
  const nameEl = document.getElementById("pd-name");
  const priceEl = document.getElementById("pd-price");
  const descEl = document.getElementById("pd-desc");
  const model = document.getElementById("pd-model");

  if (!nameEl || !priceEl || !descEl || !model) return;

  const params = new URLSearchParams(window.location.search);
  const sku = params.get("sku");

  const product = sku ? PRODUCTS[sku] : null;

  if (!product) {
    nameEl.innerText = "Product not found";
    priceEl.innerText = "";
    descEl.innerText = "Invalid product link. Please go back to the catalog.";
    model.style.filter = "none";
    model.variantName = null;
    return;
  }

  document.title = `${product.name} | Air Stride`;

  nameEl.innerText = product.name;
  priceEl.innerText = `$${product.price}.00`;
  descEl.innerText = product.desc;

  model.variantName = null;
  model.style.filter = "none";

  if (product.variantName) model.variantName = product.variantName;
  if (product.filter) model.style.filter = product.filter;
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNavFromBody();
  initMobileMenu();
  initSizePickers();
  initHomeColorSelector();
  initProductPage();
});