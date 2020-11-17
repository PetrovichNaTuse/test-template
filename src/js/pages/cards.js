import React from 'react';
import md5 from 'md5';
import api, {fetch} from 'api';
import globalStorage from 'models/globalStore';
import router from 'router/router';
import Panel from 'common/panel';
import Spinner from 'common/spinner';
import Modal from 'common/modal';
import WrapperComponent from 'components/WrapperComponent';
import utils from 'utils';
import {cardStatus} from 'appConstants';

const modesTitle = {
    discount: 'Дисконтная',
    bonus: 'Бонусная',
};

const userInfoApi = api.userInfo;

export default class UserCardList extends React.PureComponent {
    constructor() {
        super()

        this.state = {
            loaded: false,
            cards: [],
            cardNumber: '',
            cardPin: '',
            cardLoaded: true,
            message: ''
        }
    }


    componentDidMount() {
        this.loadData();
    }

    loadData(token) {
        return $.when(fetch(userInfoApi)).then(data => {
            this.setState($.extend({
                loaded: true,
            }, data))
        }).fail(data => {
            globalStorage.reset();
            router.navigate('/login')
        })
    }

    numberValidation(value) {
        return isFinite(value) && value.split('.').length === 1;
    }

    onChangeNumber(e) {
        const value = e.target.value;

        if (!this.numberValidation(value)) return;

        this.setState({ cardNumber: value });
    }

    onChangePin(e) {
        const value = e.target.value;

        if (!this.numberValidation(value)) return;

        this.setState({ cardPin: value });
    }

    addCard(e) {
        e.preventDefault();
        this.setState({ cardLoaded: false, message: '' });

        $.when(fetch(api.addCard, {
            num: this.state.cardNumber,
            pin: md5(this.state.cardPin)
        }))
            .then(data => {
                this.setState({ cardLoaded: true, message: '' });
                $('#add-card-prompt').modal('hide');
            }).fail(err => {
                this.setState({ cardLoaded: true});
                if (err.status != 200) {
                    let json = err.responseJSON;
                    let message = json && json.message ? json.message : 'Произошла ошибка, попробуйте позже.';
                    this.setState({ message });
                    return;
                }
            })
    }

    get rows() {
        return this.state.cards.map(card => {
            return (
                <tr className='user-cards-table__row' key={`card-num-row-${card.num}-${card.mode}`}>
                    <td>
                        <strong>{card.num}</strong>
                        <div>{modesTitle[card.mode]}</div>
                    </td>
                    <td>{utils.getLocalDateFromUnix(card.date_activated)}</td>
                    <td>{utils.getLocalDateFromUnix(card.date_expired)}</td>
                    <td><span className={`u-label ${['blocked', 'inactive'].includes(card.state) ? 'u-label-danger' : 'u-label-success'}`}>{cardStatus[card.state]}</span></td>
                </tr>
            )
        })
    }

    render() {
        return (
            <WrapperComponent mode={2} loaded={this.state.loaded}>
                <Panel className='panel_min-height'>
                    {!this.state.loaded && <Spinner/>}
                    {this.state.loaded &&
                        <div className="table-responsive">
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Номер карты</th>
                                        <th>Дата активации</th>
                                        <th>Действует до</th>
                                        <th>Статус</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.rows}
                                </tbody>
                            </table>
                        </div>
                    }
                    {this.state.loaded && <button className="btn btn-primary rounded-0 mt-3" onClick={() => $('#add-card-prompt').modal('show')}>Добавить</button>}
                </Panel>
                <Modal
                    id='add-card-prompt'
                    title='Добавить новую карту'
                >
                    <form className="g-brd-gray-light-v4" onSubmit={this.addCard.bind(this)}>
                        <div className="form-group g-mb-25">
                            <label htmlFor="cardNumber">Номер карты</label>
                            <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                placeholder="Num"
                                className="form-control rounded-0 form-control-md"
                                value={this.state.cardNumber}
                                onChange={this.onChangeNumber.bind(this)}
                            />
                        </div>
                        <div className="form-group g-mb-25">
                            <label htmlFor="cardPin">Пин-код карты</label>
                            <input
                                type="password"
                                id="cardPin"
                                name="cardPin"
                                placeholder="Pin"
                                className="form-control rounded-0 form-control-md"
                                value={this.state.cardPin}
                                onChange={this.onChangePin.bind(this)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary rounded-0" disabled={!this.state.cardLoaded}>Добавить</button>
                        {!this.state.cardLoaded && <Spinner className={'spinner_form-static'}/>}
                        {this.state.message && <div className="form__error-msg">
                            <p className="text-danger mb-0 mt-3">{this.state.message}</p>
                        </div>}
                    </form>
                </Modal>
            </WrapperComponent>
        );
    }
};
