import { debounce } from './utils.js'
import { BACK_TOP_POSITION } from 'common/const.js'

import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
    data() {
        return {
            itemListener: null,
        }
    },
    mounted() {
        let refresh = debounce(this.$refs.bscroll.refresh, 300);
        this.itemListener = () => {
            refresh();
        }
        this.$bus.$on("imgLoad", this.itemListener)
        // console.log("混入内容");
    }
}

// 整合回到顶部按钮
export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false, // 是否显示回到顶部组件
        }
    },
    methods: {
        backTopClick() { // 点击回到顶部
            this.$refs.bscroll.scrollTo(0, 0, BACK_TOP_POSITION);
        },
        listenBacktop(positionY) {
            this.isShowBackTop = positionY > BACK_TOP_POSITION;
        }
    }
}