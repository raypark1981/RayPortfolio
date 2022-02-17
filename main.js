"use strict";
const observed = document.querySelectorAll(".observed");
const navbarMenu = document.querySelector(".navbar__menu");
const contactme = document.querySelector(".home__contact");
const arrowup = document.querySelector(".arrow-up");
const hamburger = document.querySelector(".navbar__toggle-btn");
const workCategoiesBtn = document.querySelector(".work__categories");
const workProjects = document.querySelector(".work__projects");

// Observer
let observeOption = {
  threshold: 0.3,
};

let selectSection = (id) => {
  document
    .querySelectorAll(".navbar__menu__item.active")
    .forEach((e) => e.classList.remove("active"));

  document.querySelector(`[data-link="#${id}"]`).classList.add("active");
};

let callbackObserve = function (entries, observer) {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0.3 && entry.target.id == "contact") {
      selectSection(entry.target.id);
      return;
    }

    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      if (entry.target.getBoundingClientRect().y < 0) {
        selectSection(entry.target.nextElementSibling.id);
      } else {
        selectSection(entry.target.previousElementSibling.id);
      }
    }
  });
};

let observer = new IntersectionObserver(callbackObserve, observeOption);
observed.forEach((item) => observer.observe(item));
// scroll 시 navbar dark , transparent 변경

let last_known_scroll_position = 0;
let ticking = false;
let timer = null;

// 사용자 휠 이벤트
window.addEventListener("wheel", () => {
  last_known_scroll_position = window.scrollY;

  if (last_known_scroll_position == 0) {
    selectSection("home");
  }
});

// 스크롤시 이벤트
window.addEventListener("scroll", function () {
  const home = document.querySelector(".home__container");
  const arrowup = document.querySelector(".arrow-up");
  const navbar = document.querySelector("#navbar");

  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function () {
      const navbarHeight = navbar.getBoundingClientRect().height;

      // 스크롤시 메뉴 열려 있으면 닫기
      if (navbarMenu.classList.contains("open")) {
        navbarMenu.classList.remove("open");
      }

      // 스크롤시 네비 높이 지나면 다크 모드로 변경
      if (last_known_scroll_position > navbarHeight) {
        navbar.classList.add("navbar-dark");
      } else {
        navbar.classList.remove("navbar-dark");
      }

      const homeHeight = home.getBoundingClientRect().height;
      let heightRate = last_known_scroll_position / homeHeight;

      // Make Home fadeout as the window scroll down by .5
      home.style.opacity = heightRate > 1 ? 1 : 1 - heightRate;
      if (heightRate > 0.5) {
        arrowup.classList.add("show");
      } else {
        arrowup.classList.remove("show");
      }

      if (navbar.classList.contains("invisible")) {
        navbar.classList.remove("invisible");
      }

      // 스크롤 이벤트 끝날때 캐치
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(function () {
        // 스크롤 끝날시 navbar 숨기기
        if (!navbarMenu.classList.contains("open")) {
          navbar.classList.add("invisible");
        }

        // 스크롤 끝날시 arrow up btn 숨기기
        arrowup.classList.remove("show");
      }, 1500);

      ticking = false;
    });

    ticking = true;
  }
});

// navbar button click moving certain section
navbarMenu.addEventListener("click", (e) => {
  if (!e.target.dataset.link) {
    return;
  }
  scrollIntoView(e.target.dataset.link);
});
workCategoiesBtn.addEventListener("click", (e) => {
  workCategoiesBtn.querySelectorAll("button").forEach((e) => {
    e.classList.remove("active");
  });

  let target = e.target.dataset.target || e.target.parentNode.dataset.target;
  if (!target) {
    return;
  }

  var targetBtn =
    e.target.nodeName == "BUTTON" ? e.target : e.target.parentNode;
  targetBtn.classList.add("active");
  visibleProject(target);
});
hamburger.addEventListener("click", (e) => {
  navbarMenu.classList.toggle("open");
});
contactme.addEventListener("click", (e) => {
  scrollIntoView("#contact");
});

arrowup.addEventListener("click", (e) => {
  scrollIntoView("#home");
});

function visibleProject(target) {
  workProjects.classList.add("anim-out");
  setTimeout(() => {
    document.querySelectorAll(`a[data-target]`).forEach((e) => {
      if (e.dataset.target == target || target == "all") {
        e.classList.remove("invisible");
      } else {
        e.classList.add("invisible");
      }
    });
    workProjects.classList.remove("anim-out");
  }, 300);
}

function scrollIntoView(selector) {
  var target = document.querySelector(selector);
  target.scrollIntoView({ behavior: "smooth" });
}
