import React from 'react';

export default props => {
    return (
        <div className={`panel ${props.className ? props.className : ''}`}>
            {props.title && <h2 className="panel-heading mb-3">{props.title}</h2>}
            <div className="panel-body">
                {props.children}
            </div>
        </div>
    );
};
