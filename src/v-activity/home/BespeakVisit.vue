<template>
  <div>
    预约参观
    {{bbb}}
    <div>
      <button @click="new2">新打开窗口2</button>
      <button @click="back">返回</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bbb: this.$store.state.activityList
      }
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
        this.$router.closeActivity("slide-top")
      }
    },
    mounted(){

    }
  }
</script>

