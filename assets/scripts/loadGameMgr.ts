import { _decorator, Component, Node, Scene, director, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('loadGameMgr')
export class loadGameMgr extends Component {
    @property({type:Node,tooltip:"TITLE"})
    title:Node;
    clickLoadBtn(Msg){
        director.loadScene("Main");
    }

    start() {
        const a = tween(this.title).to(0.3,{scale:new Vec3(1.3,1.3,1)});
        const b = tween(this.title).to(0.3,{scale:new Vec3(1,1,1)});
        const c = tween(this.title).sequence(a,b);
        tween(this.title).repeatForever(c).start();
    }

    update(deltaTime: number) {
        
    }
}

