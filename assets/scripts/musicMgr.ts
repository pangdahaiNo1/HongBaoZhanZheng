import { _decorator, Component, Node, AudioSource, AudioClip, resources, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('musicMgr')
export class musicMgr extends Component {
   
    _backgroundAudioSource:AudioSource;
   
    _effectAudioSource:AudioSource;
    bgmSpeed:number = 0.5;
    
    start() {
        this._backgroundAudioSource =  this.node.addComponent(AudioSource);
        this._effectAudioSource = this.node.addComponent(AudioSource);
        //this._backgroundAudioSource.loop = true;
        this.play("backgroundmusic");
        tween(this._backgroundAudioSource).to(
            this._backgroundAudioSource.duration/this.bgmSpeed,{currentTime:this._backgroundAudioSource.duration}
            ).to(
            this._backgroundAudioSource.duration/this.bgmSpeed,{currentTime:0}
        ).repeatForever().start();

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
        this.currentTime = 0;
    }

    /**
     * stop the audio play
     */
    stop() {
        this._backgroundAudioSource.stop();
        this.currentTime = 0;
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
        this.currentTime = 0;
    }
}


