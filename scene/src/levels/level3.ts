import { toAddress } from "eth-connect";
import {
  gamebad,
  gameend,
  gamegood,
  golpeBoss,
  hitui,
  yeah,
} from "src/effects/effects";
import { GlobalVariables } from "src/Global/globalValues";
import { Trigger } from "src/mechanics/triggers";
import { getInaData, inaData } from "src/network/player";
import {
  getQuestionA,
  getQuestionB,
  getQuestionC,
} from "src/network/questions";
import { Level } from "./level";

@Component("FinalBossComponent")
export class FinalBossComponent {
  leftlives: number;
  rightlives: number;
  mainlives: number;
  constructor() {
    this.leftlives = 3;
    this.rightlives = 3;
    this.mainlives = 3;
  }
}
let doorask1 = new Entity("door-ask1b");
let doorask2 = new Entity("door-ask2b");
let doorask3 = new Entity("door-ask3b");

const leftarm = new Entity("armright");
const leftarmhit = new Entity("armrighthit");
const rightarm = new Entity("armleft");
const rightarmhit = new Entity("armlefthit");
const finalbosshit = new Entity("finalbosshit");
const finalboss5 = new Entity("finalboss");
const bloker = new Entity("blocker1");
let fire_ent = new Entity("bullet1");
let fire_entl = new Entity("bullet2");
let fire_entr = new Entity("bullet3");
let leftY = 1.1;
let rightY = 1.1;
let glb_bullet = new GLTFShape("models/items/bullet.glb");
fire_ent.addComponentOrReplace(glb_bullet);
fire_entl.addComponentOrReplace(glb_bullet);
fire_entr.addComponentOrReplace(glb_bullet);
engine.addEntity(fire_ent);
engine.addEntity(fire_entl);
engine.addEntity(fire_entr);

