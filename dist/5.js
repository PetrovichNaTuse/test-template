(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(79);

var _react2 = _interopRequireDefault(_react);

var _md = __webpack_require__(230);

var _md2 = _interopRequireDefault(_md);

var _api = __webpack_require__(47);

var _api2 = _interopRequireDefault(_api);

var _globalStore = __webpack_require__(81);

var _globalStore2 = _interopRequireDefault(_globalStore);

var _router = __webpack_require__(46);

var _router2 = _interopRequireDefault(_router);

var _panel = __webpack_require__(191);

var _panel2 = _interopRequireDefault(_panel);

var _spinner = __webpack_require__(187);

var _spinner2 = _interopRequireDefault(_spinner);

var _modal = __webpack_require__(192);

var _modal2 = _interopRequireDefault(_modal);

var _WrapperComponent = __webpack_require__(189);

var _WrapperComponent2 = _interopRequireDefault(_WrapperComponent);

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

var userInfoApi = _api2.default.userInfo;

var UserCardList = function (_React$PureComponent) {
    _inherits(UserCardList, _React$PureComponent);

    function UserCardList() {
        _classCallCheck(this, UserCardList);

        var _this = _possibleConstructorReturn(this, (UserCardList.__proto__ || Object.getPrototypeOf(UserCardList)).call(this));

        _this.state = {
            loaded: false,
            cards: [],
            cardNumber: '',
            cardPin: '',
            cardLoaded: true,
            message: ''
        };
        return _this;
    }

    _createClass(UserCardList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadData();
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
        key: 'numberValidation',
        value: function numberValidation(value) {
            return isFinite(value) && value.split('.').length === 1;
        }
    }, {
        key: 'onChangeNumber',
        value: function onChangeNumber(e) {
            var value = e.target.value;

            if (!this.numberValidation(value)) return;

            this.setState({ cardNumber: value });
        }
    }, {
        key: 'onChangePin',
        value: function onChangePin(e) {
            var value = e.target.value;

            if (!this.numberValidation(value)) return;

            this.setState({ cardPin: value });
        }
    }, {
        key: 'addCard',
        value: function addCard(e) {
            var _this3 = this;

            e.preventDefault();
            this.setState({ cardLoaded: false, message: '' });

            $.when((0, _api.fetch)(_api2.default.addCard, {
                num: this.state.cardNumber,
                pin: (0, _md2.default)(this.state.cardPin)
            })).then(function (data) {
                _this3.setState({ cardLoaded: true, message: '' });
                $('#add-card-prompt').modal('hide');
            }).fail(function (err) {
                _this3.setState({ cardLoaded: true });
                if (err.status != 200) {
                    var json = err.responseJSON;
                    var message = json && json.message ? json.message : 'Произошла ошибка, попробуйте позже.';
                    _this3.setState({ message: message });
                    return;
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _WrapperComponent2.default,
                { mode: 2, loaded: this.state.loaded },
                _react2.default.createElement(
                    _panel2.default,
                    { className: 'panel_min-height' },
                    !this.state.loaded && _react2.default.createElement(_spinner2.default, null),
                    this.state.loaded && _react2.default.createElement(
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
                    ),
                    this.state.loaded && _react2.default.createElement(
                        'button',
                        { className: 'btn btn-primary rounded-0 mt-3', onClick: function onClick() {
                                return $('#add-card-prompt').modal('show');
                            } },
                        '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C'
                    )
                ),
                _react2.default.createElement(
                    _modal2.default,
                    {
                        id: 'add-card-prompt',
                        title: '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u0443\u044E \u043A\u0430\u0440\u0442\u0443'
                    },
                    _react2.default.createElement(
                        'form',
                        { className: 'g-brd-gray-light-v4', onSubmit: this.addCard.bind(this) },
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group g-mb-25' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'cardNumber' },
                                '\u041D\u043E\u043C\u0435\u0440 \u043A\u0430\u0440\u0442\u044B'
                            ),
                            _react2.default.createElement('input', {
                                type: 'text',
                                id: 'cardNumber',
                                name: 'cardNumber',
                                placeholder: 'Num',
                                className: 'form-control rounded-0 form-control-md',
                                value: this.state.cardNumber,
                                onChange: this.onChangeNumber.bind(this)
                            })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group g-mb-25' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'cardPin' },
                                '\u041F\u0438\u043D-\u043A\u043E\u0434 \u043A\u0430\u0440\u0442\u044B'
                            ),
                            _react2.default.createElement('input', {
                                type: 'password',
                                id: 'cardPin',
                                name: 'cardPin',
                                placeholder: 'Pin',
                                className: 'form-control rounded-0 form-control-md',
                                value: this.state.cardPin,
                                onChange: this.onChangePin.bind(this)
                            })
                        ),
                        _react2.default.createElement(
                            'button',
                            { type: 'submit', className: 'btn btn-primary rounded-0', disabled: !this.state.cardLoaded },
                            '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C'
                        ),
                        !this.state.cardLoaded && _react2.default.createElement(_spinner2.default, { className: 'spinner_form-static' }),
                        this.state.message && _react2.default.createElement(
                            'div',
                            { className: 'form__error-msg' },
                            _react2.default.createElement(
                                'p',
                                { className: 'text-danger mb-0 mt-3' },
                                this.state.message
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: 'rows',
        get: function get() {
            return this.state.cards.map(function (card) {
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
    }]);

    return UserCardList;
}(_react2.default.PureComponent);

exports.default = UserCardList;
;

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

/***/ 223:
/***/ (function(module, exports) {

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;


/***/ }),

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

(function(){
  var crypt = __webpack_require__(231),
      utf8 = __webpack_require__(223).utf8,
      isBuffer = __webpack_require__(232),
      bin = __webpack_require__(223).bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message) && message.constructor !== Uint8Array)
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();


/***/ }),

/***/ 231:
/***/ (function(module, exports) {

(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();


/***/ }),

/***/ 232:
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ })

}]);