<template>
  <div class="introduction">
    <Sweiper :bannerlist="posters" :introduce="newList" :TypeIndex="TypeIndex"></Sweiper>
    <div class="swiperBtn">
      <div  class="btn-all" @click.stop="goBook">
        预约参观
      </div>
    </div>
    <Item :items="items" :TypeItem="TypeItem"></Item>
    <Services :services="services" ranks="2"></Services>
    <Team :title="title"></Team>
    <Map></Map>
  </div>
</template>

<script>
  import Sweiper from "./publicmodular/Swiper";
  import Item from "./introduction/item";
  import Services from "./publicmodular/services";
  import Team from "./publicmodular/team";
  import Map from "./introduction/map";
  import Pager from "../../common/model/_base/Pager";
  import ConferenceRoom from "../../common/model/space/conferenceroom/ConferenceRoom";
  import Appsettings from "../../common/model/appsettings/Appsettings";
  export default {
    data() {
      return {
        title:"社区团队",
        pager: new Pager(ConferenceRoom),
        appSettings: new Appsettings(),
        TypeIndex:"introducTionVisit",
        TypeItem:"introducTionBook",
        posters:[
          {
            uuid:"d6af08de-f40f-44b4-890e-81de487b0319",
            url: require('../../../src/assets/space/conferenceroom1.jpg')
          },
          {
            uuid:"120df25c-1160-47dd-aa38-be3128dccf62",
            url:require('../../../src/assets/space/conferenceroom2.jpg')
          },
          {
            uuid:"120df25c-1160-47dd-aa38-be3128dccf61",
            url:require('../../../src/assets/space/conferenceroom3.jpg')
          },
          {
            uuid:"120df25c-1160-47dd-aa38-be3128dccf64",
            url:require('../../../src/assets/space/conferenceroom4.jpg')
          }
        ],
        newList:{
          newListH:{
            title:"奕桥|Bridge+ @杭州",
            name:"杭州空间",
            introduce:"位于新加坡杭州科技园的核心地带，奕桥是凯德集团旗下的高端联合办公空间和互动创新平台，一期面积900个平方，设有超过150个工位。简约现代的设计风格，免费随享的咖啡小食，更有志同道合的合作伙伴和运营团队，是理想的新世代办公场所。"
          },
          newListS:{
            title:"奕桥|Bridge+ @苏州",
            name:"苏州空间",
            introduce:"位于苏州工业园区新平街388号腾飞苏州创新园24幢1层，奕桥是凯德集团旗下的高端联合办公空间和互动创新平台，一期面积1000平方，设有超过100个工位。简约现代的设计风格，免费随享的咖啡小食，更有志同道合的合作伙伴和运营团队，是理想的新世代办公场所。"
          },
          newListD:{
            title:"奕桥|Bridge+ @大连",
            name:"大连空间",
            introduce:"位于新加坡大连科技园的核心地带，奕桥是凯德集团旗下的高端联合办公空间和互动创新平台，一期面积900个平方，设有超过150个工位。简约现代的设计风格，免费随享的咖啡小食，更有志同道合的合作伙伴和运营团队，是理想的新世代办公场所。"
          }
        },
        services:["LED","DEMONSTRATION","VIDEO","MICROPHONE","HORN","WIFI","STATIONERY","TEA", "TIME","LIGHTING"],
        items:[
          {
            url:require('../../../src/assets/space/item1.jpg'),
            name:"移动办公桌",
            price:"600元",
            introduce:"即来即用，为自由职业者和移动办公人士提供灵活的办公选择。一张桌子，随时开始工作。"
          },{
            url:require('../../../src/assets/space/item2.jpg'),
            name:"独立办公室",
            price:"1000元",
            introduce:"独立的办公室，享有更安全和私密的空间。办公桌椅、文件柜，一应俱全，可容纳不同规模的团队。"
          }
        ]
      }
    },
    components: {
      Sweiper,
      Item,
      Services,
      Team,
      Map
    },
    methods: {
      goBook(){
        this.$router.openActivity("introducTionVisit","slide-top")
      },
      refresh(done) {
        let that = this;
        this.pager.page = 0;
        this.pager.setFilterValue('deleted', false);
        this.pager.setFilterValue("orderCreateTime", "DESC");
        this.pager.httpFastPage(function(){
          that.pager.page++;
          that.pager.data.forEach(data => {
            // data.poster.keepLocal(300, 563);
          });
          done();
        },function () {
          done();
        });
      },
      infinite(done) {
        let that = this;
        this.pager.setFilterValue('deleted', false);
        this.pager.setFilterValue("orderCreateTime", "DESC");
        this.pager.httpFastNextPage(function(){
          that.$refs.newsScroller.finishInfinite(true);
        }, function () {
          done();
        }, function () {
          done();
        }, function (pager) {
          pager.data.forEach(data => {
            // data.poster.keepLocal(300, 563);
          });
        });
      },
      AppSettingsDetail(){
        let that = this;
        this.appSettings.httpGetPrice(this.$store.state.currentSpaceRegionalUuid)
      }
    },
    mounted(){
      this.AppSettingsDetail()
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .introduction{
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling:touch;
    position: relative;
    .swiperBtn{
      width: 100%;
      .btn-all{
        display: inline-block;
        width: 90%;
        height: 48px;
        border-radius: 4px;
        background: #00B3E4;
        line-height: 48px;
        text-decoration: none;
        color: #fff;
        margin: 0 0 10px 5% ;
        text-align: center;
      }
    }
  }
</style>
