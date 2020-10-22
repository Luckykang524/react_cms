import React, { Component } from 'react'
import axios from "axios"
import {Button, Table,Tag} from 'antd'

export default class Rights extends Component {
  state = {
    list : []
  }
  
  render() {    
    const columns = [
      //form表单在底层自己做好了map，因此直接指定每次遍历时需要的值就行
      {
        title: '#',
        dataIndex: 'id'//数据库中的字段名
      },
      {
        title: '权限名称',
        dataIndex: 'title'
      },
      {
        title: '权限等级',
        dataIndex: 'grade',
        //使用render可以做定制化需求，return后跟啥即返回啥
        render:(grade)=>{
          var colroList = ["green","skyblue","red"]
          return <Tag color={colroList[grade-1]}>{grade}</Tag>
        }
      },
      {
        title: '操作',
        dataIndex: '',
        render:(item)=>{
          return <div>
            <Button danger onClick={()=>this.handleDelete(item.id)}>删除</Button>
            <Button type="primary">更新</Button>
          </div>
        }
      },
    ];
    return (
      <div>
        <Table columns={columns} dataSource={this.state.list} pagination={
          {//pagination是Table的属性，pageSize是pagination的属性，因此要套两层
            pageSize : 5
          }
        }/>
      </div>
    )
  }
  componentDidMount(){
    axios.get('http://localhost:5000/rights').then(res=>{
      console.log(res.data)
      this.setState({
        list : res.data
      })
    })
  }
  handleDelete(id){
    //console.log('删除对应的id')
    //在前端删除(页面上不显示)
    this.setState({
      list : this.state.list.filter(item=>item.id!==id)
    })
    //在数据库中删除
    //axios.delete(`http://localhost:5000/rights/${id}`)
  }
}
