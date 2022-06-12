import * as ui from "@dcl/ui-scene-utils";
import { DialogWindow } from "@dcl/npc-scene-utils";
import { heyglassess, heyhello, heytail } from "../dialogs/dialogs";
import { Trigger } from "../mechanics/triggers";
import { checkWearableCategory } from "../network/checkWearables";
import { glassesContract, tailContract } from "../network/contracts";
import { GlobalVariables } from "src/Global/globalValues";
import * as utils from "@dcl/ecs-scene-utils";
import { getQuestionA, getQuestionB, getQuestionC } from "../network/questions";
import {
  accessGranted,
  changeLevel,
  hitui,
  listen,
  yeah,
} from "src/effects/effects";
import { Level } from "src/levels/level";
import { movePlayerTo } from "@decentraland/RestrictedActions";
import { completeLevel1 } from "src/Global/gameManager";
let power_up_glb = new GLTFShape("models/items/powerup.glb");
let powerUp2 = new Entity();
let powerUp1 = new Entity();
let door1 = new Entity("door1");
let door2 = new Entity("door2");
let doorask1 = new Entity("door-ask1");
let doorask2 = new Entity("door-ask2");
let doorask3 = new Entity("door-ask3");
let levelStarted = false;
export class Level1 implements Level {
  complete() {
    if (this.map.isAddedToEngine()) engine.removeEntity(this.map);
    if (this.textA.isAddedToEngine()) engine.removeEntity(this.textA);
    if (this.textB.isAddedToEngine()) engine.removeEntity(this.textB);
    if (this.textC.isAddedToEngine()) engine.removeEntity(this.textC);
    if (door2.isAddedToEngine()) engine.removeEntity(door2);
    if (door1.isAddedToEngine()) engine.removeEntity(door1);
    if (doorask1.isAddedToEngine()) engine.removeEntity(doorask1);
    if (doorask2.isAddedToEngine()) engine.removeEntity(doorask2);
    if (doorask3.isAddedToEngine()) engine.removeEntity(doorask3);
    if (powerUp1.isAddedToEngine()) engine.removeEntity(powerUp1);
    if (powerUp2.isAddedToEngine()) engine.removeEntity(powerUp2);
    levelStarted = false;

    executeTask(async () => {
      movePlayerTo({ x: 1, y: 0, z: 8 });
    });
  }
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
    GlobalVariables.shipEntity.getComponent(Transform).position.x = 1;
    GlobalVariables.shipEntity.getComponent(Transform).position.z = 8;
    GlobalVariables.shipEntity.getComponent(Transform).position.y = 0;
    GlobalVariables.shipEntity.getComponent(Transform).scale.setAll(0.85);

    let border_glb = new GLTFShape("models/border.glb");
    let border = new Entity("border");
    border.addComponent(border_glb);
    border.addComponent(
      new Transform({
        position: new Vector3(8, 0, 8),
        scale: new Vector3(0.5, 0.5, 0.5),
      })
    );
    engine.addEntity(border);

    //first map
    let map_glb = new GLTFShape("models/maps/mapa1.glb");
    this.map.addComponent(map_glb);
    this.map.addComponent(
      new Transform({
        position: new Vector3(8, 0, 8),
        scale: new Vector3(0.5, 0.5, 0.5),
      })
    );
    engine.addEntity(this.map);

    //first map doors

    let door1_glb = new GLTFShape("models/maps/door.glb");
    door1.addComponent(door1_glb);
    door1.addComponent(
      new Transform({
        position: new Vector3(6.9, 0, 10),
        scale: new Vector3(0.9, 0.9, 0.9),
      })
    );
    engine.addEntity(door1);

    door2.addComponent(door1_glb);
    door2.addComponent(
      new Transform({
        position: new Vector3(6.9, 0, 5),
        scale: new Vector3(0.9, 0.9, 0.9),
      })
    );
    engine.addEntity(door2);

