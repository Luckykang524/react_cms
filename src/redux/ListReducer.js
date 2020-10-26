
function ListReducer(prevState={
    List:[]
},action){
    let {type} = action
    let newState = {...prevState} //将老状态深复制一份
    switch ((type)) {
        case 'CMS_CHANGE_List':
            newState.List = ['111','222']
            return newState 
        default:
            return prevState;
    }
}

export default ListReducer