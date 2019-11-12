<template>
  <div class="inviting-visit">

    <div class="inviting-title">
      <span @click.stop="goClose">
        关闭
      </span>
    </div>

    <div class="inviting">
      <!--<input v-model="inviteVisitor.uuid" type="hidden" />-->
      <div class="content">邀请人用户名</div>
      <div>
        <input class="text-style" v-model="inviteVisitor.inviteName" readonly />
      </div>
      <div class="content">邀请人姓名</div>
      <div>
        <input class="text-style" v-model="inviteVisitor.name" type="text" />
      </div>
      <div class="content">来访日期</div>
      <div>
        <el-date-picker class="data-style" format="yyyy-MM-dd" v-model="inviteVisitor.invitingTime" type="date" :editable="false"></el-date-picker>
      </div>
      <div class="content">访问时间</div>
      <div>
        <el-time-picker format="HH:mm" is-range v-model="inviteVisitor.dayTime" class="input-time-range" :editable="false"
                        range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
        </el-time-picker>
        <!--<el-time-picker class="data-style" value-format="HH:mm" format="HH:mm" v-model="inviteVisitor.accessTime" type="time" ></el-time-picker>-->
      </div>
      <div class="content">访问人数</div>
      <div >
        <input class="text-style" v-model="inviteVisitor.visitorsNum" type="number" />
      </div>
      <div class="content">备注</div>
      <div>
        <textarea class="text-style" v-model="inviteVisitor.remark" type="text" placeholder="请填写备注信息..." >
        </textarea>
      </div>
      <div class="text">友情提醒：</div>
      <div class="remind">离访问开始时间少于2小时，将不再允许您取消或修改。</div>

    </div>

    <div class="save" @click="save" v-show="!editMode">
      确认邀请
    </div>

    <div class="save" @click="update" v-show="editMode">
      提交邀请
    </div>

    <div class="popup-box" v-if="callServiceShow">
      <InvitingShare :closeCall="closeAllPopup" :invitation="invitation" :inviteVisitor="inviteVisitor"></InvitingShare>
    </div>

  </div>
</template>

