import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import api, {fetch} from 'api';
import router from 'router/router';
import globalStorage from 'models/globalStore';

import WrapperComponent from 'components/WrapperComponent';
import Panel from 'common/panel';
import Modal from 'common/modal';
import Spinner from 'common/spinner';

const userInfoApi = api.userInfo;

export default class Addresses extends React.PureComponent {
    constructor() {
        super()

        this.state = {
            loaded: false,
            addressInfo: {},
            addresses: [],
            disabled: {},
            createAddressLoaded: false,
            createAddressMessage: ''
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

    changeAddress(addressInfo = {}) {
        this.setState({ addressInfo });
    }

    createAddress() {
        const address = this.state.addressInfo.data || {};
        this.setState({
            createAddressLoaded: true,
            createAddressMessage: ''
        });

        $.when(fetch(api.createAddress, {
            address: {
                name: this.state.addressInfo.value,
                short_name: this.state.addressInfo.value,
                region: address.region,
                country: address.country,
                lat: address.geo_lat,
                long: address.geo_lon,
                city_type: address.city_type,
                city: address.city,
                street_type: address.street_type,
                street: address.street,
                house: address.house,
                build: '',
                struct: '',
                construction: '',
                qc_geo: address.qc_geo
            },
            entrance: this.state.entrance,
            floor: this.state.floor,
            apartment: this.state.apartment,
            title: address.house_type_full || ''
        }))
            .then(data => {
                $('#create-address-prompt').modal('hide');
                this.setState({
                    addresses: [data, ...this.state.addresses],
                    createAddressLoaded: false
                })
            }).fail(err => {
                this.setState({
                    createAddressLoaded: false,
                    createAddressMessage: err.responseJSON.message
                });
            })
    }

    deleteAddress(id) {
        this.setState({ disabled: Object.assign({}, this.state.disabled, { [id]: true }) });

        $.when(fetch(api.deleteAddress, { id }))
            .then(data => {
                $('#create-address-prompt').modal('hide');
                this.setState({ addresses: this.state.addresses.filter(address => address.id !== id) })
            }).fail(err => {
                this.setState({ disabled: Object.assign({}, this.state.disabled, { [id]: false }) });
            })
    }

    render() {
        return (
            <WrapperComponent mode={5} loaded={this.state.loaded}>
                <Panel className='panel_min-height'>
                    {!this.state.loaded && <Spinner/>}
                    {this.state.loaded && !this.state.addresses.length && <p className="lead">Нет адресов</p>}
                    {this.state.loaded && this.state.addresses.length &&
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <tbody>
                                    {this.state.addresses.map((address, i) => {
                                        return (
                                            <tr key={address.id}>
                                                <td>{++i}</td>
                                                <td>{address.address.name}</td>
                                                <td className="d-flex justify-content-end">
                                                    {!this.state.disabled[address.id] && <button
                                                        className="btn btn-primary"
                                                        disabled={this.state.disabled[address.id]}
                                                        onClick={() => this.deleteAddress(address.id)}
                                                     ><i className="fa fa-trash" aria-hidden="true"></i></button>
                                                    }
                                                    {this.state.disabled[address.id] && <Spinner className="spinner_form-static" />}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    }
                    {this.state.loaded && <button
                        className="btn btn-primary rounded-0 mt-3"
                        disabled={this.state.createAddressLoaded}
                        onClick={() => $('#create-address-prompt').modal('show')}
                    >Добавить</button>}
                </Panel>
                <Modal
                    id='create-address-prompt'
                    title='Введите адрес'
                >
                    <AddressSuggestions
                        token="79c9bc520b5c55cf63705bf9179e642f5515e8e7"
                        type="ADDRESS"
                        inputProps={{
                            className: "form-control rounded-0 form-control-md"
                        }}
                        // suggestionsClassName="" // блок с подсказками
                        // suggestionClassName="btn btn-secondary btn-lg btn-block g-mr-10 g-mb-15" // блок с подсказкой
                        // currentSuggestionClassName="" // текущая выделенная подсказка
                        onChange={this.changeAddress.bind(this)}
                    />
                    <div className="form-group row g-mb-25">
                        <div className="col-md-4 g-mt-10">
                            <label className="form-control-label" htmlFor="apartment">Квартира</label>
                            <input id="apartment" className="form-control rounded-0 form-control-md" type="text" onChange={(e) => this.setState({ apartment: e.target.value })} />
                        </div>
                        <div className="col-md-4 g-mt-10">
                            <label className="form-control-label" htmlFor="floor">Этаж</label>
                            <input id="floor" className="form-control rounded-0 form-control-md" type="text" onChange={(e) => this.setState({ floor: e.target.value })} />
                        </div>
                        <div className="col-md-4 g-mt-5 g-mt-10">
                            <label className="form-control-label" htmlFor="entrance">Подъезд</label>
                            <input id="entrance" className="form-control rounded-0 form-control-md" type="text" onChange={(e) => this.setState({ entrance: e.target.value })} />
                        </div>
                    </div>
                    {this.state.createAddressMessage && <p className="text-danger">{this.state.createAddressMessage}</p>}
                    <div className={'m-t-lg mt-3'}>
                        <button className='btn btn-primary' disabled={this.state.createAddressLoaded} onClick={()=> this.createAddress()}>Создать</button>
                        <button className='btn m-l-sm' disabled={this.state.createAddressLoaded} data-dismiss="modal" onClick={(e)=> $('#create-address-prompt').modal('hide')}>Отмена</button>
                        {this.state.createAddressLoaded && <Spinner className="spinner_form-static" />}
                    </div>
                </Modal>
            </WrapperComponent>
        );
    }
}
