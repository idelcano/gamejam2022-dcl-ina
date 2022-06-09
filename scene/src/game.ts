import { GlobalVariables } from "./Global/globalValues";
import { Level } from "./levels/level";
import { Level1 } from "./levels/level1";
import { Level2 } from "./levels/level2";

//common for all the maps:
let border_glb = new GLTFShape("models/border.glb");
let border = new Entity("border")
border.addComponent(border_glb);
border.addComponent(
  new Transform({
    position: new Vector3(8, 0, 8),
    scale: new Vector3(.5, .5, .5),
  })
);
//engine.addEntity(border);

const level1 : Level = new Level2()
level1.start()
GlobalVariables.level = level1