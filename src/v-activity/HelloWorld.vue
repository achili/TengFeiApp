<template>
  <div class="hello">
    <div>
      <button @click="test">开始测试联网</button>
      <div>结果:{{testMsg}}</div>
    </div>
    <div>
      <a href="tel:10086">开始拨打电话</a>
      <button @click="tel">开始拨打电话js调用</button>
    </div>
    <div>
      <button @click="tel">消息推送(待完成)</button>
    </div>
    <div>
      <button @click="tel">调用摄像头(待完成)</button>
    </div>
    <div>
      <button @click="tel">手机识别码获取(待完成)</button>
    </div>
    <div>
      <button @click="tel">缓存和读取本地文件(待完成)</button>
    </div>
    <div>
      <button @click="tel">微信调用(待完成)</button>
    </div>
    <div>
      <button @click="tel">开机自动运行(待完成)</button>
    </div>


    <h2>Ecosystem</h2>

  </div>
</template>

<script>
  import {startWith} from "../common/filter/str";
  import Base from "../common/model/_base/Base";

  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        testMsg: "未请求"
      }
    },
    methods: {
      test() {
        let that = this;
        let base = new Base();
        base.httpPost("/app/test", {name :"测试?"}, function () {
          console.log("成功")
        });
      },
      tel() {
        window.location.href = "tel:10086";
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
