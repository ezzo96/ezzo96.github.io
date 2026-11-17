(function () {
  const STORAGE_LANG = "site-lang";
  const STORAGE_THEME = "site-theme";

  const html = document.documentElement;
  const langToggle = document.getElementById("lang-toggle");
  const themeToggle = document.getElementById("theme-toggle");
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");

  function getLang() {
    return localStorage.getItem(STORAGE_LANG) || "en";
  }

  function getTheme() {
    return localStorage.getItem(STORAGE_THEME) || "dark";
  }

  function applyLang(lang) {
    html.setAttribute("lang", lang);
    html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    langToggle.textContent = lang === "ar" ? "EN" : "ع";
    document.querySelectorAll("[data-ar][data-en]").forEach((el) => {
      el.textContent = el.getAttribute(lang === "ar" ? "data-ar" : "data-en");
    });
  }

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
  }

  function switchLang() {
    const next = getLang() === "ar" ? "en" : "ar";
    localStorage.setItem(STORAGE_LANG, next);
    applyLang(next);
  }

  function switchTheme() {
    const next = getTheme() === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_THEME, next);
    applyTheme(next);
  }

  function closeMenu() {
    mainNav.classList.remove("open");
  }

  applyLang(getLang());
  applyTheme(getTheme());

  langToggle.addEventListener("click", switchLang);
  themeToggle.addEventListener("click", switchTheme);

  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();
