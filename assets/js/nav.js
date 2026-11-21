/* ==========================================================================
   AZTHREUS ACADEMY — SITE NAVIGATION
   Progressive enhancement only. All links are present in the HTML and the CSS
   keeps them available when JavaScript is off.

   Behaviour:
   - Toggles the mobile menu with a real button (aria-expanded / aria-controls).
   - Closes on Escape, on outside click, on resize to desktop, and after a
     same-page link is followed.
   - Updates the footer copyright year.
   ========================================================================== */

(function () {
  "use strict";

  // Mark the document as script-capable as early as possible so the mobile
  // menu can be collapsed by CSS from the first paint.
  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js");

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.getElementById("primary-nav");

    function setExpanded(expanded) {
      if (!toggle || !menu) return;
      toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
      toggle.setAttribute(
        "aria-label",
        expanded ? "Close main menu" : "Open main menu"
      );
      menu.classList.toggle("is-open", expanded);
    }

    function closeMenu(returnFocus) {
      if (!toggle || !menu || toggle.getAttribute("aria-expanded") !== "true") {
        return;
      }
      setExpanded(false);
      if (returnFocus) toggle.focus();
    }

    if (toggle && menu) {
      setExpanded(false);

      toggle.addEventListener("click", function () {
        var isOpen = toggle.getAttribute("aria-expanded") === "true";
        setExpanded(!isOpen);
      });

      // Escape closes the menu and returns focus to the toggle.
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" || event.key === "Esc") {
          closeMenu(true);
        }
      });

      // Clicking outside the header closes the menu.
      document.addEventListener("click", function (event) {
        if (toggle.getAttribute("aria-expanded") !== "true") return;
        if (event.target.closest(".site-header")) return;
        closeMenu(false);
      });

      // Following a link inside the menu closes it.
      menu.addEventListener("click", function (event) {
        if (event.target.closest("a")) closeMenu(false);
      });

      // Reset state when the layout switches to the desktop bar.
      var desktop = window.matchMedia("(min-width: 821px)");
      var onChange = function (event) {
        if (event.matches) closeMenu(false);
      };
      if (typeof desktop.addEventListener === "function") {
        desktop.addEventListener("change", onChange);
      } else if (typeof desktop.addListener === "function") {
        desktop.addListener(onChange);
      }
    }

    // Footer year.
    var year = document.getElementById("copyright-year");
    if (year) year.textContent = String(new Date().getFullYear());
  });
})();
