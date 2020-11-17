import React from 'react';
import utils from 'utils';
import {cardStatus} from 'appConstants';

const modesTitle = {
    discount: 'Дисконтная',
    bonus: 'Бонусная',
};

export default class UserCardList extends React.PureComponent {
    constructor() {
        super()
    }

    static get defaultProps() {
        return {
            cards: []
        }
    }

    get rows() {
        return this.props.cards.map(card => {
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
            <div className='user-cards-table'>
                {this.props.getBalanceHtml()}
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
            </div>
        );
    }
};
