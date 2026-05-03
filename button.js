/* =========================
   BUTTON HANDLER
========================= */

class Button {
  constructor(elementId, options = {}) {
    this.button = document.getElementById(elementId);
    this.isActive = false;
    this.callback = options.callback || null;
    this.ripple = options.ripple || false;
    this.sound = options.sound || null;

    this.init();
  }

  /* =========================
     INIT
  ========================= */
  init() {
    if (!this.button) {
      console.error(`Button with ID "${this.button}" not found`);
      return;
    }

    this.button.addEventListener("click", () => this.click());
    this.button.addEventListener("mousedown", () => this.press());
    this.button.addEventListener("mouseup", () => this.release());
  }

  /* =========================
     CLICK EVENT
  ========================= */
  click() {
    this.isActive = true;

    if (this.sound) this.playSound();
    if (this.ripple) this.createRipple();
    if (this.callback) this.callback();

    this.button.classList.add("active");
    setTimeout(() => {
      this.button.classList.remove("active");
      this.isActive = false;
    }, 200);
  }

  /* =========================
     PRESS EVENT
  ========================= */
  press() {
    this.button.classList.add("pressed");
  }

  /* =========================
     RELEASE EVENT
  ========================= */
  release() {
    this.button.classList.remove("pressed");
  }

  /* =========================
     RIPPLE EFFECT
  ========================= */
  createRipple() {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    const rect = this.button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = "50%";
    ripple.style.top = "50%";

    this.button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  /* =========================
     PLAY SOUND
  ========================= */
  playSound() {
    const audio = new Audio(this.sound);
    audio.play().catch(() => console.log("Sound play failed"));
  }

  /* =========================
     ENABLE/DISABLE
  ========================= */
  enable() {
    this.button.disabled = false;
    this.button.classList.remove("disabled");
  }

  disable() {
    this.button.disabled = true;
    this.button.classList.add("disabled");
  }

  /* =========================
     SET TEXT
  ========================= */
  setText(text) {
    this.button.textContent = text;
  }

  /* =========================
     TOGGLE STATE
  ========================= */
  toggle() {
    this.button.classList.toggle("toggled");
  }
}

/* =========================
   USAGE EXAMPLE
========================= */
// const myButton = new Button("myButtonId", {
//   callback: () => console.log("Button clicked!"),
//   ripple: true,
//   sound: "./click.mp3"
// });
