(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(79);

var _react2 = _interopRequireDefault(_react);

var _panel = __webpack_require__(191);

var _panel2 = _interopRequireDefault(_panel);

var _globalStore = __webpack_require__(81);

var _globalStore2 = _interopRequireDefault(_globalStore);

var _utils = __webpack_require__(80);

var _utils2 = _interopRequireDefault(_utils);

var _api = __webpack_require__(47);

var _api2 = _interopRequireDefault(_api);

var _router = __webpack_require__(46);

var _router2 = _interopRequireDefault(_router);

var _spinner = __webpack_require__(187);

var _spinner2 = _interopRequireDefault(_spinner);

var _link = __webpack_require__(194);

var _link2 = _interopRequireDefault(_link);

var _WrapperComponent = __webpack_require__(189);

var _WrapperComponent2 = _interopRequireDefault(_WrapperComponent);

var _Profile = __webpack_require__(245);

var _Profile2 = _interopRequireDefault(_Profile);

var _userCardList = __webpack_require__(248);

var _userCardList2 = _interopRequireDefault(_userCardList);

var _userStatus = __webpack_require__(249);

var _userStatus2 = _interopRequireDefault(_userStatus);

var _twoStepConfirmationModal = __webpack_require__(250);

var _twoStepConfirmationModal2 = _interopRequireDefault(_twoStepConfirmationModal);

var _userStatusLabel = __webpack_require__(251);

var _userStatusLabel2 = _interopRequireDefault(_userStatusLabel);

var _userStatusConfirm = __webpack_require__(252);

var _userStatusConfirm2 = _interopRequireDefault(_userStatusConfirm);

var _globalStore3 = __webpack_require__(81);

var _globalStore4 = _interopRequireDefault(_globalStore3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var userInfoApi = _api2.default.userInfo;

var User = function (_React$Component) {
    _inherits(User, _React$Component);

    function User() {
        _classCallCheck(this, User);

        var _this = _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).call(this));

        _this.state = {
            loaded: false,
            successMsg: false,
            cards: [],
            stage: 'editing',
            mode: 1,
            action_id: ''
        };
        return _this;
    }

    _createClass(User, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadData();
        }
    }, {
        key: 'handleData',
        value: function handleData(data) {
            data.birth_date = this.state.birth_date; // Get default value in case user will change its value
            data.sex = 1;
        }
    }, {
        key: 'loadData',
        value: function loadData(token) {
            var _this2 = this;

            return $.when((0, _api.fetch)(userInfoApi)).then(function (data) {
                _this2.setState($.extend({
                    loaded: true
                }, data));
            }).fail(function (data) {
                _globalStore2.default.reset();
                _router2.default.navigate('/login');
            });
        }
    }, {
        key: 'setMode',
        value: function setMode(mode) {
            this.setState({
                mode: parseInt(mode)
            });
        }
    }, {
        key: 'onSuccess',
        value: function onSuccess(data) {
            this.setState($.extend({
                successMsg: data && data.status != 200,
                loading: false
            }, data));
        }
    }, {
        key: 'onBefore',
        value: function onBefore() {
            this.setState({
                successMsg: false,
                loading: true
            });
        }
    }, {
        key: 'onUserModalsConfirm',
        value: function onUserModalsConfirm() {
            this.setState({
                loaded: false
            });

            this.loadData();
        }
    }, {
        key: 'onClickLevelBtn',
        value: function onClickLevelBtn(actionId) {
            this.setState({ action_id: actionId });
        }
    }, {
        key: 'onClickConfirm',
        value: function onClickConfirm(type) {
            $('#' + type).modal('show');
        }
    }, {
        key: 'getBalanceHtml',
        value: function getBalanceHtml() {
            var _this3 = this;

            if (!this.state.cards.length) return '';
            var date = new Date().getTime();
            date = date + 24 * 60 * 60 * 1000;
            return _react2.default.createElement(
                'div',
                { className: 'user-balance mt-4' },
                _react2.default.createElement(
                    'div',
                    { className: 'user-balance__active mb-3' },
                    '\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u0431\u0430\u043B\u0430\u043D\u0441: ',
                    _react2.default.createElement(
                        'span',
                        { className: 'u-label u-label-success g-mr-10' },
                        this.cardBalance.toLocaleString('RU'),
                        '\u20BD'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'user-balance__inactive mb-3' },
                    '\u041D\u0435\u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u0431\u0430\u043B\u0430\u043D\u0441: ',
                    _react2.default.createElement(
                        'span',
                        { className: 'u-label u-label-info g-mr-10' },
                        this.cardInactiveBalance.toLocaleString('RU'),
                        '\u20BD'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    '\u0423\u0440\u043E\u0432\u0435\u043D\u044C: ',
                    _react2.default.createElement(
                        'strong',
                        null,
                        this.state.level.title
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'a',
                        {
                            className: 'pseudo-link text-xs m-l-sm',
                            href: '#',
                            onClick: function onClick(e) {
                                e.preventDefault();
                                _this3.setState({ stage: 'status' });
                            }
                        },
                        '\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C'
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var state = this.state;
            var loaded = state.loaded;


            return _react2.default.createElement(
                _WrapperComponent2.default,
                { mode: 1, loaded: loaded },
                _react2.default.createElement(
                    _panel2.default,
                    { className: 'panel_min-height' },
                    !state.loaded && _react2.default.createElement(_spinner2.default, null),
                    state.loaded && _react2.default.createElement(
                        'div',
                        { className: 'row d-flex justify-content-center' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-md-8' },
                            state.stage === 'editing' && this.getBalanceHtml(),
                            state.loaded && state.stage === 'editing' && _react2.default.createElement(_Profile2.default, _extends({
                                handleData: this.handleData.bind(this),
                                onBefore: this.onBefore.bind(this),
                                onSuccess: this.onSuccess.bind(this),
                                formattedBirthDate: this.formattedBirthDate,
                                onClickConfirm: this.onClickConfirm.bind(this)
                            }, this.state)),
                            state.loaded && state.stage === 'status' && _react2.default.createElement(_userStatus2.default, {
                                user: state,
                                back: function back() {
                                    return _this4.setState({ stage: 'editing' });
                                },
                                onComplete: this.onClickLevelBtn.bind(this)
                            })
                        )
                    )
                ),
                _react2.default.createElement(_twoStepConfirmationModal2.default, {
                    apiFirst: _api2.default.emailConfirm,
                    apiConfirmation: _api2.default.confirmAction,
                    title: '\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C Email',
                    confirmNote: '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0434, \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0439 \u0432\u0430\u043C \u043D\u0430 \u043F\u043E\u0447\u0442\u0443.',
                    id: 'email',
                    confirmation: true,
                    onConfirm: this.onUserModalsConfirm.bind(this)
                }),
                _react2.default.createElement(
                    _twoStepConfirmationModal2.default,
                    {
                        apiFirst: _api2.default.phoneConfirm,
                        apiConfirmation: _api2.default.confirmAction,
                        title: '\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u0442\u0435\u043B\u0435\u0444\u043E\u043D',
                        confirmNote: '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0434, \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0439 \u0432\u0430\u043C \u043D\u0430 \u0443\u043A\u0430\u0437\u0430\u043D\u044B\u0439 \u0442\u0435\u043B\u0435\u0444\u043E\u043D.',
                        id: 'phone',
                        confirmation: true,
                        onConfirm: this.onUserModalsConfirm.bind(this)
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'form-group' },
                        _react2.default.createElement('input', { type: 'number', name: 'phone', placeholder: '\u041D\u043E\u0432\u044B\u0439 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430', className: 'form-control' })
                    )
                ),
                _react2.default.createElement(_userStatusConfirm2.default, { id: 'user-level-up', api: _api2.default.confirmAction,
                    loadData: this.loadData.bind(this), title: '\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0443\u0440\u043E\u0432\u043D\u044F',
                    setMode: this.setMode.bind(this),
                    actionId: this.state.action_id }),
                _react2.default.createElement(_userStatusConfirm2.default, { id: 'user-level-prolong', api: _api2.default.confirmAction,
                    loadData: this.loadData.bind(this), title: '\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u043F\u0440\u043E\u0434\u043B\u0435\u043D\u0438\u0435 \u0443\u0440\u043E\u0432\u043D\u044F',
                    setMode: this.setMode.bind(this),
                    actionId: this.state.action_id })
            );
        }
    }, {
        key: 'formattedBirthDate',
        get: function get() {
            var date = new Date(this.state.birth_date);
            var offsetMS = date.getTimezoneOffset() * 60 * 1000;
            var bDate = new Date(date.getTime() - offsetMS);

            return '' + bDate.toLocaleDateString('RU');
        }
    }, {
        key: 'cardBalance',
        get: function get() {
            if (!this.state.cards.length) return;
            var card = this.state.cards.filter(function (c) {
                return c.mode == 'bonus';
            })[0];
            return card ? card.balance : 0;
        }
    }, {
        key: 'cardInactiveBalance',
        get: function get() {
            if (!this.state.cards.length) return;
            var card = this.state.cards.filter(function (c) {
                return c.mode == 'bonus';
            })[0];
            var balance = card ? card.inactive_balance : 0;
            return this.cardBalance + balance;
        }
    }]);

    return User;
}(_react2.default.Component);

