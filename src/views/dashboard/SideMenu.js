import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
//导入icon图标，使用哪个导入哪个
import {
  UserOutlined,
  TeamOutlined,
  UploadOutlined,
  EditOutlined
} from '@ant-design/icons';

const { Sider} = Layout;
const { SubMenu } = Menu;


export default class SideMenu extends Component {
  state = {
    collapsed : false
  }
  render() {
    return (
       <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
        <div style={{color:"white",textAlign:"center"}}>内容管理系统</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          
          <Menu.Item key="1" icon={<UserOutlined />}>
            首页
          </Menu.Item>
          <Menu.Item key="2" icon={<TeamOutlined />}>
            用户管理
          </Menu.Item>
          <SubMenu key="sub1" icon={<UploadOutlined />} title="权限管理">
              <Menu.Item key="3">权限</Menu.Item>
              <Menu.Item key="4">角色</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<EditOutlined />} title="文章管理">
              <Menu.Item key="5">文章列表</Menu.Item>
              <Menu.Item key="6">文章范围</Menu.Item>
          </SubMenu>
        </Menu> 
      </Sider> 
    )
  }
}
