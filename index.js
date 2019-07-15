let zx = {
    el: '#zx',
    data: {title: '标题'}
}

class zxVue {
    constructor(options) {
        this.$el = document.querySelector(options.el)
        let data = options.data
        this.data = data
        this.methods = options.methods
        // prop进行代理
        Object.keys(data).forEach((prop) => {
            this.proxyKey(prop)
        })
        this.watcherTask = {}
        this.observer(data)
        this.compile(this.$el)
    }
    proxyKey(prop) {
        let self = this
        Object.defineProperty(self.data, prop, {
            get(){
                return self.data[prop]
            },
            set(val){
                if(val !== data[prop]){
                    self.data[prop] = val
                }
            }
        })
    }
    observer(data) {
        let self = this
        Object.keys(data).forEach((prop) => {
            let value = data[prop]
            this.watcherTask[prop] = []
            Object.defineProperty(data, prop, {
                get(){
                    return value
                },
                set(val){
                    if(val !== value){
                        self.data[prop] = val
                        this.watcherTask[prop].forEach((item) => {
                            item.update()
                        })
                    }
                }
            })
        })
    }
    compile(el) {
        let self = this
        let nodes = el.childNodes
        for(let i = 0; i < nodes.length; i++) {
            let node = nodes[i]
            if (node.nodeType === 1) { // 文本节点
                let propWithSymbol = node.textNode // 其实是一个data的一个prop
                self.txtCompile(propWithSymbol)
            } else {
                if(node.nodeType === 3) { // 元素节点

                }
            }
        }
    }
    txtCompile(propWithSymbol) {
        let txt = propWithSymbol.trim()
        let reg = /\{\{.*\}\}/g
        if(reg.test(txt)) {

        }
    }
}