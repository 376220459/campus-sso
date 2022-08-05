<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-04 17:54:28
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-05 18:54:51
 * @FilePath: \campus-sso\src\App.vue
 * @Description:
-->
<template>
  <div id="app">
    <el-container>
      <HeaderBar />
      <router-view />
    </el-container>

    <FooterBar />
  </div>
</template>

<script>
import FooterBar from '@/components/FooterBar.vue'
import HeaderBar from '@/components/HeaderBar.vue'
export default {
  components: {
    FooterBar,
    HeaderBar,
  },
}
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .el-container {
    width: 100%;
    height: 100%;
    background-color: #d6faff;
    flex-direction: column;
  }
}
</style>
