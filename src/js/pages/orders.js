import React from 'react';
import Panel from 'common/panel';
import utils from "utils";
import api, {fetch} from 'api';
import globalStore from 'models/globalStore';
import Spinner from 'common/spinner';
import Paginator from 'common/paginator';
import ee from 'event-emitter';
import WrapperComponent from 'components/WrapperComponent';
import OrdersRow from 'components/orders/ordersRow';
import Link from 'common/link';
import router from 'router/router';

export default class Orders extends React.Component {
    constructor() {
        super();
        this.state = {
            loaded: false, // initial loading status
            items: [],
        };

        this.events = ee();
        this.bindEvents();
    }

    componentDidMount(){
    }

    bindEvents(){
        this.events.on('loading', this.onLoading.bind(this));
        this.events.on('loaded', this.onLoaded.bind(this));
    }

    onLoaded(data){
        this.setState({
            loaded: true,
            loading: false,
            items: data
        })
    }

    onLoading(){
        this.setState({loading: true})
    }

    get orders(){
        return this.state.items.map((item,i)=>{
            return <OrdersRow {...item} key={`order-${item.id}`}/>
        })
    }

    render(){
        return (
            <WrapperComponent mode={4} loaded={this.state.loaded}>
                <Panel className='panel_min-height'>
                    {this.state.loading && <Spinner className={'spinner_shadow'} />}
                    {this.state.loaded &&
                        <div className="table-responsive">
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>Тип</th>
                                        <th>Сумма заказа</th>
                                        <th>Баланс (+/-)</th>
                                        <th>Карта</th>
                                        <th>Дата</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.orders}
                                </tbody>
                            </table>
                        </div>
                    }
                    <Paginator
                        keyPrefix='orders-paginator-'
                        api={api.transactionHistory}
                        pageToShow={7}
                        emitter={this.events} />
                </Panel>
            </WrapperComponent>
        )
    }
}
