<template>
  <el-select v-model="filter.value" placeholder="请选择"  class="nb-select">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    <el-option
      :label="'全部'"
      :value="null">
    </el-option>
  </el-select>
</template>

<script>
    export default {
        data(){
          return{
            value:''
          }
        },
      props:{
        filter: {

        },
        options:{

        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .nb-select{
    border: none;
    resize:none;
    width: 100%;
    outline:none;

  .el-input__inner{
    border:none;
    padding-left: 0;
    margin-bottom: 10px;
    font-size: 16px;
  }
  }
</style>
