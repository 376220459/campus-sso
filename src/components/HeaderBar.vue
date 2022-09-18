<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-05 18:41:51
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-05 18:54:17
 * @FilePath: \campus-sso\src\components\HeaderBar.vue
 * @Description: 页面头部
-->
<template>
  <el-header height="100px">
    <p>校园杂货铺 · 登录系统</p>
  </el-header>
</template>

<script>
export default {
  name: 'HeaderBar',

  props: {},

  data() {
    return {}
  },

  computed: {},

  methods: {},

  created() {},

  mounted() {},
}
</script>

<style scoped lang="scss">
.el-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 50px;
  color: #000000;
}
</style>
