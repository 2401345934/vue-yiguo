<template>
  <div id="login">
    <van-button type="primary" block class="login">注册界面</van-button>
    <van-form @submit="onSubmit">
      <van-field
              v-model="username"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
              v-model="password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>
    <van-button type="primary" block class="login" @click="$router.push('/login')">前往登陆界面</van-button>
  </div>
</template>

<script>
  import { instance2 } from "@/utils/http";
  import { Notify } from "vant";
  import Vue from "vue";

  Vue.use(Notify);
  export default {
    name: "index",
    data() {
      return {
        username: "",
        password: ""
      };
    },
    methods: {
      login() {
        instance2.post("/api/login", {
          username: this.username,
          password: this.password
        }).then((res) => {
          if (res.err === 1) {
            Notify({ type: "danger", message: res.msg });
          } else {
            localStorage.setItem("token", res.token);
            Notify({ type: "success", message: res.msg });
            this.$router.push("/my");
          }
          ;
        }).catch((err) => {
        });
      },
      onSubmit(values) {
        instance2.post("/api/reg", {
          username: this.username,
          password: this.password
        }).then((res) => {
          if (res.err === 1) {
            Notify({ type: "danger", message: res.msg });
          } else {
            localStorage.setItem("username", JSON.stringify(values.用户名));
            this.login();
          }
          ;
        }).catch((err) => {
          Notify({ type: "danger", message: err });
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  .login {
    width: 100%;
    margin: 1rem auto;
    text-align: center;

  }
</style>