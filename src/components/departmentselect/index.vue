<template>
  <div class="a">
    <template>
      <el-select
        v-model="value"
        filterable
        placeholder="请选择系部"
        @change="change"
        style="width: 150px;"
        clearable
      >
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
import { departmentlist } from "@/api/data";
export default {
  data() {
    return {
      options: [],
      value: "",
      departs: []
    };
  },
  created() {
    this.options = [];
    departmentlist().then(res => {
      this.departs = res.data;
      //封装成option格式
      this.departs.forEach(e => {
        this.options.push({ value: e.department_id, label: e.department_name });
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