<template>
    <div class="block">
        <el-row>
            <el-col :span="12">
                <div class="titlebar">{{name}}</div>
            </el-col>
            <el-col :span="12">
                <div class="valuebar">{{value}}</div>
            </el-col>
        </el-row>
        <el-slider
                v-model="value"
                :step="step"
                :min="min"
                :max="max">
        </el-slider>
    </div>
</template>

<script>
  export default {
    name: "RIMValueSlider",
    props: {ConfigInfo: Object},
    data() {
      return {
        name: this.ConfigInfo.name,
        value: this.ConfigInfo.defaultValue,
        min: this.ConfigInfo.min,
        max: this.ConfigInfo.max,
        step: this.ConfigInfo.step
      };
    },
    methods: {
      sendValue() {
        //func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
        this.$emit('func', this.value)
      }
    },
    watch: {
      value(val) {
        this.sendValue()
      }
    }
  }
</script>

<style>
    .titlebar {
        height: 6px;
    }

    .valuebar {
        height: 6px;
    }
</style>
