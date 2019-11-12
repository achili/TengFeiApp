<template>
    <div>
      <OrderItem :pager="pager" :name="name" :title="title"></OrderItem>
    </div>
</template>

<script>
  import OrderItem from "../demoOrder"
  import SpaceReservation from "../../../../common/model/space/conferenceroom/SpaceReservation";
  import Pager from "../../../../common/model/_base/Pager";
    export default {
        data(){
          return{
            pager:new Pager(SpaceReservation),
            name:"roomBook",
            title:"会议室"
          }
        },
      props:{

      },
      components:{
        OrderItem
      },
      methods:{

      },
      mounted(){

      }
    }
</script>

<style scoped>
  .popup-box {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
