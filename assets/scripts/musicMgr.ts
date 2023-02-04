import { _decorator, Component, Node, AudioSource, AudioClip, resources, tween, VideoPlayer, input, Input, find, director } from 'cc';
import { dir } from 'console';
const { ccclass, property } = _decorator;

@ccclass('musicMgr')
export class musicMgr extends Component {
   


    _backgroundAudioSource:AudioSource;
   
    _effectAudioSource:AudioSource;
    bgmSpeed:number = 0.7;
    SPEEDUPRATIO = 1.1;
    MAXSPEED = 2.0;
    _currentTime = 0;

    _firstSetUp = true;

    constructor(){
        super();
        //设置常驻节点
       
    }
    speedUp(){
        this.bgmSpeed = this.bgmSpeed*this.SPEEDUPRATIO;
        const player = this.node.getComponent(VideoPlayer);
        if(player!=null)
        {
            player.playbackRate = this.bgmSpeed>this.MAXSPEED?this.MAXSPEED:this.bgmSpeed;
            
        }

    }
    disableVolumeAndPlay(){
        if(this.node.getComponent(VideoPlayer)!=null){
        this.node.getComponent(VideoPlayer).volume=0;
        this.node.getComponent(VideoPlayer).play();}
    }
/**
 * @author liuyunhai
 * @summary 因为web设计，需要在点击的时候才能自动播放，所以先播放一下
 */
    regionPlay(){
        this.playOneShot('money',0);
        const player = this.node.getComponent(VideoPlayer);
        if(player!=null)
        {
            //input.off(Input.EventType.TOUCH_START,()=>{},this);
            this.node.getComponent(VideoPlayer).volume=1;
            //input.off(Input.EventType.TOUCH_START,()=>{},this);
            player.play();
            player.loop = true;
            this.bgmSpeed = 0.7;
            player.playbackRate = this.bgmSpeed;
            player.currentTime = 0;
           // console.log("PLAYER START");
        }
        //const canvas = find('Canvas');
        //canvas.off(Input.EventType.TOUCH_START);
        
        
    }

    start() {
        this.node.removeFromParent();
        director.getScene().addChild(this.node);
        director.addPersistRootNode(this.node);


        this._backgroundAudioSource =  this.node.addComponent(AudioSource);
        this._effectAudioSource = this.node.addComponent(AudioSource);
        //const canvas = find('Canvas');
        //canvas.on(Input.EventType.TOUCH_START,this.regionPlay,this);
        //input.on(Input.EventType.TOUCH_START,this.disableVolumeAndPlay,this);
       
        //const player = this.node.getComponent(VideoPlayer);
       
    }

    update(deltaTime: number) {
    }
    /**
     * @en
     * play short audio, such as strikes,explosions
     * @zh
     * 播放短音频,比如 打击音效，爆炸音效等
     * @param sound clip or url for the audio
     * @param volume 
     */
    playOneShot(sound: AudioClip | string, volume: number = 1.0) {
        if (sound instanceof AudioClip) {
            this._effectAudioSource.playOneShot(sound, volume);
        }
        else {
            resources.load(sound, (err, clip: AudioClip) => {
                if (err) {
                    console.log(err);
                }
                else {
                    this._effectAudioSource.playOneShot(clip, volume);
                }
            });
        }
    }

    /**
     * @en
     * play long audio, such as the bg music
     * @zh
     * 播放长音频，比如 背景音乐
     * @param sound clip or url for the sound
     * @param volume 
     */
    play(sound: AudioClip | string, volume: number = 1.0) {
        if (sound instanceof AudioClip) {
            this._backgroundAudioSource.clip = sound;
            this._backgroundAudioSource.play();
            this._backgroundAudioSource.volume = volume;
        }
        else {
            resources.load(sound, (err, clip: AudioClip) => {
                if (err) {
                    console.log(err);
                }
                else {
                    this._backgroundAudioSource.clip = clip;
                    this._backgroundAudioSource.play();
                    this._backgroundAudioSource.volume = volume;
                }
            });
        }
        //this.currentTime = 0;
    }

    /**
     * stop the audio play
     */
    stop() {
        this._backgroundAudioSource.stop();
        //this.currentTime = 0;
    }

    /**
     * pause the audio play
     */
    pause() {
        this._backgroundAudioSource.pause();
    }

    /**
     * resume the audio play
     */
    resume(){
        this._backgroundAudioSource.play();
        //this.currentTime = 0;
    }
}


