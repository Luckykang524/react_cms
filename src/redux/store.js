import {createStore} from 'redux'

function reducer(prevState={
    //设置默认值，第一次没有值，会把默认值当成老状态
    isCollapsed :false,
    List:[],
   // userinfo
},action){
    let {type} = action
    let newState = {...prevState} //将老状态深复制一份
    switch ((type)) {
        case 'CMS_CHANGE_COLLAPSED'://必须与发布者type的值中的一致
            newState.isCollapsed = !newState.isCollapsed
            return newState //返回新的状态
        case 'CMS_CHANGE_List':
            newState.List = ['111','222']
            return newState 
        default:
            return prevState;
    }
}
const store = createStore(reducer)
export default store