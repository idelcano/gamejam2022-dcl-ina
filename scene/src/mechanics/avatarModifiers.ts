
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
  new CameraModeArea({
    area: { box: new Vector3(16, 16, 16) },
    cameraMode: CameraMode.FirstPerson,
  })
)
engine.addEntity(modArea)