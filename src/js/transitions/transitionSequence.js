import Transition from 'react-transition-group/Transition';
import React from 'react';
import ReactDOM from 'react-dom';
import anime from 'animejs';

export default class TransitionSequence extends React.PureComponent {
    constructor() {
        super()
        this.state = {
            in: true
        }
    }

    componentDidMount(){

    }

    componentWillUnmount(){
        this.setState({
            in: false
        })
    }

    onEnter(){
        this.el = ReactDOM.findDOMNode(this);
        this.targets = this.el.children;

        $(this.targets).css('opacity', 0);

        anime({
            targets: this.targets,
            opacity: 1,
            translateY: [64, 0],
            easing: 'easeOutCubic',
            duration: 600,
            delay: (el,i)=>{
                return i * 50
            }
        })
    }

    onExit(){
        anime({
            targets: this.targets,
            opacity: 0,
            translateY: 64,
            easing: 'easeOutCubic',
            duration: 600,
            delay: (el,i)=>{
                return i * 50
            }
        })
    }

    render(){
        return (
            <Transition
                ref={(el)=>{this.el = el}}
                timeout={600}
                appear={true}
                in={this.state.in}
                onExiting={this.onExit.bind(this)}
                onEntering={this.onEnter.bind(this)}
            >
                {this.props.children}
            </Transition>
        )
    }
}