exports.default = User;

/***/ }),

/***/ 187:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(79);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(80);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Spinner = function (_React$PureComponent) {
    _inherits(Spinner, _React$PureComponent);

    function Spinner() {
        _classCallCheck(this, Spinner);

        return _possibleConstructorReturn(this, (Spinner.__proto__ || Object.getPrototypeOf(Spinner)).call(this));
    }

    _createClass(Spinner, [{
        key: 'render',
        value: function render() {
            var props = this.props;
            return _react2.default.createElement(
                'div',
                { className: 'spinner ' + (props.className ? props.className : ''), style: this.style },
                _react2.default.createElement('img', { src: '/profile/img/svg/spinner.svg', alt: '' })
            );
        }
    }, {
        key: 'style',
        get: function get() {
            var props = this.props;

            var defaults = {
                width: props.size,
                height: props.size,
                position: props.static ? 'static' : 'absolute'
            };

            return $.extend({}, defaults, props.style);
        }
    }], [{
        key: 'defaultProps',
        get: function get() {
            return {
                static: false,
                size: 64,
                style: {}
            };
        }
    }]);

    return Spinner;
}(_react2.default.PureComponent);

exports.default = Spinner;

/***/ }),

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _undefined = __webpack_require__(196)(); // Support ES3 engines

module.exports = function (val) { return val !== _undefined && val !== null; };


/***/ }),

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(79);

var _react2 = _interopRequireDefault(_react);

var _Navigation = __webpack_require__(190);

var _Navigation2 = _interopRequireDefault(_Navigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
    return _react2.default.createElement(
        'section',
        { className: 'g-py-100' },
        _react2.default.createElement(
            'div',
            { className: 'container g-max-width-780 g-mb-20 g-mb-60--md' },
            _react2.default.createElement(
                'div',
                {
                    className: 'text-center text-uppercase u-heading-v5-3 u-heading-v5-color-primary u-heading-v5-rounded-50x g-mb-20' },
                _react2.default.createElement(
                    'h2',
                    { className: 'u-heading-v5__title g-line-height-1_2 g-font-weight-700 g-font-size-32 g-font-size-40--md g-bg-primary--before g-pb-40' },
                    '\u041B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442'
                )
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'container' },
            _react2.default.createElement(
                'div',
                { className: 'container container_limited' },
                _react2.default.createElement(_Navigation2.default, { mode: props.mode, loaded: props.loaded }),
                props.children
            )
        )
    );
};

/***/ }),

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(79);

var _react2 = _interopRequireDefault(_react);

var _router = __webpack_require__(46);

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modeTitles = [{ label: 'Профиль', mode: 1, goto: 'user', visibleInModes: [2] }, { label: 'Мои карты', mode: 2, goto: 'cards', visibleInModes: [1, 3] }, { label: 'Мои друзья', mode: 3, goto: 'friends', visibleInModes: [1, 3] }, { label: 'История покупок', mode: 4, goto: 'orders', visibleInModes: [1, 3] }, { label: 'Мои адреса', mode: 5, goto: 'addresses', visibleInModes: [1, 3] }];

exports.default = function (props) {
    return _react2.default.createElement(
        'ul',
        { className: 'nav nav-pills nav-fill g-mb-30' },
        modeTitles.map(function (title) {
            return _react2.default.createElement(
                'li',
                { className: 'nav-item', key: title.label },
                _react2.default.createElement(
                    'a',
                    {
                        href: '#',
                        'data-navigo': true,
                        className: 'nav-link m-l ' + (title.mode == props.mode ? 'active' : ''),
                        'data-mode': title.mode,
                        'data-goto': title.goto,
                        onClick: function onClick(event) {
                            event.preventDefault();

                            if (typeof props.loaded === 'boolean' && !props.loaded) return;

                            return _router2.default.navigate(_router2.default.generate(title.goto));
                        }
                    },
                    title.label
                )
            );
        })
    );
};

/***/ }),

/***/ 191:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(79);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
    return _react2.default.createElement(
        'div',
        { className: 'panel ' + (props.className ? props.className : '') },
        props.title && _react2.default.createElement(
            'h2',
            { className: 'panel-heading mb-3' },
            props.title
        ),
        _react2.default.createElement(
            'div',
            { className: 'panel-body' },
            props.children
        )
    );
};

/***/ }),

/***/ 192:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(79);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Modal = function (_React$PureComponent) {
    _inherits(Modal, _React$PureComponent);

    function Modal() {
        _classCallCheck(this, Modal);

        return _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this));
    }

    _createClass(Modal, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { tabIndex: '-1', role: 'dialog', className: 'modal fade', id: this.props.id },
                _react2.default.createElement(
                    'div',
                    { role: 'document', className: 'modal-dialog ' + (this.props.className ? this.props.className : '') },
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-content' },
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-header' },
                            _react2.default.createElement(
                                'h4',
                                { className: 'modal-title' },
                                this.props.title
                            ),
                            _react2.default.createElement(
                                'button',
                                { type: 'button', 'data-dismiss': 'modal', 'aria-label': 'Close', className: 'close' },
                                _react2.default.createElement(
                                    'span',
                                    { 'aria-hidden': 'true' },
                                    '\xD7'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-body' },
                            this.props.children
                        )
                    )
                )
            );
        }
    }], [{
        key: 'defaultProps',
        get: function get() {
            return {
                id: '',
                title: '',
                className: ''
            };
        }
    }]);

    return Modal;
}(_react2.default.PureComponent);

exports.default = Modal;

/***/ }),

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(188);

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};


/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(79);

var _react2 = _interopRequireDefault(_react);

var _router = __webpack_require__(46);

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ctrl = false;
var $window = $(window);