    doorask1.addComponent(door1_glb);
    doorask1.addComponent(
      new Transform({
        position: new Vector3(13.5, 0, 4),
        scale: new Vector3(0.9, 0.9, 0.9),
      })
    );
    doorask1.getComponent(Transform).rotate(new Vector3(0, 1, 0), 90);
    engine.addEntity(doorask1);

    doorask2.addComponent(door1_glb);
    doorask2.addComponent(
      new Transform({
        position: new Vector3(13.5, 0, 8),
        scale: new Vector3(0.9, 0.9, 0.9),
      })
    );
    doorask2.getComponent(Transform).rotate(new Vector3(0, 1, 0), 90);
    engine.addEntity(doorask2);

    doorask3.addComponent(door1_glb);
    doorask3.addComponent(
      new Transform({
        position: new Vector3(13.5, 0, 12),
        scale: new Vector3(0.9, 0.9, 0.9),
      })
    );
    doorask3.getComponent(Transform).rotate(new Vector3(0, 1, 0), 90);
    engine.addEntity(doorask3);

    let wrong3 = function () {
      if (!levelStarted) return;
      if (!doorask3.isAddedToEngine()) {
        return;
      }
      GlobalVariables.lives = GlobalVariables.lives - 1;
      GlobalVariables.livesui.decrease();
      engine.removeEntity(doorask3);
      hitui();
    };

    let wrong2 = function () {
      if (!levelStarted) return;
      if (!doorask2.isAddedToEngine()) {
        return;
      }
      GlobalVariables.lives = GlobalVariables.lives - 1;
      GlobalVariables.livesui.decrease();
      engine.removeEntity(doorask2);
      hitui();
    };

    let valid1 = function () {
      if (!levelStarted) return;
      if (!doorask1.isAddedToEngine()) {
        return;
      }
      //next level
      engine.removeEntity(doorask2);
      changeLevel();
      completeLevel1();
    };
    const trigger5 = new Trigger(new Vector3(12.5, 2, 12), wrong3, false);
    const trigger6 = new Trigger(new Vector3(12.5, 2, 8), wrong2, false);
    const trigger7 = new Trigger(new Vector3(12.5, 2, 4), valid1, false);

    this.textA.addComponent(new TextShape(getQuestionA(0)));
    this.textA.getComponent(TextShape).fontSize = 2;
    this.textA.getComponent(TextShape).shadowColor = Color3.Gray();
    this.textA.getComponent(TextShape).paddingBottom = 9;
    this.textA.getComponent(TextShape).shadowOffsetY = 1;
    this.textA.getComponent(TextShape).shadowOffsetX = -1;
    engine.addEntity(this.textA);
    this.textA.setParent(doorask1);

    this.textB.addComponent(new TextShape(getQuestionB(0)));
    this.textB.getComponent(TextShape).shadowColor = Color3.Gray();
    this.textB.getComponent(TextShape).fontSize = 2;
    this.textB.getComponent(TextShape).paddingBottom = 9;
    this.textB.getComponent(TextShape).shadowOffsetX = 1;
    this.textB.getComponent(TextShape).shadowOffsetX = -1;
    engine.addEntity(this.textB);

    this.textB.setParent(doorask2);
    this.textC.addComponent(new TextShape(getQuestionC(0)));
    this.textC.getComponent(TextShape).shadowColor = Color3.Gray();
    this.textC.getComponent(TextShape).fontSize = 2;
    this.textC.getComponent(TextShape).paddingBottom = 9;
    this.textC.getComponent(TextShape).shadowOffsetY = 1;
    this.textC.getComponent(TextShape).shadowOffsetX = -1;
    engine.addEntity(this.textC);
    this.textC.setParent(doorask3);

    let dialogWindow = new DialogWindow();

    utils.setTimeout(8000, () => {
      dialogWindow.openDialogWindow(heyhello, 0);
      listen();
    });

