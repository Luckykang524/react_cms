import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { convertToRaw ,ContentState,EditorState} from 'draft-js';
import css from './Create.module.css'
import React, { Component } from 'react'

export default class ArticleEditor extends Component {
    state = {
        editorState:""//用来记录富文本框的值
    }
    componentDidMount(){
        //console.log(this.props.content)
        //由于添加和更新用的是一个，因此要进行判断
        if(this.props.content===undefined) return;

        //将html转换成draftjs
        const contentBlock = htmlToDraft(this.props.content);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);
          this.setState({
              editorState
          })
        }
    }
    //下面这两种方式会触发多次，不可靠，因此尽量放在cdm中
    // UNSAFE_componentWillReceiveProps(nextProps){}
    //static getDerivedStateFromProps(nextProps){}
    render() {
        return (
            <div>
                <Editor
                    editorState={this.state.editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName={css.editorClassName}
                    // onEditorStateChange和editorState配合使用，每当文本框值发生变化时，会同步到editorState中(要不然editorState一旦设置初始值便无法改变)
                    onEditorStateChange={this.onEditorStateChange}
                    onBlur={this.handleBlur}
                />
            </div>
        )
    }
    onEditorStateChange = (editorState)=>{
        this.setState({
            editorState
        })
    }
    handleBlur = ()=>{
        //将js代码转换成html，再存到后端
        const content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        this.props.getContent(content)//子传父
    }
}
