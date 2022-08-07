<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-07 16:25:52
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-07 19:15:55
 * @FilePath: \campus-sso\src\views\ForgetPage.vue
 * @Description: 忘记密码界面
-->
<template>
  <el-main>
    <el-steps
      :active="stepIndex"
      finish-status="success"
      :space="200"
      align-center
    >
      <el-step title="验证手机号"></el-step>
      <el-step title="设置新密码"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>

    <el-form
      ref="verifTelNumberForm"
      :model="verifTelNumberForm.data"
      :rules="verifTelNumberForm.rules"
      label-width="80px"
      :hide-required-asterisk="true"
      v-show="stepIndex === 0"
    >
      <el-divider>验证手机号</el-divider>
      <el-form-item
        label="手机号："
        prop="telNumber"
      >
        <el-input
          v-model.number="verifTelNumberForm.data.telNumber"
          placeholder="请输入手机号"
          :maxlength="11"
        ></el-input>
      </el-form-item>

      <BaseVerifCodeInput
        v-model="verifTelNumberForm.data.verifCode"
        @enterKeyUp="verifTelNumber"
      />

      <el-form-item>
        <el-button
          type="primary"
          @click="verifTelNumber"
          >下一步</el-button
        >
      </el-form-item>
    </el-form>

    <el-form
      ref="setNewPasswordForm"
      :model="setNewPasswordForm.data"
      :rules="setNewPasswordForm.rules"
      label-width="80px"
      :hide-required-asterisk="true"
      v-show="stepIndex !== 0"
    >
      <el-divider>设置新密码</el-divider>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          v-model="setNewPasswordForm.data.password"
          type="password"
          :maxlength="20"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="checkPassword"
      >
        <el-input
          v-model="setNewPasswordForm.data.checkPassword"
          type="password"
          :maxlength="20"
          @keyup.native.enter="setNewPassword"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="setNewPassword"
          >确认修改</el-button
        >
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
import BaseVerifCodeInput from '@/components/BaseVerifCodeInput.vue'
import { telNumberRule, verifCodeRule, registerPasswordRule } from '@/utils/rules'
import { setNewPassword } from '@/apis/userAccount'
import resHandle from '@/utils/resHandle'
import { mapMutations } from 'vuex'

export default {
  name: 'ForgetPage',

  components: { BaseVerifCodeInput },

  data() {
    return {
      stepIndex: 0,
      verifTelNumberForm: {
        data: {
          telNumber: '',
          verifCode: '',
        },
        rules: {
          telNumber: telNumberRule,
          verifCode: verifCodeRule,
        },
      },
      setNewPasswordForm: {
        data: {
          password: '',
          checkPassword: '',
        },
        rules: {
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
        },
      },
    }
  },

  methods: {
    ...mapMutations(['updateLoading']),

    // 密码和确认密码的额外验证规则
    validatePassword(rule, value, callback) {
      if (this.setNewPasswordForm.data.checkPassword) {
        this.$refs.setNewPasswordForm.validateField('checkPassword')
      }

      callback()
    },

    validateCheackPassword(rule, value, callback) {
      if (value !== this.setNewPasswordForm.data.password) {
        callback(new Error('两次输入的密码不同'))
      } else {
        callback()
      }
    },

    // 验证手机号是否已注册
    verifTelNumber() {
      this.$refs.verifTelNumberForm.validate(async valid => {
        if (valid) {
          this.updateLoading({
            loading: true,
            loadingText: '正在验证，请稍等...',
          })
          const res = await setNewPassword(this.verifTelNumberForm.data)
          resHandle(res, {
            // 下列的回调函数，均采用箭头函数的方式声明，以便绑定this
            sucessHandle: () => {
              this.updateLoading({
                loading: true,
                loadingText: '正在跳转至修改密码...',
              })
              // 此处只是提供一个跳转的视觉效果
              setTimeout(() => {
                this.stepIndex++
                this.updateLoading({
                  loading: false,
                  loadingText: '',
                })
              }, 2000)
            },
            errorHandle: () => {
              this.updateLoading({
                loading: false,
                loadingText: '',
              })
            },
            warningHandle: () => {
              this.updateLoading({
                loading: false,
                loadingText: '',
              })
            },
          })
        }
      })
    },

    // 设置新密码
    setNewPassword() {
      this.$refs.setNewPasswordForm.validate(async valid => {
        if (valid) {
          this.updateLoading({
            loading: true,
            loadingText: '正在修改，请稍等...',
          })
          const res = await setNewPassword({
            ...this.verifTelNumberForm.data,
            password: this.setNewPasswordForm.data.password,
          })
          resHandle(res, {
            // 下列的回调函数，均采用箭头函数的方式声明，以便绑定this
            sucessHandle: () => {
              this.stepIndex += 2
              this.updateLoading({
                loading: true,
                loadingText: '正在跳转至登录界面...',
              })
              // 此处只是提供一个跳转登录的视觉效果
              setTimeout(() => {
                this.updateLoading({
                  loading: false,
                  loadingText: '',
                })
                this.$router.push('/login')
              }, 3000)
            },
            errorHandle: () => {
              this.updateLoading({
                loading: false,
                loadingText: '',
              })
            },
            warningHandle: () => {
              if (res.code === 5) {
                this.updateLoading({
                  loading: true,
                  loadingText: '验证码已过期，请重新获取...',
                })
                // 此处只是提供一个跳转登录的视觉效果
                setTimeout(() => {
                  this.stepIndex--
                  this.updateLoading({
                    loading: false,
                    loadingText: '',
                  })
                }, 3000)
              } else {
                this.updateLoading({
                  loading: false,
                  loadingText: '',
                })
              }
            },
          })
        }
      })
    },
  },
}
</script>

<style scoped lang="scss">
.el-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  .el-steps {
    width: 600px;
    margin: 100px 0;
  }
  .el-form {
    background: #ffffff9c;
    flex-shrink: 0;
    width: 350px;
    border: 1px solid rgba(0, 0, 0, 0.233);
    box-shadow: 6px 6px 6px #00000071;
    border-radius: 10px;
    padding: 0px 20px 0px 10px;
    .el-button {
      width: 100%;
    }
  }
}
</style>
