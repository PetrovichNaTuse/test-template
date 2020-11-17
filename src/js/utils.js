import globalStore from "./models/globalStore";
import router from 'router/router';
import {urlPrefix} from 'appConstants';
import dateformat from 'dateformat';
import api, {fetch} from "./api";

export default {
    randomInt(from, to) {
        return Math.floor(this.random(from, to));
    },
    random(from, to) {
        return Math.random() * (to - from) + from;
    },
    fillForm(el, data) {
        for (let key in data) {
            let val = data[key];
            let $el = $(`[name=${key}]`, el);
            let type = $el[0].nodeName.toLowerCase();

            if (type == 'input') {
                type = $el.attr('type')
            }

            switch (type) {
                case 'text':
                case 'password':
                case 'email':
                case 'hidden':
                    if ($el.data('datepicker')) {
                        $el.data('datepicker').selectDate(new Date(val));
                        break;
                    }
                    $el.val(val);
                    break;
                case 'radio':
                    if (val) {
                        $el.filter(`[value="${val}"]`).prop('checked', true).trigger('change')
                    }
                    break;
                case 'checkbox':
                    if (val) {
                        $el.filter(`[value="${val}"][name="${key}"]`).prop('checked', true).trigger('change')
                    }
                    break;
            }
        }
    },

    randomSeries(len) {
        let result = '';
        while (len--) {
            result += this.randomInt(0, 9);
        }
        return result;
    },

    loadUserInfo(token) {
        return $.when(fetch(api.userInfo)).fail(data => {
            globalStore.reset();
            router.navigate('/login')
        })
    },

    getLocalDateFromUnix(timestamp) {
        if (!timestamp) return;
        return new Date(timestamp * 1000).toLocaleDateString('RU', {day: '2-digit', month: '2-digit', year: 'numeric'})
    },
    getLocalDateFromApi(date) {
        if (!date) return;
        return new Date(date).toLocaleDateString('RU', {day: '2-digit', month: '2-digit', year: 'numeric'})
    },

    logout(route) {
        globalStore.reset();
        router.navigate(router.generate(route || 'home'));
    },

    getUrl(str) {
        return `${urlPrefix}/${str}`
    },

    getApiDate(date) {
        let dateObj = typeof date == 'object' ? date : new Date(parseInt(date));

        return dateformat(dateObj, 'yyyy-mm-dd')
    },

    get root() {
        return document.querySelector('#root')
    },

    getNoun(one, two, five) {
        return function (number) {
            let n = Math.abs(number);
            n %= 100;
            if (n >= 5 && n <= 20) {
                return five;
            }
            n %= 10;
            if (n === 1) {
                return one;
            }
            if (n >= 2 && n <= 4) {
                return two;
            }
            return five;
        }
    },

    getMonths(num) {
        return Math.round(num / 30)
    }
}
