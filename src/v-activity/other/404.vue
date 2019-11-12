<template>
  <div class="h400">
    <div class="text-center mt100" style="font-size: 120px">
      404
    </div>
    <div class="text-center">
      您访问的页面不存在！
    </div>
    <div class="text-center">
      <a @click="goBack">返回上一页面</a>
    </div>
    <div class="text-center">
      <a @click="go">回到首页</a>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      go() {
        this.$router.push("/");
      }
    }
  }
</script>

