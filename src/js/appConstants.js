let host = window.location.hostname;
let protocol = window.location.protocol;
let reg = /^([\w-]*)/;

const subDomainUrlByEnv = {
    development: '.dooglys.test',
    release: '.dooglys.rls',
    production: '.dooglys.com',
    local: '.dooglys.local',
};

const subDomain = subDomainUrlByEnv[process.env.NODE_ENV];

export const apiVersion = 'v1';
export const apiPath = '/proxy';
export const urlPrefix = process.env.URL_PREFIX || '';

export const transactionTypes = {
    'bonus_up': 'Начисление бонусов',
    'bonus_down': 'Cписание бонусов',
    'purchase': 'Покупка',
    'prepaid_up': 'Пополнение предоплаченной карты',
    'prepaid_down': 'Списание с предоплаченной карты',
    'bonus_burn': 'Сгорание бонусов',
    'return': 'Возврат покупки',
    'manual': 'Ручная корректировка',
    'level_up': 'Покупка уровня',
    'level_prolong': 'Продление уровня',
};

export const cardStatus = {
    active: 'Активная',
    inactive: 'Неактивная',
    registered: 'Зарегистрированная',
    blocked: 'Заблокированная'
};

export const userStatuses = {
    silver: 'Серебрянный',
    gold: 'Золотой',
    titan: 'Титановый'
};
