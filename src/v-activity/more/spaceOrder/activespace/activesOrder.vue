<template>
    <div>
      <OrderItem :pager="pager" :name="name" :title="title"></OrderItem>
    </div>
</template>

<script>
  import OrderItem from "../demoOrder"
  import Pager from "../../../../common/model/_base/Pager";
  import SiteReservation from "../../../../common/model/space/activesite/SiteReservation";
    export default {
        data(){
          return{
            pager:new Pager(SiteReservation),
            title:"活动场地",
            name:"activeSiteBook"
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

</style>
