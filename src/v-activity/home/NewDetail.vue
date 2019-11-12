<template>
  <div class="news-detail-content">
    <NbExpanding>
    <div class="detail-title">
      <div class="title-bar">
        <div class="close-ico" @click.stop="back"></div>
        <div class="title-bar-text">详情</div>
        <div class="title-bar-share" @click.stop="openShare"></div>
      </div>
      <div class="title-text">{{communityNews.title}}</div>
      <div class="title-date">{{communityNews.createTime}}</div>
    </div>
    </NbExpanding>
    <div class="activity-item" @click.prevent='openUrlTag($event)'>
      <div class="item-img">
        <img :src="communityNews.poster.getLocalUrlBySize(525, 700)"/>
      </div>
      <NbExpanding>
        <div class="content" id="news-detail-content">
          <div class="dtail-news-html" v-html="communityNews.content"></div>
        </div>
      </NbExpanding>
    </div>
  </div>
</template>

<script>
  import Activity from "../../common/model/_base/Activity";
  import CommunityNews from "../../common/model/community/CommunityNews";
  import NbExpanding from "../../components/widget/NbExpanding";
  export default {
    data() {
      return {
        communityNews: new CommunityNews()
      }
    },
    props: {
      activity: {

      }
    },
    components: {
      NbExpanding
    },
    methods: {
      openUrlTag(event){
        if(event.target.nodeName === 'A'){
          this.$router.openActivity('wc_list_details',"slide-left",{enclosureUrl:event.target.href});
        }else if(event.target.nodeName === 'FONT'){
          if(event.target.parentNode.parentNode.nodeName === 'A'){
            this.$router.openActivity('wc_list_details',"slide-left",{enclosureUrl:event.target.parentNode.parentNode.href});
          }else {
            return false
          }
        }
      },
      back() {
        this.$router.closeActivity()
      },
      openShare() {
        this.communityNews.shareSystem(this.activity.query.title,this.activity.query.uuid);
      },
      newDetail(){
        let that = this;
        if(this.activity.query.uuid){
          this.communityNews.uuid = this.activity.query.uuid;
          this.communityNews.httpDetail(function (response) {
            that.communityNews.render(response.data.data);
            that.communityNews.poster.keepLocal(525, 700);
          });
        }
      }
    },
    mounted(){
      this.newDetail()
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @transition:0.5s;
  .news-detail-content{
    height: 100vh;
    width: 100vw;
    .detail-title {
      background: white;
      .title-bar {
        border-bottom: 1px #F8F9F9 solid;
        display: flex;
        padding: 0 20px;
        .close-ico {
          width: 27px;
          height: 52px;
          background:url('../../assets/svg/register/arrow.svg') center no-repeat;
        }
        .title-bar-text{
          text-align: center;
          line-height: 52px;
          font-weight: 600;
          font-size: 18px;
          width: 100%;
        }
        .title-bar-share {
          width: 21px;
          height: 52px;
          background:url('../../assets/svg/register/share.svg') center no-repeat;
        }
      }
      .title-text {
        padding: 20px 20px 0 20px;
        color: #484848;
        font-size: 22px;
        line-height: 30px;
        font-weight: 600;
      }
      .title-date {
        color: #00b288;
        padding: 0 20px 25px 20px;
        font-size: 13px;
      }

    }
    .activity-item{
      max-height: calc(100vh - 143px);
      margin-bottom: 10px;
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
      .item-img {
        position: relative;
        padding-bottom: 75%;
        border-radius: 8px;
        overflow: hidden;
        transition: @transition;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: auto;
        }
      }
        .dtail-news-html {
          min-height: calc(100vh - 153px - 100vw / 2);
          img {

            height: auto;
          }
          p {
            margin: 10px 20px;
            img {
              margin: 0 -20px;
              width: 100vw;
            }
          }
        }
        .seize-seat {
          text-align: center;
          background: white;
          min-height: 55vh;
          line-height: 100px;
        }
    }
  }
</style>
