import css from './Create.module.css'
import ArticleEditor from './ArticleEditor'
import React, { Component } from 'react'
import { PageHeader, Steps, Button, Form, Input, Cascader, message } from 'antd'
import axios from 'axios'
const { Step } = Steps




export default class Update extends Component {
    state = {
        current: 0,
        options: [],
        formInfo: null,
        content: ""
    }
    formInfoRef = React.createRef()

    componentDidMount() {
        axios.get('http://localhost:5000/categories').then(res => {
            this.setState({
                options: res.data
            })
        })
        //详情页根据列表页传过来的id获取到相应的数据，同步状态后，再进行回显
        axios.get(`http://localhost:5000/articles/${this.props.match.params.id}`).then(res => {
            console.log(res.data)
            let { title, category, content } = res.data
            //同步数据
            console.log(content)
            this.setState({
                content,
                //formInfo有两个值，同步时把后端取过来的两个值放进去
                formInfo: {
                    title,
                    category
                }
            })
            //表单回显--setFieldsValue
            this.formInfoRef.current.setFieldsValue({
                title,
                category
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
                    title="更新文章"
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
                        {//获取到数据后，状态异步更新;第一次content的值为空，会传递给子组件，子组件触发cdm，但cdm只会执行一次，二者错过了，
                        //解决办法：对content进行判断,值非空时，再去渲染ArticleEditor
                            this.state.content && <ArticleEditor getContent={(content) => {
                                //接收孩子传过来的值并同步全局,把从后端来的content值传给孩子，让孩子进行处理并显示
                                this.setState({
                                    content
                                })
                            }} content={this.state.content}></ArticleEditor>
                        }
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
        } else if (this.state.current === 1) {
            //富文本框有值时可以进行下一步,值为空时弹出提示框
            this.state.content ? this.setState({
                current: this.state.current + 1
            }) : message.error("内容不能为空")
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
    handleSubmit = () => {
        let { username } = JSON.parse(localStorage.getItem("token"))
        axios.put(`http://localhost:5000/articles/${this.props.match.params.id}`, {
            ...this.state.formInfo,
            author: username,
            content: this.state.content
        }).then(res => {
            this.props.history.replace('/article-manage/list')
        })
    }
}

