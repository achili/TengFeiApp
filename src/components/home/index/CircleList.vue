<template>
  <div class="index-circle-list">
    <scroller ref="circleScroller"
              :on-refresh="refresh"
              :on-infinite="infinite">
      <div v-for="circle in pager.data" :key="circle.index" class="circle-item">
        <div class="item-operation pull-right" @click.stop="openOperation(user.uuid===circle.creator.uuid, circle)"></div>
        <div v-if="circle.isTop === true" class="istop pull-right">
          <div class="istop-text">置顶</div>
        </div>
        <div class="item-portrait">
          <div class="img-box">
            <img class="img" :src="circle.creator.getAvatarUrl(126, 126)" height="42" width="42" @click.stop="openMyCircle(circle)"/>
          </div>
          <div class="text">
            <div class="name" v-if="circle.creator.name">
              {{circle.creator.name}}
            </div>
            <div v-else>
              {{circle.creator.phone}}
            </div>
            <div class="time">{{circle.createTime | complexHumanTime}}</div>
          </div>

        </div>
        <!--<div v-if="circle.creator.avatar">{{circle.creator.avatar.keepLocal(42,42)}}</div>-->
        <div class="item-content">
          {{circle.content}}
        </div>
        <div class="item-address" v-if="circle.address">
          {{circle.address}}
        </div>
        <div class="item-one-img" v-if="circle.posters && circle.posters.length && circle.posters.length === 1 ">
          <div class="img-box">
            <div class="img-one" @click.stop="openImg(circle.posters, index)"
                 v-for="(poster, index) in circle.posters" :key="poster.uuid">
              <img :src=" poster.getLocalUrlBySize(500, 500)" alt="">
            </div>
          </div>
        </div>
        <div class="item-img" v-if="circle.posters && circle.posters.length && circle.posters.length <= 4 && circle.posters.length > 1">
          <div class="img-box">
            <div class="img-one" @click.stop="openImg(circle.posters, index)"
                 v-for="(poster, index) in circle.posters" :key="poster.uuid"
                 :style="'background: url(\'' + poster.getLocalUrlBySize(500, 500) + '\') center no-repeat content-box'"></div>
          </div>
        </div>
        <div class="long-item-img" ref="swiper"
             v-if="circle.posters && circle.posters.length && circle.posters.length > 4"
             @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
          <div class="img-box">
            <div class="img-one" @click.stop="openImg(circle.posters, index)"
                 v-for="(poster, index) in circle.posters" :key="poster.uuid"
                 :style="'background: url(\'' + poster.getLocalUrlBySize(500, 500) + '\') center no-repeat content-box'"></div>
          </div>
        </div>
        <div class="item-bottom-column">
          <div class="like-ico" :class="circle.isPraise? 'like':''" @click.stop="clickLike(circle)"></div>
          <div class="like-number">{{circle.likes}}</div>
          <div class="msg-ico" @click.stop="openComment(circle)"></div>
          <div class="msg-number" @click.stop="openComment(circle)">{{circle.commentarySize}}</div>
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
    </scroller>

  </div>
</template>

