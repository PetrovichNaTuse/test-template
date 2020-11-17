(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ 184:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(79);

var _react2 = _interopRequireDefault(_react);

var _router = __webpack_require__(46);

var _router2 = _interopRequireDefault(_router);

var _panel = __webpack_require__(191);

var _panel2 = _interopRequireDefault(_panel);

var _utils = __webpack_require__(80);

var _utils2 = _interopRequireDefault(_utils);

var _spinner = __webpack_require__(187);

var _spinner2 = _interopRequireDefault(_spinner);

var _link = __webpack_require__(194);

var _link2 = _interopRequireDefault(_link);

var _WrapperComponent = __webpack_require__(189);

var _WrapperComponent2 = _interopRequireDefault(_WrapperComponent);

var _friend = __webpack_require__(233);

var _friend2 = _interopRequireDefault(_friend);

var _modal = __webpack_require__(192);

var _modal2 = _interopRequireDefault(_modal);

var _eventEmitter = __webpack_require__(200);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var friendsId = 1;

var maxFriends = APP_SETTINGS.max_customer_friends;

var Friends = function (_React$PureComponent) {
    _inherits(Friends, _React$PureComponent);

    function Friends() {
        _classCallCheck(this, Friends);

        var _this = _possibleConstructorReturn(this, (Friends.__proto__ || Object.getPrototypeOf(Friends)).call(this));

        _this.state = {
            friends: [],
            currentFriend: {},
            loaded: false
        };
        return _this;
    }

    _createClass(Friends, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadData();
            this.ee = (0, _eventEmitter2.default)();
        }
    }, {
        key: 'loadData',
        value: function loadData(token) {
            var _this2 = this;

            this.setState({ loading: true });
            $.when(_utils2.default.loadUserInfo()).then(function (data) {
                if (data.friends.length) {
                    data.friends = data.friends.map(function (f) {
                        f.id = friendsId++;
                        return f;
                    });
                }

                _this2.setState(Object.assign({
                    loaded: true,
                    loading: false
                }, data));
            });
        }
    }, {
        key: 'addFriend',
        value: function addFriend() {
            var friends = this.state.friends;

            friends = friends.concat([{
                id: friendsId++,
                name: null,
                birth_date: null
            }]);

            this.setState({
                friends: friends
            });
        }
    }, {
        key: 'setCurrentFriend',
        value: function setCurrentFriend(data) {
            var deferred = $.Deferred();

            var currentFriend = Object.assign({}, data);

            this.setState({
                currentFriend: currentFriend
            }, function (state) {
                deferred.resolve();
            });

            return deferred;
        }
    }, {
        key: 'onClickAdd',
        value: function onClickAdd(e) {
            e.preventDefault();
            this.addFriend();
        }
    }, {
        key: 'onClickSave',
        value: function onClickSave(e) {
            e.preventDefault();
        }
    }, {
        key: 'onClickConfirm',
        value: function onClickConfirm(e) {
            this.ee.emit('saveFriend', this.state.currentFriend.id);
        }
    }, {
        key: 'onClickCancel',
        value: function onClickCancel(e) {}
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                _WrapperComponent2.default,
                { mode: 3, loaded: this.state.loaded },
                _react2.default.createElement(
                    _panel2.default,
                    { className: 'panel_min-height' },
                    this.state.loading && _react2.default.createElement(_spinner2.default, null),
                    this.state.loaded && _react2.default.createElement(
                        'div',
                        null,
                        this.state.friends.length === 0 && this.emptyMessage,
                        this.state.friends.length !== 0 && _react2.default.createElement(
                            'div',
                            { className: 'friends-list' },
                            this.state.friends.map(function (friend) {
                                return _react2.default.createElement(_friend2.default, _extends({
                                    key: friend.id
                                }, friend, {
                                    ee: _this3.ee,
                                    setCurrentFriend: _this3.setCurrentFriend.bind(_this3),
                                    modal: '#friend-prompt' }));
                            }),
                            _react2.default.createElement(
                                'div',
                                { className: 'friends-list__controls' },
                                _react2.default.createElement(
                                    'button',
                                    {
                                        onClick: function onClick(e) {
                                            return _this3.onClickAdd(e);
                                        },
                                        disabled: this.state.friends.length == maxFriends,
                                        className: 'btn btn-primary friends-list__add mt-3'
                                    },
                                    '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C'
                                )
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'text-note' },
                                '\u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0434\u043E ',
                                maxFriends,
                                ' \u0447\u043B\u0435\u043D\u043E\u0432 \u0441\u0435\u043C\u044C\u0438.'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    _modal2.default,
                    {
                        id: 'friend-prompt',
                        title: '\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0432\u0432\u0435\u0434\u0435\u043D\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435'
                    },
                    '\u0412\u044B \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u0442\u0435\u0441\u044C \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0434\u0440\u0443\u0433\u0430 \u0441 \u0438\u043C\u0435\u043D\u0435\u043C ',
                    _react2.default.createElement(
                        'strong',
                        null,
                        this.state.currentFriend.first_name
                    ),
                    ' \u0438 \u0434\u0430\u0442\u043E\u0439 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F ',
                    _react2.default.createElement(
                        'strong',
                        null,
                        _utils2.default.getLocalDateFromApi(this.state.currentFriend.birth_date)
                    ),
                    '. \u041F\u043E\u0441\u043B\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u044D\u0442\u0438 \u0434\u0430\u043D\u043D\u044B\u0435 \u043D\u0435\u043B\u044C\u0437\u044F \u0431\u0443\u0434\u0435\u0442 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C.',
                    _react2.default.createElement(
                        'div',
                        { className: 'm-t-lg mt-3' },
                        _react2.default.createElement(
                            'button',
                            { className: 'btn btn-primary', onClick: function onClick(e) {
                                    return _this3.onClickConfirm(e);
                                } },
                            '\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C'
                        ),
                        _react2.default.createElement(
                            'button',
                            { className: 'btn m-l-sm', 'data-dismiss': 'modal', onClick: function onClick(e) {
                                    return _this3.onClickCancel(e);
                                } },
                            '\u041E\u0442\u043C\u0435\u043D\u0430'
                        )
                    )
                )
            );
        }
    }, {
        key: 'emptyMessage',
        get: function get() {
            var _this4 = this;

            return _react2.default.createElement(
                'div',
                { className: 'friends__empty-msg' },
                _react2.default.createElement(
                    'p',
                    null,
                    '\u0423 \u0432\u0430\u0441 \u043F\u043E\u043A\u0430 \u043D\u0435 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E \u043D\u0438 \u043E\u0434\u043D\u043E\u0433\u043E \u0447\u043B\u0435\u043D\u0430 \u0441\u0435\u043C\u044C\u0438.'
                ),
                _react2.default.createElement(
                    'span',
                    { className: 'btn btn-primary', onClick: function onClick(e) {
                            return _this4.onClickAdd(e);
                        } },
                    '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C'
                )
            );
        }
    }, {
        key: 'friends',
        get: function get() {}
    }]);

    return Friends;
}(_react2.default.PureComponent);

