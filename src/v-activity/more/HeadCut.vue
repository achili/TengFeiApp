<template>
  <div class="head-cut-activity">
    <div class="head-cut-title">
      <div class="close" @click="back">
        <div class="close-ico"></div>
      </div>
      <div class="determine" @click.prevent="determine">
        <span>确认</span><i class="fa fa-spinner fa-spin" v-if="loading"></i>
      </div>
    </div>
    <div class="vue-cropper-box">
      <vueCropper class="vue-cropper"
                  ref="vueCropper"
                  :img="cropper.img"
                  :info="cropper.info"
                  :canScale="cropper.canScale"
                  :outputType="cropper.outputType"
                  :autoCrop="cropper.autoCrop"
                  :fixed="cropper.fixed"
                  :fixedNumber="cropper.fixedNumber"
                  :fixedBox="cropper.fixedBox"
                  :canMove="cropper.canMove"
                  :canMoveBox="cropper.canMoveBox"
      ></vueCropper>
    </div>

  </div>
</template>

<script>
  /**
   * https://www.npmjs.com/package/vue-cropper vue-cropper
   */
  import VueCropper from 'vue-cropper';
  import Tank from "../../common/model/tank/Tank";

  export default {
    data() {
      let data;
      return {
        cropper: {
          img: data,
          info: true,
          canScale: true,//允许滚轮缩放
          outputType: 'jpeg',
          autoCrop: true,
          // 开启宽度和高度比例
          fixed: true,
          fixedNumber: [1, 1],
          fixedBox: true,
          canMove: true,
          canMoveBox:false
        },
        user: this.$store.state.user,
        tank: this.$store.state.temps.headCutTank,
        loading: false
      }
    },
    components: {
      VueCropper
    },
    methods: {
      determine() {
        if(this.loading) {
          return;
        }
        this.loading = true;
        let that = this;
        this.$refs.vueCropper.getCropBlob((data) => {

          let name = that.tank.file.name;
          // console.log(data);
          that.tank.file = new File([data], that.tank.file.name);
          that.tank.httpUpload(function (response) {
            that.$store.state.plus.nativeUI.toast("上传成功",{duration:"short"});
            that.$router.closeActivity();
          }, function() {
            that.$store.state.plus.nativeUI.toast("上传失败",{duration:"short"});
            that.loading = false;
          })
        });

      },
      back() {
        this.$router.closeActivity("slide-top")
      }
    },
    mounted(){
      let that = this;
      let reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          that.cropper.img = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          that.cropper.img = e.target.result;
        }
      };
      reader.readAsArrayBuffer(this.tank.file);
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .head-cut-activity {
    height: 100vh;
    width: 100%;
    background: black;
    .head-cut-title {
      display: flex;
      padding: 10px 20px 0 20px;
      line-height: 40px;
      background: #F9F9F9;
      border-bottom: #EFEFEF 1px solid;
      .close {
        flex: 1;
        .close-ico {
          background: url("../../assets/svg/home/index/circle/circle-back.svg") no-repeat 50% 50% content-box;
          height: 100%;
          width: 25px;
        }
      }
      .title {
        text-align: center;
        flex: 1;
        font-size: 20px;
        font-weight: 600;
      }
      .share {
        color: #1B88FF;
        text-align: right;
        flex: 1;
        font-size: 16px;
      }
    }

    .vue-cropper-box {

      height: calc(100vh - 51px);
      .vue-cropper {
        margin: auto;
        background: black;
        height: 100%;
      }
    }
    .cropper-bg {
      background: black;
    }
  }
</style>

