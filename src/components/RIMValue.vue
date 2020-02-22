<template>
    <el-card class="box-card" style="margin: auto; width: 90%">
        <div slot="header" class="clearfix">
            <span>上市公司: &nbsp; {{code}}</span>
        </div>

<!--        content-->
        <el-row>
<!--        left-->
            <el-col :span="12">
                <div class="grid-content bg-purple">

<!--                    运算数据和结果-->
                    <RIMValueResult :welcome= getRimValue()></RIMValueResult>

                    <el-row style="margin-top: 30px">
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
                    <div class="block">
                        <span class="demonstration">r</span>
                        <el-slider
                                v-model="value1"
                                :step= "step1"
                                show-stops
                                show-input
                                :min="min1"
                                :max="max1"
                                >
                        </el-slider>
                    </div>
                    <div class="block">
                        <span class="demonstration">g</span>
                        <el-slider
                                v-model="value2"
                                :step="step2"
                                show-stops
                                show-input
                                :min="min2"
                                :max="max2"
                                >
                        </el-slider>
                    </div>
                </div>
            </el-col>
        </el-row>
<!--        {{rData}}-->
    </el-card>
</template>

<script>
    import axios from 'axios';
    import RIMValueResult from "./RIMValueResult";
    export default {
        name: 'rimvalue',
        components: {
          'RIMValueResult' : RIMValueResult
        },
        data() {
            return {
                forcast: [],
                dataEarnings: [],
                code: this.$route.params.code,
                RVList:[],
                rrList:[],
                grList:[],
                rData:null,
                value1: 0,value2: 0,step1:0,step2:0,min1:0,min2:0,max1:0,max2:0,
                value3: 0
            };
        },
        methods: {
            getRange(){
                debugger;
                this.rrList = this.rData.rr;
                this.grList = this.rData.gr;

                console.log(this.rrList.length);
                let l1 = this.rrList.length - 1;
                this.max1 = this.rrList[l1]; this.min1 = this.rrList[0];
                this.step1 = (this.max1 -this.min1) / l1;

                let l2 = this.grList.length - 1;
                this.max2 = this.grList[l2];
                this.min2 = this.grList[0];
                this.step2 = (this.max2 -this.min2) / l2;
            },
            //
            getRimValue(){
                if (this.rData != null) {
                    this.RVList = this.rData.re;
                    let l = this.RVList.length;
                    for (let i = 0; i < l; i++) {
                        if (this.value1 === this.RVList[i].rr && this.value2 === this.RVList[i].gr) {
                            return this.RVList[i].value;
                        }
                    }
                }
                else
                    return 3.14
            }
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

            axios
                .get('http://127.0.0.1:8001/rim-value/',{
                    params: {
                        code: this.$route.params.code
                    }
                })
                .then(response => this.rData = response.data);
        },
        watch: {
            rData() {
                this.getRange();
                this.value3 = this.getRimValue();
            }
        }
    }
</script>

<style scoped>
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

    .formula {
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
</style>