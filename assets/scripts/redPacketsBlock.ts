import { _decorator, Component, Node, CCInteger, assert, input, Input, Sprite, color, math } from 'cc';
import {blockInterface, sayBlockInterface} from './sayBlockInterface'
import { totalGameMgr } from './totalGameMgr';
const { ccclass, property } = _decorator;

@ccclass('redPacketsBlock')
export class redPacketsBlock extends blockInterface{
    finish:boolean = false;
    start() {
        this.node.on(Input.EventType.TOUCH_END,this.onClick,this);
        //this.node.on(Input.EventType.TOUCH_CANCEL,this.onClick)
    
    }

    changeOpac(ratio:number){
        let color = this.node.getChildByName('red_packet').getComponent(Sprite).color;
        this.node.getChildByName('red_packet').getComponent(Sprite).color = (new math.Color(color.r,color.g,color.b,255*ratio));
        //this.node.getChildByName('red_packet').getComponent(Sprite).color.set(new math.Color(color.r,color.g,color.b,255*ratio));
    }
    update(deltaTime: number) {
        
    }
    onClick(){
        //assert(this.gameMainView);
        this.changeOpac(0.5);
        if(!this.finish){
        this.finish = true;
        this.gameMainView.getComponent(totalGameMgr).updateValue(Math.ceil(math.random()*this.moneyValue*100)/100,0);}
    }
    onDisappear(){
        if(!this.finish)
        this.gameMainView.getComponent(totalGameMgr).updateValue(0,-this.punishValue);
    }
    onDisable(){
        //console.log("cicicici");
        //if(!this.finish)
        //this.onDisappear();
    }
    @property({type:Node,tooltip:'游戏主视图'})
    gameMainView:Node;
    @property({type:CCInteger,tooltip:'完成它指定任务可以获得的奖励'})
    moneyValue:number;
    @property({type:CCInteger,tooltip:'任务失败扣除的生命值'})
    punishValue:number;

}

