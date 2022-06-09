import * as ui from "@dcl/ui-scene-utils";
import { DialogWindow } from "@dcl/npc-scene-utils";
import { heyfantasmico, heyglassess, heyhello, heytail } from "../dialogs/dialogs";
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
let scene = new Entity()
let fantasmico_glb = new GLTFShape("models/enemies/fantasmico.glb");
let base1_glb = new GLTFShape("models/enemies/base1.glb");
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
    let firstFantasmico = new Entity()
    firstFantasmico.addComponent(fantasmico_glb);
    firstFantasmico.addComponent(
      new Transform({
        position: new Vector3(3, 1, 14),
        scale: new Vector3(1, 1, 1),
      })
    );
    firstFantasmico.getComponent(Transform).rotate(new Vector3(0,1,0),180)
    engine.addEntity(firstFantasmico);

    let dialogWindow = new DialogWindow();
    dialogWindow.openDialogWindow(heyfantasmico, 0);
    listen();
    
  }
}
