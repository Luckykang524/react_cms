import React, { Component } from 'react'
import { Button, Tag,Table } from 'antd'
import axios from 'axios';
export default class Roles extends Component {
  state = {
    list: []
  }
  render() {
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'roleName',
        render:(roleName)=>{
          return <b>{roleName}</b>
        }
      },
      {
        title: '操作',
        dataIndex: '',
        render: (item) => {
          return <div>
            <Button danger onClick={() => this.handleDelete(item.id)}>删除</Button>
            <Button type="primary">更新</Button>
          </div>
        }
      },
    ];
    return (
      <div>
        <Table columns={columns} dataSource={this.state.list} rowKey={item => item.id}
          expandable={{
            expandedRowRender: item => <div>
              {item.roleRight.map((data,index)=>
                <div key={index}>
                  <b>{data.category}</b>
                  {
                    data.list.map(right=>
                      <Tag key={right} color="green" closable>{right}</Tag>
                    )
                  }
                </div>
                )}
            </div>
          }}
        ></Table>
      </div>
    )
  }
  componentDidMount() {
    axios.get('http://localhost:5000/roles').then(res => {
      this.setState({
        list: res.data
      })
    })
  }
  handleDelete(id){
    this.setState({
      list:this.state.list.filter(item=>item.id!==id)
  })
  // axios.delete(`http://localhost:5000/rights/${id}`)
  }
}
