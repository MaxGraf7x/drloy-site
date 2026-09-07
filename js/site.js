(function () {
  const menuBtn = document.querySelector("[data-menu]");
  const mobile = document.querySelector("[data-mobile]");
  if (menuBtn && mobile) {
    menuBtn.addEventListener("click", () => mobile.classList.toggle("open"));
  }

  document.querySelectorAll("[data-booking]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      if (!name || !phone) {
        alert("Укажите имя и телефон");
        return;
      }
      const payload = {
        name,
        phone,
        comment: String(data.get("comment") || ""),
        at: new Date().toISOString(),
      };
      try {
        const prev = JSON.parse(localStorage.getItem("drloy-leads") || "[]");
        localStorage.setItem("drloy-leads", JSON.stringify([payload, ...prev].slice(0, 30)));
      } catch (_) {}
      form.reset();
      const ok = form.querySelector("[data-ok]");
      if (ok) ok.classList.remove("hidden");
    });
  });

  const quiz = document.querySelector("[data-quiz]");
  if (quiz) {
    const map = {
      pain: { href: "vrach-alena-loy.html", name: "Лоу Алена Эдуардовна", role: "терапевт • эндодонтия" },
      food: { href: "vrach-alena-loy.html", name: "Лоу Алена Эдуардовна", role: "терапевт • эндодонтия" },
      color: { href: "vrach-vitaly-semenyuk.html", name: "Семенюк Виталий Владимирович", role: "ортопед • реставратор" },
      broken: { href: "vrach-vitaly-semenyuk.html", name: "Семенюк Виталий Владимирович", role: "ортопед • реставратор" },
      gums: { href: "vrach-alena-loy.html", name: "Лоу Алена Эдуардовна", role: "терапевт • эндодонтия" },
      implant: { href: "vrach-astemir-luev.html", name: "Луев Астемир Эдуардович", role: "хирург • имплантолог" },
    };
    quiz.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = (quiz.querySelector("input[name=q1]:checked") || {}).value;
      const rec = map[id];
      const box = quiz.querySelector("[data-result]");
      if (!rec || !box) return;
      box.innerHTML =
        "<p class='muted'>По вашему запросу подойдёт <strong>" +
        rec.name +
        "</strong> — " +
        rec.role +
        ".</p><p><a class='btn btn-primary' href='" +
        rec.href +
        "'>Карточка специалиста</a></p>";
      box.classList.remove("hidden");
    });
  }

  const search = document.querySelector("[data-search]");
  const tabs = document.querySelectorAll("[data-tab]");
  if (tabs.length) {
    const apply = () => {
      const tab = document.querySelector("[data-tab].on");
      const id = tab ? tab.getAttribute("data-tab") : "all";
      const q = (search && search.value.trim().toLowerCase()) || "";
      document.querySelectorAll("[data-cat]").forEach((sec) => {
        const matchTab = id === "all" || sec.getAttribute("data-cat") === id;
        let any = false;
        sec.querySelectorAll("[data-row]").forEach((row) => {
          const hay = (row.getAttribute("data-row") || "").toLowerCase();
          const show = matchTab && hay.includes(q);
          row.classList.toggle("hidden", !show);
          if (show) any = true;
        });
        sec.classList.toggle("hidden", !any);
      });
    };
    tabs.forEach((btn) =>
      btn.addEventListener("click", () => {
        tabs.forEach((b) => b.classList.remove("on"));
        btn.classList.add("on");
        apply();
      }),
    );
    if (search) search.addEventListener("input", apply);
  }

  const fbtns = document.querySelectorAll("[data-filter]");
  if (fbtns.length) {
    fbtns.forEach((btn) =>
      btn.addEventListener("click", () => {
        fbtns.forEach((b) => b.classList.remove("on"));
        btn.classList.add("on");
        const id = btn.getAttribute("data-filter");
        document.querySelectorAll("[data-doc]").forEach((card) => {
          card.classList.toggle("hidden", !(id === "all" || card.getAttribute("data-doc") === id));
        });
      }),
    );
  }
})();
