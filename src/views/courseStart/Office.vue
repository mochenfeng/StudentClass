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
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >增加</el-button>
    </div>
    <el-table :data="courseStarts" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="id" prop="start_id" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.start_id }}</span>
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
      <el-table-column label="人数上限" prop="start_upperLimit" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.start_upperLimit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="人数下限" prop="start_lowerLimit" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.start_lowerLimit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程状态" prop="start_courseState" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.start_courseState }}</span>
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
      <el-form ref="form" :model="courseStart" label-width="120px">
        <el-form-item label="课程Id">
          <courseselect :value.sync="courseStart.course_id" :key="dialogFormVisible"></courseselect>
        </el-form-item>
        <el-form-item label="教师Id">
          <teacherselect :value.sync="courseStart.teacher_id" :key="dialogFormVisible"></teacherselect>
        </el-form-item>
        <el-form-item label="学年学期">
          <el-input v-model="courseStart.start_yearSemester"/>
        </el-form-item>
        <el-form-item label="人数上限">
          <el-input v-model="courseStart.start_upperLimit"/>
        </el-form-item>
        <el-form-item label="人数下限">
          <el-input v-model="courseStart.start_lowerLimit"/>
        </el-form-item>
        <el-form-item label="课程状态">
          <courseState :value.sync="courseStart.start_courseState" :key="dialogFormVisible"></courseState>
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
  courseStartpagelist,
  courseStartadd,
  courseStartupdate,
  courseStartdel
} from "@/api/data.js";
export default {
  data() {
    return {
      courseStarts: [],
      pageparam: {
        start_yearSemester: "",
        course_id: "",
        teacher_id: "",
        department_id: "",
        major_id: "",
        page: 1,
        size: 10
      },
      courseStart: {
        start_id: "",
        course_id: "",
        teacher_id: "",
        start_yearSemester: "",
        start_upperLimit: "",
        start_lowerLimit: "",
        start_courseState: ""
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
    courseStartpagelist(this.pageparam).then(res => {
      console.log(res.data.msg)
      this.courseStarts = res.data.content;
      this.totalElements = res.data.totalElements;
    });
    console.log(courseStarts);
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
      courseStartpagelist(this.pageparam).then(res => {
        this.courseStarts = res.data.content;
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
      this.clearCourseStart();
    },
    clearCourseStart() {
      this.courseStart.start_id = "";
      this.courseStart.course_id = "";
      this.courseStart.teacher_id = "";
      this.courseStart.start_yearSemester = "";
      this.courseStart.start_upperLimit = "";
      this.courseStart.start_lowerLimit = "";
      this.courseStart.start_courseState = "";
    },
    createData() {
      // var temp = {"name":"","number":""};
      var temp = {
        start_id: this.courseStart.start_id,
        course_id: this.courseStart.course_id,
        teacher_id: this.courseStart.teacher_id,
        start_yearSemester: this.courseStart.start_yearSemester,
        start_upperLimit: this.courseStart.start_upperLimit,
        start_lowerLimit: this.courseStart.start_lowerLimit,
        start_courseState: this.courseStart.start_courseState
      };
      courseStartadd(temp).then(res => {
        this.$message({ message: res.msg, type: "success" });
        this.dialogFormVisible = false;
        this.handleFilter();
      });
    },
    handleUpdate(row) {
      this.dialogFormVisible = true;
      this.dialogStatus = "update";
      //是否共用同一个存储空间
      this.courseStart = Object.assign({}, row);
      // this.depart = row;
    },
    updateData() {
      courseStartupdate(this.courseStart).then(res => {
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
          this.courseStart = Object.assign({}, row);
          courseStartdel(this.courseStart).then(res => {
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