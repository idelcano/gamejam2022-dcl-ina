import * as ui from "@dcl/ui-scene-utils";
import { Level } from "src/levels/level";
import { Fantasmico } from "src/mechanics/fantasmicoEnemy";
export class GlobalVariables {
  static lives: number = 100;
  static steps: number = 0;
  static livesui: ui.UICounter 
  static stepsui: ui.UICounter

  static level: Level;
  static activeFantasmicos: Fantasmico[] = [];
  static shipEntity: Entity;
  static level1: Level;
  static level2: Level;
  static level3: Level;
  static hitLeft: boolean = false;
  static hitLeftDie: boolean = false;
  static movingLeft: boolean = false;
  static hitRight: boolean = false;
  static hitRightDie: boolean = false;
  static movingRight: boolean = false;
  static hitMain: boolean = false;
  static hitMainDie: boolean = false;
  static movingMain: boolean = false;
  static finalBoss: Entity;
  static gamefinish: boolean = false;
}
export function activateUI(){
let healthLabel = new ui.CornerLabel(
  "Health:",
  -100,
  60,
  Color4.Yellow(),
  30,
  true
);
let stepsLabel = new ui.CornerLabel(
  "Steps:",
  -100,
  90,
  Color4.Yellow(),
  30,
  true
);
GlobalVariables.stepsui = new ui.UICounter(
  GlobalVariables.steps,
  0,
  90,
  Color4.Yellow(),
  30,
  true
);
GlobalVariables.livesui = new ui.UICounter(
  GlobalVariables.lives,
  0,
  60,
  Color4.Yellow(),
  30,
  false
);
}