var Link = function (_React$Component) {
    _inherits(Link, _React$Component);

    function Link() {
        _classCallCheck(this, Link);

        return _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).call(this));
    }

    _createClass(Link, [{
        key: 'onClick',
        value: function onClick(e) {
            var nativeEvent = e.nativeEvent;
            if (nativeEvent.defaultPrevented) return;

            if (ctrl) return true;
            e.preventDefault();
            _router2.default.navigate(this.props.href);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'a',
                {
                    ref: 'el',
                    href: this.props.href,
                    className: this.props.className,
                    style: this.props.style,
                    onClick: function onClick(e) {
                        return _this2.onClick(e);
                    }
                },
                this.props.children
            );
        }
    }]);

    return Link;
}(_react2.default.Component);

exports.default = Link;


$window.on('keydown', function (e) {
    ctrl = e.which == 17;
});

$window.on('keyup', function (e) {
    ctrl = false;
});

/***/ }),

/***/ 195:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(79);

var _react2 = _interopRequireDefault(_react);

var _formSerialize = __webpack_require__(198);

var _formSerialize2 = _interopRequireDefault(_formSerialize);

var _errorFormMessage = __webpack_require__(201);

var _errorFormMessage2 = _interopRequireDefault(_errorFormMessage);

var _api = __webpack_require__(47);

var _api2 = _interopRequireDefault(_api);

var _hasListeners = __webpack_require__(202);

var _hasListeners2 = _interopRequireDefault(_hasListeners);

var _allOff = __webpack_require__(199);

var _allOff2 = _interopRequireDefault(_allOff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_React$PureComponent) {
    _inherits(Form, _React$PureComponent);

    function Form() {
        _classCallCheck(this, Form);

        var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this));

        _this.state = {
            error: false,
            errorMessage: ''
        };
        return _this;
    }

    _createClass(Form, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.emitter) {
                this.props.emitter.on('setErrorMessage', this.setErrorMessage.bind(this));
                this.props.emitter.on('submit', this.submit.bind(this));
                this.props.emitter.on('validate', this.validate.bind(this));
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.props.emitter) {
                (0, _allOff2.default)(this.props.emitter);
            }
        }
    }, {
        key: 'addErrorStatuses',
        value: function addErrorStatuses(details) {
            var errors = details || this.state.errorDetails,
                keys = Array.isArray(errors) ? errors : Object.keys(errors),
                form = this.refs.form;

            keys.forEach(function (error) {
                var el = $('[name=\'' + error + '\']', form);
                if (el.length) {
                    el.closest('.form-group').addClass('has-error');
                }
            });
        }
    }, {
        key: 'removeErrorStatuses',
        value: function removeErrorStatuses() {
            var els = $('.has-error', this.refs.form);

            els.removeClass('has-error');
        }
    }, {
        key: 'setErrorMessage',
        value: function setErrorMessage(msg) {
            this.setState({
                error: true,
                errorMessage: msg
            });
        }
    }, {
        key: 'validate',
        value: function validate(data) {
            var valid = true,
                errors = [];

            data = data || this.formData;

            Object.keys(data).forEach(function (key) {
                var val = data[key];
                var errorFound = false;

                if (Array.isArray(val) && val.length == 0) {
                    errorFound = true;
                }
                if (val == undefined || val === "") {
                    errorFound = true;
                }

                if (errorFound) {
                    valid = false;
                    errors.push(key);
                }
            });

            if (!valid) {
                this.addErrorStatuses(errors);
            }

            if (this.props.emitter) {
                this.props.emitter.emit('isValid', valid, data);
            }

            return valid;
        }
    }, {
        key: 'submit',
        value: function submit(opts) {
            var _this2 = this;

            if (this.xhr) return;
            var data = this.formData;

            if (this.props.allRequired) {
                if (!opts || opts && !opts.noValidation) {
                    var valid = this.validate(data);

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

            $.when(this.xhr = (0, _api.fetch)(this.props.api, data)).then(function (data) {
                if (_this2.props.onSuccess) {
                    _this2.props.onSuccess(data);
                }
            }).fail(function (data) {
                var response = data.responseJSON;

                if (!response) {
                    if (_this2.props.handleEmptyResponse) {
                        _this2.setState({
                            error: true,
                            errorDetails: [],
                            errorMessage: 'Запрос завершился, но ответа с сервера не пришло.'
                        });
                        _this2.props.onError({ message: 'Запрос завершился, но ответа с сервера не пришло', status: 500 });
                    }

                    if (_this2.props.onSuccess) {
                        _this2.props.onSuccess($.extend(data, { status: data.status || 500 }));
                    }

                    return;
                }

                var details = response.details,
                    message = response.message;

                _this2.setState({
                    error: true,
                    errorDetails: details,
                    errorMessage: message || data.statusText
                });

                _this2.props.onError({ message: message || data.statusText, status: data.status });

                if (_this2.props.onSuccess) {
                    _this2.props.onSuccess(data);
                }

                if (details) _this2.addErrorStatuses(details);
            }).always(function () {
                _this2.xhr = '';
            });
        }
    }, {
        key: 'onComplete',
        value: function onComplete() {}
    }, {
        key: 'onSubmit',
        value: function onSubmit(e) {
            e.preventDefault();

            if (this.props.manualSubmit) return;
            this.submit();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                'form',
                { onSubmit: function onSubmit(e) {
                        _this3.onSubmit(e);
                    }, ref: 'form', className: this.props.className || '' },
                this.props.children,
                this.state.error && _react2.default.createElement(_errorFormMessage2.default, { message: this.state.errorMessage }),
                this.state.error && this.props.renderDetails && this.detailsList
            );
        }
    }, {
        key: 'formData',
        get: function get() {
            var data = (0, _formSerialize2.default)(this.refs.form, { hash: true, empty: true });

            if (this.props.dataFunction) {
                this.props.dataFunction(data);
            }

            return data;
        }
    }, {
        key: 'detailsList',
        get: function get() {
            var details = this.state.errorDetails;

            if (!details) return '';

            var fields = Object.keys(details);

            return _react2.default.createElement(
                'ul',
                null,
                fields.map(function (field) {
                    return _react2.default.createElement(
                        'li',
                        { key: 'from-detail-' + field },
                        details[field][0]
                    );
                })
            );
        }
    }], [{
        key: 'defaultProps',
        get: function get() {
            return {
                api: '', // API object
                dataFunction: '', // callback for modify form data, before ajax request is sent
                renderDetails: false,
                allRequired: false,
                handleEmptyResponse: true, // if response will be empty, when error status will be applied
                manualSubmit: false,
                onBefore: '',
                onSuccess: '',
                onError: function onError() {}, // if validate or network error
                emitter: ''
            };
        }
    }]);

    return Form;
}(_react2.default.PureComponent);

exports.default = Form;

/***/ }),

/***/ 196:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// eslint-disable-next-line no-empty-function
module.exports = function () {};


/***/ }),

