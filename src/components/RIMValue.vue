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
                    <RIMValueResult :result= getRimValue()></RIMValueResult>

                    <el-row style="margin-top: 30px">
                        <el-col :span="12">
                            <RIMValueTable :tbl-data="get2018Indicator()" tbl-title="财报数据"></RIMValueTable>
                        </el-col>
                        <el-col :span="12">
                            <RIMValueTable :tbl-data="getForecast()" tbl-title="分析师预测均值"></RIMValueTable>
                        </el-col>
                    </el-row>
                </div>
            </el-col>

<!--            right            -->
            <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <RIMValueSlider :slider-min="min1" :slider-max="max1" :slider-step="step1" slider-name="r" @func="getValue1FormSon"></RIMValueSlider>
                    <RIMValueSlider :slider-min="min2" :slider-max="max2" :slider-step="step2" slider-name="g" @func="getValue2FormSon"></RIMValueSlider>
                </div>
            </el-col>
        </el-row>
        <el-divider></el-divider>
        <RIMValueRader :rader-mm=raderData1.mm :rader-mg=raderData1.mg :rader-mgrank=raderData1.mg_rank :rader-ms=raderData1.ms :rader-msrank=raderData1.ms_rank></RIMValueRader>
    </el-card>
</template>

<script>
    import axios from 'axios';
    import RIMValueResult from "./RIMValueResult";
    import RIMValueTable from "./RIMValueTable";
    import RIMValueSlider from "./RIMValueSlider";
    import RIMValueRadar from "./RIMValueRadar";
    export default {
        name: 'rimvalue',
        components: {
          'RIMValueResult' : RIMValueResult,
          'RIMValueTable' : RIMValueTable,
          'RIMValueSlider' : RIMValueSlider,
          'RIMValueRader' : RIMValueRadar
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
                raderData1: null
            };
        },
        methods: {
            get2018Indicator() {
                return [{des: '每股净资产BPS', value: this.dataEarnings['bps']},
                    {des: '每股净收益EPS', value: this.dataEarnings['eps']}]
            },
            getForecast() {
                return [{des: '2019年EPS', value: this.forcast['eps_2019']},
                    {des: '2020年EPS', value: this.forcast['eps_2020']},
                    {des: '2021年EPS', value: this.forcast['eps_2021']}]
            },
            getRange(){
                this.rrList = this.rData['rr'];
                this.grList = this.rData['gr'];

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
                        if (this.value1 === this.RVList[i]['rr'] && this.value2 === this.RVList[i]['gr']) {
                            return this.RVList[i].value;
                        }
                    }
                }
                else
                    return 3.14
            },

            getValue1FormSon(data){
                this.value1 = data;
            },

            getValue2FormSon(data){
                this.value2 = data;
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

            axios
                .get('http://127.0.0.1:8001/profitability/mg-ms', {
                    params: {
                        code: this.$route.params.code
                    }
                })
            .then(response => this.raderData1 = response.data)
        },
        watch: {
            rData() {
                this.getRange();
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
</style>