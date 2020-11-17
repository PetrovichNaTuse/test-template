import React from 'react';
import utils from 'utils';
import {transactionTypes} from 'appConstants';

export default class OrdersRow extends React.PureComponent {
    constructor(){
        super()
    }

    componentDidMount(){
        this.initTooltip();
    }

    initTooltip(){
        $('[data-toggle="tooltip"]', this.refs.el).tooltip();
    }

    get customerName(){
        const props = this.props.customer;
        if (!props) {
            return 'Неизвестный покупатель'
        }
        return `${props.first_name} ${props.last_name} ${props.middle_name}`;
    }

    get balanceClassName(){
        const balance = this.props.balance_increment;
        let _class = '';
        if (balance > 0) {
            _class += ' text-success'
        } else if (balance < 0) {
            _class += ' text-danger'
        }
        return _class
    }

    get isShouldShowPopup(){
        return this.props.balance_active_date * 1000 > new Date().getTime();
    }

    get balancePopup(){
        return `Баллы будут начислены ${utils.getLocalDateFromUnix(this.props.balance_active_date)}`
    }

    render(){
        let props = this.props,
            balanceNegative = props.balance_down,
            balancePositive = props.balance_up;

        return (
            <tr ref='el'>
                <td>
                    {transactionTypes[props.type]}
                    {props.comment &&
                        <div className='orders-table__comment'>Комментарий: {props.comment}</div>
                    }
                </td>
                <td>
                    {(props.type == 'purchase' || props.type === 'return') &&
                        <span>
                            {props.total_cost}&nbsp;
                            {props.discount_value > 0 ? <small>скидка {props.discount_value} ({props.discount_percent}%)</small> : ''}
                        </span>
                    }
                </td>
                <td>
                    {balanceNegative !== 0 &&
                    <span className='u-label u-label-danger'>
                        {balanceNegative}
                    </span>
                    }
                    {balancePositive !== 0 &&
                    <span
                        className={`u-label ${this.isShouldShowPopup ? 'u-label-default' : 'u-label-success'}`}
                        data-toggle={this.isShouldShowPopup ? "tooltip" : false}
                        data-placement="top"
                        title={this.isShouldShowPopup ? this.balancePopup : false}
                    >
                        {balancePositive}
                    </span>
                    }
                </td>
                <td>{props.card && props.card.num ? props.card.num : ''}</td>
                <td>{utils.getLocalDateFromUnix(props.date)}</td>
            </tr>
        )
    }
}
