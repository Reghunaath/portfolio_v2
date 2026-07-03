/* ─── REGHU.EXE — DOM UI: dialogs, HUD, toasts, confetti ────────────────── */
/* global window, document, navigator */

window.UI = (function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const el = {
    dialog: null, dialogPath: null, dialogBody: null, dialogClose: null,
    hint: null, path: null, quest: null, stamps: null, coffee: null,
    toast: null, confetti: null,
  };
  let typing = null; // {timer, spans, idx} while the typewriter runs
  let onCloseCb = null;

  function init() {
    el.dialog = document.getElementById("dialog");
    el.dialogPath = document.getElementById("dialog-path");
    el.dialogBody = document.getElementById("dialog-body");
    el.dialogClose = document.getElementById("dialog-close");
    el.hint = document.getElementById("hint");
    el.path = document.getElementById("hud-path");
    el.quest = document.getElementById("hud-quest");
    el.stamps = document.getElementById("hud-stamps");
    el.coffee = document.getElementById("hud-coffee");
    el.toast = document.getElementById("toast");
    el.confetti = document.getElementById("confetti");
    el.dialogClose.addEventListener("click", closeDialog);
  }

  /* ── dialog ─────────────────────────────────────────────────────────── */

  function isOpen() {
    return !el.dialog.classList.contains("hidden");
  }

  function buildLinks(links) {
    const row = document.createElement("div");
    row.className = "dlg-links";
    links.forEach(function (l) {
      if (l.onClick) {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = "[ " + l.label + " ]";
        b.addEventListener("click", l.onClick);
        row.appendChild(b);
      } else if (l.copy) {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = "[ " + l.label + " ]";
        b.addEventListener("click", function () {
          const done = function () {
            b.textContent = "[ copied! ]";
            setTimeout(function () { b.textContent = "[ " + l.label + " ]"; }, 1400);
          };
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(l.copy).then(done, done);
          } else {
            const ta = document.createElement("textarea");
            ta.value = l.copy;
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand("copy"); } catch (e) { /* no-op */ }
            document.body.removeChild(ta);
            done();
          }
        });
        row.appendChild(b);
      } else {
        const a = document.createElement("a");
        a.href = l.url;
        if (!/^(mailto|tel):/.test(l.url)) {
          a.target = "_blank";
          a.rel = "noopener noreferrer";
        }
        a.textContent = "[ " + l.label + " ]";
        row.appendChild(a);
      }
    });
    return row;
  }

  /* reveal all text nodes progressively; instantly on reduced motion.
     Tag chips, link pills and input rows are kept invisible until the text
     is done streaming (their labels don't stream) so no empty boxes show;
     onDone fires once everything is revealed */
  function typewrite(container, onDone) {
    const deferred = Array.prototype.slice.call(
      container.querySelectorAll(".dlg-tags, .dlg-links, .dlg-input")
    );
    const nodes = [];
    (function collect(n) {
      if (deferred.indexOf(n) !== -1) return;
      if (n.nodeType === 3 && n.textContent.trim().length) nodes.push(n);
      else n.childNodes && Array.prototype.forEach.call(n.childNodes, collect);
    })(container);
    const fulls = nodes.map(function (n) { return n.textContent; });
    if (reduceMotion) {
      if (onDone) onDone();
      return;
    }
    deferred.forEach(function (d) { d.classList.add("dlg-streaming"); });
    nodes.forEach(function (n) { n.textContent = ""; });
    let ni = 0, ci = 0;
    typing = { done: false };
    typing.timer = setInterval(function () {
      let budget = 4; // chars per tick
      while (budget-- > 0) {
        if (ni >= nodes.length) { finishTyping(); return; }
        ci += 1;
        nodes[ni].textContent = fulls[ni].slice(0, ci);
        if (ci >= fulls[ni].length) { ni += 1; ci = 0; }
      }
    }, 12);
    typing.finish = function () {
      nodes.forEach(function (n, i) { n.textContent = fulls[i]; });
      deferred.forEach(function (d) { d.classList.remove("dlg-streaming"); });
      if (onDone) onDone();
    };
  }

  function finishTyping() {
    if (typing) {
      clearInterval(typing.timer);
      if (typing.finish) typing.finish();
      typing = null;
    }
  }

  function openDialog(def, opts) {
    opts = opts || {};
    onCloseCb = opts.onClose || null;
    finishTyping();
    el.dialogPath.textContent = def.path || "~/";
    el.dialogBody.innerHTML = "";

    const h = document.createElement("h2");
    h.textContent = def.title;
    el.dialogBody.appendChild(h);

    if (def.sub) {
      const s = document.createElement("p");
      s.className = "dlg-sub";
      s.textContent = def.sub;
      el.dialogBody.appendChild(s);
    }
    if (def.badge) {
      const b = document.createElement("p");
      b.className = "dlg-badge";
      b.textContent = "🏆 " + def.badge;
      el.dialogBody.appendChild(b);
    }
    (def.body || []).forEach(function (para) {
      const p = document.createElement("p");
      p.textContent = para;
      el.dialogBody.appendChild(p);
    });
    if (def.bullets) {
      const ul = document.createElement("ul");
      def.bullets.forEach(function (line) {
        const li = document.createElement("li");
        li.textContent = line;
        ul.appendChild(li);
      });
      el.dialogBody.appendChild(ul);
    }
    if (def.tags) {
      const tr = document.createElement("div");
      tr.className = "dlg-tags";
      def.tags.forEach(function (t) {
        const chip = document.createElement("span");
        chip.textContent = "[" + t + "]";
        tr.appendChild(chip);
      });
      el.dialogBody.appendChild(tr);
    }
    if (def.links) el.dialogBody.appendChild(buildLinks(def.links));

    el.dialog.classList.remove("hidden");
    el.dialogBody.scrollTop = 0;
    typewrite(el.dialogBody);
    el.dialogClose.focus({ preventScroll: true });
  }

  /* check-in prompt: text input + submit/skip, reusing the dialog chrome */
  function openNamePrompt(cfg) {
    finishTyping();
    onCloseCb = cfg.onClose || null;
    el.dialogPath.textContent = cfg.path || "~/lobby/reception";
    el.dialogBody.innerHTML = "";

    const h = document.createElement("h2");
    h.textContent = cfg.title || "Front Desk";
    el.dialogBody.appendChild(h);
    (cfg.body || []).forEach(function (para) {
      const p = document.createElement("p");
      p.textContent = para;
      el.dialogBody.appendChild(p);
    });

    const row = document.createElement("div");
    row.className = "dlg-input";
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 16;
    input.placeholder = cfg.placeholder || "your name";
    input.autocomplete = "off";
    input.spellcheck = false;
    const submit = document.createElement("button");
    submit.type = "button";
    submit.textContent = "[ " + (cfg.submitLabel || "check in") + " ]";
    const skip = document.createElement("button");
    skip.type = "button";
    skip.textContent = "[ " + (cfg.skipLabel || "skip") + " ]";

    const doSubmit = function () {
      const v = input.value.trim().slice(0, 16);
      closeDialog();
      if (v) cfg.onSubmit(v);
      else if (cfg.onSkip) cfg.onSkip();
    };
    const doSkip = function () {
      closeDialog();
      if (cfg.onSkip) cfg.onSkip();
    };
    input.addEventListener("keydown", function (e) {
      e.stopPropagation(); // typing must never move the player
      if (e.key === "Enter") doSubmit();
      if (e.key === "Escape") doSkip();
    });
    submit.addEventListener("click", doSubmit);
    skip.addEventListener("click", doSkip);

    row.appendChild(input);
    row.appendChild(submit);
    row.appendChild(skip);
    el.dialogBody.appendChild(row);

    el.dialog.classList.remove("hidden");
    el.dialogBody.scrollTop = 0;
    /* the input row appears (and takes focus) once the text finishes —
       a hidden input can't be focused */
    typewrite(el.dialogBody, function () {
      input.focus({ preventScroll: true });
    });
  }

  /* returns true if it consumed the action (skip-to-end vs close) */
  function advanceDialog() {
    if (typing) { finishTyping(); return true; }
    closeDialog();
    return true;
  }

  function closeDialog() {
    finishTyping();
    if (!isOpen()) return;
    el.dialog.classList.add("hidden");
    if (onCloseCb) { const cb = onCloseCb; onCloseCb = null; cb(); }
  }

  /* ── HUD ────────────────────────────────────────────────────────────── */

  function setHint(text) {
    if (el.hint.textContent !== text) el.hint.textContent = text;
  }
  function setPath(text) {
    if (el.path.textContent !== text) el.path.textContent = text;
  }
  function setQuest(pct) {
    el.quest.textContent = "EXPLORED " + pct + "%";
    el.quest.classList.toggle("quest-done", pct >= 100);
  }
  function setStamps(visited) {
    /* visited: {arcade,office,library,comms} booleans */
    const icons = { arcade: "▶", office: "▤", library: "▥", comms: "✉" };
    el.stamps.innerHTML = "";
    Object.keys(icons).forEach(function (k) {
      const s = document.createElement("span");
      s.textContent = icons[k];
      s.className = visited[k] ? "stamp on" : "stamp";
      s.title = k;
      el.stamps.appendChild(s);
    });
  }
  function setCoffee(n) {
    el.coffee.textContent = n > 0 ? "☕×" + n : "";
  }

  let toastTimer = null;
  function toast(msg, ms) {
    el.toast.textContent = msg;
    el.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.toast.classList.remove("show");
    }, ms || 2200);
  }

  /* ── confetti (quest complete) ──────────────────────────────────────── */

  function confetti() {
    if (reduceMotion) { toast("★ 100% EXPLORED — sudo hire-me unlocked ★", 4000); return; }
    const c = el.confetti;
    c.classList.remove("hidden");
    const ctx = c.getContext("2d");
    c.width = c.clientWidth;
    c.height = c.clientHeight;
    const colors = ["#3fb950", "#e3b341", "#a371f7", "#58a6ff", "#f85149"];
    const parts = [];
    for (let i = 0; i < 90; i++) {
      parts.push({
        x: Math.random() * c.width,
        y: -10 - Math.random() * c.height * 0.5,
        vy: 40 + Math.random() * 80,
        vx: -20 + Math.random() * 40,
        s: 2 + Math.floor(Math.random() * 3),
        col: colors[i % colors.length],
      });
    }
    let last = performance.now();
    let elapsed = 0;
    function tick(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      elapsed += dt;
      ctx.clearRect(0, 0, c.width, c.height);
      parts.forEach(function (p) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        ctx.fillStyle = p.col;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.s, p.s);
      });
      if (elapsed < 3.5) requestAnimationFrame(tick);
      else { ctx.clearRect(0, 0, c.width, c.height); c.classList.add("hidden"); }
    }
    requestAnimationFrame(tick);
  }

  return {
    init, openDialog, openNamePrompt, advanceDialog, closeDialog, isOpen,
    setHint, setPath, setQuest, setStamps, setCoffee, toast, confetti,
    reduceMotion,
  };
})();
