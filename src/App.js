import React, { Component } from 'react';
import SRouter from './router/index'
import store from './redux/store'
//引入antd的样式
import 'antd/dist/antd.css';
import './App.css';
import {Provider} from "react-redux";


export default class App extends Component{
  render(){
    return(
      <Provider store={store}>
        <SRouter>

        </SRouter>
      </Provider>
    )
  }
}


