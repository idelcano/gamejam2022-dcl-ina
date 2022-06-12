export class PlayerModifiers{
  constructor(){

    const hideAvatarsEntity = new Entity();
    hideAvatarsEntity.addComponent(
      new AvatarModifierArea({
        area: { box: new Vector3(16, 16, 16) },
        modifiers: [AvatarModifiers.HIDE_AVATARS],
      })
    );
    engine.addEntity(hideAvatarsEntity);
    const modArea = new Entity()
    modArea.addComponent(
      new Transform({
        position: new Vector3(8, 0, 8),
        scale: new Vector3(16, 16, 16),
      })
      )
      modArea.addComponent(
        new CameraModeArea({
          area: { box: new Vector3(16, 16, 16) },
          cameraMode: CameraMode.FirstPerson,
        })
      )
    
    //modArea.addComponent(new BoxShape()).withCollisions = false
    engine.addEntity(modArea)
  }
}