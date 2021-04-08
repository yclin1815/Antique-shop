import Vue from 'vue'
import axios from 'axios'
import router from '@/router'

import categoryImgAllmenu from '@/assets/images/banner-allmenu.jpg'
import categoryImgFurniture from '@/assets/images/banner-furniture.jpg'
import categoryImgDeco from '@/assets/images/banner-deco.jpg'
import categoryImgCamera from '@/assets/images/banner-camera.jpg'
import categoryImgKitchen from '@/assets/images/banner-kitchen.jpg'
import categoryImgCar from '@/assets/images/banner-car.jpg'

export default ({
  namespaced: true,
  state: {
    products: [],
    product: [],
    categoryImg: categoryImgAllmenu,
    categories: [
      {
        title: '全部商品',
        categoryImg: categoryImgAllmenu
      },
      {
        title: '家具商品',
        categoryImg: categoryImgFurniture
      },
      {
        title: '佈置擺飾',
        categoryImg: categoryImgDeco
      },
      {
        title: '底片相機',
        categoryImg: categoryImgCamera
      },
      {
        title: '廚房道具',
        categoryImg: categoryImgKitchen
      },
      {
        title: '古董汽車',
        categoryImg: categoryImgCar
      }
    ]
  },
  actions: {
    getProducts (context, { routerName, page }) {
      return new Promise((resolve) => {
        let url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`
        if (routerName === 'ProductsManage') {
          url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}&paged=10`
        }
        context.commit('LOADING', true, { root: true })
        axios.get(url).then((res) => {
          context.commit('PRODUCTS', res.data.data)

          if (routerName === 'Products') {
            // 查詢各商品是否有在喜愛商品中，有則加入 isFavorite:true
            context.state.products.forEach((productItem, index) => {
              context.commit('UPDATE_PRODUCTS', { index, isFavorite: false })
              context.rootState.favoriteModules.favorites.forEach((favoriteItem) => {
                if (productItem.id === favoriteItem.id) {
                  context.commit('UPDATE_PRODUCTS', { index, isFavorite: true })
                }
              })
            })
          }
          context.commit('LOADING', false, { root: true })
          resolve(res)
        })
      })
    },
    getProduct (context, { productId }) {
      return new Promise((resolve) => {
        const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/product/${productId}`
        context.commit('LOADING', true, { root: true })
        axios.get(url).then((res) => {
          context.commit('PRODUCT', res.data.data)
          context.commit('CATEGORY_IMG', res.data.data.category)
          context.commit('LOADING', false, { root: true })
        }).catch(() => {
          context.commit('LOADING', false, { root: true })
          Vue.swal({
            title: '錯誤',
            text: '找不到此商品，將返回商品頁',
            confirmButtonColor: '#dc3545',
            confirmButtonText: '確認',
            customClass: {
              title: 'swal-title swal-title-danger'
            }
          }).then(() => {
            router.push('/products')
          })
        })
        resolve()
      })
    },
    updateCategoryImg (context, category) {
      context.commit('CATEGORY_IMG', category)
    }
  },
  mutations: {
    PRODUCTS (state, payload) {
      state.products = payload
    },
    UPDATE_PRODUCTS (state, { index, isFavorite }) {
      Vue.set(state.products[index], 'isFavorite', isFavorite)
    },
    PRODUCT (state, payload) {
      state.product = payload
    },
    CATEGORY_IMG (state, categoryName) {
      let img = categoryImgAllmenu
      state.categories.forEach((item, index) => {
        if (item.title === categoryName) {
          img = state.categories[index].categoryImg
        }
      })
      state.categoryImg = img
    }
  },
  getters: {
    products: (state) => state.products,
    product: (state) => state.product,
    categories: (state) => state.categories,
    categoryImg: (state) => state.categoryImg
  }
})
