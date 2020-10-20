import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import { withRouter } from 'react-router'
//导入icon图标，使用哪个导入哪个
import {
  UserOutlined,
  TeamOutlined,
  UploadOutlined,
  EditOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

const menus = [
  {
    path: "/home",//为了点击某一个时，关联路由
    //加单引号会当成字符串，直接写就行（jsx语法）
    icon: <UserOutlined />,
    title: "首页"
  },
  {
    path: "/user-manage",
    icon: <TeamOutlined />,
    title: "用户管理",
    children: [
      {
        path: "/user-manage/users",
        icon: <TeamOutlined />,
        title: "用户列表"
      }
    ]
  },
  {
    path: "/right-manage",
    icon: <UploadOutlined />,
    title: "权限管理",
    children: [
      {
        path: "/right-manage/rights",
        icon: <UploadOutlined />,
        title: "权限列表"
      },
      {
        path: "/right-manage/roles",
        icon: <UploadOutlined />,
        title: "角色列表"
      }
    ]
  },
  {
    path: "/article-manage",
    icon: <EditOutlined />,
    title: "文章管理",
    children: [
      {
        path: "/article-manage/list",
        icon: <EditOutlined />,
        title: "文章列表"
      },
      {
        path: "/article-manage/category",
        icon: <EditOutlined />,
        title: "文章内容"
      }
    ]
  }
]

class SideMenu extends Component {
  state = {
    collapsed: false
  }
  render() {
    //以/为分隔符，分割成数组 /right-manage/rights" -> ["", "right-manage", "rights"]
    let openKeys = ['/'+ this.props.location.pathname.split('/')[1]]
    let selectKeys = [this.props.location.pathname]
    return (
      <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
        <div style={{ color: "white", textAlign: "center" }}>内容管理系统</div>
        <Menu theme="dark" mode="inline" defaultOpenKeys={openKeys} selectedKeys={selectKeys}>
          {/*使用这个defaultSelectedKeys的话，只能保证初始值,以后就非受控了;以后值改变也不会受影响;在menu源码中,只在cdm中接收
          使用selectKeys属性，会让menu受控  */}
          {/* 写死的话，不方便维护 */}
          {/* <Menu.Item key="1" icon={<UserOutlined />}>
            首页
          </Menu.Item>
          <SubMenu key="sub1" icon={<TeamOutlined />} title="用户管理">
              <Menu.Item key="2">用户列表</Menu.Item>
          </SubMenu> */}
          {
            //写一个方法，动态渲染menu
            this.renderMenu(menus)
          }
        </Menu>
      </Sider>
    )
  }

  renderMenu(menus) {
    return menus.map(item => {
      if (item.children) {
        return <SubMenu key={item.path}
          title={
            <span>
              {item.icon}
              <span>{item.title}</span>
            </span>
          }>
          {this.renderMenu(item.children)}
        </SubMenu>
      }
      return <Menu.Item key={item.path} icon={item.icon} onClick={() => {
        // console.log(item.path)
        this.props.history.push(item.path) //编程式导航
      }}>
        {item.title}
      </Menu.Item>
    })
  }
}

export default withRouter(SideMenu)