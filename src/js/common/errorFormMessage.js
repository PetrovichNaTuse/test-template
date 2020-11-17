import React from 'react';

export default props=>{
    return (
        <div className="form__error-msg">
            <p className='text-danger'>{props.message}</p>
        </div>
    )
}
