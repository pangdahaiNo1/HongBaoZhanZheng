"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.methods = exports.unload = exports.load = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = __importDefault(require("path"));
const PACKAGE_NAME = 'adsense-h5g-plugin';
function log(...arg) {
    return console.log(`[${PACKAGE_NAME}] `, ...arg);
}
const load = () => {
    log("ProjectPath:", Editor.Project.path);
    const project_path = Editor.Project.path;
    const templates_dir = path_1.default.join(__dirname, "../templates");
    const assets_dir = path_1.default.join(project_path, "assets");
    const copy_list = [
        {
            src: path_1.default.join(templates_dir, "adsense-h5g-api"),
            dest: path_1.default.join(assets_dir, "adsense-h5g-api")
        },
    ];
    copy_list.forEach((value) => {
        if ((0, fs_extra_1.pathExistsSync)(value.dest) == false) {
            (0, fs_extra_1.copySync)(value.src, value.dest);
            Editor.Message.send('aset-db', 'refresh-asset');
        }
        else {
            console.log("Skipping:", value.dest);
        }
    });
};
exports.load = load;
const unload = () => {
    console.log("Adsense H5G Ads Plugin Disabled");
};
exports.unload = unload;
exports.methods = {
    openPanel() {
        Editor.Panel.open(PACKAGE_NAME);
    },
};
