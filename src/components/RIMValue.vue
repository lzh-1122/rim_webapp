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
                    <!--                    <RIMValueSlider-->
                    <!--                            :slider-min="min1"-->
                    <!--                            :slider-max="max1"-->
                    <!--                            :slider-step="step1"-->
                    <!--                            :slider-value="value1"-->
                    <!--                            slider-name="t1"-->
                    <!--                            @func="getValue1FormSon"-->
                    <!--                    ></RIMValueSlider>-->
                    <RIMValueSliderRange :slider-min="min1"
                                         :slider-max="max1"
                                         :slider-step="step1"
                                         :slider-value="value1"
                                         slider-name="T1_T2"
                                         @func="getValue3FormSon">
                    </RIMValueSliderRange>
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
  import RIMValueSliderRange from "./RIMValueSliderT1T2";
  import RIMValueRadar from "./QualityRadar";

  export default {
    name: "rimvalue",
    components: {
      RIMValueResult: RIMValueResult,
      RIMValueTable: RIMValueTable,
      RIMValueSlider: RIMValueSlider,
      RIMValueSliderRange: RIMValueSliderRange
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
        value: 0,
        value1: [5, 7],
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
          {des: "每股净资产BPS" + this.rData.bps[0], value: this.rData.bps[1]}
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
        this.min1 = this.rData.t1_range[0] - 4;
        this.max1 = this.rData.t1_range[1] + 5;
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
        let rimParameter2018 = {
          bps2018: this.rData['bps'][1],
          predicationEPS: this.rData['analysis_eps'],
          t1: 5,
          g1: this.rData['g1_default'],
          industry_roe: this.rData['industry_roe'],
          r: this.rData['capital_return_rate_default'],
          g2: this.rData['g2_default']
        };
        let result = [{year: 2018, bps: this.rData['bps'][1]}];
        return this.calcRI2018(rimParameter2018, 2019, result)
          .slice(1)
          .reduce((x, y) => x + y.discounted_ri, 0);
      },

      calcRI2018(p, year, result) {
        let eps = null;
        let last_result = result.slice(-1)[0];
        if (2019 <= year && year <= 2021) {
          eps = p.predicationEPS[year - 2019][1];
        } else if (year <= 2023) {
          eps = last_result.eps * (1 + p.r);
        } else if (year <= 2030) {
          let last_roe = last_result.eps / last_result.bps;
          let delta_roe = (last_roe - p.industry_roe) / (2030 + 1 - year);
          eps = (last_roe - delta_roe) * last_result.bps;
        }

        if (year <= 2030) {
          let bps = last_result.bps + eps;
          let ri = eps - last_result.bps * p.r;
          result.push({
            year: year,
            eps: eps,
            bps: bps,
            ri: ri,
            discounted_ri: ri / Math.pow(1 + p.r, year - 2019)
          });
          return this.calcRI2018(p, year + 1, result);
        } else {
          let cv = last_result.ri * (1 + p.g2) / (p.r - p.g2);
          result.push({
            year: 2031,
            eps: 0,
            bps: 0,
            ri: cv,
            discounted_ri: cv / Math.pow(1 + p.r, year - 2019)
          });
          return result;
        }
      },

      sum() {
        let ans = new Array();
        let RI2019 =
          this.rData.analysis_eps[0][1] - this.value3 * this.rData.bps[1];
        ans.push(RI2019);

        let BPS2019 = this.rData.bps[1] + this.rData.analysis_eps[0][1];
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
          if (i + 1 === this.value1) break;
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

        let CV = this.rData.industry_roe * (1 + this.value5) / (this.value3 - this.value5);
        sum += CV / Math.pow(1 + this.value3, turns);
        return sum;
      },

      getValue1FormSon(data) {
        this.value = data;
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
        .get("http://106.15.137.244:80/v1.0/rim-proposal", {
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
