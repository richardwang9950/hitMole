/**
 * 游戏主界面类
 * 载入地鼠
 * 执行主循环
 */
import {ui} from "../ui/layaMaxUI"
import Hammer from "./Hammer";
import Mole from "./Mole";
export default class GameView extends ui.GameUI {
    public moles = []
    public moleNum = 9
    public hitCallBackHandler
    public mole 
    public moleBox
    public hammer 
    public timebar
    public score 
    constructor() {
        super()
        // 初始化
        this.init()
        // 设置进度条初始值，分数值，击中回调
        this.gameStart()
    }
    // 初始化
    init() {
        // 居中显示
        this.centerX = 0
        this.centerY = 0
        // 初始化9只地鼠
        this.moles = []
        this.moleNum = 9
        this.hitCallBackHandler = Laya.Handler.create(this, this.setScore, null, false)
        for (let i = 0; i < this.moleNum; i++) {
            this.moleBox = this.getChildByName(`item${i}`)
            this.mole = new Mole(this.moleBox.getChildByName("normal") as Laya.Sprite ,
            this.moleBox.getChildByName("hit")as Laya.Sprite,
            this.moleBox.getChildByName("score")as Laya.Sprite,
             25, this.hitCallBackHandler)
            this.moles.push(this.mole)
        }
        // 初始化锤子
        this.hammer = new Hammer();
        this.addChild(this.hammer);
        
    }
    // 游戏启动
    gameStart() {
        // 重置进度条，分数，锤子
        this.timebar.value= 1
        this.score = 0
        this.hammer.start()
        this.updateScoreUI(this.score)
        // 执行主循环
        Laya.timer.loop(1000, this, this.onLoop)
    }
    // 主循环，倒计时，随机显示一只地鼠
    onLoop() {
        this.timebar.value -= (10 / 90)
        if (this.timebar.value <= 0) {
            return this.gameOver()
        }
        this.moles[Math.floor(Math.random() * this.moleNum)].show()
    }
    // 游戏结束
    gameOver() {
        this.hammer.end()
        Laya.timer.clear(this, this.onLoop)
        Laya.Scene.open("GameOver.scene",true,this.scorelabel.value)
    }
    // 击中地鼠回调记录分数
    setScore(type) {
        this.score += (type == 1 ? -100 : 100)
        if (this.score < 0) {
            this.score = 0
        }
        this.updateScoreUI(this.score)
    }
    // 更新分数显示
    updateScoreUI(score) {
        this.scorelabel.value = ""+score;
    }
}