/***/ 198:
/***/ (function(module, exports) {

// get successful control from form and assemble into object
// http://www.w3.org/TR/html401/interact/forms.html#h-17.13.2

// types which indicate a submit action and are not successful controls
// these will be ignored
var k_r_submitter = /^(?:submit|button|image|reset|file)$/i;

// node names which could be successful controls
var k_r_success_contrls = /^(?:input|select|textarea|keygen)/i;

// Matches bracket notation.
var brackets = /(\[[^\[\]]*\])/g;

// serializes form fields
// @param form MUST be an HTMLForm element
// @param options is an optional argument to configure the serialization. Default output
// with no options specified is a url encoded string
//    - hash: [true | false] Configure the output type. If true, the output will
//    be a js object.
//    - serializer: [function] Optional serializer function to override the default one.
//    The function takes 3 arguments (result, key, value) and should return new result
//    hash and url encoded str serializers are provided with this module
//    - disabled: [true | false]. If true serialize disabled fields.
//    - empty: [true | false]. If true serialize empty fields
function serialize(form, options) {
    if (typeof options != 'object') {
        options = { hash: !!options };
    }
    else if (options.hash === undefined) {
        options.hash = true;
    }

    var result = (options.hash) ? {} : '';
    var serializer = options.serializer || ((options.hash) ? hash_serializer : str_serialize);

    var elements = form && form.elements ? form.elements : [];

    //Object store each radio and set if it's empty or not
    var radio_store = Object.create(null);

    for (var i=0 ; i<elements.length ; ++i) {
        var element = elements[i];

        // ingore disabled fields
        if ((!options.disabled && element.disabled) || !element.name) {
            continue;
        }
        // ignore anyhting that is not considered a success field
        if (!k_r_success_contrls.test(element.nodeName) ||
            k_r_submitter.test(element.type)) {
            continue;
        }

        var key = element.name;
        var val = element.value;

        // we can't just use element.value for checkboxes cause some browsers lie to us
        // they say "on" for value when the box isn't checked
        if ((element.type === 'checkbox' || element.type === 'radio') && !element.checked) {
            val = undefined;
        }

        // If we want empty elements
        if (options.empty) {
            // for checkbox
            if (element.type === 'checkbox' && !element.checked) {
                val = '';
            }

            // for radio
            if (element.type === 'radio') {
                if (!radio_store[element.name] && !element.checked) {
                    radio_store[element.name] = false;
                }
                else if (element.checked) {
                    radio_store[element.name] = true;
                }
            }

            // if options empty is true, continue only if its radio
            if (val == undefined && element.type == 'radio') {
                continue;
            }
        }
        else {
            // value-less fields are ignored unless options.empty is true
            if (!val) {
                continue;
            }
        }

        // multi select boxes
        if (element.type === 'select-multiple') {
            val = [];

            var selectOptions = element.options;
            var isSelectedOptions = false;
            for (var j=0 ; j<selectOptions.length ; ++j) {
                var option = selectOptions[j];
                var allowedEmpty = options.empty && !option.value;
                var hasValue = (option.value || allowedEmpty);
                if (option.selected && hasValue) {
                    isSelectedOptions = true;

                    // If using a hash serializer be sure to add the
                    // correct notation for an array in the multi-select
                    // context. Here the name attribute on the select element
                    // might be missing the trailing bracket pair. Both names
                    // "foo" and "foo[]" should be arrays.
                    if (options.hash && key.slice(key.length - 2) !== '[]') {
                        result = serializer(result, key + '[]', option.value);
                    }
                    else {
                        result = serializer(result, key, option.value);
                    }
                }
            }

            // Serialize if no selected options and options.empty is true
            if (!isSelectedOptions && options.empty) {
                result = serializer(result, key, '');
            }

            continue;
        }

        result = serializer(result, key, val);
    }

    // Check for all empty radio buttons and serialize them with key=""
    if (options.empty) {
        for (var key in radio_store) {
            if (!radio_store[key]) {
                result = serializer(result, key, '');
            }
        }
    }

    return result;
}

function parse_keys(string) {
    var keys = [];
    var prefix = /^([^\[\]]*)/;
    var children = new RegExp(brackets);
    var match = prefix.exec(string);

    if (match[1]) {
        keys.push(match[1]);
    }

    while ((match = children.exec(string)) !== null) {
        keys.push(match[1]);
    }

    return keys;
}

function hash_assign(result, keys, value) {
    if (keys.length === 0) {
        result = value;
        return result;
    }

    var key = keys.shift();
    var between = key.match(/^\[(.+?)\]$/);

    if (key === '[]') {
        result = result || [];

        if (Array.isArray(result)) {
            result.push(hash_assign(null, keys, value));
        }
        else {
            // This might be the result of bad name attributes like "[][foo]",
            // in this case the original `result` object will already be
            // assigned to an object literal. Rather than coerce the object to
            // an array, or cause an exception the attribute "_values" is
            // assigned as an array.
            result._values = result._values || [];
            result._values.push(hash_assign(null, keys, value));
        }

        return result;
    }

    // Key is an attribute name and can be assigned directly.
    if (!between) {
        result[key] = hash_assign(result[key], keys, value);
    }
    else {
        var string = between[1];
        // +var converts the variable into a number
        // better than parseInt because it doesn't truncate away trailing
        // letters and actually fails if whole thing is not a number
        var index = +string;

        // If the characters between the brackets is not a number it is an
        // attribute name and can be assigned directly.
        if (isNaN(index)) {
            result = result || {};
            result[string] = hash_assign(result[string], keys, value);
        }
        else {
            result = result || [];
            result[index] = hash_assign(result[index], keys, value);
        }
    }

    return result;
}

// Object/hash encoding serializer.
function hash_serializer(result, key, value) {
    var matches = key.match(brackets);

    // Has brackets? Use the recursive assignment function to walk the keys,
    // construct any missing objects in the result tree and make the assignment
    // at the end of the chain.
    if (matches) {
        var keys = parse_keys(key);
        hash_assign(result, keys, value);
    }
    else {
        // Non bracket notation can make assignments directly.
        var existing = result[key];

        // If the value has been assigned already (for instance when a radio and
        // a checkbox have the same name attribute) convert the previous value
        // into an array before pushing into it.
        //
        // NOTE: If this requirement were removed all hash creation and
        // assignment could go through `hash_assign`.
        if (existing) {
            if (!Array.isArray(existing)) {
                result[key] = [ existing ];
            }

            result[key].push(value);
        }
        else {
            result[key] = value;
        }
    }

    return result;
}

// urlform encoding serializer
function str_serialize(result, key, value) {
    // encode newlines as \r\n cause the html spec says so
    value = value.replace(/(\r)?\n/g, '\r\n');
    value = encodeURIComponent(value);

    // spaces should be '+' rather than '%20'.
    value = value.replace(/%20/g, '+');
    return result + (result ? '&' : '') + encodeURIComponent(key) + '=' + value;
}

module.exports = serialize;


/***/ }),

/***/ 199:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var value = __webpack_require__(204)

  , hasOwnProperty = Object.prototype.hasOwnProperty;

module.exports = function (emitter/*, type*/) {
	var type = arguments[1], data;

	value(emitter);

	if (type !== undefined) {
		data = hasOwnProperty.call(emitter, '__ee__') && emitter.__ee__;
		if (!data) return;
		if (data[type]) delete data[type];
		return;
	}
	if (hasOwnProperty.call(emitter, '__ee__')) delete emitter.__ee__;
};


/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(79);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
    return _react2.default.createElement(
        'div',
        { className: 'form__error-msg' },
        _react2.default.createElement(
            'p',
            { className: 'text-danger' },
            props.message
        )
    );
};

/***/ }),

/***/ 202:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isEmpty = __webpack_require__(203)
  , value   = __webpack_require__(193)

  , hasOwnProperty = Object.prototype.hasOwnProperty;

module.exports = function (obj/*, type*/) {
	var type;
	value(obj);
	type = arguments[1];
	if (arguments.length > 1) {
		return hasOwnProperty.call(obj, '__ee__') && Boolean(obj.__ee__[type]);
	}
	return obj.hasOwnProperty('__ee__') && !isEmpty(obj.__ee__);
};


