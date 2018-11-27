<template>
    <el-card>
        <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索框 -->
      <el-row class="user-box">
            <el-col :span="24">
              <el-input
              v-model="searchValue"
              @keyup.enter.native="handleSearch"
              placeholder="请输入内容"
              class="input-with-select">
                <el-button
                @click="handleSearch"
                slot="append"
                icon="el-icon-search"></el-button>
              </el-input>
              <el-button type="success" plain @click="dialogVisible = true">用户添加</el-button>
              <el-dialog
                title="添加用户"
                @close="handleClosEedit"
                :visible.sync="dialogVisible"
                width="40%"
                :before-close="handleClose">
                <template slot-scope="scope">
                  <el-form label-position="left" label-width="80px" :model="addForm" :rules="rules" ref="form">
                    <el-form-item label="用户名" prop="username">
                      <el-input v-model="addForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                      <el-input type='password' v-model="addForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                      <el-input v-model="addForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="mobile">
                      <el-input v-model="addForm.mobile"></el-input>
                    </el-form-item>
                  </el-form>
                </template>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="resetForm">取 消</el-button>
                  <el-button type="primary" @click="handleAdd">确 定</el-button>
                </span>
              </el-dialog>
            </el-col>
      </el-row>
       <!-- 表格 -->
        <el-table
        :data="tableData"
        stripe
        fit
        style="width: 100%;">
        <el-table-column
            align="center"
            header-align="center"
            type="index">
        </el-table-column>
        <el-table-column
            align="center"
            header-align="center"
            prop="username"
            label="姓名">
        </el-table-column>
        <el-table-column
            align="center"
            header-align="center"
            prop="email"
            label="邮箱">
        </el-table-column>
        <el-table-column
            align="center"
            header-align="center"
            prop="mobile"
            label="电话">
        </el-table-column>
         <el-table-column
            align="center"
            header-align="center"
            prop="role_name"
            label="角色权限">
        </el-table-column>
        <el-table-column
            align="center"
            header-align="center"
            label="时间">
            <template slot-scope="scope">
                {{scope.row.create_time| fmtDate('YYYY-MM-DD')}}
            </template>
        </el-table-column>
        <el-table-column
            align="center"
            header-align="center"
            prop="mg_state"
            label="用户状态">
            <template slot-scope="scope">
                <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                @change="handleChangeStatus(scope.row)"
                inactive-color="#ff4949">
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column
            align="center"
            header-align="center"
            width="200"
            label="操作">
         <template slot-scope="scope">
          <el-button
          size="mini"
          type="info"
          @click="lookEdit(scope.row)"><i class="el-icon-edit"></i></el-button>
          <el-button
          size="mini"
          type="danger"
          @click="delUser(scope.row.id)"><i class="el-icon-delete"></i></el-button>
          <el-button
          size="mini"
          type="success"
          @click="addRole(scope.row)"><i class="el-icon-check"></i></el-button>
         </template>
        </el-table-column>
        </el-table>
        <el-dialog
                title="修改用户"
                :visible.sync="editDialogVisible"
                width="40%"
                @close="handleClosEedit"
                :before-close="handleClose2">
                <template slot-scope="scope">
                  <el-form label-position="left" label-width="80px" :model="addForm" ref="form">
                    <el-form-item label="用户名" prop="username">
                      <el-input v-model="addForm.username" readOnly></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                      <el-input v-model="addForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="mobile">
                      <el-input v-model="addForm.mobile"></el-input>
                    </el-form-item>
                  </el-form>
                </template>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="editDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="editUser">确 定</el-button>
                </span>
        </el-dialog>
        <el-dialog
                title="分配角色"
                :visible.sync="roleDialogVisible"
                width="40%"
                :before-close="handleClose3">
                <template slot-scope="scope">
                  <div style="margin-bottom:10px">用户名：{{addForm.username}}</div>
                  角色：
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="roleDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="updateRole">确 定</el-button>
                </span>
        </el-dialog>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-count="5"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
