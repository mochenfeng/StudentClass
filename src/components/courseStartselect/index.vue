<template>
  <div class="a">
    <template>
      <el-select v-model="value"  filterable placeholder="请选择开课的课程" @change="change" clearable style="width: 150px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </template>
  </div>
</template>

<script>
import { courseStartlist } from "@/api/data";
export default {
  data() {
    return {
      options: [],
      value: "",
      courseStarts: []
    };
  },
  created() {
    this.options = [];
    courseStartlist().then(res => {
      this.courseStarts = res.data;
      //封装成option格式
      this.courseStarts.forEach(e => {
        this.options.push({ value: e.start_id, label: e.course_id });
      });
    });
    console.log(this.options);
  },
  methods: {
    change() {
      //向父组件触发update时绑定value
      this.$emit("update:value", this.value); //(事件名称，数据负载)
    }
  }
};
</script>

<style scoped>
.a {
  display: inline;
}
</style>