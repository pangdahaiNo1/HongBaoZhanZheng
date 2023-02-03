import { _decorator, Component, Node, Label, Enum, Input, Prefab, instantiate } from 'cc';
import { detailedTextLabel } from './detailedTextLabel';
const { ccclass, property } = _decorator;


export namespace __externelType {
   export enum LAYER_TYPE {
        BASE_TEXT_LAYER,
        EMOJI_JUMP_LAYER,
        PDD_LAYER,
        FAILURE_LAYER
    };
    export enum GAME_STATUS{
        TUTORIAL,
        BEGINSTART,
        START,
        FAILURE
    }
    export enum MUSIC_TYPE{
        BACKGROUND,
        REDPACKET
    }
}

@ccclass('totalGameMgr')
export class totalGameMgr extends Component {
    static LAYER_TYPE : typeof __externelType.LAYER_TYPE;
    static GAME_STATUS : typeof __externelType.GAME_STATUS;
    @property({type:Node,tooltip:'获取的金额数目'})
    moneyValue:Node;
    @property({type:Node,tooltip:'生命值'})
    punishValue:Node;
    @property({type:Node,tooltip:'点击某些按钮会触发的层次'})
    infoLayer:Node;
    @property({type:Prefab,tooltip:"BASE_TEXT_LAYER"})
    textLayer:Prefab;
    @property({type:Prefab,tooltip:"FAILURE_LAYER"})
    failureLayer:Prefab;
    start() {

    }


    addLayer(type:__externelType.LAYER_TYPE,infor:any){
        switch (type) {
            case __externelType.LAYER_TYPE.BASE_TEXT_LAYER:
                //如果是TEXT，传入的就是字符串
                const layernode = instantiate(this.textLayer);
                this.infoLayer.addChild(layernode);
                //console.log(infor);
                layernode.getComponent(detailedTextLabel).updateStr(<string>infor);
                break;
            case __externelType.LAYER_TYPE.FAILURE_LAYER:
                const layernodes = instantiate(this.failureLayer);
                this.infoLayer.addChild(layernodes);
                break
            default:
                break;
        }
    }

    updateValue(moneyVal:number,punishVal:number){
        //Input.EventType
        const oldmonval:number = Number(this.moneyValue.getChildByName('moneyVal').getComponent(Label).string);
        const oldpunishval:number = Number(this.punishValue.getChildByName('punishVal').getComponent(Label).string);
        this.moneyValue.getChildByName('moneyVal').getComponent(Label).string = (moneyVal + oldmonval).toString();
        this.punishValue.getChildByName('punishVal').getComponent(Label).string = (punishVal + oldpunishval).toString();
    }
    update(deltaTime: number) {
        
    }
}

