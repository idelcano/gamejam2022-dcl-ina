import { hitui, yeah } from "src/effects/effects";
import { GlobalVariables } from "src/Global/globalValues";
import { Trigger } from "src/mechanics/triggers";
import { getQuestionA, getQuestionB, getQuestionC } from "src/network/questions";
import { Level } from "./level"

let doorask1 = new Entity("door-ask1b");
let doorask2 = new Entity("door-ask2b");
let doorask3 = new Entity("door-ask3b");
export class Level3 implements Level {
    levelStarted= false
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
        const finalboss5 = new Entity("finalboss")
        engine.addEntity(finalboss5)
        const finalboss5transform = new Transform({
            position: new Vector3(12, 0, 8),
            rotation: new Quaternion(0, 0.04797824, 0, -0.9988484),
            scale: new Vector3(0.5, 0.5, 0.5)
        })
        finalboss5.addComponentOrReplace(finalboss5transform)
        const finalboss5GLTFShape = new GLTFShape("models/enemies/finalboss.glb")
        finalboss5GLTFShape.withCollisions = true
        finalboss5GLTFShape.isPointerBlocker = true
        finalboss5GLTFShape.visible = true
        finalboss5.addComponentOrReplace(finalboss5GLTFShape)

        // FILE WAS GENERATED BY DCL-EDIT
        // DO NOT MODIFY

        const doorwall8 = new Entity("doorwall")
        engine.addEntity(doorwall8)
        const doorwall8transform = new Transform({
            position: new Vector3(-1.055, -5.302, 8),
            rotation: new Quaternion(0, 0, 0, 1),
            scale: new Vector3(0.546, 1, 0.5)
        })
        doorwall8.addComponentOrReplace(doorwall8transform)
        const doorwall8GLTFShape = new GLTFShape("models/maps/doorwall.glb")
        doorwall8GLTFShape.withCollisions = true
        doorwall8GLTFShape.isPointerBlocker = true
        doorwall8GLTFShape.visible = true
        doorwall8.addComponentOrReplace(doorwall8GLTFShape)

        // FILE WAS GENERATED BY DCL-EDIT
        // DO NOT MODIFY

        const startpoint9 = new Entity("startpoint")
        engine.addEntity(startpoint9)
        const startpoint9transform = new Transform({
            position: new Vector3(7.9, -0.032, 7.895),
            rotation: new Quaternion(0, 0, 0, 1),
            scale: new Vector3(0.5, 0.5, 0.5)
        })
        startpoint9.addComponentOrReplace(startpoint9transform)
        const startpoint9GLTFShape = new GLTFShape("models/maps/startpoint.glb")
        startpoint9GLTFShape.withCollisions = true
        startpoint9GLTFShape.isPointerBlocker = true
        startpoint9GLTFShape.visible = true
        startpoint9.addComponentOrReplace(startpoint9GLTFShape)

        // FILE WAS GENERATED BY DCL-EDIT
        // DO NOT MODIFY

        const huecoCarcel11 = new Entity("hueco carcel")
        engine.addEntity(huecoCarcel11)
        const huecoCarcel11transform = new Transform({
            position: new Vector3(7.756, 0, 12.5),
            rotation: new Quaternion(0, 0.7071068, 0, 0.7071068),
            scale: new Vector3(0.5, 0.5, 0.5)
        })
        huecoCarcel11.addComponentOrReplace(huecoCarcel11transform)
        const huecoCarcel11GLTFShape = new GLTFShape("models/maps/hueco_carcel.glb")
        huecoCarcel11GLTFShape.withCollisions = true
        huecoCarcel11GLTFShape.isPointerBlocker = true
        huecoCarcel11GLTFShape.visible = true
        huecoCarcel11.addComponentOrReplace(huecoCarcel11GLTFShape)

        // FILE WAS GENERATED BY DCL-EDIT
        // DO NOT MODIFY

        const huecoCarcel12 = new Entity("hueco carcel")
        engine.addEntity(huecoCarcel12)
        const huecoCarcel12transform = new Transform({
            position: new Vector3(7.942, 0, 6),
            rotation: new Quaternion(0, 0.7071068, 0, 0.7071068),
            scale: new Vector3(0.5, 0.5, 0.5)
        })
        huecoCarcel12.addComponentOrReplace(huecoCarcel12transform)
        huecoCarcel12.addComponentOrReplace(huecoCarcel11GLTFShape)

        // FILE WAS GENERATED BY DCL-EDIT
        // DO NOT MODIFY

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
          yeah()
          //next level
          engine.removeEntity(doorask3);
          engine.removeEntity(doorwall8);
          if(doorask1.isAddedToEngine())
          engine.removeEntity(doorask1)
          if(doorask2.isAddedToEngine())
          engine.removeEntity(doorask2)
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