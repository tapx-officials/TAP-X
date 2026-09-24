"use strict";

/* =========================================================
   TAP X — FOUNDER PROFILE
   Lightweight / Mobile Optimized
========================================================= */


/* =========================================================
   APP LOADER
========================================================= */

const loader =
  document.getElementById("appLoader");

const loaderProgress =
  document.getElementById("loaderProgress");

const loaderPercent =
  document.getElementById("loaderPercent");


let progress = 0;


function updateLoader(value) {

  progress = Math.min(100, value);

  if (loaderProgress) {

    loaderProgress.style.width =
      progress + "%";

  }

  if (loaderPercent) {

    loaderPercent.textContent =
      Math.round(progress) + "%";

  }

}


function finishLoader() {

  updateLoader(100);

  setTimeout(() => {

    if (loader) {

      loader.classList.add("hidden");

    }

    document.body.classList.add("loaded");

  }, 180);

}


/*
  Lightweight simulated loading.
  It gives the page an app-like startup
  without keeping the browser busy.
*/

function runLoader() {

  const start =
    performance.now();

  function tick(now) {

    const elapsed =
      now - start;

    let value;

    if (elapsed < 250) {

      value =
        elapsed / 250 * 35;

    } else if (elapsed < 500) {

      value =
        35 +
        ((elapsed - 250) / 250) * 30;

    } else if (elapsed < 800) {

      value =
        65 +
        ((elapsed - 500) / 300) * 25;

    } else {

      value = 96;

    }

    updateLoader(value);

    if (value < 96) {

      requestAnimationFrame(tick);

    }

  }

  requestAnimationFrame(tick);

}


runLoader();


if (document.readyState === "complete") {

  finishLoader();

} else {

  window.addEventListener(
    "load",
    finishLoader,
    { once: true }
  );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

  const observer =
    new IntersectionObserver(
      (entries, obs) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "visible"
          );

          obs.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px"
      }
    );


  revealElements.forEach((element) => {

    observer.observe(element);

  });

} else {

  revealElements.forEach((element) => {

    element.classList.add("visible");

  });

}


/* =========================================================
   HERO 3D — DESKTOP ONLY
========================================================= */

const heroCard =
  document.querySelector(".hero-card");


const desktopQuery =
  window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  );


if (heroCard && desktopQuery.matches) {

  let frame = null;

  let mouseX = 0;
  let mouseY = 0;


  heroCard.addEventListener(
    "mousemove",
    (event) => {

      const rect =
        heroCard.getBoundingClientRect();


      mouseX =
        ((event.clientX - rect.left) /
          rect.width - .5) * 2;


      mouseY =
        ((event.clientY - rect.top) /
          rect.height - .5) * -2;


      if (frame) return;


      frame =
        requestAnimationFrame(() => {

          heroCard.style.transform =
            `perspective(1000px)
             rotateX(${mouseY * 1.4}deg)
             rotateY(${mouseX * 1.4}deg)`;

          frame = null;

        });

    },
    { passive: true }
  );


  heroCard.addEventListener(
    "mouseleave",
    () => {

      if (frame) {

        cancelAnimationFrame(frame);

        frame = null;

      }

      heroCard.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg)";

    }
  );

}


/* =========================================================
   DYNAMIC YEAR
========================================================= */

const yearText =
  document.querySelector(
    ".footer-bottom span:last-child"
  );


if (yearText) {

  yearText.textContent =
    `© ${new Date().getFullYear()} TAP 𝕏`;

}


/* =========================================================
   IMAGE FALLBACK
========================================================= */

const profileImage =
  document.querySelector(
    ".photo-frame img"
  );


if (profileImage) {

  profileImage.addEventListener(
    "error",
    () => {

      profileImage.style.opacity = "0";

      console.warn(
        "photo.jpg was not found."
      );

    },
    { once: true }
  );

}


/* =========================================================
   PREVENT UNNECESSARY MOBILE TOUCH WORK
========================================================= */

document.addEventListener(
  "touchstart",
  () => {},
  {
    passive: true,
    once: true
  }
);