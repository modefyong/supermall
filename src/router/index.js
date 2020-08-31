import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location){
    return originalPush.call(this, location).catch(err => err)
}

const Home = () => import('../views/home/Home.vue')
const Detail = () => import('../views/home/detail/Detail.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Order = () => import('../views/order/Order.vue')
const User = () => import('../views/user/User.vue')

Vue.use(VueRouter)

const routes = [{
        path: "",
        redirect: "/home"
    },
    {
        path: "/home",
        name: "home",
        component: Home
    },
    {
        path: "/cart",
        name: "cart",
        component: Cart
    },
    {
        path: "/order",
        name: "order",
        component: Order
    },
    {
        path: "/user",
        name: "user",
        component: User
    },
    {
        path: "/detail",
        name: "detail",
        component: Detail
    }
];
const router =  new VueRouter({
    routes,
    mode: 'history',
}) 
export default router