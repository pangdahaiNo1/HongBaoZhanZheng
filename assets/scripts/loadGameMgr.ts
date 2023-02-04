import { _decorator, Component, Node, Scene, director, tween, Vec3, SceneAsset, ProgressBar } from 'cc';
import { assert } from 'console';
import { H5GamesAds, InterstitialType } from '../adsense-h5g-api/H5GamesAds';
const { ccclass, property } = _decorator;

@ccclass('loadGameMgr')
export class loadGameMgr extends Component {
    @property({type:Node,tooltip:"TITLE"})
    title:Node;
    @property({type:Node,tooltip:"progress Panel"})
    progressPanel:Node;
    @property({type:ProgressBar,tooltip:"progress Bar"})
    progressBar:ProgressBar;
    clickLoadBtn(Msg){
        //console.log("LOADING");
        //assert(this.progressBar!=null);
        //assert(this.progressPanel!=null);
        //window.ad
        if(this.progressBar==null||this.progressPanel==null)
        {
            console.error("ERROR");
            return;
        }
        this.progressPanel.active = true;
        director.preloadScene("Main",(completedCount: number, totalCount: number, item: any)=>{
           this.progressBar.progress = completedCount/totalCount;
        },(error: Error, sceneAsset?: SceneAsset)=>{director.loadScene("Main");
    });
        
    }

    onLoad(){
      // H5GamesAds.showInterstitialAd(InterstitialType.Browse);
    }
    start() {
        const a = tween(this.title).to(0.3,{scale:new Vec3(1.3,1.3,1)});
        const b = tween(this.title).to(0.3,{scale:new Vec3(1,1,1)});
        const c = tween(this.title).sequence(a,b);
        this.progressPanel.active = false;
        tween(this.title).repeatForever(c).start();
    }

    update(deltaTime: number) {
        
    }
}

