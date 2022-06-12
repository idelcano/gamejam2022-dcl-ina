import { movePlayerTo } from "@decentraland/RestrictedActions";
import { completeLevel0, completeLevel1 } from "src/Global/gameManager";
import { GlobalVariables } from "src/Global/globalValues";
import { Level } from "src/levels/level";
import { Level1 } from "./level1";

export class Level0 implements Level {
  complete() {
    if (this.map.isAddedToEngine()) engine.removeEntity(this.map);
    if (this.cube.isAddedToEngine()) engine.removeEntity(this.cube);
  }
  map: Entity;
  cube: Entity;
  constructor() {
    this.map = new Entity("map0");
    this.cube = new Entity()
  }
  start() {
    //first map
    let map_glb = new GLTFShape("models/maps/mapa0.glb");
    let bluechip = new GLTFShape("models/maps/bluechip.glb");
    this.map.addComponent(map_glb);
    this.map.addComponent(
      new Transform({
        position: new Vector3(8, 0, 8),
        scale: new Vector3(0.5, 0.5, 0.5),
      })
    );
    engine.addEntity(this.map); 

    this.cube.addComponent(bluechip)
    this.cube.addComponent(
      new Transform({
        position: new Vector3(8, -2, 8),
        scale: new Vector3(1, 1, 1),
      })
    );
    this.cube.addComponent(
        new OnPointerUp(
          (e) => {
            this.cube.getComponent(Transform).position.y = -40
            executeTask(async () => {
            movePlayerTo({ x: 1, y: 0, z: 8 });
            })
            engine.removeEntity(this.map)
            GlobalVariables.level = new Level1();
            completeLevel0()
            engine.removeEntity(this.cube)
          },
          { button: ActionButton.ANY, showFeedback: true, hoverText: "Get free BLUE CHIP NFT!!!" ,distance:7}
        )
      )
    engine.addEntity(this.cube); 

  }
  
}