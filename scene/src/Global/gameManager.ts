import { Level } from "src/levels/level";
import { activateUI, GlobalVariables } from "./globalValues";
import { Level0 } from "src/levels/level0";
import { PlayerModifiers } from "src/mechanics/avatarModifiers";
import { PlayerMovement, restart } from "src/mechanics/playerMovement";
let playerMovement : PlayerMovement
export function loadGameMechanics(){
    new PlayerModifiers()
    playerMovement = new PlayerMovement()
}

export function completeLevel0() {
    GlobalVariables.level.complete();
    loadGameMechanics()
    GlobalVariables.level = GlobalVariables.level3;
    activateUI()
  
    GlobalVariables.level.start()
}
export function completeLevel1() {
    GlobalVariables.level.complete();
    GlobalVariables.level = GlobalVariables.level2;
    restart()
    GlobalVariables.level.start()
}
  
export function completeLevel2() {
    GlobalVariables.level.complete();
    GlobalVariables.level = GlobalVariables.level3;
    restart()
    GlobalVariables.level.start() 
    //GlobalVariables.level = new Level3();
}