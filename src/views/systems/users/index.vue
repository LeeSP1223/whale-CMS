<template>
  <div id="condition">
    <el-row class="search">
      <el-input v-model.trim="searchList.username" size="medium" placeholder="请输入用户名" clearable />
      <el-input v-model.trim="searchList.phone" size="medium" placeholder="请输入手机号码" clearable />
      <el-button icon="el-icon-search" type="success" size="medium" @click="handleSearch()">查询</el-button>
      <el-button icon="el-icon-plus" type="primary" size="medium" @click="handleDialogForm(null)">新增</el-button>
      <el-button icon="el-icon-close" type="info" size="medium" @click="handleSearch('clear')">清空</el-button>
    </el-row>
    <el-row class="table">
      <el-table :data="userList" stripe border style="width: 100%">
        <el-table-column label="序号" width="80" align="center">
          <template slot-scope="scope">
            {{ (searchList.pageNo-1) * searchList.pageSize + scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column prop="id" label="用户ID" width="180" align="center" />
        <el-table-column prop="username" label="用户名" width="180" align="center" />
        <el-table-column prop="phone" label="联系电话" width="180" align="center" />
        <el-table-column prop="status" label="用户状态" width="100" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 1" type="primary">正常</el-tag>
            <el-tag v-else type="danger">停用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="电子邮箱" align="center" />
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" :enterable="false" placement="top">
              <el-button type="warning" icon="el-icon-edit" size="small" circle @click="handleDialogForm(scope.row.id)" />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" :enterable="false" placement="top">
              <el-button type="danger" icon="el-icon-delete" size="small" circle @click="deleteUser(scope.row)" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="pages">
      <el-pagination
        :current-page="searchList.pageNo"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="searchList.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-row>

    <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="clearForm">
      <el-form ref="userFormRef" :model="userForm" :rules="rules">
        <el-form-item label="用户名" size="medium" :label-width="formLabelWidth" prop="username">
          <el-input v-model="userForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item
          v-if="userForm.id == null || userForm.id == undefined"
          label="用户密码"
          size="medium"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input v-model="userForm.password" type="password" autocomplete="off" show-password />
        </el-form-item>
        <el-form-item label="联系电话" size="medium" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="userForm.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户状态" :label-width="formLabelWidth">
          <el-switch
            v-model="userForm.status"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="用户角色" :label-width="formLabelWidth">
          <el-checkbox-group
            v-model="userForm.roleIdList"
            :min="1"
            :max="3"
            style="width: 80%;"
          >
            <el-checkbox v-for="role in roleList" :key="role.roleId" :label="role.roleId">{{ role.roleDesc }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="电子邮箱" size="medium" :label-width="formLabelWidth" prop="email">
          <el-input v-model="userForm.email" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import userApi from '@/api/userManage'
import roleApi from '@/api/roleManage'

export default {
  name: 'Users',
  components: {

  },
  data() {
    var checkEmail = (rule, value, callback) => {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/
      if (!reg.test(value)) {
        return callback(new Error('邮箱格式错误'))
      }
      callback()
    }
    return {
      title: '',
      dialogFormVisible: false,
      userForm: {
        roleIdList: []
      },
      formLabelWidth: '150px',
      total: 0,
      searchList: {
        username: '',
        phone: '',
        pageNo: 1,
        pageSize: 10
      },
      userList: [],
      currentPage4: 4,
      roleList: [],
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入初始密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { min: 7, max: 11, message: '长度在 7 到 11 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.handleSearch()
    this.getAllRoleList()
  },
  methods: {
    handleSearch(isClear) {
      if (isClear) {
        this.searchList = {
          username: '',
          phone: '',
          pageNo: 1,
          pageSize: 10
        }
      }

      userApi.getUserList(this.searchList).then(res => {
        this.userList = res.data.rows
        this.total = res.data.total
      })
    },
    handleSizeChange(pageSize) {
      this.searchList.pageSize = pageSize
      this.handleSearch()
    },
    handleCurrentChange(pageNo) {
      this.searchList.pageNo = pageNo
      this.handleSearch()
    },
    handleDialogForm(id) {
      if (id == null) {
        this.title = '添加用户'
      } else {
        this.title = '编辑用户'
        userApi.getUserById(id).then(res => {
          this.userForm = res.data
        })
      }
      this.dialogFormVisible = true
    },
    clearForm() {
      this.userForm = {
        roleIdList: []
      }
      this.$refs.userFormRef.clearValidate()
    },
    submitForm() {
      this.$refs.userFormRef.validate((valid) => {
        if (valid) {
          userApi.saveUser(this.userForm).then(res => {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.dialogFormVisible = false
            this.handleSearch()
          })
        } else {
          this.$message({
            message: '添加失败',
            type: 'error'
          })
          return false
        }
      })
    },
    deleteUser(user) {
      this.$confirm(`您确认要删除用户 ${user.username} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userApi.deleteUserById(user.id).then(res => {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.handleSearch()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getAllRoleList() {
      roleApi.getAllRoleList().then(res => {
        this.roleList = res.data
        console.log(this.roleList)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

#condition {

  .search {

    .el-input {
      width: 300px;
      margin-right: 10px;
    }
  }

  .el-row {
    margin-bottom: 20px;
  }

  .el-dialog {

    .el-input{
      width: 80%;
    }
  }
}

</style>
