import { _decorator, Component, Node, Input, assert, Label, tween, Vec3 } from 'cc';
import { totalGameMgr } from './totalGameMgr';
const { ccclass, property } = _decorator;

@ccclass('failureLabel')
export class failureLabel extends Component {

    @property({type:totalGameMgr})
    totalGameManager:totalGameMgr;
    @property({type:Label,tooltip:"获得的奖励Label"})
    rewardLabel:Label;

    updateStr(money:Number|String){
        if(money instanceof Number){
            this.rewardLabel.string = "收入" + money.toString() + "元！";
        }
        else{
            this.rewardLabel.string = "收入" + money + "元！";
        }
    }

    onClickResBtn(){
        assert(this.totalGameManager);
        this.totalGameManager.startGame();
        this.node.removeFromParent();
        this.node.destroy();
    }

    start() {
        this.node.on(Input.EventType.TOUCH_START,()=>{},this);
        const a = tween(this.rewardLabel.node).to(0.3,{scale:new Vec3(1.3,1.3,1)});
        const b = tween(this.rewardLabel.node).to(0.3,{scale:new Vec3(1,1,1)});
        const c = tween(this.rewardLabel.node).sequence(a,b);
        //this.progressPanel.active = false;
        tween(this.rewardLabel.node).repeatForever(c).start();
    }

    update(deltaTime: number) {
        
    }
}

