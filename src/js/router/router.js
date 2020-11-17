import Navigo from 'navigo';
import React from 'react';
import ReactDOM from 'react-dom';
import utils from 'utils';
//import globalStore from 'models/globalStore';

function mountComponent(name, params) {
    System.import(`pages/${name}.js`).then(el => {
        const Component = el.default;
        ReactDOM.render(<Component {...params} />, utils.root)
    })
}

const router = new Navigo();

export function initRouter() {
    router.on({
        '/user/profile': {
            as: 'user',
            uses: (params) => mountComponent('user', params)
        },
        '/user/profile/cards': {
            as: 'cards',
            uses: (params) => mountComponent('cards', params)
        },
        '/user/profile/family': {
            as: 'friends',
            uses: (params) => mountComponent('friends', params)
        },
        '/user/profile/orders': {
            as: 'orders',
            uses: (params) => mountComponent('orders', params)
        },
        '/user/profile/addresses': {
            as: 'addresses',
            uses: (params) => mountComponent('addresses', params)
        }
    }).resolve();
}
export default router;
