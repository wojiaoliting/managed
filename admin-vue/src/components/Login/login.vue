<template>
<div class='login-wrap'>
  <el-form :label-position="labelPosition" label-width="80px" :model="form" class='login-form'>
  <h1>用户登录</h1>
  <el-form-item label="用户名" >
    <el-input v-model="form.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input @keyup.enter.native="handleLogin" type='password' v-model="form.password"></el-input>
  </el-form-item>
    <el-button @click="handleLogin" class='login-btn' type='success'>登录</el-button>
</el-form>
</div>
</template>
<script>
export default{
  name: 'Login',
  data () {
    return {
      labelPosition: 'top',
      form: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    async handleLogin () {
      var res = await this.$axios.post('/login', this.form)
      if (res.data.meta.status === 200) {
        console.log(res.data.data)
        this.$message.success(res.data.meta.msg)
        var token = res.data.data.token
        sessionStorage.setItem('token', token)
        this.$router.push('/home')
      } else {
        console.log(res.data.meta.msg)
        this.$message.error(res.data.meta.msg)
      }
    }
  }
}
</script>
<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}

.login-wrap .login-form .login-btn {
  width: 100%;
}
</style>
