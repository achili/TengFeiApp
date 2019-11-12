<template>
  <div class="index-circle-order">
    <div class="index-circle-order-top">
      <div class="close-ico">
        <div :style =" 'background:url(\''+(require('../../../../assets/svg/space/left.svg'))+'\') center no-repeat'"
             style="margin-top: 15px ;display:inline-block;width: 24px;height: 14px;margin-left: 5%"
             @click.stop="goClose"></div>
      </div>
      <div class="index-circle-order-top-title">我的圈子</div>
      <div class="close-ico-1"></div>
    </div>
    <div class="index-circle-order-list-item">
      <scroller ref="circleScroller"
                :on-refresh="refresh"
                :on-infinite="infinite">
        <div v-for="circle in pager.data" :key="circle.index" class="circle-item" v-if="user.uuid===circle.creator.uuid">
          <div class="pull-right time" @click.stop="openOperation(circle)">{{circle.createTime | complexHumanTime}}</div>
          <div class="item-portrait">
            <img class="img" :src="circle.creator.getAvatarUrl(126, 126)" height="42" width="42"/>
            <div class="text">
              <div class="name">{{circle.creator.name}}</div>
              <!--<div class="time">{{circle.createTime | complexHumanTime}}</div>-->
            </div>
          </div>
          <!--<div v-if="circle.creator.avatar">{{circle.creator.avatar.keepLocal(42,42)}}</div>-->
          <div class="index-item-content">
            <div class="item-content">
              {{circle.content}}
            </div>
            <div class="item-img" v-if="circle.posters && circle.posters.length && circle.posters.length <= 4">
              <div class="img-box">
                <div class="img-one" @click.stop="openImg(circle.posters)"
                     v-for="poster in circle.posters" :key="poster.uuid"
                     :style="'background: url(\'' + poster.getLocalUrlBySize(500, 500) + '\') center no-repeat content-box'"></div>
              </div>
            </div>
            <div class="long-item-img" ref="swiper"
                 v-if="circle.posters && circle.posters.length && circle.posters.length > 4"
                 @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
              <div class="img-box">
                <div class="img-one" @click.stop="openImg(circle.posters)"
                     v-for="poster in circle.posters" :key="poster.uuid"
                     :style="'background: url(\'' + poster.getLocalUrlBySize(500, 500) + '\') center no-repeat content-box'"></div>
              </div>
            </div>
            <div class="item-bottom-column">
              <div style="display: flex;flex: 1;">
                <div class="like-ico" :class="circle.isPraise? 'like':''" @click.stop="clickLike(circle)"></div>
                <div class="like-number">{{circle.likes}}</div>
              </div>
              <div style="display: flex;flex: 1;">
                <div class="msg-ico" @click.stop="openComment(circle)"></div>
                <div class="msg-number" @click.stop="openComment(circle)">{{circle.commentarySize}}</div>
              </div>
              <div style="display: flex;flex: 1;">
                <div class="msg-trash"  @click.stop="openTrash(circle)"></div>
              </div>
            </div>
            <NbExpanding>
              <div class="item-comment" v-if="circle.openCommentaries">
                <div class="comment-list" v-show="!circle.commentariesLoading">
                  <div class="comment-item" v-for="comment in circle.commentaries" :key="comment.uuid">
                    <div class="portrait">
                      <img :src="comment.creator.getAvatarUrl(30, 30)"/>
                    </div>
                    <div class="comment-content">
                      <div style="display: flex;justify-content: space-between;">
                        <div class="name">{{comment.creator.name}}</div>
                        <div class="name">{{comment.createTime | complexHumanTime}}</div>
                      </div>
                      <div class="content">{{comment.content}}</div>
                    </div>
                  </div>
                </div>
                <div class="comment-loading" v-show="circle.commentariesLoading">
                  <i class="fa fa-spinner fa-spin"></i>
                </div>
                <div class="write-comment">
                  <input v-model="circle.writeComment" placeholder="写评论···" @focus="inputTop"/>
                  <div class="write-comment-button" @click.stop="writeComment(circle)">
                    发送
                  </div>
                  <i v-show="circle.loading" class="fa fa-spinner fa-spin"></i>
                </div>
              </div>
            </NbExpanding>
          </div>

        </div>
      </scroller>
    </div>

    <div class="popup-box" v-if="circleOperationShow">
      <CircleOperation :closeCall="close" :delCallBack="del" :isCreator="true"></CircleOperation>
    </div>

  </div>
</template>

