import { _decorator, Component, Node, Label, Widget, UITransform, BoxCollider2D, RigidBody2D, CircleCollider2D, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('emojiCompontent')
export class emojiCompontent extends Component {

    @property({type:Label,tooltip:"文字节点对应的Label"})
    label:Label;
    start() {
        if(this.node.getChildByName('Label')==null&&this.label==null)
        {
         this.label = new Label();
         this.node.addChild(this.label.node);
         const wid = this.label.node.addComponent(Widget);
         wid.verticalCenter = 0;
         wid.horizontalCenter = 0;
         this.label.fontSize = this.node.getComponent(UITransform).width;
        }
        if(this.node.getComponent(CircleCollider2D)==null)
        {
            this.node.addComponent(CircleCollider2D);
        }
        if(this.node.getComponent(RigidBody2D)==null)
        {
            this.node.addComponent(RigidBody2D);
        }
        
        this.node.getComponent(CircleCollider2D).restitution = 0.8;

    }

   updataInformation(info:String){
    //if(info instanceof String){
        //console.log("NIC");
        if(info==null||info ==undefined)
        info = "🐰";
        this.label.string = info.toString();
    //}

   }

   


    update(deltaTime: number) {
        
    }
}

