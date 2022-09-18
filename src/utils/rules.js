/*
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-05 15:42:20
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-07 16:56:34
 * @FilePath: \campus-sso\src\utils\rules.js
 * @Description: 字段验证规则
 */
const telNumberRule = [
  { required: true, message: '请输入手机号', trigger: 'blur' },
  {
    pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
    message: '请输入合法手机号',
    trigger: 'blur',
  },
]
const loginPasswordRule = [{ required: true, message: '请输入密码', trigger: 'blur' }]
const registerPasswordRule = [
  { required: true, message: '请输入密码', trigger: 'blur' },
  {
    min: 6,
    max: 20,
    message: '密码应该由6-20个字符组成',
    trigger: 'blur',
  },
  {
    pattern: /^[\w.+-]+$/,
    message: '只能包含数字、字母、常见标点符号',
    trigger: 'blur',
  },
  {
    pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)(?![._+-]+$)[\w.+-]{6,20}$/,
    message: '数字、字母和标点符号中至少包含两种',
    trigger: 'blur',
  },
]
const nickNameRule = [
  { required: true, message: '请输入昵称', trigger: 'blur' },
  {
    min: 3,
    max: 8,
    message: '昵称应该由3-8个字符组成',
    trigger: 'blur',
  },
  {
    pattern: /^[\w\u4e00-\u9fa5]+$/,
    message: '只能包含汉字、字母和数字',
    trigger: 'blur',
  },
]
const schoolRule = [{ required: true, message: '请选择学校', trigger: 'change' }]
const studentNumberRule = [
  { required: true, message: '请输入学号', trigger: 'blur' },
  {
    pattern: /^\d{6,12}$/,
    message: '请输入正确的学号',
    trigger: 'blur',
  },
]
const jobNumberRule = [
  { required: true, message: '请输入工号', trigger: 'blur' },
  {
    pattern: /^\d{6,12}$/,
    message: '请输入正确的工号',
    trigger: 'blur',
  },
]
const nameRule = [
  { required: true, message: '请输入真实姓名', trigger: 'blur' },
  {
    pattern: /^[\u4e00-\u9fa5]{2,8}$/,
    message: '请输入正确的姓名',
    trigger: 'blur',
  },
]
const verifCodeRule = [
  { required: true, message: '请输入验证码', trigger: 'blur' },
  {
    pattern: /^\d+$/,
    message: '请输入合法的验证码',
    trigger: 'blur',
  },
]

export {
  telNumberRule,
  verifCodeRule,
  loginPasswordRule,
  registerPasswordRule,
  nickNameRule,
  schoolRule,
  studentNumberRule,
  jobNumberRule,
  nameRule,
}
