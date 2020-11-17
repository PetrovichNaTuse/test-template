import React from 'react';

export default class Modal extends React.PureComponent {
    constructor(){
        super()
    }

    static get defaultProps(){
        return {
            id: '',
            title: '',
            className: ''
        }
    }

    render(){
        return (
            <div tabIndex="-1" role="dialog" className="modal fade" id={this.props.id}>
                <div role="document" className={`modal-dialog ${this.props.className ? this.props.className : ''}`}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{this.props.title}</h4>
                            <button type="button" data-dismiss="modal" aria-label="Close" className="close"><span aria-hidden="true">×</span></button>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
