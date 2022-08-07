<!--
 * @Author: Hole 376220459@qq.com
 * @Date: 2022-08-06 14:26:34
 * @LastEditors: Hole 376220459@qq.com
 * @LastEditTime: 2022-08-07 18:41:02
 * @FilePath: \campus-sso\src\components\BaseVerifCodeInput.vue
 * @Description: 验证码Input组件
-->
<template>
  <el-form-item
    label="验证码："
    prop="verifCode"
  >
    <el-input
      :value="value"
      placeholder="请输入验证码"
      :maxlength="6"
      @input="iptVerifCode"
      @keyup.native.enter="enterKeyUp"
    >
      <el-button
        slot="append"
        :disabled="getVerifCodeBtn.disabled"
        @click="getVerifCode"
      >
        {{ getVerifCodeBtn.text }}
      </el-button>
    </el-input>
  </el-form-item>
</template>

<script>
export default {
  name: 'BaseVerifCodeInput',

  props: {
    value: {
      type: String,
    },
  },

  data() {
    return {
      getVerifCodeBtn: {
        disabled: false,
        text: '获取验证码',
      },
    }
  },

  computed: {},

  methods: {
    // 触发input事件
    iptVerifCode(value) {
      this.$emit('input', value)
    },

    // 获取验证码的回调
    getVerifCode() {
      const { getVerifCodeBtn } = this
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

      // 第二种实现方法：

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

    // enter键keyup事件
    enterKeyUp() {
      this.$emit('enterKeyUp')
    },
  },

  created() {},

  mounted() {},
}
</script>

<style scoped lang="scss"></style>