exports.default = Friends;

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

/***/ 233:
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

var _formSerialize = __webpack_require__(198);

var _formSerialize2 = _interopRequireDefault(_formSerialize);

var _form = __webpack_require__(195);

var _form2 = _interopRequireDefault(_form);

var _globalStore = __webpack_require__(81);

var _globalStore2 = _interopRequireDefault(_globalStore);

var _datepickerInput = __webpack_require__(234);

var _datepickerInput2 = _interopRequireDefault(_datepickerInput);

var _spinner = __webpack_require__(187);

var _spinner2 = _interopRequireDefault(_spinner);

var _api = __webpack_require__(47);

var _api2 = _interopRequireDefault(_api);

var _allOff = __webpack_require__(199);

var _allOff2 = _interopRequireDefault(_allOff);

var _modal = __webpack_require__(192);

var _modal2 = _interopRequireDefault(_modal);

var _eventEmitter = __webpack_require__(200);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FriendItem = function (_React$PureComponent) {
    _inherits(FriendItem, _React$PureComponent);

    function FriendItem(props) {
        _classCallCheck(this, FriendItem);

        var _this = _possibleConstructorReturn(this, (FriendItem.__proto__ || Object.getPrototypeOf(FriendItem)).call(this));

        _this.ee = (0, _eventEmitter2.default)();

        _this.state = {
            loading: false,
            added: props.first_name
        };
        return _this;
    }

    _createClass(FriendItem, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.ee.on('isValid', this.onValidate.bind(this));
            this.props.ee.on('saveFriend', this.onSaveFriend.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            (0, _allOff2.default)(this.ee);
        }
    }, {
        key: 'dataFunction',
        value: function dataFunction(data) {
            if (data.birth_date) {
                data.birth_date = _utils2.default.getApiDate(new Date(parseInt(data.birth_date)));
            }

            this.setState({
                birth_date: data.birth_date
            });
        }
    }, {
        key: 'onSaveFriend',
        value: function onSaveFriend(id) {
            if (id == this.props.id) {
                this.ee.emit('submit', { noValidation: true });
                $(this.props.modal).modal('hide');
            }
        }
    }, {
        key: 'onBefore',
        value: function onBefore() {
            this.setState({ loading: true });
        }
    }, {
        key: 'onSuccess',
        value: function onSuccess(e) {
            if (e && /400|404|500/.test(e.status)) {
                this.setState({
                    loading: false
                });
                return;
            }

            this.setState({
                loading: false,
                added: true
            });
        }
    }, {
        key: 'onValidate',
        value: function onValidate(isValid, data) {
            var _this2 = this;

            if (!isValid) return;

            this.props.setCurrentFriend(data).then(function () {
                $(_this2.props.modal).modal('show');
            });
        }
    }, {
        key: 'onClickAdd',
        value: function onClickAdd(e) {
            e.preventDefault();
            this.ee.emit('validate');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var props = this.props;

            return _react2.default.createElement(
                _form2.default,
                { className: 'form-inline mb-3',
                    api: _api2.default.addFriend,
                    allRequired: true,
                    dataFunction: this.dataFunction.bind(this),
                    handleEmptyResponse: false,
                    onSuccess: this.onSuccess.bind(this),
                    emitter: this.ee,
                    manualSubmit: true,
                    onBefore: this.onBefore.bind(this)
                },
                _react2.default.createElement(
                    'div',
                    { className: 'form-group mb-2' },
                    _react2.default.createElement('input', {
                        type: 'text',
                        readOnly: this.isAdded,
                        name: 'first_name',
                        defaultValue: props.first_name,
                        className: 'form-control',
                        placeholder: '\u0418\u043C\u044F'
                    })
                ),
                this.isAdded ? _react2.default.createElement(
                    'div',
                    { className: 'form-group mx-sm-3 mb-2' },
                    _react2.default.createElement('input', {
                        type: 'text',
                        className: 'form-control',
                        readOnly: this.isAdded,
                        name: 'birth_date',
                        defaultValue: _utils2.default.getLocalDateFromApi(props.birth_date) || _utils2.default.getLocalDateFromApi(this.state.birth_date),
                        id: 'exampleInputFirstName' })
                ) : _react2.default.createElement(
                    'div',
                    { className: 'form-group mx-sm-3 mb-2' },
                    _react2.default.createElement(_datepickerInput2.default, { className: 'form-control rounded-0', name: 'birth_date', placeholder: 'Дата рождения', defaultValue: props.birth_date ? new Date(props.birth_date).getTime() : '', readOnly: false })
                ),
                _react2.default.createElement('input', { type: 'hidden', name: 'id', value: this.props.id }),
                !this.isAdded && !this.state.loading && _react2.default.createElement(
                    'button',
                    {
                        className: 'btn btn-primary mb-2',
                        onClick: function onClick(e) {
                            return _this3.onClickAdd(e);
                        }
                    },
                    '\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C'
                ),
                this.state.loading && _react2.default.createElement(_spinner2.default, { className: 'spinner_form-static', style: { marginTop: '8px' } })
            );
        }
    }, {
        key: 'isAdded',
        get: function get() {
            return this.state.added;
        }
    }]);

    return FriendItem;
}(_react2.default.PureComponent);

