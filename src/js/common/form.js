import React from 'react';
import formSerialize from 'form-serialize';
import ErrorFormMessage from 'common/errorFormMessage';
import api, {fetch} from 'api';
import hasListeners from 'event-emitter/has-listeners';
import allOff from 'event-emitter/all-off';

export default class Form extends React.PureComponent{
    constructor(){
        super();

        this.state = {
            error: false,
            errorMessage: '',
        }
    }

    static get defaultProps(){
        return {
            api: '', // API object
            dataFunction: '', // callback for modify form data, before ajax request is sent
            renderDetails: false,
            allRequired: false,
            handleEmptyResponse: true, // if response will be empty, when error status will be applied
            manualSubmit: false,
            onBefore: '',
            onSuccess: '',
            onError: () => {},// if validate or network error
            emitter: '',
        }
    }

    componentDidMount(){
        if (this.props.emitter) {
            this.props.emitter.on('setErrorMessage', this.setErrorMessage.bind(this));
            this.props.emitter.on('submit', this.submit.bind(this));
            this.props.emitter.on('validate', this.validate.bind(this));
        }
    }

    componentWillUnmount(){
        if (this.props.emitter) {
            allOff(this.props.emitter);
        }
    }

    addErrorStatuses(details){
        let errors = details || this.state.errorDetails,
            keys = Array.isArray(errors) ? errors : Object.keys(errors),
            form = this.refs.form;

        keys.forEach(error=>{
            let el = $(`[name='${error}']`, form);
            if (el.length) {
                el.closest('.form-group').addClass('has-error');
            }
        })
    }

    removeErrorStatuses(){
        let els = $('.has-error', this.refs.form);

        els.removeClass('has-error');
    }

    setErrorMessage(msg){
        this.setState({
            error: true,
            errorMessage: msg
        })
    }

    validate(data){
        let valid = true,
            errors = [];

        data = data || this.formData;

        Object.keys(data).forEach(key=>{
            const val = data[key];
            let errorFound = false;

            if (Array.isArray(val) && val.length == 0) {
                errorFound = true;
            }
            if (val == undefined || val === "") {
                errorFound = true;
            }

            if (errorFound) {
                valid = false;
                errors.push(key)
            }
        });

        if (!valid) {
            this.addErrorStatuses(errors)
        }

        if (this.props.emitter) {
            this.props.emitter.emit('isValid', valid, data)
        }

        return valid;
    }

    get formData(){
        let data = formSerialize(this.refs.form, {hash: true, empty: true});

        if (this.props.dataFunction) {
            this.props.dataFunction(data);
        }

        return data;
    }

    submit(opts){
        if (this.xhr) return;
        let data = this.formData;

        if (this.props.allRequired) {
            if (!opts || (opts && !opts.noValidation)) {
                let valid = this.validate(data);

                if (!valid) return;
            }
        }

        if (this.props.onBefore) {
            this.props.onBefore();
        }

        this.removeErrorStatuses();

        this.setState({
            error: false
        });

        $.when(this.xhr = fetch(this.props.api, data)).then(data=>{
            if (this.props.onSuccess) {
                this.props.onSuccess(data)
            }
        }).fail(data=>{
            let response = data.responseJSON;

            if (!response) {
                if (this.props.handleEmptyResponse) {
                    this.setState({
                        error: true,
                        errorDetails: [],
                        errorMessage: 'Запрос завершился, но ответа с сервера не пришло.'
                    });
                    this.props.onError({message: 'Запрос завершился, но ответа с сервера не пришло', status: 500});
                }

                if (this.props.onSuccess) {
                    this.props.onSuccess($.extend(data, {status: data.status || 500}));
                }

                return
            }

            let details = response.details,
                message = response.message;

            this.setState({
                error: true,
                errorDetails: details,
                errorMessage: message || data.statusText
            });

            this.props.onError({ message: message || data.statusText, status: data.status});

            if (this.props.onSuccess) {
                this.props.onSuccess(data)
            }

            if (details) this.addErrorStatuses(details);
        }).always(()=>{
            this.xhr = ''
        })
    }

    onComplete(){

    }

    onSubmit(e){
        e.preventDefault();

        if (this.props.manualSubmit) return;
        this.submit();
    }

    get detailsList(){
        const details = this.state.errorDetails;

        if (!details) return '';

        const fields = Object.keys(details);

        return (
            <ul>
                {fields.map(field=>{
                    return (
                        <li key={`from-detail-${field}`}>{details[field][0]}</li>
                    )
                })}
            </ul>
        )
    }

    render(){
        return (
            <form onSubmit={e=>{this.onSubmit(e)}} ref='form' className={this.props.className || ''}>
                {this.props.children}
                {this.state.error && <ErrorFormMessage message={this.state.errorMessage} />}
                {this.state.error && this.props.renderDetails && this.detailsList}
            </form>
        )
    }
}
