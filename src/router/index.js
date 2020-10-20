//路由
import React, { Component } from 'react'
import {HashRouter, Redirect, Switch,Route} from 'react-router-dom'
import Login from '../views/login/Login'
import Dashboard from '../views/dashboard/Dashboard'

export default class SRouter extends Component {
  render() {
    return (
      <HashRouter>
          <Switch>
              <Route path="/login" component={Login}></Route>
              <Route path="/" render={()=>
                  localStorage.getItem('token')?<Dashboard></Dashboard>
                  :<Redirect to="/login"></Redirect>
              }></Route>
          </Switch>
      </HashRouter>
    )
  }
}
