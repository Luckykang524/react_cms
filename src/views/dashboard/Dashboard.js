import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import TopHeader from './TopHeader'
import SideMenu from './SideMenu'
import Home from '../home/Home'
import Users from '../user-manage/Users'
import Error from '../error/Error'
import Rights from '../right-manage/Rights'
import Roles from '../right-manage/Roles'
import List from '../article-manage/List'
import Category from '../article-manage/Category'

import { Layout } from 'antd'
import './Dashboard.css'
const { Content } = Layout

//路由配置 --可以根据数组长度动态创建路由
const routes = [
  {
    path: "/home",
    component: Home
  },
  {
    path: "/user-manage/users",
    component: Users
  },
  {
    path: "/right-manage/rights",
    component: Rights
  },
  {
    path: "/right-manage/roles",
    component: Roles
  },
  {
    path: "/article-manage/list",
    component: List
  },
  {
    path: "/article-manage/category",
    component: Category
  },
]
export default class Dashboard extends Component {
  render() {
    return (
      <Layout>
        <SideMenu></SideMenu>
        <Layout className="site-layout">
          <TopHeader></TopHeader>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >

            <Switch>
              {/* 写死了,维护麻烦
          <Route path="/home" component={Home}></Route>
          <Route path="/user-manage/users" component={Users}></Route>
          <Route path="/right-manage/rights" component={Rights}></Route>
          <Route path="/right-manage/roles" component={Roles}></Route> */}
              {
                routes.map(item =>
                  <Route key={item.path} path={item.path} component={item.component}></Route>)
              }
              <Redirect from="/" to="/home" exact></Redirect>
              <Route path="*" component={Error}></Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
