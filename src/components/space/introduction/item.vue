<template>
    <div class="itemContainer">
      <div v-for="item in items" :key="item.name" class="itemList">
        <div class="itemImg">
          <img :src="item.url" alt="" class="img">
        </div>
        <div class="itemText">
          <div class="itemName">{{item.name}}</div>
          <div class="itemPrice" v-if="item.name === '移动办公桌'"> {{$store.state.appSettingList.stationPrice}}元起/月</div>
          <div class="itemPrice" v-if="item.name === '独立办公室'">{{$store.state.appSettingList.spacePrice}}元起/月</div>
          <div class="itemIntroduce">{{item.introduce}}</div>
        </div>
      </div>
      <div class="prompt-detail">
        <div class="prompt">
          友情提醒:
        </div>
        <div class="prompt-text">
          快速入驻仅支持移动办工桌。
        </div>
        <div class="quick-text">快速入驻发票默认开通普通发票。</div>
      </div>
      <div class="swiperBtn">
        <div class="quick-into" @click.stop="goQuickInto">
          快速入驻
        </div>
        <div class="btn-all" @click.stop="goItem(TypeItem)">
          我要预订
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          appSettings: this.$store.state.appSettings
        }
      },
      props:{
        items:{
          type:Array,
          request:false
        },
        TypeItem:{

        }
      },
      components: {
      },
      methods: {
        goItem(e){
          this.$router.openActivity(e,"slide-top")
        },
        goQuickInto(){
          this.$router.openActivity("quickIntoBook","slide-top")
        }
      },
      mounted(){}
    }
</script>

<style lang="less" rel="stylesheet/less">
  .itemContainer{
    height:405px;
    .itemList{
      width: 90%;
      height: 125px;
      margin:30px 0 0 5%;
      .itemImg{
        width: 28%;
        float: left;
        font-size: 0;
        .img{
          width: 100%;
          height: 120px;
          display: inline-block;
          border-radius: 3px;
        }
      }
      .itemText{
        width: 67%;
        float: left;
        margin-left: 4%;
        .itemName{
          margin-top: 3px;
          font-size: 18px;
        }
        .itemPrice{
          margin-top: 5px;
          font-size: 14px;
          color: #20BC97;
        }
        .itemIntroduce{
          margin-top: 10px;
          font-size: 14px;
          color: #A2A2A2;
          overflow:hidden;
          text-overflow:ellipsis;
          display: inline;
          -webkit-box-orient: vertical;
          height: 60px;
          display:-webkit-box;
          -webkit-line-clamp:3;
        }
      }

    }
    .prompt-detail{
      margin-left: 20px;
      line-height: 17px;
      font-family: pingFangSC-Light;
      font-size:14px;
      .prompt{
        margin-top: 12px;
        color: #ce0058;
      }
      .prompt-text{
        margin-top: 4px;
        color: #9c9c9c;
      }
      .quick-text{
        margin-top: 4px;
        color: #9c9c9c;
      }
    }
    .swiperBtn{
      .quick-into{
        display: inline-block;
        width: calc(50vw - 30px);
        border-radius: 4px;
        background: #00B3E4;
        margin-top:7px;
        margin-left: 20px;
        line-height: 48px;
        text-decoration: none;
        color: #fff;
        text-align: center;
        height: 48px;
      }
      .btn-all{
        display: inline-block;
        border-radius: 4px;
        width: calc(50vw - 30px);
        background: #00B3E4;
        line-height: 49px;
        margin-left: 15px;
        text-decoration: none;
        color: #fff;
        text-align: center;
        height: 48px;
      }
    }
  }
</style>
