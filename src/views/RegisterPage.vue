<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-05 18:16:01
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-06 21:42:51
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
      size="normal"
    >
      <el-divider>欢迎注册</el-divider>
      <el-form-item
        label="手机号"
        prop="telNumber"
      >
        <el-input
          v-model.number="registerForm.data.telNumber"
          :maxlength="11"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          v-model="registerForm.data.password"
          type="password"
          :maxlength="20"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="checkPassword"
      >
        <el-input
          v-model="registerForm.data.checkPassword"
          type="password"
          :maxlength="20"
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
        prop="school"
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
        <el-select
          v-model="registerForm.data.identity"
          @change="identityChange"
        >
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
        <el-input
          v-model="registerForm.data.studentNumber"
          :maxlength="12"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="工号"
        prop="jobNumber"
        v-else
      >
        <el-input
          v-model="registerForm.data.jobNumber"
          :maxlength="12"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="真实姓名"
        prop="name"
      >
        <el-input
          v-model="registerForm.data.name"
          :maxlength="8"
        ></el-input>
      </el-form-item>
      <BaseVerifCodeInput v-model="registerForm.data.verifCode" />
      <el-form-item>
        <el-button
          type="primary"
          @click="register"
          >注册</el-button
        >
      </el-form-item>
      <div class="form-footer">
        <el-link href="/login">返回登录</el-link>
      </div>
    </el-form>
  </el-main>
</template>

<script>
import BaseVerifCodeInput from '@/components/BaseVerifCodeInput.vue'
import { mapMutations } from 'vuex'
import { register } from '@/apis/index'
import resHandle from '@/utils/resHandle'
import {
  telNumberRule,
  registerPasswordRule,
  nickNameRule,
  studentNumberRule,
  jobNumberRule,
  nameRule,
  verifCodeRule,
  schoolRule,
} from '@/utils/rules'

export default {
  name: 'RegisterPage',

  components: {
    BaseVerifCodeInput,
  },

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
          verifCode: '',
        },
        rules: {
          telNumber: telNumberRule,

          // 密码和确认密码需要mix额外的自定义验证方法
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
          school: schoolRule,
          studentNumber: studentNumberRule,
          jobNumber: jobNumberRule,
          name: nameRule,
          verifCode: verifCodeRule,
        },
      },

      // 因为学校数据字典庞大,需要后端接口来提供(此处是模拟后端请求的懒加载)
      schoolProps: {
        // 懒加载时必须设置此字段为true
        lazy: true,

        // 将返回值设置为叶子节点的值,而不是整个树的数组
        emitPath: false,

        /**
         * @description: 懒加载函数
         * @param {Object} node 当前节点，根节点level为0
         * @param {Function} resolve 必须调用
         * @return {Null}
         */
        async lazyLoad(node, resolve) {
          // level是当前节点的等级，value是选中选项值
          const { level, value } = node
          if (level === 0) {
            // 注意：根节点的数据获取行为会在界面打开时自动执行。下面是模拟后端请求。
            const nodes = await new Promise(resolve => {
              setTimeout(() => {
                resolve([
                  {
                    value: '陕西',
                    label: '陕西',
                    // leaf默认为false，表示此节点不是叶子节点。如果节点为叶子节点，必须设置为true
                    leaf: false,
                  },
                ])
              }, 500)
            })
            resolve(nodes)
          } else if (level === 1) {
            // 注意：不是根节点的数据获取行为，会在点击其父节点时执行。下面是模拟后端请求。
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
                }, 500)
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
    ...mapMutations(['updateLoading']),

    // 密码和确认密码的额外验证规则
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

    // 身份选项改变时，必须清空学号和工号，否则提交表单时，会同时发送到后端
    identityChange() {
      ;[this.registerForm.data.studentNumber, this.registerForm.data.jobNumber] = ['', '']
    },

    // 用户注册
    register() {
      // 字段验证判断。注意此处的回调函数必须是async函数，因为内部有异步操作。
      this.$refs.registerForm.validate(async valid => {
        if (valid) {
          this.updateLoading({
            loading: true,
            loadingText: '正在注册，请稍等...',
          })
          const res = await register(this.registerForm.data)
          resHandle(res, {
            // 下列的回调函数，均采用箭头函数的方式声明，以便绑定this
            sucessHandle: () => {
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

    .form-footer {
      display: flex;
      justify-content: flex-end;

      .el-link {
        margin-right: -30px;
      }
    }
  }
}
</style>
