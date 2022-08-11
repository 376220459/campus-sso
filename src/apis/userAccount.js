/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 16:39:12
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-12 01:33:13
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
    return {
      code: 0,
      error,
    }
  }
}

// 用户登录接口
async function login(payload) {
  try {
    const res = await http.post('/login', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

// 用户修改密码接口
async function setNewPassword(payload) {
  try {
    const res = await http.post('/setNewPassword', payload)
    return res.data
  } catch (error) {
    return {
      code: 0,
      error,
    }
  }
}

export { register, login, setNewPassword }
