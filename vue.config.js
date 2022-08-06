/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-04 17:54:28
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-07 01:01:16
 * @FilePath: \campus-sso\vue.config.js
 * @Description:
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://localhost:7001',
        ws: 'true',
        changeOrigin: 'true',
      },
    },
  },
})
