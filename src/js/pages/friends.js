import React from 'react';
import router from 'router/router';
import Panel from 'common/panel';
import utils from 'utils';
import Spinner from 'common/spinner';
import Link from 'common/link';
import WrapperComponent from 'components/WrapperComponent';
import Friend from 'components/friends/friend';
import Modal from 'common/modal';
import ee from 'event-emitter';

let friendsId = 1;

const maxFriends = APP_SETTINGS.max_customer_friends;

export default class Friends extends React.PureComponent {
    constructor() {
        super();

        this.state = {
            friends: [],
            currentFriend: {},
            loaded: false
        }
    }

    componentDidMount(){
        this.loadData();
        this.ee = ee();
    }

    loadData(token){
        this.setState({loading: true});
        $.when(utils.loadUserInfo()).then(data=>{
            if (data.friends.length) {
                data.friends = data.friends.map(f=>{
                    f.id = friendsId++;
                    return f;
                })
            }

            this.setState(Object.assign({
                loaded: true,
                loading: false
            }, data));
        })
    }

    addFriend(){
        let friends = this.state.friends;

        friends = friends.concat([{
            id: friendsId++,
            name: null,
            birth_date: null
        }]);

        this.setState({
            friends: friends
        })
    }

    setCurrentFriend(data){
        const deferred = $.Deferred();

        let currentFriend = Object.assign({}, data);

        this.setState({
            currentFriend: currentFriend
        },state=>{
            deferred.resolve();
        });

        return deferred;
    }

    onClickAdd(e) {
        e.preventDefault();
        this.addFriend()
    }

    onClickSave(e){
        e.preventDefault();
    }

    onClickConfirm(e) {
        this.ee.emit(`saveFriend`,this.state.currentFriend.id)
    }

    onClickCancel(e){

    }

    get emptyMessage(){
        return (
            <div className="friends__empty-msg">
               <p>У вас пока не добавлено ни одного члена семьи.</p>
                <span className={'btn btn-primary'} onClick={(e)=>this.onClickAdd(e)} >
                    Добавить
                </span>
            </div>
        )
    }

    get friends(){

    }

    render(){
        return (
            <WrapperComponent mode={3} loaded={this.state.loaded}>
                <Panel className='panel_min-height'>
                    {this.state.loading && <Spinner />}
                    {this.state.loaded &&
                        <div>
                            {this.state.friends.length === 0 && this.emptyMessage}
                            {this.state.friends.length !== 0 &&
                            <div className={'friends-list'}>
                                {this.state.friends.map(friend=>{
                                    return <Friend
                                        key={friend.id}
                                        {...friend}
                                        ee={this.ee}
                                        setCurrentFriend={this.setCurrentFriend.bind(this)}
                                        modal='#friend-prompt' />
                                })}
                                <div className="friends-list__controls">
                                    <button
                                        onClick={(e)=>this.onClickAdd(e)}
                                        disabled={this.state.friends.length == maxFriends}
                                        className="btn btn-primary friends-list__add mt-3"
                                    >
                                        Добавить
                                    </button>
                                </div>
                                <p className={'text-note'}>Вы можете добавить до {maxFriends} членов семьи.</p>
                            </div>
                            }
                        </div>
                    }
                </Panel>

                <Modal
                    id='friend-prompt'
                    title='Проверьте введенные данные'
                >
                    Вы собираетесь добавить друга с именем <strong>{this.state.currentFriend.first_name}</strong> и датой рождения <strong>{utils.getLocalDateFromApi(this.state.currentFriend.birth_date)}</strong>.
                    После подтверждения эти данные нельзя будет изменить.
                    <div className={'m-t-lg mt-3'}>
                        <button className={'btn btn-primary'} onClick={(e)=>this.onClickConfirm(e)}>Подтвердить</button>
                        <button className={'btn m-l-sm'} data-dismiss="modal" onClick={(e)=>this.onClickCancel(e)}>Отмена</button>
                    </div>
                </Modal>
            </WrapperComponent>
        )
    }
}

