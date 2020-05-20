<template>
  <div class="app-container">
    <div class="filter-container">
      <departmentselect :value.sync="pageparam.department_id"></departmentselect>
      <el-input
        v-model="pageparam.major_name"
        placeholder="请输入专业名称"
        style="width: 200px;"
        class="filter-item"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >增加</el-button>
    </div>
    <el-table :data="majors" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="专业编号" prop="major_number" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.major_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="专业名称" prop="major_name" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.major_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="系部名称"
        prop="department_name"
        sortable="custom"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.department_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="pageparam.page"
      :page-size.sync="pageparam.size"
      layout="total, prev, pager, next, jumper"
      :total="totalElements"
    ></el-pagination>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="major" label-width="120px">
        <el-form-item label="专业编号">
          <el-input v-model="major.major_number"/>
        </el-form-item>
        <el-form-item label="专业名称">
          <el-input v-model="major.major_name"/>
        </el-form-item>
        <el-form-item label="系部名称">
          <departmentselect :key="dialogFormVisible" :value.sync="major.department_id"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { majorpagelist, majoradd, majorupdate, majordel } from "@/api/data.js";
export default {
  data() {
    return {
      majors: [],
      pageparam: {
        department_id: "",
        major_name: "",
        page: 1,
        size: 10
      },
      major: {
        major_id: "",
        major_number: "",
        major_name: "",
        department_id: ""
      },
      totalElements: 0,
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "修改",
        create: "新增"
      }
    };
  },
  created() {
    majorpagelist(this.pageparam).then(res => {
      this.majors = res.data.content;
      this.totalElements = res.data.totalElements;
    });
  },
  methods: {
    handleFilter() {
      if (this.pageparam.department_id === null) {
        this.pageparam.department_id = "";
      }
      majorpagelist(this.pageparam).then(res => {
        this.majors = res.data.content;
        this.totalElements = res.data.totalElements;
      });
    },
    onSubmit() {
      //   list(this.form).then(res => {
      //     this.departs = res.data;
      //   });
    },
    handleCreate() {
      this.dialogFormVisible = true;
      this.dialogStatus = "create";
      this.clearMajor();
    },
    clearMajor() {
      this.major.major_name = "";
      this.major.major_number = "";
      this.major.department_id = "";
    },
    createData() {
      // var temp = {"name":"","number":""};
      var temp = {
        major_name: this.major.major_name,
        major_number: this.major.major_number,
        department_id: this.major.department_id
      };
      majoradd(temp).then(res => {
        this.$message({ message: res.msg, type: "success" });
        this.dialogFormVisible = false;
        this.handleFilter();
      });
    },
    handleUpdate(row) {
      this.dialogFormVisible = true;
      this.dialogStatus = "update";
      //是否共用同一个存储空间
      this.major = Object.assign({}, row);
      // this.depart = row;
    },
    updateData() {
      majorupdate(this.major).then(res => {
        this.$message({ message: res.msg, type: "success" });
      });
      this.dialogFormVisible = false;
      this.handleFilter();
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除内容，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.major = Object.assign({}, row);
          majordel(this.major).then(res => {
            this.$message({
              message: res.msg,
              type: "success"
            });
            this.handleFilter();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleCurrentChange() {
      this.handleFilter();
    }
  }
};
</script>

<style scoped>
</style>