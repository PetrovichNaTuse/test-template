import React from 'react';
import Form from 'common/form';
import Modal from 'common/modal';
import api, {fetch} from 'api';

export default class TwoStepConfirmationModal extends React.PureComponent {
    constructor(props) {
        super();
        this.state = {
            confirmation: props.confirmation || false,
            action_id: ''
        }
    }

    static get defaultProps(){
        return {
            id: '',
            apiFirst: '',
            apiConfirmation: '',
            accessToken: '',
            title: '',
            confirmNote: 'Введите полученный код',
            onConfirm: ''
        }
    }

    componentDidMount(){
        let $el = $('#' + this.props.id);
        $el.on('hidden.bs.modal', this.onHideModal.bind(this))
        $el.on('show.bs.modal', this.onShowModal.bind(this))
    }

    onShowModal(){
        // Send request for confirmation code if only one step is required
        if (this.props.confirmation && this.props.apiFirst) {
            fetch(this.props.apiFirst).then((data)=>{
                this.setState({
                    confirmation:this.state.confirmation,
                    action_id:data.action_id
                })
            });
        }
    }

    onHideModal() {
        this.setState({
            confirmation: this.props.confirmation
        })
    }

    onSuccessFirstFormSent(){
        this.setState({
            confirmation: true
        })
    }

    onSuccessConfirmation(){
        $('#' + this.props.id).modal('hide');
        if (this.props.onConfirm) {
            this.props.onConfirm();
        }
    }

    render(){
        return (
            <Modal id={this.props.id} className='modal-sm' title={this.props.title}>
                {!this.state.confirmation &&
                <Form api={this.props.apiFirst} onSuccess={this.onSuccessFirstFormSent.bind(this)} renderDetails={true}>
                    {this.props.children}
                    <div className="m-t-lg form-group">
                        <button className="btn btn-primary">Сохранить</button>
                        <button data-dismiss="modal" className="btn m-l-sm">Отмена</button>
                    </div>
                </Form>
                }
                {this.state.confirmation &&
                <Form api={this.props.apiConfirmation} onSuccess={this.onSuccessConfirmation.bind(this)} renderDetails={true} handleEmptyResponse={false}>
                    <div className="form-group">
                        <input type="number" name='code' placeholder='Код' className="form-control"/>
                        <input type="hidden" name='action_id' value={this.state.action_id}/>
                        <div className='form__input-note'>{this.props.confirmNote}</div>
                    </div>
                    <div className="m-t-lg form-group">
                        <button className="btn btn-primary">Сохранить</button>
                        <button data-dismiss="modal" className="btn m-l-sm">Отмена</button>
                    </div>
                </Form>
                }
            </Modal>
        )
    }

}
