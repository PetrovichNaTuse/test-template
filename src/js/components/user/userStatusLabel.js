import React from 'react';

const classes = {
    1: 'label-default',
    2: 'label-gold',
    3: 'label-titan',
};

export default props=>{
    return (
        <span className={`label ${classes[props.ordering]}`}>{props.title}</span>
    )
}
