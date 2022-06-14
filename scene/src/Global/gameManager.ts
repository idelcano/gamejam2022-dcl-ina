import { activateUI, GlobalVariables } from "./globalValues";
import { PlayerModifiers } from "src/mechanics/avatarModifiers";
import { PlayerMovement, restart } from "src/mechanics/playerMovement";
import * as utils from "@dcl/ecs-scene-utils";
import { firstPersonText as allWindowBackground, levelCompleted, press4 } from "src/ui/ui";
let playerMovement : PlayerMovement
export function loadGameMechanics(){
    new PlayerModifiers()
    playerMovement = new PlayerMovement()
}

export function completeLevel0() {
    GlobalVariables.firstLevelStep=false
    GlobalVariables.level.complete();
    loadGameMechanics()
    GlobalVariables.level = GlobalVariables.level1;
    activateUI()
  
    GlobalVariables.level.start()
    utils.setTimeout(2000, () => {
        
    });
}

export function completeLevel1() {
    GlobalVariables.firstLevelStep=false
    allWindowBackground.visible = true
    levelCompleted.visible = true
    GlobalVariables.level.complete();
    GlobalVariables.level = GlobalVariables.level2;
    restart()
    GlobalVariables.level.start()
    utils.setTimeout(2000, () => {
        levelCompleted.visible = false
        allWindowBackground.visible = false
        press4.visible= true
    });
}
  
export function completeLevel2() {
    GlobalVariables.firstLevelStep=false
    allWindowBackground.visible = true
    levelCompleted.visible = true

    GlobalVariables.level.complete();
    GlobalVariables.level = GlobalVariables.level3;
    restart()
    GlobalVariables.level.start() 

    utils.setTimeout(2000, () => {
        levelCompleted.visible = false
        allWindowBackground.visible = false
        press4.visible= true
    });
}