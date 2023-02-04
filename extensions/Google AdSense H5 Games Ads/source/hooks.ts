import { IBuildTaskOption, BuildHook } from '../@types';
import { join } from 'path';
import { readFile, writeFile } from 'fs-extra';

interface IOptions {
    adsensePropertyCode: string;
    enableTestAd: boolean;
}

const PACKAGE_NAME = 'adsense-h5g-plugin';

interface ITaskOptions extends IBuildTaskOption {
    packages: {
        'adsense-h5g-plugin': IOptions;
    };
}

export const throwError: BuildHook.throwError = true;

export const onAfterBuild: BuildHook.onAfterBuild = async function (options: ITaskOptions, result) {
    const packageOptons = options.packages[PACKAGE_NAME];
    if (!packageOptons.adsensePropertyCode) {
        return;
    }
    const dest = join(result.dest, 'index.html');
    const dataAdBreakTest = packageOptons.enableTestAd ? 'data-adbreak-test="on"' : ''

    let htmlContent = await readFile(dest, 'utf8');
    htmlContent = htmlContent.replace('</head>', function (str) {
        return `
        <script async
            data-ad-client="${packageOptons.adsensePropertyCode}"
            ${dataAdBreakTest}
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">
        </script>
        </head>
        `;
    });
    await writeFile(dest, htmlContent);
};

export const unload: BuildHook.unload = async function () {
    console.log(`[${PACKAGE_NAME}] Unload cocos plugin example in builder.`);
};
