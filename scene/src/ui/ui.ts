import { GlobalVariables } from "src/Global/globalValues"

const canvas = new UICanvas()

const firstPersonContainer = new UIContainerStack(canvas)
firstPersonContainer.adaptWidth = true
firstPersonContainer.width = "100%"
firstPersonContainer.height = "200%"
firstPersonContainer.color = Color4.Black() 
firstPersonContainer.stackOrientation = UIStackOrientation.VERTICAL
firstPersonContainer.visible=false

const firstPersonText = new UIText(canvas)
firstPersonText.value = "Please press \"V\" to change to first person camera"
firstPersonText.font = new Font(Fonts.SanFrancisco)
firstPersonText.fontSize = 20
firstPersonText.positionX = "-15%"
firstPersonText.color = Color4.Blue()
firstPersonText.visible=false

export const levelCompleted = new UIText(canvas)
levelCompleted.value = "Level completed. Loading next level"
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
 onCameraModeChangedObservable.add(({ cameraMode }) => {
    log("Camera mode changed:", cameraMode)
    if (cameraMode === CameraMode.ThirdPerson){
        firstPersonContainer.visible=true
        firstPersonText.visible=true
    }else{
        firstPersonContainer.visible=false
        firstPersonText.visible=false
    }
  }) 