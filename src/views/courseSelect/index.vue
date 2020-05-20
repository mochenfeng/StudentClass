<template>
  <div class="app-container">
    <div class="filter-container">
      <departmentselect :value.sync="pageparam.department_id"></departmentselect>
      <majorselect :value.sync="pageparam.major_id"></majorselect>
      <teacherselect :value.sync="pageparam.teacher_id"></teacherselect>
      <courseselect :value.sync="pageparam.course_id"></courseselect>
      <el-input
        v-model="pageparam.start_yearSemester"
        placeholder="请输入学年学期"
        style="width: 200px;"
        class="filter-item"
      />
      <el-input
        v-model="pageparam.student_id"
        placeholder="请输入学生ID"
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
    <el-table :data="courseSelects" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="id" prop="courseselect_id" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.courseselect_id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="学年学期"
        prop="start_yearSemester"
        sortable="custom"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.start_yearSemester }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学生姓名" prop="student_name" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.student_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程名称" prop="course_name" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.course_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="授课教师" prop="teacher_name" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.teacher_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="成绩" prop="courseselect_score" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.courseselect_score }}</span>
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
      <el-form ref="form" :model="courseSelect" label-width="120px">
        <el-form-item label="学生ID">
          <el-input v-model="courseSelect.student_id"/>
        </el-form-item>
        <el-form-item label="开课ID">
          <courseStartselect :value.sync="courseSelect.start_id" :key="dialogFormVisible"></courseStartselect>
        </el-form-item>
        <!-- <el-form-item label="学年学期">
          <el-input v-model="courseSelect.start_yearSemester"/>
        </el-form-item> -->
        <el-form-item label="成绩">
          <el-input v-model="courseSelect.courseselect_score"/>
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
  courseSelectpagelist,
  courseSelectadd,
  courseSelectupdate,
  courseSelectdel
} from "@/api/data.js";
export default {
  data() {
    return {
      courseSelects: [],
      pageparam: {
        start_yearSemester: "",
        course_id: "",
        teacher_id: "",
        department_id: "",
        major_id: "",
        student_id: "",
        page: 1,
        size: 10
      },
      courseSelect: {
        courseselect_id: "",
        student_id: "",
        start_id: "",
        start_yearSemester: "",
        courseselect_score: "",
        // course_id: "",
        
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
    courseSelectpagelist(this.pageparam).then(res => {
      this.courseSelects = res.data.content;
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
      if (this.pageparam.teacher_id === null) {
        this.pageparam.teacher_id = "";
      }
      if (this.pageparam.course_id === null) {
        this.pageparam.course_id = "";
      }
      courseSelectpagelist(this.pageparam).then(res => {
        this.courseSelects = res.data.content;
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
      this.clearCourseSelect();
    },
    clearCourseSelect() {
      this.courseSelect.courseselect_id = "";
      this.courseSelect.student_id = "";
      this.courseSelect.start_id = "";
      this.courseSelect.start_yearSemester = "";
      this.courseSelect.courseselect_score = "";
    },
    createData() {
      // var temp = {"name":"","number":""};
      var temp = {
        student_id: this.courseSelect.student_id,
        start_id: this.courseSelect.start_id,
        start_yearSemester: this.courseSelect.start_yearSemester,
        courseselect_score: this.courseSelect.courseselect_score
      };
      courseSelectadd(temp).then(res => {
        this.$message({ message: res.msg, type: "success" });
        this.dialogFormVisible = false;
        this.handleFilter();
      });
    },
    handleUpdate(row) {
      this.dialogFormVisible = true;
      this.dialogStatus = "update";
      //是否共用同一个存储空间
      this.courseSelect = Object.assign({}, row);
      // this.depart = row;
    },
    updateData() {
      courseSelectupdate(this.courseSelect).then(res => {
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
          this.courseSelect = Object.assign({}, row);
          courseSelectdel(this.courseSelect).then(res => {
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