/***/ }),

/***/ 203:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var value                   = __webpack_require__(193)
  , objPropertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (obj) {
	var i;
	value(obj);
	for (i in obj) {
		// Jslint: ignore
		if (objPropertyIsEnumerable.call(obj, i)) return false;
	}
	return true;
};


/***/ }),

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(205);

module.exports = function (value) {
	if (!isObject(value)) throw new TypeError(value + " is not an Object");
	return value;
};


/***/ }),

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(188);

var map = { function: true, object: true };

module.exports = function (value) { return (isValue(value) && map[typeof value]) || false; };


/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(79);

var _react2 = _interopRequireDefault(_react);

var _form = __webpack_require__(195);

var _form2 = _interopRequireDefault(_form);

var _checkbox = __webpack_require__(246);

var _checkbox2 = _interopRequireDefault(_checkbox);

var _logoutLink = __webpack_require__(247);

var _logoutLink2 = _interopRequireDefault(_logoutLink);

var _spinner = __webpack_require__(187);

var _spinner2 = _interopRequireDefault(_spinner);

var _api = __webpack_require__(47);

var _api2 = _interopRequireDefault(_api);

var _globalStore = __webpack_require__(81);

var _globalStore2 = _interopRequireDefault(_globalStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
    return _react2.default.createElement(
        _form2.default,
        { className: "g-mb-30",
            api: _api2.default.updateProfile,
            dataFunction: props.handleData,
            renderDetails: true,
            onBefore: props.onBefore,
            onSuccess: props.onSuccess
        },
        _react2.default.createElement(
            'div',
            { className: 'd-list' },
            _react2.default.createElement(
                'div',
                { className: 'form-group g-mb-25' },
                _react2.default.createElement(
                    'label',
                    { htmlFor: 'exampleInputLastName' },
                    '\u0424\u0430\u043C\u0438\u043B\u0438\u044F'
                ),
                _react2.default.createElement('input', {
                    type: 'text',
                    className: 'form-control rounded-0 form-control-md',
                    placeholder: '',
                    name: 'last_name',
                    defaultValue: props.last_name,
                    id: 'exampleInputLastName' })
            ),
            _react2.default.createElement(
                'div',
                { className: 'form-group g-mb-25' },
                _react2.default.createElement(
                    'label',
                    { htmlFor: 'exampleInputFirstName' },
                    '\u0418\u043C\u044F'
                ),
                _react2.default.createElement('input', {
                    type: 'text',
                    className: 'form-control rounded-0 form-control-md',
                    placeholder: '',
                    name: 'first_name',
                    defaultValue: props.first_name,
                    id: 'exampleInputFirstName' })
            ),
            _react2.default.createElement(
                'div',
                { className: 'form-group g-mb-25' },
                _react2.default.createElement(
                    'label',
                    { htmlFor: 'exampleInputMiddleName' },
                    '\u041E\u0442\u0447\u0435\u0441\u0442\u0432\u043E'
                ),
                _react2.default.createElement('input', {
                    type: 'text',
                    className: 'form-control rounded-0 form-control-md',
                    placeholder: '',
                    name: 'middle_name',
                    defaultValue: props.middle_name,
                    id: 'exampleInputMiddleName' })
            ),
            _react2.default.createElement(
                'div',
                { className: 'form-group g-mb-25' },
                _react2.default.createElement(
                    'label',
                    { htmlFor: 'exampleInputBirthDate' },
                    '\u0414\u0430\u0442\u0430 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F'
                ),
                _react2.default.createElement('input', {
                    type: 'text',
                    className: 'form-control rounded-0 form-control-md',
                    placeholder: '',
                    readOnly: true,
                    name: 'birth_date',
                    defaultValue: props.formattedBirthDate,
                    id: 'exampleInputBirthDate' })
            ),
            _react2.default.createElement(
                'div',
                { className: 'form-group g-mb-25 user-form__row-confirm' },
                _react2.default.createElement(
                    'label',
                    { htmlFor: 'exampleInputPhone' },
                    '\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430'
                ),
                _react2.default.createElement('input', {
                    type: 'text',
                    className: 'form-control rounded-0 form-control-md',
                    placeholder: '',
                    name: 'phone',
                    defaultValue: props.phone,
                    id: 'exampleInputPhone' }),
                props.phone_confirmed ? _react2.default.createElement(
                    'span',
                    {
                        className: 'badge badge-success user-form__confirm-label' },
                    '\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u043E'
                ) : _react2.default.createElement(
                    'span',
                    { className: 'badge badge-warning user-form__confirm-label',
                        onClick: function onClick() {
                            return props.onClickConfirm('phone');
                        } },
                    '\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C'
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'form-group g-mb-25 user-form__row-confirm' },
                _react2.default.createElement(
                    'label',
                    { htmlFor: 'exampleInputEmail' },
                    'Email'
                ),
                _react2.default.createElement('input', {
                    type: 'text',
                    className: 'form-control rounded-0 form-control-md',
                    placeholder: '',
                    name: 'email',
                    defaultValue: props.email,
                    id: 'exampleInputEmail' }),
                props.email_confirmed ? _react2.default.createElement(
                    'span',
                    {
                        className: 'badge badge-success user-form__confirm-label' },
                    '\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u043E'
                ) : _react2.default.createElement(
                    'span',
                    { className: 'badge badge-warning user-form__confirm-label',
                        onClick: function onClick() {
                            return props.onClickConfirm('email');
                        } },
                    '\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C'
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'd-list__row d-list__row_no-flex' },
                _react2.default.createElement(
                    'div',
                    { className: 'user-form__sub-row' },
                    _react2.default.createElement(
                        _checkbox2.default,
                        { name: 'email_spam_info', value: 1, checked: props.email_spam_info },
                        '\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0438 \u043F\u043E e-mail'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'user-form__sub-row' },
                    _react2.default.createElement(
                        _checkbox2.default,
                        { name: 'email_spam_advert', value: 1, checked: props.email_spam_advert },
                        '\u0420\u0435\u043A\u043B\u0430\u043C\u043D\u044B\u0435 \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0438 \u043F\u043E e-mail'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'user-form__sub-row' },
                    _react2.default.createElement(
                        _checkbox2.default,
                        { name: 'sms_spam_info', value: 1, checked: props.sms_spam_info },
                        '\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0438 \u043F\u043E \u0421\u041C\u0421'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'user-form__sub-row' },
                    _react2.default.createElement(
                        _checkbox2.default,
                        { name: 'sms_spam_advert', value: 1, checked: props.sms_spam_advert },
                        '\u0420\u0435\u043A\u043B\u0430\u043C\u043D\u044B\u0435 \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0438 \u043F\u043E \u0421\u041C\u0421'
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { id: 'password', className: 'collapse' },
                _react2.default.createElement(
                    'div',
                    { className: 'form-group g-mb-25' },
                    _react2.default.createElement(
                        'label',
                        { htmlFor: 'exampleInputPassword' },
                        '\u041D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C'
                    ),
                    _react2.default.createElement('input', {
                        type: 'password',
                        className: 'form-control rounded-0 form-control-md',
                        name: 'password',
                        id: 'exampleInputPassword' })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form-group g-mb-25' },
                    _react2.default.createElement(
                        'label',
                        { htmlFor: 'exampleInputRetryPassword' },
                        '\u041D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C \u0435\u0449\u0451 \u0440\u0430\u0437'
                    ),
                    _react2.default.createElement('input', {
                        type: 'password',
                        className: 'form-control rounded-0 form-control-md',
                        name: 'retry_password',
                        id: 'exampleInputRetryPassword' })
                )
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'mb-3' },
            _react2.default.createElement(
                'a',
                { href: '#password', 'data-toggle': 'collapse', className: 'pseudo-link' },
                '\u0421\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C'
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'form-group user-form__submit-row' },
            _react2.default.createElement(
                'button',
                { className: 'btn btn-primary rounded-0' },
                '\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C'
            ),
            _react2.default.createElement(
                _logoutLink2.default,
                { className: 'ml-2' },
                '\u0412\u044B\u0439\u0442\u0438'
            ),
            props.loading && _react2.default.createElement(_spinner2.default, { 'static': true, size: 24, style: { marginLeft: 16 } })
        ),
        props.successMsg && _react2.default.createElement(
            'p',
            { className: 'text-success' },
            '\u0414\u0430\u043D\u043D\u044B\u0435 \u0431\u044B\u043B\u0438 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u044B'
        )
    );
};

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(79);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
    return _react2.default.createElement(
        'div',
        { className: 'form-group form-check ' + (props.className ? props.className : '') },
        _react2.default.createElement('input', { id: props.name, type: 'checkbox', className: 'form-check-input', name: props.name, defaultChecked: props.checked, value: props.value }),
        _react2.default.createElement(
            'label',
            { className: 'form-check-label', htmlFor: props.name },
            props.children
        )
    );
};

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(79);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(80);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
    var className = props.className || '';

    return _react2.default.createElement(
        'a',
        { href: '/user/logout', className: className },
        props.children
    );
};

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(79);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(80);

