import { _decorator, Component, Node, Label, Enum, Input, Prefab, instantiate, assert, SpriteFrame, find } from 'cc';
import { detailedTextLabel } from './detailedTextLabel';
import { failureLabel } from './failureLabel';
import { mainGameMgr } from './mainGameMgr';
import { musicMgr } from './musicMgr';
import { physicEmojiLayer } from './physicEmojiLayer';
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
    };
    export enum MUSIC_TYPE{
        BACKGROUND,
        REDPACKET
    };
    export enum DIFFICLUT_LEVEL{
        BASE_JUST_SPEED_UP,
        UPDATE_EMOJI_LAYER,
        UPDATE_YXH_LAYER
    };
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
    @property({type:Prefab,tooltip:"表情特效LAYER"})
    emojiLayer:Prefab;

    private _emojiLayer:Node = null;//节省资源，如果生成一次表情层，就不会销毁了

    FAILURE_NUM = 10;

    status:__externelType.GAME_STATUS = __externelType.GAME_STATUS.BEGINSTART;

    private _currentMoney = 0;
    private _speedUpLevel = [100,300,600,1000,2000,3500,6000,10000,20000,50000,100000,200000];
    private _speedUpIndex = 0;

    startGame(){
        this.moneyValue.getChildByName('moneyVal').getComponent(Label).string = '0';
        this.punishValue.getChildByName('punishVal').getComponent(Label).string = this.FAILURE_NUM.toString();
        this.mainGameView.getComponent(mainGameMgr).gameStart();
        if(this._emojiLayer!=null)
        this._emojiLayer.destroy();
        this._emojiLayer = null;
        this._speedUpIndex = 0;//重制index
        this._currentMoney = 0;//重制金额
        this.status = __externelType.GAME_STATUS.BEGINSTART;
        this.infoLayer.destroyAllChildren();
        this.musicManager.regionPlay();


    }

    /**
     * @abstract 判断是否需要增加难度块，如果当前金额数在500以上，就增加表情块
     * @param level 
     * @returns 
     */
    usingDifficultBlock(level:__externelType.DIFFICLUT_LEVEL):boolean{

        if(level==__externelType.DIFFICLUT_LEVEL.UPDATE_EMOJI_LAYER){
            if(this._currentMoney >= 300)
            return true;
        }
        return false;
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
                break;
            case __externelType.LAYER_TYPE.EMOJI_JUMP_LAYER:
                if(this._emojiLayer==null||this._emojiLayer==undefined)
                {
                   
                    this._emojiLayer = instantiate(this.emojiLayer);
                    this.infoLayer.addChild(this._emojiLayer);
                }
                this._emojiLayer.getComponent(physicEmojiLayer).resetEmoji(infor as string);

                break;
            default:
                break;
        }
    }

    private _neewSpeedUP():boolean{
       
        if(this._currentMoney>=this._speedUpLevel[this._speedUpIndex]){

            this._speedUpIndex++;
            if(this._speedUpIndex>=this._speedUpLevel.length)
            this._speedUpIndex = this._speedUpLevel.length - 1;
            return true;

        }
        return false;
    }

    updateValue(moneyVal:number,punishVal:number){
        //Input.EventType
        const oldmonval:number = Number(this.moneyValue.getChildByName('moneyVal').getComponent(Label).string);
        const oldpunishval:number = Number(this.punishValue.getChildByName('punishVal').getComponent(Label).string);
        this.moneyValue.getChildByName('moneyVal').getComponent(Label).string = (moneyVal + oldmonval).toFixed(2).toString();
        if(punishVal + oldpunishval<0)
        punishVal = -oldpunishval;
        this.punishValue.getChildByName('punishVal').getComponent(Label).string = (punishVal + oldpunishval).toString();
        this._currentMoney = moneyVal + oldmonval;
        if(moneyVal>0)
        {
            assert(this.musicManager);
            this.musicManager.playOneShot('money');
            
            this.rewardNotificationNode.getComponent(rewardNotificationBlk).triggerAction(moneyVal);
            //判断加速的条件
            if(this._neewSpeedUP()){
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

