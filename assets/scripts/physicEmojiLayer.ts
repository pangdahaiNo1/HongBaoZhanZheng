import { _decorator, Component, Node, physics, PhysicsSystem2D, director, Label, Prefab, instantiate, Vec2, UIOpacity, UITransform, Vec3, tween } from 'cc';
import { emojiCompontent } from './emojiCompontent';
const { ccclass, property } = _decorator;

@ccclass('physicEmojiLayer')
export class physicEmojiLayer extends Component {

    private _emojiStackSize = 15;
    private _emojiStack: Node[] = [];
    private _emoji = '🐰';
    private _disappearTime = 5;
    private _emojiMaxScale = 2;
    @property({ type: Prefab, tooltip: "emoji prefab" })
    prefab: Prefab;
   

    onLoad() {

        PhysicsSystem2D.instance.enable = true;
        if (this.prefab != null)
            for (let index = 0; index < this._emojiStackSize; index++) {
                const child = instantiate(this.prefab);
                if (child.getComponent(emojiCompontent) == null)
                    child.addComponent(emojiCompontent);
                this._emojiStack.push(child);
                this.node.addChild(child);
            }
        if (this.node.getComponent(UIOpacity) == null) {
            this.node.addComponent(UIOpacity);
        }
    }

    _disappearSelf()
    {
        //console.log("BBBBB");
        tween(this.node.getComponent(UIOpacity)).to(0.5,{opacity:0}).call(()=>{
            this.node.active = false;
        }).start();
    }

    resetEmoji(data: String) {
        this.unschedule(this._disappearSelf);
        //this.node.active = false;
        this._emoji = data.toString();
        //console.log(this._emoji);
        const contentSize = this.node.getComponent(UITransform).contentSize;

        for (let index = 0; index < this._emojiStackSize; index++) {
            const child = this._emojiStack[index];
            child.getComponent(emojiCompontent).updataInformation(this._emoji);
            const scale = 1 + (this._emojiMaxScale-1)*Math.random();
            child.setScale(new Vec3(scale,scale,1))
            const childSize = child.getComponent(UITransform).contentSize.clone();
            childSize.width *= scale;
            childSize.height *= scale;
            child.angle = 1+Math.random()*2000;
            //重新设置起点
            const posX = contentSize.width / 2 - childSize.width / 2 - 10 - Math.random() * (contentSize.width - childSize.width - 20);
            const posY = (1 - this.node.getComponent(UITransform).anchorY) * contentSize.height + (child.getComponent(UITransform).anchorY) * childSize.height;
            child.setPosition(new Vec3(posX, posY, 0));
        }
        this.node.getComponent(UIOpacity).opacity = 255;
        this.node.active = true;
        this.scheduleOnce(this._disappearSelf,this._disappearTime);

    }



    start() {
        //this.resetEmoji('🐯');
    }

    update(deltaTime: number) {

    }
}

