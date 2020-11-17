import React from 'react';
import router from 'router/router';


let ctrl = false;
const $window = $(window);

export default class Link extends React.Component {
    constructor() {
        super()
    }

    onClick(e) {
        let nativeEvent = e.nativeEvent;
        if (nativeEvent.defaultPrevented) return;

        if (ctrl) return true;
        e.preventDefault();
        router.navigate(this.props.href)
    }
    render() {
        return (
            <a
                ref='el'
                href={this.props.href}
                className={this.props.className}
                style={this.props.style}
                onClick={(e)=>this.onClick(e)}
            >{this.props.children}</a>
        )
    }
}

$window.on('keydown', function (e) {
    ctrl = e.which == 17;
});

$window.on('keyup', function (e) {
    ctrl = false;
});

