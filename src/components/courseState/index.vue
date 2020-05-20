<template>
  <div class="a">
    <el-select v-model="value" clearable placeholder="请选择" @change="change">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "开课",
          label: "开课"
        },
        {
          value: "未开课",
          label: "未开课"
        }
      ],
      value: ""
    };
  },
  methods: {
    change() {
      this.$emit("update:value", this.value);
    }
  }
};
</script>

<style scoped>
.a {
  display: inline;
}
</style>