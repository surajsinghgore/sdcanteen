  var swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
          el: ".swiper-pagination",
          clickable: true,
      },
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
      },
  });



  //   AOS.init();


  let show = document.getElementById("show");
  let pages = document.getElementById("pages");
  show.addEventListener('mouseenter', () => {
      pages.style.transform = "translateX(0)";

  })
  pages.addEventListener('mouseleave', () => {
      pages.style.transform = "translateX(999%)";

  })





  var swiper = new Swiper(".mySwiper1", {
      slidesPerView: 3,
      spaceBetween: 1,
      slidesPerGroup: 3,
      loop: true,
      loopFillGroupWithBlank: true,
      pagination: {
          el: ".swiper-pagination",
          clickable: true,
      },
  });