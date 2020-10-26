import React, { Component } from 'react'
import {withRouter} from 'react-router'
import { Layout, Menu, Dropdown,Avatar } from 'antd';
import store from '../../redux/store'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

class TopHeader extends Component {
  state = {
    collapsed: false
  }
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
        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
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
    this.setState({
      collapsed: !this.state.collapsed
    })
    //发布action--必须是对象形式 必须有一个名为type的属性，属性值为任意唯一值
    store.dispatch({
      type:"CMS_CHANGE_COLLAPSED"
    })
  }
  
}

export default withRouter(TopHeader)
