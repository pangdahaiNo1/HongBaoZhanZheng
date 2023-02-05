import { _decorator, Component, Node, resources, Sprite, assetManager, SpriteFrame, ImageAsset, Texture2D, director, UITransform } from 'cc';
import { url } from 'inspector';
import { networkInterfaces } from 'os';
//import { RandomAvator } from './avatarUrlArray';
const { ccclass, property, executeInEditMode } = _decorator;

@executeInEditMode(true)
export class randAvatarList {
    private _avatarList:SpriteFrame[] = [];
    private _MAXSIZE = 6;
    private _hasEmit = false;
    eventTarget = new EventTarget();
    constructor(){
        for(let index=0;index<this._MAXSIZE;index++)
        assetManager.loadRemote("https://picsum.photos/200.webp",(err,texture)=>{
            //console.log(err == null||err == undefined);
            //console.log(err);
           if(texture!=null&&texture!=undefined){
           this._avatarList.push(SpriteFrame.createWithImage(texture as ImageAsset));
           if(this._hasEmit===false){
            this._hasEmit = true;
            console.log("EVENTFINISH");
            const event =  new CustomEvent("FINISH",null);
            this.eventTarget.dispatchEvent(event);
                }
            }else{
                console.log(err);
            }
        
    })
    }
    
    genAImage(): SpriteFrame|null {
        if (this._avatarList.length != 0)
            return this._avatarList[Math.floor(Math.random() * this._avatarList.length)];
        else {
            console.log("AIMAGE NULL!!!");
            return null;
        }
    }
}

@ccclass('genRandAvarar')
@executeInEditMode(true)
export class genRandAvarar extends Component {
    static avatarGen = new randAvatarList();
    //private _tempThis = this;
    constructor(){
        super();
        

    }
    onLoad(){
        genRandAvarar.avatarGen.eventTarget.addEventListener("FINISH",(e)=>{
            console.log("FINISH");
            if(this.node.getComponent(Sprite)==null)
        this.node.addComponent(Sprite);

        const frame = genRandAvarar.avatarGen.genAImage();
        this.node.getComponent(Sprite).spriteFrame = frame;
        },true);
    }
    start() {

      
    }
    update(deltaTime: number) {
        //console.log("hello");
        //console.log(deltaTime);
    }



}

