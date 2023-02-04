import { _decorator, Component, Node, Label, tween, Vec3, UIOpacity, Tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('rewardNotificationBlk')
export class rewardNotificationBlk extends Component {

    label:Label;
    oldPosition:Vec3;
    start() {
        this.label = this.node.getChildByName('Label').getComponent(Label);
    }

    triggerAction(money:Number|String){
        this.label = this.node.getChildByName('Label').getComponent(Label);
        Tween.stopAllByTarget(this.node);
        if(this.oldPosition != null)
        this.node.position = this.oldPosition;
        if(money instanceof Number){
            this.label.string = "+" + money.toString() + "元！";
        }
        else{
            this.label.string = "+" + money + "元！";
        }
        this.node.active = true;
        this.oldPosition = this.node.position.clone();
        if(this.node.getComponent(UIOpacity)==null)
        this.node.addComponent(UIOpacity);
        this.node.getComponent(UIOpacity).opacity = 100;
        const a = tween(this.node).by(0.5,{position:new Vec3(0,30,0)},{
            easing: 'smooth',
            onUpdate: (target: Node, ratio: number) => {        // onUpdate 接受当前缓动的进度
                                 // 将缓动系统计算出的结果赋予 node 的位置
              target.getComponent(UIOpacity).opacity = 100 + (255-100)*ratio;
            }
        }).call(()=>{
            this.node.active = false;
            this.node.position = this.oldPosition;
        }).start();
    }


    update(deltaTime: number) {
        
    }
}

