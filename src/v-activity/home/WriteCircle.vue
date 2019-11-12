<template>
  <div class="write-circle-activity">
    <div class="title-bar">
      <div class="close" @click="openCallService">
        <div class="close-ico"></div>
      </div>
      <div class="title">发圈子</div>
      <div class="share" v-if="textNumberLength > 150" @click.prevent="noPublish">
        <i v-show="circle.loading" class="fa fa-spinner fa-spin fa-fw"></i>
        <span v-show="!circle.loading">发表</span>
      </div>
      <div class="share" v-if="textNumberLength <= 150" @click.prevent="publish">
        <i v-show="circle.loading" class="fa fa-spinner fa-spin fa-fw"></i>
        <span v-show="!circle.loading">发表</span>
      </div>
    </div>
    <div class="write-circle-content">
      <div class="input-box">
        <textarea @focus="inputFocus" @blur="inputBlur" v-model="circle.content" class="input" placeholder="分享新鲜事···"></textarea>
        <div :class="textNumberLength > 150 ? 'prompt-number-change':'prompt-number'" v-if="textNumberLength >= 140">{{textNumberLength}}/150</div>
      </div>
      <div class="circle-address" v-if="positionText">
        <span class="input-box-position" v-if="positionText">{{positionText}}</span>
        <span class="del-itme" @click.stop.prevent="delAddress" v-if="positionText">
          <div class="ico"></div>
        </span>
      </div>
      <div class="poster-list">
        <div class="poster-itme" v-for="(tank,tankIndex) in circle.posters" :key="tank.index">

          <div v-show="tank.procedure === tank.Procedure.FETCHING_UPLOAD_TOKEN" class="upload_token">
            <i class="fa fa-spinner fa-spin fa-fw"></i>准备中...
          </div>

          <!--v-show="tank.procedure === tank.Procedure.FETCHING_UPLOAD_TOKEN"-->
          <div class="uploading" v-show="tank.procedure === tank.Procedure.UPLOADING">
            <div class="progress" :class="{'progress-striped active' : tank.procedure === tank.Procedure.UPLOADING}">
              <div :style="'width: '+(tank.progress*100)+'%'" class="progress-bar"></div>
            </div>
            <div class="text">{{(tank.progress * 100).toFixed(1)}}%</div>
          </div>

          <div class="img-box" v-if="tank.exist()">
            <img :src="tank.getUrlBySize(200, 200)">
            <div class="pull-right del-itme" @click.stop.prevent="delPoster(tank,tankIndex)">
              <div class="ico"></div>
            </div>
          </div>
        </div>

        <div class="poster-itme"
             v-show="circle.posters.length < maxNum && templateTank.procedure === templateTank.Procedure.FREE && !templateTank.exist()">
          <div class="add-poster">
            <input class="file-input" ref="refFile" type="file" @change.prevent.stop="addPoster" multiple/>
            <div class="add-ico"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-bar" :style="'bottom:' + iosKeyboardHeight + 'px'">
      <div class="bottom-box">
        <div class="poster ico">
          <input class="file-input" ref="refFileBottom" type="file" @change.prevent.stop="addPoster(1)" multiple/>
        </div>
        <div class="camera ico">
          <input class="file-input" ref="refFileCamera" capture="camera" type="file" @change.prevent.stop="addPoster(2)"/>
        </div>
        <div class="countenance ico" @click.stop="countenance"></div>
        <div class="address ico" @click.stop="position"></div>
      </div>


      <div class="countenance-box" v-if="countenanceShow && $store.state.keyboardHeight < 1">
        <div class="emoji-box">
          <div class="emoji-item" @click.stop="emojiClick(emoji)" v-for="emoji in emojiList" :key="emoji">{{emoji}}</div>
        </div>
      </div>
    </div>

    <div class="popup-box" v-if="writeCircleShow">
      <WriteCircleShow :closeCall="closeAllPopup"></WriteCircleShow>
    </div>

  </div>
</template>

