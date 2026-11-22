
/*
 * WORKNELY V7.5 — SUCCESS CELEBRATION
 * Independent visual module.
 * No external libraries required.
 */
(() => {
  "use strict";

  if (window.worknelyCelebrationReady) return;
  window.worknelyCelebrationReady = true;

  const messages = {
    generated: {
      title: "Your next chapter starts here.",
      subtitle: "Your resume is ready!"
    },
    saved: {
      title: "You did it!",
      subtitle: "Your resume is saved!"
    },
    pdf: {
      title: "Ready for what's next?",
      subtitle: "Your PDF has been prepared!"
    }
  };

  const motivation =
    "One more step forward. One more opportunity ahead. " +
    "Your future is built by the actions you take today.";

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const css = `
    .wn-celebration {
      border: 0;
      padding: 0;
      width: min(92vw, 440px);
      max-height: 90dvh;
      overflow: visible;
      border-radius: 26px;
      background: #fff;
      color: #241447;
      box-shadow: 0 28px 90px rgba(25, 9, 69, .28);
    }

    .wn-celebration::backdrop {
      background: rgba(20, 10, 52, .67);
      backdrop-filter: blur(5px);
    }

    .wn-celebration-inner {
      position: relative;
      padding: 48px 28px 30px;
      text-align: center;
      overflow: hidden;
      border-radius: inherit;
    }

    .wn-celebration-close {
      position: absolute;
      top: 14px;
      right: 14px;
      width: 38px;
      height: 38px;
      border: 0;
      border-radius: 12px;
      background: #f2edff;
      color: #5424ff;
      font-size: 24px;
      cursor: pointer;
      z-index: 2;
    }

    .wn-celebration-symbol {
      display: grid;
      place-items: center;
      width: 78px;
      height: 78px;
      margin: 0 auto 22px;
      border-radius: 24px;
      background: linear-gradient(
        135deg, #5424ff, #ec22ad
      );
      color: #fff;
      font-size: 36px;
      box-shadow: 0 12px 28px rgba(84,36,255,.22);
    }

    .wn-celebration-brand {
      color: #5424ff;
      font-size: 11px;
      font-weight: 850;
      letter-spacing: 2px;
      margin-bottom: 14px;
    }

    .wn-celebration-title {
      margin: 0 0 10px;
      font-size: clamp(25px, 5vw, 33px);
      line-height: 1.16;
      font-weight: 850;
      letter-spacing: -.7px;
      color: #28134f;
    }

    .wn-celebration-subtitle {
      margin: 0 0 20px;
      color: #9b29df;
      font-size: 19px;
      font-weight: 750;
    }

    .wn-celebration-motivation {
      color: #686078;
      font-size: 14px;
      line-height: 1.8;
      margin: 0 auto 25px;
      max-width: 335px;
    }

    .wn-celebration-action {
      width: 100%;
      min-height: 52px;
      border: 0;
      border-radius: 15px;
      color: #fff;
      font: inherit;
      font-weight: 800;
      cursor: pointer;
      background: linear-gradient(
        105deg, #5424ff, #ec22ad
      );
    }

    .wn-confetti-layer {
      position: fixed;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
      z-index: 2147483647;
    }

    .wn-confetti-piece {
      position: absolute;
      top: -24px;
      width: 9px;
      height: 17px;
      opacity: 0;
      animation: wn-confetti-fall var(--duration)
        ease-in forwards;
      animation-delay: var(--delay);
    }

    @keyframes wn-confetti-fall {
      0% {
        opacity: 1;
        transform: translate3d(0,-20px,0)
          rotate(0deg);
      }
      85% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: translate3d(
          var(--drift), 105vh, 0
        ) rotate(var(--rotation));
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .wn-confetti-piece {
        animation: none !important;
        display: none !important;
      }
    }

    @media (max-width: 480px) {
      .wn-celebration-inner {
        padding: 46px 22px 24px;
      }
    }
  `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const dialog = document.createElement("dialog");
  dialog.id = "wnCelebrationDialog";
  dialog.className = "wn-celebration";
  dialog.setAttribute(
    "aria-labelledby", "wnCelebrationTitle"
  );
  dialog.setAttribute(
    "aria-describedby", "wnCelebrationMotivation"
  );

  dialog.innerHTML = `
    <div class="wn-celebration-inner">
      <button
        type="button"
        class="wn-celebration-close"
        aria-label="Close celebration"
      >×</button>

      <div class="wn-celebration-symbol"
           aria-hidden="true">✦</div>

      <div class="wn-celebration-brand">
        WORKNELY · PEOPLE TECHNOLOGY
      </div>

      <h2 class="wn-celebration-title"
          id="wnCelebrationTitle"></h2>

      <p class="wn-celebration-subtitle"
         id="wnCelebrationSubtitle"></p>

      <p class="wn-celebration-motivation"
         id="wnCelebrationMotivation"></p>

      <button
        type="button"
        class="wn-celebration-action"
      >Keep moving forward ✦</button>
    </div>
  `;

  document.body.appendChild(dialog);

  const title = dialog.querySelector(
    "#wnCelebrationTitle"
  );
  const subtitle = dialog.querySelector(
    "#wnCelebrationSubtitle"
  );
  const motivationNode = dialog.querySelector(
    "#wnCelebrationMotivation"
  );

  motivationNode.textContent = motivation;

  const closeButton = dialog.querySelector(
    ".wn-celebration-close"
  );
  const actionButton = dialog.querySelector(
    ".wn-celebration-action"
  );

  let confettiLayer = null;
  let cleanupTimer = null;

  function removeConfetti() {
    if (cleanupTimer !== null) {
      clearTimeout(cleanupTimer);
      cleanupTimer = null;
    }

    if (confettiLayer) {
      confettiLayer.remove();
      confettiLayer = null;
    }
  }

  function launchConfetti() {
    removeConfetti();

    if (reducedMotion.matches) return;

    const layer = document.createElement("div");
    layer.className = "wn-confetti-layer";
    layer.setAttribute("aria-hidden", "true");

    const colors = [
      "#5424ff",
      "#ec22ad",
      "#00cfe8",
      "#9b67ff",
      "#ff86d2"
    ];

    for (let i = 0; i < 65; i++) {
      const piece = document.createElement("span");
      piece.className = "wn-confetti-piece";

      piece.style.left = Math.random() * 100 + "%";
      piece.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];

      piece.style.setProperty(
        "--duration",
        (1.8 + Math.random() * 1.5) + "s"
      );

      piece.style.setProperty(
        "--delay",
        (Math.random() * .45) + "s"
      );

      piece.style.setProperty(
        "--drift",
        ((Math.random() - .5) * 220) + "px"
      );

      piece.style.setProperty(
        "--rotation",
        (Math.random() * 900) + "deg"
      );

      layer.appendChild(piece);
    }

    document.body.appendChild(layer);
    confettiLayer = layer;

    cleanupTimer = setTimeout(
      removeConfetti,
      4000
    );
  }

  function closeCelebration() {
    if (dialog.open) dialog.close();
    removeConfetti();
  }

  closeButton.addEventListener(
    "click", closeCelebration
  );

  actionButton.addEventListener(
    "click", closeCelebration
  );

  dialog.addEventListener("close", removeConfetti);

  dialog.addEventListener("click", event => {
    if (event.target === dialog) {
      closeCelebration();
    }
  });

  document.addEventListener(
    "worknely:success",
    event => {
      const type = event.detail?.type;
      const message = messages[type];

      if (!message) return;

      // Avoid competing modal dialogs.
      const authDialog =
        document.getElementById("wnAuthDialog");

      if (authDialog?.open) return;

      title.textContent = message.title;
      subtitle.textContent = message.subtitle;

      if (!dialog.open) {
        dialog.showModal();
      }

      closeButton.focus();
      launchConfetti();
    }
  );
})();
