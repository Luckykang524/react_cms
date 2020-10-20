import React, { Component } from 'react'
import { Layout, Menu, Dropdown,Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;
export default class TopHeader extends Component {
  state = {
    collapsed: false
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          超级管理员
        </Menu.Item>
        <Menu.Item danger>退出</Menu.Item>
      </Menu>
    );
    return (
      <Header className="site-layout-background" style={{ padding: '0 16px' }}>
        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: this.toggle,
        })}

        <div style={{float:"right"}}>欢迎kang回来
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
  }
}
