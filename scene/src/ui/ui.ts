import { GlobalVariables } from "src/Global/globalValues"

const canvas = new UICanvas()

const firstPersonContainer = new UIContainerStack(canvas)
firstPersonContainer.adaptWidth = true
firstPersonContainer.width = "100%"
firstPersonContainer.height = "200%"
firstPersonContainer.color = Color4.Black() 
firstPersonContainer.stackOrientation = UIStackOrientation.VERTICAL
firstPersonContainer.visible=false

export const firstPersonText = new UIContainerStack(canvas)
firstPersonText.adaptWidth = true
firstPersonText.width = "100%"
firstPersonText.height = "200%"
firstPersonText.color = Color4.Black() 
firstPersonText.stackOrientation = UIStackOrientation.HORIZONTAL
firstPersonText.visible=false

let imageAtlas = "images/greatescape.png"
let imageTexture = new Texture(imageAtlas)

export const firstIntro = new UIImage(canvas, imageTexture)
firstIntro.sourceLeft = 0
firstIntro.sourceTop = 0
firstIntro.sourceWidth = 512
firstIntro.sourceHeight = 512
firstIntro.width = 512
firstIntro.height = 512
firstIntro.vAlign = "center"
firstIntro.visible = false

export const secondIntro = new UIImage(canvas, imageTexture)
secondIntro.sourceLeft = 512
secondIntro.sourceTop = 0
secondIntro.sourceWidth = 512
secondIntro.sourceHeight = 512
secondIntro.vAlign = "center"
secondIntro.width = 512
secondIntro.height = 512
secondIntro.visible = false

export const thirdintro = new UIImage(canvas, imageTexture)
thirdintro.sourceLeft = 0
thirdintro.sourceTop = 512
thirdintro.sourceWidth = 512
thirdintro.sourceHeight = 512
thirdintro.vAlign = "center"
thirdintro.width = 512
thirdintro.height = 512
thirdintro.visible = false

export const endIntro = new UIImage(canvas, imageTexture)
endIntro.sourceLeft = 512
endIntro.sourceTop = 512
endIntro.sourceWidth = 512
endIntro.sourceHeight = 512
endIntro.vAlign = "center"
endIntro.width = 512
endIntro.height = 512
endIntro.visible = false

export const gameover = new UIText(canvas)
gameover.value = "GAME OVER..."
gameover.font = new Font(Fonts.SanFrancisco)
gameover.fontSize = 20
gameover.positionX = "-15%"
gameover.color = Color4.Red()
gameover.visible=false

export const turnEnd = new UIText(canvas)
turnEnd.value = "Turn End. Wait!"
turnEnd.font = new Font(Fonts.SanFrancisco)
turnEnd.fontSize = 20
turnEnd.vAlign = "center"
turnEnd.color = Color4.Yellow()
turnEnd.visible=false

export const press4 = new UIText(canvas)
press4.value = "Press 4 to start the MECHA"
press4.font = new Font(Fonts.SanFrancisco)
press4.fontSize = 20
press4.vAlign = "center"
press4.color = Color4.Yellow()
press4.visible=false

export const info = new UIText(canvas)
info.value = "This game is based on turns. Please wait to the next turn to do next action.\n\nUse asdw to move\n\nUse E or F to rotate\n\nUse shift to fire or move next turn if you already do fire\nThis demo have 3 levels:\n\n1 leveL: Simple level with some lives hidden\n\n2 level: kill some enemies to move to the next level\n\n3 level: kill the final boss and end the game.\n\nKnowed bugs, some old computers could make \nyour avatar swap out of the \"MECHA\", in that case \nyou could press 4 to restart the level.\n\n\nTo hide the info panel click 1 or wait 10 seconds if you lost the pointer"
info.font = new Font(Fonts.SanFrancisco)
info.fontSize = 20
info.vAlign = "center"
info.width = "400"
info.height= "500"
info.color = Color4.Yellow()
info.visible=false

export const info1 = new UIText(canvas)
info1.value = "Click 1 to see/hide the instructions"
info1.font = new Font(Fonts.SanFrancisco)
info1.fontSize = 10
info1.width=200
info1.hAlign= "right"
info1.vAlign = "top"
info1.color = Color4.Yellow()
info1.visible=false

export const gameendtext = new UIText(canvas)
gameendtext.value = "Thanks for playing!"
gameendtext.font = new Font(Fonts.SanFrancisco)
gameendtext.fontSize = 20
gameendtext.positionX = "-15%"
gameendtext.vAlign = "center"
gameendtext.color = Color4.Red()
gameendtext.visible=false
export const levelCompleted = new UIText(canvas)
levelCompleted.value = "Congrats! Level completed. Loading next level..."
levelCompleted.font = new Font(Fonts.SanFrancisco)
levelCompleted.fontSize = 20
levelCompleted.positionX = "-15%"
levelCompleted.color = Color4.Yellow()
levelCompleted.visible=false

export const doorHit1 = new UIContainerStack(canvas)
doorHit1.adaptWidth = true
doorHit1.width = "100%"
doorHit1.height = "200%"
doorHit1.color = Color4.White() 
doorHit1.stackOrientation = UIStackOrientation.VERTICAL
doorHit1.visible=false
export const doorHit2 = new UIContainerStack(canvas)
doorHit2.adaptWidth = true
doorHit2.width = "100%"
doorHit2.height = "200%"
doorHit2.color = Color4.Red() 
doorHit2.stackOrientation = UIStackOrientation.VERTICAL
doorHit2.visible=false
/* 
const livesui = new UIText(canvas)
livesui.value = "Lives: "+ GlobalVariables.lives
livesui.fontSize = 15
livesui.width = "30%"
livesui.height = 30
livesui.vAlign = "bottom"
livesui.positionX = -80

const stepsui = new UIText(canvas)
stepsui.value = "Lives: "+ GlobalVariables.lives
stepsui.fontSize = 15
stepsui.width = "30%"
stepsui.height = 30
stepsui.vAlign = "bottom"
stepsui.positionX = -80
 */
/*  onCameraModeChangedObservable.add(({ cameraMode }) => {
    log("Camera mode changed:", cameraMode)
    if (cameraMode === CameraMode.ThirdPerson){
        firstPersonContainer.visible=true
        firstPersonText.visible=true
    }else{
        firstPersonContainer.visible=false
        firstPersonText.visible=false
    }
  })  */