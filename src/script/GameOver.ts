/**
 * 结束界面类
 * 
 * 
 * 
 *  设置children的var属性
 *  继承的script 要通过this.restartBtn方式获取children对象
 *  
 */

import {ui} from "../ui/layaMaxUI"
export default class GameOverView extends ui.GameOverUI {
    constructor() {
        super()
        // 居中显示
        this.centerX = 0
        this.centerY = 0
        // 重启事件

        this.restartBtn.on(Laya.Event.CLICK, this, this.onRestartGame)
    }
    // 重启游戏
    onRestartGame() {
        Laya.Scene.open("Game.scene")
        this.restartBtn.off(Laya.Event.CLICK, this, this.onRestartGame)
    }
    // 设置分数显示
    onOpened(score){
        this.score.text = ""+score;
    }
}