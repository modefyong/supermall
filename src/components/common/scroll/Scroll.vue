<template>
    <div class="wrapper" ref="scroll">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    components:{
        BScroll,
    },
    props: {
        probeType: {
            type: Number,
            default: 0
        },
        isPulltop: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            scroll: null, // 滚动实例
        };
    },
    methods: {
        scrollTo(x, y, timer=300){// 回到顶部
            this.scroll.scrollTo(x, y, timer);
        },
        finishPullUp(){ // 完成下拉加载更多
            this.scroll.finishPullUp();
        }
    },
    mounted(){
        // 1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.scroll, {
            click: true, // 组件中有div要点击的情况
            probeType: this.probeType, // 监听滚动： 0，1 不监听。2：无缓冲。3：有缓冲
            pullUpLoad: this.isPulltop, // 下拉加载更多
        });
        // 2.监听滚动位置(监听scroll事件)
        this.scroll.on('scroll', (pos) => {
            this.$emit('probePos', pos);
        })
        // 3.监听上拉加载更多
        this.scroll.on('pullingUp',() => { // 监听pullingUp事件
            this.$emit('pullingUp');
        })
    }
}
</script>

<style>
</style>