let bossStart = false;
let bossMoving = false;
let leftDir = true;
let enemyController = new Entity();
export class Level3 implements Level {
  levelStarted = false;
  map: Entity;
  textA: Entity;
  textB: Entity;
  textC: Entity;
  constructor() {
    this.map = new Entity("map1");
    this.textA = new Entity();
    this.textB = new Entity();
    this.textC = new Entity();
  }
  start() {
    // FILE WAS GENERATED BY DCL-EDIT
    // DO NOT MODIFY

    GlobalVariables.shipEntity.getComponent(Transform).position.x = 1;
    GlobalVariables.shipEntity.getComponent(Transform).position.z = 8;
    GlobalVariables.shipEntity.getComponent(Transform).position.y = 0;
    GlobalVariables.shipEntity.getComponent(Transform).scale.setAll(0.85);
    createFinalBoss();

    executeTask(async () => {
      let data = await getInaData();
      //let myTexture = new AvatarTexture()
      log(data);

      let inadclOnJail = new Entity();
      inadclOnJail.addComponent(new PlaneShape());
      const inadclOnJail_tr = new Transform({
        position: new Vector3(14, 0.8, 11.2),
        scale: new Vector3(2, 2, 2),
      });
      inadclOnJail.addComponent(inadclOnJail_tr);
      inadclOnJail.getComponent(Transform).rotate(new Vector3(0, 1, 0), 90);
      inadclOnJail.getComponent(Transform).rotate(new Vector3(1, 0, 0), 175);
      // inadclOnJail.addComponent(new Billboard)
      engine.addEntity(inadclOnJail);
      let myTexture = new Texture(data["body"]);

      //myTexture = new Texture("images/ina2.png");
      const myMaterial = new Material();
      myMaterial.albedoTexture = myTexture;

      //  myMaterial.albedoColor = Color3.Blue()
      inadclOnJail.addComponent(myMaterial);

      let bluechip_glb = new GLTFShape("models/maps/bluechip_final.glb");

      let bluechip = new Entity();
      bluechip.addComponent(bluechip_glb);
      const bluechip_tr = new Transform({
        position: new Vector3(14, 0, 5),
        scale: new Vector3(0.5, 0.5, 0.5),
      });
      bluechip.addComponent(bluechip_tr);
      // inadclOnJail.addComponent(new Billboard)
      engine.addEntity(bluechip);

      const trigger9 = new Trigger(new Vector3(12, 2, 11.2), gamegood, false);
      const trigger10 = new Trigger(new Vector3(12, 2, 5), gamebad, false);
    });
    // FILE WAS GENERATED BY DCL-EDIT
    // DO NOT MODIFY

    const doorwall8 = new Entity("doorwall");
    engine.addEntity(doorwall8);
    const doorwall8transform = new Transform({
      position: new Vector3(-1.055, -5.302, 8),
      rotation: new Quaternion(0, 0, 0, 1),
      scale: new Vector3(0.546, 1, 0.5),
    });
    doorwall8.addComponentOrReplace(doorwall8transform);
    const doorwall8GLTFShape = new GLTFShape("models/maps/doorwall.glb");
    doorwall8GLTFShape.withCollisions = true;
    doorwall8GLTFShape.isPointerBlocker = true;
    doorwall8GLTFShape.visible = true;
    doorwall8.addComponentOrReplace(doorwall8GLTFShape);

    // FILE WAS GENERATED BY DCL-EDIT
    // DO NOT MODIFY

    const startpoint9 = new Entity("startpoint");
    engine.addEntity(startpoint9);
    const startpoint9transform = new Transform({
      position: new Vector3(7.9, -0.032, 7.895),
      rotation: new Quaternion(0, 0, 0, 1),
      scale: new Vector3(0.5, 0.5, 0.5),
    });
    startpoint9.addComponentOrReplace(startpoint9transform);
    const startpoint9GLTFShape = new GLTFShape("models/maps/startpoint.glb");
    startpoint9GLTFShape.withCollisions = true;
    startpoint9GLTFShape.isPointerBlocker = true;
    startpoint9GLTFShape.visible = true;
    startpoint9.addComponentOrReplace(startpoint9GLTFShape);

    // FILE WAS GENERATED BY DCL-EDIT
    // DO NOT MODIFY

    const huecoCarcel11 = new Entity("huecocarcel1");
    engine.addEntity(huecoCarcel11);
    const huecoCarcel11transform = new Transform({
      position: new Vector3(7.756, 0, 12.5),
      rotation: new Quaternion(0, 0.7071068, 0, 0.7071068),
      scale: new Vector3(0.5, 0.5, 0.5),
    });
    huecoCarcel11.addComponentOrReplace(huecoCarcel11transform);
    const huecoCarcel11GLTFShape = new GLTFShape(
      "models/maps/hueco_carcel.glb"
    );
    huecoCarcel11GLTFShape.withCollisions = true;
    huecoCarcel11GLTFShape.isPointerBlocker = true;
    huecoCarcel11GLTFShape.visible = true;
    huecoCarcel11.addComponentOrReplace(huecoCarcel11GLTFShape);

    // FILE WAS GENERATED BY DCL-EDIT
    // DO NOT MODIFY

    const huecoCarcel12 = new Entity("huecocarcel2");
    engine.addEntity(huecoCarcel12);
    const huecoCarcel12transform = new Transform({
      position: new Vector3(7.942, 0, 6),
      rotation: new Quaternion(0, 0.7071068, 0, 0.7071068),
      scale: new Vector3(0.5, 0.5, 0.5),
    });
    huecoCarcel12.addComponentOrReplace(huecoCarcel12transform);
    huecoCarcel12.addComponentOrReplace(huecoCarcel11GLTFShape);

    const celda_glb = new GLTFShape("models/maps/finalcell.glb");
    celda_glb.withCollisions = true;
    celda_glb.isPointerBlocker = true;
    celda_glb.visible = true;

    const celda1 = new Entity("carcel1");
    const celda1_transform = new Transform({
      position: new Vector3(13, 0, 6),
      rotation: new Quaternion(0, 0.7071068, 0, 0.7071068),
      scale: new Vector3(0.5, 0.5, 0.5),
    });
    celda1.addComponentOrReplace(celda1_transform);
    celda1.addComponentOrReplace(celda_glb);
    engine.addEntity(celda1);

    const celda2 = new Entity("carcel2");
    const celda2_transform = new Transform({
      position: new Vector3(13, 0, 12.5),
      rotation: new Quaternion(0, 0.7071068, 0, 0.7071068),
      scale: new Vector3(0.5, 0.5, 0.5),
    });
    celda2.addComponentOrReplace(celda2_transform);
    celda2.addComponentOrReplace(celda_glb);
    engine.addEntity(celda2);
    // FILE WAS GENERATED BY DCL-EDIT
    // DO NOT MODIFY

    const blocker_glb = new GLTFShape("models/maps/blocker.glb");
    blocker_glb.withCollisions = true;
    blocker_glb.isPointerBlocker = true;
    blocker_glb.visible = true;

    const blocker1_transform = new Transform({
      position: new Vector3(12, -1, 8),
      scale: new Vector3(0.5, 0.5, 0.5),
    });
    bloker.addComponentOrReplace(blocker1_transform);
    bloker.addComponentOrReplace(blocker_glb);
    engine.addEntity(bloker);

    let door1_glb = new GLTFShape("models/maps/door.glb");

    doorask1.addComponent(door1_glb);
    doorask1.addComponent(
      new Transform({
        position: new Vector3(5, 0, 4),
        scale: new Vector3(0.9, 0.9, 0.9),
      })
    );
    doorask1.getComponent(Transform).rotate(new Vector3(0, 1, 0), 90);
    engine.addEntity(doorask1);

    doorask2.addComponent(door1_glb);
    doorask2.addComponent(
      new Transform({
        position: new Vector3(5, 0, 8),
        scale: new Vector3(0.9, 0.9, 0.9),
      })
    );
    doorask2.getComponent(Transform).rotate(new Vector3(0, 1, 0), 90);
    engine.addEntity(doorask2);

    doorask3.addComponent(door1_glb);
    doorask3.addComponent(
      new Transform({
        position: new Vector3(5, 0, 12),
        scale: new Vector3(0.9, 0.9, 0.9),
      })
    );
    doorask3.getComponent(Transform).rotate(new Vector3(0, 1, 0), 90);
    engine.addEntity(doorask3);

    let wrong3 = function () {
      if (!doorask1.isAddedToEngine()) {
        return;
      }
      GlobalVariables.lives = GlobalVariables.lives - 10;
      GlobalVariables.livesui.decrease(10);
      engine.removeEntity(doorask1);
      hitui();
    };

    let wrong2 = function () {
      if (!doorask2.isAddedToEngine()) {
        return;
      }
      GlobalVariables.lives = GlobalVariables.lives - 10;
      GlobalVariables.livesui.decrease(10);
      engine.removeEntity(doorask2);
      hitui();
    };

    let valid1 = function () {
      if (!doorask3.isAddedToEngine()) {
        return;
      }
      yeah();
      //next level
      engine.removeEntity(doorask3);
      engine.removeEntity(doorwall8);
      if (doorask1.isAddedToEngine()) engine.removeEntity(doorask1);
      if (doorask2.isAddedToEngine()) engine.removeEntity(doorask2);
      bossStart = true;
      /*           changeLevel();
          completeLevel1(); */
    };
    const trigger5 = new Trigger(new Vector3(5, 2, 12), valid1, false);
    const trigger6 = new Trigger(new Vector3(5, 2, 8), wrong2, false);
    const trigger7 = new Trigger(new Vector3(5, 2, 4), wrong3, false);

    this.textA.addComponent(new TextShape(getQuestionA(1)));
    this.textA.getComponent(TextShape).fontSize = 2;
    this.textA.getComponent(TextShape).shadowColor = Color3.Gray();
    this.textA.getComponent(TextShape).paddingBottom = 9;
    this.textA.getComponent(TextShape).shadowOffsetY = 1;
    this.textA.getComponent(TextShape).shadowOffsetX = -1;
    engine.addEntity(this.textA);
    this.textA.setParent(doorask3);

    this.textB.addComponent(new TextShape(getQuestionB(1)));
    this.textB.getComponent(TextShape).shadowColor = Color3.Gray();
    this.textB.getComponent(TextShape).fontSize = 2;
    this.textB.getComponent(TextShape).paddingBottom = 9;
    this.textB.getComponent(TextShape).shadowOffsetX = 1;
    this.textB.getComponent(TextShape).shadowOffsetX = -1;
    engine.addEntity(this.textB);

    this.textB.setParent(doorask2);
    this.textC.addComponent(new TextShape(getQuestionC(1)));
    this.textC.getComponent(TextShape).shadowColor = Color3.Gray();
    this.textC.getComponent(TextShape).fontSize = 2;
    this.textC.getComponent(TextShape).paddingBottom = 9;
    this.textC.getComponent(TextShape).shadowOffsetY = 1;
    this.textC.getComponent(TextShape).shadowOffsetX = -1;
    engine.addEntity(this.textC);
    this.textC.setParent(doorask1);
  }

