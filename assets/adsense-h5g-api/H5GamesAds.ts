import { game } from "cc"

const AdsByGoogle = (window as any).adsbygoogle
const adBreak = function(o: any) {AdsByGoogle.push(o)}
const adConfig = function(o: any) {AdsByGoogle.push(o)}

export enum InterstitialType {
    Start = 'start',
    Pause = 'pause',
    Next = 'next',
    Browse = 'browse',
}

export class H5GamesAds
{
    private static showRewardedAdFn: any;
    private static rewardedAdReady = false;

    public static readonly EVENT_INTERSTITIAL_BEFORE_AD = 'H5GA_EVENT_INTERSTITIAL_BEFORE_AD';
    public static readonly EVENT_INTERSTITIAL_AFTER_AD = 'H5GA_EVENT_INTERSTITIAL_AFTER_AD';
    public static readonly EVENT_INTERSTITIAL_AD_BREAK_DONE = 'H5GA_EVENT_INTERSTITIAL_AD_BREAK_DONE';

    public static readonly EVENT_REWARDED_VIDEO_BEFORE_AD = 'H5GA_EVENT_REWARDED_VIDEO_BEFORE_AD';
    public static readonly EVENT_REWARDED_VIDEO_AFTER_AD = 'H5GA_EVENT_REWARDED_VIDEO_AFTER_AD';
    public static readonly EVENT_REWARDED_VIDEO_AD_BREAK_DONE = 'H5GA_EVENT_REWARDED_VIDEO_AD_BREAK_DONE';
    public static readonly EVENT_REWARDED_VIDEO_BEFORE_REWARD = 'H5GA_EVENT_REWARDED_VIDEO_BEFORE_REWARD';
    public static readonly EVENT_REWARDED_VIDEO_AD_DISMISSED = 'H5GA_EVENT_REWARDED_VIDEO_AD_DISMISSED';
    public static readonly EVENT_REWARDED_VIDEO_AD_VIEWED = 'H5GA_EVENT_REWARDED_VIDEO_AD_VIEWED';

    static showInterstitialAd(type: InterstitialType, name: string){
        try {
            const game_instance = game;
            adBreak({
                type: type,
                name: name,
                beforeAd: () => {
                    game_instance.emit(H5GamesAds.EVENT_INTERSTITIAL_BEFORE_AD);
                },
                afterAd: () => {
                    game_instance.emit(H5GamesAds.EVENT_INTERSTITIAL_AFTER_AD);
                },
                adBreakDone: (placementInfo: any) => {
                    game_instance.emit(H5GamesAds.EVENT_INTERSTITIAL_AD_BREAK_DONE);
                },
             });
        } catch(e) {
            console.log(e)
        }
    }

    static requestRewardedAd(name: string) {
        try {
            const game_instance = game;
            adBreak({
                type: 'reward',
                name: name,
                beforeAd: () => {
                    game_instance.emit(H5GamesAds.EVENT_REWARDED_VIDEO_BEFORE_AD);
                },
                afterAd: () => {
                    game_instance.emit(H5GamesAds.EVENT_REWARDED_VIDEO_AFTER_AD);
                },
                adBreakDone: (placementInfo: any) => {
                    game_instance.emit(H5GamesAds.EVENT_REWARDED_VIDEO_AD_BREAK_DONE);
                },
                beforeReward: (showAdFn: any) => {
                    this.showRewardedAdFn = showAdFn;
                    this.rewardedAdReady = true;
                    game_instance.emit(H5GamesAds.EVENT_REWARDED_VIDEO_BEFORE_REWARD);
                },
                adDismissed: () => {
                    game_instance.emit(H5GamesAds.EVENT_REWARDED_VIDEO_AD_DISMISSED);
                },
                adViewed: () => {
                    game_instance.emit(H5GamesAds.EVENT_REWARDED_VIDEO_AD_VIEWED);
                },
            });
        } catch(e) {
            console.log(e)
        }
    }

    static showRewardedAd() {
        console.log("***** showRewardedAd *****");
        if (!this.rewardedAdReady) {
            console.log("No Rewarded Ad available");
        }
        this.showRewardedAdFn();
        this.rewardedAdReady = false;
    }
}
