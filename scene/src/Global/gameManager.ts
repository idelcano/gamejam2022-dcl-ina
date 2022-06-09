import { Level1 } from "src/levels/level1";
import { Level2 } from "src/levels/level2";
import { Level } from "src/levels/level";
import { GlobalVariables } from "./globalValues";

export function completeLevel1() {
    GlobalVariables.level.complete();
    GlobalVariables.level = new Level2();
    GlobalVariables.level.start()
}
  
export function completeLevel2() {
    GlobalVariables.level.complete();
    //GlobalVariables.level = new Level3();
}