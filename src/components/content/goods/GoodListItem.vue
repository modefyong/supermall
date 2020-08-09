<template>
    <div class="container">
        <img :src="goodsItem.show.img" :alt="goodsItem.title">
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