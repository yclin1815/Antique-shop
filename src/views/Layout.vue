<template>
  <div>
    <loading :active.sync="isLoading" :is-full-page="true"></loading>

    <div class="header" :class="{'header-scroll': isMenuOpen || scrollHeader}">
      <router-link to="/" class="header-logo">Antique</router-link>
      <div class="header-inner" :class="{'home-scroll': scrollHeader}">
        <!-- <div class="header-block"></div> -->
        <ul class="menu" :class="{'active': isMenuOpen}">
          <li>
            <router-link to="/" class="menu-link">HOME</router-link>
          </li>
          <li>
            <router-link to="/products" class="menu-link" :class="{'active': $route.name === 'Products' && 'router-link-active'}">PRODUCTS</router-link>
          </li>
          <li>
            <router-link to="/about" class="menu-link">ABOUT</router-link>
          </li>
          <li>
            <router-link to="/contact" class="menu-link">CONTACT</router-link>
          </li>
        </ul>
        <ul class="header-toolbar">
          <li class="dropdown">
            <a href="#" class="toolbar-link p-3" role="button" data-toggle="dropdown">
              <i class="fas fa-heart"></i>
              <span class="toolbar-num">{{ favoritesNum }}</span>
            </a>
            <div class="dropdown-menu dropdown-menu-right px-2">
              <h5 class="text-center">喜愛商品</h5>
              <table class="table table-hover mb-1" style="min-width: 300px;">
                <tbody>
                  <tr v-for="favorite in favorites" :key="favorite.key">
                    <td class="p-0">
                      <router-link :to="`/products/${favorite.id}`" class="favorite-link">
                        <span class="toolbar-thumbnail mr-3"
                        :style="{backgroundImage: 'url(' + favorite.imageUrl + ')'}">
                        </span>
                        <p class="mb-1">{{ favorite.title }}</p>
                      </router-link>
                    </td>
                    <td class="px-1 align-middle">
                      <a href="#" class="toolbar-delicon"
                        @click.prevent="delFavoriteItem(favorite)">
                        <i class="fas fa-times"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="!favoritesNum">
                <p class="mb-2 text-center text-muted" v-if="!favoritesNum">無喜愛商品</p>
                <router-link to="/products" class="btn btn-block btn-dark">看更多商品</router-link>
              </div>
              <a href="#" class="btn btn-block btn-outline-danger"
               @click.prevent="delFavoriteAll()" v-else
               data-toggle="modal" data-target="#delModal"
              >
                全部清空
              </a>
            </div>
          </li>
          <li class="dropdown">
            <a href="#" class="toolbar-link p-3" role="button" data-toggle="dropdown">
              <i class="fas fa-shopping-bag"></i>
              <span class="toolbar-num">{{ cartNum }}</span>
            </a>
            <div class="dropdown-menu dropdown-menu-right px-2">
              <h5 class="text-center">購物車清單</h5>
              <table class="table mb-0" style="min-width: 300px;">
                <tbody>
                  <tr v-for="cart in carts" :key="cart.id">
                    <td>
                      <span class="toolbar-thumbnail mx-auto"
                       :style="{backgroundImage: 'url(' + cart.product.imageUrl[0] + ')'}">
                      </span>
                    </td>
                    <td class="px-1 align-middle">
                      <p class="mb-1">{{ cart.product.title }} x {{ cart.quantity }}</p>
                      <p class="mb-0">
                        {{ cart.product.price * cart.quantity | currency }}
                      </p>
                    </td>
                    <td class="px-1 align-middle">
                      <a href="#" class="toolbar-delicon"
                        @click.prevent="delCartItem(cart.product.id)">
                        <i class="fas fa-times"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div v-if="!cartNum">
                <p class="mb-2 text-center text-muted">購物車無商品</p>
                <router-link to="/products" class="btn btn-block btn-dark">購物去</router-link>
              </div>

              <router-link to="/createorder" class="btn btn-block btn-dark" v-else>
                查看購物車
              </router-link>
            </div>
          </li>
          <a href="#" class="menu-toggle" @click.prevent="isMenuOpen = !isMenuOpen">
          <span class="p-3" v-show="!isMenuOpen">
            <i class="fas fa-bars"></i>
          </span>
          <span class="p-3" v-show="isMenuOpen">
            <i class="fas fa-times"></i>
          </span>
          </a>
        </ul>
      </div>
    </div>
    <router-view :key="$route.fullPath" ref="view">
    </router-view>
    <div class="footer">
      ⓒ 2021 Antique
    </div>
  </div>
