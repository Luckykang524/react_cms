import React, { Component } from 'react'
import { Button } from 'antd';
import echarts from "echarts"
import axios from 'axios'
import _ from 'lodash'
import { Row, Col } from 'antd';


export default class Home extends Component {
  formatdata = null
  myCharts = null//为了当视口变化时，饼图也跟随变化
  myPieCharts = null
  render() {
    return (
      <div> 
        <Button type="primary">Home</Button>
        <Row>
          <Col span={12}>
            <div style={{width:"100%",height:"500px"}} id="bar"></div>
          </Col>
          <Col span={12}>
            <div style={{width:"100%",height:"500px"}} id="pie"></div>
          </Col>
        </Row>
        
      </div>
    )
  }
  componentDidMount(){
    //dom创建完成,但css并未渲染结束，也就是100%不知道相对谁的
    //解决办法：放在定时器中或者ajax(常用)中

    axios.get(`http://localhost:5000/articles`).then(res=>{
      console.log(res.data)
      
      this.formatData(res.data)//处理原始数据函数
      this.initBarEchart()
      this.initPieEchart()
    })
    //监听视口变化
    window.onresize = ()=>{
      //echarts的重绘方法
      this.myCharts.resize()
      this.myPieCharts.resize()
    }
  }

  componentWillUnmount(){
    //取消监听视口变化事件
    window.resize = null
  }
  formatData(data){
    //按照作者分组
    this.formatdata = _.groupBy(data,"author")
    console.log(this.formatdata, Object.entries(this.formatdata))
  }

  initBarEchart(){
    //初始化echarts
    this.myCharts = echarts.init(document.getElementById('bar'))
    var option = {
      xAxis: {
          type: 'category',
          data: Object.keys(this.formatdata)
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data:Object.values(this.formatdata).map(item=>item.length),
          type: 'bar',
          itemStyle: {
            normal: {
                color: function (params) {
                    var colorList = [
                        '#ffb400', '#f60', '#ff0000', '#00ddff',
                        '#baff00', '#00ff06'
                    ]
                    return colorList[params.dataIndex]
                }
            }
        },
      }]
    };
    this.myCharts.setOption(option)
  }
  initPieEchart(){
    this.myPieCharts = echarts.init(document.getElementById('pie'))
    var option = {
      title: {
          text: '用户发布文章数',
          subtext: '仅供参考',
          left: 'center'
      },
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
          orient: 'vertical',
          left: 'left',
          data: Object.keys(this.formatdata)
      },
      series: [
          {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: /* [
                  {value: 335, name: '直接访问'},
                  {value: 310, name: '邮件营销'},
                  {value: 234, name: '联盟广告'},
                  {value: 135, name: '视频广告'},
                  {value: 1548, name: '搜索引擎'}
              ], */
              Object.entries(this.formatdata).map(item=>({
                name : item[0],
                value : item[1].length
              })),
              emphasis: {
                  itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
      ]
    };
    this.myPieCharts.setOption(option)
  }
}
