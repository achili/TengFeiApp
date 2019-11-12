<template>
  <div class="edit-information">
    <div class="edit-information-first-block">
      <div class="edit-information-first-block-svg" @click="$router.closeActivity()" :style="'background:url(\''+(require('../../assets/svg/register/arrow.svg'))+'\') center no-repeat'">
      </div>
      <div class="edit-information-first-block-name">
        编辑档案
      </div>
      <div class="edit-information-first-block-edit"  @click="edit()">
        保存
      </div>
    </div>

    <div class="edit-information-index-content">
      <div class="edit-information-header" v-if="user.isLogin">
        <div class="edit-information-header-img">
          <div v-if="tank.exist()">
            <img :src="tank.getUrlBySize(440, 440)">
            <input ref="refFile" type="file" name="avatar" class="edit-information-header-input" @change.prevent.stop="fileChanged"/>
          </div>
          <div v-else>
            <img :src="user.getAvatarUrl(440, 440)">
            <input ref="refFile" type="file" name="avatar" class="edit-information-header-input" @change.prevent.stop="fileChanged"/>
          </div>
        </div>
      </div>
    </div>

    <div class="edit-information-footer">
      <div class="edit-information-footer-description">
        {{nameTest.description}}
      </div>
      <NbFormItem :formItem="nameTest"></NbFormItem>
      <div class="edit-information-footer-description">
        {{localAreaTest.description}}
      </div>
      <NbFormItem :formItem="localAreaTest"></NbFormItem>
      <div class="edit-information-footer-description">
        {{descriptionTest.description}}
      </div>
      <NbFormItem :formItem="descriptionTest"></NbFormItem>
      <div class="edit-information-footer-description">
        {{emailTest.description}}
      </div>
      <NbFormItem :formItem="emailTest"></NbFormItem>

      <div style="margin-top: 25px;margin-bottom: 5px;color: #888888;">
        微信
      </div>
      <div v-if="this.user.unionid" style="border-bottom: 1px solid #EAEEEF;padding-bottom: 20px;">
        <input :disabled="true" v-model="user.weChat" style="border: none;background-color: #FFFFFF;font-size: 18px;width: 70%;">
        <span style="color: red;text-align: right;" @click="cancelAssociation">取消关联</span>
      </div>
      <div v-else style="border-bottom: 1px solid #EAEEEF;padding-bottom: 20px;">
        <!--<input style="border: none;background-color: #FFFFFF;font-size: 18px;width: 70%;resize: none;outline: none;">-->
        <span style="font-size: 18px;" @click="bindWeChat">点击绑定微信</span>
      </div>

      <div class="edit-information-footer-description">
        {{companyNameTest.description}}
      </div>
      <NbFormItem :formItem="companyNameTest"></NbFormItem>
    </div>

    <div class="popup-box" v-if="cancelWeChatShow">
      <CancelWeChatShow :closeCall="closeAllPopup"></CancelWeChatShow>
    </div>
  </div>
