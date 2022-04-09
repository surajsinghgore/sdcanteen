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

  let showUser = document.getElementById("showUser");
  let cartList = document.getElementById("cart-list");
  let cartIcon = document.getElementById("cartIcon");
  let user = document.getElementById("user-option");

  let show = document.getElementById("show");
  let pages = document.getElementById("pages");

  cartIcon.addEventListener('mouseenter', () => {
      cartList.style.transform = "translateY(0)";
      user.style.transform = "translateY(-999%)";
      pages.style.transform = "translateX(999%)";



  })
  cartList.addEventListener('mouseleave', () => {
      cartList.style.transform = "translateY(-999%)";

  })



  show.addEventListener('mouseenter', () => {
      pages.style.transform = "translateX(0)";
      user.style.transform = "translateY(-999%)";
      cartList.style.transform = "translateY(-999%)";


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






  showUser.addEventListener('mouseenter', () => {
      user.style.transform = "translateY(0)";
      pages.style.transform = "translateX(999%)";
      cartList.style.transform = "translateY(-999%)";

  })

  user.addEventListener('mouseleave', () => {
      user.style.transform = "translateY(-999%)";

  })