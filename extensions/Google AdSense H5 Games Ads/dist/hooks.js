"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.onAfterBuild = exports.throwError = void 0;
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const PACKAGE_NAME = 'adsense-h5g-plugin';
exports.throwError = true;
const onAfterBuild = function (options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        const packageOptons = options.packages[PACKAGE_NAME];
        if (!packageOptons.adsensePropertyCode) {
            return;
        }
        const dest = (0, path_1.join)(result.dest, 'index.html');
        const dataAdBreakTest = packageOptons.enableTestAd ? 'data-adbreak-test="on"' : '';
        let htmlContent = yield (0, fs_extra_1.readFile)(dest, 'utf8');
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
        yield (0, fs_extra_1.writeFile)(dest, htmlContent);
    });
};
exports.onAfterBuild = onAfterBuild;
const unload = function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`[${PACKAGE_NAME}] Unload cocos plugin example in builder.`);
    });
};
exports.unload = unload;
