<template>
    <div class="block">
        <el-row :gutter="10">
            <el-col :span="6"><div class="grid-content bg-purple"><span>{{sliderName}}</span></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"><span>{{value1}}</span></div></el-col>
        </el-row>
        <el-slider
                v-model="value1"
                :step= "sliderStep"
                :min="sliderMin"
                :max="sliderMax"
        >
        </el-slider>
    </div>
</template>

<script>
    export default {
        name: "RIMValueSlider",
        props: {sliderMin: Number, sliderMax: Number, sliderStep: Number, sliderName: String, sliderValue: Number},
        data() {
            return {
                value1: this.sliderValue
            };
        },
        methods: {
            sendValue(){
                //func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
                this.$emit('func',this.value1)
            }
        },
        watch: {
            value1(val) {
                this.sendValue()
            }
        }
    }
</script>

<style scoped>

</style>
