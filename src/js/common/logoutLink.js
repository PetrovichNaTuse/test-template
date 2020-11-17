import React from 'react';
import utils from 'utils';

export default props=>{
    let className = props.className || '';

    return (
        <a href="/user/logout" className={className}>{props.children}</a>
    )
}
