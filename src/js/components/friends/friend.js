import React from 'react';
import utils from 'utils';
import formSerialize from 'form-serialize';
import Form from 'common/form';
import globalStore from 'models/globalStore';
import DatepickerInput from 'common/datepickerInput';
import Spinner from 'common/spinner';
import api, {fetch} from 'api';
import allOff from 'event-emitter/all-off';
import Modal from 'common/modal';
import ee from 'event-emitter';


export default class FriendItem extends React.PureComponent {
    constructor(props) {
        super();
        this.ee = ee();

        this.state = {
            loading: false,
            added: props.first_name
        }
    }

    componentDidMount(){
        this.ee.on('isValid', this.onValidate.bind(this))
        this.props.ee.on(`saveFriend`, this.onSaveFriend.bind(this))
    }

    componentWillUnmount(){
        allOff(this.ee)
    }

    dataFunction(data) {
        if (data.birth_date) {
            data.birth_date = utils.getApiDate(new Date(parseInt(data.birth_date)));
        }

        this.setState({
            birth_date: data.birth_date
        })
    }

    onSaveFriend(id){
        if (id == this.props.id) {
            this.ee.emit('submit',{noValidation: true});
            $(this.props.modal).modal('hide')
        }
    }

    onBefore(){
        this.setState({loading: true})
    }

    onSuccess(e) {
        if (e && /400|404|500/.test(e.status)) {
            this.setState({
                loading: false
            })
            return
        }

        this.setState({
            loading: false,
            added: true
        });
    }

    onValidate(isValid, data){
        if (!isValid) return;

        this.props.setCurrentFriend(data).then(()=>{
            $(this.props.modal).modal('show')
        })
    }

    onClickAdd(e) {
        e.preventDefault();
        this.ee.emit('validate');
    }

    get isAdded(){
        return this.state.added;
    }

    render(){
        const props = this.props;

        return (
            <Form className="form-inline mb-3"
                  api={api.addFriend}
                  allRequired={true}
                  dataFunction={this.dataFunction.bind(this)}
                  handleEmptyResponse={false}
                  onSuccess={this.onSuccess.bind(this)}
                  emitter={this.ee}
                  manualSubmit={true}
                  onBefore={this.onBefore.bind(this)}
            >

                <div className="form-group mb-2">
                    <input
                        type="text"
                        readOnly={this.isAdded}
                        name="first_name"
                        defaultValue={props.first_name}
                        className="form-control"
                        placeholder="Имя"
                    />
                </div>
                    {this.isAdded ?
                        <div className="form-group mx-sm-3 mb-2">
                            <input
                                type="text"
                                className="form-control"
                                readOnly={this.isAdded}
                                name="birth_date"
                                defaultValue={utils.getLocalDateFromApi(props.birth_date) || utils.getLocalDateFromApi(this.state.birth_date)}
                                id="exampleInputFirstName" />
                        </div>
                        :
                        <div className="form-group mx-sm-3 mb-2">
                            <DatepickerInput className='form-control rounded-0' name={'birth_date'} placeholder={'Дата рождения'} defaultValue={props.birth_date ? new Date(props.birth_date).getTime() : ''} readOnly={false} />
                        </div>
                    }
                <input type="hidden" name={'id'} value={this.props.id}/>
                {!this.isAdded && !this.state.loading &&
                <button
                    className="btn btn-primary mb-2"
                    onClick={(e)=>this.onClickAdd(e)}
                >Подтвердить</button>
                }
                {
                    this.state.loading &&
                    <Spinner className="spinner_form-static" style={{marginTop: '8px'}}/>
                }
            </Form>
        )
    }
}
