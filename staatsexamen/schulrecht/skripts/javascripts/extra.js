// Iter 4: Visual-Polish-Hooks
// (1) Reading-Progress-Bar
// (2) Falle-Cards Click-to-Reveal Toggle

(function () {
  // Reading-Progress-Bar
  const bar = document.createElement("div");
  bar.className = "reading-progress";
  document.body.appendChild(bar);

  function updateProgress() {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    bar.style.width = scrolled + "%";
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress, { passive: true });
  updateProgress();

  // Falle-Cards Click-to-Reveal
  document.addEventListener("click", function (ev) {
    const card = ev.target.closest(".falle-card");
    if (card) {
      card.classList.toggle("is-open");
    }
  });
})();
