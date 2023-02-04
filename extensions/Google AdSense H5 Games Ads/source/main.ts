import { BuildPlugin } from '../@types';
import { copySync, pathExistsSync } from 'fs-extra';
import path from 'path';

const PACKAGE_NAME = 'adsense-h5g-plugin';

function log(...arg: any[]) {
  return console.log(`[${PACKAGE_NAME}] `, ...arg);
}

export const load: BuildPlugin.load = () => {
  log("ProjectPath:", Editor.Project.path)

  const project_path = Editor.Project.path
  const templates_dir = path.join(__dirname, "../templates");
  const assets_dir = path.join(project_path, "assets");

  const copy_list = [
    {
      src: path.join(templates_dir, "adsense-h5g-api"),
      dest: path.join(assets_dir, "adsense-h5g-api")
    },
  ]

  copy_list.forEach((value: { src: string, dest: string }) => {
    if (pathExistsSync(value.dest) == false) {
      copySync(value.src, value.dest);
      Editor.Message.send('aset-db', 'refresh-asset');
    } else {
      console.log("Skipping:", value.dest)
    }
  })
}

export const unload: BuildPlugin.Unload = () => {
  console.log("Adsense H5G Ads Plugin Disabled")
}

export const methods: { [key: string]: (...any: any) => any } = {
  openPanel() {
    Editor.Panel.open(PACKAGE_NAME);
  },
};