import React, { Component } from 'react'
import Particles from 'react-particles-js';//引入粒子效果
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'
export default class Login extends Component {
  state = {
    height: 0
  }
  render() {
    return (
      <div style={{ backgroundColor: "skyblue" }}>
        <Particles height={this.state.height}
          params={
            //配置信息
            {
              "particles": {
                "number": {
                  "value": 160,
                  "density": {
                    "enable": false
                  }
                },
                "size": {
                  "value": 10,
                  "random": true
                },
                "move": {
                  "direction": "bottom",
                  "out_mode": "out"
                },
                "line_linked": {
                  "enable": false
                }
              },
              "interactivity": {
                "events": {
                  "onclick": {
                    "enable": true,
                    "mode": "remove"
                  }
                },
                "modes": {
                  "remove": {
                    "particles_nb": 10
                  }
                }
              }
            }
          } />
        <div className="login-form">
          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
        </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.setState({
      //粒子效果有bug，会多出来5px从而出现滚动条；减5px让滚动条消失
      height: document.documentElement.clientHeight - 5 + 'px'
    })
  }
  //提交表单且数据验证成功后回调事件
  onFinish(values){
    console.log(values)

  }
}
