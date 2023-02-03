import { _decorator, Component, Node, Label, assert, UITransform, tween, Vec2, Input } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('detailedTextLabel')
export class detailedTextLabel extends Component {
    @property({type:Label,tooltip:"文字子节点"})
    label:Label;
    str:string;
    constructor(str?:string){
        super();
        this.str = str;

    }
    updateStr(info:string){
        //this.label.string = info;
        //console.log(info+"hhh");
        this.node.getChildByName('Label').getComponent(Label).string = info;
    }
    start() {
        //this.label.string = this.str;
        assert(this.node.parent);
        const size = this.node.parent.getComponent(UITransform).contentSize;
        //console.log(size);
        //this.node.getComponent(UITransform).contentSize = new Vec2(300,300);
        tween(this.node.getComponent(UITransform)).to(0.3,{contentSize:size}).call(()=>{
            this.node.on(Input.EventType.TOUCH_END,()=>{this.node.destroy()},this);
        }).start();
       

    }

    update(deltaTime: number) {
        
    }
}

