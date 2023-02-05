import { _decorator, Component, Node, resources, Sprite, assetManager, SpriteFrame, ImageAsset, Texture2D, director, UITransform } from 'cc';
import { url } from 'inspector';
import { networkInterfaces } from 'os';
//import { RandomAvator } from './avatarUrlArray';
const { ccclass, property, executeInEditMode } = _decorator;

@executeInEditMode(true)
export class randAvatarList {
    private _avatarList:SpriteFrame[] = [];
    private _MAXSIZE = 6;
    
    
    genAImage(sprite:Sprite){
        //console.log("XXX");
        if (this._avatarList!=null&&this._avatarList.length >= this._MAXSIZE){
            console.log("NICCCCC!")
            sprite.spriteFrame = this._avatarList[Math.floor(Math.random() * this._avatarList.length)];}
        else {
            assetManager.loadRemote("https://picsum.photos/seed/"+(Math.random()*1000).toFixed(0).toString()+"/200/300.webp",(err,texture)=>{
                if(err==null&&texture!=null&&texture!=undefined){
                const spriteframe = SpriteFrame.createWithImage(texture as ImageAsset);
                this._avatarList.push(spriteframe);
                 console.log("EVENTFINISH");
                 sprite.spriteFrame = spriteframe;
                 }else{
                     console.log(err);
                 }
             
         });
            //console.log("AIMAGE NULL!!!");
            //return null;
        }
    }
}

@ccclass('genRandAvarar')
@executeInEditMode(true)
export class genRandAvarar extends Component {
    static avatarGen = new randAvatarList();
    onLoad(){
        //genRandAvarar.avatarGen.eventTarget.addEventListener("FINISH",(e)=>{
            //console.log("GENIMAGE");
        if(this.node.getComponent(Sprite)==null)
        this.node.addComponent(Sprite);

        genRandAvarar.avatarGen.genAImage(this.node.getComponent(Sprite));
        //this.node.getComponent(Sprite).spriteFrame = frame;
    
    }
    start() {
       // if(this.node.getComponent(Sprite)==null)
       // this.node.addComponent(Sprite);
       // const frame = genRandAvarar.avatarGen.genAImage();
       // if(frame!=null)
       // this.node.getComponent(Sprite).spriteFrame = frame;
      
    }
    update(deltaTime: number) {
    }



}

