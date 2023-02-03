import { _decorator, Component, Node, game, UITransform, math, Prefab, random, instantiate, Vec2, Vec3, AudioSource, CCInteger } from 'cc';
import { redPacketsBlock } from './redPacketsBlock';
import {blockInterface, sayBlockInterface} from './sayBlockInterface'
import { totalGameMgr } from './totalGameMgr';
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
    @property({ type: Prefab, tooltip: '对话块的预制体' })
    blockPrefab: Prefab[] = [];
    @property({type:totalGameMgr,tooltip:'整个游戏界面的管理'})
    totalMgr:totalGameMgr = null!;
    
    private _moveInterval = 900;
    private _moveTimePassed = 0;
    private _moveIntervalDecRatio = 0.9;

    increaseSpeed(){
        this._moveInterval *= this._moveIntervalDecRatio;
    }

    start() {
        this.transform = this.getComponent(UITransform);
        this.gameStart();
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
            this._moveTimePassed += deltaTime*1000;//deltaTime单位为s，需要转换为ms
            if(this._moveTimePassed>=this._moveInterval)
            {
                this.addBlock(this.getOneBlock());
                this._moveTimePassed = 0;
            }
        }
    }

    updateValue(moneyValue: number, punishValue: number) {
        
    }

    gameStart() {
        this.gameBegin = true;
    }

    onClickDebug() {
        this.addBlock(this.getOneBlock());
        console.log(this.node.children.length);
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
            console.log("OFFSET"+offset);
            regionPoint.y = newY;
            //如果超过这个Y，就把这个块删除
            const maxPosY = (1-this.transform.anchorPoint.y)*this.transform.height;
            this.node.children.forEach(element => {
                const pos = element.position;
                if(maxPosY +blockTrans.anchorY*blockTrans.height <= pos.y+offset)
                {
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
        block.setPosition(regionPoint);


    }
    getOneBlock(): Node {

        try {
            if (this.blockPrefab.length == 0)
                throw console.error("BLOCKPREFABSIZELESSTHAN1!!");
            const getIndex = Math.floor(Math.random() * this.blockPrefab.length);
            //console.log(getIndex);
            return instantiate(this.blockPrefab[getIndex]);

        } catch (error) {

        }
    }
}

