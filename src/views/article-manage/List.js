import React, { Component } from 'react'
import {Button,Table} from 'antd'
import axios from 'axios';
export default class List extends Component {

  state = {
    list : []
  }
  columns = [
    //form表单在底层自己做好了map，因此直接指定每次遍历时需要的值就行
    {
      title: '文章标题',
      dataIndex: 'title',//数据库中的字段名
      render: (title) => {
        return <b>{title}</b>
      }
    },
    {
      title: '文章作者',
      dataIndex: 'author'
    },
    {
      title: '文章分类',
      dataIndex: 'category',
      render: (category) => {
          return category.join('/')
      }
    },
    {
      title: '操作',
      dataIndex: '',
      render:(item)=>{
        return <div>
          <Button>预览</Button>
          <Button danger onClick={()=>this.handleDelete(item.id)} disabled={item.default}>删除</Button>
          <Button type="primary" disabled={item.default} onClick={()=>this.handleUpdate(item)}>更新</Button>
        </div>
      }
    },
  ];
  render() {
    return (
      <div>
        <Button type="primary" onClick={()=>this.props.history.push('/article-manage/create')}>创建文章</Button>
        <Table columns={this.columns} dataSource={this.state.list} rowKey={(item)=>item.id}/>
      </div>
    )
  }
  componentDidMount(){
    let {username} = JSON.parse(localStorage.getItem("token"))
    axios.get(`http://localhost:5000/articles?author=${username}`).then(res=>{
      this.setState({
        list : res.data
      })
    })
  }

  handleDelete=(id)=>{
    this.setState({
      list : this.state.list.filter(item=>item.id!==id)
    })
    axios.delete(`http://localhost:5000/articles/${id}`)
  }
  //列表有多个，通过动态路由跳转
  //{id}为es6解构
  handleUpdate = ({id})=>{
    this.props.history.push(`/article-manage/update/${id}`)
  }
}

/* 跳转页面添加
  1.点击按钮，进行路由跳转(跳转到create页面)
  2.在create页面中每次点击next都要将数据保存到全局
  3.在最后提交的时候，合并数据并提交到后台
*/