var _utils2 = _interopRequireDefault(_utils);

var _appConstants = __webpack_require__(48);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var modesTitle = {
    discount: 'Дисконтная',
    bonus: 'Бонусная'
};

var UserCardList = function (_React$PureComponent) {
    _inherits(UserCardList, _React$PureComponent);

    function UserCardList() {
        _classCallCheck(this, UserCardList);

        return _possibleConstructorReturn(this, (UserCardList.__proto__ || Object.getPrototypeOf(UserCardList)).call(this));
    }

    _createClass(UserCardList, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'user-cards-table' },
                this.props.getBalanceHtml(),
                _react2.default.createElement(
                    'div',
                    { className: 'table-responsive' },
                    _react2.default.createElement(
                        'table',
                        { className: 'table' },
                        _react2.default.createElement(
                            'thead',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    '\u041D\u043E\u043C\u0435\u0440 \u043A\u0430\u0440\u0442\u044B'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    '\u0414\u0430\u0442\u0430 \u0430\u043A\u0442\u0438\u0432\u0430\u0446\u0438\u0438'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    '\u0414\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u0434\u043E'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    '\u0421\u0442\u0430\u0442\u0443\u0441'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'tbody',
                            null,
                            this.rows
                        )
                    )
                )
            );
        }
    }, {
        key: 'rows',
        get: function get() {
            return this.props.cards.map(function (card) {
                return _react2.default.createElement(
                    'tr',
                    { className: 'user-cards-table__row', key: 'card-num-row-' + card.num + '-' + card.mode },
                    _react2.default.createElement(
                        'td',
                        null,
                        _react2.default.createElement(
                            'strong',
                            null,
                            card.num
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            modesTitle[card.mode]
                        )
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        _utils2.default.getLocalDateFromUnix(card.date_activated)
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        _utils2.default.getLocalDateFromUnix(card.date_expired)
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        _react2.default.createElement(
                            'span',
                            { className: 'u-label ' + (['blocked', 'inactive'].includes(card.state) ? 'u-label-danger' : 'u-label-success') },
                            _appConstants.cardStatus[card.state]
                        )
                    )
                );
            });
        }
    }], [{
        key: 'defaultProps',
        get: function get() {
            return {
                cards: []
            };
        }
    }]);

    return UserCardList;
}(_react2.default.PureComponent);

exports.default = UserCardList;
;

/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(79);

var _react2 = _interopRequireDefault(_react);

var _globalStore = __webpack_require__(81);

var _globalStore2 = _interopRequireDefault(_globalStore);

var _spinner = __webpack_require__(187);

var _spinner2 = _interopRequireDefault(_spinner);

var _appConstants = __webpack_require__(48);

var _api = __webpack_require__(47);

var _api2 = _interopRequireDefault(_api);

var _utils = __webpack_require__(80);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var statuses = window.APP_SETTINGS.levels.sort(function (a, b) {
    if (a.ordering > b.ordering) return 1;
    return -1;
});
var minStatusOrdering = statuses[0].ordering;
var maxStatusOrdering = statuses[statuses.length - 1].ordering;

var bonusesNoun = _utils2.default.getNoun('балл', 'балла', 'баллов');
var notEnoughBonusesNoun = _utils2.default.getNoun('балла', 'баллов', 'баллов');
var monthsNoun = _utils2.default.getNoun('месяц', 'месяца', 'месяцев');

