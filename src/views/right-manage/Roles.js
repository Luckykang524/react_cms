import React, { Component } from 'react'
import { Button, Tag,Table } from 'antd'
import ListAction from '../../redux/actionCreator/ListAction'
import {connect} from 'react-redux'
class Roles extends Component {
 
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
        <Table columns={columns} dataSource={this.props.list} rowKey={item => item.id}
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
    if(this.props.list.length === 0){
      this.props.ListAction()
    }else{
      this.setState({
        list :this.props.list
      })
    }
  }

  handleDelete(id){
    this.setState({
      list:this.props.list.filter(item=>item.id!==id)
  })
  // axios.delete(`http://localhost:5000/rights/${id}`)
  }
}
const mapStateToProps = (storestate)=>{
  return {
    list :storestate.ListReducer.List
  }
}
const mapDispatchToProps = {
  ListAction
}

export default connect(mapStateToProps,mapDispatchToProps)(Roles)