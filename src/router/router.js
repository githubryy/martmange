import Vue from 'vue'
import VueRouter from 'vue-router'
import Images from '../views/Images.vue'
import Login from '../views/Login.vue'
import Category from '../views/Category.vue'
import Product from '../views/Product.vue'
import ProductAdd from '../views/ProductAdd.vue'
import ProductDtail from '../views/ProductDtail.vue'
import ProductEdit from '../views/ProductEdit.vue'
import UserManege from '../views/UserManege.vue'
import AuthorManege from '../views/AuthorManege.vue'
import OrderManege from '../views/OrderManege.vue'
import OrderDtail from '../views/OrderDtail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children: [
      { path: "/home_echarts", component: Images },
      { path: "/category", component: Category },
      { path: "/product", component: Product },
      { path: "/productAdd", component: ProductAdd },
      { path: "/productDtail", name: "productDtail", component: ProductDtail },
      { path: "/productEdit", name: "productEdit", component: ProductEdit },
      { path: "/userManege", component: UserManege },
      { path: "/authorManege", component: AuthorManege },
      { path: "/orderManege", component: OrderManege },
      { path: "/orderDtail", name: "orderDtail", component: OrderDtail }
    ]
  },
  {
    path: '/', redirect: '/login'
  }
]

const router = new VueRouter({
  // mode:"history",  
  routes
})

export default router
