<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-05 18:16:01
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-11 00:16:08
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
                @keyup.native.enter="login"
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

            <BaseVerifCodeInput
              v-model="verifCodeForm.data.verifCode"
              @enterKeyUp="login"
            />
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
        <el-link href="/forget">忘记密码</el-link>
        <el-link href="/register">免费注册</el-link>
      </div>
    </div>
  </el-main>
</template>

<script>
import BaseVerifCodeInput from '@/components/BaseVerifCodeInput.vue'
import { telNumberRule, verifCodeRule, loginPasswordRule } from '@/utils/rules'
import { login } from '@/apis/userAccount'
import resHandle from '@/utils/resHandle'
import { mapMutations } from 'vuex'

export default {
  name: 'LoginPage',

  components: { BaseVerifCodeInput },

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
      },
    }
  },

  methods: {
    ...mapMutations(['updateLoading']),

    // 登录
    login() {
      // 密码登录和验证码登录是不同的表单，这里需要靠this.loginForm做判断
      this.$refs[this.loginForm].validate(async valid => {
        if (valid) {
          this.updateLoading({
            loading: true,
            loadingText: '正在登录，请稍等...',
          })
          const res = await login(this[this.loginForm].data)
          resHandle(res, {
            // 下列的回调函数，均采用箭头函数的方式声明，以便绑定this
            successHandle: () => {
              this.updateLoading({
                loading: true,
                loadingText: '正在跳转界面...',
              })
              // 此处只是提供一个跳转登录的视觉效果
              setTimeout(() => {
                this.updateLoading({
                  loading: false,
                  loadingText: '',
                })
                // 跳转至请求登录来源页面（在created钩子中已经将来源页面存到了store）
                window.location = this.$cookies.get('redirect') || 'http://localhost:8081/'
              }, 3000)
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
  },

  created() {
    const { redirect } = this.$route.query
    // 将来源页存储到cookie中(过期时间设置为0，代表关闭浏览器则失效) 不存在store中是因为刷新页面后store就会失效。
    redirect && this.$cookies.set('redirect', redirect, '0')
  },
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
