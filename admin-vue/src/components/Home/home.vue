<template>
<el-container class='container'>
  <el-header class='header'>
    <el-col :span="4"><img src='@/assets/logo.png'></el-col>
    <el-col :span="19" class='title'><div>电商后台管理系统</div></el-col>
    <el-col :span="1" class='logout'><div><a href='#' @click="handleLogout">注销</a></div></el-col>
  </el-header>
  <el-container>
    <el-aside class='aside' width="200px">
      <el-menu :unique-opened="true" router default-active="/user">
        <!-- default-active的作用是默认选中菜单项，当前默认显示第二个一级菜单的第一个子菜单 -->
        <!-- 开启路由列表和唯一子菜单显示 -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <router-link to='/user'>
          <span>用户管理</span>
          </router-link>
        </template>
          <el-menu-item index="/user">
          <i class="el-icon-menu"></i>
          <span>用户列表</span>
          </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
          <el-menu-item index="/role">
          <i class="el-icon-menu"></i>
          <span>角色列表</span>
          </el-menu-item>
          <el-menu-item index="2-2">
          <i class="el-icon-menu"></i>
          <span>权限列表</span>
          </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
          <el-menu-item index="3-1">
          <i class="el-icon-menu"></i>
          <span>商品列表</span>
          </el-menu-item>
          <el-menu-item index="3-2">
          <i class="el-icon-menu"></i>
          <span>分类参数</span>
          </el-menu-item>
          <el-menu-item index="3-3">
          <i class="el-icon-menu"></i>
          <span>商品分类</span>
          </el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
          <el-menu-item index="4-1">
          <i class="el-icon-menu"></i>
          <span>订单列表</span>
          </el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
          <el-menu-item index="5-1">
          <i class="el-icon-menu"></i>
          <span>数据报表</span>
          </el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main class='main'>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
export default{
  name: 'home',
  beforeCreate () {
    var token = sessionStorage.getItem('token')
    if (!token) {
      this.$message.warning('请先登录')
      this.$router.push('/')
    }
  },
  methods: {
    handleLogout () {
      sessionStorage.clear()
      this.$message.success('退出成功')
      this.$router.push('/')
    }
  }

}
</script>
<style scoped>
.container{
  height:100%;
}
.header{
  padding:0;
  text-indent:0.5em;
}
.header .title{
  font-size:26px;
  font-weight:bold;
  text-align:center;
  height:100%;
}
.header .title div{
  line-height:60px;
}
.header .logout div{
  line-height:60px;
}
.header .logout div{
  line-height:60px;
}

.main{
  background-color:green;
}
.item {
    padding: 18px 0;
}
</style>
