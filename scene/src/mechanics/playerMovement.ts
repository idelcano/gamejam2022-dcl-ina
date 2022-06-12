import { movePlayerTo } from "@decentraland/RestrictedActions";
import {
  bulletWall,
  hitFantasmicoSound,
  hitui,
  openfire,
  walk,
} from "src/effects/effects";
import { GlobalVariables } from "src/Global/globalValues";
import { getData } from "../network/player";
import * as utils from "@dcl/ecs-scene-utils";
import { Direction, FantasmicoDetails } from "./fantasmicoEnemy";

const velocity = 0.5;
const distance = 1.5;
let isWrapped = false;
let firemoveUp = false;
let firemoveDown = false;
let firemoveLeft = false;
let firemoveRight = false;
let firemoving = false;
let emptyMove = false;
let startMove = 0;
const endMove = 1;
let moveUp = false;
let moveDown = false;
let moveLeft = false;
let moveRight = false;
let moveRotateRight = false;
let moveRotateLeft = false;
let rotationDiff = 0;
let moving = false;
// button up event
let maxXPos = 1;
let maxZPos = 1;
let auxiliar_dt = 0;
const moveMeters = 1;
let glb = new GLTFShape("models/player/block_user_col.glb");
let glb_bullet = new GLTFShape("models/items/bullet.glb");
let fire_ent = new Entity("bullet");

GlobalVariables.shipEntity = new Entity();

let physicsCast = PhysicsCast.instance;

let playerPanel = new Entity();
playerPanel.addComponent(new PlaneShape());
export function restart(){
  isWrapped = false;
  firemoveUp = false;
  firemoveDown = false;
  firemoveLeft = false;
  firemoveRight = false;
  firemoving = false;
  emptyMove = false;
  startMove = 0;
  moveUp = false;
  moveDown = false;
  moveLeft = false;
  moveRight = false;
  moveRotateRight = false;
  moveRotateLeft = false;
  let rotationDiff = 0;
  moving = false;
  maxXPos = 1;
  maxZPos = 1;
  auxiliar_dt = 0;
}

