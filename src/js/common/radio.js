import React from 'react';

export default props=>{
    return (
        <div className={`checkbox ${props.className ?  props.className : ''} ${props.disabled ? 'checkbox__disabled' : ''}`}>
            <label className="js-radio">
                <input type="radio"
                       name={props.name}
                       defaultChecked={props.checked}
                       value={props.value}
                       onChange={(e)=>{props.onChange ? props.onChange(e) : ''}}
                       disabled={props.disabled}/>
                <span className="cr">
                    <span className="cr-icon"></span>
                </span>
                {props.children && <span className="checkbox__text" dangerouslySetInnerHTML={{__html: props.children}}></span>}
            </label>
        </div>
    )
}

