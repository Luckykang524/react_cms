import React, { Component } from 'react'
import { Button, Tag,Table } from 'antd'
import store from '../../redux/store'
import ListAction from '../../redux/actionCreator/ListAction'
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
    if(store.getState().ListReducer.List.length === 0){
      //dispatch会等待promise对象执行完，再给reducer
      store.dispatch(ListAction())
    }else{
      //console.log("缓存")
      this.setState({
        list :store.getState().ListReducer.List
      })
    }

    //订阅者订阅  订阅者和发布者是一个人
    this.unscribe = store.subscribe(()=>{
      console.log("第一次",store.getState().ListReducer.List)
      this.setState({
        list :store.getState().ListReducer.List
      })
    })
  }
  componentWillUnmount(){
    this.unscribe()
  }
  handleDelete(id){
    this.setState({
      list:this.state.list.filter(item=>item.id!==id)
  })
  // axios.delete(`http://localhost:5000/rights/${id}`)
  }
}
