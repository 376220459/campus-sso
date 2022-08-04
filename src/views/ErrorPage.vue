<!-- ErrorPage -->
<template>
  <div id="error_page">
    <p class="not_found">404</p>
    <p class="not_found">Page Not Found...</p>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
}
</script>

<style scoped lang="scss">
#error_page {
  .not_found:nth-of-type(1) {
    font-size: 300px;
    margin-top: 300px;
  }
  .not_found:nth-of-type(2) {
    font-size: 30px;
  }
}
</style>
