import { _decorator, Component, Node, assert, Input, CCInteger, Sprite, math } from 'cc';
import { blockInterface } from './sayBlockInterface';
import { totalGameMgr, __externelType } from './totalGameMgr';
const { ccclass, property } = _decorator;

@ccclass('helpCutBlock')
export class helpCutBlock extends blockInterface {
    changeOpac(ratio:number){
        let color = this.node.getChildByName('red_packet').getComponent(Sprite).color;
        this.node.getChildByName('red_packet').getComponent(Sprite).color = (new math.Color(color.r,color.g,color.b,255*ratio));
        //this.node.getChildByName('red_packet').getComponent(Sprite).color.set(new math.Color(color.r,color.g,color.b,255*ratio));
    }
    start() {
        this.node.on(Input.EventType.TOUCH_START,(a)=>{
            //console.log("JJJJJ");
            this.changeOpac(0.5);
        },this);
        this.node.on(Input.EventType.TOUCH_END,this.onClick,this);
    }

    update(deltaTime: number) {
        
    }
    onClick(){
        this.changeOpac(1);
        assert(this.gameMainView);
        this.gameMainView.getComponent(totalGameMgr).addLayer(__externelType.LAYER_TYPE.PDD_LAYER,null);

    }
    onDisappear(){
        return;
    }
    onDisable(){
        this.onDisappear();
    }
    @property({type:Node,tooltip:'游戏主视图'})
    gameMainView:Node;
    @property({type:CCInteger,tooltip:'完成它指定任务可以获得的奖励'})
    moneyValue:number;
    @property({type:CCInteger,tooltip:'任务失败扣除的生命值'})
    punishValue:number;
}

