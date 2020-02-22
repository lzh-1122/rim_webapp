<template>
    <div>
        <span>{{tblTitle}}</span>
        <div style="width: 90%"><el-divider></el-divider></div>
        <el-table
                :data="tblData"
                style="width: 95%"
                :show-header=false
                :cell-style="Center">
            <el-table-column
                    prop="des"
                    label="标题"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="value"
                    label="数据"
                    width="200">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "RIMValueTable",
        props: {tblData: Array, tblTitle: String},
        methods:{
            Center({row, column, rowIndex, columnIndex}) {
                return 'text-align:center'
            }
        }
    }
</script>

<style scoped>

</style>