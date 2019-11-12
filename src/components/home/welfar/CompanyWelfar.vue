<template>
  <div class="welfar-company">
    <scroller ref="scroller"
              :on-refresh="refresh"
              :on-infinite="infinite">
      <div class="welfar-member-item" v-for="welfar in pager.data" :key="welfar.uuid" v-if="welfar.type === welfar.Type.CORPORATE">
        <div class="company-item-box">
          <div class="img-box">
            <img :src="welfar.poster.getLocalUrlBySize(270, 500, require('../../../assets/gif/loading5-2.png'))"/>
          </div>
          <div class="title-bar" @click="openDetail(welfar)">
            {{welfar.title}}
          </div>
          <div class="content">
            {{welfar.description}}
          </div>
          <div class="cooperation-list">
            <div class="title">
              我们的合作伙伴
            </div>
            <div class="list-box"
                 @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
              <div class="sortl">
                <div class="seizeBlank"></div>

                <div class="cooperation-item" v-for="cooperation in welfar.cooperativePartner" :key="cooperation.index">
                  <div class="cooperation-img-box">
                    <img :src="cooperation.picture.getLocalUrlBySize(300, 600, require('../../../assets/gif/loading6-3.png'))"/>
                  </div>
                  <div class="cooperation-title">{{cooperation.name}}</div>
                  <div class="cooperation-subtitle">{{cooperation.subtitle}}</div>
                  <div class="cooperation-ico-bar">
                    <div class="phone-ico"  @click.stop="phone"></div>
                    <div class="maill-ico"  @click.stop="maill(welfar)"></div>
                    <div class="dome-ico"  @click="openCooperationDetail(cooperation)">
                      <i v-if="!cooperation.editMode" class="fa fa-angle-down"></i>
                      <i v-if="cooperation.editMode" class="fa fa-angle-up"></i>
                    </div>

                  </div>
                  <div v-show="cooperation.editMode" class="cooperation-ico-bar-content">
                    {{cooperation.ddddd}}
                  </div>
                </div>

                <div class="seizeBlank"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pager: this.$store.state.welfarPager,
        startX: 0,
        startY: 0,
        //0代表未检测  1代表有效  2代表无效
        isInvalid: 0
      }
    },
    components: {

    },
    methods: {
      openCooperationDetail(cooperation) {
        this.$set(cooperation, 'editMode', !cooperation.editMode);
      },
      phone() {
        window.location.href = "tel:" + this.$store.state.appSettingList.xiaoQiaoUser.phone;
      },
      maill(welfar) {
        this.$router.openActivity('self_information', "slide-left", { uuid:this.$store.state.appSettingList.xiaoQiaoUser.uuid });
      },
      refresh(done) {
        let that = this;
        this.pager.page = 0;
        this.pager.setFilterValue("orderCreateTime", "DESC");
        this.pager.setFilterValue("spaceRegionalUuid", that.$store.state.currentSpaceRegionalUuid);
        this.pager.httpFastPage(function(){
          that.pager.page++;
        },function () {
          done();
        });
      },
      infinite(done) {
        let that = this;
        this.pager.setFilterValue("orderCreateTime", "DESC");
        this.pager.setFilterValue("spaceRegionalUuid", that.$store.state.currentSpaceRegionalUuid);
        this.pager.httpFastNextPage(function(){
          that.$refs.scroller.finishInfinite(true);
        }, function () {
          done();
        }, function () {
          done();
        }, function (pager) {

        });
      },
      touchstart(e) {
        this.startX = e.changedTouches[0].clientX;
        this.startY = e.changedTouches[0].clientY;
      },
      touchmove(e) {
        if(this.isInvalid === 0) {
          //未检测
          let x = e.changedTouches[0].clientX;
          let y = e.changedTouches[0].clientY;
          if(Math.abs(x - this.startX) > Math.abs(y - this.startY)) {
            this.isInvalid = 1;
            e.stopPropagation();
          } else {
            this.isInvalid = 2
          }
        } else if(this.isInvalid === 1) {
          //有效，需要左右滑动 所以阻止事件
          e.stopPropagation();
        } else {
          //无效 需要上下滑动 不阻止事件
        }
      },
      touchend(e) {
        if(this.isInvalid !== 2) {
          e.stopPropagation();
        }
        this.isInvalid = 0;
      }
    },
    mounted(){

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .welfar-company {
    position: relative;
    height: 100%;
    width: 100%;
    .welfar-member-item {
      .company-item-box {
        .img-box {
          position: relative;
          padding-bottom: 54%;//500 270
          overflow: hidden;
          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: auto;
          }
        }
        .title-bar {
          color: #484848;
          padding: 0 20px;
          margin-top: 18px;
          font-size: 18px;
          font-weight: 600;
        }
        .content {
          color: #848484;
          padding: 15px 20px 30px 20px;
          font-size: 15px;
          line-height: 22px;
        }
        .cooperation-list {
          .title {
            color: #484848;
            font-size: 18px;
            padding: 40px 20px 0 20px;
          }
          background: #F6F6F6;
          width: 100%;
          .list-box {
            position: relative;
            overflow-x: scroll;
            -webkit-overflow-scrolling:touch;
            .sortl {
              left: 15px;
              display: flex;
              .seizeBlank {
                min-width: 10px;
                height: 20px;
              }
              .cooperation-item {
                min-width: 310px;
                margin: 25px 5px 45px 5px;
                .cooperation-img-box {
                  height: 150px;
                  width: 300px;
                  img {
                    height: 150px;
                    width: 310px;
                    border-top-right-radius: 5px;
                    border-top-left-radius: 5px;
                  }
                }
                .cooperation-title {
                  color: #484848;
                  background: white;
                  padding: 18px 20px 0 20px;
                  font-weight: 600;
                  font-size: 16px;
                  max-width: calc(100% - 40px);
                }
                .cooperation-subtitle {
                  padding: 0 20px;
                  font-size: 15px;
                  background: white;
                  max-width: calc(100% - 40px);
                  color: #bbbbbb;
                }
                .cooperation-ico-bar {
                  display: flex;
                  background: white;
                  padding: 10px 20px 5px 20px;
                  .phone-ico {
                    width: 29px;
                    height: 25px;
                    background:url('../../../assets/svg/home/welfar/phone-ico.svg') center no-repeat;
                  }
                  .maill-ico {
                    margin-left: 15px;
                    width: 29px;
                    height: 25px;
                    background:url('../../../assets/svg/home/welfar/maill-ico.svg') center no-repeat;
                  }
                  .dome-ico {
                    font-size: 23px;
                    line-height: 20px;
                    text-align: right;
                    width: 100%;
                  }
                }
                .cooperation-ico-bar-content {
                  padding: 0 20px 10px 20px;
                  max-width: 270px;
                  background: white;
                }
              }
            }

          }
        }
      }
    }
  }
</style>
