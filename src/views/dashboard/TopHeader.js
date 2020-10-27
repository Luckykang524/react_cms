import React, { Component } from 'react'
import {withRouter} from 'react-router'
import { Layout, Menu, Dropdown,Avatar } from 'antd';
import CollapsedAction from '../../redux/actionCreator/CollapsedAction'
import {connect} from 'react-redux'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

class TopHeader extends Component {
  render() {
    let {username,roleName} = JSON.parse(localStorage.getItem('token'))
    const menu = (
      <Menu>
        <Menu.Item>
          {roleName}
        </Menu.Item>
        <Menu.Item danger onClick={()=>{
          this.props.history.replace('/login')//把当前路径替换成/login
          localStorage.removeItem('token')//清除
        }}>退出</Menu.Item>
      </Menu>
    );
    return (
      <Header className="site-layout-background" style={{ padding: '0 16px' }}>
        {React.createElement(this.props.isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: this.toggle,
        })}

      <div style={{float:"right"}}>欢迎{username}回来
          <Dropdown overlay={menu}>
            {/* Avatar为头像 */}
            <Avatar size="large" icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </Header>
    )
  }
  toggle = () => {
    //执行这条语句，父组件便会dispatch 这个函数CollapsedAction
    this.props.CollapsedAction()
  }
}
const mapStateToProps = (storestate)=>{
  return {
    //子组件需要使用isCollapsed，因此要传给子组件
    isCollapsed: storestate.CollapsedReducer.isCollapsed
  }
}

const mapDispatchToProps = {
  //让父组件dispatch的内容
  CollapsedAction:CollapsedAction
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(TopHeader))
//被connect包装后，自己的组件没有状态，叫做UI组件或无状态组件，connect叫做容器