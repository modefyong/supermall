<template>
    <div class="goods-list">
        <good-list-item v-for="(item, index) in goodsList" :key="index" :goods-item="item"></good-list-item>
    </div>
</template>

<script>
import GoodListItem from './GoodListItem'
export default {
    components:{
        GoodListItem,
    },
    data() {
        return {

        };
    },
    props: {
        goodsList: {
            type: Array,
            default:() => []
        }
    },
    methods: {

    },
    created(){
        // console.log(this.goodsList, "商品数据");
    },
}
</script>

<style>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-around; */
}
</style>