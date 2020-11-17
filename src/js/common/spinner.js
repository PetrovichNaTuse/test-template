import React from 'react';
import utils from 'utils';

export default class Spinner extends React.PureComponent {
    constructor() {
        super()
    }

    static get defaultProps() {
        return {
            static: false,
            size: 64,
            style: {}
        }
    }

    get style() {
        const props = this.props;

        let defaults = {
            width: props.size,
            height: props.size,
            position: props.static ? 'static' : 'absolute'
        };

        return $.extend({}, defaults, props.style);
    }


    render() {
        const props = this.props;
        return (
            <div className={`spinner ${props.className ? props.className : ''}`} style={this.style}>
                <img src="/profile/img/svg/spinner.svg" alt=""/>
            </div>
        )
    }
}
