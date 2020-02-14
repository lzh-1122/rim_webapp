<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>分析师预测{{getCode}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <!-- <div v-for="o in 4" :key="o" class="text item">
         {{'列表内容 ' + o }}
       </div> -->

        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">forcast</div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <ul>
                        <li>{{forcast.eps_2018}} (2018)</li>
                        <li>{{forcast.eps_2019}} (2019)</li>
                        <li>{{forcast.eps_2020}} (2020)</li>

                    </ul>
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
                // .then(response => (this.securities = [{"value": response.data["hello world"][1][1]}, {"value": "3"}])); //[{"values": "1"}, {"values": "2"}])); //response.data["hello world"][1][1]));
                .then(response => this.forcast = response.data[ this.$route.params.code +' profit forecast']);
            // this.securities = this.loadAll();
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
        width: 480px;
    }
</style>