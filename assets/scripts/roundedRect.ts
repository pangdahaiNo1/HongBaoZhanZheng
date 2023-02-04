import { _decorator, Component, Node, CCFloat, UITransform, Graphics, Vec2, math, Color, nextPow2 } from 'cc';
const { ccclass, property,executeInEditMode} = _decorator;


@ccclass('roundedRect')
@executeInEditMode(true)
export class roundedRect extends Component {
    @property({type:CCFloat,tooltip:"圆角矩形比例",slide:true,min:0,max:1})
    set roundedRatio(val:number){
        this._roundedRatio = val;
        this.updateRounded();
    };
    get roundedRatio():number{
        return this._roundedRatio;
    }
    private _roundedRatio = 1;
    start() {
        this.updateRounded();
        this.node.on(Node.EventType.TRANSFORM_CHANGED,this.updateRounded,this);
    }

    updateRounded(){
        
        if(this.getComponent(Graphics)==null)
        this.addComponent(Graphics);
        const graphics = this.getComponent(Graphics);
        const trans = this.node.getComponent(UITransform);
        trans.anchorX = 0.5;
        trans.anchorY = 0.5;


        const size = trans.contentSize;
        const roundR = Math.min(size.width,size.height)/2;
        const valAngle =  (this.roundedRatio)*(1/2*Math.PI);
        const leftInterval = new Vec2(Math.sin((this.roundedRatio)*1/2*Math.PI)*roundR,Math.cos((this.roundedRatio)*1/2*Math.PI)*roundR);
        graphics.clear();
        let pos:Vec2;
        graphics.lineJoin = Graphics.LineJoin.ROUND;
        graphics.lineWidth = 10;
        graphics.color = Color.BLACK;
        graphics.fillColor = Color.BLACK;
        if(size.width<=size.height)
        {
            pos = new Vec2(0,size.height/2-roundR);
            const newy = -size.height/2+roundR - leftInterval.x;
            graphics.moveTo(leftInterval.y,newy);//右下角
            graphics.lineTo(-leftInterval.y,newy);//左下角
            graphics.lineTo(-size.width/2,-pos.y);
            graphics.lineTo(-size.width/2,pos.y);
            graphics.lineTo(-leftInterval.y,-newy);
            graphics.lineTo(leftInterval.y,-newy);
            graphics.lineTo(size.width/2,pos.y);
            graphics.lineTo(size.width/2,-pos.y);
            //graphics.lineTo(leftInterval.y,newy);
            graphics.stroke();
            graphics.close();
            graphics.fill();
            if(valAngle!=0){
                graphics.arc(-pos.x, -pos.y, roundR, Math.PI + valAngle, Math.PI, false);
                graphics.arc(-pos.x, -pos.y, roundR,2*Math.PI - valAngle, 0,true);
                graphics.arc(pos.x, pos.y, roundR, Math.PI - valAngle, Math.PI, true);
                graphics.arc(pos.x, pos.y, roundR, valAngle, 0, false);
            }
        }
        else
        {
            pos = new Vec2(size.width/2-roundR,0);
            const newX = -size.width/2+roundR - leftInterval.x;
            graphics.moveTo(newX,leftInterval.y);//左上角
            graphics.lineTo(newX,-leftInterval.y);//左下角
            graphics.lineTo(-pos.x,-size.height/2);
            graphics.lineTo(pos.x,-size.height/2);
            graphics.lineTo(-newX,-leftInterval.y);
            graphics.lineTo(-newX,leftInterval.y);
            graphics.lineTo(pos.x,size.height/2);
            graphics.lineTo(-pos.x,size.height/2);
            graphics.close();
            graphics.stroke();
            graphics.fill();
            graphics.arc(-pos.x,-pos.y,roundR,1/2*Math.PI+valAngle,1/2*Math.PI,false);
            graphics.arc(-pos.x,-pos.y,roundR,3/2*Math.PI-valAngle,3/2*Math.PI,true);
            graphics.arc(pos.x,pos.y,roundR,1/2*Math.PI-valAngle,1/2*Math.PI,true);
            graphics.arc(pos.x,pos.y,roundR,3/2*Math.PI+valAngle,3/2*Math.PI,false);
        }
        //const rpoint:Vec2[] = [new Vec2(-pos.x,pos.y),pos,new Vec2(-pos.x,-pos.y),new Vec2(pos.x,-pos.y)];
        //const angles:Vec2[] = [new Vec2(),new Vec2(),new Vec2(),new Vec2()];
        //const isWidthGreThanHeight = size.width > size.height;
       
        //graphics.close();
        //graphics.fill();
        
       // graphics.moveTo(-pos.x,pos.y+roundR);
       
        graphics.stroke();
        //graphics.close();
        graphics.fill();
        

    }

    update(deltaTime: number) {
        
    }
}

