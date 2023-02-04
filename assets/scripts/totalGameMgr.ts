import { _decorator, Component, Node, Label, Enum, Input, Prefab, instantiate, assert, SpriteFrame, find } from 'cc';
import { detailedTextLabel } from './detailedTextLabel';
import { failureLabel } from './failureLabel';
import { mainGameMgr } from './mainGameMgr';
import { musicMgr } from './musicMgr';
import { rewardNotificationBlk } from './rewardNotificationBlk';
const { ccclass, property } = _decorator;


export namespace __externelType {
   export enum LAYER_TYPE {
        BASE_TEXT_LAYER,
        EMOJI_JUMP_LAYER,
        PDD_LAYER,
        FAILURE_LAYER,
        IMAGE_TEXT_LAYER
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
    @property({type:musicMgr})
    musicManager:musicMgr;
    @property({type:Node})
    mainGameView:Node;
    @property({type:Node,tooltip:"每次获得金钱都会调用的"})
    rewardNotificationNode:Node;
    @property({type:Prefab,tooltip:"BASE_TEXT_LAYER"})
    textLayer:Prefab;
    @property({type:Prefab,tooltip:"FAILURE_LAYER"})
    failureLayer:Prefab;
    @property({type:Prefab,tooltip:"砍一刀"})
    cutOneLayer:Prefab;

    FAILURE_NUM = 10;

    status:__externelType.GAME_STATUS = __externelType.GAME_STATUS.BEGINSTART;
   

    startGame(){
        this.moneyValue.getChildByName('moneyVal').getComponent(Label).string = '0';
        this.punishValue.getChildByName('punishVal').getComponent(Label).string = this.FAILURE_NUM.toString();
        this.mainGameView.getComponent(mainGameMgr).gameStart();
        this.status = __externelType.GAME_STATUS.BEGINSTART;
        this.infoLayer.destroyAllChildren();
        this.musicManager.regionPlay();

    }

    start() {
        if(this.musicManager==null)
        this.musicManager = find('music').getComponent(musicMgr);
        this.startGame();
       
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
                console.log("FAIL!");
                const layernodes = instantiate(this.failureLayer);
                layernodes.getComponent(failureLabel).totalGameManager = this;
                layernodes.getComponent(failureLabel).updateStr(this.moneyValue.getChildByName('moneyVal').getComponent(Label).string);
                this.infoLayer.addChild(layernodes);
                break;
            case __externelType.LAYER_TYPE.IMAGE_TEXT_LAYER:
                const layernodex = instantiate(this.textLayer);
                this.infoLayer.addChild(layernodex);
                //layernodex.getComponent(detailedTextLabel)
                layernodex.getComponent(detailedTextLabel).updateSpriteFrame(<SpriteFrame>infor);
                break;
            case __externelType.LAYER_TYPE.PDD_LAYER:
                const layernodey = instantiate(this.cutOneLayer);
                this.infoLayer.addChild(layernodey);
                break
            default:
                break;
        }
    }

    updateValue(moneyVal:number,punishVal:number){
        //Input.EventType
        const oldmonval:number = Number(this.moneyValue.getChildByName('moneyVal').getComponent(Label).string);
        const oldpunishval:number = Number(this.punishValue.getChildByName('punishVal').getComponent(Label).string);
        this.moneyValue.getChildByName('moneyVal').getComponent(Label).string = (moneyVal + oldmonval).toFixed(2).toString();
        this.punishValue.getChildByName('punishVal').getComponent(Label).string = (punishVal + oldpunishval).toString();
        if(moneyVal>0)
        {
            assert(this.musicManager);
            this.musicManager.playOneShot('money');
            this.rewardNotificationNode.getComponent(rewardNotificationBlk).triggerAction(moneyVal);
            //判断加速的条件
            if(Math.floor(oldmonval/100)<Math.floor((oldmonval+moneyVal)/100)){
                assert(this.mainGameView);
                this.mainGameView.getComponent(mainGameMgr).increaseSpeed();
                this.musicManager.speedUp();
            }
           
        }
        if(punishVal+oldpunishval<=0){
            this.status = __externelType.GAME_STATUS.FAILURE;
            this.addLayer(__externelType.LAYER_TYPE.FAILURE_LAYER,null);
        }
    }
    update(deltaTime: number) {
        
    }
}