    let askAndRemoveDoor1 = function () {
      if (!levelStarted) return;
      if (!door1.isAddedToEngine()) {
        return;
      }
      executeTask(async () => {
        dialogWindow.openDialogWindow(heyglassess, 0);
        listen();
        const hasItem = checkWearableCategory(glassesContract);
        if (await hasItem) {
          engine.removeEntity(door1);
          accessGranted();
        } else {
          let prompt = new ui.FillInPrompt(
            "You haven't the spanishMuseum Glasses, but has the password?",
            (e: string) => {
              if (e == "1111") {
                engine.removeEntity(door1);
                accessGranted();
              }
            },
            "Sent!",
            "Password"
          );
        }
      });
    };

    let askAndRemoveDoor2 = function () {
      if (!levelStarted) return;
      if (!door2.isAddedToEngine()) {
        return;
      }
      executeTask(async () => {
        dialogWindow.openDialogWindow(heytail, 0);
        listen();
        const hasItem = checkWearableCategory(tailContract);
        if (await hasItem) {
          engine.removeEntity(door2);
          accessGranted();
        } else {
          let prompt = new ui.FillInPrompt(
            "You haven't the spanishMuseum Tail, but has the password?",
            (e: string) => {
              if (e == "1111") {
                engine.removeEntity(door2);
                accessGranted();
              }
            },
            "Sent!",
            "Password"
          );
        }
      });
    };

    let getPowerUp1 = function () {
      if (!levelStarted) return;
      if (!powerUp1.isAddedToEngine()) {
        return;
      }
      yeah();
      GlobalVariables.lives = GlobalVariables.lives + 50;
      GlobalVariables.livesui.increase(50);
      engine.removeSystem(simpleRotate1);
      engine.removeEntity(powerUp1);
    };
    let getPowerUp2 = function () {
      if (!powerUp2.isAddedToEngine()) {
        return;
      }
      yeah();
      GlobalVariables.lives = GlobalVariables.lives + 50;
      GlobalVariables.livesui.increase(50);
      engine.removeSystem(simpleRotate2);
      engine.removeEntity(powerUp2);
    };
    let simpleRotate1 = new SimpleRotate1();
    engine.addSystem(simpleRotate1);

    let simpleRotate2 = new SimpleRotate2();
    engine.addSystem(simpleRotate2);

    powerUp1.addComponent(
      new Transform({
        position: new Vector3(6.9, 2, 3),
        scale: new Vector3(0.1, 0.1, 0.1),
      })
    );
    powerUp1.getComponent(Transform).rotate(new Vector3(0, 1, 0), 90);
    powerUp1.addComponent(power_up_glb);
    powerUp2.addComponent(
      new Transform({
        position: new Vector3(6.9, 2, 15),
        scale: new Vector3(0.1, 0.1, 0.1),
      })
    );
    powerUp2.getComponent(Transform).rotate(new Vector3(0, 1, 0), 90);
    powerUp2.addComponent(power_up_glb);
    engine.addEntity(powerUp1);
    engine.addEntity(powerUp2);

    const trigger = new Trigger(
      new Vector3(6.9, 2, 6),
      askAndRemoveDoor2,
      false
    );
    const trigger2 = new Trigger(
      new Vector3(6.9, 2, 10),
      askAndRemoveDoor1,
      false
    );
    const trigger3 = new Trigger(new Vector3(6.9, 2, 3), getPowerUp1, false);
    const trigger4 = new Trigger(new Vector3(6.9, 2, 15), getPowerUp2, false);
    levelStarted = true;
  }
}
export class SimpleRotate1 implements ISystem {
  update() {
    let transform = powerUp1.getComponent(Transform);
    transform.rotate(Vector3.Left(), 3);
  }
}
export class SimpleRotate2 implements ISystem {
  update() {
    let transform = powerUp2.getComponent(Transform);
    transform.rotate(Vector3.Left(), 3);
  }
}
