/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 16:39:12
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-06 21:14:02
 * @FilePath: \campus-sso\src\apis\userAccount.js
 * @Description: 用户账号相关接口
 */
import http from './http'

// 用户注册接口
async function register(payload) {
  try {
    const res = await http.post('/register', payload)
    return res.data
  } catch (error) {
    // 返回{ code: 0 }是为了触发请求失败的回调
    return { code: 0 }
  }
}

// 用户登录接口
async function login(payload) {
  try {
    const res = await http.post('/login', payload)
    return res.data
  } catch (error) {
    return { code: 0 }
  }
}

export { register, login }
