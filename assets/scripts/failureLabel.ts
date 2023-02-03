import { _decorator, Component, Node, Input, assert } from 'cc';
import { totalGameMgr } from './totalGameMgr';
const { ccclass, property } = _decorator;

@ccclass('failureLabel')
export class failureLabel extends Component {

    @property({type:totalGameMgr})
    totalGameManager:totalGameMgr;
    onClickResBtn(){
        assert(this.totalGameManager);
        this.totalGameManager.startGame();
        this.node.removeFromParent();
        this.node.destroy();
    }

    start() {
        this.node.on(Input.EventType.TOUCH_START,()=>{},this);
    }

    update(deltaTime: number) {
        
    }
}