var UserStatus = function (_React$PureComponent) {
    _inherits(UserStatus, _React$PureComponent);

    function UserStatus(props) {
        _classCallCheck(this, UserStatus);

        var _this = _possibleConstructorReturn(this, (UserStatus.__proto__ || Object.getPrototypeOf(UserStatus)).call(this));

        _this.state = {
            confirmation: false,
            loading: false,
            error: null,
            action_id: ''
        };
        return _this;
    }

    _createClass(UserStatus, [{
        key: 'validateLevelUpBalance',
        value: function validateLevelUpBalance(nextStatus) {
            if (!nextStatus) return;
            if (!this.props.user.cards.length) return 0;

            var restBalance = Math.ceil(this.props.user.cards[0].total_balance - nextStatus.activation_cost);
            if (restBalance < 0) {
                return -restBalance;
            }
        }
    }, {
        key: 'validateLevelProlongBalance',
        value: function validateLevelProlongBalance() {
            if (!this.props.user.cards.length) return 0;

            var restBalance = Math.ceil(this.props.user.cards[0].total_balance - this.props.user.level.renewal_cost);
            if (restBalance < 0) {
                return -restBalance;
            }
        }
    }, {
        key: 'validateLevelUp',
        value: function validateLevelUp(nextStatus) {
            if (this.props.user.cards.length) {
                var balance = this.props.user.cards[0].total_balance;
                if (!nextStatus) {
                    return 'У вас уже максимальный уровень';
                } else if (balance - nextStatus.activation_cost < 0) {
                    return 'Недостаточно средств для повышения уровня';
                }
            } else {
                return 'Вы не имеете активных карт';
            }
        }
    }, {
        key: 'validateLevelProlong',
        value: function validateLevelProlong() {
            var curStatus = this.props.user.level;
            if (this.props.user.cards.length) {
                var balance = this.props.user.cards[0].total_balance;
                if (curStatus.ordering === minStatusOrdering) {
                    return 'Минимальный уровень является бессрочным';
                } else if (balance - curStatus.renewal_cost < 0) {
                    return 'Недостаточно средств для продления уровня';
                }
            } else {
                return 'Вы не имеете активных карт';
            }
        }
    }, {
        key: 'levelApiReq',
        value: function levelApiReq(apiReq, modal) {
            var _this2 = this;

            if (this.state.loading) return;
            this.setState({ loading: true });
            $.when((0, _api.fetch)(apiReq)).then(function (data) {
                _this2.setState({ loading: false, error: null, action_id: data.action });
                _this2.props.onComplete(data.action_id);
                $(modal).modal('show');
            }).fail(function (err) {
                _this2.setState({ loading: false });
                if (err.status != 200) {
                    var json = err.responseJSON;
                    var message = json && json.message ? json.message : 'Произошла ошибка, попробуйте позже.';
                    _this2.setState({ error: message });
                    return;
                }
                $(modal).modal('show');
            });
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(e, validate, handler) {
            e.preventDefault();
            var err = validate();
            if (err) {
                this.setState({ error: err });
                return;
            }
            handler();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var user = this.props.user;
            var curStatus = user.level;
            var ordering = curStatus.ordering;
            var nextStatus = statuses && statuses.find(function (s) {
                return s.ordering > ordering;
            });

            var months = _utils2.default.getMonths(curStatus.min_duration);
            var levelExpirationDate = _utils2.default.getLocalDateFromUnix(user.level_expiration_date);

            var levelProlongCost = curStatus.renewal_cost;
            var levelUpCost = nextStatus && nextStatus.activation_cost;
            var validateLevelProlongBalance = this.validateLevelProlongBalance();
            var validateLevelUpBalance = this.validateLevelUpBalance(nextStatus);

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'd-list__row', style: { 'marginBottom': '35px' } },
                    _react2.default.createElement(
                        'span',
                        null,
                        '\u0412\u0430\u0448 \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C -'
                    ),
                    '\xA0',
                    _react2.default.createElement(
                        'strong',
                        null,
                        user.level.title,
                        '\xA0'
                    ),
                    ordering === maxStatusOrdering && _react2.default.createElement(
                        'strong',
                        null,
                        '(\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439)\xA0'
                    ),
                    _react2.default.createElement(
                        'em',
                        null,
                        '(',
                        ordering === minStatusOrdering ? 'бессрочный' : 'истекает ' + levelExpirationDate,
                        ')'
                    ),
                    '.'
                ),
                ordering !== maxStatusOrdering && _react2.default.createElement(
                    'form',
                    { style: { 'display': 'flex', 'alignItems': 'center', 'marginBottom': '20px' },
                        onSubmit: function onSubmit(e) {
                            return _this3.onSubmit(e, _this3.validateLevelUp.bind(_this3, nextStatus), _this3.levelApiReq.bind(_this3, _api2.default.levelUp, '#user-level-up'));
                        } },
                    _react2.default.createElement(
                        'button',
                        { className: 'btn btn-primary',
                            style: {
                                'marginRight': '30px',
                                'flexBasis': '96px',
                                'flexShrink': 0,
                                'justifyContent': 'center'
                            },
                            disabled: this.state.loading || !!validateLevelUpBalance },
                        '\u041F\u043E\u0432\u044B\u0441\u0438\u0442\u044C'
                    ),
                    !validateLevelUpBalance ? _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u041F\u043E\u0432\u044B\u0441\u0438\u0442\u044C \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0434\u043E '
                        ),
                        _react2.default.createElement(
                            'strong',
                            null,
                            nextStatus.title,
                            '.'
                        ),
                        _react2.default.createElement(
                            'span',
                            { style: { 'color': '#B22222' } },
                            _react2.default.createElement(
                                'span',
                                null,
                                ' \u0411\u0443\u0434\u0435\u0442 \u0441\u043F\u0438\u0441\u0430\u043D\u043E '
                            ),
                            _react2.default.createElement(
                                'strong',
                                null,
                                levelUpCost
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                ' ',
                                bonusesNoun(levelUpCost),
                                '.'
                            )
                        )
                    ) : _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(
                            'span',
                            null,
                            ' \u0414\u043B\u044F \u043F\u043E\u0432\u044B\u0448\u0435\u043D\u0438\u044F \u0443\u0440\u043E\u0432\u043D\u044F \u0434\u043E '
                        ),
                        _react2.default.createElement(
                            'strong',
                            null,
                            nextStatus.title
                        ),
                        _react2.default.createElement(
                            'span',
                            null,
                            ' \u043D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E '
                        ),
                        _react2.default.createElement(
                            'strong',
                            null,
                            validateLevelUpBalance
                        ),
                        _react2.default.createElement(
                            'span',
                            null,
                            ' ',
                            notEnoughBonusesNoun(validateLevelUpBalance),
                            '.'
                        )
                    )
                ),
                ordering !== minStatusOrdering && _react2.default.createElement(
                    'form',
                    { style: { 'display': 'flex', 'alignItems': 'center', 'marginBottom': '20px' },
                        onSubmit: function onSubmit(e) {
                            return _this3.onSubmit(e, _this3.validateLevelProlong.bind(_this3), _this3.levelApiReq.bind(_this3, _api2.default.levelProlong, '#user-level-prolong'));
                        } },
                    _react2.default.createElement(
                        'button',
                        { className: 'btn btn-primary',
                            style: {
                                'marginRight': '30px',
                                'flexBasis': '96px',
                                'flexShrink': 0,
                                'justifyContent': 'center'
                            },
                            disabled: this.state.loading || !!validateLevelProlongBalance },
                        '\u041F\u0440\u043E\u0434\u043B\u0438\u0442\u044C'
                    ),
                    !validateLevelProlongBalance ? _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u041F\u0440\u043E\u0434\u043B\u0435\u043D\u0438\u0435 \u0443\u0440\u043E\u0432\u043D\u044F \u0441\u0440\u043E\u043A\u043E\u043C \u043D\u0430 '
                        ),
                        _react2.default.createElement(
                            'strong',
                            null,
                            months + ' ' + monthsNoun(months),
                            '.'
                        ),
                        _react2.default.createElement(
                            'span',
                            { style: { 'color': '#B22222' } },
                            _react2.default.createElement(
                                'span',
                                null,
                                ' \u0411\u0443\u0434\u0435\u0442 \u0441\u043F\u0438\u0441\u0430\u043D\u043E '
                            ),
                            _react2.default.createElement(
                                'strong',
                                null,
                                levelProlongCost,
                                ' '
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                bonusesNoun(levelProlongCost),
                                '.'
                            )
                        )
                    ) : _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(
                            'span',
                            null,
                            ' \u0414\u043B\u044F \u043F\u0440\u043E\u0434\u043B\u0435\u043D\u0438\u044F \u0443\u0440\u043E\u0432\u043D\u044F \u0441\u0440\u043E\u043A\u043E\u043C \u043D\u0430 '
                        ),
                        _react2.default.createElement(
                            'strong',
                            null,
                            months + ' ' + monthsNoun(months)
                        ),
                        _react2.default.createElement(
                            'span',
                            null,
                            ' \u043D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E '
                        ),
                        _react2.default.createElement(
                            'strong',
                            null,
                            validateLevelProlongBalance
                        ),
                        _react2.default.createElement(
                            'span',
                            null,
                            ' ',
                            notEnoughBonusesNoun(validateLevelProlongBalance),
                            '.'
                        )
                    )
                ),
                _react2.default.createElement(
                    'a',
                    { className: 'pseudo-link text-xs m-l-sm', href: '#', onClick: function onClick(e) {
                            e.preventDefault();
                            _this3.props.back();
                        } },
                    '\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F'
                ),
                this.state.loading && _react2.default.createElement(_spinner2.default, { className: 'spinner_form-static m-l-sm' }),
                this.state.error && _react2.default.createElement(
                    'div',
                    { className: 'text-danger m-t-sm' },
                    this.state.error
                )
            );
        }
    }]);

    return UserStatus;
}(_react2.default.PureComponent);

