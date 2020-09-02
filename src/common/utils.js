export function debounce(func, delay) { // 防抖函数
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args); // 为什么使用apply函数？改变this指向？this没变啊。。。
        }, delay);
    }
}