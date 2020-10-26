import Axios from 'axios'
import React, { Component } from 'react'
import { PageHeader } from 'antd'

export default class Preview extends Component {

    state = {
        info: null
    }
    render() {
        return (
            <div>
                {
                    //不进行判断会报错,路由跳转过来后，先走render生命周期，此时info的值为null,<PageHeader>的title和subtitle的
                    //值为空，而cmd异步请求数据，等数据回来后，再走render，尽管info有值了，但不会再走创建<PageHeader>了
                    this.state.info &&
                    <div>
                        <PageHeader
                            className="site-page-header"
                            // goBack回退到上一个路由
                            onBack={() => this.props.history.goBack()}
                            title={this.state.info.title}
                            subTitle={this.state.info.category.join('/')}
                        />
                         {/* dangerouslySetInnerHTML将html代码显示在页面上,值必须是对象形式,且key的名称必须是__html(杠杠html) */}
                        <div dangerouslySetInnerHTML={{
                            //eg:将<b>111</b> --> 在页面上加粗显示111
                            __html: this.state.info.content
                        }}>
                        </div>
                    </div>
                }     
            </div>
        )
    }
    componentDidMount() {
        Axios.get(`http://localhost:5000/articles/${this.props.match.params.id}`).then(res => {
            //console.log(res.data)
            this.setState({
                info: res.data
            })
        })
    }
}
