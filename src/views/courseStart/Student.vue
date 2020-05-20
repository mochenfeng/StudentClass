<template>
  <div class="app-container">
    <div class="filter-container">
      <majorselect :value.sync="pageparam.majorId"></majorselect>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
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
    </el-table>

    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="pageparam.page"
      :page-size.sync="pageparam.size"
      layout="total, prev, pager, next, jumper"
      :total="totalElements"
    ></el-pagination>
  </div>
</template>

<script>
import {
  courseStartpagelistForStudent,
} from "@/api/data.js";
export default {
  data() {
    return {
      courseStarts: [],
      pageparam: {
        courseId: "",
        page: 1,
        size: 10
      },
      totalElements: 0,
    };
  },
  created() {
    courseStartpagelistForStudent(this.pageparam).then(res => {
      this.courseStarts = res.data.content;
      this.totalElements = res.data.totalElements;
    });
  },
  methods: {
    handleFilter() {
      if (this.pageparam.majorId === null) {
        this.pageparam.majorId = "";
      }
      courseStartpagelistForStudent(this.pageparam).then(res => {
        this.courseStarts = res.data.content;
        this.totalElements = res.data.totalElements;
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