<script>
  import Tank from "../../../../common/model/tank/Tank";
  import NbExpanding from "../../../../components/widget/NbExpanding";
  import Commentary from "../../../../common/model/community/commentary/Commentary";
  import Pager from "../../../../common/model/_base/Pager";
  import CircleOperation from '../../../../components/home/index/CircleOperation'
  import CommunityPosts from "../../../../common/model/community/CommunityPosts";

  export default {
    data() {
      return {
        user: this.$store.state.user,
        pager: this.$store.state.circlePager,
        plus: this.$store.state.plus,
        commentaryPager: new Pager(Commentary, 5, 0),
        circleOperationShow: false,
        circle: null,
        communityPosts: new CommunityPosts(),
        startX: 0,
        startY: 0,
        //0代表未检测  1代表有效  2代表无效
        isInvalid: 0
      }
    },
    props: {

    },
    components: {
      NbExpanding,
      CircleOperation
    },
    methods: {
      goClose(){
        this.$router.closeActivity()
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
      },
      inputTop(e) {
        this.$refs.circleScroller.scrollTo(0, e.path[0].offsetTop - 60, true);
      },
      openTrash(circle) {
        this.circle = circle;
        this.circleOperationShow = true;
      },
      close() {
        this.circleOperationShow = false;

      },
      del() {
        let that = this;
        this.circle.httpDel(function () {
          that.plus.nativeUI.toast("删除成功",{duration:"short"});
          that.refresh();
        }, function () {
          that.plus.nativeUI.toast("删除失败",{duration:"short"});
        })
      },
      openOperation(circle) {
        let that = this;
        this.openCircleOperation(function () {
          circle.httpDel(function () {
            that.plus.nativeUI.toast("删除成功",{duration:"short"});
            that.refresh();
          }, function () {
            that.plus.nativeUI.toast("删除失败",{duration:"short"});
          })
        });
      },
      clickLike(circle) {
        let that = this;
        circle.httpApplaud(function () {
          if(circle.isPraise) {
            that.plus.nativeUI.toast("点赞成功",{duration:"short"});
          } else {
            that.plus.nativeUI.toast("取消点赞",{duration:"short"});
          }
        });
      },
      refreshComment(circle) {
        circle.commentariesLoading = true;
        if(circle.openCommentaries) {
          let that = this;
          this.commentaryPager.render(new Pager(Commentary, 5, 0));
          this.commentaryPager.setFilterValue("orderCreateTime", "DESC");
          this.commentaryPager.setFilterValue("communityPosts", circle.uuid);
          this.commentaryPager.httpFastPage(function () {
            circle.commentariesLoading = false;
            that.commentaryPager.data.forEach(e => {
              if(e.creator.avatar) {
                e.creator.avatar.keepLocal(30, 30);
              }
            });
            circle.commentaries = that.commentaryPager.getList();
          });
        }
      },
      openComment(circle) {
        circle.openCommentaries  = !circle.openCommentaries;
        this.refreshComment(circle);
      },
      writeComment(circle) {
        let that = this;
        if(circle.loading) {
          return;
        }
        circle.httpComment(circle.writeComment, function () {
          circle.writeComment = null;
          that.refreshComment(circle);
          that.plus.nativeUI.toast("评论成功",{duration:"short"});
        });
      },
      refresh(done) {
        let that = this;
        this.pager.page = 0;
        this.pager.setFilterValue("orderCreateTime", "DESC");
        this.pager.setFilterValue("orderTop", "DESC");
        if(this.pager.getFilter("status")){
          this.pager.setFilterValue("status", "OK");
        }
        this.pager.httpFastPage(function(){
          that.pager.page++;
          that.pager.data.forEach(data => {
            Tank.keepLocalList(data.posters, 500, 500);
            if(data.creator.avatar) {
              data.creator.avatar.keepLocal(126, 126);
            }
          });
          done && done();
        },function () {
          done && done();
        });
      },
      infinite(done) {
        let that = this;
        this.pager.setFilterValue("orderCreateTime", "DESC");
        this.pager.setFilterValue("orderTop", "DESC");
        if(this.pager.getFilter("status")){
          this.pager.setFilterValue("status", "OK");
        }
        this.pager.httpFastNextPage(function(){
          that.$refs.circleScroller.finishInfinite(true);
        }, function () {
          done();
        }, function () {
          done();
        }, function (pager) {
          pager.data.forEach(data => {
            Tank.keepLocalList(data.posters, 500, 500);
            if(data.creator.avatar) {
              data.creator.avatar.keepLocal(126, 126);
            }
          });
        });
      },
      openImg(imgs) {
        this.$store.state.temps.imgDetails = imgs;
        this.$router.openActivity("img-detail");
      }
    },
    mounted(){
      // this.pager.page = 0;
      // this.pager.httpFastNextPage();
      this.communityPosts.httpRemind();
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .index-circle-order {
    width: 100%;
    height: 100%;
    .index-circle-order-top{
      margin: auto;
      height: 44px;
      position: relative;
      padding: 0 20px;
      border-bottom: 1px solid #d7dcdd;
      display: flex;
      .close-ico-1 {
        flex:1;
      }
      .close-ico {
        flex:1;
      }
      .index-circle-order-top-title{
        font-size: 18px;
        flex: 3;
        margin: 0 auto;
        height: 44px;
        line-height: 44px;
        text-align: center;

      }
    }
    .index-circle-order-list-item {
      width: 100%;
      height: 100%;
      ._v-container {
        top: 45px;
      }
      .circle-item {
        padding: 20px 20px 1px 20px;
        background: white;
        .item-operation {
          height: 20px;
          width: 20px;
          background: url("../../../../assets/svg/home/index/circle/operation-icon.svg") content-box no-repeat center;
        }
        .time {
          font-size: 13px;
          color: #B6B6B6;
        }
        .item-portrait {
          display: flex;
          vertical-align: top;
          .img {
            border-radius:42px
          }
          .text {
            margin-left: 16px;
            .name {
              margin-top: 2px;
              font-size: 15px;
              color: #484848;
              font-weight: 600;
            }
          }
        }
        .index-item-content {
          margin-left: 55px;
          border-bottom: 1px solid #ccc;
          .item-content {
            font-size: 14px;
            margin-top: -10px;
            line-height: 21px;
          }
          .item-img {
            position: relative;
            width: 100%;
            height: auto;
            overflow: scroll;
            -webkit-overflow-scrolling:touch;
            .img-box {
              display: flex;
              flex-wrap: wrap;
              width: 100%;
              .img-one {
                padding: 5px 5px;
                height: calc(50vw - 60px);
                width: calc(50vw - 60px);
                overflow: hidden;
                border-radius: 10px;
                background-size: cover!important;
                img {
                  height: calc(50vw - 60px);
                  width: auto;
                }
              }
            }

          }
          .long-item-img {
            height: calc(88vw - 40px);
            overflow-x: scroll;
            -webkit-overflow-scrolling:touch;
            .img-box {
              width: auto;
              display: flex;
              flex-direction: column;
              flex-wrap: wrap;
              align-content: flex-start;
              height: 100%;
              .img-one {
                padding: 5px 5px;
                height: calc(50vw - 60px);
                width: calc(50vw - 60px);
                overflow: hidden;
                border-radius: 10px;
                background-size: cover!important;
                img {
                  height: calc(50vw - 60px);
                  width: auto;
                }
              }
            }
          }
          .item-bottom-column {
            display: flex;
            flex-wrap: wrap;
            margin: 0 0 10px 0;
            .like-ico {
              margin-right: 10px;
              height: 21px;
              width: 21px;
              background: url("../../../../assets/svg/home/index/circle/no-like.svg") content-box no-repeat center;
              &.like {
                background: url("../../../../assets/svg/home/index/circle/like.svg") content-box no-repeat center;
              }
            }
            .like-number {
              margin-right: 15px;
              font-size: 16px;
            }
            .msg-ico {
              margin-right: 10px;
              height: 21px;
              width: 21px;
              background: url("../../../../assets/svg/home/index/circle/comment.svg") content-box no-repeat center;
            }
            .msg-trash {
              margin-right: 10px;
              height: 21px;
              width: 21px;
              background: url("../../../../assets/svg/user/trash.svg") content-box no-repeat center;
            }
            .msg-number {
              font-size: 16px;
            }
          }
          .item-comment {
            border-top: #D7DCDD 1px solid;
            .comment-list {
              padding: 2px 0 20px 0;
              .comment-item {
                padding-top: 20px;
                display: flex;
                .portrait {
                  border-radius: 100%;
                  overflow: hidden;
                  height: 30px;
                  width: 30px;
                  img {
                    height: 30px;
                    width: 30px;
                  }
                }
                .comment-content {
                  flex: 1;
                  background: #F6F6F6;
                  border-radius: 5px;
                  margin-left: 15px;
                  padding: 10px;
                  .name {
                    font-size: 13px;
                    font-weight: 600;
                  }
                  .content {
                    margin-top: 2px;
                    font-size: 12px;
                  }
                }
              }
            }
            .comment-loading {
              text-align: center;
              font-size: 5px;
              padding: 20px 0;
            }
            .write-comment {
              padding-bottom: 22px;
              width: 100%;
              display: flex;
              justify-content: space-between;
              input {
                /*width: calc(100% - 25px);*/
                flex: 4;
                font-size: 16px;
                padding: 8px 10px;
                border-radius: 5px;
                margin-right: 10px;
                border: 1px solid #D7DCDD;
                outline:none;
                -webkit-appearance: none;
              }
              .write-comment-button {
                flex: 1;
                height: 35px;
                color: #ffffff;
                text-align: center;
                line-height: 35px;
                font-size: 15px;
                border-radius: 5px;
                border: 1px solid #00B3E5;
                background-color: #00B3E5;
              }
            }

          }
        }
      }
    }
    .popup-box {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
</style>

