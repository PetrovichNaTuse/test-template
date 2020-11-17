import React from 'react';
import router from 'router/router';

const modeTitles = [
    {label: 'Профиль', mode: 1, goto: 'user', visibleInModes: [2]},
    {label: 'Мои карты', mode: 2, goto: 'cards', visibleInModes: [1, 3]},
    {label: 'Мои друзья', mode: 3, goto: 'friends', visibleInModes: [1, 3]},
    {label: 'История покупок', mode: 4, goto: 'orders', visibleInModes: [1, 3]},
    {label: 'Мои адреса', mode: 5, goto: 'addresses', visibleInModes: [1, 3]},
];

export default (props) => (
    <ul className="nav nav-pills nav-fill g-mb-30">
        {modeTitles.map(title => {
            return (
                <li className="nav-item" key={title.label}>
                    <a
                        href="#"
                        data-navigo
                        className={`nav-link m-l ${title.mode == props.mode ? 'active' : ''}`}
                        data-mode={title.mode}
                        data-goto={title.goto}
                        onClick={(event) => {
                            event.preventDefault();

                            if (typeof props.loaded === 'boolean' && !props.loaded) return;

                            return router.navigate(router.generate(title.goto));
                        }}
                    >{title.label}</a>
                </li>
            )
        })}
    </ul>
);
