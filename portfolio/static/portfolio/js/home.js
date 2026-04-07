(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var header = document.getElementById("site-header");
    var navToggle = document.getElementById("nav-toggle");
    var mobileNav = document.getElementById("mobile-nav");
    var progressBar = document.getElementById("scroll-progress");
    var desktopLinks = document.querySelectorAll("#desktop-nav a:not(.nav-cta)");
    var mobileLinks = mobileNav ? mobileNav.querySelectorAll("a") : [];
    var sectionIds = ["about", "stack", "projects", "contact"];

    /* ——— Scroll: header shadow + progress bar + active section ——— */
    function onScroll() {
      var scrollY = window.scrollY;
      if (header) {
        header.classList.toggle("is-scrolled", scrollY > 40);
      }
      if (progressBar) {
        var docH = document.documentElement.scrollHeight - window.innerHeight;
        var pct = docH > 0 ? (scrollY / docH) * 100 : 0;
        progressBar.style.width = pct + "%";
      }

      var active = "";
      for (var i = sectionIds.length - 1; i >= 0; i--) {
        var el = document.getElementById(sectionIds[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          active = sectionIds[i];
          break;
        }
      }
      desktopLinks.forEach(function (a) {
        var href = a.getAttribute("href");
        a.classList.toggle("is-active", href === "#" + active);
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ——— Mobile menu ——— */
    if (navToggle && mobileNav) {
      navToggle.addEventListener("click", function () {
        var open = mobileNav.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      mobileLinks.forEach(function (a) {
        a.addEventListener("click", function () {
          mobileNav.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    /* ——— Smooth anchor scrolling ——— */
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href").slice(1);
        var target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          var top = target.getBoundingClientRect().top + window.scrollY - 72;
          window.scrollTo({ top: top, behavior: "smooth" });
        }
      });
    });

    /* ——— Scroll reveal ——— */
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var revealEls = document.querySelectorAll(".reveal");

    if (!reduceMotion && "IntersectionObserver" in window && revealEls.length) {
      var io = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
      );
      revealEls.forEach(function (el) {
        io.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add("visible");
      });
    }

    /* ——— Skill bar fill animation ——— */
    var skillBars = document.querySelectorAll(".skill-bar-fill[data-level]");
    if (!reduceMotion && "IntersectionObserver" in window && skillBars.length) {
      var sio = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var bar = entry.target;
              bar.style.width = bar.getAttribute("data-level") + "%";
              obs.unobserve(bar);
            }
          });
        },
        { threshold: 0.3 }
      );
      skillBars.forEach(function (bar) {
        sio.observe(bar);
      });
    } else {
      skillBars.forEach(function (bar) {
        bar.style.width = bar.getAttribute("data-level") + "%";
      });
    }
  });
})();
