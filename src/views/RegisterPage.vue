<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-05 18:16:01
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-06 00:15:59
 * @FilePath: \campus-sso\src\views\RegisterPage.vue
 * @Description: 注册界面
-->
<template>
  <el-main>
    <el-form
      :model="registerForm.data"
      ref="registerForm"
      :rules="registerForm.rules"
      label-width="80px"
      :inline="false"
      size="normal"
    >
      <el-divider>欢迎注册</el-divider>
      <el-form-item
        label="手机号"
        prop="telNumber"
      >
        <el-input v-model.number="registerForm.data.telNumber"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          v-model="registerForm.data.password"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="checkPassword"
      >
        <el-input
          v-model="registerForm.data.checkPassword"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="昵称"
        prop="nickname"
      >
        <el-input
          v-model="registerForm.data.nickname"
          :maxlength="8"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="学校"
        required
      >
        <el-cascader
          v-model="registerForm.data.school"
          :props="schoolProps"
          :show-all-levels="false"
          filterable
        ></el-cascader>
      </el-form-item>
      <el-form-item
        label="身份"
        required
      >
        <el-select v-model="registerForm.data.identity">
          <el-option
            label="学生"
            value="student"
          >
          </el-option>
          <el-option
            label="老师"
            value="teacher"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="学号"
        prop="studentNumber"
        v-if="registerForm.data.identity === 'student'"
      >
        <el-input v-model.number="registerForm.data.studentNumber"></el-input>
      </el-form-item>
      <el-form-item
        label="工号"
        prop="jobNumber"
        v-else
      >
        <el-input v-model.number="registerForm.data.jobNumber"></el-input>
      </el-form-item>
      <el-form-item
        label="真实姓名"
        prop="name"
      >
        <el-input v-model="registerForm.data.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">注册</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
import {
  telNumberRule,
  registerPasswordRule,
  nickNameRule,
  studentNumberRule,
  jobNumberRule,
  nameRule,
} from '@/utils/rules'
export default {
  name: 'RegisterPage',

  props: {},

  data() {
    return {
      registerForm: {
        data: {
          telNumber: '',
          password: '',
          checkPassword: '',
          nickname: '',
          school: '',
          identity: 'student',
          studentNumber: '',
          jobNumber: '',
          name: '',
        },
        rules: {
          telNumber: telNumberRule,
          password: [
            ...registerPasswordRule,
            {
              validator: this.validatePassword,
              trigger: 'blur',
            },
          ],
          checkPassword: [
            ...registerPasswordRule,
            {
              validator: this.validateCheackPassword,
              trigger: 'blur',
            },
          ],
          nickname: nickNameRule,
          studentNumber: studentNumberRule,
          jobNumber: jobNumberRule,
          name: nameRule,
        },
      },
      schoolProps: {
        lazy: true,
        emitPath: false,
        async lazyLoad(node, resolve) {
          const { level, value } = node
          if (level === 0) {
            const nodes = await new Promise(resolve => {
              setTimeout(() => {
                resolve([
                  {
                    value: '陕西',
                    label: '陕西',
                    leaf: false,
                  },
                ])
              }, 1000)
            })
            resolve(nodes)
          } else if (level === 1) {
            if (value === '陕西') {
              const nodes = await new Promise(resolve => {
                setTimeout(() => {
                  resolve([
                    {
                      value: '西安邮电大学',
                      label: '西安邮电大学',
                      leaf: true,
                    },
                    {
                      value: '陕西师范大学',
                      label: '陕西师范大学',
                      leaf: true,
                    },
                    {
                      value: '西北政法大学',
                      label: '西北政法大学',
                      leaf: true,
                    },
                  ])
                }, 1000)
              })
              resolve(nodes)
            }
          }
          resolve()
        },
      },
    }
  },
  methods: {
    validatePassword(rule, value, callback) {
      if (this.registerForm.data.checkPassword && value !== this.registerForm.data.checkPassword) {
        this.$refs.registerForm.validateField('checkPassword')
      }

      callback()
    },
    validateCheackPassword(rule, value, callback) {
      if (value !== this.registerForm.data.password) {
        callback(new Error('两次输入的密码不同'))
      } else {
        callback()
      }
    },
  },
}
</script>

<style scoped lang="scss">
.el-main {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  .el-form {
    background: #ffffff9c;
    width: 450px;
    border: 1px solid rgba(0, 0, 0, 0.233);
    box-shadow: 6px 6px 6px #00000071;
    border-radius: 10px;
    padding: 10px 50px 10px 30px;
    margin-top: 100px;

    .el-button {
      width: 100%;
    }
  }
}
</style>
