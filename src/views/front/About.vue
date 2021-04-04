<template>
  <div>
    <loading :active.sync="isLoading" :is-full-page="true"></loading>

    <div class="pagebanner pagebanner-img">
    </div>

    <div class="brand">
      <div class="brand-about">
        <div  data-aos="zoom-in" data-aos-duration="1000">
          <h3 class="brand-title">關於 Antique</h3>
          <p class="brand-text">
            販售由歐洲與日本進口品質優良且具有設計感的老物件，適用於日常使用或空間陳設。也提供商業空間陳列設計與空間攝影。
          </p>
        </div>
      </div>
      <div class="brand-idea">
        <div class="idea-content" data-aos="zoom-in" data-aos-duration="1000">
          <h3 class="brand-title">經營理念</h3>
          <p class="brand-text">
            Antique 致力於發掘老件的美，藉由修復與保存以創造物件的生命延續性，傳達兼具環境友善與個人品味的美學價值。
          </p>
        </div>
        <div class="idea-img"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      isLoading: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/all";

.pagebanner-img {
  background-image: url('../../assets/images/banner-about.jpg');
}

.brand {
  background: $light;
  text-align: center;
}

.brand-title {
  display: inline-block;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid $dark;
  font-size: 1.75rem;
}

.brand-text {
  max-width: 21rem;
  margin: 0 auto;
  line-height: 1.75;
  letter-spacing: 0.25rem;
}

.brand-about {
  padding: 5rem 0;
    background: $light;
    @include pad {
    background: linear-gradient(90deg, $light 50%, $white 50%);
    padding: 7rem 0;
  }
}

.brand-idea {
  display: flex;
  flex-direction: column;
  background: $white;
  @include pad {
    background: linear-gradient(90deg, $white 50%, $light 50%);
    flex-direction: row;
  }
}

.idea-content {
  width: 100%;
  margin: 0 auto;
  padding: 5rem 0;
  @include pad {
    width: 50%;
    padding: 7rem 0;
  }
}

.idea-img {
  flex: 1;
  min-height: 20rem;
  margin: 0;
  background: url("../../assets/images/about.jpg") center center no-repeat;
  background-size: cover;
  @include pad {
    margin: 2rem;
  }
}

</style>