exports.default = UserStatus;

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(79);

var _react2 = _interopRequireDefault(_react);

var _form = __webpack_require__(195);

var _form2 = _interopRequireDefault(_form);

var _modal = __webpack_require__(192);

var _modal2 = _interopRequireDefault(_modal);

var _api = __webpack_require__(47);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TwoStepConfirmationModal = function (_React$PureComponent) {
    _inherits(TwoStepConfirmationModal, _React$PureComponent);

    function TwoStepConfirmationModal(props) {
        _classCallCheck(this, TwoStepConfirmationModal);

        var _this = _possibleConstructorReturn(this, (TwoStepConfirmationModal.__proto__ || Object.getPrototypeOf(TwoStepConfirmationModal)).call(this));

        _this.state = {
            confirmation: props.confirmation || false,
            action_id: ''
        };
        return _this;
    }

    _createClass(TwoStepConfirmationModal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var $el = $('#' + this.props.id);
            $el.on('hidden.bs.modal', this.onHideModal.bind(this));
            $el.on('show.bs.modal', this.onShowModal.bind(this));
        }
    }, {
        key: 'onShowModal',
        value: function onShowModal() {
            var _this2 = this;

            // Send request for confirmation code if only one step is required
            if (this.props.confirmation && this.props.apiFirst) {
                (0, _api.fetch)(this.props.apiFirst).then(function (data) {
                    _this2.setState({
                        confirmation: _this2.state.confirmation,
                        action_id: data.action_id
                    });
                });
            }
        }
    }, {
        key: 'onHideModal',
        value: function onHideModal() {
            this.setState({
                confirmation: this.props.confirmation
            });
        }
    }, {
        key: 'onSuccessFirstFormSent',
        value: function onSuccessFirstFormSent() {
            this.setState({
                confirmation: true
            });
        }
    }, {
        key: 'onSuccessConfirmation',
        value: function onSuccessConfirmation() {
            $('#' + this.props.id).modal('hide');
            if (this.props.onConfirm) {
                this.props.onConfirm();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _modal2.default,
                { id: this.props.id, className: 'modal-sm', title: this.props.title },
                !this.state.confirmation && _react2.default.createElement(
                    _form2.default,
                    { api: this.props.apiFirst, onSuccess: this.onSuccessFirstFormSent.bind(this), renderDetails: true },
                    this.props.children,
                    _react2.default.createElement(
                        'div',
                        { className: 'm-t-lg form-group' },
                        _react2.default.createElement(
                            'button',
                            { className: 'btn btn-primary' },
                            '\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C'
                        ),
                        _react2.default.createElement(
                            'button',
                            { 'data-dismiss': 'modal', className: 'btn m-l-sm' },
                            '\u041E\u0442\u043C\u0435\u043D\u0430'
                        )
                    )
                ),
                this.state.confirmation && _react2.default.createElement(
                    _form2.default,
                    { api: this.props.apiConfirmation, onSuccess: this.onSuccessConfirmation.bind(this), renderDetails: true, handleEmptyResponse: false },
                    _react2.default.createElement(
                        'div',
                        { className: 'form-group' },
                        _react2.default.createElement('input', { type: 'number', name: 'code', placeholder: '\u041A\u043E\u0434', className: 'form-control' }),
                        _react2.default.createElement('input', { type: 'hidden', name: 'action_id', value: this.state.action_id }),
                        _react2.default.createElement(
                            'div',
                            { className: 'form__input-note' },
                            this.props.confirmNote
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'm-t-lg form-group' },
                        _react2.default.createElement(
                            'button',
                            { className: 'btn btn-primary' },
                            '\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C'
                        ),
                        _react2.default.createElement(
                            'button',
                            { 'data-dismiss': 'modal', className: 'btn m-l-sm' },
                            '\u041E\u0442\u043C\u0435\u043D\u0430'
                        )
                    )
                )
            );
        }
    }], [{
        key: 'defaultProps',
        get: function get() {
            return {
                id: '',
                apiFirst: '',
                apiConfirmation: '',
                accessToken: '',
                title: '',
                confirmNote: 'Введите полученный код',
                onConfirm: ''
            };
        }
    }]);

    return TwoStepConfirmationModal;
}(_react2.default.PureComponent);

exports.default = TwoStepConfirmationModal;

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(79);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var classes = {
    1: 'label-default',
    2: 'label-gold',
    3: 'label-titan'
};

exports.default = function (props) {
    return _react2.default.createElement(
        'span',
        { className: 'label ' + classes[props.ordering] },
        props.title
    );
};

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(79);

var _react2 = _interopRequireDefault(_react);

var _modal = __webpack_require__(192);

var _modal2 = _interopRequireDefault(_modal);

var _globalStore = __webpack_require__(81);

var _globalStore2 = _interopRequireDefault(_globalStore);

var _spinner = __webpack_require__(187);

var _spinner2 = _interopRequireDefault(_spinner);

var _form = __webpack_require__(195);

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserStatusConfirm = function (_React$PureComponent) {
    _inherits(UserStatusConfirm, _React$PureComponent);

    function UserStatusConfirm() {
        _classCallCheck(this, UserStatusConfirm);

        var _this = _possibleConstructorReturn(this, (UserStatusConfirm.__proto__ || Object.getPrototypeOf(UserStatusConfirm)).call(this));

        _this.state = {
            loading: false
        };
        return _this;
    }

    _createClass(UserStatusConfirm, [{
        key: 'onBefore',
        value: function onBefore(e) {
            this.setState({ loading: true });
        }
    }, {
        key: 'onSuccess',
        value: function onSuccess(e) {
            this.setState({ loading: false });

            if (!/400|404|500/.test(e.status)) {
                $('#' + this.props.id).modal('hide');
                this.props.setMode(1);
                this.props.loadData();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _modal2.default,
                { id: this.props.id, className: 'modal__no-mh', title: this.props.title },
                _react2.default.createElement(
                    _form2.default,
                    { api: this.props.api, renderDetails: false, handleEmptyResponse: false,
                        onBefore: this.onBefore.bind(this), onSuccess: this.onSuccess.bind(this) },
                    _react2.default.createElement(
                        'p',
                        null,
                        '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0440\u043E\u0432\u0435\u0440\u043E\u0447\u043D\u044B\u0439 \u043A\u043E\u0434, \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0439 \u0432\u0430\u043C \u043D\u0430 \u0442\u0435\u043B\u0435\u0444\u043E\u043D.'
                    ),
                    _react2.default.createElement('input', { type: 'text', required: true, placeholder: 'Цифровой код', className: 'form-control', name: 'code' }),
                    _react2.default.createElement('input', { type: 'hidden', name: 'action_id', value: this.props.actionId }),
                    _react2.default.createElement(
                        'div',
                        { className: 'm-t-lg mt-3 form-group' },
                        _react2.default.createElement(
                            'button',
                            { className: 'btn btn-primary' },
                            '\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C'
                        ),
                        _react2.default.createElement(
                            'button',
                            { 'data-dismiss': 'modal', className: 'btn m-l-sm' },
                            '\u041E\u0442\u043C\u0435\u043D\u0430'
                        ),
                        this.state.loading && _react2.default.createElement(_spinner2.default, { className: 'spinner_form-static' })
                    )
                )
            );
        }
    }]);

    return UserStatusConfirm;
}(_react2.default.PureComponent);

exports.default = UserStatusConfirm;

/***/ })

}]);