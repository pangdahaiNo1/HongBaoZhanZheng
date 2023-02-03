import { _decorator, Component, Node, Scene, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('loadGameMgr')
export class loadGameMgr extends Component {
    clickLoadBtn(Msg){
        director.loadScene("Main");
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

