<template>
  <div class="search-popup" @click.stop="closeOwn">
    <div class="popup" @click.stop="blank">
      <div class="home-search-box">
        <div class="home-search">
          <div class="input-box">
            <div class="search-ico"></div>
            <input ref="search" class="search-input" placeholder="搜索" v-model="searchContent" @keyup.enter="search"/>
          </div>
        </div>
        <div class="home-user-box pull-right"
             :class="$store.state.unReadMessageCount > 0? 'msg':''"
             @click.stop="$router.openActivity('user_information')">
        </div>
      </div>
      <div class="proposal-list" v-show="!communitySearch.loading">
        <div class="proposal-item" v-for="hotKey in hotList" :key="hotKey" @click="clickProposal(hotKey)">
          <div class="ico"></div>
          <div class="text">{{hotKey}}</div>
        </div>
      </div>
      <div class="loading" v-show="communitySearch.loading">
        <i class="fa fa-spinner fa-spin fa-fw"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import CommunitySearch from "../../../common/model/community/CommunitySearch";

  export default {
    data() {
      return {
        communitySearch: new CommunitySearch(),
        hotList: [],
        searchContent: null
      }
    },
    props: {
      closeCall: {
        type: Function
      }
    },
    methods: {
      closeOwn() {
        this.closeCall()
      },
      goUserInformation() {
        this.closeCall();
        this.$router.openActivity('user_information');
      },
      blank() {

      },
      search() {
        this.$router.openActivity('search-result', 'slide-top', {searchContent: this.searchContent});
      },
      clickProposal(hotKey) {
        this.searchContent = hotKey;
        this.$router.openActivity('search-result', 'slide-top', {searchContent: this.searchContent});
      }
    },
    mounted(){
      this.$refs.search.focus();
      let that = this;
      that.communitySearch.httpGetHot(function (list) {
        that.hotList = list;
      })
    }
  }
</script>


<style lang="less" rel="stylesheet/less">
  .search-popup {
    background: rgba(0,0,0,.45);
    height: 100vh;
    width: 100vw;
    .popup {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: auto;
      color: #484848;
      background: white;
      padding-top: 5px;
      .home-search-box {
        position: relative;
        padding: 0 15px;
        .home-search {
          width: calc(100% - 47px);
          .input-box {
            position: relative;
            border-radius: 12px;
            background: #F1F1F2;
            padding: 7px 10px;
            display: flex;
            .search-ico {
              position: absolute;
              top: calc(50% - 7px);
              left: 15px;
              width: 14px;
              height: 14px;
              background: url("../../../assets/svg/home/index/search.svg") center no-repeat;
            }
            .search-input {
              width: 100%;
              margin-left: 22px;
              background:none;
              outline:none;
              border:0;
              font-size: 16px;
            }
          }
        }
        .home-user-box {
          position: absolute;
          top: 5px;
          right: 15px;
          width: 24px;
          height: 24px;
          padding: 5px;
          background: url("../../../assets/svg/home/index/user.svg") content-box no-repeat center;
          &.msg {
            top: 2px;
            right: 15px;
            height: 27px;
            background: url("../../../assets/svg/home/index/user-mesg.svg") content-box no-repeat center;
          }
        }
      }
      .proposal-list {
        padding: 0 15px;
        .proposal-item {
          display: flex;
          border-bottom: 1px #E1E5E5 solid;
          .ico {
            width: 14px;
            height: 52px;
            background: url("../../../assets/svg/home/index/search.svg") content-box no-repeat center;
          }
          .text {
            margin-left: 22px;
            line-height: 52px;
            font-size: 14px;
          }
        }
      }
      .loading {
        text-align: center;
        font-size: 22px;
        padding: 20px 0;
      }
    }
  }
</style>
