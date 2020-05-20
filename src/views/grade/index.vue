<template>
  <div class="app-container">
    <div class="filter-container">
      <departmentselect :value.sync="pageparam.department_id"></departmentselect>
      <majorselect :value.sync="pageparam.major_id"></majorselect>
      <el-input
        v-model="pageparam.grade_name"
        placeholder="请输入班级名称"
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
    <el-table :data="grades" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="id" prop="grade_id" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.grade_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班级编号" prop="grade_number" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.grade_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班级名称" prop="grade_name" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.grade_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班主任" prop="teacher_name" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.teacher_name }}</span>
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
      <el-form ref="form" :model="grade" label-width="120px">
        <el-form-item label="班级编号">
          <el-input v-model="grade.grade_number"/>
        </el-form-item>
        <el-form-item label="班级名称">
          <el-input v-model="grade.grade_name"/>
        </el-form-item>
        <el-form-item label="教师名称">
          <teacherselect :value.sync="grade.teacher_id" :key="dialogFormVisible"/>
        </el-form-item>
        <el-form-item label="系部名称">
          <departmentselect :value.sync="grade.department_id" :key="dialogFormVisible"/>
        </el-form-item>
        <el-form-item label="专业名称">
          <majorselect :value.sync="grade.major_id" :key="dialogFormVisible"/>
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
import { gradepagelist, gradeadd, gradeupdate, gradedel } from "@/api/data.js";
export default {
  data() {
    return {
      grades: [],
      pageparam: {
        department_id: "",
        major_id: "",
        grade_name: "",
        page: 1,
        size: 10
      },
      grade: {
        grade_id: "",
        grade_number: "",
        grade_name: "",
        department_id: "",
        major_id: "",
        teacher_id: ""
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
    gradepagelist(this.pageparam).then(res => {
      this.grades = res.data.content;
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
      gradepagelist(this.pageparam).then(res => {
        this.grades = res.data.content;
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
      this.clearGrade();
    },
    clearGrade() {
      this.grade.grade_id = "";
      this.grade.grade_name = "";
      this.grade.grade_number = "";
      this.grade.department_id = "";
      this.grade.major_id = "";
      this.grade.teacher_id = "";
    },
    createData() {
      // var temp = {"name":"","number":""};
      var temp = {
        grade_name: this.grade.grade_name,
        grade_number: this.grade.grade_number,
        department_id: this.grade.department_id,
        major_id: this.grade.major_id,
        teacher_id: this.grade.teacher_id
      };
      gradeadd(temp).then(res => {
        this.$message({ message: res.msg, type: "success" });
        this.dialogFormVisible = false;
        this.handleFilter();
      });
    },
    handleUpdate(row) {
      this.dialogFormVisible = true;
      this.dialogStatus = "update";
      //是否共用同一个存储空间
      this.grade = Object.assign({}, row);
    },
    updateData() {
      gradeupdate(this.grade).then(res => {
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
          this.grade = Object.assign({}, row);
          gradedel(this.grade).then(res => {
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