<template>
  <div class="details">
    <h2>{{ detail.title }}</h2>
    <div v-html="detail.content" class="details-content"></div>
  </div>
</template>

<script>
export default {
  created() {
    this.getGoodsDetail()
  },

  data() {
    return {
      detail: {}
    }
  },

  methods: {
    getGoodsDetail() {
      this.$http.get(`api/goods/getdesc/${this.$route.params.id}`)
        .then(res => {
          const body = res.body

          if(body.status === 0) {
            this.detail = body.message[0]
          }
        })
    }
  }
}
</script>

<style lang="scss">
  .details {
    h2 {
      font-size: 20px;
      text-align: center;
      color: #26a2ff;
      padding: 10px 0;
    }

    .details-content {
      border-top: 1px solid #ccc;
      margin: 10px 4px 0 4px;
      padding-top: 10px;

      table {
        width: 100%
      }
    }

    img {
      width: 100%;
      display: block;
    }
  }
</style>
