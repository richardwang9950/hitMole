/**
 * 
 *  挂载的script 要通过this.owner.getChildByName("btn_start") as Laya.Button的方式获取children对象
 *   要设置children的name属性
 * 
*/
    
    export default class GameStart extends Laya.Script {
    constructor() { super(); 
    
    }
   
    public btn:Laya.Button
        
    
    onEnable(): void {
        // this.owner.btn_start.on(Laya.Event.MOUSE_DOWN,this,this.click)
       this.btn=this.owner.getChildByName("btn_start") as Laya.Button;
       this.btn.on(Laya.Event.MOUSE_DOWN,this,this.click)
    }

    onDisable(): void {
    }

    private click(){
        Laya.SoundManager.playMusic("res/sounds/bgm.mp3", 0, null)
        Laya.Scene.open("Game.scene")
    }
}