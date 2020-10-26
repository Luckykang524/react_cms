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
import store from '../../redux/store';

const { Sider } = Layout;
const { SubMenu } = Menu;

const menus = [
  {
    path: "/home",//为了点击某一个时，关联路由
    //加单引号会当成字符串，直接写就行（jsx语法）
    icon: <UserOutlined />,
    title: "首页",
    permission:[1,2,3]
  },
  {
    path: "/user-manage",
    icon: <TeamOutlined />,
    title: "用户管理",
    permission:[3],
    children: [
      {
        path: "/user-manage/users",
        icon: <TeamOutlined />,
        title: "用户列表",
        permission:[3]
      }
    ]
  },
  {
    path: "/right-manage",
    icon: <UploadOutlined />,
    title: "权限管理",
    permission:[3],
    children: [
      {
        path: "/right-manage/rights",
        icon: <UploadOutlined />,
        title: "权限列表",
        permission:[3],
      },
      {
        path: "/right-manage/roles",
        icon: <UploadOutlined />,
        title: "角色列表",
        permission:[3],
      }
    ]
  },
  {
    path: "/article-manage",
    icon: <EditOutlined />,
    title: "文章管理",
    permission:[1,2,3],
    children: [
      {
        path: "/article-manage/list",
        icon: <EditOutlined />,
        title: "文章列表",
        permission:[1,2,3]
      },
      {
        path: "/article-manage/category",
        icon: <EditOutlined />,
        title: "文章分类",
        permission:[2,3]
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
    //当添加新文章时,文章列表高亮显示
    if(this.props.location.pathname.includes("/article-manage") && !this.props.location.pathname.includes("category")){
      selectKeys= ['/article-manage/list']
    }
    return (
      //不可以直接将取出的值给collapsed属性，react没有set get拦截，直接在这写不会触发更新；变成自己的状态才可以实现每次值改变后重新渲染
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
    let {roleType} = JSON.parse(localStorage.getItem('token'))
    return menus.map(item => {
      if (item.children) {
        //添加一个字段实现，根据不同的角色，看到不同的内容
        //如果permission中包含roleType，则渲染子级菜单
        if(!item.permission.includes(roleType)) return null
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
      if(!item.permission.includes(roleType)) return null
      return <Menu.Item key={item.path} icon={item.icon} onClick={() => {
        // console.log(item.path)
        this.props.history.push(item.path) //编程式导航
      }}>
        {item.title}
      </Menu.Item>
    })
  }
  componentDidMount(){
    //订阅函数的返回值是取消订阅的函数
    this.unscribe = store.subscribe(()=>{
      this.setState({
        //未拆分的写法
        //collapsed :store.getState().isCollapsed
        //拆分的写法
        collapsed :store.getState().CollapsedReducer.isCollapsed
      })
    })
  }

  componentWillUnmount(){
    //执行取消订阅
    this.unscribe()
  }
}

export default withRouter(SideMenu)