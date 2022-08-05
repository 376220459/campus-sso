<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-05 18:16:01
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-05 22:11:28
 * @FilePath: \campus-sso\src\views\LoginPage.vue
 * @Description: 登录界面
-->
<template>
  <el-main>
    <img
      src="@/assets/imgs/login.png"
      alt="login"
      width="1000px"
      :draggable="false"
    />

    <div class="form-container">
      <el-tabs v-model="loginForm">
        <el-tab-pane
          label="密码登录"
          name="passwordForm"
        >
          <el-form
            ref="passwordForm"
            :model="passwordForm.data"
            :rules="passwordForm.rules"
            label-width="80px"
            :hide-required-asterisk="true"
          >
            <el-form-item
              label="手机号："
              prop="telNumber"
            >
              <el-input
                v-model.number="passwordForm.data.telNumber"
                placeholder="请输入手机号"
                :maxlength="11"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="密码："
              prop="password"
            >
              <el-input
                type="password"
                v-model="passwordForm.data.password"
                placeholder="请输入密码"
                :maxlength="21"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane
          label="验证码登录"
          name="verifCodeForm"
        >
          <el-form
            ref="verifCodeForm"
            :model="verifCodeForm.data"
            :rules="verifCodeForm.rules"
            label-width="80px"
            :hide-required-asterisk="true"
          >
            <el-form-item
              label="手机号："
              prop="telNumber"
            >
              <el-input
                v-model.number="verifCodeForm.data.telNumber"
                placeholder="请输入手机号"
                :maxlength="11"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="验证码："
              prop="verifCode"
            >
              <el-input
                v-model.number="verifCodeForm.data.verifCode"
                placeholder="请输入验证码"
                :maxlength="6"
              >
                <el-button
                  slot="append"
                  :disabled="verifCodeForm.getVerifCodeBtn.disabled"
                  @click="getVerifCode"
                >
                  {{ verifCodeForm.getVerifCodeBtn.text }}
                </el-button>
              </el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <div class="login-button">
        <el-button
          type="primary"
          @click="login"
        >
          登录
        </el-button>
      </div>

      <div class="form-footer">
        <el-link href="/">忘记密码</el-link>
        <el-link href="/register">免费注册</el-link>
      </div>
    </div>
  </el-main>
</template>

<script>
import { telNumberRule, verifCodeRule, loginPasswordRule } from '@/utils/rules'
export default {
  name: 'LoginPage',

  props: {},

  data() {
    return {
      loginForm: 'passwordForm',
      passwordForm: {
        data: {
          telNumber: '',
          password: '',
        },
        rules: {
          telNumber: telNumberRule,
          password: loginPasswordRule,
        },
      },
      verifCodeForm: {
        data: {
          telNumber: '',
          verifCode: '',
        },
        rules: {
          telNumber: telNumberRule,
          verifCode: verifCodeRule,
        },
        getVerifCodeBtn: {
          disabled: false,
          text: '获取验证码',
        },
      },
    }
  },

  computed: {},

  methods: {
    getVerifCode() {
      const { getVerifCodeBtn } = this.verifCodeForm
      getVerifCodeBtn.disabled = true
      let count = 60
      getVerifCodeBtn.text = `${count}秒后重发`

      const countDown = () => {
        setTimeout(() => {
          if (count <= 0) {
            getVerifCodeBtn.disabled = false
            getVerifCodeBtn.text = '重新发送'
          } else {
            count--
            getVerifCodeBtn.text = `${count}秒后重发`
            countDown()
          }
        }, 1000)
      }
      countDown()

      // 尽量避免使用setInterval:
      // const interval = setInterval(() => {
      //   if (count <= 0) {
      //     getVerifCodeBtn.disabled = false
      //     getVerifCodeBtn.text = '重新发送'
      //     clearInterval(interval)
      //   } else {
      //     count--
      //     getVerifCodeBtn.text = `${count}秒后重发`
      //   }
      // }, 1000)
    },

    login() {
      this.$refs[this.loginForm].validate(valid => {
        console.log(valid)
      })
    },
  },

  created() {},

  mounted() {},
}
</script>

<style scoped lang="scss">
.el-main {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -60px;
  overflow: hidden;

  .form-container {
    background: #ffffff9c;
    flex-shrink: 0;
    width: 350px;
    border: 1px solid rgba(0, 0, 0, 0.233);
    box-shadow: 6px 6px 6px #00000071;
    border-radius: 10px;
    padding: 10px 20px 10px 10px;

    .login-button {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 10px;
      .el-button {
        width: 238px;
      }
    }

    .form-footer {
      display: flex;
      justify-content: flex-end;

      .el-link {
        margin-left: 10px;
      }
    }
  }

  @media screen and (max-width: 1400px) {
    justify-content: flex-start;
    .form-container {
      background: #ffffff;
      position: absolute;
      right: 50px;
    }
  }
}
</style>
