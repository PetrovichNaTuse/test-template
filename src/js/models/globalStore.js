const defaults = {
    localStorage: false
};

class Model{
    constructor(params){
        this.data = {};
        this.opts = $.extend({}, defaults, params)
    }

    get(filed){
        let data = this.data[filed];
        if (!data && this.opts.localStorage) {
            data = window.localStorage[filed];
            this.set(filed, data);
        }

        return data;
    }

    set(field, data) {
        if (typeof field == 'string') {
            this.data[field] = data;
            if (this.opts.localStorage) {
                window.localStorage[field] = data;
            }
        } else {
            for (let key in field) {
                this.set(key, field[key])
            }
        }
        return this;
    }

    reset(){
        let keys = Object.keys(this.data);

        keys.forEach(k=>{
            window.localStorage.removeItem(k)
        });

        this.data = {};
    }
}

export default new Model({localStorage: true});
