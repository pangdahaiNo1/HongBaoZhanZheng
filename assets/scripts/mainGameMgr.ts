import { _decorator, Component, Node, game, UITransform, math, Prefab, random, instantiate, Vec2, Vec3, AudioSource, CCInteger, assert, tween, Layout, Widget, UIOpacity, Tween } from 'cc';
import { redPacketsBlock } from './redPacketsBlock';
import {blockInterface, sayBlockInterface} from './sayBlockInterface'
import { textSayBlock } from './textSayBlock';
import { totalGameMgr, __externelType } from './totalGameMgr';
const { ccclass, property } = _decorator;

@ccclass('mainGameMgr')
export class mainGameMgr extends Component {
    /**
     * -   addBlock() 添加对话条，会随机生成，可能是对话条，红包条，虚伪红包条，砍一刀条、求发红包对话条
         -   每隔一段时间，就会弹出一个块，如果块超过了视图范围，就会把它销毁，销毁前会调用onDisappear()
         -   bool upSpeedStage;在update里，用这个进行判断，如果满足要求，就增加块的增加速度
     -   一个金钱值显示 一个生命值显示
     -   updateValue(moneyValue，punishValue)；被对话块调用，修改金钱值和生命值
     */
    gameBegin: boolean = false;
    //contentSize:math.Size;
    transform: UITransform;
    currentY: number = 0;
    @property({ type: [Prefab], tooltip: '对话块的预制体' })
    blockPrefab: Prefab[] = [];
    @property({type:[Prefab],tooltip:"可以获得钱包奖励的预制体"})
    moneyBlockPrefab:Prefab[] = [];
    @property({type:[Prefab],tooltip:"不能获得奖励的干扰"})
    nomoneyBlockPrefab:Prefab[] = [];
    @property({type:totalGameMgr,tooltip:'整个游戏界面的管理'})
    totalMgr:totalGameMgr = null!;
    @property({type:Prefab,tooltip:"BASETEXTBLOCK"})
    baseTextBlock:Prefab;
    private INITIALINTERVAL = 900;
    private MININTERVAL = 500;
    private _moveInterval = 900;
    private _moveTimePassed = 0;
    private _moveIntervalDecRatio = 0.7;
    private RIGHTALIGN = 20;

    //收到红包的概率
    private CHOOSEMONEYCHANCE = 0.39;

    increaseSpeed(){
        this._moveInterval *= this._moveIntervalDecRatio;
        if(this._moveInterval<this.MININTERVAL)
        this._moveInterval = this.MININTERVAL;
    }

    start() {
        this.transform = this.getComponent(UITransform);
        //this.gameStart();
        /*
        this.addBlock(this.getOneBlock());
        this.addBlock(this.getOneBlock());
        this.addBlock(this.getOneBlock());
        this.addBlock(this.getOneBlock());
        this.addBlock(this.getOneBlock());
        this.addBlock(this.getOneBlock());*/
    }

    update(deltaTime: number) {
        if(this.gameBegin){
            if(this.totalMgr.status==__externelType.GAME_STATUS.BEGINSTART){
                const node = instantiate(this.baseTextBlock);
                node.getComponent(textSayBlock).updateStr("准备好了吗？");
                this.addBlock(node);
                this.gameBegin = false;
                this.scheduleOnce(()=>{
                    const node = instantiate(this.baseTextBlock);
                    node.getComponent(textSayBlock).updateStr("要开始了！");
                    this.addBlock(node);
                },1);
                this.scheduleOnce(()=>{
                    const node = instantiate(this.baseTextBlock);
                    node.getComponent(textSayBlock).updateStr("开始！🎉");
                    this.addBlock(node);
                    this.gameBegin = true;
                    
                },1.5);
                this.totalMgr.status=__externelType.GAME_STATUS.START;
            }
            else if(this.totalMgr.status == __externelType.GAME_STATUS.START){
            this._moveTimePassed += deltaTime*1000;//deltaTime单位为s，需要转换为ms
            if(this._moveTimePassed>=this._moveInterval)
            {   
                this.addBlock(this.getOneBlock());
                this._moveTimePassed = 0;
            }}
        }
    }