</template>

<script>
/* global $ */
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Layout',
  data () {
    return {
      scrollHeader: false,
      isMenuOpen: false,
      routerName: this.$route.name
    }
  },
  methods: {
    delCartItem (id) {
      this.$store.dispatch('cartModules/delCartItem', id)
    },
    delFavoriteItem (item) {
      const { routerName } = this
      this.$store.dispatch('favoriteModules/delFavoriteItem', item)
        .then(() => {
          if (routerName === 'Products') {
            this.$store.dispatch('productsModules/getProducts', { routerName })
          }
        })
    },
    delFavoriteAll () {
      const { routerName } = this
      this.$swal({
        title: '刪除喜愛商品',
        text: '確定要刪除全部喜愛商品 (刪除後無法復原)',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#343a40',
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        customClass: {
          title: 'swal-title swal-title-danger'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('favoriteModules/delFavoriteAll')
            .then(() => {
              if (routerName === 'Products') {
                this.$store.dispatch('productsModules/getProducts', { routerName })
              }
            })
        }
      })
    },
    scrollPage () {
      const vm = this
      const scrollTop = $(window).scrollTop()
      const { routerName } = this
      switch (true) {
        case routerName === 'Home' && scrollTop > 0:
          window.addEventListener('scroll', vm.scrollPage)
          vm.scrollHeader = true
          break
        case routerName === 'Home':
          window.addEventListener('scroll', vm.scrollPage)
          vm.scrollHeader = false
          break
        default:
          window.removeEventListener('scroll', vm.scrollPage)
          vm.scrollHeader = true
          break
      }
    },
    ...mapActions('cartModules', ['getCarts'])
  },
  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('cartModules', ['carts', 'cartNum']),
    ...mapGetters('favoriteModules', ['favorites', 'favoritesNum'])
  },
  watch: {
    $route (to, from) {
      const vm = this
      if (to.path !== from.path) {
        vm.routerName = to.name
        vm.isMenuOpen = false
        vm.scrollPage()
      }
    }
  },
  created () {
    const vm = this
    vm.$store.dispatch('cartModules/getCarts')
    vm.$store.dispatch('favoriteModules/getFavorites')
    vm.scrollPage()
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
.header-scroll {
  background-color: $dark;
  box-shadow: 5px 0px 10px rgb(0 0 0 / 20%);
  @include desktop {
    padding: 0px 80px;
    flex-wrap: nowrap;
  }
}
.header-logo {
  flex: 0 0 20%;
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
  flex: 0 0 60%;
  flex-wrap: nowrap;
  justify-content: flex-end;
  @include desktop {
    flex: 0 0 81%;
  }
}
.home-scroll{
  justify-content: space-between;
}

.header-block{
  display: none;
  @include desktop {
    flex: 0 0 20%;
    display: flex;
  }
}
.menu {
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
  &.active {
    max-height: 14.5rem;
  }
  @include desktop {
    flex: 0 0 60%;
    display: flex;
    background: transparent;
    position: relative;
    top: auto;
    max-height: 3.25rem;
    justify-content: center;
  }
}
.menu-link {
  display: block;
  padding: 1rem 1.5rem;
  border-top: 1px solid $muted;
  color: darken($white, 30%);
  @include desktop {
    border-top: none;
    background-color: transparent;
  }
    &.active {
    color: lighten($white, 20%);
  }
  &:hover {
    color: $warning;
  }
}

.menu-toggle {
  max-width: 2.5rem;
  color: $white;
    &:hover {
      color: $secondary;
    }
  @include desktop {
    display: none;
  }
}

.header-toolbar {
  display: flex;
  flex: 0 0 100%;
  align-items: center;
  justify-content: flex-end;
  @include desktop {
    flex: 0 0 20%;
  }
}

.toolbar-link {
  color: $white;
  &:hover, &:focus {
    color: $warning;
  }
}

.toolbar-thumbnail {
  display: inline-block;
  width: 3.5rem;
  height: 3.5rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.toolbar-num {
  padding: 0.25rem 0.25rem 0.25rem 0.5rem;
  font-size: 0.8rem;
}

.toolbar-delicon {
  padding: 0.5rem;
  color: lighten($danger, 20%);
  &:hover {
    color: $danger;
  }
}

.favorite-link {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  color: $dark;
  &:hover {
    color: $dark;
  }
}

.footer {
  background-color: $dark;
  padding: 0.75rem;
  text-align: center;
  color: $white;
}

</style>
