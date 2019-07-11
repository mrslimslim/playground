class EventEmmiter {
    constructor(){
        if(this._events === undefined){
            this._events = Object.create(null);
            // _eventsCount用于统计事件的个数，也就是_events对象有多少个属性。
            this._eventsCounts = 0;
        }
    }

    on(){

    }

    once(){

    }

    addListener(type, listener, prepend){
        let m;
        let events;
        let existing;
        events = this._events;
        if(events.newListener !== undefined){
            // 每次添加新事件的时候会触发
            this.emit('newListener', type, listener);
            events = this._events;
        }
        existing = events[type];
        // 判断相应的type的方法是否存在
        if(existing===undefined){
            //如果相应的type的方法不存在，这新增一个响应
            existing = events[type] = listener;
            ++this._eventsCounts;
        }else{
            //如果存在响应的type的方法
            if(typeof existing === 'function'){
                //如果仅仅是一个方法
                existing = events[type] = prepend?[listener, existing] : [existing, listener];
            }else if(prepend){
                existing.unshift(listener);
            }else{
                existing.push(listener);
            }
        }
        return this;
    }

    emit(type, ...args){
        const events = this._events;
        const handler = events[type];
        if(typeof handler === 'function'){
            // 下面的表达式等同于  handler.apply(this,args);
            // 即将handler的context变为了this
            Reflect.apply(handler, this, args);
        }else{
            const len = handler.length;
            for(let i = 0; i < len; i++){
                Reflect.apply(handler[i], this, args);
            }
        }
        return true;
    }

    prependListener(type, listener){

    }

    removeListener(type, listener){
        let list,events,position,i;
        events = this._events;
        list = events[type];
        // 如果相应的事件对象的属性值是一个函数，也就是说事件只被一个函数监听
        if(list === listener){
            if(--this._eventsCounts===0){
                this._events = Object.create(null);
            }else{
                delete events[type];
                // 存在 removeListener属性
                if(events.removeListener){
                    this.emit('removeListener',type,listener);
                }
            }
        }else if(typeof list !== 'function'){
            // 如果相应的事件对象属性值是一个函数数组
            // 遍历这个数组，找出listener对应的那个数组，在数组中的位置
            for(i = list.length -1; i >= 0; i--){
                if(list[i] === listener){
                    position = i;
                    break;
                }
            }
            if(!position){
                return this;
            }
            list.splice(position, 1);
            if(list.length === 1){
                events[type] = list[0];
            }
        }
        if(events.removeListener !== undefined){
            this.emit('removeListener',type,listener)
        }
        return this;
    }

    setMaxListeners(n){

    }

    
}