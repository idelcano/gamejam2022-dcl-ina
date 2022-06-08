import * as ui from "@dcl/ui-scene-utils";
import { DialogWindow } from "@dcl/npc-scene-utils";
import { heyglassess, heyhello, heytail } from "../dialogs/dialogs";
import { Trigger } from "../mechanics/triggers";
import { checkWearableCategory } from "../network/checkWearables";
import { glassesContract, tailContract } from "../network/contracts";
import { GlobalVariables } from "src/Global/globalValues";

let power_up_glb = new GLTFShape("models/items/powerup.glb");
let powerUp2 = new Entity();
let powerUp1 = new Entity();
export class Level1 {
  constructor() {}
  start() {
    //first map
    let map_glb = new GLTFShape("models/maps/mapa1.glb");
    let map1 = new Entity("map1");
    map1.addComponent(map_glb);
    map1.addComponent(
      new Transform({
        position: new Vector3(8, 0, 8),
        scale: new Vector3(0.5, 0.5, 0.5),
      })
    );
    engine.addEntity(map1);

    //first map doors

    let door1_glb = new GLTFShape("models/maps/door.glb");
    let door1 = new Entity("door1");
    door1.addComponent(door1_glb);
    door1.addComponent(
      new Transform({
        position: new Vector3(6.9, 0, 10),
        scale: new Vector3(0.9, 0.9, 0.9),
      })
    );
    engine.addEntity(door1);

    let door2 = new Entity("door2");
    door2.addComponent(door1_glb);
    door2.addComponent(
      new Transform({
        position: new Vector3(6.9, 0, 5),
        scale: new Vector3(0.9, 0.9, 0.9),
      })
    );
    engine.addEntity(door2);

    let doorask1 = new Entity("door-ask1");
    doorask1.addComponent(door1_glb);
    doorask1.addComponent(
      new Transform({
        position: new Vector3(12, 0, 4),
        scale: new Vector3(0.9, 0.9, 0.9),
      })
    );
    doorask1.getComponent(Transform).rotate(new Vector3(0, 1, 0), 90);
    engine.addEntity(doorask1);

    let doorask2 = new Entity("door-ask2");
    doorask2.addComponent(door1_glb);
    doorask2.addComponent(
      new Transform({
        position: new Vector3(12, 0, 8),
        scale: new Vector3(0.9, 0.9, 0.9),
      })
    );
    doorask2.getComponent(Transform).rotate(new Vector3(0, 1, 0), 90);
    engine.addEntity(doorask2);

    let doorask3 = new Entity("door-ask3");
    doorask3.addComponent(door1_glb);
    doorask3.addComponent(
      new Transform({
        position: new Vector3(12, 0, 12),
        scale: new Vector3(0.9, 0.9, 0.9),
      })
    );
    doorask3.getComponent(Transform).rotate(new Vector3(0, 1, 0), 90);
    engine.addEntity(doorask3);
    let dialogWindow = new DialogWindow();
    dialogWindow.openDialogWindow(heyhello, 0);

    let askAndRemoveDoor1 = function () {
      if (!door1.isAddedToEngine()) {
        return;
      }
      executeTask(async () => {
        dialogWindow.openDialogWindow(heyglassess, 0);
        const hasItem = checkWearableCategory(glassesContract);
        if (await hasItem) {
          engine.removeEntity(door1);
        } else {
          let prompt = new ui.FillInPrompt(
            "You haven't the spanishMuseum Glasses, but has the password?",
            (e: string) => {
              if (e == "1111") engine.removeEntity(door1);
            },
            "Sent!",
            "Password"
          );
        }
      });
    };

    let askAndRemoveDoor2 = function () {
      if (!door2.isAddedToEngine()) {
        return;
      }
      executeTask(async () => {
        dialogWindow.openDialogWindow(heytail, 0);
        const hasItem = checkWearableCategory(tailContract);
        if (await hasItem) {
          engine.removeEntity(door2);
        } else {
          let prompt = new ui.FillInPrompt(
            "You haven't the spanishMuseum Tail, but has the password?",
            (e: string) => {
              if (e == "1111") engine.removeEntity(door2);
            },
            "Sent!",
            "Password"
          );
        }
      });
    };

    let getPowerUp1 = function () {
      if (!powerUp1.isAddedToEngine()) {
        return;
      }
      GlobalVariables.lives = GlobalVariables.lives + 1;
      engine.removeSystem(simpleRotate1);
      engine.removeEntity(powerUp1);
    };
    let getPowerUp2 = function () {
      if (!powerUp2.isAddedToEngine()) {
        return;
      }
      GlobalVariables.lives = GlobalVariables.lives + 1;
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
    const trigger3 = new Trigger(
      new Vector3(6.9, 2, 3),
      getPowerUp1,
      false
    );
    const trigger4 = new Trigger(
      new Vector3(6.9, 2, 15),
      getPowerUp2,
      false
    );
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