  complete() {
    if (this.map.isAddedToEngine()) engine.removeEntity(this.map);
    if (this.textA.isAddedToEngine()) engine.removeEntity(this.textA);
    if (this.textB.isAddedToEngine()) engine.removeEntity(this.textB);
    if (this.textC.isAddedToEngine()) engine.removeEntity(this.textC);
    if (doorask1.isAddedToEngine()) engine.removeEntity(doorask1);
    if (doorask2.isAddedToEngine()) engine.removeEntity(doorask2);
    if (doorask3.isAddedToEngine()) engine.removeEntity(doorask3);
    this.levelStarted = false;
  }
}

function createFinalBoss() {
  let finalBossComponent = new FinalBossComponent();
  engine.addEntity(finalboss5);
  const finalboss5transform = new Transform({
    position: new Vector3(12, 0, 8),
    rotation: new Quaternion(0, 0.04797824, 0, -0.9988484),
    scale: new Vector3(0.5, 0.5, 0.5),
  });
  finalboss5.addComponentOrReplace(finalboss5transform);
  const finalboss5GLTFShape = new GLTFShape("models/enemies/finalboss.glb");
  finalboss5GLTFShape.withCollisions = true;
  finalboss5GLTFShape.isPointerBlocker = true;
  finalboss5GLTFShape.visible = true;
  finalboss5.addComponentOrReplace(finalboss5GLTFShape);

  const finalbosshit5GLTFShape = new GLTFShape(
    "models/enemies/finalbosshit.glb"
  );
  const finalbosshit5transform = new Transform({
    position: new Vector3(12, 0, 8),
    rotation: new Quaternion(0, 0.04797824, 0, -0.9988484),
    scale: new Vector3(0.5, 0.5, 0.5),
  });
  finalbosshit.addComponentOrReplace(finalbosshit5GLTFShape);
  finalbosshit5GLTFShape.withCollisions = false;
  finalbosshit5GLTFShape.isPointerBlocker = true;
  finalbosshit5GLTFShape.visible = true;
  finalbosshit.addComponentOrReplace(finalbosshit5transform);
  engine.addEntity(finalbosshit);

  engine.addEntity(rightarm);
  const arm5GLTFShape = new GLTFShape("models/enemies/normal_arm.glb");
  arm5GLTFShape.withCollisions = false;
  arm5GLTFShape.isPointerBlocker = true;
  arm5GLTFShape.visible = true;
  rightarm.addComponentOrReplace(arm5GLTFShape);
  const armlefttransformarmlefttransform = new Transform({
    position: new Vector3(12, 0, 8),
    rotation: new Quaternion(0, 0.04797824, 0, -0.9988484),
    scale: new Vector3(0.5, 0.5, 0.5),
  });
  rightarm.addComponentOrReplace(armlefttransformarmlefttransform);

  const armhit5GLTFShape = new GLTFShape("models/enemies/armhit.glb");
  arm5GLTFShape.withCollisions = false;
  arm5GLTFShape.isPointerBlocker = true;
  arm5GLTFShape.visible = true;
  const armlefttransformarmlefttransformhit = new Transform({
    position: new Vector3(12.1, 0, 8.2),
    rotation: new Quaternion(0, 0.04797824, 0, -0.9988484),
    scale: new Vector3(0, 0, 0),
  });

  engine.addEntity(rightarmhit);
  rightarmhit.addComponentOrReplace(armhit5GLTFShape);
  rightarmhit.addComponentOrReplace(armlefttransformarmlefttransformhit);

  const armrighttransform = new Transform({
    position: new Vector3(12, 0, 6.2),
    rotation: new Quaternion(0, 0.04797824, 0, -0.9988484),
    scale: new Vector3(0.5, 0.5, 0.5),
  });
  leftarm.addComponentOrReplace(armrighttransform);
  leftarm.addComponentOrReplace(arm5GLTFShape);
  engine.addEntity(leftarm);

  engine.addEntity(leftarmhit);
  const armrighttransformhit = new Transform({
    position: new Vector3(12.2, 0, 6.4),
    rotation: new Quaternion(0, 0.04797824, 0, -0.9988484),
    scale: new Vector3(0, 0, 0),
  });
  leftarmhit.addComponentOrReplace(armhit5GLTFShape);
  leftarmhit.addComponentOrReplace(armrighttransformhit);

  const enemyController5transform = new Transform({
    position: new Vector3(0, 0, 0),
  });
  enemyController.addComponent(enemyController5transform);
  engine.addEntity(enemyController);
  leftarm.setParent(enemyController);
  rightarm.setParent(enemyController);
  rightarmhit.setParent(enemyController);
  leftarmhit.setParent(enemyController);
  finalboss5.setParent(enemyController);
  finalbosshit.setParent(enemyController);

  /* 
  const collidersglb = new GLTFShape("models/enemies/enemycolliders.glb")
  const collider_ent = new Entity("armrighthit")
  engine.addEntity(armrighthit)
  const collider_transform = new Transform({
      position: new Vector3(12, 0, 8),
      rotation: new Quaternion(0, 0.04797824, 0, -0.9988484),
      scale: new Vector3(0.5, 0.5, 0.5)
  })
  collider_ent.addComponentOrReplace(collidersglb)
  collider_ent.addComponentOrReplace(collider_transform) */

  enemyController.addComponent(finalBossComponent);
  GlobalVariables.finalBoss = enemyController;
  engine.addSystem(new FinalBossEffects());
  engine.addSystem(new FinalBossMovements());
}

