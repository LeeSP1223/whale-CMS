<template>
  <div id="condition">
    <el-row class="search">
      <el-input size="medium" placeholder="请输入菜单名称" clearable />
      <el-button icon="el-icon-search" type="success" size="medium" @click="handleSearch()">查询</el-button>
      <el-button icon="el-icon-plus" type="primary" size="medium" @click="handleDialogForm(null)">新增</el-button>
      <el-button icon="el-icon-close" type="info" size="medium" @click="handleSearch('clear')">清空</el-button>
    </el-row>
    <el-row class="table">
      <el-table :data="menuList" stripe border style="width: 100%">
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">
            {{ (searchList.pageNo-1) * searchList.pageSize + scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column prop="id" label="用户ID" width="80" align="center" />
        <el-table-column prop="menuName" label="菜单名称" width="180" align="center" />
        <el-table-column prop="path" label="菜单路径" align="center" />
        <el-table-column prop="name" label="组件名称" width="100" align="center" />
        <el-table-column prop="component" label="组件路径" align="center" />
        <el-table-column prop="icon" label="图标" width="100" align="center" />
        <el-table-column prop="parentId" label="父节点Id" width="100" align="center" />
        <el-table-column prop="isLeaf" label="节点类型" width="100" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 'Y'" type="primary">子节点</el-tag>
            <el-tag v-else type="danger">父节点</el-tag>
          </template>
        </el-table-column>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: []
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style scoped>

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
