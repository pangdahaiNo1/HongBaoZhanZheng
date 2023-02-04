"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = exports.unload = exports.load = void 0;
const load = function () {
    console.debug('adsense-h5g-plugin load');
};
exports.load = load;
const unload = function () {
    console.debug('adsense-h5g-plugin unload');
};
exports.unload = unload;
const options = {
    hooks: './hooks',
    options: {
        adsensePropertyCode: {
            label: 'i18n:adsense-h5g-plugin.options.adsensePropertyCode',
            description: 'i18n:adsense-h5g-plugin.options.adsensePropertyCodeTips',
            render: {
                ui: 'ui-input',
                attributes: {
                    placeholder: 'i18n:adsense-h5g-plugin.options.adsensePropertyCodePlaceholder',
                },
            },
            verifyRules: ['adsensePropertyCodeRule'],
        },
        enableTestAd: {
            label: 'i18n:adsense-h5g-plugin.options.enableTestAd',
            description: '18n:adsense-h5g-plugin.options.enableTestAdTips',
            default: false,
            render: {
                ui: 'ui-checkbox',
            },
        },
    },
    verifyRuleMap: {
        adsensePropertyCodeRule: {
            message: 'i18n:adsense-h5g-plugin.adsensePropertyCodeRule_msg',
            func(val, buildOptions) {
                var regex = new RegExp('^ca-pub-\\d+$');
                return regex.test(val);
            },
        },
    }
};
// only web-desktop and web-mobile can use AdSense
exports.configs = {
    'web-desktop': options,
    'web-mobile': options,
};
