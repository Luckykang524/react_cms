import axios from 'axios'
//redux-promise中间件
/* function ListAction(){//这个函数的返回值必须是一个普通对象 
    return axios.get('http://localhost:5000/roles').then(res=>{
        return{
            type : "CMS_CHANGE_List",
            payload:res.data//参数，后台数据
        }
    })
    //使用redux-promise中间件让dispatch支持参数的返回值为promise对象

}

export default ListAction */
//redux-chunk中间件 支持dispatch参数的返回值为函数
function ListAction() {
    return (dispatch)=>{
        axios.get('http://localhost:5000/roles').then(res=>{
            dispatch({
                type : "CMS_CHANGE_List",
                payload:res.data
            })
        })
    }
}
export default ListAction