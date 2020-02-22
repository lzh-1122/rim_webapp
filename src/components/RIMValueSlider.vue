<template>
    <div class="block">
        <span>{{sliderName}}</span>
        <el-slider
                v-model="value1"
                :step= "sliderStep"
                :min="sliderMin"
                :max="sliderMax"
                show-input
        >
        </el-slider>
    </div>
</template>

<script>
    export default {
        name: "RIMValueSlider",
        props: {sliderMin: Number, sliderMax: Number, sliderStep: Number, sliderName: String},
        data() {
            return {
                value1: 0
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