<script>
  import {simpleDate, simpleDateTime, simpleTime, str2Date,getDayStart,simpleMinute} from "../../common/filter/time";
  import InviteVisitor from "../../common/model/invite/InviteVisitor";
  import InvitingShare from "./invite/InvitingShare";

  export default {
    data() {
      let newInviteVisitor = new InviteVisitor();
      newInviteVisitor.spaceRegional = this.$store.state.currentSpaceRegionalUuid;
      return {
        user: this.$store.state.user,
        inviteVisitor: newInviteVisitor,
        callServiceShow: false,
        editMode: false,
        minTime:"9:00",
        maxTime:"18:00"
      }
    },
    components: {
      InvitingShare
    },
    watch: {
      'user.name'(){
        this.httpBackfill();
      }
    },
    methods: {
      goClose(){
        this.$router.closeActivity()
      },
      closeAllPopup(){
        this.callServiceShow = false;
      },
      save(){
        let that = this;
        //邀请访客的开始时间和结束时间用字符串拼接的方式获取
        let startTime = "" + this.inviteVisitor.invitingTime.format("yyyy-MM-dd") + " " + this.inviteVisitor.dayTime[0].format("HH:mm") + ":00";
        let endTime = "" + this.inviteVisitor.invitingTime.format("yyyy-MM-dd") + " " + this.inviteVisitor.dayTime[1].format("HH:mm") + ":00";
        let min = "" + this.inviteVisitor.invitingTime.format("yyyy-MM-dd") + " " + this.minTime + ":00";
        let max = "" + this.inviteVisitor.invitingTime.format("yyyy-MM-dd") + " " + this.maxTime + ":00";
        if(!this.inviteVisitor.validate()){
          return
        }
        console.log(startTime)
        if(new Date(startTime).getTime() < new Date(min).getTime() || new Date(endTime).getTime() > new Date(max).getTime()){
          that.$store.state.plus.nativeUI.toast("工作时间为早上九点至下午六点");
        }else{
          this.inviteVisitor.httpSave(startTime, endTime,function (response) {
            that.$store.state.plus.nativeUI.toast("提交成功！",{duration:"short"});
            that.callServiceShow = true;
          });
        }
      },
      update(){
        let that = this;
        //邀请访客的开始时间和结束时间用字符串拼接的方式获取
        let startTime = "" + this.inviteVisitor.invitingTime.format("yyyy-MM-dd") + " " + this.inviteVisitor.dayTime[0].format("HH:mm") + ":00";
        let endTime = "" + this.inviteVisitor.invitingTime.format("yyyy-MM-dd") + " " + this.inviteVisitor.dayTime[1].format("HH:mm") + ":00";
        let min = "" + this.inviteVisitor.invitingTime.format("yyyy-MM-dd") + " " + this.minTime + ":00";
        let max = "" + this.inviteVisitor.invitingTime.format("yyyy-MM-dd") + " " + this.maxTime + ":00";
        if(!this.inviteVisitor.validate()){
          return
        }
        if(new Date(startTime).getTime() < new Date(min).getTime() || new Date(endTime).getTime() < new Date(max).getTime()){
          that.$store.state.plus.nativeUI.toast("工作时间为早上九点至下午六点");
        }else {
          this.inviteVisitor.httpSave(startTime, endTime,function (response) {
            that.$store.state.plus.nativeUI.toast("修改成功！",{duration:"short"});
            that.callServiceShow = true;
          });
        }
        // this.$router.closeActivity()
      },
      getTime(date) {
        this.$store.state.plus.nativeUI.toast(date[0] + "  " + date[1],{duration:"short"});
      },
      invitation(){
        let that = this;

        // this.inviteVisitor.httpCreate(function () {
        //   that.$store.state.plus.nativeUI.toast("分享成功！",{duration:"short"});
        // });
      },
      httpBackfill(){
        let that = this;
        this.inviteVisitor.inviteName = this.user.name;
        this.inviteVisitor.name = this.user.name;

        this.inviteVisitor.uuid = this.$store.state.route.query.uuid;
        if(this.inviteVisitor.uuid){
          this.editMode = true;
          this.inviteVisitor.httpDetail();
        }

      }
    },
    mounted(){
      this.httpBackfill();
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
.inviting-visit{
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling:touch;
  .inviting-title{
    font-size: 17px;
    text-align: right;
    padding-top: 35px;
    padding-right: 30px;
    color: deepskyblue;
  }
  .inviting{
    padding-top: 28px;
    padding-left: 30px;
    padding-right: 30px;
    font-size: 14px;
    color: #888888;
    .text-style{
      width: 100%;
      resize: none;
      outline: none;
      font-size: 16px;
      border: 0;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
      letter-spacing: 1px;
      margin-top: 20px;
      margin-bottom: 30px;
    }
    .data-style{
      width: 100%;
      margin-top: 20px;
      margin-bottom: 30px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
      .el-input__prefix{
        display: none;
      }
      .el-input__inner{
        border: none;
        margin-left: -30px;
        margin-top: -20px;
        margin-bottom: -10px;
      }
    }
    .input-time-range, .el-range-editor {
      width: 100%;
      margin-top: 20px;
      margin-bottom: 30px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
      .el-input__prefix{
        display: none;
      }
      .el-input__inner{
        border: none;
        margin-left: -30px;
        margin-top: -20px;
        margin-bottom: -10px;
      }

      .el-range_input {
        width: 60px;
      }
    }
    .text{
      padding-top:10px;
      color: deeppink;
      padding-bottom: 6px;
    }
    .remind{
      padding-bottom: 80px;
    }
  }
  .save{
    width: 100%;
    height: 64px;
    font-size: 16px;
    line-height: 65px;
    text-align: center;
    background-color: #00B3E5;
    text-decoration: none;
    display: inline-block;
    color: #fff;
    border: none;
  }
  .popup-box{
    position: fixed;
    bottom: 0;
  }
  .el-input__inner{
    border: none;
  }

}
</style>