<script>
  import Tank from "../../../common/model/tank/Tank";
  import NbExpanding from "../../widget/NbExpanding";
  import Commentary from "../../../common/model/community/commentary/Commentary";
  import Pager from "../../../common/model/_base/Pager";

  export default {
    data() {
      return {
        user: this.$store.state.user,
        pager: this.$store.state.circlePager,
        plus: this.$store.state.plus,
        commentaryPager: new Pager(Commentary, 5, 0),
        startX: 0,
        startY: 0,
        //0代表未检测  1代表有效  2代表无效
        isInvalid: 0
      }
    },
    props: {
      openCircleOperation: {
        type: Function
      }
    },
    components: {
      NbExpanding
    },
    methods: {
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
      openMyCircle(circle) {
        if (this.user.uuid === circle.creator.uuid) {
          this.$router.openActivity("circleOrder");
        }
      },

      inputTop(e) {
        this.$refs.circleScroller.scrollTo(0, e.path[0].offsetTop - 60, true);
      },
      openOperation(isCreator, circle) {
        let that = this;
        this.openCircleOperation(isCreator, function () {
          circle.httpDel(function () {
            that.plus.nativeUI.toast("删除成功",{duration:"short"});
            that.refresh();
          }, function () {
            that.plus.nativeUI.toast("删除失败",{duration:"short"});
          })
        }, function () {
         this.$router.openActivity('report_circle', 'slide-left', {uuid: circle.uuid});
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
          this.commentaryPager.setFilterValue('status', 'OK');
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
        this.pager.setFilterValue('status', 'OK');
        this.pager.setFilterValue("orderCreateTime", "DESC");
        this.pager.setFilterValue("orderTop", "DESC");
        if(this.pager.getFilter("status")){
          this.pager.setFilterValue("status", "OK");
        }
        this.pager.httpFastPage(function(){
          that.pager.page++;
          that.pager.data.forEach(data => {
            if(data.posters && data.posters.length === 1) {
              Tank.keepLocalList(data.posters, 500, 500);
            } else {
              Tank.keepLocalList(data.posters, 500, 500);
            }

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
        this.pager.setFilterValue('deleted', false);
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
            if(data.posters && data.posters.length === 1) {
              Tank.keepLocalList(data.posters, 500, 500);
            } else {
              Tank.keepLocalList(data.posters, 500, 500);
            }
            if(data.creator.avatar) {
              data.creator.avatar.keepLocal(126, 126);
            }
          });
        });
      },
      openImg(imgs, index) {
        this.$store.state.temps.imgDetails = imgs;
        this.$router.openActivity("img-detail", "slide-left", {index: index});
      }
    },
    mounted(){
      // this.pager.page = 0;
      // this.pager.httpFastNextPage();
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .index-circle-list {
    position: relative;
    height: 100%;
    background: white;
    .circle-item {
      margin-top: 8px;
      padding: 20px 20px 1px 20px;
      background: white;
      .item-operation {
        height: 20px;
        width: 20px;
        background: url("../../../assets/svg/home/index/circle/operation-icon.svg") content-box no-repeat center;
      }
      .item-portrait {
        display: flex;
        vertical-align: top;
        .img-box {
          height: 42px;
          width: 42px;
          .img {
            border-radius:42px
          }
        }

        .text {
          width: 53%;
          margin-left: 16px;
          .name {
            margin-top: 2px;
            font-size: 15px;
            color: #484848;
            font-weight: 600;
          }
          .time {
            font-size: 13px;
            color: #B6B6B6;
          }
        }

      }
      .istop{
        .istop-text{
          color: #B6B6B6;
          font-size: 14px;
          padding: 0 2px;
        }
      }
      .item-content {
        font-size: 14px;
        padding: 10px 0;
        line-height: 21px;
      }
      .item-address{
        font-size: 12px;
        color: #646991;
      }
      .item-img {
        position: relative;
        width: 100%;
        height: auto;
        overflow: scroll;
        .img-box {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          .img-one {
            padding: 2px 2px;
            height: calc(44vw - 24px);
            width: calc(44vw - 24px);
            overflow: hidden;
            background-size: cover!important;
            img {
              height: calc(44vw - 24px);
              width: auto;
            }
          }
        }

      }
      .item-one-img {
        position: relative;
        width: 100%;
        height: auto;
        overflow: scroll;
        .img-box {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          .img-one {
            padding: 2px 2px;
            width: calc(100vw - 50px);
            overflow: hidden;
            background-size: cover!important;
            img {
              height: 250px;
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
            padding: 2px 2px;
            height: calc(44vw - 24px);
            width: calc(44vw - 24px);
            overflow: hidden;
            background-size: cover!important;
            img {
              height: calc(44vw - 24px);
              width: auto;
            }
          }
        }
      }
      .item-bottom-column {
        display: flex;
        flex-wrap: wrap;
        margin: 15px 0 20px 0;
        .like-ico {
          margin-right: 10px;
          height: 21px;
          width: 21px;
          background: url("../../../assets/svg/home/index/circle/no-like.svg") content-box no-repeat center;
          &.like {
            background: url("../../../assets/svg/home/index/circle/like.svg") content-box no-repeat center;
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
          background: url("../../../assets/svg/home/index/circle/comment.svg") content-box no-repeat center;
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
            /*width: calc(100% - 90px);*/
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
</style>