</template>
<script>
export default {
  name: 'user',
  data () {
    return {
      status: true,
      tableData: [],
      pagesize: 10,
      total: 0,
      pagenum: 1,
      searchValue: '',
      dialogVisible: false,
      editDialogVisible: false,
      roleDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      },
      options: [{
        value: 30,
        label: '主管'
      }, {
        value: 31,
        label: '测试角色'
      }, {
        value: 34,
        label: '测试角色2'
      }, {
        value: 39,
        label: '超级管理员'
      }, {
        value: 10,
        label: 'test'
      }],
      value: ''
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      var token = sessionStorage.getItem('token')
      // console.log(token)
      this.$axios.defaults.headers.common['Authorization'] = token
      var res = await this.$axios.get(`/users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchValue}`)
      var {meta: {status, msg}} = res.data
      if (status === 200) {
        this.tableData = res.data.data.users
        this.total = res.data.data.total
        console.log(res)
      } else {
        this.$message.error(msg)
      }
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.loadData()
      // console.log(`每页 ${val} 条`, this.pagesize, this.pagenum)
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.loadData()
      // console.log(`当前页: ${val}`, this.pagesize, this.pagenum)
    },
    handleSearch () {
      this.loadData()
    },
    async handleAdd () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const response = await this.$axios.post(`users`, this.addForm)
          var {data: {meta: { status, msg }}} = response
          if (status === 201) {
            this.$message.success(msg)
            this.loadData()
            this.resetForm()
          } else {
            this.$message.error(msg)
            return false
          }
        } else {
          console.log('表单验证失败')
        }
      })
    },
    resetForm () {
      this.dialogVisible = false
      this.$refs.form.resetFields()
    },
    handleClose () {
      this.resetForm()
    },
    handleClose2 () {
      this.editDialogVisible = false
      this.handleClosEedit()
    },
    handleClose3 () {
      this.roleDialogVisible = false
      this.handleClosEedit()
    },
    async handleChangeStatus (user) {
      const res = await this.$axios.put(`users/${user.id}/state/${user.mg_state}`)
      console.log(res)
      const {data: {meta: {status, msg}}} = res
      if (status === 200) {
        this.$message.success(msg)
        // this.loadData()
      } else {
        this.$message.error(msg)
      }
    },
    lookEdit (user) {
      this.editDialogVisible = true
      this.addForm.username = user.username
      this.addForm.email = user.email
      this.addForm.mobile = user.mobile
      this.addForm.id = user.id
    },
    addRole (user) {
      this.roleDialogVisible = true
      this.addForm.id = user.id
      this.addForm.username = user.username
      console.log(user)
    },
    async editUser () {
      const res = await this.$axios.put(`users/${this.addForm.id}`, {email: this.addForm.email, mobile: this.addForm.mobile})
      // console.log(res)
      const {data: {meta: {status, msg}}} = res
      if (status === 200) {
        this.$message.success(msg)
        this.editDialogVisible = false
        this.loadData()
      } else {
        this.$message.error(msg)
      }
    },
    handleClosEedit () {
      for (var key in this.addForm) {
        this.addForm[key] = ''
      }
    },
    async delUser (id) {
      if (confirm('确定要删除吗？')) {
        const res = await this.$axios.delete(`users/${id}`)
        const {data: {meta: {status, msg}}} = res
        if (status === 200) {
          this.$message.success(msg)
          this.loadData()
        } else {
          this.$message.error(msg)
        }
      }
    },
    async updateRole () {
      console.log(this.value)
      const res = await this.$axios.put(`users/${this.addForm.id}/role`, {rid: this.value})
      const {meta: {status, msg}} = res.data
      if (status === 200) {
        this.$message.success(msg)
        this.loadData()
        this.roleDialogVisible = false
        this.handleClosEedit()
      } else {
        this.$message.error(msg)
      }
    }

  }
}
</script>

<style>
.user-box{
    margin-top:10px;
    margin-bottom:10px;
}
.input-with-select{
    width: 300px;
}
</style>
