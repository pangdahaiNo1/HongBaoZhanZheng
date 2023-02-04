
import { BuildPlugin } from '../@types';

export const load: BuildPlugin.load = function () {
    console.debug('adsense-h5g-plugin load');
};

export const unload: BuildPlugin.load = function () {
    console.debug('adsense-h5g-plugin unload');
};
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
    }

// only web-desktop and web-mobile can use AdSense
export const configs: BuildPlugin.Configs = {
    'web-desktop': options,
    'web-mobile': options,
};
