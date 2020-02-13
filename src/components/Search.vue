<template>
    <div>
        <div class="sub-title">输入后匹配输入建议</div>
        <el-autocomplete class="inline-input" v-model="state1" :fetch-suggestions="querySearch" placeholder="请输入内容"
                         :trigger-on-focus="false" @select="handleSelect"><el-button slot="append" icon="el-icon-search" @click = "getInputValue"></el-button></el-autocomplete>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'App',
        data() {
            return {
                securities: [],
                info:[],
                state1: '',
            }
        },
        components: {},

        methods: {
            querySearch(queryString, cb) {
                let securities = this.securities;
                let results = queryString ? securities.filter(this.createFilter(queryString)) : securities;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (securities) => {
                    return (securities.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
                };
            },
            handle_securities_4_combobox(response) {
                // this.securities = [{"value": response.data["hello world"][0][1] + "(" + response.data["hello world"][0][0] + ")"}];
                for (let i in response.data["hello world"]) {
                    this.securities.unshift({"value": response.data["hello world"][i][1] + "(" + response.data["hello world"][i][0] + "," + response.data["hello world"][i][2]+")"})
                }
                this.info = response.data["hello world"]
            },
            handleSelect(item) {
                console.log(item);
            },
            getInputValue(){
                let code = this.state1.replace(/[^0-9]/ig,"");
                alert(code)
            }
            // jump() {
            //     let code = this.state1.replace(/[^0-9]/ig,"");
            //     window.location = "forcast.html?code="+code;
            // }
        },
        mounted() {
            axios
                .get('http://127.0.0.1:8001/securities')
                // .then(response => (this.securities = [{"value": response.data["hello world"][1][1]}, {"value": "3"}])); //[{"values": "1"}, {"values": "2"}])); //response.data["hello world"][1][1]));
                .then(this.handle_securities_4_combobox);
            // this.securities = this.loadAll();
        }
    }
</script>

<style scoped>

</style>