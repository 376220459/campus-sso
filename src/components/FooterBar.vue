<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-05 18:41:51
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-05 19:03:12
 * @FilePath: \campus-sso\src\components\FooterBar.vue
 * @Description: 页面底部
-->
<template>
  <div id="footer">
    <p>
      <el-link
        href="/login"
        title="返回首页"
        style="font-size: 1rem"
        >campus-grocery</el-link
      >
      <span>©1998-2022</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'FooterBar',
}
</script>

<style scoped lang="scss">
#footer {
  width: 100%;
  position: fixed;
  bottom: 10px;
  p {
    display: flex;
    justify-content: center;
    span {
      margin-left: 5px;
    }
  }
}
</style>
