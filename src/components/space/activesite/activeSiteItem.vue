<template>
    <div class="activeSiteContainer">
      <div class="siteItem"  v-for="item in pager" :key="item.uuid">
        <div class="siteContainer">
          <div class="siteImgContainer">
            <img :src="item.poster.getLocalUrlBySize(560, 750, require('../../../assets/gif/loading7-5.png'))" alt="" class="siteImg">
          </div>
          <div class="siteText">
            <div class="siteName">
              {{item.name}}
            </div>
            <div class="SiteIntroduce">
              {{item.introduce}}
            </div>
          </div>
        </div>
        <Services :services="item.services" :ranks="ranks"></Services>
      </div>
      <div>
        <Team :bannerItem="bannerItem" :title="title" :isScrollerInside="true"></Team>
      </div>
      <div class="goSiteBtn">
        <div class="SiteBtn" @click.stop="goActiveSite(TypeSite)">我要预订</div>
      </div>
    </div>
</template>

<script>
  import Services from "../publicmodular/services";
  import Team from "../publicmodular/team";
    export default {
      data(){
        return {
          ranks:"1",
          title:"有疑问？联系我们",
          bannerItem:[
            {
              name:"小桥",
              url:require('../../../../src/assets/space/team1.jpg'),
              type:"社区经理",
              phones:[
                {
                  type:"电话",
                  url:""
                }
              ]
            },
            {
              name:"大桥",
              url:require('../../../../src/assets/space/team2.jpg'),
              type:"社区经理",
              phones:[
                {
                  type:"电话",
                  url:""
                }
              ]
            }
          ]
        }
      },
      props:{
        pager:{

        },
        TypeSite:{

        }
      },
      components:{
        Services,
        Team
      },
      methods: {
        goActiveSite(e){
          this.$router.openActivity(e,"slide-left")
        }
      },
      mounted(){


      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .activeSiteContainer{
    width: 100%;
    .siteItem{

      .siteContainer{
        padding-bottom: 30px;
        .siteImgContainer{

          .siteImg{
            width: 100%;
            height: 280px;
          }
        }
        .siteText{
          width: 90%;
          margin: auto;
          padding-bottom: 30px;
          border-bottom: 1px solid #d7dcdd;
          .siteName{
            margin-top: 15px;
            font-size: 20px;
          }
          .SiteIntroduce{
            margin-top: 10px;
            font-size: 16px;
          }
        }
      }
    }
    .goSiteBtn{
      .SiteBtn{
        display: inline-block;
        width: 90%;
        height: 48px;
        border-radius: 4px;
        background: #00B3E4;
        margin:20px 5%;
        line-height: 48px;
        text-decoration: none;
        color: #fff;
        text-align: center;
      }
    }
  }
</style>
