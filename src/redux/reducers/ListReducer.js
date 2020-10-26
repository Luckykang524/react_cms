
function ListReducer(prevState={
    List:[]
},action){
    let {type,payload} = action
    let newState = {...prevState} //将老状态深复制一份
    switch ((type)) {
        case 'CMS_CHANGE_List':
            newState.List = payload
            return newState 
        default:
            return prevState;
    }
}

export default ListReducer