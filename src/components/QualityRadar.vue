<template>
    <div id="myChart" :style="{width: '1600px', height: '800px'}"></div>
</template>

<script>
    export default {
        name: 'Quality Radar',
        props: {profitability: Number, operatingEfficiency: Number, surplusQuality: Number,
            InvestmentIndex: Number, intangibleAssetsIndex: Number},
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        mounted(){
            this.drawLine();
        },
        methods: {
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: '基础雷达图'
                    },
                    tooltip: {
                    },
                    legend: {
                        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
                    },
                    radar: {
                        // shape: 'circle',
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        indicator: [
                            { name: 'mm', max: 100},
                            { name: '管理（Administration）', max: 16000},
                            { name: '信息技术（Information Technology）', max: 30000},
                            { name: '客服（Customer Support）', max: 38000},
                            { name: '研发（Development）', max: 52000},
                        ]
                    },
                    series: [{
                        name: '预算 vs 开销（Budget vs spending）',
                        type: 'radar',
                        // areaStyle: {normal: {}},
                        data: [
                            {
                                value: [50, 10000, 28000, 35000, 50000],
                                name: '预算分配（Allocated Budget）'
                            },
                            {
                                value: [this.profitability, 14000, 28000, 31000, 42000],
                                name: '实际开销（Actual Spending）'
                            }
                        ]
                    }]
                });
            }
        }
    }
</script>

<style scoped>

</style>