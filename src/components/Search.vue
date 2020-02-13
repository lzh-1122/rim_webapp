<template>
    <div>
        <h1>查询A股上市公司</h1>
        <p>{{msg}}</p>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                msg: "请输入上市公司代码"
            }
        },
        name: "Search"
    }
</script>

<style scoped>

</style>