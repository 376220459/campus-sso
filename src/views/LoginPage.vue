<!-- LoginPage -->
<template>
  <el-container>
    <el-header height="100px">
      <p>校园杂货铺 · 登录系统</p>
    </el-header>
    <el-divider />
    <el-main>
      <img
        src="@/assets/imgs/login.png"
        alt="login"
        width="1000px"
      />
      <el-form label-width="80px">
        <el-tabs>
          <el-tab-pane label="密码登录">
            <el-form-item
              label="手机号："
              label-position="left"
            >
              <el-input
                type="text"
                v-model="telNumber"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码：">
              <el-input
                type="password"
                v-model="password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="验证码登录">
            <el-form-item
              label="手机号："
              label-position="left"
            >
              <el-input
                type="text"
                v-model="telNumber"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item label="验证码：">
              <el-input
                type="text"
                v-model="verifCode"
                placeholder="请输入验证码"
              >
                <el-button
                  slot="append"
                  :disabled="disableVerifCodeBtn"
                  @click="getVerifCode"
                >
                  {{ getVerifCodeText }}
                </el-button>
              </el-input>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
        <el-form-item>
          <el-button
            class="login-button"
            type="primary"
            >登录</el-button
          >
        </el-form-item>
        <div class="form-footer">
          <el-link href="/">忘记密码</el-link>
          <el-link href="/">免费注册</el-link>
        </div>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'LoginPage',

  props: {},

  data() {
    return {
      telNumber: '',
      password: '',
      verifCode: '',
      disableVerifCodeBtn: false,
      getVerifCodeText: '获取验证码',
    }
  },

  computed: {},

  methods: {
    getVerifCode() {
      this.disableVerifCodeBtn = true
      let count = 60
      this.getVerifCodeText = `${count}秒后重发`

      const countDown = () => {
        setTimeout(() => {
          if (count <= 0) {
            this.disableVerifCodeBtn = false
            this.getVerifCodeText = '重新发送'
          } else {
            count--
            this.getVerifCodeText = `${count}秒后重发`
            countDown()
          }
        }, 1000)
      }

      countDown()

      // 尽量避免使用setInterval:
      // const interval = setInterval(() => {
      //   if (count <= 0) {
      //     this.disableVerifCodeBtn = false
      //     this.getVerifCodeText = '重新发送'
      //     clearInterval(interval)
      //   } else {
      //     count--
      //     this.getVerifCodeText = `${count}秒后重发`
      //   }
      // }, 1000)
    },
  },

  created() {},

  mounted() {},
}
</script>

<style scoped lang="scss">
.el-container {
  width: 100%;
  height: 100%;
  background-color: #d6faff;

  .el-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 50px;
    color: #000000;
  }

  .el-main {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -60px;
    overflow: hidden;

    @media screen and (max-width: 1400px) {
      justify-content: flex-start;
      .el-form {
        position: absolute;
        right: 50px;
      }
    }

    .el-form {
      background: #ffffff9c;
      flex-shrink: 0;
      width: 350px;
      border: 1px solid rgba(0, 0, 0, 0.233);
      box-shadow: 6px 6px 6px #00000071;
      border-radius: 10px;
      padding: 10px 20px 10px 10px;

      .login-button {
        width: 100%;
      }

      .form-footer {
        display: flex;
        justify-content: flex-end;

        .el-link {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
