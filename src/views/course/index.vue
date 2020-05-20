<template>
  <div class="app-container">
    <div class="filter-container">
      <departmentselect :value.sync="pageparam.department_id" />
      <majorselect :value.sync="pageparam.major_id" />
      <el-input
        v-model="pageparam.course_name"
        placeholder="请输入课程名称"
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
    <el-table :data="courses" border fit highlight-current-row style="width: 100%;">
      <!-- <el-table-column label="id" prop="id" sortable="custom" align="center" width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="课程编号" prop="course_number" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.course_number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程名称" prop="course_name" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.course_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程描述" prop="name" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.course_description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学时" prop="name" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.course_hour }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学分" prop="name" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.course_credit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="系部名称" prop="department_name" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.department_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="专业名称" prop="major_name" sortable="custom" align="center" width="150">
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
      background
      :current-page.sync="pageparam.page"
      :page-size.sync="pageparam.size"
      layout="total, prev, pager, next, jumper"
      :total="totalElements"
      @current-change="handleFilter"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="course" label-width="120px">
        <el-form-item label="课程编号">
          <el-input v-model="course.course_number" />
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="course.course_name" />
        </el-form-item>
        <el-form-item label="课程描述">
          <el-input v-model="course.course_description" />
        </el-form-item>
        <el-form-item label="学时">
          <el-input v-model="course.course_hour" />
        </el-form-item>
        <el-form-item label="学分">
          <el-input v-model="course.course_credit" />
        </el-form-item>
        <el-form-item label="系部名称">
          <departmentselect :key="dialogFormVisible" :value.sync="course.department_id" />
        </el-form-item>
        <el-form-item label="专业名称">
          <majorselect :key="dialogFormVisible" :value.sync="course.major_id" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          icon="iconfont icon-tongji3"
          @click="dialogStatus==='create'?createData():updateData()"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { coursepagelist, courseadd, courseupdate, coursedel } from '@/api/data.js'
export default {
  data() {
    return {
      courses: [],
      pageparam: {
        department_id: '',
        major_id: '',
        course_name: '',
        course_description: '',
        course_hour: '',
        course_credit: '',
        page: 1,
        size: 10
      },
      course: {
        course_id: '',
        course_number: '',
        course_name: '',
        course_description: '',
        course_hour: '',
        course_credit: '',
        department_id: '',
        department_name: '',
        major_id: '',
        major_name: ''
      },
      departmentselectvalue: '',
      majorselectvalue: '',
      totalElements: 0,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '新增'
      },
      initvalue: '0'
    }
  },
  created() {
    coursepagelist(this.pageparam).then(res => {
      this.courses = res.data.content
      this.totalElements = res.data.totalElements
    })
  },
  methods: {
    handleFilter() {
      coursepagelist(this.pageparam).then(res => {
        this.courses = res.data.content
        this.totalElements = res.data.totalElements
      })
    },
    handleCreate() {
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
      this.clearCourse()
    },
    clearCourse() {
      this.course.course_name = ''
      this.course.course_number = ''
      this.course.course_description = ''
      this.course.course_hour = ''
      this.course.course_credit = ''
      this.course.department_id = ''
      this.course.department_name = ''
      this.course.major_id = ''
      this.course.major_name = ''
    },
    createData() {
      courseadd(this.course).then(res => {
        this.$message.success(res.msg)
        this.dialogFormVisible = false
        this.handleFilter()
      })
    },
    handleUpdate(row) {
      this.dialogFormVisible = true
      this.dialogStatus = 'update'
      // 是否共用同一个存储空间，非共用
      this.course = Object.assign({}, row) // copy obj
      // 是否共用同一个存储空间，共用
      //  this.depart = row;
    },
    updateData() {
      courseupdate(this.course).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.dialogFormVisible = false
        this.handleFilter()
      })
    },
    handleDelete(row) {
      this.course = Object.assign({}, row) // copy obj
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          coursedel(this.course).then(res => {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.handleFilter()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style  scoped>
</style>
