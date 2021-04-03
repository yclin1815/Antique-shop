<template>
  <div>
    <AlertMessage/>

    <loading :active.sync="isLoading" :is-full-page="true"></loading>

    <div class="header js-header">
      <a href="#" class="menu-toggle " @click.prevent="isMenuOpen = !isMenuOpen">Menu</a>
      <router-link to="/" class="header-logo">Antique</router-link>
      <div class="header-inner">
        <div class="header-block"></div>
        <ul class="menu-collapse" :class="{'active': isMenuOpen}">
          <li>
            <router-link to="/" class="header-link">HOME</router-link>
          </li>
          <li>
            <router-link to="/about" class="header-link">ABOUT</router-link>
          </li>
          <li>
            <router-link to="/products" class="header-link">PRODUCTS</router-link>
          </li>
        </ul>
        <ul class="header-list">
          <li class="dropdown">
            <a href="#" class="header-link cart" role="button" data-toggle="dropdown">
              <i class="fas fa-shopping-cart fa-lg"></i>
              <span class="cart-num">( {{ cartsNum }} )</span>
            </a>
            <div class="dropdown-menu dropdown-menu-right px-2">
              <h5 class="text-center">購物車</h5>
              <table class="table mb-0" style="min-width: 300px;">
                <tbody>
                  <tr v-for="cart in carts" :key="cart.id">
                    <td>
                      <a href="#" class="text-danger" @click.prevent="openDelModal(cart.product.id)">
                        <i class="far fa-trash-alt"></i>
                      </a>
                    </td>
                    <td class="px-1">
                      {{ cart.product.title }}
                    </td>
                    <td class="px-1">
                      {{ cart.quantity }} 件
                    </td>
                    <td class="px-1 text-right">
                      {{ cart.product.price | currency }}
                    </td>
                  </tr>
                </tbody>
              </table>

              <p class="mb-0 text-center" v-if="!cartsNum">購物車內無商品</p>

              <router-link to="/createorder" class="btn btn-block btn-dark" v-else>
                查看購物車
              </router-link>
            </div>
          </li>
          <li>
            <router-link to="/login" class="header-link">
              <i class="fas fa-user fa-lg"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <router-view @get-carts="getCarts" :key="$route.fullPath" ref="view"></router-view>

    <div class="footer">
      ⓒ 2021 Antique
    </div>

  </div>
</template>

<script>
import AlertMessage from '../components/AlertMessage.vue'
import $ from 'jquery'
$(document).ready(function () {
  $(window).on('scroll', function () {
    var scrollDistance = $(window).scrollTop()
    var $header = $('.js-header')
    if (scrollDistance > 80) {
      $header.addClass('s-header')
      $('.header-block').hide()
    } else {
      $header.removeClass('s-header')
      $('.header-block').show()
    }
  })
})
export default {
  name: 'Layout',
  data () {
    return {
      isLoading: false,
      isMenuOpen: false,
      carts: [],
      cartsNum: 0,
      tempData: {}
    }
  },
  methods: {
    getCarts () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
      vm.isLoading = true
      vm.$http.get(url).then((res) => {
        vm.carts = res.data.data
        vm.cartsNum = vm.carts.length
        vm.isLoading = false
      })
    },
    openDelModal (id) {
      const vm = this
      vm.$swal({
        title: '確定要刪除此商品？',
        text: '（刪除後無法復原）',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        allowOutsideClick: false,
        confirmButtonText: '確認刪除',
        cancelButtonText: '考慮一下'
      }).then((result) => {
        if (result.isConfirmed) {
          vm.delCartItem(id)
        }
      })
    },
    delCartItem (id) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping/${id}`
      vm.isLoading = true
      vm.$http.delete(url, { product: id }).then(() => {
        vm.isLoading = false
        const msg = {
          icon: 'success',
          title: '商品已刪除'
        }
        vm.$bus.$emit('alertmessage', msg)
        vm.getCarts()

        // 若在 checkorder 頁則重整內頁購物車
        if (vm.$refs.view.$route.name === 'CreateOrder') {
          vm.$refs.view.getCarts()
        }
      }).catch(() => {
        const msg = {
          icon: 'error',
          title: '刪除失敗'
        }
        vm.$bus.$emit('alertmessage', msg)
        vm.isLoading = false
      })
    }
  },
  components: {
    AlertMessage
  },
  created () {
    const vm = this
    vm.getCarts()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/all';

.header {
  display: flex;
  padding: 0px 2vw 0px 2vw;
  align-items: center;
  position: fixed;
  z-index: 998;
  width: 100%;
  top: 0;
  text-align: center;
  background-color: rgb(0 0 0 / 30%);
  transition: all 0.3s;
  justify-content: space-between;
  a:hover {
    text-decoration: none;
  }
  @include desktop {
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 15px;
  }
}
.s-header {
  background-color: $dark;
  box-shadow: 5px 0px 10px rgb(0 0 0 / 20%);
  @include desktop {
    padding: 0px 80px;
    flex-wrap: nowrap;
  }
}
.header-logo {
  flex: 0 0 24%;
  padding-bottom: 0.55rem;
  font-family: $font-logo;
  font-size: 1.75rem;
  @include desktop {
    transform: translate(-8px, -8px);
    padding: 0;
    font-size: 3rem;
    flex: 0 0 20%;
  }
}
.header-inner{
  display: flex;
  flex: 0 0 12%;
  display: relative;
  flex-wrap: nowrap;
  justify-content: flex-end;
  @include desktop {
    flex: 0 0 81%;
    justify-content: space-between;
  }
}
.header-list {
  flex: 0 0 33%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.header-link {
  padding: 1rem 0.8rem 1rem 0.8rem;
  &.active {
    color: darken($primary, 15%);
  }
}
.header-block{
  display: none;
  @include desktop {
    flex: 0 0 33%;
    display: flex;
  }
}
.menu-collapse {
  position: absolute;
  top: 56px;
  right: 0;
  left: 0;
  max-height: 0;
  overflow: hidden;
  background-color: $dark;
  transition: 0.5s all ease-in;
  text-align: center;
  z-index: 999;
  @include desktop {
    flex: 0 0 34%;
    display: flex;
    background: transparent;
    position: relative;
    top: auto;
    max-height: 3.25rem;
    justify-content: space-around;
  }
  &.active {
    max-height: 10.5rem;
    transition: 0.5s all ease-in;
  }
}

.menu-toggle {
  flex: 0 0 12%;
  justify-content: flex-start;
  @include desktop {
    display: none;
  }
}

.cart {
  position: relative;
  margin-right: 0.75rem;
}

.cart-num {
  position: absolute;
  top: 0.4rem;
  font-size: 0.75rem;
  white-space:nowrap;
}

.footer {
  background-color: $dark;
  padding: 0.75rem;
  text-align: center;
  color: $white;
}

</style>
