<template>
  <div class="app-container">
    <div class="filter-container">
      <departmentselect :value.sync="pageparam.departmentId"></departmentselect>
      <majorselect :value.sync="pageparam.majorId"></majorselect>
      <teacherselect :value.sync="pageparam.teacherId"></teacherselect>
      <courseselect :value.sync="pageparam.courseId"></courseselect>
      <el-input
        v-model="pageparam.yearSemester"
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
      <el-table-column label="id" prop="id" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="学年学期"
        prop="yearSemester"
        sortable="custom"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.yearSemester }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程名称" prop="courseName" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.courseName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="授课教师" prop="teacherName" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.teacherName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="所在系部"
        prop="departmentName"
        sortable="custom"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.departmentName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所在专业" prop="majorName" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.majorName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="人数上限" prop="upperLimit" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.upperLimit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="人数下限" prop="lowerLimit" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.lowerLimit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程状态" prop="courseState" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.courseState }}</span>
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
          <courseselect :value.sync="courseStart.courseId" :key="dialogFormVisible"></courseselect>
        </el-form-item>
        <el-form-item label="教师Id">
          <teacherselect :value.sync="courseStart.teacherId" :key="dialogFormVisible"></teacherselect>
        </el-form-item>
        <el-form-item label="学年学期">
          <el-input v-model="courseStart.yearSemester"/>
        </el-form-item>
        <el-form-item label="人数上限">
          <el-input v-model="courseStart.upperLimit"/>
        </el-form-item>
        <el-form-item label="人数下限">
          <el-input v-model="courseStart.lowerLimit"/>
        </el-form-item>
        <el-form-item label="课程状态">
          <courseState :value.sync="courseStart.courseState" :key="dialogFormVisible"></courseState>
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
        yearSemester: "",
        courseId: "",
        teacherId: "",
        departmentId: "",
        majorId: "",
        page: 1,
        size: 10
      },
      courseStart: {
        id: "",
        courseId: "",
        teacherId: "",
        yearSemester: "",
        upperLimit: "",
        lowerLimit: "",
        courseState: ""
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
      this.courseStarts = res.data.content;
      this.totalElements = res.data.totalElements;
    });
  },
  methods: {
    handleFilter() {
      if (this.pageparam.departmentId === null) {
        this.pageparam.departmentId = "";
      }
      if (this.pageparam.majorId === null) {
        this.pageparam.majorId = "";
      }
      if (this.pageparam.teacherId === null) {
        this.pageparam.teacherId = "";
      }
      if (this.pageparam.courseId === null) {
        this.pageparam.courseId = "";
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
      this.courseStart.id = "";
      this.courseStart.courseId = "";
      this.courseStart.teacherId = "";
      this.courseStart.yearSemester = "";
      this.courseStart.upperLimit = "";
      this.courseStart.lowerLimit = "";
      this.courseStart.courseState = "";
    },
    createData() {
      // var temp = {"name":"","number":""};
      var temp = {
        id: this.courseStart.id,
        courseId: this.courseStart.courseId,
        teacherId: this.courseStart.teacherId,
        yearSemester: this.courseStart.yearSemester,
        upperLimit: this.courseStart.upperLimit,
        lowerLimit: this.courseStart.lowerLimit,
        courseState: this.courseStart.courseState
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