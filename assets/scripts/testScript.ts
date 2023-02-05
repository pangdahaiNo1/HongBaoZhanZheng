import { _decorator, Component, Node, director, PhysicsSystem2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('testScript')
export class testScript extends Component {
    onLoad(){
        PhysicsSystem2D.instance.enable = true;
    }
    start() {

    }

    update(deltaTime: number) {
        
    }
}

