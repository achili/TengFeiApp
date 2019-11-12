<template>
    <div>
      <OrderItem :pager="pager" :name="name" :title="title"></OrderItem>
    </div>
</template>

<script>
  import OrderItem from "../demoOrder"
  import Pager from "../../../../common/model/_base/Pager";
  import IntroducTionBook from "../../../../common/model/space/introduction/BookTour";
    export default {
        data(){
          return{
            pager:new Pager(IntroducTionBook),
            title:"预约参观",
            name:"introducTionVisit"
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
