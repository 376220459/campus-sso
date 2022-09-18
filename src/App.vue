<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-04 17:54:28
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-07 18:54:48
 * @FilePath: \campus-sso\src\App.vue
 * @Description: App.vue
-->
<template>
  <div
    id="app"
    v-loading="loading"
    :element-loading-text="loadingText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
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
import { mapState } from 'vuex'
export default {
  components: {
    FooterBar,
    HeaderBar,
  },
  computed: {
    ...mapState(['loading', 'loadingText']),
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
