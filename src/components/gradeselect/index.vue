<template>
  <div class="a">
    <template>
      <el-select v-model="value" filterable placeholder="请选择班级" @change="change" clearable style="width: 150px;">
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
import { gradelist } from "@/api/data";
export default {
  data() {
    return {
      options: [],
      value: "",
      grades: []
    };
  },
  created() {
    this.options = [];
    gradelist().then(res => {
      this.grades = res.data;
      //封装成option格式
      this.grades.forEach(e => {
        this.options.push({ value: e.grade_id, label: e.grade_name });
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