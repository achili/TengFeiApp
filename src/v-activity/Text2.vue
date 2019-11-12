<template>
  <div>
    这是Text2
    <div>
      <button @click="new1">新打开窗口1</button>
      <button @click="back">返回</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    components: {

    },
    methods: {
      new1() {
        this.$router.openActivity("text1", "slide-top")
      },
      new2() {
        this.$router.openActivity("text2")
      },
      back() {
        this.$router.closeActivity()
      }
    },
    mounted(){

    }
  }
</script>

