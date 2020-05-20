<template>
  <div class="app-container">
    <div class="filter-container">
      <departmentselect :value.sync="pageparam.department_id"></departmentselect>
      <majorselect :value.sync="pageparam.major_id"></majorselect>
      <gradeselect :value.sync="pageparam.grade_id"></gradeselect>
      <el-input
        v-model="pageparam.student_name"
        placeholder="请输入学生姓名"
        style="width: 150px;"
        class="filter-item"
      />
      <el-input
        v-model="pageparam.student_number"
        placeholder="请输入学生学号"
        style="width: 150px;"
        class="filter-item"
      />
      <el-date-picker
        v-model="pageparam.student_enterSchoolDate"
        type="date"
        placeholder="入学日期（起始）"
        style="width: 200px;"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
      <el-date-picker
        v-model="pageparam.student_enterSchoolDateEnd"
        type="date"
        placeholder="入学日期（截止）"
        style="width: 200px;"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >增加</el-button>
    </div>
    <el-table :data="students" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="id" prop="student_id" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.student_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学号" prop="student_number" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.student_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="student_name" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.student_name }}</span>
        </template>
      </el-table-column>
      
      <el-table-column
        label="入学日期"
        prop="student_enterSchoolDate"
        sortable="custom"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.student_enterSchoolDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="毕业日期" prop="student_enterSchoolDateEnd" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.student_enterSchoolDateEnd }}</span>
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
      <el-table-column label="所在班级" prop="grade_name" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.grade_name }}</span>
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
      <el-form ref="form" :model="student" label-width="120px">
        <el-form-item label="学号">
          <el-input v-model="student.student_number"/>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="student.student_name"/>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="student.student_gender"/>
        </el-form-item>
        <el-form-item label="系部ID">
          <departmentselect :value.sync="student.department_id" :key="dialogFormVisible"></departmentselect>
        </el-form-item>
        <el-form-item label="专业ID">
          <majorselect :value.sync="student.major_id" :key="dialogFormVisible"></majorselect>
        </el-form-item>
        <el-form-item label="班级ID">
          <gradeselect :value.sync="student.grade_id" :key="dialogFormVisible"></gradeselect>
        </el-form-item>
        <el-form-item label="学生入学日期">
          <el-date-picker
            v-model="student.student_enterSchoolDate"
            type="date"
            placeholder="入学日期"
            style="width: 200px;"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="学生毕业日期">
          <el-date-picker
            v-model="student.student_enterSchoolDateEnd"
            type="date"
            placeholder="毕业日期"
            style="width: 200px;"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="学生密码">
          <el-input v-model="student.studentPassword"/>
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
  studentpagelist,
  studentadd,
  studentupdate,
  studentdel
} from "@/api/data.js";
export default {
  data() {
    return {
      students: [],
      pageparam: {
        student_enterSchoolDate: "",
        student_enterSchoolDateEnd: "",
        department_id: "",
        major_id: "",
        grade_id: "",
        student_name: "",
        student_number: "",
        page: 1,
        size: 10
      },
      student: {
        student_id: "",
        student_number: "",
        student_name: "",
        student_gender: "",
        student_enterSchoolDateEnd: "",
        student_enterSchoolDate: "",
        department_id: "",
        major_id: "",
        grade_id: "",
        studentPassword: ""
      },
      totalElements: 0,
      dialogFormVisible: false,
      dialogStatus: "",
      disabledDate(time) {
        return time.getTime() > Date.now();
      },
      textMap: {
        update: "修改",
        create: "新增"
      }
    };
  },
  created() {
    studentpagelist(this.pageparam).then(res => {
      this.students = res.data.content;
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
      if (this.pageparam.grade_id === null) {
        this.pageparam.grade_id = "";
      }
      if (this.pageparam.student_enterSchoolDate === null) {
        this.pageparam.student_enterSchoolDate = "";
      }
      if (this.pageparam.student_enterSchoolDateEnd === null) {
        this.pageparam.student_enterSchoolDateEnd = "";
      }
      studentpagelist(this.pageparam).then(res => {
        this.students = res.data.content;
        this.totalElements = res.data.totalElements;
      });
    },
    onSubmit() {},
    handleCreate() {
      this.dialogFormVisible = true;
      this.dialogStatus = "create";
      this.clearStudent();
    },
    clearStudent() {
      this.student.student_id = "";
      this.student.student_name = "";
      this.student.student_number = "";
      this.student.department_id = "";
      this.student.major_id = "";
      this.student.grade_id = "";
      this.student.student_gender = "";
      this.student.student_enterSchoolDateEnd = "";
      this.student.student_enterSchoolDate = "";
      this.student.studentPassword = "";
    },
    createData() {
      // var temp = {"name":"","number":""};
      var temp = {
        student_name: this.student.student_name,
        student_number: this.student.student_number,
        department_id: this.student.department_id,
        major_id: this.student.major_id,
        grade_id: this.student.grade_id,
        student_gender: this.student.student_gender,
        student_enterSchoolDateEnd: this.student.student_enterSchoolDateEnd,
        student_enterSchoolDate: this.student.student_enterSchoolDate,
        studentPassword: this.student.studentPassword
      };
      studentadd(temp).then(res => {
        this.$message({ message: res.msg, type: "success" });
        this.dialogFormVisible = false;
        this.handleFilter();
      });
    },
    handleUpdate(row) {
      this.dialogFormVisible = true;
      this.dialogStatus = "update";
      //是否共用同一个存储空间
      this.student = Object.assign({}, row);
    },
    updateData() {
      studentupdate(this.student).then(res => {
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
          this.student = Object.assign({}, row);
          studentdel(this.student).then(res => {
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