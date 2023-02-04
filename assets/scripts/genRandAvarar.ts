import { _decorator, Component, Node, resources, Sprite, assetManager, SpriteFrame, ImageAsset, Texture2D, director, UITransform } from 'cc';
import { url } from 'inspector';
import { networkInterfaces } from 'os';
//import { RandomAvator } from './avatarUrlArray';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('genRandAvarar')
export class genRandAvarar extends Component {

    private _MAXIMAGECONFIG = 6;
    private _IMAGEURL: string[] = [];
    private _IMAGETEXTURE: Texture2D[] = [];
    private _IMAGEELEMENTS:HTMLImageElement[] = [];
    //private _finishTimes  = 0;
    constructor() {
        super();
       
        let index = 0;
        for (index; index < this._MAXIMAGECONFIG;index++) {
            fetch("https://api.uomg.com/api/rand.avatar?sort=动漫女&format=json").then((response: Response) => {
                return response.text();
            }).then((value) => {
                let str = JSON.parse(value).imgurl as string;
                str = str.replace("\/", "/");
                this._IMAGEURL.push(str);
                const image = new Image();
                image.src = str;
                this._IMAGEELEMENTS.push(image);
                this.node.emit('FINISH'); 
            }).finally(()=>{});
        }
        // this.avatarEventEngine.dispatchEvent(new CustomEvent("FINISH"));
        // resources.load()

    }
    finishOnceLoad(){
        if(this._IMAGEELEMENTS.length>=this._MAXIMAGECONFIG){
            let finished = false;
            this._IMAGEELEMENTS.forEach(element => {
                if(element.complete==true&&finished==false)
               {
                     //const texture = new Texture2D();
            if(this.node.getComponent(Sprite)==null)
            this.node.addComponent(Sprite);
            const sprite = this.node.getComponent(Sprite);
            //document.body.appendChild(element);
            //element.crossOrigin = "*";
            var onecanvas = document.createElement("canvas");
            onecanvas.width = element.width;
            onecanvas.height = element.height;
            var ctx = onecanvas.getContext("2d");
            ctx.drawImage(element,0,0,element.width,element.height);
            var dataURL = onecanvas.toDataURL("image/png");
            var image = new Image();
            image.crossOrigin = "*";
            image.src = dataURL;

            sprite.spriteFrame = SpriteFrame.createWithImage(image);
            this.node.getComponent(UITransform).width = 100;
            this.node.getComponent(UITransform).height = 100;
               }
            });
            console.log("FINISH");
           
            //sprite.spriteFrame.texture = texture;

        }
    }

    genAImage(): string {
        if (this._IMAGEURL.length != 0)
            return this._IMAGEURL[Math.floor(Math.random() * this._IMAGEURL.length)];
        else {
            console.log("AIMAGE NULL!!!");
            return "";
        }
    }
    onLoad() {
        this.node.on('FINISH',this.finishOnceLoad,this);



    }
    start() {
        // console.log("nI");
        

    }
    update(deltaTime: number) {
        //console.log("hello");
        //console.log(deltaTime);
    }



}

