<template>
    <div>
      <OrderItem :pager="pager" :name="name" :title="title"></OrderItem>
    </div>
</template>

<script>
  import OrderItem from "../demoOrder"
  import Pager from "../../../../common/model/_base/Pager";
  import SpaceOrder from "../../../../common/model/space/introduction/SpaceOrder";
    export default {
        data(){
          return{
            pager:new Pager(SpaceOrder),
            title:"空间",
            name:"introducTionBook"
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