exports.default = FriendItem;

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(79);

var _react2 = _interopRequireDefault(_react);

var _airDatepicker = __webpack_require__(235);

var _airDatepicker2 = _interopRequireDefault(_airDatepicker);

__webpack_require__(240);

__webpack_require__(241);

var _inputmaskDate = __webpack_require__(242);

var _inputmaskDate2 = _interopRequireDefault(_inputmaskDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatepickerInput = function (_React$PureComponent) {
    _inherits(DatepickerInput, _React$PureComponent);

    function DatepickerInput() {
        _classCallCheck(this, DatepickerInput);

        return _possibleConstructorReturn(this, (DatepickerInput.__proto__ || Object.getPrototypeOf(DatepickerInput)).call(this));
    }

    _createClass(DatepickerInput, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.initDatepicker();

            if (!this.props.readOnly) {
                window.mask = this.mask = (0, _inputmaskDate2.default)({
                    mask: '99.99.9999',
                    placeholder: 'дд.мм.гггг',
                    onBeforePaste: function onBeforePaste() {
                        return false;
                    },

                    oncomplete: function oncomplete() {
                        var value = _this2.refs.el.value.replace(/\./g, ''); // Иногда маска возвращает результат без точек, поэтому делаем сразу без них
                        try {
                            var date = /(^\d{2})/.exec(value)[1];
                            var month = /^\d{2}(\d{2})/.exec(value)[1];
                            var year = /(\d{4}$)/.exec(value)[1];
                            var jsDate = new Date(year, parseInt(month) - 1, parseInt(date));
                            _this2.datepicker.selectDate(jsDate);
                            _this2.datepicker.date = jsDate;
                        } catch (e) {
                            $(_this2.refs.parent).addClass('has-error');
                        }
                    },
                    oncleared: function oncleared() {}
                }).mask(this.refs.el);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.datepicker.destroy();
        }
    }, {
        key: 'initDatepicker',
        value: function initDatepicker() {
            var _this3 = this;

            var params = this.props.dpParams;
            if (!this.props.readOnly) {
                params = $.extend(this.props.dpParams, {
                    keyboardNav: false,
                    autoClose: false,
                    onSelect: function onSelect() {
                        $(_this3.refs.parent).removeClass('has-error');
                    }
                });
            }
            this.datepicker = $(this.refs.el).datepicker(params).data('datepicker');
            this.datepicker.$altField = $(this.refs.hidden);
            this.datepicker.$altField.data('datepicker', this.datepicker);
            this.datepicker.update('altField', $(this.refs.hidden));
            if (this.props.defaultValue) {
                this.setDefaultValue();
            }
        }
    }, {
        key: 'setDefaultValue',
        value: function setDefaultValue() {
            var date = new Date(this.props.defaultValue);
            this.datepicker.selectDate(date);
        }
    }, {
        key: 'onClickIcon',
        value: function onClickIcon() {
            this.datepicker.show();
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp() {
            var _this4 = this;

            if (this.mask) {
                setTimeout(function () {
                    _this4.mask.mask(_this4.refs.el);
                }, 4);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            return _react2.default.createElement(
                'div',
                { className: 'input-group input-group_datepicker', ref: 'parent' },
                _react2.default.createElement('input', { type: 'text',
                    placeholder: this.props.placeholder,
                    ref: 'el', required: this.props.required,
                    onMouseUp: function onMouseUp(e) {
                        _this5.onMouseUp(e);
                    },
                    readOnly: this.props.readOnly,
                    className: 'form-control ' + this.props.className }),
                _react2.default.createElement('input', { type: 'hidden', ref: 'hidden', name: this.props.name })
            );
        }
    }], [{
        key: 'defaultProps',
        get: function get() {
            return {
                name: '',
                className: '',
                defaultValue: '',
                placeholder: '',
                required: false,
                readOnly: false,
                dpParams: {
                    autoClose: true
                }
            };
        }
    }]);

    return DatepickerInput;
}(_react2.default.PureComponent);

exports.default = DatepickerInput;

/***/ })

}]);