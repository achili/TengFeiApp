<template>
  <div class="archive">
    <div class="archive-first-block">
      <div class="archive-first-block-svg" @click="$router.closeActivity()" :style="'background:url(\''+(require('../../assets/svg/register/arrow.svg'))+'\') center no-repeat'">
      </div>
      <div class="archive-first-block-name">
        档案
      </div>
      <div class="archive-first-block-edit"  @click="$router.openActivity('edit_information')">
        编辑
      </div>
    </div>

    <div class="archive-index-content">
      <div class="archive-header" v-if="user.isLogin">
        <div class="archive-header-img">
          <img :src="user.getAvatarUrl(240, 240)">
        </div>
        <div class="archive-header-word">
          <div class="archive-header-word-name">
            {{user.name}}
          </div>
          <div class="archive-header-word-description">
            {{user.localArea}}
          </div>
        </div>
      </div>
    </div>

    <div class="archive-content">
      <div class="archive-content-title">
        关于我
      </div>
      <div class="archive-content-description">
        {{user.description}}
      </div>
    </div>
    <div class="archive-content">
      <div class="archive-content-title">
        电子邮箱
      </div>
      <div class="archive-content-description">
        {{user.email}}
      </div>
    </div>
    <div class="archive-content"  @click="bindWeChat">
      <div class="archive-content-title">
        微信
      </div>
      <div class="archive-content-description">
        <span v-if="user.unionid">{{user.weChat}}</span>
        <span v-else>点击绑定微信</span>
      </div>
    </div>
    <div class="archive-content">
      <div class="archive-content-title">
        公司
      </div>
      <div class="archive-content-description">
        {{user.companyName}}
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        user: this.$store.state.user
      }
    },
    components: {

    },
    methods: {
      bindWeChat() {
        let that = this;
        if (!this.user.unionid) {
          that.user.httpBindWeChat(that.user.unionid, function () {
            that.$store.state.plus.nativeUI.toast("绑定微信成功",{duration:"short"});
          })
        }
      }
    },
    mounted(){
      let that = this;
      if (!this.user.weChat && this.user.unionid) {
        this.user.getWeChatName();
      }

    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .archive {
    padding: 10px 20px 30px 20px;
    .archive-first-block {
      position: relative;
      font-size: 18px;
      .archive-first-block-svg {
        height: 30px;
        width: 30px;
        display: inline-block;
      }
      .archive-first-block-name {
        display: inline-block;
        position: absolute;
        right: 46%;
        font-weight: 600;
      }
      .archive-first-block-edit {
        position: absolute;
        right: 0;
        display: inline-block;
        color: #00B3E4;
      }
    }
    .archive-index-content {
      .archive-header {
        padding: 20px 0 20px 0;
        border-bottom: 1px solid #ECEEEF;
        height: 80px;
        text-align: left;
        .archive-header-img {
          float: left;
          padding-right: 20px;
          img {
            border-radius: 50%;
            width: 80px;
            height: 80px;
          }
        }
        .archive-header-word {
          width: auto;
          line-height: 30px;
          height: 20px;
          padding-top: 10px;
          .archive-header-word-name {
            font-size: 18px;
            font-weight: 600;
          }
          .archive-header-word-description {
            color: #888888;
          }
        }
      }

    }
    .archive-content {
      padding: 25px 0;
      border-bottom: 1px solid #ECEEEF;
      .archive-content-title {
        font-size: 16px;
        color: #8F8F8F;
        padding-bottom: 5px;
      }
      .archive-content-description {
        font-size: 18px;
        color: #494949;

      }
    }
  }
</style>