export class PlayerMovement {
  constructor() {
    GlobalVariables.shipEntity.addComponent(glb);
    GlobalVariables.shipEntity.addComponent(
      new Transform({
        position: new Vector3(1, 0, 8),
        scale: new Vector3(1.5, 1, 1.5),
        //scale: new Vector3(2.5, 3, 3.5),
      })
    );
    
    engine.addEntity(GlobalVariables.shipEntity);
    executeTask(async () => {
      let data = await getData();
      //let myTexture = new AvatarTexture()
      let myTexture = new Texture(data.avatar.snapshots.face256);
      const myMaterial = new Material();
      myMaterial.albedoTexture = myTexture;
      playerPanel.addComponent(myMaterial);
      playerPanel.addComponent(
        new Transform({
          //position: new Vector3(1.5, 1.5, 8.7),
          position: Vector3.Zero(),
          scale: new Vector3(0.4, 0.5, 0.3),
        })
      );
      playerPanel.getComponent(Transform).rotate(new Vector3(0, 1, 0), 90);
      playerPanel.getComponent(Transform).rotate(new Vector3(1, 0, 0), 205);
      playerPanel.getComponent(Transform).position.y =
        playerPanel.getComponent(Transform).position.y + 1.5;
      playerPanel.getComponent(Transform).position.x =
        playerPanel.getComponent(Transform).position.x + 0.38;
      playerPanel.getComponent(Transform).position.z =
        playerPanel.getComponent(Transform).position.z + 0.08;

      //playerPanel.getComponent(Transform).rotate(new Vector3(0,0,1),180)
    });
    engine.addEntity(playerPanel);

    let cabina_glb = new GLTFShape("models/cabina.glb");
    const player = new Entity();
    player.addComponent(cabina_glb);
    player.addComponent(
      new Transform({
        position: Vector3.Zero(),
        scale: new Vector3(0.61, 0.85, 0.51),
      })
    );
    engine.addEntity(GlobalVariables.shipEntity);
    engine.addEntity(player);
    player.setParent(GlobalVariables.shipEntity);
    playerPanel.setParent(GlobalVariables.shipEntity);
    const input = Input.instance;
    let position = GlobalVariables.shipEntity.getComponent(Transform);
    input.subscribe("BUTTON_UP", ActionButton.FORWARD, false, (e) => {
      log("pointer Up", e);
      if (rotationDiff == 0) {
        moveForward();
      } else if (rotationDiff == 1 || rotationDiff == -3) {
        moveToRight();
      } else if (rotationDiff == 2 || rotationDiff == -2) {
        moveBackward();
      } else if (rotationDiff == 3 || rotationDiff - 1) {
        moveToLeft();
      }
    });
    input.subscribe("BUTTON_UP", ActionButton.WALK, false, (e) => {
      log("pointer Up", e);
      if (firemoving) {
        startMove = 0;
        emptyMove = true;
        return;
      }
      if (rotationDiff == 0) {
        fireForward();
      } else if (rotationDiff == 1 || rotationDiff == -3) {
        fireToRight();
      } else if (rotationDiff == 2 || rotationDiff == -2) {
        fireBackward();
      } else if (rotationDiff == 3 || rotationDiff - 1) {
        fireToLeft();
      }
    });

    input.subscribe("BUTTON_UP", ActionButton.BACKWARD, false, (e) => {
      log("pointer Up", e);
      if (rotationDiff == 0) {
        moveBackward();
      } else if (rotationDiff == 1 || rotationDiff == -3) {
        moveToLeft();
      } else if (rotationDiff == 2 || rotationDiff == -2) {
        moveForward();
      } else if (rotationDiff == 3 || rotationDiff - 1) {
        moveToRight();
      }
    });

    input.subscribe("BUTTON_UP", ActionButton.LEFT, false, (e) => {
      log("pointer Up", e);
      if (rotationDiff == 0) {
        moveToLeft();
      } else if (rotationDiff == 1 || rotationDiff == -3) {
        moveForward();
      } else if (rotationDiff == 2 || rotationDiff == -2) {
        moveToRight();
      } else if (rotationDiff == 3 || rotationDiff - 1) {
        moveBackward();
      }
    });

    input.subscribe("BUTTON_UP", ActionButton.RIGHT, false, (e) => {
      log("pointer Up", e);
      if (rotationDiff == 0) {
        moveToRight();
      } else if (rotationDiff == 1 || rotationDiff == -3) {
        moveBackward();
      } else if (rotationDiff == 2 || rotationDiff == -2) {
        moveToLeft();
      } else if (rotationDiff == 3 || rotationDiff - 1) {
        moveForward();
      }
    });

    input.subscribe("BUTTON_UP", ActionButton.PRIMARY, false, (e) => {
      log("pointer Up", e);
      if (!moving) {
        moving = true;
        moveRotateRight = true;
        position = GlobalVariables.shipEntity.getComponent(Transform);
        rotationDiff = rotationDiff - 1;
        if (rotationDiff == -4) {
          rotationDiff = 0;
        }
      }
    });

    input.subscribe("BUTTON_UP", ActionButton.SECONDARY, false, (e) => {
      log("pointer Up", e);
      if (!moving) {
        moving = true;
        moveRotateLeft = true;
        position = GlobalVariables.shipEntity.getComponent(Transform);
        rotationDiff = rotationDiff + 1;
        if (rotationDiff == 4) {
          rotationDiff = 0;
        }
      }
    });
    class FantasmicosSimpleMove implements ISystem {
      update(dt: number) {
        if (moving) {
          //detect player or hit
          fantasmicosMovements(dt);
        }
      }
    }
    engine.addSystem(new FantasmicosSimpleMove());

    class SimpleMove implements ISystem {
      update(dt: number) {
        if (moving) {
          if (!isWrapped) {
            isWrapped = true;
            GlobalVariables.shipEntity.getComponent(Transform).scale.setAll(0.85);
            return;
          }
          let transform = GlobalVariables.shipEntity.getComponent(Transform);
          if (moveUp) {
            //forward == left
            //left == down
            transform.position.x = transform.position.x + velocity * dt;
            if (transform.position.x >= maxXPos) {
              transform.position.x = maxXPos;
              moveUp = false;
              moving = false;
              hitFantasmicos();
              GlobalVariables.stepsui.increase();
            }
          } else if (moveDown) {
            //forward == left
            //left == down
            transform.position.x = transform.position.x - velocity * dt;
            if (transform.position.x <= maxXPos) {
              transform.position.x = maxXPos;
              moveDown = false;
              moving = false;
              hitFantasmicos();
              GlobalVariables.stepsui.increase();
            }
          } else if (moveLeft) {
            transform.position.z = transform.position.z + velocity * dt;
            if (transform.position.z >= maxZPos) {
              transform.position.z = maxZPos;
              moveLeft = false;
              moving = false;
              hitFantasmicos();
              GlobalVariables.stepsui.increase();
            }
            log(transform.position.z);
          } else if (moveRight) {
            transform.position.z = transform.position.z - velocity * dt;
            if (transform.position.z <= maxZPos) {
              transform.position.z = maxZPos;
              moveRight = false;
              moving = false;
              hitFantasmicos();
              GlobalVariables.stepsui.increase();
            }
            log(transform.position.z);
          } else if (moveRotateLeft) {
            let transform = GlobalVariables.shipEntity.getComponent(Transform);
            transform.rotate(new Vector3(0, 1, 0), 90);
            moveRotateLeft = false;
            moving = false;
            hitFantasmicos();
            GlobalVariables.stepsui.increase();
          } else if (moveRotateRight) {
            let transform = GlobalVariables.shipEntity.getComponent(Transform);
            transform.rotate(new Vector3(0, 1, 0), -90);
            moveRotateRight = false;
            moving = false;
            hitFantasmicos();
            GlobalVariables.stepsui.increase();
          }
        }
        if (moving || emptyMove) {
          if (firemoving || emptyMove) {
            if (firemoveUp) {
              let transform = fire_ent.getComponent(Transform);
              let newOriginPos = new Vector3(
                transform.position.x,
                transform.position.y,
                transform.position.z
              );
              let newTargetPos = new Vector3(
                transform.position.x + velocity,
                transform.position.y,
                transform.position.z
              );
              auxiliar_dt = dt;
              detectWallBulletDuringMove(
                newOriginPos,
                newTargetPos,
                continueFireUp
              );
            } else if (firemoveDown) {
              let transform = fire_ent.getComponent(Transform);
              let newOriginPos = new Vector3(
                transform.position.x,
                transform.position.y,
                transform.position.z
              );
              let newTargetPos = new Vector3(
                transform.position.x - velocity,
                transform.position.y,
                transform.position.z
              );
              auxiliar_dt = dt;
              detectWallBulletDuringMove(
                newOriginPos,
                newTargetPos,
                continueFireDown
              );
            } else if (firemoveLeft) {
              let transform = fire_ent.getComponent(Transform);
              let newOriginPos = new Vector3(
                transform.position.x,
                transform.position.y,
                transform.position.z
              );
              let newTargetPos = new Vector3(
                transform.position.x,
                transform.position.y,
                transform.position.z + velocity
              );
              newTargetPos.z = transform.position.z + velocity;
              auxiliar_dt = dt;
              detectWallBulletDuringMove(
                newOriginPos,
                newTargetPos,
                continueFireLeft
              );
            } else if (firemoveRight) {
              let transform = fire_ent.getComponent(Transform);
              let newOriginPos = new Vector3(
                transform.position.x,
                transform.position.y,
                transform.position.z
              );
              let newTargetPos = new Vector3(
                transform.position.x,
                transform.position.y,
                transform.position.z - velocity
              );
              auxiliar_dt = dt;
              detectWallBulletDuringMove(
                newOriginPos,
                newTargetPos,
                continueFireRight
              );
            }
          }
          if (emptyMove) {
            startMove = startMove + velocity * dt;

            log("startmove" + startMove);
            if (startMove >= endMove) {
              emptyMove = false;
              hitFantasmicos();
              GlobalVariables.stepsui.increase();
            }
          }
          moveFantasmicos(dt);
        }
      }
    }
    engine.addSystem(new SimpleMove());

    function fireForward() {
      let playerPos = new Vector3(
        GlobalVariables.shipEntity.getComponent(Transform).position.x + 1,
        1.2,
        GlobalVariables.shipEntity.getComponent(Transform).position.z
      );
      let originFire = new Vector3(
        GlobalVariables.shipEntity.getComponent(Transform).position.x + 1.5 * 2,
        1.2,
        GlobalVariables.shipEntity.getComponent(Transform).position.z
      );

      detectWallBulletBeforeMove(playerPos, originFire, openFireForward);
    }

    function fireToRight() {
      let playerPos = new Vector3(
        GlobalVariables.shipEntity.getComponent(Transform).position.x,
        1.2,
        GlobalVariables.shipEntity.getComponent(Transform).position.z - 1
      );
      let originFire = new Vector3(
        GlobalVariables.shipEntity.getComponent(Transform).position.x,
        1.2,
        GlobalVariables.shipEntity.getComponent(Transform).position.z - 1.5 * 2
      );

      detectWallBulletBeforeMove(playerPos, originFire, openFireRight);
    }

    function fireBackward() {
      let playerPos = new Vector3(
        GlobalVariables.shipEntity.getComponent(Transform).position.x - 1,
        1.2,
        GlobalVariables.shipEntity.getComponent(Transform).position.z
      );
      let originFire = new Vector3(
        GlobalVariables.shipEntity.getComponent(Transform).position.x - 1.5 * 2,
        1.2,
        GlobalVariables.shipEntity.getComponent(Transform).position.z
      );
      detectWallBulletBeforeMove(playerPos, originFire, openFireBackward);
    }

    function fireToLeft() {
      let playerPos = new Vector3(
        GlobalVariables.shipEntity.getComponent(Transform).position.x,
        1.2,
        GlobalVariables.shipEntity.getComponent(Transform).position.z + 1
      );
      let originFire = new Vector3(
        GlobalVariables.shipEntity.getComponent(Transform).position.x,
        1.2,
        GlobalVariables.shipEntity.getComponent(Transform).position.z + 1.5 * 2
      );
      detectWallBulletBeforeMove(playerPos, originFire, openFireLeft);
    }

    function openFireCommon(originFire: Vector3) {
      fire_ent.addComponentOrReplace(
        new Transform({
          position: originFire,
          scale: new Vector3(0.02, 0.02, 0.02),
        })
      );
      fire_ent.addComponentOrReplace(glb_bullet);

      openfire();
      engine.addEntity(fire_ent);

      let triggerBox = new utils.TriggerBoxShape(new Vector3(0.2, 0.2, 0.2));
      fire_ent.addComponentOrReplace(
        new utils.TriggerComponent(triggerBox, {
          onTriggerEnter(entity) {
            if (entity.name?.indexOf("fantasmico") !== -1) {
              log(entity);
              log(entity.name);
              log(entity.uuid);
              hitFantasmicoSound();
              let fantasmico = entity.getComponent(FantasmicoDetails);
              fantasmico.lives = fantasmico.lives - 1;
              if (fantasmico.lives <= 0) {
                engine.removeEntity(entity);
                GlobalVariables.activeFantasmicos;
              }
              engine.removeEntity(fire_ent);
              firemoveDown = false;
              firemoveLeft = false;
              firemoveRight = false;
              firemoveUp = false;
              firemoving = false;
            } else {
              engine.removeEntity(fire_ent);
              firemoveDown = false;
              firemoveLeft = false;
              firemoveRight = false;
              firemoveUp = false;
              firemoving = false;
            }
          },
          enableDebug: false,
        })
      );
      firemoving = true;
    }

    function moveForward() {
      let targetPos = new Vector3(
        GlobalVariables.shipEntity.getComponent(Transform).position.x + moveMeters,
        GlobalVariables.shipEntity.getComponent(Transform).position.y,
        GlobalVariables.shipEntity.getComponent(Transform).position.z
      );

      let originPos = GlobalVariables.shipEntity.getComponent(Transform).position;
      detectWallBeforeMove(originPos, targetPos, moveToForwardNow);
    }

    function moveToForwardNow(hasWall: boolean) {
      let localPos =
        GlobalVariables.shipEntity.getComponent(Transform).position.x + moveMeters;
      if (localPos >= 15 || hasWall) {
        return;
      }
      if (!moving) {
        position = GlobalVariables.shipEntity.getComponent(Transform);
        maxXPos = position.position.x + moveMeters;
        moving = true;
        moveUp = true;
      }
    }

    function moveBackward() {
      let targetPos = new Vector3(
        GlobalVariables.shipEntity.getComponent(Transform).position.x - moveMeters,
        GlobalVariables.shipEntity.getComponent(Transform).position.y,
        GlobalVariables.shipEntity.getComponent(Transform).position.z
      );
      let originPos = GlobalVariables.shipEntity.getComponent(Transform).position;
      detectWallBeforeMove(originPos, targetPos, moveToBackwardNow);
    }

    function moveToBackwardNow(hasWall: boolean) {
      let localPos =
        GlobalVariables.shipEntity.getComponent(Transform).position.x - moveMeters;
      if (localPos <= 1 || hasWall) {
        return;
      }
      if (!moving) {
        position = GlobalVariables.shipEntity.getComponent(Transform);
        maxXPos = position.position.x - moveMeters;
        moving = true;
        moveDown = true;
      }
    }
    function moveToLeft() {
      let targetPos = new Vector3(
        GlobalVariables.shipEntity.getComponent(Transform).position.x,
        GlobalVariables.shipEntity.getComponent(Transform).position.y,
        GlobalVariables.shipEntity.getComponent(Transform).position.z + moveMeters
      );
      let originPos = GlobalVariables.shipEntity.getComponent(Transform).position;
      detectWallBeforeMove(originPos, targetPos, moveToLeftNow);
    }

    function moveToLeftNow(hasWall: boolean) {
      let localPos =
        GlobalVariables.shipEntity.getComponent(Transform).position.z + moveMeters;
      if (localPos >= 15 || hasWall) {
        return;
      }
      if (!moving) {
        position = GlobalVariables.shipEntity.getComponent(Transform);
        maxZPos = position.position.z + moveMeters;
        moving = true;
        moveLeft = true;
      }
    }

    function moveToRight() {
      let targetPos = new Vector3(
        GlobalVariables.shipEntity.getComponent(Transform).position.x,
        GlobalVariables.shipEntity.getComponent(Transform).position.y,
        GlobalVariables.shipEntity.getComponent(Transform).position.z - moveMeters
      );
      let originPos = GlobalVariables.shipEntity.getComponent(Transform).position;
      detectWallBeforeMove(originPos, targetPos, moveToRightNow);
    }

    function moveToRightNow(hasWall: boolean) {
      let localPos =
        GlobalVariables.shipEntity.getComponent(Transform).position.z - moveMeters;
      if (localPos <= 1 || hasWall) {
        return;
      }
      if (!moving) {
        position = GlobalVariables.shipEntity.getComponent(Transform);
        maxZPos = position.position.z - moveMeters;
        moving = true;
        moveRight = true;
      }
    }

    function detectWallBeforeMove(
      originPos: Vector3,
      targetPos: Vector3,
      move: (hasWall: boolean) => void
    ) {
      let newOriginPos = new Vector3(originPos.x, originPos.y + 1, originPos.z);
      let newtargetPos = new Vector3(targetPos.x, targetPos.y + 1, targetPos.z);
      let rayFromPoints = physicsCast.getRayFromPositions(
        newOriginPos,
        newtargetPos
      );
      rayFromPoints.distance = distance;
      let hasWall = false;
      physicsCast.hitAll(
        rayFromPoints,
        (e) => {
          if (e == undefined) {
            return;
          }
          for (let entityHit of e.entities) {
            log(entityHit.entity.meshName);
            if (
              entityHit.entity.meshName.indexOf("wall") == 0 ||
              entityHit.entity.meshName.indexOf("fantasmico") == 0 ||
              entityHit.entity.meshName.indexOf("enemy") == 0
            ) {
              log(entityHit.entity.meshName.indexOf("fantasmico"));
              log(entityHit.hitPoint);
              hasWall = true;
            }
          }
          move(hasWall);
          if (!hasWall) {
            walk();
          }
        },
        distance
      );
    }

    function detectWallBulletBeforeMove(
      originPos: Vector3,
      targetPos: Vector3,
      move: (originPos: Vector3) => void
    ) {
      let newOriginPos = new Vector3(originPos.x, originPos.y, originPos.z);
      let newtargetPos = new Vector3(targetPos.x, targetPos.y, targetPos.z);
      let rayFromPoints = physicsCast.getRayFromPositions(
        newOriginPos,
        newtargetPos
      );
      rayFromPoints.distance = distance;
      let hasWall = false;
      physicsCast.hitAll(
        rayFromPoints,
        (e) => {
          if (e == undefined) {
            return;
          }
          for (let entityHit of e.entities) {
            log(entityHit.entity.meshName);
            if (entityHit.entity.meshName.indexOf("wall") == 0) {
              hasWall = true;
            }
          }
          if (hasWall) {
            bulletWall();
          }
          if (!hasWall) {
            move(originPos);
          }
        },
        distance
      );
    }
    function detectWallBulletDuringMove(
      originPos: Vector3,
      targetPos: Vector3,
      move: () => void
    ) {
      let newOriginPos = new Vector3(originPos.x, originPos.y, originPos.z);
      let newtargetPos = new Vector3(targetPos.x, targetPos.y, targetPos.z);
      let rayFromPoints = physicsCast.getRayFromPositions(
        newOriginPos,
        newtargetPos
      );
      rayFromPoints.distance = distance;
      let hasWall = false;
      physicsCast.hitAll(
        rayFromPoints,
        (e) => {
          if (e == undefined) {
            return;
          }
          for (let entityHit of e.entities) {
            log(entityHit.entity.meshName);
            if (entityHit.entity.meshName.indexOf("wall") == 0) {
              hasWall = true;
            }
          }
          if (hasWall) {
            bulletWall();
            if (fire_ent.isAddedToEngine()) {
              engine.removeEntity(fire_ent);
            }
            firemoveRight = false;
            firemoveLeft = false;
            firemoveUp = false;
            firemoveDown = false;
            firemoving = false;
          }
          if (!hasWall) {
            move();
          }
        },
        distance
      );
    }

    function openFireForward(originPos?: Vector3) {
      openFireCommon(originPos!);
      firemoveUp = true;
    }

    function openFireBackward(originPos?: Vector3) {
      openFireCommon(originPos!);
      firemoveDown = true;
    }

    function openFireLeft(originPos?: Vector3) {
      openFireCommon(originPos!);
      firemoveLeft = true;
    }

    function openFireRight(originPos?: Vector3) {
      openFireCommon(originPos!);
      firemoveRight = true;
    }

    function continueFireRight() {
      let transform = fire_ent.getComponent(Transform);
      transform.position.z = transform.position.z - velocity * auxiliar_dt;
      if (transform.position.z >= 16 || transform.position.z <= 0) {
        if (fire_ent.isAddedToEngine()) {
          engine.removeEntity(fire_ent);
        }
        firemoveRight = false;
        firemoving = false;
      }
    }
    function continueFireLeft() {
      let transform = fire_ent.getComponent(Transform);
      transform.position.z = transform.position.z + velocity * auxiliar_dt;
      if (transform.position.z >= 16 || transform.position.z <= 0) {
        if (fire_ent.isAddedToEngine()) {
          engine.removeEntity(fire_ent);
        }
        firemoveLeft = false;
        firemoving = false;
      }
    }

    function continueFireDown() {
      let transform = fire_ent.getComponent(Transform);
      transform.position.x = transform.position.x - velocity * auxiliar_dt;
      if (transform.position.x >= 16 || transform.position.x <= 0) {
        if (fire_ent.isAddedToEngine()) {
          engine.removeEntity(fire_ent);
        }
        firemoveDown = false;
        firemoving = false;
      }
    }

    function continueFireUp() {
      let transform = fire_ent.getComponent(Transform);
      transform.position.x = transform.position.x + velocity * auxiliar_dt;
      if (transform.position.x >= 16 || transform.position.x <= 0) {
        if (fire_ent.isAddedToEngine()) {
          engine.removeEntity(fire_ent);
        }
        firemoveUp = false;
        firemoving = false;
      }
    }

    function fantasmicosMovements(dt: number) {
      for (let item of GlobalVariables.activeFantasmicos) {
        let fantasmico = item.entity;
        let fantasmicoDetails = fantasmico.getComponent(FantasmicoDetails);
        if (fantasmicoDetails.alive == false) {
          continue;
        }
        if (!fantasmicoDetails.active) {
          let originPos = fantasmico.getComponent(Transform).position;
          let newOriginPos = new Vector3(originPos.x, originPos.y, originPos.z);
          let direction = fantasmico.getComponent(FantasmicoDetails).direction;
          //right z-
          //left z+
          //up x+
          //down x-
          //let shipPosition = GlobalVariables.shipEntity.getComponent(Transform).position

          let hasPlayer = false;
          let hitPlayer = false;
          if (direction == Direction.Up) {
            let firstDiff =
              Math.floor(GlobalVariables.shipEntity.getComponent(Transform).position.z) -
              Math.floor(newOriginPos.z);
            if (firstDiff < 1.1 && firstDiff > -1.1) {
              let diff =
                Math.floor(GlobalVariables.shipEntity.getComponent(Transform).position.x) -
                Math.floor(newOriginPos.x);

              if (diff <= 2 && diff >= -2) {
                hitPlayer = true;
                hasPlayer = true;
                fantasmicoDetails.moving = false;
                fantasmicoDetails.hitPlayer = true;
                fantasmicoDetails.active = true;
              } else if (diff <= 6 && diff >= -6) {
                fantasmicoDetails.active = true;
                fantasmicoDetails.hitPlayer = false;
                fantasmicoDetails.moving = true;
              } else {
                fantasmicoDetails.moving = false;
                fantasmicoDetails.hitPlayer = false;
                fantasmicoDetails.active = false;
              }
            }
          } else if (direction == Direction.Down) {
            let firstDiff =
              Math.floor(GlobalVariables.shipEntity.getComponent(Transform).position.z) -
              Math.floor(newOriginPos.z);
            if (firstDiff < 1.1 && firstDiff > -1.1) {
              let diff =
                Math.floor(GlobalVariables.shipEntity.getComponent(Transform).position.x) -
                Math.floor(newOriginPos.x);

              if (diff <= 2 && diff >= -2) {
                fantasmicoDetails.moving = false;
                fantasmicoDetails.hitPlayer = true;
                fantasmicoDetails.active = true;
              } else if (diff <= 6 && diff >= -6) {
                fantasmicoDetails.active = true;
                fantasmicoDetails.hitPlayer = false;
                fantasmicoDetails.moving = true;
              } else {
                fantasmicoDetails.moving = false;
                fantasmicoDetails.hitPlayer = false;
                fantasmicoDetails.active = false;
              }
            }
          } else if (direction == Direction.Right) {
            let firstDiff =
              Math.floor(GlobalVariables.shipEntity.getComponent(Transform).position.x) -
              Math.floor(newOriginPos.x);
            if (firstDiff < 1.1 && firstDiff > -1.1) {
              let diff =
                Math.floor(GlobalVariables.shipEntity.getComponent(Transform).position.z) -
                Math.floor(newOriginPos.z);

              if (diff <= 2 && diff >= -2) {
                fantasmicoDetails.moving = false;
                fantasmicoDetails.hitPlayer = true;
                fantasmicoDetails.active = true;
              } else if (diff <= 6 && diff >= -6) {
                fantasmicoDetails.active = true;
                fantasmicoDetails.hitPlayer = false;
                fantasmicoDetails.moving = true;
              } else {
                fantasmicoDetails.moving = false;
                fantasmicoDetails.hitPlayer = false;
                fantasmicoDetails.active = false;
              }
            }
          } else if (direction == Direction.Left) {
            let firstDiff =
              Math.floor(GlobalVariables.shipEntity.getComponent(Transform).position.x) -
              Math.floor(newOriginPos.x);
            if (firstDiff < 1.1 && firstDiff > -1.1) {
              let diff =
                Math.floor(GlobalVariables.shipEntity.getComponent(Transform).position.z) -
                Math.floor(newOriginPos.z);

              if (diff <= 2 && diff >= -2) {
                fantasmicoDetails.moving = false;
                fantasmicoDetails.hitPlayer = true;
                fantasmicoDetails.active = true;
              } else if (diff <= 6 && diff >= -6) {
                hasPlayer = true;
                fantasmicoDetails.active = true;
                fantasmicoDetails.hitPlayer = false;
                fantasmicoDetails.moving = true;
              } else {
                fantasmicoDetails.moving = false;
                fantasmicoDetails.hitPlayer = false;
                fantasmicoDetails.active = false;
              }
            }
          }
        }
      }
    }

    function hitFantasmicos() {
      for (let item of GlobalVariables.activeFantasmicos) {
        let fantasmico = item.entity;
        let fantasmicoDetails = fantasmico.getComponent(FantasmicoDetails);
        if (fantasmicoDetails.alive == false) {
          continue;
        }
        let transform = fantasmico.getComponent(Transform);
        if (fantasmicoDetails.hitPlayer && fantasmicoDetails.moving) {
          if (fantasmicoDetails.direction == Direction.Up) {
            let firstDiff =
              Math.floor(GlobalVariables.shipEntity.getComponent(Transform).position.z) -
              Math.floor(transform.position.z);
            if (firstDiff < 1.1 && firstDiff > -1.1) {
              let diff =
                Math.floor(GlobalVariables.shipEntity.getComponent(Transform).position.x) -
                Math.floor(transform.position.x);
              log("Diff" + diff);
              if (diff > -2 && diff < 2) {
                if (fantasmicoDetails.lives > 0) {
                  hitui();
                }
                fantasmicoDetails.hitPlayer = false;
              }
            }
          } else if (fantasmicoDetails.direction == Direction.Down) {
            let firstDiff =
              Math.floor(GlobalVariables.shipEntity.getComponent(Transform).position.z) -
              Math.floor(transform.position.z);
            if (firstDiff < 1.1 && firstDiff > -1.1) {
              let diff =
                Math.floor(GlobalVariables.shipEntity.getComponent(Transform).position.x) -
                Math.floor(transform.position.x);
              log("Diff" + diff);
              if (diff > -2 && diff < 2) {
                if (fantasmicoDetails.lives > 0) {
                  hitui();
                }
                fantasmicoDetails.hitPlayer = false;
              }
            }
          } else if (fantasmicoDetails.direction == Direction.Right) {
            let firstDiff =
              Math.floor(GlobalVariables.shipEntity.getComponent(Transform).position.x) -
              Math.floor(transform.position.x);
            if (firstDiff < 1.1 && firstDiff > -1.1) {
              let diff =
                Math.floor(GlobalVariables.shipEntity.getComponent(Transform).position.z) -
                Math.floor(transform.position.z);
              log("Diff" + diff);
              if (diff > -2 && diff < 2) {
                if (fantasmicoDetails.lives > 0) {
                  hitui();
                }
                fantasmicoDetails.hitPlayer = false;
              }
            }
          } else if (fantasmicoDetails.direction == Direction.Left) {
            let firstDiff =
              Math.floor(GlobalVariables.shipEntity.getComponent(Transform).position.x) -
              Math.floor(transform.position.x);
            if (firstDiff < 1.1 && firstDiff > -1.1) {
              let diff =
                Math.floor(GlobalVariables.shipEntity.getComponent(Transform).position.z) -
                Math.floor(transform.position.z);
              log("Diff" + diff);
              if (diff > -2 && diff < 2) {
                if (fantasmicoDetails.lives > 0) {
                  hitui();
                }
                fantasmicoDetails.hitPlayer = false;
              }
            }
          }
        }
      }
    }
    function moveFantasmicos(dt: number) {
      for (let item of GlobalVariables.activeFantasmicos) {
        let fantasmico = item.entity;
        let fantasmicoDetails = fantasmico.getComponent(FantasmicoDetails);
        if (fantasmicoDetails.alive == false) {
          continue;
        }
        if (fantasmicoDetails.moving) {
          let transform = fantasmico.getComponent(Transform);
          let fantasmicoDetails = fantasmico.getComponent(FantasmicoDetails);
          if (fantasmicoDetails.moving) {
            if (fantasmicoDetails.direction == Direction.Up) {
              let diff =
                Math.floor(GlobalVariables.shipEntity.getComponent(Transform).position.x) -
                Math.floor(transform.position.x);
              log("Diff" + diff);

              if (diff < -2 || diff > 2) {
                transform.position.x = transform.position.x + velocity * dt;
              } else if (diff >= -2 && diff <= 2) {
                fantasmicoDetails.hitPlayer = true;
              }
            } else if (fantasmicoDetails.direction == Direction.Down) {
              let diff =
                Math.floor(GlobalVariables.shipEntity.getComponent(Transform).position.x) -
                Math.floor(transform.position.x);
              log("Diff" + diff);

              if (diff < -2 || diff > 2) {
                transform.position.x = transform.position.x - velocity * dt;
              } else if (diff >= -2 && diff <= 2) {
                fantasmicoDetails.hitPlayer = true;
              }
            } else if (fantasmicoDetails.direction == Direction.Right) {
              let diff =
                Math.floor(GlobalVariables.shipEntity.getComponent(Transform).position.z) -
                Math.floor(transform.position.z);
              log("Diff" + diff);

              if (diff < -2 || diff > 2) {
                transform.position.z = transform.position.z - velocity * dt;
              } else if (diff >= -2 && diff <= 2) {
                fantasmicoDetails.hitPlayer = true;
              }
            } else if (fantasmicoDetails.direction == Direction.Left) {
              let diff =
                Math.floor(GlobalVariables.shipEntity.getComponent(Transform).position.z) -
                Math.floor(transform.position.z);
              log("Diff" + diff);
              if (diff < -2 || diff > 2) {
                transform.position.z = transform.position.z + velocity * dt;
              } else if (diff >= -2 && diff <= 2) {
                fantasmicoDetails.hitPlayer = true;
              }
            }
            log("x: " + transform.position.x + " z: " + transform.position.z);
          }
        }
      }
    }
  }
}
