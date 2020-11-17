import React from 'react';
import Modal from 'common/modal';
import globalStore from 'models/globalStore';
import Spinner from 'common/spinner';
import Form from 'common/form';

export default class UserStatusConfirm extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            loading: false,
        }
    }

    onBefore(e) {
        this.setState({loading: true})
    }

    onSuccess(e) {
        this.setState({loading: false});

        if (!/400|404|500/.test(e.status)) {
            $('#' + this.props.id).modal('hide');
            this.props.setMode(1);
            this.props.loadData()
        }
    }

    render() {
        return (
            <Modal id={this.props.id} className='modal__no-mh' title={this.props.title}>
                <Form api={this.props.api} renderDetails={false} handleEmptyResponse={false}
                      onBefore={this.onBefore.bind(this)} onSuccess={this.onSuccess.bind(this)}>
                    <p>Введите проверочный код, отправленный вам на телефон.</p>
                    <input type="text" required={true} placeholder={'Цифровой код'} className={'form-control'} name={'code'}/>
                    <input type="hidden" name="action_id" value={this.props.actionId} />
                    <div className="m-t-lg mt-3 form-group">
                        <button className="btn btn-primary">Сохранить</button>
                        <button data-dismiss="modal" className="btn m-l-sm">Отмена</button>
                        {this.state.loading && <Spinner className={'spinner_form-static'}/>}
                    </div>
                </Form>
            </Modal>
        )
    }
}
