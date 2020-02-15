<template>
    <el-card class="box-card" style="margin: auto; width: 90%">
        <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>

<!--        content-->
        <el-row>
<!--        left-->
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-row>
<!--                        财报数据-->
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-card class="box-card" style="width: 90%">
                                    <div slot="header" class="clearfix">
                                        <span>财报数据</span>
                                    </div>
                                    <ul>
                                        <li v-if="dataEarnings.bps === ''">bps无数据</li>
                                        <li v-else>bps{{dataEarnings.bps}}</li>

                                        <li v-if="dataEarnings.eps === ''">eps无数据</li>
                                        <li v-else>eps{{dataEarnings.eps}}</li>

                                    </ul>

                                </el-card>
                            </div>
                        </el-col>

<!--                        分析师预测-->
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                                <el-card class="box-card" style="width: 90%">
                                    <div slot="header" class="clearfix">
                                        <span>分析师预测</span>
                                    </div>
                                    <el-row>
                                        <el-col :span="12" style="padding-top: 10%">
                                            <div class="grid-content bg-purple">forcast</div>
                                        </el-col>
                                        <el-col :span="12">
                                            <div class="grid-content bg-purple-light">
                                                <ul>
                                                    <li v-if="forcast.eps_2019 === ''">无预测数据(2019)</li>
                                                    <li v-else>{{forcast.eps_2019}} (2019)</li>

                                                    <li v-if="forcast.eps_2020 === ''">无预测数据(2019)</li>
                                                    <li v-else>{{forcast.eps_2020}} (2020)</li>

                                                    <li v-if="forcast.eps_2021 === ''">无预测数据(2020)</li>
                                                    <li v-else>{{forcast.eps_2021}} (2021)</li>

                                                </ul>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-card>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>

<!--            right            -->
            <el-col :span="12">
                <div class="grid-content bg-purple-light">

                </div>
            </el-col>
        </el-row>

    </el-card>

</template>

<script>
    import axios from 'axios';
    export default {
        name: 'rimvalue',
        data() {
            return {
                forcast: [],
                dataEarnings: [],
                code:'',
            };
        },
        computed: {
          getCode(){
              return this.$route.params.code
          }
        },
        methods: {

        },
        mounted() {
            axios
                .get('http://127.0.0.1:8001/profit-forecast/',{
                    params: {
                        code: this.$route.params.code
                    }
                })
                .then(response => this.forcast = response.data[ this.$route.params.code +' profit forecast']);

            axios
                .get('http://127.0.0.1:8001/financial-indicator/',{
                    params: {
                        code: this.$route.params.code
                    }
                })
                .then(response => this.dataEarnings = response.data[ this.$route.params.code +' 2018 financial indicator']);
        }
    }
</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
    }
</style>