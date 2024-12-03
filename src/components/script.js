// eslint-disable-next-line import/no-extraneous-dependencies
import Swiper from 'swiper';

const swiper = new Swiper('.card-wrapper', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
export default swiper;
