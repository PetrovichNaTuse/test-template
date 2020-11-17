import React from 'react';
import airDatepicker from 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.css';
import "inputmask/dist/inputmask/inputmask.numeric.extensions";
import Inputmask from "inputmask/dist/inputmask/inputmask.date.extensions";

export default class DatepickerInput extends React.PureComponent {
    constructor() {
        super()
    }

    static get defaultProps(){
        return {
            name: '',
            className: '',
            defaultValue: '',
            placeholder: '',
            required: false,
            readOnly: false,
            dpParams: {
                autoClose: true,
            },
        }
    }

    componentDidMount(){
        this.initDatepicker();

        if (!this.props.readOnly) {
            window.mask = this.mask = Inputmask({
                mask: '99.99.9999',
                placeholder: 'дд.мм.гггг',
                onBeforePaste(){return false},
                oncomplete:()=>{
                    const value = this.refs.el.value.replace(/\./g,''); // Иногда маска возвращает результат без точек, поэтому делаем сразу без них
                    try {
                        let date = /(^\d{2})/.exec(value)[1];
                        let month = /^\d{2}(\d{2})/.exec(value)[1];
                        let year = /(\d{4}$)/.exec(value)[1];
                        let jsDate = new Date(year, parseInt(month) - 1, parseInt(date));
                        this.datepicker.selectDate(jsDate)
                        this.datepicker.date = jsDate
                    } catch(e) {
                        $(this.refs.parent).addClass('has-error')
                    }
                },
                oncleared:()=>{

                }
            }).mask(this.refs.el);
        }
    }

    componentWillUnmount(){
        this.datepicker.destroy();
    }

    initDatepicker(){
        let params = this.props.dpParams;
        if (!this.props.readOnly) {
            params = $.extend(this.props.dpParams, {
                keyboardNav: false,
                autoClose: false,
                onSelect:()=>{
                    $(this.refs.parent).removeClass('has-error')
                }
            })
        }
        this.datepicker = $(this.refs.el).datepicker(params).data('datepicker');
        this.datepicker.$altField = $(this.refs.hidden);
        this.datepicker.$altField.data('datepicker', this.datepicker);
        this.datepicker.update('altField', $(this.refs.hidden));
        if (this.props.defaultValue) {
            this.setDefaultValue();
        }
    }

    setDefaultValue(){
        let date = new Date(this.props.defaultValue);
        this.datepicker.selectDate(date);
    }

    onClickIcon(){
        this.datepicker.show();
    }

    onMouseUp(){
        if (this.mask) {
            setTimeout(()=>{
                this.mask.mask(this.refs.el)
            },4)
        }
    }

    render(){
        return (
            <div className='input-group input-group_datepicker' ref='parent'>
                <input type="text"
                       placeholder={this.props.placeholder}
                       ref='el' required={this.props.required}
                       onMouseUp={(e)=>{this.onMouseUp(e)}}
                       readOnly={this.props.readOnly}
                       className={`form-control ${this.props.className}`} />
                {/*<span className="input-group-addon" onClick={(e)=>this.onClickIcon(e)}><i className="glyphicon glyphicon-calendar"></i></span>*/}
                <input type="hidden" ref='hidden' name={this.props.name} />
            </div>
        )
    }
}
