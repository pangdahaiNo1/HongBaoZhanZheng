import { _decorator, Component, Node, Button, Label, tween, UITransform, Vec2, math, size, Vec3, Input, Tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('cutAKnifeLabel')
export class cutAKnifeLabel extends Component {
    @property({type:Node,tooltip:""})
    closeBtn:Node;
    @property({type:Node})
    cutBtn:Node;
    @property({type:Node})
    remianMoneyLabel:Node;

    interval:number = 0.01;
    baseNum:number = 0.1;
    fixNum:number = 2;

    start() {
        this.node.on(Input.EventType.TOUCH_START,()=>{},this);
        const nodeContentSize = this.remianMoneyLabel.getComponent(UITransform).contentSize.clone();
        this.remianMoneyLabel.getComponent(Label).string = "还有"+this.baseNum.toString()+"元！";
        //console.log(this.remianMoneyLabel);
        const a = tween(this.remianMoneyLabel).to(0.3,{scale:new Vec3(1.3,1.3,1)});
        const b = tween(this.remianMoneyLabel).to(0.3,{scale:new Vec3(1,1,1)});
        const c = tween(this.remianMoneyLabel).sequence(a,b);
        tween(this.remianMoneyLabel).repeatForever(c).start();
        //tween(this.remianMoneyLabel).repeatForever(a,b);
    }

    cut(){
       const newVal =  this.baseNum - this.interval;
       if(newVal<=this.interval){
        this.interval /= 10;
        this.fixNum = this.fixNum<=6?this.fixNum+1:6;
       }
       this.baseNum -= this.interval;

       this.remianMoneyLabel.getComponent(Label).string = "还有"+this.baseNum.toFixed(this.fixNum).toString()+"元！";
    }

    close(){
        this.node.removeFromParent();
        this.node.destroy();
    }
    update(deltaTime: number) {
        
    }
}

