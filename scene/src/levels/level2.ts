import * as ui from "@dcl/ui-scene-utils";
import { DialogWindow } from "@dcl/npc-scene-utils";
import { heyfantasmico } from "../dialogs/dialogs";
import { Trigger } from "../mechanics/triggers";
import { checkWearableCategory } from "../network/checkWearables";
import { glassesContract, tailContract } from "../network/contracts";
import { GlobalVariables } from "src/Global/globalValues";
import { getQuestionA, getQuestionB, getQuestionC } from "../network/questions";
import {
  accessGranted,
  changeLevel,
  hitui,
  listen,
  yeah,
} from "src/effects/effects";
import { Level } from "src/levels/level";
import { Direction, Fantasmico } from "src/mechanics/fantasmicoEnemy";
import { completeLevel2 } from "src/Global/gameManager";
import { movePlayerTo } from "@decentraland/RestrictedActions";
import { PlayerModifiers } from "src/mechanics/avatarModifiers";
import { turnEnd } from "src/ui/ui";
let scene = new Entity();
let base1_glb = new GLTFShape("models/enemies/base1.glb");
let fantasmicos = [];
let levelStarted = false
export class Level2 implements Level {
  complete() {
    if (this.map.isAddedToEngine()) engine.removeEntity(this.map);
    if (this.nlentity.isAddedToEngine()) engine.removeEntity(this.nlentity);
    if (scene.isAddedToEngine()) engine.removeEntity(scene);
    levelStarted = false

    for (let item of GlobalVariables.activeFantasmicos) {
      let fantasmico = item.entity;
      if (fantasmico != null && fantasmico.isAddedToEngine()){
        engine.removeEntity(fantasmico)
      }
    }
    GlobalVariables.activeFantasmicos = []
    levelStarted = false;

    executeTask(async () => {
      movePlayerTo({ x: 1, y: 0, z: 8 });
    });
  }
  map: Entity;
  nlentity: Entity;
  constructor() {
    this.map = new Entity("map2");
    this.nlentity = new Entity("nextlevel")
  }
  start() {
    //first map
    
    GlobalVariables.firstLevelStep=false
    GlobalVariables.shipEntity.getComponent(Transform).position.x = 1;
    GlobalVariables.shipEntity.getComponent(Transform).position.z = 8;
    GlobalVariables.shipEntity.getComponent(Transform).position.y = 0;

    GlobalVariables.shipEntity.getComponent(Transform).scale.setAll(0.85);
    let map_glb = new GLTFShape("models/maps/mapa2.glb");
    this.map.addComponent(map_glb);
    this.map.addComponent(
      new Transform({
        position: new Vector3(8, 0, 8),
        scale: new Vector3(0.5, 0.5, 0.5),
      })
    );
    engine.addEntity(this.map);
    let fantasmicosList = [
      { posX: 3, posZ: 14, dir: "right" },
      { posX: 7.7, posZ: 5, dir: "left" },
      { posX: 7.7, posZ: 7, dir: "left" },
      { posX: 7.7, posZ: 9, dir: "left" },
      { posX: 7.7, posZ: 11, dir: "left" },
      { posX: 13, posZ: 5, dir: "right" },
      { posX: 13, posZ: 7, dir: "right" },
      { posX: 13, posZ: 9, dir: "right" },
      { posX: 13, posZ: 11, dir: "right" },
      { posX: 13, posZ: 13, dir: "right" },
    ];
    createFantasmicos(fantasmicosList);

    let dialogWindow = new DialogWindow();
    dialogWindow.openDialogWindow(heyfantasmico, 0);
    listen();
    levelStarted  = true

    let nextlevel = new GLTFShape("models/maps/nextlevel.glb");
    this.nlentity.addComponent(nextlevel);
    this.nlentity.addComponent(
      new Transform({
        position: new Vector3(14, 1, 14),
        scale: new Vector3(0.5, 0.5, 1),
      })
    );
    engine.addEntity(this.nlentity);
    let finalLevel = function finalLevel(){
      if (!levelStarted) return;
      changeLevel();
      completeLevel2();
    }
    const trigger7 = new Trigger(new Vector3(14.5, 2, 14.5), finalLevel, false);


    turnEnd.visible = false
  }
}
function createFantasmicos(
  fantasmicosPos: {
    posX: number;
    posZ: number;
    dir: string;
  }[]
) {
  for (let item of fantasmicosPos) {
    if (item["dir"] == "right") {
      let fantasmico = new Fantasmico(
        new Vector3(item["posX"], 1, item["posZ"]),
        Direction.Right,
        false
      );
      fantasmicos.push(fantasmico);
    } else if (item["dir"] == "left") {
      let fantasmico = new Fantasmico(
        new Vector3(item["posX"], 1, item["posZ"]),
        Direction.Left,
        false
      );
      fantasmicos.push(fantasmico);
    }
  }
}
