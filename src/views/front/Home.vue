<template>
  <div class="wrap">
    <loading :active.sync="isLoading" :is-full-page="true"></loading>

    <div class="banner" id="banner">
      <div class="banner-content">
        <!-- <h2 class="banner-title">Antique</h2> -->
        <p class="banner-text">讓古董融入每天的生活，</p>
        <p class="banner-text">
          既是環保，更是一種日常的浪漫。
        </p>
      </div>
      <a
        href="#banner"
        @click.prevent="scrollDown()"
        class="scrolldown-btn"
      ></a>
    </div>

    <div class="feature">
      <div class="feature-info">
        <h2 class="feature-title">風格選物</h2>
        <p class="feature-text">
          由 Antique 專業團隊挑選的日用雜貨，為您帶來充滿個人風格的居家環境與質感生活。
        </p>
      </div>
      <ul class="feature-img">
        <li
          class="feature-img1"
          data-aos="zoom-in"
          data-aos-duration="3000"
        ></li>
        <li
          class="feature-img2"
          data-aos="zoom-in"
          data-aos-duration="3000"
        ></li>
      </ul>
    </div>

    <div class="intro">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-4 mb-5 mb-lg-0">
            <div class="intro-item intro-img1">
              <router-link
                class="intro-content"
                :to="{ name: 'Products', query: { categoryName: '家具商品' } }"
              >
                <h4 class="intro-title">家具商品</h4>
                <p class="intro-text">
                  歷久彌新經典設計家具，在日常中實踐簡單又美好體驗。
                </p>
              </router-link>
            </div>
          </div>
          <div class="col-12 col-lg-4 mb-5 mb-lg-0">
            <div class="intro-item intro-img2">
              <router-link
                class="intro-content"
                :to="{ name: 'Products', query: { categoryName: '佈置擺飾' } }"
              >
                <h4 class="intro-title">佈置擺飾</h4>
                <p class="intro-text">充滿老式情懷的復古道具，將過去的美好重現於居家氛圍中。</p>
              </router-link>
            </div>
          </div>
          <div class="col-12 col-lg-4 mb-5 mb-lg-0">
            <div class="intro-item intro-img3">
              <router-link
                class="intro-content"
                :to="{ name: 'Products', query: { categoryName: '底片相機' } }"
              >
                <h4 class="intro-title">底片相機</h4>
                <p class="intro-text">
                  底片的溫度無法被數位相機無法取代，找回攝影最初的感動。
                </p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="feature">
      <ul class="feature-img">
        <li
          class="feature-img3"
          data-aos="zoom-in"
          data-aos-duration="3000"
        ></li>
        <li
          class="feature-img4"
          data-aos="zoom-in"
          data-aos-duration="3000"
        ></li>
      </ul>
      <div class="feature-info">
        <h2 class="feature-title">陳設美學</h2>
        <p class="feature-text">
          透過生活情境陳列手法，縮短消費者與商品間的想像距離，為前來的人們描繪一個個令人著迷、極具靈感啟發的空間故事。
        </p>
      </div>
    </div>

    <div class="cover">
      <h3 class="logo">Antique</h3>
      <p></p>
    </div>

    <div class="feature">
      <div class="feature-info">
        <h2 class="feature-title">顧客回饋</h2>
        <p class="feature-text">
          感謝每一位來店參觀的顧客，我們將持續以最專業的眼光選品，提供您兼具質感與品味的古董。
        </p>
      </div>
      <div class="feature-swiper bg-info">
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="feedback in feedbacks" :key="feedback.name">
            <div class="swiper-item">
              <div class="star">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
              <h4 class="feature-title">{{ feedback.name }}</h4>
              <p class="feature-text">{{ feedback.message }}</p>
            </div>
          </swiper-slide>
          <div
            class="swiper-button-prev swiper-button-custom"
            slot="button-prev"
          ></div>
          <div
            class="swiper-button-next swiper-button-custom"
            slot="button-next"
          ></div>
        </swiper>
      </div>
    </div>

    <div class="map">
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4039.8515098548273!2d120.67342793351905!3d24.139514112986216!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x15a8fe0efac1c1f8!2z6Ie654Gj5bqc5YSS6ICD5qOa!5e0!3m2!1szh-TW!2stw!4v1617378481773!5m2!1szh-TW!2stw" width="600"
        frameborder="0"
        style="border: 0"
        allowfullscreen=""
        aria-hidden="false"
        tabindex="0"
      >
      </iframe>
      <ul class="us">
            <li class="logo">Antique</li>
            <li>TEL： 0987654321</li>
            <li>Mail： antique@mail.com</li>
            <li>地址： 403台中市西區府後街38-8號</li>
      </ul>
    </div>
  </div>
</template>

