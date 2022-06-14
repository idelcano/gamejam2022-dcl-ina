import { GlobalVariables } from "./Global/globalValues";
import { Level } from "./levels/level";
import { Level0 } from "./levels/level0";
import { Level1 } from "./levels/level1";
import { Level2 } from "./levels/level2";
import { Level3 } from "./levels/level3";
import { setInaData } from "./network/player";
import * as utils from "@dcl/ecs-scene-utils";
import { getScores } from "./network/score";
import { gameendscore } from "./ui/ui";

//common for all the maps:
//engine.addEntity(border);

executeTask(async () => {
    setInaData()
})

let border = new Entity("border");
const border_e = new Entity()
border_e.addComponent(new Transform({position: new Vector3(8,0,8),})) 
let triggerBox = new utils.TriggerBoxShape(new Vector3(15, 15, 15));
border_e.addComponentOrReplace(
  new utils.TriggerComponent(triggerBox, {
    onCameraEnter() {
      let border_glb = new GLTFShape("models/border.glb");
      border.addComponent(border_glb);
      border.addComponent(
        new Transform({
          position: new Vector3(8, 0, 8),
          scale: new Vector3(0.5, 0.5, 0.5),
        })
      );
      engine.addEntity(border);
      },

    onCameraExit() {
        engine.removeEntity(border)
    },enableDebug:false,
    }
  )
);

engine.addEntity(border_e)
const level1 : Level = new Level0()
GlobalVariables.level1 = new Level1()
GlobalVariables.level2 = new Level2()
GlobalVariables.level3 = new Level3()
level1.start()
GlobalVariables.level = level1



executeTask(async () => {
 
    let scores = await getScores()
    let stringify_score =""
    for(let score of await scores) {
      stringify_score = "Name: "+score["name"] + " score: "+score["score"] + " final: "+ score["comment"] + "\n" + stringify_score
      
    }
    log(stringify_score)
    stringify_score = stringify_score+ "\n\nThanks for playing!\nRefresh or move to \nanother location.\nSpecial thanks to Okita\n for its tests"
    gameendscore.value= stringify_score
    gameendscore.visible=true
    })