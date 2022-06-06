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

/* onCameraModeChangedObservable.add(({ cameraMode }) => {
    log("Camera mode changed:", cameraMode)
    if (cameraMode === CameraMode.ThirdPerson){
        firstPersonContainer.visible=true
        firstPersonText.visible=true
    }else{
        firstPersonContainer.visible=false
        firstPersonText.visible=false
    }
  }) */