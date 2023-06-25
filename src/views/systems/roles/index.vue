<template>
  <div id="condition">
    <el-row class="search">
      <el-input v-model="searchList.roleName" size="medium" placeholder="请输入角色名称" clearable />
      <el-button icon="el-icon-search" type="success" size="medium" @click="handleSearch()">查询</el-button>
      <el-button icon="el-icon-plus" type="primary" size="medium" @click="handleDialogForm(null)">新增</el-button>
      <el-button icon="el-icon-close" type="info" size="medium" @click="handleSearch('clear')">清空</el-button>
    </el-row>
    <el-row class="table">
      <el-table :data="roleList" stripe border style="width: 100%">
        <el-table-column label="序号" width="80" align="center">
          <template slot-scope="scope">
            {{ (searchList.pageNo-1) * searchList.pageSize + scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column prop="roleId" label="角色ID" width="200" align="center" />
        <el-table-column prop="roleName" label="角色名称" width="250" align="center" />
        <el-table-column prop="roleDesc" label="角色描述" align="center" />
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" :enterable="false" placement="top">
              <el-button type="warning" icon="el-icon-edit" size="small" circle @click="handleDialogForm(scope.row.roleId)" />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" :enterable="false" placement="top">
              <el-button type="danger" icon="el-icon-delete" size="small" circle @click="deleteRole(scope.row)" />
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
      <el-form ref="roleFormRef" :model="roleForm" :rules="rules">
        <el-form-item label="角色名称" size="medium" :label-width="formLabelWidth" prop="roleName">
          <el-input v-model="roleForm.roleName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色描述" size="medium" :label-width="formLabelWidth" prop="roleDesc">
          <el-input v-model="roleForm.roleDesc" autocomplete="off" />
        </el-form-item>
        <el-form-item label="权限分配" size="medium" :label-width="formLabelWidth" prop="menuIdList">
          <el-tree
            ref="menuRef"
            :data="menuList"
            :props="menuProps"
            node-key="menuId"
            default-expand-all
            show-checkbox
            style="width: 80%;"
          />
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
import roleApi from '@/api/roleManage'
import menuApi from '@/api/menuManage'

export default {
  name: 'Roles',
  components: {

  },
  data() {
    return {
      title: '',
      dialogFormVisible: false,
      roleForm: {},
      formLabelWidth: '150px',
      total: 0,
      searchList: {
        roleName: '',
        roleDesc: '',
        pageNo: 1,
        pageSize: 10
      },
      roleList: [],
      menuList: [],
      menuProps: {
        children: 'children',
        label: 'title'
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请角色描述', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.handleSearch()
    this.getAllMenu()
  },
  methods: {
    handleSearch(isClear) {
      if (isClear) {
        this.searchList = {
          roleName: '',
          roleDesc: '',
          pageNo: 1,
          pageSize: 10
        }
      }

      roleApi.getRoleList(this.searchList).then(res => {
        this.roleList = res.data.rows
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
    handleDialogForm(roleId) {
      if (roleId == null) {
        this.title = '添加角色'
      } else {
        this.title = '编辑角色'
        roleApi.getRoleById(roleId).then(res => {
          this.roleForm = res.data
          this.$refs.menuRef.setCheckedKeys(res.data.menuIdList)
        })
      }
      this.dialogFormVisible = true
    },
    clearForm() {
      this.roleForm = {}
      this.$refs.roleFormRef.clearValidate()
      this.$refs.menuRef.setCheckedKeys([])
    },
    submitForm() {
      this.$refs.roleFormRef.validate((valid) => {
        if (valid) {
          const checkedKeys = this.$refs.menuRef.getCheckedKeys()
          const halfCheckedKeys = this.$refs.menuRef.getHalfCheckedKeys()
          this.roleForm.menuIdList = checkedKeys.concat(halfCheckedKeys)
          roleApi.saveRole(this.roleForm).then(res => {
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
    deleteRole(role) {
      this.$confirm(`您确认要删除角色 ${role.roleName} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        roleApi.deleteRoleById(role.roleId).then(res => {
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
    getAllMenu() {
      menuApi.getAllMenuList().then(res => {
        this.menuList = res.data
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