<script>
  import Activity from "../../common/model/_base/Activity";
  import CommunityPosts from "../../common/model/community/CommunityPosts";
  import Tank from "../../common/model/tank/Tank";
  import WriteCircleShow from "../more/spaceOrder/WriteCircleShow";
  import emojis from "../../common/fork/emoji";

  import EXIF from "exif-js";


  export default {
    data() {
      return {
        emojiList: emojis,
        plus: this.$store.state.plus,
        circle: new CommunityPosts(),
        writeCircleShow: false,
        templateTank: new Tank("*", false, 1000 * 1024 * 1024),
        maxNum: 8,
        iosKeyboardHeight: 0,
        countenanceShow: false,
        positionText: "",
        sendOut: false,
        textNumberLength:0
      }
    },
    props: {
      activity: {
        type: Activity,
        required: true
      }
    },
    components: {
      WriteCircleShow
    },
    watch:{
      "circle.content.length"(){
        this.textNumberLength = this.circle.content.length;
      },
      "positionText.length"(){
        if(this.positionText.length <= 1){
          this.delAddress();
        }
      }
    },
    methods: {
      emojiClick(emoji) {
        if(!this.circle.content) {
          this.circle.content = "";
        }
        this.circle.content += emoji;
      },
      inputFocus() {
        if(this.plus.os) {
          if(this.plus.os.name === "iOS") {
            this.iosKeyboardHeight = this.$store.state.keyboardHeight;
          }
        }
      },
      inputBlur() {
        this.iosKeyboardHeight = 0;
      },
      closeAllPopup() {
        this.writeCircleShow = false;
      },
      openCallService() {
        if(this.positionText || this.circle.posters.length > 0 || this.circle.content) {
          this.writeCircleShow = true;
        } else {
          this.back();
        }

      },
      back() {
        this.$router.closeActivity()
      },
      noPublish(){
        this.plus.nativeUI.toast("最大可填写150个字，" + "您已超出 " +  (this.textNumberLength - 150) + " 个字。");
      },
      publish() {
        let that = this;
        if(this.sendOut) {
          return;
        }
        this.sendOut = true;
        if(!this.circle.content) {
          this.circle.content = "";
        }
        this.circle.httpCreate(this.positionText, function () {
          that.plus.nativeUI.toast("发送成功！",{duration:"short"});
          that.$store.state.temps.publishCallBack && that.$store.state.temps.publishCallBack();
          that.$router.closeActivity("slide-top");
        }, function (response) {
          that.sendOut = false;
          if(response) {
            that.circle.defaultErrorHandler(response)
          }
        });
      },
      addPoster(n = 0) {
        let that = this;
        let fileDom = this.$refs['refFile'];
        if(n === 1) {
          fileDom = this.$refs['refFileBottom'];
        }
        if(n === 2) {
          fileDom = this.$refs['refFileCamera'];
        }
        if (!fileDom.files) {
          console.error("没有定义文件选择控件 refFile");
          return
        }
        let selectedLength = fileDom.files.length;
        if (selectedLength <= 0) {
          that.templateTank.errorMessage = "没有选择文件";
          return
        }
        if (selectedLength + that.circle.posters.length > that.maxNum) {
          that.plus.nativeUI.toast("图片超出了数量限制：" + that.maxNum,{duration:"short"});
          return
        }
        for (let i = 0; i < selectedLength; i++) {
          let tank = new Tank('*', true);
          tank.render(this.templateTank);
          tank.file = fileDom.files[i];
          //提前验证，有错误及时显示
          if (!tank.validate()) {
            that.plus.nativeUI.toast(that.templateTank.errorMessage ,{duration:"short"});
            console.error(tank.errorMessage);
            return
          } else {
            this.templateTank.errorMessage = null
          }
        }
        //循环上传
        for (let i = 0; i < selectedLength; i++) {
          let tank = new Tank('*', true);
          tank.render(this.templateTank);
          //纠正旋转
          let name = fileDom.files[i].name;
          let size = fileDom.files[i].size;
          let reader = new FileReader();
          reader.onload = function(e){
            let image = new Image();
            image.onload = function () {
              that.correctionRotation(image, function (blob) {
                tank.file = new File([blob], name);
                console.log(tank.file)
                that.upload(tank);
              }, size);
            };
            image.src = e.target.result;
          };
          reader.readAsDataURL(fileDom.files[i]);

        }
        fileDom.value = ''
      },
      delPoster(poster, index) {
        poster.clear();
        this.circle.posters.splice(index, 1)
      },
      delAddress(){
        this.positionText = '';
      },
      camera() {
        let that = this;
        let cmr = this.plus.camera.getCamera();
        cmr.captureImage(function(p){
          that.plus.io.resolveLocalFileSystemURL(p, function(entry){
            entry.file(function(file) {
              let tank = new Tank('*', true);
              tank.render(that.templateTank);
              tank.file = file;
              if (!tank.validate()) {
                that.plus.nativeUI.toast(that.templateTank.errorMessage ,{duration:"short"});
                return
              }
              that.circle.posters.push(tank);
              tank.httpLocalUpload(function () {
              }, function () {
                //一次检查哪些失败了，失败了的移除掉。
                for (let i = 0; i < that.circle.posters.length; i++) {
                  let itemTank = that.circle.posters[i];
                  if (itemTank.errorMessage) {
                    that.plus.nativeUI.toast(itemTank.errorMessage ,{duration:"short"});
                    that.circle.posters.splice(i, 1);
                  }
                }
              })
            }, function() {
              that.plus.nativeUI.toast("拍照文件对象失败",{duration:"short"});
            });
          }, function(e){
            that.plus.nativeUI.toast("读取拍照文件出现错误",{duration:"short"});
          });
        }, function(e){
          //拍照失败 e.message
          that.plus.nativeUI.toast("调用摄像头失败，请确认应用是否有拍照权限",{duration:"short"});
        }, {filename:'_doc/camera/',index:1});
      },
      position() {
        let that = this;
        this.$store.state.temps.mapCallback = function (position) {
          that.positionText = position;
        };
        this.$router.openActivity("send_position");
      },
      countenance() {
        this.countenanceShow = !this.countenanceShow;
      },
      //纠正旋转 callback返回 bolo对象
      correctionRotation(file, callback, size) {
        try {
          EXIF.getData(file, function() {
            let orientation = EXIF.getTag(file, 'Orientation');

            let cvs = document.createElement('canvas');
            let ctx = cvs.getContext('2d');

            let scale = 1;
            if(file.width + file.height > 2000) {
              scale = 2000 / (file.width + file.height);//预留压缩比
            }
            cvs.width = file.width * scale;
            cvs.height = file.height * scale;//计算等比缩小后图片宽高

            if(orientation && orientation !== 1){
              switch(orientation){
                case 6:     // 旋转90度
                  cvs.width = file.height * scale;
                  cvs.height = file.width * scale;
                  ctx.rotate(Math.PI / 2);
                  ctx.drawImage(file, 0,-file.height * scale,  file.width * scale, file.height * scale);
                  break;
                case 3:     // 旋转180度
                  ctx.rotate(Math.PI);
                  ctx.drawImage(file, file.width * scale, -file.height * scale,  file.width * scale, file.height * scale);
                  break;
                case 8:     // 旋转-90度
                  cvs.width = file.height * scale;
                  cvs.height = file.width * scale;
                  ctx.rotate(3 * Math.PI / 2);
                  ctx.drawImage(file, -file.width * scale, 0,  file.width * scale, file.height * scale);
                  break;
              }
            }else{
              ctx.drawImage(file, 0, 0,  cvs.width, cvs.height);
            }

            //大小压缩调整
            let reMinSize = 2500000;
            let reSize = 1500000;   //参考大小 1.5M
            let fileType = file.type;
            let newImageData;
            if(size < reMinSize){
              newImageData = cvs.toDataURL(fileType, 1);
            } else {
              console.log("压缩")
              //大于压缩临界的，根据原图的大小动态设置压缩比
              let sca = 1 / (Math.sqrt(size / reSize));
              console.log(size, reSize, sca)
              newImageData = cvs.toDataURL(fileType, 1);
            }

            //转换blob对象用于上传
            let arr = newImageData.split(',');
            let mime = arr[0].match(/:(.*?);/)[1];
            let bstr = atob(arr[1]);
            let n = bstr.length;
            let u8arr = new Uint8Array(n);
            while(n--){
              u8arr[n] = bstr.charCodeAt(n);
            }
            callback(new Blob([u8arr], {type:mime}));
          });
        } catch (e) {
          this.$store.state.plus.nativeUI.toast("请上传图片文件",{duration:"short"});
        }
      },
      upload(tank) {
        let that = this;
        this.circle.posters.push(tank)
        console.log("upload")
        tank.httpUpload(function () {
          console.log("httpUpload")
          if (that.success) {
            that.success(tank)
          }
        }, function () {
          //一次检查哪些失败了，失败了的移除掉。
          console.log("uploadssss")
          for (let i = 0; i < that.circle.posters.length; i++) {
            let itemTank = that.circle.posters[i];
            if (itemTank.errorMessage) {
              that.plus.nativeUI.toast(itemTank.errorMessage ,{duration:"short"});
              that.circle.posters.splice(i, 1);
            }
          }
        })
      }
    },
    mounted(){
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .write-circle-activity {
    .file-input {
      position: absolute;
      top: 0;
      right: 0;
      margin: 0;
      opacity: 0;
      filter: alpha(opacity=0);
      height: 100%;
      width: 100%;
      direction: ltr;
      cursor: pointer;
    }
    .title-bar {
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
    .input-box {
      padding: 10px 20px;
      color: #838383;
      position: relative;
      .input {
        font-weight: 600;
        font-size: 15px;
        line-height: 20px;
        width: 100%;
        height: 132px;
        background:none;
        resize: none;
        outline:none;
        border:0;
      }
      .prompt-number{
        position: absolute;
        display: inline-block;
        width: 60px;
        height: 16px;
        right: 20px;
        font-size: 14px;
        background-color: #F6F6F6;
        border-radius: 3px;
        text-align: center;
        line-height: 16px;
      }
      .prompt-number-change{
        position: absolute;
        display: inline-block;
        width: 60px;
        height: 16px;
        right: 20px;
        font-size: 14px;
        background-color: #F6F6F6;
        border-radius: 3px;
        text-align: center;
        line-height: 16px;
        color: #dd6161;
      }
    }
    .circle-address{
      padding: 5px 20px;
      .input-box-position {

      }
      .del-itme {
        .ico {
          background: url("../../assets/svg/home/index/circle/del-poster.svg") no-repeat center content-box;
          width: 14px;
          height: 14px;
          display: inline-block;
        }
        width: 18px;
        height: 18px;
        text-align: center;
        display: inline-block;
        font-weight: 100;
        color: white;
        background: rgba(0,0,0,0.4);
      }
    }
    .poster-list {
      padding: 0 20px;
      display: flex;
      flex-wrap: wrap;
      .poster-itme {
        width: calc(33vw - 20px);
        height: calc(33vw - 20px);
        padding: 3px;
        .upload_token {
          font-size: 12px;
          margin-top: 40%;
          text-align: center;
        }
        .uploading {
          padding: 0 10px;
          .text {
            font-size: 12px;
            text-align: center;
          }
          .progress {
            margin-top: calc(50% - 10px);
            border-radius: 10px;
            border: #cccccc solid 1px;
            height: 12px;
            .progress-bar {
              height: 100%;
              border-radius: 10px;
              background: #419BFE;
            }
          }
        }
        .img-box {
          width: 100%;
          height: 100%;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          .del-itme {
            .ico {
              background: url("../../assets/svg/home/index/circle/del-poster.svg") no-repeat center content-box;
              width: 11px;
              height: 11px;
              padding: 4px;
            }
            position: absolute;
            top: 0;
            right: 0;
            width: 19px;
            height: 19px;
            line-height: 19px;
            text-align: center;
            font-size: 19px;
            font-weight: 100;
            color: white;
            background: rgba(0,0,0,0.4);
          }
        }
        .add-poster {
          width: calc(100% - 4px);
          height: calc(100% - 4px);
          border: 2px #F1F1F1 dashed;
          font-size: 50px;
          color: #2c3e50;
          background: url("../../assets/svg/home/index/circle/write-circle-add.svg") no-repeat center content-box;
          background-size: 60%;
          position: relative;
        }
      }
    }
    .bottom-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #F6F6F6;
      padding: 18px 0;
      .bottom-box {
        display: flex;
        .ico {
          flex: 1;
          height: 28px;
        }
        .poster {
          position: relative;
          background: url("../../assets/svg/home/index/circle/write-circle-poster.svg") no-repeat center content-box;
        }
        .camera {
          position: relative;
          background: url("../../assets/svg/home/index/circle/write-circle-camera.svg") no-repeat center content-box;
        }
        .countenance {
          background: url("../../assets/svg/home/index/circle/write-circle-countenance.svg") no-repeat center content-box;
        }
        .address {
          background: url("../../assets/svg/home/index/circle/write-circle-address.svg") no-repeat center content-box;
        }
      }
      .countenance-box {
        padding: 10px 20px 0 20px;
        .emoji-box {
          height: 150px;
          width: 100%;
          display: flex;
          overflow-y: scroll;
          -webkit-overflow-scrolling:touch;
          flex-wrap: wrap;
          .emoji-item {
            line-height: 35px;
            font-size: 18px;
            height: 35px;
            width: 35px;
            text-align: center;
          }
        }
      }

    }
  }
</style>
