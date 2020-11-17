import React from 'react';
import globalStorage from 'models/globalStore';
import Spinner from 'common/spinner';
import {userStatuses} from 'appConstants';
import api, {fetch} from "api";
import utils from 'utils';

const statuses = window.APP_SETTINGS.levels.sort((a, b) => {
    if (a.ordering > b.ordering) return 1;
    return -1;
});
const minStatusOrdering = statuses[0].ordering;
const maxStatusOrdering = statuses[statuses.length - 1].ordering;

const bonusesNoun = utils.getNoun('балл', 'балла', 'баллов');
const notEnoughBonusesNoun = utils.getNoun('балла', 'баллов', 'баллов');
const monthsNoun = utils.getNoun('месяц', 'месяца', 'месяцев');

export default class UserStatus extends React.PureComponent {
    constructor(props) {
        super();

        this.state = {
            confirmation: false,
            loading: false,
            error: null,
            action_id:'',
        };
    }

    validateLevelUpBalance(nextStatus) {
        if (!nextStatus) return;
        if (!this.props.user.cards.length) return 0;

        const restBalance = Math.ceil(this.props.user.cards[0].total_balance - nextStatus.activation_cost);
        if (restBalance < 0) {
            return -restBalance;
        }
    }

    validateLevelProlongBalance() {
        if(!this.props.user.cards.length) return 0;

        const restBalance = Math.ceil(this.props.user.cards[0].total_balance - this.props.user.level.renewal_cost);
        if (restBalance < 0) {
            return -restBalance;
        }
    }

    validateLevelUp(nextStatus) {
        if (this.props.user.cards.length) {
            const balance = this.props.user.cards[0].total_balance;
            if (!nextStatus) {
                return 'У вас уже максимальный уровень'
            } else if (balance - nextStatus.activation_cost < 0) {
                return 'Недостаточно средств для повышения уровня'
            }
        } else {
            return 'Вы не имеете активных карт';
        }
    }

    validateLevelProlong() {
        const curStatus = this.props.user.level;
        if (this.props.user.cards.length) {
            const balance = this.props.user.cards[0].total_balance;
            if (curStatus.ordering === minStatusOrdering) {
                return 'Минимальный уровень является бессрочным';
            } else if (balance - curStatus.renewal_cost < 0) {
                return 'Недостаточно средств для продления уровня';
            }
        } else {
            return 'Вы не имеете активных карт';
        }
    }

    levelApiReq(apiReq, modal) {
        if (this.state.loading) return;
        this.setState({loading: true});
        $.when(fetch(apiReq)).then(data => {
            this.setState({loading: false, error: null,action_id: data.action});
            this.props.onComplete(data.action_id)
            $(modal).modal('show');
        }).fail(err => {
            this.setState({loading: false});
            if (err.status != 200) {
                let json = err.responseJSON;
                let message = json && json.message ? json.message : 'Произошла ошибка, попробуйте позже.';
                this.setState({error: message});
                return;
            }
            $(modal).modal('show');
        })
    }

    onSubmit(e, validate, handler) {
        e.preventDefault();
        let err = validate();
        if (err) {
            this.setState({error: err});
            return;
        }
        handler();
    }

    render() {
        const user = this.props.user;
        const curStatus = user.level;
        const ordering = curStatus.ordering;
        const nextStatus = statuses && statuses.find(s => s.ordering > ordering);

        const months = utils.getMonths(curStatus.min_duration);
        const levelExpirationDate = utils.getLocalDateFromUnix(user.level_expiration_date);

        const levelProlongCost = curStatus.renewal_cost;
        const levelUpCost = nextStatus && nextStatus.activation_cost;
        const validateLevelProlongBalance = this.validateLevelProlongBalance();
        const validateLevelUpBalance = this.validateLevelUpBalance(nextStatus);

        return (
            <div>
                <div className="d-list__row" style={{'marginBottom': '35px'}}><span>Ваш текущий уровень -</span>&nbsp;
                    <strong>{user.level.title}&nbsp;</strong>
                    {ordering === maxStatusOrdering && <strong>(Максимальный)&nbsp;</strong>}
                    <em>({ordering === minStatusOrdering ? 'бессрочный' : 'истекает ' + levelExpirationDate})</em>.
                </div>

                {ordering !== maxStatusOrdering &&
                <form style={{'display': 'flex', 'alignItems': 'center', 'marginBottom': '20px'}}
                      onSubmit={(e) =>
                          this.onSubmit(e, this.validateLevelUp.bind(this, nextStatus), this.levelApiReq.bind(this, api.levelUp, '#user-level-up'))}>
                    <button className="btn btn-primary"
                            style={{
                                'marginRight': '30px',
                                'flexBasis': '96px',
                                'flexShrink': 0,
                                'justifyContent': 'center'
                            }}
                            disabled={this.state.loading || !!validateLevelUpBalance}>Повысить
                    </button>
                    {!validateLevelUpBalance ?
                        <span>
                            <span>Повысить уровень до </span>
                            <strong>{nextStatus.title}.</strong>
                            <span style={{'color': '#B22222'}}>
                                <span> Будет списано </span>
                                <strong>{levelUpCost}</strong>
                                <span> {bonusesNoun(levelUpCost)}.</span>
                            </span>
                        </span> :
                        <span>
                            <span> Для повышения уровня до </span>
                            <strong>{nextStatus.title}</strong>
                            <span> недостаточно </span>
                            <strong>{validateLevelUpBalance}</strong>
                            <span> {notEnoughBonusesNoun(validateLevelUpBalance)}.</span>
                            </span>}
                </form>}

                {ordering !== minStatusOrdering &&
                <form style={{'display': 'flex', 'alignItems': 'center', 'marginBottom': '20px'}}
                      onSubmit={(e) =>
                          this.onSubmit(e, this.validateLevelProlong.bind(this), this.levelApiReq.bind(this, api.levelProlong, '#user-level-prolong'))}>
                    <button className="btn btn-primary"
                            style={{
                                'marginRight': '30px',
                                'flexBasis': '96px',
                                'flexShrink': 0,
                                'justifyContent': 'center'
                            }}
                            disabled={this.state.loading || !!validateLevelProlongBalance}>Продлить
                    </button>
                    {!validateLevelProlongBalance ?
                        <span>
                                <span>Продление уровня сроком на </span>
                                <strong>{`${months} ${monthsNoun(months)}`}.</strong>
                                <span style={{'color': '#B22222'}}><span> Будет списано </span>
                                <strong>{levelProlongCost} </strong>
                                <span>{bonusesNoun(levelProlongCost)}.</span>
                            </span>
                            </span> :
                        <span>
                                <span> Для продления уровня сроком на </span>
                                <strong>{`${months} ${monthsNoun(months)}`}</strong>
                                <span> недостаточно </span>
                                <strong>{validateLevelProlongBalance}</strong>
                                <span> {notEnoughBonusesNoun(validateLevelProlongBalance)}.</span>
                            </span>}
                </form>}
                <a className="pseudo-link text-xs m-l-sm" href="#" onClick={(e) => {
                    e.preventDefault();
                    this.props.back();
                }}>Вернуться</a>

                {this.state.loading && <Spinner className={'spinner_form-static m-l-sm'}/>}
                {this.state.error && <div className={'text-danger m-t-sm'}>{this.state.error}</div>}
            </div>
        )
    }
}
