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
        isPullTop: {
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
            this.scroll && this.scroll.scrollTo(x, y, timer);
        },
        finishPullUp(){ // 完成下拉加载更多
            this.scroll && this.scroll.finishPullUp();
        },
        refresh(){ // 刷新，重新获取滚动区域
            // console.log("检验防抖");
            this.scroll && this.scroll.refresh();
        },
        getScrollY(){  // 获取滚动的y值
            return this.scroll ? this.scroll.y : 0;
        },
    },
    mounted(){
        // 1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.scroll, {
            click: true, // 组件中有div要点击的情况
            probeType: this.probeType, // 监听滚动： 0，1 不监听。2：无缓冲。3：有缓冲
            pullUpLoad: this.isPullTop, // 下拉加载更多, 默认为true
        });
        // 2.监听滚动位置(监听scroll事件)
        if(this.probeType === 2 || this.probeType === 3){
            this.scroll.on('scroll', (pos) => {
            this.$emit('probePos', pos);
        })
        }
        // 3.监听上拉加载更多
        if(this.isPullTop){
            this.scroll.on('pullingUp',() => { // 监听pullingUp事件
            this.$emit('pullingUp');
        })
        }
    }
}
</script>

<style>
</style>