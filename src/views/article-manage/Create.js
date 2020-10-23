import css from'./Create.module.css'
import ArticleEditor from './ArticleEditor'
import React, { Component } from 'react'
import { PageHeader, Steps, Button, Form, Input, Cascader, message } from 'antd'
import axios from 'axios'
const { Step } = Steps




export default class Create extends Component {
    state = {
        current: 0,
        options: [],
        formInfo: null,
        content :""
    }
    formInfoRef = React.createRef()

    componentDidMount() {
        axios.get('http://localhost:5000/categories').then(res => {
            this.setState({
                options: res.data
            })
        })
    }

    render() {
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        }
        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    // goBack回退到上一个路由
                    onBack={() => this.props.history.goBack()}
                    title="创建文章"
                    subTitle="This is a subtitle"
                />
                <Steps current={this.state.current}>
                    <Step title="基本内容" description="Basic content" />
                    <Step title="文章内容" subTitle="Article content" description="This is a description." />
                    <Step title="提交文章" description="Sumbit article" />
                </Steps>
                <div style={{ marginTop: "50px" }}>
                    <div className={this.state.current === 0 ? '' : css.hidden}>
                        <Form
                            name="basic"
                            {...layout}
                            ref={this.formInfoRef}
                        >
                            <Form.Item name="title" label="文章标题" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="category" label="文章分类" rules={[{ required: true }]}>
                                <Cascader options={this.state.options} onChange={this.onChange} placeholder="Please select"
                                    fieldNames={{
                                        label: "title"//cascader中遍历的是label但后台数据字段为title,指定遍历title
                                    }}
                                />
                            </Form.Item>
                        </Form>
                    </div>
                    <div className={this.state.current === 1 ? '' : css.hidden}>
                        <ArticleEditor getContent={(content)=>{
                            //接收孩子传过来的值并同步全局
                            this.setState({
                                content 
                            })
                        }}></ArticleEditor>
                    </div>
                    <div className={this.state.current === 2 ? '' : css.hidden}>提交</div>
                </div>
                <div className="steps-action">
                    {/* 前面成立的话，渲染后面的内容 */}
                    {this.state.current < 2 && (
                        <Button type="primary" onClick={() => this.next()}>
                            下一步
                        </Button>
                    )}
                    {this.state.current === 2 && (
                        <Button type="primary" onClick={this.handleSubmit}>
                            提交
                        </Button>
                    )}
                    {this.state.current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                            上一步
                        </Button>
                    )}
                </div>
            </div>
        )
    }
    next() {
        if (this.state.current === 0) {
            this.formInfoRef.current.validateFields().then(values => {
                this.setState({
                    current: this.state.current + 1,
                    formInfo: values
                })
            })
        }else if(this.state.current === 1){
            //富文本框有值时可以进行下一步,值为空时弹出提示框
            this.state.content?this.setState({
                current : this.state.current + 1
            }):message.error("内容不能为空")
        }
         else {
            this.setState({
                current: this.state.current + 1
            })
        }

    }
    prev() {
        this.setState({
            current: this.state.current - 1
        })
    }
    handleSubmit = ()=>{
        console.log(this.state.formInfo)
        let {username} = JSON.parse(localStorage.getItem("token"))
        axios.post('http://localhost:5000/articles',{
            ...this.state.formInfo,
            author:username,
            content:this.state.content
        }).then(res=>{
            this.props.history.replace('/article-manage/list')
        })
    }
}

