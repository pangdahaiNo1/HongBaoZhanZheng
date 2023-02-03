import { _decorator, Component, Node } from 'cc';
import { mainGameMgr } from './mainGameMgr';
const { ccclass, property } = _decorator;
export interface sayBlockInterface {
    /**
     *     - onClick()点击触发事件
    - onDIsappear() 要离开窗口时会发生的事件
    - onAppear()出现在视图中时会发生的事件
    - //isTrigger 如果完成了这个块需要的操作，它就会自动删除
    - gameMainView 绑定到游戏主视图，方面向上进行操作
    - moneyValue 这个块所能得到的金钱值，增加金钱值
    - punishValue 这个块能达到的惩罚值，扣除生命值

     */
    onClick();
    onDisappear();
    gameMainView:Node;
    moneyValue:number;
    punishValue:number;
}
export abstract class blockInterface extends Component{
    abstract onClick();
    abstract onDisappear();
    gameMainView:Node;
    moneyValue:number;
    punishValue:number;
}

