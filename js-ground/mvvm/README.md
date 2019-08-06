# Vue的双向绑定是什么原理

vue是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的getter，setter，在数据变动时发布消息给订阅者，触发相应的监听回调

## 具体实现
1. 当把一个Javascript对象传给Vue实例来作为它的data选项时，Vue将遍历它的属性，用Object.defineProperty都加上setter和getter这样的话，给这个对象的某个值赋值，就会触发setter,那么就能监听到数据变化