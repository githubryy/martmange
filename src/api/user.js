import serve from '../util/request'

export function getLogin(obj){//要导出去
   return serve({
       url:"api/login",
       method:"post",
       data:obj
   })
}
export function getCategory(obj){
    return serve({
        url:"/api/manage/category/list",
        method:"get",
        query:obj
    })
}
export function getCategoryInfo(obj){
    return serve({
        url:"/api/manage/category/info",
        method:"get",
        query:obj
    })
}
export function getCaUpdate(obj){
    return serve({
        url:"/api/manage/category/update",
        method:"post",
        data:obj
    })
}
export function getCaAdd(obj){
    return serve({
        url:"/api/manage/category/add",
        method:"post",
        data:obj
    })
}
export function getProduct(obj){
    return serve({
        url:"/api/manage/product/list",
        method:"get",
        query:obj
    })
}
export function getProAdd(obj){
    return serve({
        url:"/api/manage/product/add",
        method:"post",
        data:obj
    })
}

export function getProUpdate(obj){
    return serve({
        url:"/api/manage/product/update",
        method:"post",
        data:obj
    })
}
export function getImgUpIoad(obj){
    return serve({
        url:"/api/manage/img/upload",
        method:"post",
        data:obj
    })
}
export function getImgDelete(obj){
    return serve({
        url:"/api/manage/img/delete",
        method:"post",
        data:obj
    })
}
export function getProSearch(obj){
    return serve({
        url:"/api/manage/product/search",
        method:"get",
        params:obj
    })
}
export function getProductAdd(obj){
    return serve({
        url:"/api/manage/product/add",
        method:"post",
        data:obj
    })
}

export function getUpStatus(obj){
    return serve({
        url:"/api/manage/product/updateStatus",
        method:"post",
        data:obj
    })
}
export function getUserList(obj){
    return serve({
        url:"/api/manage/user/list",
        method:"get",
        query:obj
    })
}
export function getRoleList(obj){
    return serve({
        url:"/api/manage/role/list",
        method:"get",
        query:obj
    })
}
export function getRoleCreate(obj){
    return serve({
        url:"/api/manage/role/add",
        method:"post",
        data:obj
    })
}

export function getUserAdd(obj){
    return serve({
        url:"/api/manage/user/add",
        method:"post",
        data:obj
    })
}
export function getUserUpdata(obj){
    return serve({
        url:"/api/manage/user/update ",
        method:"post",
        data:obj
    })
}
export function getUserDelete(obj){
    return serve({
        url:"/api/manage/user/delete ",
        method:"post",
        data:obj
    })
}
export function getOrderList(obj){
    return serve({
        url:"/api/manage/order/list ",
        method:"get",
        query:obj
    })
}
export function getOrderSearch(obj){
    console.log(obj)
    return serve({
        url:"/api/manage/order/search ",
        method:"get",
        query:obj
    })
}
export function getUserRoleUpdata(obj){
    console.log(obj)
    return serve({
        url:"api/manage/role/update ",
        method:"post",
        data:obj
    })
}




