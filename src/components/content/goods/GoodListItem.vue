<template>
    <div class="container" @click="getDetailInfo(goodsItem)">
        <img :src="goodsItem.show.img" :alt="goodsItem.title" @load="imgLoad">
        <p class="img-title"> {{ goodsItem.title }} </p>
        <div class="sale-info">
            <span class="price"> {{ goodsItem.price }} </span>
            <span> {{ goodsItem.cfav }} </span>
        </div>
    </div>
</template>

<script>

export default {
    components:{},
    props: {
        goodsItem: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {

        };
    },
    methods: {
        imgLoad(){
            this.$bus.$emit("imgLoad");
        },
        getDetailInfo(item){ // 监听单个商品的点击
            if(item){
                // 跳转路由传参有三种方式：1.动态路由；在路由配置路径后面添加`:参数名`,传参时 this.$router.push(路由路径，参数)。
                // 2.query方式，传入一个对象
                // 3.params方式，传入一个对象，区分query方式
                this.$router.push({
                    name: 'detail',
                    params: {
                        iid: item.iid
                    }
                });
            }
        }
    },
    created(){
        // console.log(this.goodsItem, "单个数据");
    },
}
</script>

<style scoped>
.container {
    width: 50%;
    height: 100%;
    /* border: 1px solid #ccc; */
    padding: 2px 6px;
    border-radius: 10px;
}
.container img {
    width: 100%;
}
.container .img-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.sale-info {
    text-align: center;
}
.sale-info .price {
    color: #f00;
}
</style>