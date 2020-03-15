<template>
    <div class="rim_table">
        <el-table
                :data="tblData"
                style="width: 95%"
                :show-header=false
                :cell-style="Center"
        >
            <el-table-column
                    prop="des"
                    label="标题"
                    width="95">
            </el-table-column>
            <el-table-column
                    prop="value"
                    label="数据"
                    width="95">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
  export default {
    name: "RIMValueTable",
    props: {tblData: Array, tblTitle: String},
    methods: {
      Center({row, column, rowIndex, columnIndex}) {
        return 'text-align:center'
      }
    }
  }
</script>

<style>
    .el-table {
        text-align: center;
    }
    .rim_table {
        font-size: small;
        padding-left: 10px;
    }
</style>
