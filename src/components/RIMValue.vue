<template>
  <el-card class="box-card" style="margin: auto; width: 90%">
    <div slot="header" class="clearfix">
      <span>上市公司: &nbsp; {{ code }}</span>
    </div>

    <!--        content-->
    <el-row>
      <!--        left-->
      <el-col :span="12">
        <RIMValueResult :result="getRimValue()"></RIMValueResult>
        <div class="grid-content bg-purple">
          <!--&lt;!&ndash;                    运算数据和结果&ndash;&gt;-->

          <el-row style="margin-top: 30px">
            <el-col :span="12">
              <RIMValueTable
                :tbl-data="get2018Indicator()"
                tbl-title="财报数据"
              ></RIMValueTable>
            </el-col>
            <el-col :span="12">
              <RIMValueTable
                :tbl-data="getForecast()"
                tbl-title="分析师预测均值"
              ></RIMValueTable>
            </el-col>
          </el-row>
        </div>
      </el-col>

      <!--            right            -->
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <RIMValueSlider
            :slider-min="min1"
            :slider-max="max1"
            :slider-step="step1"
            :slider-value="value1"
            slider-name="t1"
            @func="getValue1FormSon"
          ></RIMValueSlider>
          <RIMValueSlider
            :slider-min="min2"
            :slider-max="max2"
            :slider-step="step2"
            :slider-value.sync="value2"
            slider-name="t2"
            @func="getValue2FormSon"
          ></RIMValueSlider>
          <RIMValueSlider
            :slider-min="min3"
            :slider-max="max3"
            :slider-step="step3"
            :slider-value="value3"
            slider-name="r"
            @func="getValue3FormSon"
          ></RIMValueSlider>
          <RIMValueSlider
            :slider-min="min4"
            :slider-max="max4"
            :slider-step="step4"
            :slider-value="value4"
            slider-name="g1"
            @func="getValue4FormSon"
          ></RIMValueSlider>
          <RIMValueSlider
            :slider-min="min5"
            :slider-max="max5"
            :slider-step="step5"
            :slider-value="value5"
            slider-name="g2"
            @func="getValue5FormSon"
          ></RIMValueSlider>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <!--        <RIMValueRader :rader-mm=raderData1.mm :rader-mg=raderData1.mg :rader-mgrank=raderData1.mg_rank :rader-ms=raderData1.ms :rader-msrank=raderData1.ms_rank></RIMValueRader>-->
  </el-card>
</template>

<script>
import axios from "axios";
import RIMValueResult from "./RIMValueResult";
import RIMValueTable from "./RIMValueTable";
import RIMValueSlider from "./RIMValueSlider";
import RIMValueRadar from "./QualityRadar";

