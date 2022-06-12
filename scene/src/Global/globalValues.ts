import * as ui from "@dcl/ui-scene-utils";
import { Level } from "src/levels/level";
import { Fantasmico } from "src/mechanics/fantasmicoEnemy";
export class GlobalVariables {
  static lives: number = 100;
  static steps: number = 0;
  static livesui = new ui.UICounter(
    GlobalVariables.lives,
    0,
    60,
    Color4.Yellow(),
    30,
    true
  );
  static stepsui = new ui.UICounter(
    GlobalVariables.steps,
    0,
    90,
    Color4.Yellow(),
    30,
    true
  );

  static level: Level;
  static activeFantasmicos: Fantasmico[] = [];
  static shipEntity: Entity;
  static level1: Level;
  static level2: Level;
}

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
