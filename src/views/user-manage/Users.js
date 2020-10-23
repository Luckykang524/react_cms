import React, { Component } from 'react'
import { Table, Button, Switch,Modal,Form,Input ,Select} from 'antd'
import axios from 'axios'
const {Option} = Select
export default class Users extends Component {
  state = {
    list: [],
    visibleAdd : false,
    visibleUpdate:false,
    roleList :[],
    loading:false
  }
  addForm = React.createRef()
  updateForm = React.createRef()
  currentUpdate = null//记录正在更新的item
  render() {

    const columns = [
      {
        title: '角色名称',
        dataIndex: 'roleName',
      },
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '用户状态',
        // dataIndex: 'roleState',
        render: (item) => {
          return <Switch checked={item.roleState} disabled={item.default} onChange={()=>this.handleSwitch(item.id)} />
        }
      },
      {
        title: '操作',
        dataIndex: '',
        render: (item) => {
          return <div>
            <Button danger onClick={() => this.handleDelete(item.id)} disabled={item.default}>删除</Button>
            <Button type="primary" disabled={item.default} onClick={()=>this.handleUpdate(item)}>更新</Button>
          </div>
        }
      }
    ];
    return (
      <div>
        <Button type="primary" onClick={this.handleAddUse} >添加用户</Button>
        <Table columns={columns} dataSource={this.state.list} rowKey={item => item.id} />

        <Modal
          visible={this.state.visibleAdd}
          title="添加用户"
          okText="确定"
          cancelText="取消"
          onCancel={()=>{
            this.setState({
              visibleAdd : false
            })
          }}
          onOk={this.handleAddOk}
        >
          <Form
            // 使用ref实例获取到输入的值
            ref={this.addForm}
            layout="vertical"
            name="form_in_modal"
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true, message: '用户名不能为空' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '密码不能为空' }]}
            >
              <Input type="password"/>
            </Form.Item>
            <Form.Item
              name="roleType"
              label="角色"
              rules={[{ required: true, message: '请选择一个角色' }]}
            >
              <Select>
                {
                  this.state.roleList.map(item=>
                  <Option key={item.id} value={item.roleType}>{item.roleName}</Option>)
                }
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          visible={this.state.visibleUpdate}
          title="更新用户"
          okText="确定"
          cancelText="取消"
          onCancel={()=>{
            this.setState({
              visibleUpdate : false
            })
          }}
          onOk={this.handleUpdateOk}
        >
          <Form
            // 使用ref实例获取到输入的值
            ref={this.updateForm}
            layout="vertical"
            name="form_in_modal"
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true, message: '用户名不能为空' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '密码不能为空' }]}
            >
              <Input type="password"/>
            </Form.Item>
            <Form.Item
              name="roleType"
              label="角色"
              rules={[{ required: true, message: '请选择一个角色' }]}
            >
              <Select>
                {
                  this.state.roleList.map(item=>
                  <Option key={item.id} value={item.roleType}>{item.roleName}</Option>)
                }
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
  componentDidMount() {
    axios.get('http://localhost:5000/users').then(res => {
      this.setState({
        list: res.data
      })
      
    })
    axios.get('http://localhost:5000/roles').then(res=>{
      this.setState({
        roleList : res.data
      })
    })
  }
  //删除操作
  handleDelete(id) {
    this.setState({
      list: this.state.list.filter(item => item.id !== id)
    })

    axios.delete(`http://localhost:5000/users/${id}`)
    
  }
  //添加用户
  handleAddUse=()=>{
    this.setState({
      visibleAdd : true
    })
  }
  handleAddOk = ()=>{
    //触发表单验证--校验通过，拿到表单的value值，校验失败，打印出错误信息
    this.addForm.current.validateFields().then(values=>{
      //console.log(values) 
      //1.发送post请求(发送成功后,自动添加一个id) 2.获取到id，在将新添加的数据和之前的数据放在一个数组中 3.重新渲染页面
      let {username,password,roleType} = values
      //找到roleType对应的roleName
      let roleName = this.state.roleList.filter(item=>item.roleType===roleType)[0].roleName

      this.setState({
        visibleAdd:false,
        loading:true
      })
      axios.post('http://localhost:5000/users',{
          "username":username,
          "password":password,
          "roleName":roleName,
          "roleType":roleType,
          "roleState":false,
          "default":false
      }).then(res=>{
        //获取到新添加的数据的完整信息(包括id)
        console.log(res.data)
        this.setState({
          list : [...this.state.list,res.data],
          loading : false
        })
      })
      //清空输入框的值
      this.addForm.current.resetFields()
    })
  }
  handleSwitch = (id)=>{
    this.setState({
      list : this.state.list.map(item=>{
        if(item.id === id){
          return {
            //不能改变原状态,先将所点击的这一项展开,将状态取反(后面的自己替换前面的值)
            ...item,
            roleState : !item.roleState
          }
        }
        return item
      })
    })
    //item 应该是当前id对应的对象
    let item = this.state.list.filter(item=>item.id===id)[0]
    axios.put(`http://localhost:5000/users/${id}`,{
        ...item,
        roleState:!item.roleState
    })
  }
  handleUpdate = (item)=>{
    //用于更新时，得到id，放在全局中，将修改的值存储到
    this.currentUpdate = item
    //要保证模态框创建完成后，再获取实例,要不然不会报错
    let {username,password,roleType} = item
    setTimeout(() => {
      this.setState({
        visibleUpdate : true
      })
      //点击更新，数据回显
      this.updateForm.current.setFieldsValue({
        username,
        password,
        roleType
      })
    }, 0);
  }
  //更新模态框中的确定按钮()
  handleUpdateOk = ()=>{
    this.updateForm.current.validateFields().then(values=>{
      //找到roleType对应的roleName值
      let roleName = this.state.roleList.filter(item=>item.roleType===values.roleType)[0].roleName
      this.setState({
        list : this.state.list.map(item=>{
          if(item.id === this.currentUpdate.id){
            return {
              ...item,
              ...values,
              roleName
            }
          }
          return item
        }),
        visibleUpdate : false
      })
      //更新对应id的数据
      axios.put(`http://localhost:5000/users/${this.currentUpdate.id}`,{
          ...this.currentUpdate,
          ...values,
          roleName
      })
    })
  }
}
/* 弹出模态框---更新数据的逻辑
    1.点击更新按钮将数据进行回显 将id设置为全局的
      使用ref实例下面的setFieldsValue()进行回显
    2.获取更新的值，使用全局的id修改数据
      1）验证所录入的信息ref实例下面的validateFields()验证成功则返回录入的值
      2）获取到更改的值
          roleName需要进行处理才能得到
      3）根据id发送put请求
 */