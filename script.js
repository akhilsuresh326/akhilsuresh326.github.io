document.addEventListener("DOMContentLoaded", function () {
  const worksLink = document.getElementById("works-link");
  const dropdownContent = document.querySelector(".dropdown-content");
  const contactSection = document.querySelector(".contact");

  worksLink.addEventListener("click", function (e) {
    e.preventDefault();
    dropdownContent.classList.toggle("show");

    if (dropdownContent.classList.contains("show")) {
      contactSection.style.marginTop = `${dropdownContent.scrollHeight + 10}px`;
    } else {
      contactSection.style.marginTop = "0";
    }
  });

  const burgerMenu = document.querySelector(".burger-menu");
  const slideMenu = document.querySelector(".slide-menu");
  const closeMenu = document.querySelector(".close-menu");
  const overlay = document.querySelector(".overlay");

  burgerMenu.addEventListener("click", function () {
    slideMenu.classList.add("open");
    burgerMenu.classList.add("hide");
    overlay.classList.add("show");
  });

  closeMenu.addEventListener("click", function () {
    slideMenu.classList.remove("open");
    burgerMenu.classList.remove("hide");
    overlay.classList.remove("show");
  });

  overlay.addEventListener("click", function () {
    slideMenu.classList.remove("open");
    burgerMenu.classList.remove("hide");
    overlay.classList.remove("show");
  });

  const mobileWorksLink = document.querySelector(".slide-menu .works");
  const mobileDropdownContent = document.querySelector(".slide-menu .dropdown-content");
  const mobileContactSection = document.querySelector(".slide-menu .contact");

  mobileWorksLink.addEventListener("click", function (e) {
    e.preventDefault();
    mobileDropdownContent.classList.toggle("show");

    if (mobileDropdownContent.classList.contains("show")) {
      mobileContactSection.style.marginTop = `${mobileDropdownContent.scrollHeight + 10}px`;
    } else {
      mobileContactSection.style.marginTop = "0";
    }
  });

  // Custom scroll restoration for bottom video
  let lastKnownScrollY = 0;

  function saveScrollPosition() {
    lastKnownScrollY = window.scrollY || document.documentElement.scrollTop;
    sessionStorage.setItem("scrollPos", lastKnownScrollY);
  }

  function restoreScrollPosition() {
    const scrollPos = sessionStorage.getItem("scrollPos");
    if (scrollPos) {
      window.scrollTo({
        top: parseInt(scrollPos, 10),
        behavior: "instant"
      });
    }
  }

  function toggleOverflowHidden(isFullscreen) {
    if (isFullscreen) {
      document.body.style.overflowX = ''; 
    } else {
      document.body.style.overflowX = 'hidden';
    }
  }

  function fullscreenChangeHandler(event) {
    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    toggleOverflowHidden(isFullscreen);

    if (!isFullscreen) {
      const iframe = event.target;
      const rect = iframe.getBoundingClientRect();
      const isBottomVideo = rect.bottom >= (window.innerHeight || document.documentElement.clientHeight);

      if (isBottomVideo) {
        window.scrollTo({
          top: lastKnownScrollY,
          behavior: "smooth"
        });
      } else {
        restoreScrollPosition();
      }
    } else {
      saveScrollPosition();
    }
  }

  const iframes = document.querySelectorAll("iframe");
  iframes.forEach(iframe => {
    iframe.addEventListener("fullscreenchange", fullscreenChangeHandler);
    iframe.addEventListener("webkitfullscreenchange", fullscreenChangeHandler);
    iframe.addEventListener("mozfullscreenchange", fullscreenChangeHandler);
    iframe.addEventListener("msfullscreenchange", fullscreenChangeHandler);

    iframe.addEventListener("play", saveScrollPosition);
    iframe.addEventListener("pause", restoreScrollPosition);
    iframe.addEventListener("ended", restoreScrollPosition);
  });

  window.history.scrollRestoration = "manual";
  restoreScrollPosition();

  window.addEventListener("beforeunload", saveScrollPosition);
});