    updateValue(moneyValue: number, punishValue: number) {
        
    }

    gameStart() {
        //this.addBlock();
         //this.gameBegin = true;
        this.node.destroyAllChildren();
         //this.node.removeAllChildren();
        this.gameBegin = true;
        this.currentY = 0;
        this._moveInterval = this.INITIALINTERVAL;
        this._moveTimePassed = 0;
       
    }

    onClickDebug() {
        this.addBlock(this.getOneBlock());
        //console.log(this.node.children.length);
    }

    addBlock(block: Node) {
        //如果新加的块不超过主界面范围，就从上往下加，否则从下往上调整位置
        let regionPoint: Vec3 = new Vec3();
        //this.node.addChild(block);
        const blockTrans = block.getComponent(UITransform);
        regionPoint.x = block.position.x;
        regionPoint.y = -this.currentY + (1-this.transform.anchorPoint.y) * this.transform.height - (1-blockTrans.anchorPoint.y) * blockTrans.height;
        regionPoint.z = 0;
        if (this.currentY + blockTrans.height >= this.transform.height) {
            const newY = -this.transform.height + (1-this.transform.anchorPoint.y) * this.transform.height + blockTrans.anchorPoint.y * blockTrans.height;
            
            const offset = newY - regionPoint.y;
            //console.log("OFFSET"+offset);
            regionPoint.y = newY;
            //如果超过这个Y，就把这个块删除
            const maxPosY = (1-this.transform.anchorPoint.y)*this.transform.height;
            this.node.children.forEach(element => {
                const pos = element.position;
                if(maxPosY +blockTrans.anchorY*blockTrans.height <= pos.y+offset)
                {
                    element.getComponent(blockInterface).onDisappear();
                    element.destroy();
                   
                }
                else
                element.setPosition(pos.x, pos.y + offset, pos.z);

            });
            this.currentY = this.transform.height;
        } else {
            this.currentY += blockTrans.height;
        }
        block.getComponent(blockInterface).gameMainView = this.totalMgr.node;
        this.node.addChild(block);
        
        if(block.getComponent(Widget)==null){
            const widget = block.addComponent(Widget);
            widget.right = 20;

        }
        if(block.getComponent(UIOpacity)==null){
            block.addComponent(UIOpacity);
        }
        block.getComponent(UIOpacity).opacity = 100;
        //所有子部件都要Widget
        block.getComponent(Widget).updateAlignment();
        //配置一下动画
        regionPoint.x = block.position.x;
        //这里没有考虑方向，全都放置在左边了
        block.getComponent(Widget).enabled = false;
        //block.getComponent(Widget).updateAlignment
        //console.log(regionPoint.x);
        regionPoint.x -= 60;
        block.setPosition(regionPoint);
        //regionPoint.x -= 30;
        const a = tween(block).by(0.2,{position:new Vec3(60,0,0)},{
            easing: 'smooth',
            onUpdate: (target: Node, ratio: number) => {        // onUpdate 接受当前缓动的进度
                                 // 将缓动系统计算出的结果赋予 node 的位置
              //console.log(ratio);
              target.getComponent(UIOpacity).opacity = 100 + (255-100)*ratio;
            }
        }).start();
        //const b = tween(block.getComponent(UIOpacity)).to(0.2,{opacity:255});
        

    }
    getOneBlock(): Node {

        try {
           
            const moneyChance = Math.random();
            if(moneyChance>=this.CHOOSEMONEYCHANCE&&this.moneyBlockPrefab.length>0){
                const getIndex = Math.floor(Math.random() * this.moneyBlockPrefab.length);
                return instantiate(this.moneyBlockPrefab[getIndex]);

            }
            else if(this.nomoneyBlockPrefab.length>0){
                const getIndex = Math.floor(Math.random() * this.nomoneyBlockPrefab.length);
                return instantiate(this.nomoneyBlockPrefab[getIndex]);

            }
            else{
                throw console.error("PREFAB EMPTY!");

            }
            return new Node();

        } catch (error) {

        }
    }
}

