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

export const levelCompleted = new UIText(canvas)
levelCompleted.value = "Congrats! Level completed. Loading next level..."
levelCompleted.font = new Font(Fonts.SanFrancisco)
levelCompleted.fontSize = 20
levelCompleted.positionX = "-15%"
levelCompleted.color = Color4.Blue()
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