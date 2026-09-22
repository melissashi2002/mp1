document.addEventListener('DOMContentLoaded', function () {
  var navbar = document.getElementById('navbar');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.navbar__link'));
  var sections = navLinks.map(function (link) {
    return document.getElementById(link.getAttribute('data-section'));
  });

  // Navbar resize + position indicator on scroll
  function onScroll() {
    // Resize navbar
    if (window.scrollY > 40) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }

    // Highlight the section that sits right below the navbar
    var navbarHeight = navbar.getBoundingClientRect().height;
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    var current = sections[0];

    if (atBottom) {
      current = sections[sections.length - 1];
    } else {
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top <= navbarHeight) {
          current = sections[i];
        }
      }
    }

    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('data-section') === current.id);
    });
  }

  onScroll();
  window.addEventListener('scroll', onScroll);

  // Smooth scroll to section
  Array.prototype.slice.call(document.querySelectorAll('.js-scroll-link')).forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.getElementById(link.getAttribute('data-section'));
      var navbarHeight = navbar.getBoundingClientRect().height;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navbarHeight,
        behavior: 'smooth',
      });
    });
  });

  // Carousel
  var track = document.getElementById('carousel-track');
  var slideCount = track.children.length;
  var currentSlide = 0;

  function goToSlide(index) {
    currentSlide = (index + slideCount) % slideCount;
    track.style.transform = 'translateX(-' + currentSlide * 100 + '%)';
  }

  document.getElementById('carousel-next').addEventListener('click', function () {
    goToSlide(currentSlide + 1);
  });
  document.getElementById('carousel-prev').addEventListener('click', function () {
    goToSlide(currentSlide - 1);
  });

  // Modal
  var modal = document.getElementById('contact-modal');

  function openModal() {
    modal.classList.add('is-open');
  }
  function closeModal() {
    modal.classList.remove('is-open');
  }

  document.getElementById('open-modal').addEventListener('click', openModal);
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-backdrop').addEventListener('click', closeModal);
  document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    closeModal();
  });

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
});
