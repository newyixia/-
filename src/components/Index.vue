<template>
  <div class="index">
    <div id="main" style="width: 100%;height:450px;padding-top: 50px"></div>
  </div>
</template>

<script>
  import {http, articlebychannel, list} from "../api/api";

  export default {
    name: "Index",
    mounted() {

      this.getData();//调用ajax请求
    },
    data() {
      return {

      }
    },
    methods: {
      //echarts的生成；
      show(arr11,arr22) {
        let myChart = this.$echarts.init(document.getElementById('main'));
        let option = {
          title: {
            text: '文章详情'
          },
          tooltip: {},
          xAxis: {
            data: arr22
          },
          yAxis: {},
          series: [{
            name: '数量',
            type: 'bar',
            data: arr11
          }],
          textStyle: {color:'#fff'}
        };
        myChart.setOption(option);
      },

      //获取文章和文章分类数
      getData() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        Promise.all([this.$http.get(http + articlebychannel), this.$http.get(http + list)])
          .then((data) => {
            this.arr1=data[0].data.data.map((item) => {
              return item.articles
            })
            this.arr2=data[1].data.data.map(function (item) {
              return item.name
            })
            this.show(this.arr1,this.arr2);//调用echart
            setTimeout(() => {
              loading.close();
            }, 1000);
          }).catch((err) => {
          location.href='./login.html'
        })
      }
    }
  }
</script>

<style scoped>
.index {
  padding:20px
}
</style>
