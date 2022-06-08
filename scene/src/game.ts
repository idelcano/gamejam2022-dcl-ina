import { Level1 } from "./levels/level1";

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
engine.addEntity(border);

const level1 = new Level1()
level1.start()