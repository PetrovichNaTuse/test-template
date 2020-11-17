import React from 'react';
import Navigation from './Navigation';

export default props => (
    <section className="g-py-100">
        <div className="container g-max-width-780 g-mb-20 g-mb-60--md">
            <div
                className="text-center text-uppercase u-heading-v5-3 u-heading-v5-color-primary u-heading-v5-rounded-50x g-mb-20">
                <h2 className="u-heading-v5__title g-line-height-1_2 g-font-weight-700 g-font-size-32 g-font-size-40--md g-bg-primary--before g-pb-40">Личный кабинет</h2>
            </div>
        </div>
        <div className="container">
            <div className='container container_limited'>
                <Navigation mode={props.mode} loaded={props.loaded} />
                {props.children}
            </div>
        </div>
    </section>
);
