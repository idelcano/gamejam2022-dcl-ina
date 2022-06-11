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
let scene = new Entity();
let base1_glb = new GLTFShape("models/enemies/base1.glb");
let fantasmicos = [];
export class Level2 implements Level {
  complete() {
    if (this.map.isAddedToEngine()) engine.removeEntity(this.map);
    if (scene.isAddedToEngine()) engine.removeEntity(scene);
  }
  map: Entity;
  constructor() {
    this.map = new Entity("map2");
  }
  start() {
    //first map
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
      { posX: 7.7, posZ: 4, dir: "left" },
      { posX: 7.7, posZ: 5, dir: "left" },
      { posX: 7.7, posZ: 6, dir: "left" },
      { posX: 7.7, posZ: 7, dir: "left" },
      { posX: 7.7, posZ: 8, dir: "left" },
      { posX: 7.7, posZ: 9, dir: "left" },
      { posX: 7.7, posZ: 10, dir: "left" },
      { posX: 7.7, posZ: 11, dir: "left" },
      { posX: 7.7, posZ: 12, dir: "left" },
      { posX: 13, posZ: 4, dir: "right" },
      { posX: 13, posZ: 5, dir: "right" },
      { posX: 13, posZ: 6, dir: "right" },
      { posX: 13, posZ: 7, dir: "right" },
      { posX: 13, posZ: 8, dir: "right" },
      { posX: 13, posZ: 9, dir: "right" },
      { posX: 13, posZ: 10, dir: "right" },
      { posX: 13, posZ: 11, dir: "right" },
      { posX: 13, posZ: 12, dir: "right" },
      { posX: 13, posZ: 13, dir: "right" },
      { posX: 13, posZ: 14, dir: "right" },
    ];
    createFantasmicos(fantasmicosList);

    let dialogWindow = new DialogWindow();
    dialogWindow.openDialogWindow(heyfantasmico, 0);
    listen();
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

export class FantasmicosMove implements ISystem {}
