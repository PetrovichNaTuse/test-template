import React from 'react';
import Form from 'common/form';
import Checkbox from 'common/checkbox';
import LogoutLink from 'common/logoutLink';
import Spinner from 'common/spinner';
import api from 'api';
import globalStorage from 'models/globalStore';

export default props => (
    <Form className={"g-mb-30"}
        api={api.updateProfile}
        dataFunction={props.handleData}
        renderDetails={true}
        onBefore={props.onBefore}
        onSuccess={props.onSuccess}
    >
        <div className="d-list">
            <div className="form-group g-mb-25">
                <label htmlFor="exampleInputLastName">Фамилия</label>
                <input
                    type="text"
                    className="form-control rounded-0 form-control-md"
                    placeholder=""
                    name="last_name"
                    defaultValue={props.last_name}
                    id="exampleInputLastName" />
            </div>
            <div className="form-group g-mb-25">
                <label htmlFor="exampleInputFirstName">Имя</label>
                <input
                    type="text"
                    className="form-control rounded-0 form-control-md"
                    placeholder=""
                    name="first_name"
                    defaultValue={props.first_name}
                    id="exampleInputFirstName" />
            </div>
            <div className="form-group g-mb-25">
                <label htmlFor="exampleInputMiddleName">Отчество</label>
                <input
                    type="text"
                    className="form-control rounded-0 form-control-md"
                    placeholder=""
                    name="middle_name"
                    defaultValue={props.middle_name}
                    id="exampleInputMiddleName" />
            </div>
            <div className="form-group g-mb-25">
                <label htmlFor="exampleInputBirthDate">Дата рождения</label>
                <input
                    type="text"
                    className="form-control rounded-0 form-control-md"
                    placeholder=""
                    readOnly={true}
                    name="birth_date"
                    defaultValue={props.formattedBirthDate}
                    id="exampleInputBirthDate" />
                    {/*<DatepickerInput*/}
                    {/*name='birth_date'*/}
                    {/*defaultValue={state.birth_date * 1000}*/}
                    {/*className="form-control"*/}
                    {/*/>*/}
            </div>
            <div className="form-group g-mb-25 user-form__row-confirm">
                <label htmlFor="exampleInputPhone">Номер телефона</label>
                <input
                    type="text"
                    className="form-control rounded-0 form-control-md"
                    placeholder=""
                    name="phone"
                    defaultValue={props.phone}
                    id="exampleInputPhone" />
                    {props.phone_confirmed ?
                        <span
                            className='badge badge-success user-form__confirm-label'>Подтверждено</span>
                        :
                        <span className='badge badge-warning user-form__confirm-label'
                              onClick={() => props.onClickConfirm('phone')}>Подтвердить</span>
                    }
            </div>
            <div className="form-group g-mb-25 user-form__row-confirm">
                <label htmlFor="exampleInputEmail">Email</label>
                <input
                    type="text"
                    className="form-control rounded-0 form-control-md"
                    placeholder=""
                    name="email"
                    defaultValue={props.email}
                    id="exampleInputEmail" />
                    {props.email_confirmed ?
                        <span
                            className='badge badge-success user-form__confirm-label'>Подтверждено</span>
                        :
                        <span className='badge badge-warning user-form__confirm-label'
                              onClick={() => props.onClickConfirm('email')}>Подтвердить</span>
                    }
            </div>

            <div className="d-list__row d-list__row_no-flex">
                <div className="user-form__sub-row">
                    <Checkbox name='email_spam_info' value={1} checked={props.email_spam_info}>
                        Информационные рассылки по e-mail
                    </Checkbox>
                </div>
                <div className="user-form__sub-row">
                    <Checkbox name='email_spam_advert' value={1} checked={props.email_spam_advert}>
                        Рекламные рассылки по e-mail
                    </Checkbox>
                </div>
                <div className="user-form__sub-row">
                    <Checkbox name='sms_spam_info' value={1} checked={props.sms_spam_info}>
                        Информационные рассылки по СМС
                    </Checkbox>
                </div>
                <div className="user-form__sub-row">
                    <Checkbox name='sms_spam_advert' value={1} checked={props.sms_spam_advert}>
                        Рекламные рассылки по СМС
                    </Checkbox>
                </div>
            </div>

            <div id="password" className='collapse'>
                <div className="form-group g-mb-25">
                    <label htmlFor="exampleInputPassword">Новый пароль</label>
                    <input
                        type="password"
                        className="form-control rounded-0 form-control-md"
                        name="password"
                        id="exampleInputPassword" />
                </div>
                <div className="form-group g-mb-25">
                    <label htmlFor="exampleInputRetryPassword">Новый пароль ещё раз</label>
                    <input
                        type="password"
                        className="form-control rounded-0 form-control-md"
                        name="retry_password"
                        id="exampleInputRetryPassword" />
                </div>
            </div>
        </div>
        <div className="mb-3">
            <a href="#password" data-toggle="collapse" className="pseudo-link">Сменить пароль</a>
        </div>
        <div className="form-group user-form__submit-row">
            <button className="btn btn-primary rounded-0">Сохранить</button>
            <LogoutLink className='ml-2'>Выйти</LogoutLink>
            {
                props.loading &&
                <Spinner static={true} size={24} style={{marginLeft: 16}}/>
            }
        </div>
        {props.successMsg &&
        <p className='text-success'>Данные были успешно обновлены</p>
        }
    </Form>
);
