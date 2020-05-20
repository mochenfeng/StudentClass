<template>
  <div class="app-container">
    <div class="filter-container">
      <departmentselect :value.sync="pageparam.department_id"></departmentselect>
      <majorselect :value.sync="pageparam.major_id"></majorselect>
      <el-input
        v-model="pageparam.teacher_name"
        placeholder="请输入教师姓名"
        style="width: 200px;"
        class="filter-item"
      />
      <el-input
        v-model="pageparam.teacher_number"
        placeholder="请输入教师工号"
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
    <el-table :data="teachers" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="id" prop="teacher_id" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.teacher_id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="工号"
        prop="teacher_number"
        sortable="custom"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.teacher_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="teacher_name" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.teacher_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职称" prop="teacher_title" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.teacher_title}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="所在系部"
        prop="department_name"
        sortable="custom"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.department_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所在专业" prop="major_name" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.major_name }}</span>
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
      <el-form ref="form" :model="teacher" label-width="120px">
        <el-form-item label="教师工号">
          <el-input v-model="teacher.teacher_number"/>
        </el-form-item>
        <el-form-item label="教师名称">
          <el-input v-model="teacher.teacher_name"/>
        </el-form-item>
        <el-form-item label="教师职业名称">
          <el-input v-model="teacher.teacher_title"/>
        </el-form-item>
        <el-form-item label="所属系部ID">
          <departmentselect :value.sync="teacher.department_id" :key="dialogFormVisible"></departmentselect>
        </el-form-item>
        <el-form-item label="所属专业ID">
          <majorselect :value.sync="teacher.major_id" :key="dialogFormVisible"></majorselect>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="teacher.teacher_password"/>
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
import {
  teacherpagelist,
  teacheradd,
  teacherupdate,
  teacherdel
} from "@/api/data.js";
export default {
  data() {
    return {
      teachers: [],
      pageparam: {
        teacher_number: "",
        department_id: "",
        major_id: "",
        teacher_name: "",
        page: 1,
        size: 10
      },
      teacher: {
        teacher_id: "",
        teacher_number: "",
        teacher_name: "",
        department_id: "",
        major_id: "",
        teacher_title: "",
        teacher_password: ""
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
    teacherpagelist(this.pageparam).then(res => {
      this.teachers = res.data.content;
      this.totalElements = res.data.totalElements;
    });
  },
  methods: {
    handleFilter() {
      if (this.pageparam.department_id === null) {
        this.pageparam.department_id = "";
      }
      if (this.pageparam.major_id === null) {
        this.pageparam.major_id = "";
      }
      teacherpagelist(this.pageparam).then(res => {
        this.teachers = res.data.content;
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
      this.clearTeacher();
    },
    clearTeacher() {
      this.teacher.teacher_id = "";
      this.teacher.teacher_name = "";
      this.teacher.teacher_number = "";
      this.teacher.department_id = "";
      this.teacher.major_id = "";
      this.teacher.teacher_title = "";
      this.teacher.teacher_password = "";
    },
    createData() {
      // var temp = {"name":"","number":""};
      var temp = {
        teacher_name: this.teacher.teacher_name,
        teacher_number: this.teacher.teacher_number,
        department_id: this.teacher.department_id,
        major_id: this.teacher.major_id,
        teacher_title: this.teacher.teacher_title,
        teacher_password: this.teacher.teacher_password
      };
      teacheradd(temp).then(res => {
        this.$message({ message: res.msg, type: "success" });
        this.dialogFormVisible = false;
        this.handleFilter();
      });
    },
    handleUpdate(row) {
      this.dialogFormVisible = true;
      this.dialogStatus = "update";
      //是否共用同一个存储空间
      this.teacher = Object.assign({}, row);
    },
    updateData() {
      teacherupdate(this.teacher).then(res => {
        this.$message({ message: res.msg, type: "success" });
      });
      this.dialogFormVisible = false;
      this.handleFilter();
    },
    // handleDelete(row) {
    //   this.depart = Object.assign({}, row);
    //   del(this.depart).then(res => {
    //     this.$message({ message: res.msg, type: "success" });
    //   });
    //   this.handleFilter();
    // }
    handleDelete(row) {
      this.$confirm("此操作将永久删除内容，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.teacher = Object.assign({}, row);
          teacherdel(this.teacher).then(res => {
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