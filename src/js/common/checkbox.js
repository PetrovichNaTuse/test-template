import React from 'react';

export default props=>{
    return (
        <div className={`form-group form-check ${props.className ?  props.className : ''}`}>
            <input id={props.name} type="checkbox" className="form-check-input" name={props.name} defaultChecked={props.checked} value={props.value}/>
            <label className="form-check-label" htmlFor={props.name}>{props.children}</label>
        </div>
    )
}
