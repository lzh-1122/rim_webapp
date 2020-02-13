<template>
    <div>
        <h1>User</h1>
        <div>我是user组件, 动态部分是{{dynamicSegment}}</div>
    </div>
</template>

<script>
    // Please refer https://blog.csdn.net/qq_31967569/article/details/91546294
    export default {
        name: 'User',
        computed: {
            dynamicSegment () {
                return this.$route.params.id    /* 当整个vue-router 注入到根实例后，在组件的内部，
                                                可以通过this.$route 来获取到 router 实例。它有一个params 属性，
                                                就是来获得这个动态部分的。它是一个对象，属性名，
                                                就是路径中定义的动态部分 id, 属性值就是router-link中to 属性中的动态部分 */
            }
        }
    }
</script>

<style scoped>

</style>