<script>
/* global $ */
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'Home',
  data () {
    return {
      isLoading: false,
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      feedbacks: [
        {
          name: 'Plato',
          message: '商品質感很棒，老件修復的細節很到位。'
        },
        {
          name: 'Aristotle',
          message: '店員介紹商品專業度很夠，對於商品材質的說明很清楚。'
        },
        {
          name: 'Descartes',
          message: '相機功能正常，外觀也乾淨如新。'
        }
      ]
    }
  },
  methods: {
    scrollDown () {
      const target = $('.scrolldown-btn').attr('href')
      const targetPos = $(target).offset().top
      const targetHeigh = $(target).height()
      $('html,body').animate(
        {
          scrollTop: targetHeigh + targetPos
        },
        1000
      )
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/all";

.wrap {
  background: url("../../assets/images/banner.jpg") center 85% no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.banner {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner-content {
  max-width: 500px;
  padding: 2rem;
  background-color: rgba($dark, 0.4);
  text-align: center;
  border-radius: 0.25rem;
  color: $white;
  z-index: 99;
  @include mobile {
    padding: 2rem 3rem;
  }
}

// .banner-title {
//   margin-bottom: 4rem;
//   animation: floating 3s infinite;
//   font-family: $font-logo;
//   font-size: 3rem;
//   font-weight: bold;
//   @include mobile {
//     margin-bottom: 6rem;
//     font-size: 5rem;
//   }
// }

@keyframes floating {
  0% {
    transform: translateY(1.5rem);
  }
  50% {
    transform: translateY(3rem);
  }
  100% {
    transform: translateY(1.5rem);
  }
}

.banner-text {
  margin-bottom: 0;
  font-size: 1rem;
  line-height: 1.75;
  @include mobile {
    font-size: 1.25rem;
  }
}

.scrolldown-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #fff;
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background-image: url("../../assets/images/arrow.svg");
  background-size: 16px;
  background-repeat: no-repeat;
  background-position: center;
  animation: breath 2s infinite;
}

@keyframes breath {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}

.feature {
  display: flex;
  flex-direction: column;
  background-color: $white;
  padding: 2rem 1rem;
  text-align: center;
  @include mobile {
    padding: 4rem 3rem;
  }
  @include pad {
    flex-direction: row;
  }
}

.feature-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
}

.feature-img {
  flex: 1;
  display: flex;
  min-height: 10rem;
  li {
    flex: 0 0 48%;
    margin: 0 1%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 0.25rem;
  }
}

.feature-img1 {
  background: url("../../assets/images/feature-1.jpg");
}

.feature-img2 {
  background: url("../../assets/images/feature-2.jpg");
}

.feature-img3 {
  background: url("../../assets/images/feature-3.jpg");
}

.feature-img4 {
  background: url("../../assets/images/feature-4.jpg");
}

.feature-title {
  display: inline-block;
  border-bottom: 2px solid $dark;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
}

.feature-text {
  margin: 0 auto;
  max-width: 20rem;
  line-height: 1.75;
  letter-spacing: 0.25rem;
}

.feature-swiper {
  width: 100%;
  margin: 2rem 0;
  padding: 0 1rem;
  @include pad {
    width: 50%;
  }
}

.swiper {
  height: 100%;
}

.swiper-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 2rem 1rem;
  .star {
    margin-bottom: 1.5rem;
  }
}

.intro {
  padding: 3rem 0 0;
  background-color: $info;
  @include mobile {
    padding: 4rem 0;
  }
}

.intro-item {
  position: relative;
  height: 100%;
  min-height: 20rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 0.25rem;
  text-align: center;
  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($dark, 0.4);
    transition: all 0.5s ease;
    border-radius: 0.25rem;
    z-index: 1;
  }
  &:hover:before {
    background: rgba($dark, 0.8);
  }
}

.intro-img1 {
  background-image: url("../../assets/images/intro-1.jpg");
}

.intro-img2 {
  background-image: url("../../assets/images/intro-2.jpg");
}

.intro-img3 {
  background-image: url("../../assets/images/intro-3.jpg");
}

.intro-content {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 5rem;
  z-index: 2;
  &:hover {
    color: $white;
    text-decoration: none;
  }
}

.intro-title {
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid $white;
}

.intro-text {
  line-height: 1.75;
  letter-spacing: 0.25rem;
}

.cover {
  padding: 2rem;
  text-align: center;
  color: $white;
  .logo {
    margin-bottom: 2rem;
    font-size: 3rem;
  }
  p {
    font-size: 1.25rem;
    letter-spacing: 0.25rem;
  }
}

.map {
  position: relative;
  iframe {
    display: block;
    width: 100%;
    min-height: 20rem;
  }
}

.us {
  display: none;
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 2rem 3rem;
  background-color: $secondary;
  border-radius: 0.25rem;
  text-align: center;
  color: $white;
  @include pad {
    display: block;
  }
  li {
    margin-bottom: 0.25rem;
  }
  .logo {
    margin-bottom: 0.75rem;
  }
}
</style>
