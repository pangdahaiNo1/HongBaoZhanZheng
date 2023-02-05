import { _decorator, Component, Node, CCInteger, math, Label, assert, Sprite, Input } from 'cc';
import { blockInterface } from './sayBlockInterface';
import { totalGameMgr, __externelType } from './totalGameMgr';
const { ccclass, property } = _decorator;

@ccclass('textSayBlock')
export class textSayBlock extends blockInterface {

    static textSel: string[] = ["好！", "大红包！", "舒服！", "水群", "我是手气王！", "就这点？", "这就是你的极限吗", "我不做人了！", "各位留点给我", "你是故意的还是不小心的？"];
    static emojiSel: string[] = ["🐮", "👍", "😄", "🌹", "🧧", "😠", "🎉"];
    isEmoji: boolean = false;
    info: string = '';
    constructor(randomText: boolean = true, inform?: string) {
        super();
        if (randomText == true) {


            const randIndex = Math.floor(Math.random() * textSayBlock.textSel.length);
            this.info = textSayBlock.textSel[randIndex];


            //this.updateStr(textSayBlock.textSel[randIndex]);
        }
        else {
            assert(inform);
            this.info = inform;
            //this.updateStr(inform);
        }
    }
    changeOpac(ratio: number) {
        let color = this.node.getChildByName('chat_bubble').getComponent(Sprite).color;
        this.node.getChildByName('chat_bubble').getComponent(Sprite).color = (new math.Color(color.r, color.g, color.b, 255 * ratio));
        //this.node.getChildByName('red_packet').getComponent(Sprite).color.set(new math.Color(color.r,color.g,color.b,255*ratio));
    }
    updateStr(info: string) {
        this.info = info;
        this.node.getChildByName('chat_bubble').children[0].getComponent(Label).string = info;
    }
    start() {
        
        this.updateStr(this.info);
        this.node.on(Input.EventType.TOUCH_START, (a) => {
            //console.log("JJJJJ");
            this.changeOpac(0.5);
        }, this);
        this.node.on(Input.EventType.TOUCH_END, this.onClick, this);
        this.node.on(Node.EventType.PARENT_CHANGED,()=>{
            if(this.gameMainView!=null){
                if(true)
                {
                    const randIndex = Math.floor(Math.random() * textSayBlock.emojiSel.length);
                    this.info = textSayBlock.emojiSel[randIndex];
                    //console.log(this.info);
                    this.node.getChildByName('chat_bubble').children[0].getComponent(Label).string = textSayBlock.emojiSel[randIndex];
                    this.gameMainView.getComponent(totalGameMgr).addLayer(__externelType.LAYER_TYPE.EMOJI_JUMP_LAYER,this.info);
                    this.node.off(Node.EventType.PARENT_CHANGED);
                }
            }
        },this);
        //if(this.info.match)
    }

    update(deltaTime: number) {

    }
    onClick() {
        this.changeOpac(1);
        assert(this.gameMainView);
        this.gameMainView.getComponent(totalGameMgr).addLayer(__externelType.LAYER_TYPE.BASE_TEXT_LAYER, this.node.getChildByName('chat_bubble').children[0].getComponent(Label).string);

    }
    onDisappear() {
        return;
    }
    onDisable() {
        this.onDisappear();
    }

    @property({ type: Node, tooltip: '游戏主视图' })
    gameMainView:Node;
    @property({ type: CCInteger, tooltip: '完成它指定任务可以获得的奖励' })
    moneyValue: number;
    @property({ type: CCInteger, tooltip: '任务失败扣除的生命值' })
    punishValue: number;
}

