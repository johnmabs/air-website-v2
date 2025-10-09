const btnOpen = document.querySelector("#btnOpen");
const btnClose = document.querySelector("#btnClose");
const media = window.matchMedia("(width < 56.25em)");
const primaryNavigation = document.querySelector(".primary-navigation");
const main = document.querySelector("main");
const body = document.querySelector("body");

function setupPrincipalNav(e) {
  if (e.matches) {
    // is mobile
    console.log("is mobile");
    primaryNavigation.setAttribute("inert", "");
    primaryNavigation.style.transition = "none";
  } else {
    // is  tablet / desktop
    console.log("is desktop");
    closeMobileMenu();
    primaryNavigation.removeAttribute("inert");
  }
}

function openMobileMenu() {
  btnOpen.setAttribute("aria-expanded", "true");
  primaryNavigation.removeAttribute("inert");
  primaryNavigation.removeAttribute("style");
  main.setAttribute("inert", "");
  bodyScrollLockUpgrade.disableBodyScroll(body);
  btnClose.focus();
}

function closeMobileMenu() {
  btnOpen.setAttribute("aria-expanded", "false");
  primaryNavigation.setAttribute("inert", "");
  main.removeAttribute("inert");
  bodyScrollLockUpgrade.enableBodyScroll(body);
  btnOpen.focus();

  setTimeout(() => {
    primaryNavigation.style.transition = "none";
  }, 500);
}

setupPrincipalNav(media);

btnOpen.addEventListener("click", openMobileMenu);
btnClose.addEventListener("click", closeMobileMenu);

media.addEventListener("change", function (e) {
  setupPrincipalNav(e);
});
