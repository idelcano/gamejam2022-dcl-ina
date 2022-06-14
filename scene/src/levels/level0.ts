import { movePlayerTo } from "@decentraland/RestrictedActions";
import { intro } from "src/effects/effects";
import { completeLevel0, completeLevel1 } from "src/Global/gameManager";
import { GlobalVariables } from "src/Global/globalValues";
import { Level } from "src/levels/level";
import { Level1 } from "./level1";
import * as utils from "@dcl/ecs-scene-utils";
import { getInaData } from "src/network/player";
export class Level0 implements Level {
  complete() {
    if (this.map.isAddedToEngine()) engine.removeEntity(this.map);
    if (this.cube.isAddedToEngine()) engine.removeEntity(this.cube);
    if (this.text.isAddedToEngine()) engine.removeEntity(this.text);
  }
  map: Entity;
  cube: Entity;
  text: Entity;
  constructor() {
    this.map = new Entity("map0");
    this.cube = new Entity();
    this.text = new Entity();
  }
  start() {
    //first map
    let map_glb = new GLTFShape("models/maps/mapa0.glb");
    let bluechip1_glb = new GLTFShape("models/maps/bluechip.glb");
    this.map.addComponent(map_glb);
    this.map.addComponent(
      new Transform({
        position: new Vector3(8, 0, 8),
        scale: new Vector3(0.5, 0.5, 0.5),
      })
    );
    engine.addEntity(this.map);

    this.cube.addComponent(bluechip1_glb);
    this.cube.addComponent(
      new Transform({
        position: new Vector3(8, -2, 8),
        scale: new Vector3(1, 1, 1),
      })
    );
    this.cube.addComponent(
      new OnPointerUp(
        (e) => {
          this.cube.getComponent(Transform).position.y = -40;
          intro()
          executeTask(async () => {
            GlobalVariables.startGame = true
            movePlayerTo({ x: 1, y: 0, z: 8 });
            engine.removeEntity(this.map);
            GlobalVariables.level = new Level1();
            completeLevel0();
            engine.removeEntity(this.cube);
            engine.removeEntity(this.text);
          });

        },
        {
          button: ActionButton.ANY,
          hoverText: "Get free BLUE CHIP NFT!!!",
          showFeedback: true,
          distance: 7,
        }
      )
    );
    let myEntity = new Entity();
    myEntity.addComponent(
      new TextShape(
        "Get your FREE NFT \nNext Blue chip!! \nonly click on the blue card!"
      )
    );
    myEntity.getComponent(TextShape).shadowColor = Color3.Gray();
    myEntity.getComponent(TextShape).fontSize = 2;
    myEntity.getComponent(TextShape).shadowColor = Color3.White();
    myEntity.getComponent(TextShape).shadowOffsetY = 1;
    myEntity.getComponent(TextShape).shadowOffsetX = -1;
    myEntity.getComponent(TextShape).paddingBottom = 4;


    engine.addEntity(myEntity);
    myEntity.addComponent(new Transform({position: new Vector3(8,1,8)}))
    myEntity.getComponent(Transform).position.z=8
    myEntity.getComponent(Transform).rotate(new Vector3(0,1,0),90)
    engine.addEntity(this.cube);
    this.text = myEntity

  }
}
