<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="col-12 col-lg-6 col-xl-4"
        v-for="item in storages"
        :key="item.id"
      >
        <div class="card mb-4">
          <div
            class="card-img"
            :style="{ backgroundImage: 'url(' + item.path + ')' }"
          ></div>
          <div class="card-body text-center">
            <div class="form-group">
              <label for="imageUrl">圖片網址</label>
              <input
                type="imageUrl"
                class="form-control"
                id="imageUrl"
                :value="item.path"
                disabled
              />
            </div>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click.prevent="openDelModal(item)"
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- delModal -->
    <div
      class="modal fade"
      id="delModal"
      role="dialog"
      aria-labelledby="delModalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-light">
            <h5 class="modal-title" id="delModalTitle">刪除圖片</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">確定要刪除此圖片 (刪除後無法復原)</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-dark"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click.prevent="delStorage()"
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>

    <Pagination @get-data="getStorages" />
  </div>
</template>

<script>
/* global $ */
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'StoragesManage',
  data () {
    return {
      pagination: {},
      storages: {},
      tempStorage: {}
    }
  },
  methods: {
    getStorages (page = 1) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage?page=${page}&paged=6`
      vm.$store.dispatch('updateLoading', true, { root: true })
      vm.$http.get(url).then((res) => {
        vm.storages = res.data.data
        vm.$store.dispatch('paginationModules/getPagination', { routerName: this.$route.name, data: res.data })
        vm.$store.dispatch('updateLoading', false, { root: true })
      })
    },
    delStorage () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage/${vm.tempStorage.id}`
      vm.$store.dispatch('updateLoading', true, { root: true })
      vm.$http
        .delete(url)
        .then(() => {
          vm.getStorages()
          vm.$store.dispatch('updateLoading', false, { root: true })
          const msg = {
            icon: 'success',
            title: '刪除圖片成功'
          }
          vm.$store.dispatch('alertMessageModules/openToast', msg)
        })
        .catch(() => {
          vm.$store.dispatch('updateLoading', false, { root: true })
          const msg = {
            icon: 'error',
            title: '刪除圖片失敗'
          }
          vm.$store.dispatch('alertMessageModules/openToast', msg)
        })
      $('#delModal').modal('hide')
    },
    openDelModal (item) {
      $('#delModal').modal('show')
      this.tempStorage = { ...item }
    }
  },
  components: {
    Pagination
  },
  created () {
    this.getStorages()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/all";

.card-img {
  max-width: 100%;
  height: 12rem;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