</template>
<script>
  import FormItem from "../../common/model/_base/FormItem";
  import NbFormItem from "../../components/widget/NbFormItem";
  import Tank from '../../common/model/tank/Tank'
  import CancelWeChatShow from '../../v-activity/more/spaceOrder/editInformation/CancelWeChatShow'

  export default {
    data() {
      let tank = new Tank("*", false, 1024 * 1024);
      tank.render(this.$store.state.user.avatar);
      return {
        user: this.$store.state.user,
        tank: tank,
        cancelWeChatShow: false,
        nameTest: new FormItem(FormItem.prototype.Type.INPUT, "姓名",true, true, "name", "user.name", this.$store.state.user.name,{max: 100, placeholder: "姓名"}),
        localAreaTest: new FormItem(FormItem.prototype.Type.INPUT, "地点",true, false, "localArea", "user.localArea", this.$store.state.user.localArea,{max: 100, placeholder: "地点"}),
        descriptionTest: new FormItem(FormItem.prototype.Type.INPUT, "关于我",true, false, "description", "user.description", this.$store.state.user.description,{max: 100, placeholder: "关于我"}),
        emailTest: new FormItem(FormItem.prototype.Type.INPUT, "电子邮箱",true, false, "email", "user.email", this.$store.state.user.email,{max: 100, placeholder: "电子邮箱", isEmail: true}),
        weChatTest: new FormItem(FormItem.prototype.Type.INPUT, "微信",true, false, "weChat", "user.weChat", this.$store.state.user.name + "的微信",{max: 100, readonly: "readonly"}),
        companyNameTest: new FormItem(FormItem.prototype.Type.INPUT, "公司",true, false, "companyName", "user.companyName", this.$store.state.user.companyName,{max: 100, placeholder: "公司"})
      }
    },
    components: {
      NbFormItem,
      CancelWeChatShow
    },
    watch: {
      "tank.errorMessage"() {
        this.$store.state.plus.nativeUI.toast("图片上传失败: " + this.tank.errorMessage,{duration:"short"})
      }
    },
    methods: {
      bindWeChat() {
        let that = this;
        if (!this.user.unionid) {
          that.user.httpBindWeChat(that.user.unionid, function () {
            that.$store.state.plus.nativeUI.toast("绑定微信成功",{duration:"short"});
          })
        }
      },
      fileChanged() {
        let that = this;
        let value = that.$refs['refFile'].value;
        console.log(value + "value");
        if (!value) {
          return
        }
        this.tank.file = this.$refs['refFile'].files[0];
        console.log(this.tank.file);
        this.$store.state.temps.headCutTank = this.tank;
        this.$router.openActivity('head_cut');
        this.$refs['refFile'].value = '';
        // this.tank.httpUpload(function (response) {
        //   if (typeof that.uploadSuccessCallback === 'function') {
        //     that.uploadSuccessCallback(that.tank)
        //   }
        // }, function () {
        //   that.$store.state.plus.nativeUI.toast("上传失败",{duration:"short"});
        //   that.clear()
        // })
      },
      clear() {
        this.tank.clear();
        this.$refs['refFile'].value = ''
      },
      edit() {
        let that = this;
        if (!this.nameTest.value) {
          this.$store.state.plus.nativeUI.toast("请填写姓名",{duration:"short"});
          return;
        }
        this.user.httpEditInformation(this.tank.uuid, this.nameTest.value, this.localAreaTest.value,
          this.descriptionTest.value, this.emailTest.value, this.weChatTest.value, this.companyNameTest.value, function (response) {
          that.$store.state.plus.nativeUI.toast("修改信息成功",{duration:"short"});
          that.$router.closeActivity();
        });
      },
      closeAllPopup() {
        this.cancelWeChatShow = false;
      },
      cancelAssociation() {
        this.cancelWeChatShow = true;
        // this.$store.state.plus.nativeUI.toast(this.user.name + "de微信",{duration:"short"});
      }
    },
    mounted(){

    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .edit-information {
    height: 100vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling:touch;
    .edit-information-first-block {
      position: relative;
      font-size: 18px;
      padding: 10px 20px 0 20px;
      .edit-information-first-block-svg {
        height: 30px;
        width: 30px;
        display: inline-block;
      }
      .edit-information-first-block-name {
        display: inline-block;
        position: absolute;
        right: 40%;
        font-weight: 600;
      }
      .edit-information-first-block-edit {
        position: absolute;
        right: 20px;
        display: inline-block;
        color: #00B3E4;
      }
    }
    .edit-information-index-content {
      padding: 35px 0;
      /*background-color: red;*/
      background-color: #F6F6F6;
      .edit-information-header {
        /*padding: 20px 0 20px 0;*/
        .edit-information-header-img {
          position: relative;
          height: 180px;
          width: 180px;
          margin: 0 auto;
          img {
            border-radius: 50%;
            width: 180px;
            height: 180px;
          }
          .edit-information-header-input {
            position: absolute;
            width: 100%;
            height: 100%;
            margin: 0 auto;
            left: 0;
            top: 0;
            opacity: 0;
            background-color: black;
          }
        }
      }
    }
    .edit-information-footer {
      color: #888888;
      padding: 0 20px 50px;
      .edit-information-footer-description {
        margin-bottom: -25px;
        margin-top: 25px;
      }
    }
  }
</style>
