import { debounce } from './utils.js'

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