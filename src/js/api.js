import {apiPath} from './appConstants';

const methods = {
    cardInfo: {
        url: `${apiPath}/loyalty/cabinet/card-validate`,
        method: 'POST',
        params: {
            pin: '',
            num: ''
        }
    },

    getSettings: {
        url: `${apiPath}/loyalty/settings/view`,
        method: 'POST'
    },

    userInfo: {
        url: `${apiPath}/loyalty/cabinet/profile-view`,
        method: 'GET',
        params: {}
    },
    updateProfile: {
        url: `${apiPath}/loyalty/cabinet/profile-update`,
        method: 'POST',
        params: {
            first_name: '',
            last_name: '',
            middle_name: '',
            sex: '',
            birth_date: ''
        }
    },
    getAccessToken: {
        url: `${apiPath}/loyalty/cabinet/get-oauth-token`,
        method: 'POST',
        params: {
            identity: '',
            password: ''
        }
    },
    passwordRecovery: {
        url: `${apiPath}/loyalty/cabinet/password-recovery`,
        method: 'POST',
        params: {
            identity: ''
        }
    },
    emailConfirm: {
        url: `${apiPath}/loyalty/cabinet/email-confirm`,
        method: 'POST',
        params: {}
    },
    phoneConfirm: {
        url: `${apiPath}/loyalty/cabinet/phone-confirm`,
        method: 'POST',
        params: {}
    },
    confirmAction:{
        url: `${apiPath}/loyalty/action/confirm`,
        method: 'POST',
        params: {
            code: '',
            action_id:'',
        }
    },
    transactionHistory: {
        url: `${apiPath}/loyalty/cabinet/transaction-history`,
        method: 'GET',
        params: {}
    },

    levelUp: {
        url: `${apiPath}/loyalty/cabinet/level-up`,
        method: 'POST',
        params: {
            prolongation: ''
        }
    },

    levelProlong: {
        url: `${apiPath}/loyalty/cabinet/level-prolong`,
        method: 'POST',
        params: {}
    },

    addFriend: {
        url: `${apiPath}/loyalty/cabinet/add-friend`,
        method: 'POST',
        params: {
            first_name: '',
            birth_date: ''
        }
    },

    addCard: {
        url: `${apiPath}/loyalty/cabinet/add-card`,
        method: 'POST',
        params: {
            num: '',
            pin: ''
        }
    },

    getAddresses: {
        url: `${apiPath}/`,
        method: 'GET'
    },

    createAddress: {
        url: `${apiPath}/loyalty/cabinet/address-create`,
        method: 'POST',
        params: {
            address: {
                name: '',
                short_name: '',
                region: '',
                country: '',
                lat: 0,
                long: 0,
                city_type: '',
                city: '',
                street_type: '',
                street: '',
                house: '',
                build: '',
                struct: '',
                construction: '',
                qc_geo: ''
            },
            entrance: '',
            floor: '',
            apartment: '',
            title: '',
            additional_info: {
                any_vary_data: ''
            }
        }
    },

    deleteAddress: {
        url: `${apiPath}/loyalty/cabinet/address-delete`,
        method: 'POST',
        params: {
            id: ''
        }
    }
};

export default methods;

export function fetch(name, params) {
    let method = typeof name == 'string' ? methods[name] : name;

    if (!method) {
        console.warn('Нет метода ', name);
        return;
    }

    let headers = Object.assign({}, method.csrf ? {'csrf-token': window.CSRF_TOKEN} : {})

    return $.ajax({
        url: `${method.url}`,
        cache: false,
        contentType: 'application/json',
        headers: headers,
        method: method.method,
        data: method.method == 'POST' ? JSON.stringify($.extend({}, method.params, params)) : $.extend({}, method.params, params)
    })
}
