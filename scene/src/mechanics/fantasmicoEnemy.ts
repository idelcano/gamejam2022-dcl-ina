
import * as utils from "@dcl/ecs-scene-utils";
import { getListOfWearables } from "node_modules/@dcl/crypto-scene-utils/dist/wearable/index";
import { hitFantasmico } from "src/effects/effects";

let fantasmico_glb = new GLTFShape("models/enemies/fantasmico.glb");
export enum Direction {
    Up,
    Down,
    Left,
    Right,
  }

export class Fantasmico extends Entity{
    entity: Entity
    lives: number
    constructor(position: Vector3, rotationPos: Direction, startDisabled: boolean){
    super()
    this.lives = 3
    this.entity = new Entity("fantasmico")
    this.entity.addComponent(fantasmico_glb);
    this.entity.addComponent(
      new Transform({
        position: position,
        scale: new Vector3(1, 1, 1),
      })
    );
    if (rotationPos == Direction.Left){
        this.entity.getComponent(Transform).rotate(new Vector3(0,1,0),180)
    }else if  (rotationPos == Direction.Right){
        this.entity.getComponent(Transform).rotate(new Vector3(0,0,0),0)
    }else if (rotationPos == Direction.Up){
        this.entity.getComponent(Transform).rotate(new Vector3(0,1,0),75)
    }else if  (rotationPos == Direction.Down){
        this.entity.getComponent(Transform).rotate(new Vector3(0,1,0),255)
    }
    engine.addEntity(this.entity);

    let triggerBox = new utils.TriggerBoxShape(new Vector3(0.8,0.8,0.8)
    );
    this.entity.addComponent(
      new utils.TriggerComponent(
        triggerBox,
        {
          onTriggerEnter(entity) {
              log("fantasmico hit " +entity.name)
            if (entity.name?.indexOf("Circle") !== -1) {
               //hitFantasmico()
            }
          },
          enableDebug: true,
        }
      )
    );
    }
}