let time = 0.5;
let startMove = 0;
let step = 0;
let lastStep = 0;
class FinalBossMovements implements ISystem {
  update(dt: number) {
    if (GlobalVariables.gamefinish) {
      return;
    }
    if (!bossStart) {
      return;
    } else if (GlobalVariables.bossMoving) {
      GlobalVariables.bossMoving = false;
      bossMoving = false;
      //0 == 8
      //-5 == 0
      //5 == 14
      let fixedZ = enemyController.getComponent(Transform).position.z + 5
      if ( fire_ent.getComponentOrNull(Transform) == null || 
      fire_ent.getComponent(Transform).position.x <= 2 ) {
        fire_ent.addComponentOrReplace(
          new Transform({
            position: new Vector3(12,1.1,fixedZ),
            scale: new Vector3(0.02, 0.02, 0.02)})
        );
      } else {
        fire_ent.getComponent(Transform).position.x =
          fire_ent.getComponent(Transform).position.x - 1;
      }
      checkHitPlayer(fire_ent)

      if(enemyController.getComponent(FinalBossComponent).leftlives>0){
        if ( fire_entl.getComponentOrNull(Transform) == null ||
          fire_entl.getComponent(Transform).position.x <= 2) {
          fire_entl.addComponentOrReplace(
            new Transform({
              position: new Vector3(12,leftY,fixedZ-1),
              scale: new Vector3(0.02, 0.02, 0.02)})
          );
        } else {
          fire_entl.getComponent(Transform).position.x =
            fire_entl.getComponent(Transform).position.x - 1;
        }
      }else{
        fire_entl.getComponent(Transform).position.y = -50;
      }

      checkHitPlayer(fire_entl)
      if(enemyController.getComponent(FinalBossComponent).rightlives>0){
      if (fire_entr.getComponentOrNull(Transform) == null ||
        fire_entr.getComponent(Transform).position.x <= 2 ) {
        fire_entr.addComponentOrReplace(
          new Transform({
            position: new Vector3(12,rightY,fixedZ+1),
            scale: new Vector3(0.02, 0.02, 0.02)})
        );
      } else {
        fire_entr.getComponent(Transform).position.x =
          fire_entr.getComponent(Transform).position.x - 1;
      }
    }else{
      fire_entr.getComponent(Transform).position.y = -50;
    }
    checkHitPlayer(fire_entr)

      log(enemyController.getComponent(Transform).position.z);
      log(rightarm.getComponent(Transform).position.z);
      log(leftarm.getComponent(Transform).position.z);
      if (leftDir) {
        enemyController.getComponent(Transform).position.z =
          enemyController.getComponent(Transform).position.z - 1;
        if (enemyController.getComponent(Transform).position.z < -5) {
          leftDir = false;
        }
      } else {
        enemyController.getComponent(Transform).position.z =
          enemyController.getComponent(Transform).position.z + 1;
        if (enemyController.getComponent(Transform).position.z > 5) {
          leftDir = true;
        }
      }
    }
  }
}
class FinalBossEffects implements ISystem {
  update(dt: number) {
    if (GlobalVariables.gamefinish) {
      return;
    }
    /* const armright = new Entity("armright")
const armrighthit = new Entity("armrighthit")
const armleft = new Entity("armleft")
const armlefthit = new Entity("armlefthit")
const finalbosshit = new Entity("finalbosshit")
const finalboss5 = new Entity("finalboss")
    log("keyina: startMove: "+startMove + " dt:"+dt+ " time:" + time)
    log("keyina: hitleft " + GlobalVariables.hitLeft + " movingleft" + GlobalVariables.movingLeft)
    log("keyina: hitright " + GlobalVariables.hitRight + " movingright" + GlobalVariables.movingRight) */

    if (GlobalVariables.hitLeftDie) {
      golpeBoss();
      leftarm.getComponent(Transform).scale.setAll(0);
      leftarmhit.getComponent(Transform).scale.setAll(0);
      leftarm.getComponent(Transform).position.y = -50;
      leftarmhit.getComponent(Transform).position.y = -50;
      GlobalVariables.hitLeftDie = false;
      GlobalVariables.hitLeft = false;
      GlobalVariables.movingLeft = false;
      return;
    }
    if (GlobalVariables.hitLeft) {
      golpeBoss();
      GlobalVariables.hitLeft = false;
      GlobalVariables.movingLeft = true;
      leftarm.getComponent(Transform).scale.setAll(0);
      leftarmhit.getComponent(Transform).scale.setAll(0.45);
      startMove = 0;
    } else if (GlobalVariables.movingLeft) {
      startMove = startMove + 0.5 * dt;
      if (startMove >= time) {
        GlobalVariables.hitLeft = false;
        GlobalVariables.movingLeft = false;
        leftarm.getComponent(Transform).scale.setAll(0.5);
        leftarmhit.getComponent(Transform).scale.setAll(0);
      }
    }

    if (GlobalVariables.hitRightDie) {
      golpeBoss();
      rightarm.getComponent(Transform).scale.setAll(0);
      rightarmhit.getComponent(Transform).scale.setAll(0);
      rightarm.getComponent(Transform).position.y = -50;
      rightarmhit.getComponent(Transform).position.y = -50;
      GlobalVariables.hitRightDie = false;
      GlobalVariables.hitRight = false;
      GlobalVariables.movingRight = false;
      return;
    }
    if (GlobalVariables.hitRight) {
      golpeBoss();
      GlobalVariables.hitRight = false;
      GlobalVariables.movingRight = true;
      rightarm.getComponent(Transform).scale.setAll(0);
      rightarmhit.getComponent(Transform).scale.setAll(0.45);
      startMove = 0;
    } else if (GlobalVariables.movingRight) {
      startMove = startMove + 1 * dt;
      if (startMove >= time) {
        GlobalVariables.hitRight = false;
        GlobalVariables.movingRight = false;
        rightarm.getComponent(Transform).scale.setAll(0.5);
        rightarmhit.getComponent(Transform).scale.setAll(0);
      }
      /*  let transform = rightarmhit.getComponent(Transform);
      let distance = Vector3.Forward().scale(dt * 1);
      transform.translate(distance);
      transform = rightarm.getComponent(Transform);
      distance = Vector3.Forward().scale(dt * -1);
      transform.translate(distance); */
    }

    if (GlobalVariables.hitMainDie) {
      golpeBoss();
      finalboss5.getComponent(Transform).scale.setAll(0);
      finalbosshit.getComponent(Transform).scale.setAll(0);
      bloker.getComponent(Transform).scale.setAll(0);
      finalboss5.getComponent(Transform).position.y = -50;
      finalbosshit.getComponent(Transform).position.y = -50;
      bloker.getComponent(Transform).position.y = -50;
      gameend();
      fire_entl.getComponent(Transform).position.y = -50;
      fire_ent.getComponent(Transform).position.y = -50;
      fire_entr.getComponent(Transform).position.y = -50;
      GlobalVariables.hitMainDie = false;
      GlobalVariables.gamefinish = true;
      GlobalVariables.hitMain = false;
      GlobalVariables.movingMain = false;
      return;
    }
    if (GlobalVariables.hitMain) {
      golpeBoss();
      GlobalVariables.hitMain = false;
      GlobalVariables.movingMain = true;
      finalboss5.getComponent(Transform).scale.setAll(0);
      finalbosshit.getComponent(Transform).scale.setAll(0.5);
      startMove = 0;
    } else if (GlobalVariables.movingMain) {
      startMove = startMove + 1 * dt;
      if (startMove >= time) {
        GlobalVariables.hitMain = false;
        GlobalVariables.movingMain = false;
        finalboss5.getComponent(Transform).scale.setAll(0.5);
        finalbosshit.getComponent(Transform).scale.setAll(0);
      }
    }
  }
}
function checkHitPlayer(fire: Entity) {
  let posY = fire.getComponent(Transform).position.y
      if(posY != -50){
      let posx = fire.getComponent(Transform).position.x
      let posz = fire.getComponent(Transform).position.z
      let shipPosx = GlobalVariables.shipEntity.getComponent(Transform).position.x
      let shipPosz = GlobalVariables.shipEntity.getComponent(Transform).position.z
      let diffX = shipPosx-posx
      let diffZ = shipPosz-posz
      if ((diffX <1 && diffX>-1) && (diffZ <1 && diffZ>-1)){
        hitui()
      }
      }
}

