<template>
  <div>
    <div class="pagebanner pagebanner-img">
    </div>
    <div class="about">
      <div class="about-info" data-aos="zoom-in" data-aos-duration="1000">
        <h3 class="about-title">關於 Antique</h3>
        <p class="about-text">
            販售由歐洲與日本進口品質優良且具有設計感的老物件，適用於日常使用或空間陳設。也提供商業空間陳列設計與空間攝影。
          </p>
        </div>
      <div class="about-slider">
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide>
            <div class="about-img about-img1"></div>
          </swiper-slide>
          <swiper-slide>
            <div class="about-img about-img2"></div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <div class="about about-idea">
      <div class="about-info" data-aos="zoom-in" data-aos-duration="1000">
        <h3 class="about-title">經營理念</h3>
        <p class="about-text">
            Antique 致力於發掘老件的美，藉由修復與保存以創造物件的生命延續性，傳達兼具環境友善與個人品味的美學價值。
          </p>
        </div>
      <div class="about-slider">
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide>
            <div class="about-img about-img3"></div>
          </swiper-slide>
          <swiper-slide>
            <div class="about-img about-img4"></div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'About',
  data () {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          bulletClass: 'bullet-custom',
          bulletActiveClass: 'bullet-custom-active'
        }
      }
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

.pagebanner-img {
  background-image: url('../../assets/images/banner-about.jpg');
}

.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  @include desktop-s {
    flex-direction: row;
  }
}

@include desktop-s {
  .about-idea {
    flex-direction: row-reverse;
  }
}

.about-info {
  flex: 1;
  padding: 3rem 0;
  text-align: center;
}

.about-title {
  display: inline-block;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid $dark;
  font-size: 1.75rem;
}

.about-text {
  max-width: 19rem;
  margin: 0 auto;
  line-height: 1.75;
  letter-spacing: 0.25rem;
}

.about-slider {
  width: 100%;
  padding: 1.5rem;
  background-color: $light;
  @include desktop-s {
    width: 50%;
    padding: 2rem;
  }
}

.about-img {
  min-height: 24rem;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.about-img1 {
  background-image: url('../../assets/images/about-1.jpg');
}

.about-img2 {
  background-image: url('../../assets/images/about-2.jpg');
}

.about-img3 {
  background-image: url('../../assets/images/about-3.jpg');
}

.about-img4 {
  background-image: url('../../assets/images/about-4.jpg');
}
</style>