export default {
  name: "rimvalue",
  components: {
    RIMValueResult: RIMValueResult,
    RIMValueTable: RIMValueTable,
    RIMValueSlider: RIMValueSlider
    // 'RIMValueRader' : RIMValueRadar
  },
  data() {
    return {
      rData: null,
      // forcast: [],
      code: this.$route.params.code,
      // RVList:[],
      // rrList:[],
      // grList:[],
      // rData:null,
      value1: 5,
      value2: 7,
      value3: 0,
      value4: 0,
      value5: 0,
      step1: 0,
      step2: 0,
      step3: 0,
      step4: 0,
      step5: 0,
      min1: 0,
      min2: 0,
      min3: 0,
      min4: 0,
      min5: 0,
      max1: 0,
      max2: 0,
      max3: 0,
      max4: 0,
      max5: 0
      // raderData1: null
    };
  },
  methods: {
    get2018Indicator() {
      return [
        { des: "每股净资产BPS" + this.rData.bps[0], value: this.rData.bps[1] }
      ];
    },
    getForecast() {
      return [
        {
          des: this.rData.analysis_eps[0][0] + "年EPS",
          value: this.rData.analysis_eps[0][1]
        },
        {
          des: this.rData.analysis_eps[1][0] + "年EPS",
          value: this.rData.analysis_eps[1][1]
        },
        {
          des: this.rData.analysis_eps[2][0] + "年EPS",
          value: this.rData.analysis_eps[2][1]
        }
      ];
    },
    getRange() {
      this.min1 = this.rData.t1_range[0];
      this.max1 = this.rData.t1_range[1];
      this.step1 = 1;

      this.min2 = this.rData.t1_t2 - this.rData.t1_range[1];
      this.max2 = this.rData.t1_t2 - this.rData.t1_range[0];
      this.step2 = 1;

      this.min3 = this.rData.capital_return_rate_range[0];
      this.max3 = this.rData.capital_return_rate_range[1];
      this.step3 = 0.01;
      this.value3 = this.rData.capital_return_rate_default;

      this.min4 = this.rData.g1_range[0];
      this.max4 = this.rData.g1_range[1];
      this.step4 = 0.1;
      this.value4 = this.rData.g1_default;

      this.min5 = this.rData.g2_range[0];
      this.max5 = this.rData.g2_range[1];
      this.step5 = 0.01;
      this.value5 = this.rData.g2_default;
    },

    getRimValue() {
      // if (this.rData != null) {
      //   let value = this.rData.bps[1] + this.sum();
      //   return value;
      // } else {
      //   return 3.14;
      // }
      return this.rData.bps[1] + this.sum1();
    },

    sum1() {
      return this.rData.analysis_eps[0][1] - this.value3 * this.rData.bps[1];
    },

    sum() {
      let ans = new Array();
      let RI2019 =
        this.rData.analysis_eps[0][1] - this.value3 * this.rData.bps[1];
      ans.push(RI2019);

      let BPS2019 = this.this.rData.bps[1] + this.rData.analysis_eps[0][1];
      let RI2020 =
        (this.rData.analysis_eps[1][1] - this.value3 * BPS2019) /
        Math.pow(1 + this.value3, 1);
      ans.push(RI2020);

      let BPS2020 = BPS2019 + this.rData.analysis_eps[1][1];
      let RI2021 =
        (this.rData.analysis_eps[2][1] - this.value3 * BPS2020) /
        Math.pow(1 + this.value3, 2);
      ans.push(RI2021);

      let E = this.rData.analysis_eps[2][1] * (1 + this.value4);
      let B = this.rData.analysis_eps[2][1] + BPS2020;
      let turns = 0;
      for (let i = 3; i < this.value1; i++) {
        ans.push((E - this.value3 * B) / Math.pow(1 + this.value3, i));
        if (i + 1 == this.value1) break;
        E = E * (1 + this.value4);
        B = B + E;
        turns = i;
      }

      let ROENow = E / B;
      let ROEFinal = this.rData.industry_roe;
      let dROE = (ROENow - ROEFinal) / this.value5;

      ROENow -= dROE;
      B = B + E;
      turns++;
      for (let i = 0; i < this.value2; i++) {
        ans.push(
          ((ROENow - this.value3) * B) / Math.pow(1 + this.value3, turns++)
        );
        B = B + B * ROENow;
      }
      let sum = 0;
      for (let i = 0; i < ans.length; i++) {
        sum += ans[i];
      }

      let CV =
        this.rData.industry_roe(1 + this.value5) / (this.valu3 - this.value5);
      sum += CV / Math.pow(1 + this.value3, turns);
      return sum;
    },

    getValue1FormSon(data) {
      this.value1 = data;
    },
    getValue2FormSon(data) {
      this.value2 = data;
    },
    getValue3FormSon(data) {
      this.value3 = data;
    },
    getValue4FormSon(data) {
      this.value4 = data;
    },
    getValue5FormSon(data) {
      this.value5 = data;
    }
  },

  mounted() {
    // axios
    //     .get('http://127.0.0.1:8001/profit-forecast/',{
    //         params: {
    //             code: this.$route.params.code
    //         }
    //     })
    //     .then(response => this.forcast = response.data[ this.$route.params.code +' profit forecast']);
    //
    // axios
    //     .get('http://127.0.0.1:8001/financial-indicator/',{
    //         params: {
    //             code: this.$route.params.code
    //         }
    //     })
    //     .then(response => this.dataEarnings = response.data[ this.$route.params.code +' 2018 financial indicator']);
    //
    // axios
    //     .get('http://127.0.0.1:8001/rim-value/',{
    //         params: {
    //             code: this.$route.params.code
    //         }
    //     })
    //     .then(response => this.rData = response.data);
    //
    axios
      .get("http://127.0.0.1:8001/v1.0/rim-proposal", {
        params: {
          code: this.$route.params.code
        }
      })
      .then(response => (this.rData = response.data));
  },
  watch: {
    rData() {
      this.getRange();
    }
  }
};
</script>
<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

 .box-card {
        }
</style>
