import React from 'react';
import Panel from 'common/panel';
import globalStorage from 'models/globalStore';
import utils from 'utils';
import api, {fetch} from 'api';
import router from 'router/router';
import Spinner from 'common/spinner';
import Link from 'common/link';
import WrapperComponent from 'components/WrapperComponent';
import Profile from 'components/user/Profile';
import UserCardList from 'components/user/userCardList';
import UserStatus from 'components/user/userStatus';
import TwoStepConfirmationModal from 'common/twoStepConfirmationModal';
import UserStatusLabel from 'components/user/userStatusLabel';
import UserStatusConfirm from 'components/user/userStatusConfirm';
import globalStore from "../models/globalStore";

const userInfoApi = api.userInfo;

export default class User extends React.Component {
    constructor() {
        super();

        this.state = {
            loaded: false,
            successMsg: false,
            cards: [],
            stage: 'editing',
            mode: 1,
            action_id:''
        }
    }

    componentDidMount() {
        this.loadData();
    }


    handleData(data) {
        data.birth_date = this.state.birth_date; // Get default value in case user will change its value
        data.sex = 1;
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


    setMode(mode) {
        this.setState({
            mode: parseInt(mode)
        })
    }

    onSuccess(data) {
        this.setState($.extend({
            successMsg: data && data.status != 200,
            loading: false
        }, data))
    }

    onBefore() {
        this.setState({
            successMsg: false,
            loading: true
        })
    }

    onUserModalsConfirm() {
        this.setState({
            loaded: false
        });

        this.loadData()
    }

    onClickLevelBtn(actionId){
        this.setState({action_id:actionId})
    }

    onClickConfirm(type) {
        $('#' + type).modal('show')
    }

    get formattedBirthDate() {
        let date = new Date(this.state.birth_date);
        let offsetMS = date.getTimezoneOffset() * 60 * 1000;
        let bDate = new Date(date.getTime() - offsetMS);

        return `${bDate.toLocaleDateString('RU')}`;
    }

    get cardBalance() {
        if (!this.state.cards.length) return;
        let card = this.state.cards.filter(c => c.mode == 'bonus')[0];
        return card ? card.balance : 0;
    }

    get cardInactiveBalance() {
        if (!this.state.cards.length) return;
        let card = this.state.cards.filter(c => c.mode == 'bonus')[0];
        let balance = card ? card.inactive_balance : 0;
        return this.cardBalance + balance;
    }

    getBalanceHtml() {
        if (!this.state.cards.length) return '';
        let date = new Date().getTime();
        date = date + 24 * 60 * 60 * 1000;
        return (
            <div className="user-balance mt-4">
                <div className="user-balance__active mb-3">
                    Активный баланс: <span className="u-label u-label-success g-mr-10">
                        {this.cardBalance.toLocaleString('RU')}₽
                    </span>
                </div>
                {
                <div className="user-balance__inactive mb-3">
                    Неактивный баланс: <span className="u-label u-label-info g-mr-10">
                        {this.cardInactiveBalance.toLocaleString('RU')}₽
                    </span>
                </div>
                }
                <div>
                    Уровень: <strong>{this.state.level.title}</strong><br />
                    <a
                        className="pseudo-link text-xs m-l-sm"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            this.setState({ stage: 'status' })
                        }}
                    >Изменить текущий уровень</a>
                </div>
            </div>)
    }

    render() {
        const state = this.state;
        const { loaded } = state;

        return (
            <WrapperComponent mode={1} loaded={loaded}>
                <Panel className='panel_min-height'>
                    {!state.loaded && <Spinner/>}
                    {state.loaded && <div className="row d-flex justify-content-center">
                        <div className="col-md-8">
                            {state.stage === 'editing' && this.getBalanceHtml()}
                            {state.loaded && state.stage === 'editing' &&
                                    <Profile
                                        handleData={this.handleData.bind(this)}
                                        onBefore={this.onBefore.bind(this)}
                                        onSuccess={this.onSuccess.bind(this)}
                                        formattedBirthDate={this.formattedBirthDate}
                                        onClickConfirm={this.onClickConfirm.bind(this)}
                                        {...this.state}
                                    />
                            }
                            {state.loaded && state.stage === 'status' && <UserStatus
                                user={state}
                                back={() => this.setState({ stage: 'editing' })}
                                onComplete={this.onClickLevelBtn.bind(this)}
                            />}
                        </div>
                    </div>
                    }
                </Panel>
                <TwoStepConfirmationModal
                    apiFirst={api.emailConfirm}
                    apiConfirmation={api.confirmAction}
                    title='Подтвердить Email'
                    confirmNote='Введите код, отправленный вам на почту.'
                    id='email'
                    confirmation={true}
                    onConfirm={this.onUserModalsConfirm.bind(this)}
                >
                </TwoStepConfirmationModal>
                <TwoStepConfirmationModal
                    apiFirst={api.phoneConfirm}
                    apiConfirmation={api.confirmAction}
                    title='Подтвердить телефон'
                    confirmNote='Введите код, отправленный вам на указаный телефон.'
                    id='phone'
                    confirmation={true}
                    onConfirm={this.onUserModalsConfirm.bind(this)}
                >
                    <div className="form-group">
                        <input type="number" name='phone' placeholder='Новый номер телефона' className="form-control"/>
                    </div>
                </TwoStepConfirmationModal>
                <UserStatusConfirm id='user-level-up' api={api.confirmAction}
                                   loadData={this.loadData.bind(this)} title='Подтвердите изменение уровня'
                                   setMode={this.setMode.bind(this)}
                                   actionId={this.state.action_id}/>
                <UserStatusConfirm id='user-level-prolong' api={api.confirmAction}
                                   loadData={this.loadData.bind(this)} title='Подтвердите продление уровня'
                                   setMode={this.setMode.bind(this)}
                                   actionId={this.state.action_id}/>
            </WrapperComponent>
        )
    }
}
